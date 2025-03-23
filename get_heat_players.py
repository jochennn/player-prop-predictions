from nba_api.stats.static import teams
from nba_api.stats.static import players
from nba_api.stats.endpoints import PlayerIndex
import pandas as pd
import json
import os
import requests
import time

def download_player_headshot(person_id, slug):
    """Download player headshot from NBA.com"""
    url = f"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{person_id}.png"
    filepath = f"frontend/images/players/{slug}.png"
    
    if os.path.exists(filepath):
        return f"images/players/{slug}.png"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            return f"images/players/{slug}.png"
    except Exception as e:
        print(f"Error downloading headshot for {slug}: {e}")
    
    return None

def get_heat_players():
    # Get all players
    all_players = PlayerIndex().get_data_frames()[0]
    
    # Filter for current Heat players - only include HERRO, ADEBAYO, and WIGGINS
    miami_heat_players = all_players[
        (all_players['TEAM_ABBREVIATION'] == 'MIA') & 
        (all_players['ROSTER_STATUS'] == 1) &
        (all_players['PLAYER_LAST_NAME'].isin(['Herro', 'Adebayo', 'Wiggins']))
    ].copy()
    
    # Sort by points scored (descending)
    miami_heat_players = miami_heat_players.sort_values('PTS', ascending=False)
    
    # Create a list of player objects with relevant information
    players_list = []
    for _, player in miami_heat_players.iterrows():
        # Download player headshot
        headshot_url = download_player_headshot(player['PERSON_ID'], player['PLAYER_SLUG'])
        time.sleep(0.5)  # Add delay to avoid rate limiting
        
        player_data = {
            'name': f"{player['PLAYER_FIRST_NAME']} {player['PLAYER_LAST_NAME']}",
            'first_name': player['PLAYER_FIRST_NAME'],
            'last_name': player['PLAYER_LAST_NAME'],
            'jersey_number': str(player.get('JERSEY_NUMBER', '')),
            'slug': player['PLAYER_SLUG'],
            'position': player.get('POSITION', ''),
            'stats': {
                'points': float(player.get('PTS', 0)),
                'rebounds': float(player.get('REB', 0)),
                'assists': float(player.get('AST', 0))
            }
        }
        players_list.append(player_data)
    
    return players_list

if __name__ == "__main__":
    # Create directories if they don't exist
    os.makedirs('frontend/data', exist_ok=True)
    os.makedirs('frontend/images/players', exist_ok=True)
    
    players = get_heat_players()
    
    # Save to a JSON file
    with open('frontend/data/heat_players.json', 'w') as f:
        json.dump(players, f, indent=2)
    
    # Print player information
    print(f"\nCurrent Miami Heat Players ({len(players)}):")
    print("-" * 50)
    for player in players:
        print(f"{player['name']:<25} PPG: {player['stats']['points']:<5.1f} RPG: {player['stats']['rebounds']:<5.1f} APG: {player['stats']['assists']:<5.1f}") 
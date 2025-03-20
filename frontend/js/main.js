// Theme handling
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Current Miami Heat roster data
const currentRoster = [
    {
        name: "Tyler Herro",
        first_name: "Tyler",
        last_name: "Herro",
        jersey_number: "14",
        slug: "tyler-herro",
        position: "G",
        stats: {
            points: 23.6,
            rebounds: 5.3,
            assists: 5.6
        }
    },
    {
        name: "Andrew Wiggins",
        first_name: "Andrew",
        last_name: "Wiggins",
        jersey_number: "22",
        slug: "andrew-wiggins",
        position: "F",
        stats: {
            points: 17.7,
            rebounds: 4.5,
            assists: 2.5
        }
    },
    {
        name: "Bam Adebayo",
        first_name: "Bam",
        last_name: "Adebayo",
        jersey_number: "13",
        slug: "bam-adebayo",
        position: "C-F",
        stats: {
            points: 17.6,
            rebounds: 9.9,
            assists: 4.3
        }
    },
    {
        name: "Duncan Robinson",
        first_name: "Duncan",
        last_name: "Robinson",
        jersey_number: "55",
        slug: "duncan-robinson",
        position: "F",
        stats: {
            points: 11.2,
            rebounds: 2.3,
            assists: 2.5
        }
    },
    {
        name: "Terry Rozier",
        first_name: "Terry",
        last_name: "Rozier",
        jersey_number: "2",
        slug: "terry-rozier",
        position: "G",
        stats: {
            points: 11.2,
            rebounds: 3.8,
            assists: 2.7
        }
    },
    {
        name: "Nikola Jović",
        first_name: "Nikola",
        last_name: "Jović",
        jersey_number: "5",
        slug: "nikola-jović",
        position: "F",
        stats: {
            points: 10.7,
            rebounds: 3.9,
            assists: 2.8
        }
    },
    {
        name: "Jaime Jaquez Jr.",
        first_name: "Jaime",
        last_name: "Jaquez Jr.",
        jersey_number: "11",
        slug: "jaime-jaquez-jr",
        position: "G",
        stats: {
            points: 8.7,
            rebounds: 4.6,
            assists: 2.5
        }
    },
    {
        name: "Kel'el Ware",
        first_name: "Kel'el",
        last_name: "Ware",
        jersey_number: "7",
        slug: "kelel-ware",
        position: "C",
        stats: {
            points: 8.7,
            rebounds: 6.6,
            assists: 0.9
        }
    },
    {
        name: "Davion Mitchell",
        first_name: "Davion",
        last_name: "Mitchell",
        jersey_number: "45",
        slug: "davion-mitchell",
        position: "G",
        stats: {
            points: 7.1,
            rebounds: 2.1,
            assists: 4.6
        }
    },
    {
        name: "Alec Burks",
        first_name: "Alec",
        last_name: "Burks",
        jersey_number: "18",
        slug: "alec-burks",
        position: "G",
        stats: {
            points: 6.3,
            rebounds: 2.7,
            assists: 1.2
        }
    },
    {
        name: "Haywood Highsmith",
        first_name: "Haywood",
        last_name: "Highsmith",
        jersey_number: "24",
        slug: "haywood-highsmith",
        position: "F",
        stats: {
            points: 6.3,
            rebounds: 3.1,
            assists: 1.4
        }
    },
    {
        name: "Dru Smith",
        first_name: "Dru",
        last_name: "Smith",
        jersey_number: "12",
        slug: "dru-smith",
        position: "G",
        stats: {
            points: 6.2,
            rebounds: 2.6,
            assists: 1.6
        }
    },
    {
        name: "Kevin Love",
        first_name: "Kevin",
        last_name: "Love",
        jersey_number: "42",
        slug: "kevin-love",
        position: "F-C",
        stats: {
            points: 5.5,
            rebounds: 4.3,
            assists: 1.0
        }
    },
    {
        name: "Kyle Anderson",
        first_name: "Kyle",
        last_name: "Anderson",
        jersey_number: "20",
        slug: "kyle-anderson",
        position: "F-G",
        stats: {
            points: 5.2,
            rebounds: 3.1,
            assists: 2.2
        }
    },
    {
        name: "Pelle Larsson",
        first_name: "Pelle",
        last_name: "Larsson",
        jersey_number: "9",
        slug: "pelle-larsson",
        position: "G",
        stats: {
            points: 3.9,
            rebounds: 1.4,
            assists: 0.9
        }
    },
    {
        name: "Keshad Johnson",
        first_name: "Keshad",
        last_name: "Johnson",
        jersey_number: "16",
        slug: "keshad-johnson",
        position: "F",
        stats: {
            points: 1.6,
            rebounds: 1.7,
            assists: 0.3
        }
    },
    {
        name: "Josh Christopher",
        first_name: "Josh",
        last_name: "Christopher",
        jersey_number: "8",
        slug: "josh-christopher",
        position: "G",
        stats: {
            points: 0.8,
            rebounds: 0.4,
            assists: 0.5
        }
    },
    {
        name: "Isaiah Stevens",
        first_name: "Isaiah",
        last_name: "Stevens",
        jersey_number: "None",
        slug: "isaiah-stevens",
        position: "G",
        stats: {
            points: null,
            rebounds: null,
            assists: null
        }
    }
];

// Stats update handling
const STATS_UPDATE_INTERVAL = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

async function fetchLatestPlayerStats() {
    try {
        const response = await fetch('/api/player-stats');
        if (!response.ok) {
            throw new Error('Failed to fetch player stats');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        return null;
    }
}

function updatePlayerStats(newStats) {
    if (!newStats) return;
    
    currentRoster.forEach(player => {
        const playerStats = newStats[player.slug];
        if (playerStats) {
            player.stats = playerStats;
        }
    });
    
    // Update the display
    createPlayerCards();
    
    // Update last update timestamp
    localStorage.setItem('lastStatsUpdate', Date.now().toString());
    
    // Update the last updated text
    updateLastUpdatedText();
}

function shouldUpdateStats() {
    const lastUpdate = localStorage.getItem('lastStatsUpdate');
    if (!lastUpdate) return true;
    
    const timeSinceLastUpdate = Date.now() - parseInt(lastUpdate);
    return timeSinceLastUpdate >= STATS_UPDATE_INTERVAL;
}

function updateLastUpdatedText() {
    const lastUpdate = localStorage.getItem('lastStatsUpdate');
    if (!lastUpdate) return;
    
    const updateDate = new Date(parseInt(lastUpdate));
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = `Last updated: ${updateDate.toLocaleString()}`;
    }
}

// Modified createPlayerCards function to handle null stats
function createPlayerCards() {
    const playerGrid = document.querySelector('.player-grid');
    playerGrid.innerHTML = ''; // Clear existing cards
    
    currentRoster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.setAttribute('data-player', player.slug);
        
        const imageUrl = `images/players/${player.slug}.png`;
        
        // Handle null stats
        const statsDisplay = player.stats.points !== null ? `
            <div class="player-stats">
                <span>${player.stats.points.toFixed(1)} PPG</span>
                <span>${player.stats.rebounds.toFixed(1)} RPG</span>
                <span>${player.stats.assists.toFixed(1)} APG</span>
            </div>
        ` : '<div class="player-stats">No stats available</div>';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${player.name}" onerror="this.src='images/default-player.png'">
            <div class="player-info">
                <h4>${player.name} <span class="jersey-number">#${player.jersey_number}</span> <span class="position">(${player.position})</span></h4>
                ${statsDisplay}
            </div>
        `;
        
        playerGrid.appendChild(card);
    });
    
    // Add click handlers to all player cards
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            document.querySelectorAll('.player-card').forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            // Update hidden input with selected player
            document.getElementById('player').value = card.dataset.player;
            
            // Update matchup options if opponent is already selected
            const selectedTeam = document.getElementById('matchup').value;
            if (selectedTeam && playerMatchups[selectedTeam] && playerMatchups[selectedTeam][card.dataset.player]) {
                updatePlayerMatchups(selectedTeam, card.dataset.player);
            }
        });
    });
}

// Initialize stats update when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    createPlayerCards();
    updateLastUpdatedText();
    
    if (shouldUpdateStats()) {
        const newStats = await fetchLatestPlayerStats();
        if (newStats) {
            updatePlayerStats(newStats);
        }
    }
});

// Player matchup data based on teams
const playerMatchups = {
    celtics: {
        'tyler-herro': ['Derrick White', 'Jrue Holiday'],
        'bam-adebayo': ['Kristaps Porzingis', 'Al Horford'],
        'duncan-robinson': ['Sam Hauser', 'Jaylen Brown'],
        'kevin-love': ['Al Horford', 'Luke Kornet'],
        'jaime-jaquez-jr': ['Jaylen Brown', 'Sam Hauser'],
        'nikola-jovic': ['Jayson Tatum', 'Sam Hauser'],
        'haywood-highsmith': ['Jayson Tatum', 'Sam Hauser']
    },
    bucks: {
        'tyler-herro': ['Damian Lillard', 'Patrick Beverley'],
        'bam-adebayo': ['Brook Lopez', 'Bobby Portis'],
        'duncan-robinson': ['Malik Beasley', 'Pat Connaughton'],
        'kevin-love': ['Bobby Portis', 'Brook Lopez'],
        'jaime-jaquez-jr': ['Khris Middleton', 'Pat Connaughton'],
        'nikola-jovic': ['Giannis Antetokounmpo', 'Jae Crowder'],
        'haywood-highsmith': ['Khris Middleton', 'Jae Crowder']
    },
    '76ers': {
        'jimmy-butler': ['Tobias Harris', 'Kelly Oubre Jr.'],
        'bam-adebayo': ['Joel Embiid', 'Paul Reed'],
        'tyler-hero': ['Tyrese Maxey', 'DeAnthony Melton'],
        'kyle-lowry': ['Tyrese Maxey', 'DeAnthony Melton'],
        'caleb-martin': ['Tobias Harris', 'Kelly Oubre Jr.'],
        'kevin-love': ['Joel Embiid', 'Paul Reed'],
        'duncan-robinson': ['Tyrese Maxey', 'DeAnthony Melton']
    },
    cavaliers: {
        'jimmy-butler': ['Donovan Mitchell', 'Max Strus'],
        'bam-adebayo': ['Jarrett Allen', 'Evan Mobley'],
        'tyler-hero': ['Darius Garland', 'Donovan Mitchell'],
        'kyle-lowry': ['Darius Garland', 'Donovan Mitchell'],
        'caleb-martin': ['Donovan Mitchell', 'Max Strus'],
        'kevin-love': ['Jarrett Allen', 'Evan Mobley'],
        'duncan-robinson': ['Darius Garland', 'Donovan Mitchell']
    },
    knicks: {
        'jimmy-butler': ['OG Anunoby', 'Josh Hart'],
        'bam-adebayo': ['Isaiah Hartenstein', 'Julius Randle'],
        'tyler-hero': ['Jalen Brunson', 'Donte DiVincenzo'],
        'kyle-lowry': ['Jalen Brunson', 'Donte DiVincenzo'],
        'caleb-martin': ['OG Anunoby', 'Josh Hart'],
        'kevin-love': ['Isaiah Hartenstein', 'Julius Randle'],
        'duncan-robinson': ['Jalen Brunson', 'Donte DiVincenzo']
    },
    nets: {
        'jimmy-butler': ['Mikal Bridges', 'Cam Johnson'],
        'bam-adebayo': ['Nic Claxton', 'Dorian Finney-Smith'],
        'tyler-hero': ['Spencer Dinwiddie', 'Cam Thomas'],
        'kyle-lowry': ['Spencer Dinwiddie', 'Cam Thomas'],
        'caleb-martin': ['Mikal Bridges', 'Cam Johnson'],
        'kevin-love': ['Nic Claxton', 'Dorian Finney-Smith'],
        'duncan-robinson': ['Spencer Dinwiddie', 'Cam Thomas']
    },
    hawks: {
        'jimmy-butler': ['Dejounte Murray', 'Bogdan Bogdanovic'],
        'bam-adebayo': ['Clint Capela', 'Onyeka Okongwu'],
        'tyler-hero': ['Trae Young', 'Dejounte Murray'],
        'kyle-lowry': ['Trae Young', 'Dejounte Murray'],
        'caleb-martin': ['Dejounte Murray', 'Bogdan Bogdanovic'],
        'kevin-love': ['Clint Capela', 'Onyeka Okongwu'],
        'duncan-robinson': ['Trae Young', 'Dejounte Murray']
    },
    wizards: {
        'jimmy-butler': ['Deni Avdija', 'Corey Kispert'],
        'bam-adebayo': ['Daniel Gafford', 'Marvin Bagley III'],
        'tyler-hero': ['Jordan Poole', 'Tyus Jones'],
        'kyle-lowry': ['Jordan Poole', 'Tyus Jones'],
        'caleb-martin': ['Deni Avdija', 'Corey Kispert'],
        'kevin-love': ['Daniel Gafford', 'Marvin Bagley III'],
        'duncan-robinson': ['Jordan Poole', 'Tyus Jones']
    },
    hornets: {
        'jimmy-butler': ['Brandon Miller', 'Gordon Hayward'],
        'bam-adebayo': ['Mark Williams', 'PJ Washington'],
        'tyler-hero': ['LaMelo Ball', 'Terry Rozier'],
        'kyle-lowry': ['LaMelo Ball', 'Terry Rozier'],
        'caleb-martin': ['Brandon Miller', 'Gordon Hayward'],
        'kevin-love': ['Mark Williams', 'PJ Washington'],
        'duncan-robinson': ['LaMelo Ball', 'Terry Rozier']
    },
    magic: {
        'jimmy-butler': ['Franz Wagner', 'Paolo Banchero'],
        'bam-adebayo': ['Wendell Carter Jr.', 'Goga Bitadze'],
        'tyler-hero': ['Jalen Suggs', 'Cole Anthony'],
        'kyle-lowry': ['Jalen Suggs', 'Cole Anthony'],
        'caleb-martin': ['Franz Wagner', 'Paolo Banchero'],
        'kevin-love': ['Wendell Carter Jr.', 'Goga Bitadze'],
        'duncan-robinson': ['Jalen Suggs', 'Cole Anthony']
    }
};

// Update player matchup options when opponent is selected
document.getElementById('matchup').addEventListener('change', (e) => {
    const selectedTeam = e.target.value;
    const selectedPlayer = document.getElementById('player').value;
    updatePlayerMatchups(selectedTeam, selectedPlayer);
});

function updatePlayerMatchups(team, player) {
    const playerMatchupSelect = document.getElementById('playerMatchup');
    playerMatchupSelect.innerHTML = '<option value="">Select opponent first...</option>';
    
    if (team && player && playerMatchups[team] && playerMatchups[team][player]) {
        playerMatchups[team][player].forEach(matchup => {
            const option = document.createElement('option');
            option.value = matchup.toLowerCase().replace(/\s+/g, '-');
            option.textContent = matchup;
            playerMatchupSelect.appendChild(option);
        });
    }
}

// Handle form submission
document.getElementById('playerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!document.getElementById('player').value) {
        alert('Please select a player first');
        return;
    }
    // Here you can add the logic to handle the form submission
    console.log('Form submitted with:', {
        player: document.getElementById('player').value,
        opponent: document.getElementById('matchup').value,
        matchup: document.getElementById('playerMatchup').value
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}); 
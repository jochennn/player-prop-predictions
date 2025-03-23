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
        // Filter for only Herro, Bam, and Wiggins
        const filteredData = data.filter(player => 
            ['tyler-herro', 'bam-adebayo', 'andrew-wiggins'].includes(player.slug)
        );
        // Convert array to object with slugs as keys
        return filteredData.reduce((acc, player) => {
            acc[player.slug] = player.stats;
            return acc;
        }, {});
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

// Add refresh button event listener
document.getElementById('refreshStats').addEventListener('click', async () => {
    const button = document.getElementById('refreshStats');
    button.disabled = true;
    button.innerHTML = '<span>Refreshing...</span>';
    
    try {
        const newStats = await fetchLatestPlayerStats();
        updatePlayerStats(newStats);
    } catch (error) {
        console.error('Error refreshing stats:', error);
        alert('Failed to refresh stats. Please try again later.');
    } finally {
        button.disabled = false;
        button.innerHTML = '<span>Refresh</span>';
    }
});

// Player matchup data based on teams
const playerMatchups = {
    celtics: {
        'tyler-herro': ['Derrick White', 'Jrue Holiday'],
        'bam-adebayo': ['Kristaps Porzingis', 'Al Horford'],
        'andrew-wiggins': ['Jayson Tatum', 'Sam Hauser']
    },
    bucks: {
        'tyler-herro': ['Damian Lillard', 'Patrick Beverley'],
        'bam-adebayo': ['Brook Lopez', 'Bobby Portis'],
        'andrew-wiggins': ['Khris Middleton', 'Jae Crowder']
    },
    '76ers': {
        'tyler-herro': ['Tyrese Maxey', 'DeAnthony Melton'],
        'bam-adebayo': ['Joel Embiid', 'Paul Reed'],
        'andrew-wiggins': ['Tobias Harris', 'Kelly Oubre Jr.']
    },
    cavaliers: {
        'tyler-herro': ['Darius Garland', 'Donovan Mitchell'],
        'bam-adebayo': ['Jarrett Allen', 'Evan Mobley'],
        'andrew-wiggins': ['Donovan Mitchell', 'Max Strus']
    },
    knicks: {
        'tyler-herro': ['Jalen Brunson', 'Donte DiVincenzo'],
        'bam-adebayo': ['Isaiah Hartenstein', 'Julius Randle'],
        'andrew-wiggins': ['OG Anunoby', 'Josh Hart']
    },
    nets: {
        'tyler-herro': ['Spencer Dinwiddie', 'Cam Thomas'],
        'bam-adebayo': ['Nic Claxton', 'Dorian Finney-Smith'],
        'andrew-wiggins': ['Mikal Bridges', 'Cam Johnson']
    },
    hawks: {
        'tyler-herro': ['Trae Young', 'Dejounte Murray'],
        'bam-adebayo': ['Clint Capela', 'Onyeka Okongwu'],
        'andrew-wiggins': ['Dejounte Murray', 'Bogdan Bogdanovic']
    },
    wizards: {
        'tyler-herro': ['Jordan Poole', 'Tyus Jones'],
        'bam-adebayo': ['Daniel Gafford', 'Marvin Bagley III'],
        'andrew-wiggins': ['Deni Avdija', 'Corey Kispert']
    },
    hornets: {
        'tyler-herro': ['LaMelo Ball', 'Terry Rozier'],
        'bam-adebayo': ['Mark Williams', 'PJ Washington'],
        'andrew-wiggins': ['Brandon Miller', 'Gordon Hayward']
    },
    magic: {
        'tyler-herro': ['Jalen Suggs', 'Cole Anthony'],
        'bam-adebayo': ['Wendell Carter Jr.', 'Goga Bitadze'],
        'andrew-wiggins': ['Franz Wagner', 'Paolo Banchero']
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
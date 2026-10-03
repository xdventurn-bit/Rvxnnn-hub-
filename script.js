// 1. Données centralisées (Kills et Morts)
const gameData = {
    kills: [
        { name: "Zetros_99", weapon: "Pompe Spas-12", time: "Il y a 3 min", avatar: "Z9" },
        { name: "Apex_Killer", weapon: "Fusil d'assaut", time: "Il y a 10 min", avatar: "AK" }
    ],
    deaths: [
        { name: "Gotaga", weapon: "Sniper Lourd", time: "Il y a 12 min", avatar: "GO" }
    ]
};

// 2. Fonction pour récupérer tes vraies stats en direct depuis l'API Fortnite
async function fetchFortniteStats() {
    try {
        let response = await fetch('https://fortnite-api.com/v2/stats/br/v2?name=assaut-fortuit8');
        let data = await response.json();

        if (data.status === 200 && data.data) {
            let stats = data.data.stats.all.overall;

            let kd = stats.kd ? stats.kd.toFixed(2) : "0.00";
            let wins = stats.wins || 0;

            // Injection dans ton HTML pour le profil
            const kdEl = document.getElementById('stat-kd');
            const winsEl = document.getElementById('stat-wins');
            
            if (kdEl) kdEl.innerText = kd;
            if (winsEl) winsEl.innerText = wins;

            console.log("Stats Fortnite synchronisées pour assaut-fortuit8 !");
        }
    } catch (error) {
        console.log("Erreur lors de la récupération des stats Fortnite :", error);
    }
}

// 3. Fonction d'injection des Kills et des Morts
function renderHubFeed() {
    const killsContainer = document.getElementById('kills-container');
    const deathsContainer = document.getElementById('deaths-container');

    if (killsContainer) {
        killsContainer.innerHTML = "";
        gameData.kills.forEach(kill => {
            killsContainer.innerHTML += `
                <div class="feed-item kill">
                    <div class="feed-player">
                        <div class="feed-avatar" style="color: var(--cyan-neon);">${kill.avatar}</div>
                        <div>
                            <div class="player-name">${kill.name}</div>
                            <div class="weapon-tag">${kill.weapon}</div>
                        </div>
                    </div>
                    <div class="match-info">${kill.time}</div>
                </div>
            `;
        });
    }

    if (deathsContainer) {
        deathsContainer.innerHTML = "";
        gameData.deaths.forEach(death => {
            deathsContainer.innerHTML += `
                <div class="feed-item death">
                    <div class="feed-player">
                        <div class="feed-avatar" style="color: var(--danger-red);">${death.avatar}</div>
                        <div>
                            <div class="player-name">${death.name}</div>
                            <div class="weapon-tag">${death.weapon}</div>
                        </div>
                    </div>
                    <div class="match-info">${death.time}</div>
                </div>
            `;
        });
    }
}

// 4. Charger le lecteur Twitch dynamiquement
(function() {
    let script = document.createElement('script');
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.onload = function() {
        try {
            new Twitch.Embed("twitch-embed", {
                width: "100%",
                height: "100%",
                channel: "rvxnnnn",
                layout: "video",
                parent: ["xdventur-bit.github.io", "codepen.io", "cdpn.io"]
            });
        } catch(e) {
            console.log("Erreur Twitch Embed");
        }
    };
    document.head.appendChild(script);
})();

// 5. Gestion de l'écran d'accueil et du menu glissant
function enterSite() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-app').classList.add('active');
}

function switchSlide(index, btnElement) {
    const track = document.getElementById('sliderTrack');
    track.style.transform = `translateX(-${index * 25}%)`;

    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    btnElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// Lancement au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    fetchFortniteStats();
    renderHubFeed();
});

// 6. Actualisation automatique des stats Fortnite toutes les 2 minutes (120000 ms)
setInterval(fetchFortniteStats, 120000);
                            

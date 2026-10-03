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

// 2. Affichage direct de tes stats de secours (1.78 K/D et 544 victoires) + tentative API[span_1](start_span)[span_1](end_span)
async function fetchFortniteStats() {
    // Affichage immédiat pour éviter les blancs sur mobile
    const kdEl = document.getElementById('stat-kd');
    const winsEl = document.getElementById('stat-wins');
    
    if (kdEl && kdEl.innerText === "-") kdEl.innerText = "1.78";
    if (winsEl && winsEl.innerText === "-") winsEl.innerText = "544";

    try {
        let response = await fetch('https://fortnite-api.com/v2/stats/br/v2?name=Twitch%20Rvxnn');
        let data = await response.json();

        if (data.status === 200 && data.data) {
            let stats = data.data.stats.all.overall;
            let kd = stats.kd ? stats.kd.toFixed(2) : "1.78";
            let wins = stats.wins || 544;

            if (kdEl) kdEl.innerText = kd;
            if (winsEl) winsEl.innerText = wins;

            console.log("Stats Fortnite synchronisées !");
        }
    } catch (error) {
        console.log("Mode hors-ligne / API bloquée par le navigateur, utilisation des stats par défaut.");
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

// 6. Actualisation automatique toutes les 2 minutes (120000 ms)
setInterval(fetchFortniteStats, 120000);
    

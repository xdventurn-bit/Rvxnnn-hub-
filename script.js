// 1. Données centralisées
const gameData = {
    kd: "5.42",
    victories: 118,
    kills: [
        { name: "Zetros_99", weapon: "Pompe Spas-12", time: "Il y a 3 min", avatar: "Z9" },
        { name: "Apex_Killer", weapon: "Fusil d'assaut", time: "Il y a 10 min", avatar: "AK" }
    ],
    deaths: [
        { name: "Gotaga", weapon: "Sniper Lourd", time: "Il y a 12 min", avatar: "GO" }
    ]
};

// 2. Fonction d'injection automatique des données
function renderHubData() {
    const kdEl = document.getElementById('stat-kd');
    const winsEl = document.getElementById('stat-wins');
    const killsContainer = document.getElementById('kills-container');
    const deathsContainer = document.getElementById('deaths-container');

    if (kdEl) kdEl.innerText = gameData.kd;
    if (winsEl) winsEl.innerText = gameData.victories;

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

// 3. Charger le lecteur Twitch dynamiquement
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
                parent: ["codepen.io", "cdpn.io"]
            });
        } catch(e) {
            console.log("Erreur Twitch Embed");
        }
    };
    document.head.appendChild(script);
})();

// 4. Gestion de l'écran d'accueil et du menu glissant
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

// Lancement sécurisé au chargement complet du document
document.addEventListener("DOMContentLoaded", renderHubData);

// 5. Actualisation automatique toutes les 15 minutes (900000 ms)
setTimeout(function() {
    location.reload();
}, 900000);
         
try {
    new Twitch.Embed("twitch-embed", {
        width: "100%",
        height: "100%",
        channel: "rvxnnnn",
        layout: "video",
        parent: ["xdventur-bit.github.io", "cdpn.io"]
    });
} catch(e) {
    console.log("Erreur Twitch Embed");
}

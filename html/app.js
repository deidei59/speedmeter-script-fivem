
const speedometer = document.getElementById('speedometer');
const speedElement = document.getElementById('speed');
const gearElement = document.getElementById('gear');

const engineDot = document.getElementById('engine-dot');
const engineText = document.getElementById('engine-text');

const speedProgress = document.getElementById('speed-progress');
const passengersElement = document.getElementById('passengers');

window.addEventListener('message', (event) => {
    const data = event.data;

    // Afficher ou masquer le HUD
    if (data.action === 'visibility') {
        speedometer.classList.toggle('hidden', !data.visible);
    }

    // Actualiser les informations du véhicule
    if (data.action === 'update') {
        const speed = Number(data.speed) || 0;
        const gear = data.gear ?? 'N';
        const engine = Boolean(data.engine);

        // Vitesse
        speedElement.textContent = speed;

        // Couleur de la vitesse
        speedElement.style.color =
            speed >= 180 ? '#ff5555' : '#ffffff';

        // Boîte de vitesse
        gearElement.textContent = gear;

        // État du moteur
        engineDot.classList.toggle('active', engine);
        engineText.textContent = engine ? 'ON' : 'OFF';

        // Barre de vitesse : maximum visuel de 240 km/h
        const progress = Math.min((speed / 240) * 100, 100);
        speedProgress.style.width = `${progress}%`;

        // Nombre de personnes / nombre de places
        if (passengersElement) {
            const occupants = Number(data.passengers ?? 1);
            const maxPassengers = Number(data.maxPassengers ?? 4);

            passengersElement.textContent =
                `${occupants}/${maxPassengers}`;
        }
    }
});

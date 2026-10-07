const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Teamo-rHp5.aternos.me',
        port: 30758,
        username: 'aternos24',
        version: '1.21.11',
        physicsEnabled: false
    });

    let loop;

    bot.on('login', () => {
        bot.physicsEnabled = false;
        console.log('[NPC] Conexión establecida con el servidor de Minecraft.');
    });

    bot.on('spawn', () => {
        console.log('[NPC] El bot ha aparecido correctamente en el mapa.');
        bot.physicsEnabled = false;

        clearInterval(loop);
        loop = setInterval(() => {
            try {
                bot.swingArm('right');
                console.log('[NPC] Acción anti-inactividad completada.');
            } catch (err) {
                console.log(`[NPC] Error en el ciclo: ${err.message}`);
            }
        }, 45000);
    });

    bot.on('kicked', (reason) => console.log('[NPC] Expulsado:', JSON.stringify(reason)));

    bot.on('end', (reason) => {
        clearInterval(loop);
        console.log(`[NPC] Conexión finalizada por: ${reason}. Reintentando en 25 segundos...`);
        setTimeout(createBot, 25000);
    });

    bot.on('error', (err) => console.log(`[NPC] Error: ${err.message}`));
}

createBot();

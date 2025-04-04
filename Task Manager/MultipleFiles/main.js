const menu = require('./menu');

menu.Menu();

process.on('SIGINT', () => {
    menu.rl.close();
    process.exit(0);
});
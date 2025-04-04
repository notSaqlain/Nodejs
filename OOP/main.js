const menu = require('./menu');

menu.Menu();

process.on('exit', () => {
    console.log('Task Management System closed.');
});

process.on('SIGINT', () => {
    menu.rl.close();
    process.exit(0);
});
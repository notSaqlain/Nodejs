// Main application for Task Management System
const menu = require('./menu');

// Start the menu system
menu.displayMenu();

// Handle application exit
process.on('exit', () => {
    console.log('Task Management System closed.');
});

// Handle CTRL+C exit
process.on('SIGINT', () => {
    menu.rl.close();
    process.exit(0);
});
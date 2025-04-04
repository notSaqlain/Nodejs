const fs = require('fs');
const ToDo = require('./Todo');

const task = new ToDo(5, "task1", "questa è la mia prima task", false);

const jsonData = JSON.stringify({ Tasks: [task] }, null, 2);

console.log(jsonData);

fs.writeFile('tasks.json', jsonData, (err) => {
    if (err) {
        console.error('Errore durante il salvataggio del file:', err);
    } else {
        console.log('Attività salvata in tasks.json!');
    }
});
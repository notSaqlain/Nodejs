const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let todo = [];

function askTask() {
    rl.question('Inserisci un\'attività (o digita "fine" per terminare): ', (input) => {
        if (input.toLowerCase() === 'fine') {
            const jsonData = JSON.stringify({ Task: todo }, null, 2);

            fs.writeFile('tasks.json', jsonData, (err) => {
                if (err) {
                    console.error('Errore durante il salvataggio del file:', err);
                } else {
                    console.log('Attività salvate in attività.json!');
                }

                rl.close();
            });
        } else {
            todo.push(input);
            askTask();
        }
    });
}

askTask();

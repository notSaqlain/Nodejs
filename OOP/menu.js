const fs = require('fs');
const readline = require('readline');
const ToDo = require('./Todo');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const file = 'tasks.json';

function Menu() {
    console.log('\n===== sistema gestione task =====');
    console.log('1. aggiungi task');
    console.log('2. rimuovi task');
    console.log('3. visualizza task');
    console.log('4. esci');
    console.log('==================================');

    rl.question('scelta (1-4): ', (choice) => {
        switch (choice) {
            case '1':
                addTask();
                break;
            case '2':
                removeTask();
                break;
            case '3':
                viewTasks();
                break;
            case '4':
                console.log('arivederci!');
                rl.close();
                break;
            default:
                console.log('scelta non valida, riprova');
                Menu();
                break;
        }
    });
}


function LeggiTasks() {
    try {
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf8');
            return JSON.parse(data).Tasks || [];
        }
        return [];
    } catch (error) {
        console.error('errore nel caricamento della task', error.message);
        return [];
    }
}

function SalvaTasks(tasks) {
    try {
        const jsonData = JSON.stringify({ Tasks: tasks }, null, 2);
        fs.writeFileSync(file, jsonData);
        console.log('task salvata');
    } catch (error) {
        console.error('errore nel salvataggio della task', error.message);
    }
}

function getId(tasks) {
    const idd= new Set(tasks.map(t => t.id));
    let newId = 1;

    while (idd.has(newId)) {
        newId++;
    }

    return newId;
}

function addTask() {
    console.log('\n----- aggiungi nuova task -----');

    const tasks = LeggiTasks();
    const newId = getId(tasks);

    rl.question('nome task: ', (name) => {
        if (!name.trim()) {
            console.log('la task deve avere un nome, riprova');
            return addTask();
        }

        rl.question('descrizione task: ', (description) => {
            if (!description.trim()) {
                console.log('la descrizione della task deve esserci per forza, riprova');
                return addTask();
            }

            // Create new task
            const newTask = new ToDo(newId, name, description, false);
            tasks.push(newTask);
            SalvaTasks(tasks); // Save the updated task list

            console.log(`Task "${name}" aggiunta con ID ${newId}`);
            console.log('-------------------------');
            Menu(); // Return to the menu
        });
    });
}

function removeTask() {
    console.log('\n----- rimuovi task -----');
    const tasks = LeggiTasks();
    
    if (tasks.length === 0) {
        console.log('nessuna task da rimuovere disponibile.');
        console.log('------------------------');
        return Menu();
    }
    
    console.log('trask disponibil:');
    tasks.forEach(task => {
        console.log(`ID: ${task.id} | nome: ${task.name} | completata: ${task.isCompleted ? 'Si' : 'No'}`);
    });
    
    rl.question('\nscrivi l\' id della task da rimuovere: ', (idStr) => {
        const id = parseInt(idStr);
        
        if (isNaN(id)) {
            console.log('id non valido.');
            return removeTask();
        }
        
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
            console.log(`nessuna task con id ${id} trovata. riprova.`);
            return removeTask();
        }
        
        const taskToRemove = tasks[taskIndex];
        
        rl.question(`sei sicuro di voler rimuovere la task "${taskToRemove.name}"? (s/n): `, (answer) => {
            if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
                tasks.splice(taskIndex, 1);
                SalvaTasks(tasks);
                console.log(`Task "${taskToRemove.name}" rimossa`);
            } else {
                console.log('rimozione task cancellata');
            }
            console.log('------------------------');
            Menu();
        });
    });
}


function viewTasks() {
    console.log('\n----- lista task -----');
    const tasks = LeggiTasks();
    
    if (tasks.length === 0) {
        console.log('non ci sono task');
    } else { 
        console.log('ID | nome | descrizione | stato');
        console.log('--------------------------------');
        tasks.forEach(task => {
            console.log(`${task.id} | ${task.name} | ${task.description} | ${task.isCompleted ? 'Completed' : 'Pending'}`);
        });
    }
    
    console.log('---------------------');
    Menu();
}

module.exports = {
    Menu,
    LeggiTasks,
    SalvaTasks,
    addTask,
    removeTask,
    viewTasks,
    rl
};
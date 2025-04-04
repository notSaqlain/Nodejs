const fs = require('fs');
const readline = require('readline');
const ToDo = require('./Todo');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Data file path
const DATA_FILE = 'tasks.json';

// Menu Functions
function displayMenu() {
    console.log('\n===== Task Management System =====');
    console.log('1. Add Task');
    console.log('2. Remove Task');
    console.log('3. View Tasks');
    console.log('4. Exit');
    console.log('==================================');

    rl.question('Enter your choice (1-4): ', (choice) => {
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
                console.log('Exiting Task Management System. Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                displayMenu();
                break;
        }
    });
}

// Load tasks from JSON file
function loadTasks() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data).Tasks || [];
        }
        return [];
    } catch (error) {
        console.error('Error loading tasks:', error.message);
        return [];
    }
}

// Save tasks to JSON file
function saveTasks(tasks) {
    try {
        const jsonData = JSON.stringify({ Tasks: tasks }, null, 2);
        fs.writeFileSync(DATA_FILE, jsonData);
        console.log('Tasks saved successfully!');
    } catch (error) {
        console.error('Error saving tasks:', error.message);
    }
}

// Function to add a new task
function addTask() {
    console.log('\n----- Add New Task -----');
    
    // Generate a new ID based on existing tasks
    const tasks = loadTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    rl.question('Enter task name: ', (name) => {
        if (!name.trim()) {
            console.log('Task name cannot be empty. Please try again.');
            return addTask();
        }
        
        rl.question('Enter task description: ', (description) => {
            if (!description.trim()) {
                console.log('Task description cannot be empty. Please try again.');
                return addTask();
            }
            
            // Create new task
            const newTask = new ToDo(newId, name, description, false);
            tasks.push(newTask);
            saveTasks(tasks);
            
            console.log(`Task "${name}" added successfully with ID: ${newId}`);
            console.log('-------------------------');
            displayMenu();
        });
    });
}

// Function to remove a task
function removeTask() {
    console.log('\n----- Remove Task -----');
    const tasks = loadTasks();
    
    if (tasks.length === 0) {
        console.log('No tasks available to remove.');
        console.log('------------------------');
        return displayMenu();
    }
    
    console.log('Available tasks:');
    tasks.forEach(task => {
        console.log(`ID: ${task.id} | Name: ${task.name} | Completed: ${task.isCompleted ? 'Yes' : 'No'}`);
    });
    
    rl.question('\nEnter the ID of the task to remove: ', (idStr) => {
        const id = parseInt(idStr);
        
        if (isNaN(id)) {
            console.log('Invalid ID. Please enter a number.');
            return removeTask();
        }
        
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
            console.log(`No task found with ID ${id}. Please try again.`);
            return removeTask();
        }
        
        const taskToRemove = tasks[taskIndex];
        
        rl.question(`Are you sure you want to remove task "${taskToRemove.name}"? (y/n): `, (answer) => {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                tasks.splice(taskIndex, 1);
                saveTasks(tasks);
                console.log(`Task "${taskToRemove.name}" removed successfully.`);
            } else {
                console.log('Task removal cancelled.');
            }
            console.log('------------------------');
            displayMenu();
        });
    });
}

// Function to view all tasks
function viewTasks() {
    console.log('\n----- Task List -----');
    const tasks = loadTasks();
    
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('ID | Name | Description | Status');
        console.log('--------------------------------');
        tasks.forEach(task => {
            console.log(`${task.id} | ${task.name} | ${task.description} | ${task.isCompleted ? 'Completed' : 'Pending'}`);
        });
    }
    
    console.log('---------------------');
    displayMenu();
}

// Export menu functions
module.exports = {
    displayMenu,
    loadTasks,
    saveTasks,
    addTask,
    removeTask,
    viewTasks,
    rl
};
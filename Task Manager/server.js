const express = require('express');
const bodyParser = require('body-parser');
const menu = require('./MultipleFiles/menu');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    menu.addTask(req.body.name, req.body.description);
    res.redirect('/view');
});

app.get('/remove', (req, res) => {
    res.render('remove', { tasks: menu.LeggiTasks() });
});

app.post('/remove', (req, res) => {
    menu.removeTask(req.body.id);
    res.redirect('/view');
});

app.get('/view', (req, res) => {
    const tasks = menu.LeggiTasks();
    res.render('view', { tasks });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
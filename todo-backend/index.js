const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_manager'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const completed = 'Not Completed';  // Default status for new tasks
  db.query(
    'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
    [title, description, completed],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json({ id: result.insertId, title, description, completed });
    }
  );
});

// Update task status to "Completed"
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const status = completed ? 'Completed' : 'Not Completed';
  db.query(
    'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, status, id],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    }
  );
});

// Delete a task
app.delete('/tasks', (req, res) => {
  db.query('DELETE FROM tasks', (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Reset AUTO_INCREMENT
    db.query('ALTER TABLE tasks AUTO_INCREMENT = 1', (resetErr) => {
      if (resetErr) {
        return res.status(500).send(resetErr);
      }
      res.sendStatus(200);
    });
  });
});

  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

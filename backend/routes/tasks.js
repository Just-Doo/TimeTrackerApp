import express from 'express';
import connection from '../db/connection.js';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
  const query = 'SELECT * FROM tasks';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

// Create a new task
router.post('/', (req, res) => {
  const { name, expected_time } = req.body;
  const query = 'INSERT INTO tasks (name, expected_time) VALUES (?, ?)';
  connection.query(query, [name, expected_time], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.status(201).json({ message: 'Task added!', taskId: result.insertId });
  });
});

// Start a task
router.post('/:id/start', (req, res) => {
  const { id } = req.params;
  const startTime = new Date();
  const query = 'INSERT INTO task_completion (task_id, start_time) VALUES (?, ?)';
  connection.query(query, [id, startTime], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json({ message: 'Task started!' });
  });
});

// End a task
router.post('/:id/end', (req, res) => {
  const { id } = req.params;
  const endTime = new Date();
  const query = `
    UPDATE task_completion 
    SET end_time = ?, duration = TIMEDIFF(?, start_time) 
    WHERE task_id = ? AND end_time IS NULL
  `;
  connection.query(query, [endTime, endTime, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json({ message: 'Task ended!' });
  });
});

export default router;
const Task = require('../models/Task');
const User = require('../models/User');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, assignedTo, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    // Verify user exists if assigned
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    const task = new Task({
      title,
      assignedTo: assignedTo || null,
      status: status || 'Backlog'
    });

    await task.save();
    await task.populate('assignedTo');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task', message: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo').sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks', message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task', message: error.message });
  }
};

// Update task status
exports.updateTask = async (req, res) => {
  try {
    const { title, assignedTo, status } = req.body;

    // Verify user exists if assigned
    if (assignedTo && assignedTo !== '') {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title || undefined,
        assignedTo: assignedTo || null,
        status: status || undefined
      },
      { new: true }
    ).populate('assignedTo');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task', message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', message: error.message });
  }
};

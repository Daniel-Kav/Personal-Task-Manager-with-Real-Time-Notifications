import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Notification {
  id: number;
  message: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    } else {
      // Simulating fetching tasks from an API
      setTasks([
        { id: 1, title: 'Complete project proposal', completed: false },
        { id: 2, title: 'Review code changes', completed: true },
        { id: 3, title: 'Update documentation', completed: false },
      ]);
    }
  }, [navigate]);

  useEffect(() => {
    // Simulating real-time notifications
    const notificationInterval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New notification at ${new Date().toLocaleTimeString()}`,
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
      };
      setTasks(prev => [...prev, newTaskItem]);
      setNewTask('');
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Task Management Dashboard</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col space-y-4">
                  <form onSubmit={handleAddTask} className="flex space-x-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Add a new task"
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      Add Task
                    </button>
                  </form>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className={task.completed ? 'line-through text-gray-500' : ''}>
                            {task.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <h2 className="text-xl mb-2">Notifications</h2>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2 bg-yellow-100 rounded-md text-sm"
                    >
                      {notification.message}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <Link
                  to="/logout"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
export const loadTasks = () => {
  try {
    const raw = localStorage.getItem('kanban_tasks_v1');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load tasks', err);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem('kanban_tasks_v1', JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks', err);
  }
};

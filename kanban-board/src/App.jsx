import React, { useState, useEffect } from "react";
import Column from "./components/Column";

// load infos from localstorage
const loadTasks = () => {
  const saved = localStorage.getItem("kanban_tasks");
  return saved ? JSON.parse(saved) : [];
};

const loadColumns = () => {
  const saved = localStorage.getItem("kanban_columns");
  return saved
    ? JSON.parse(saved)
    : [
        { key: "todo", title: "To Do" },
        { key: "inprogress", title: "In Progress" },
        { key: "done", title: "Done" },
      ];
};

export default function App() {
  const [columns, setColumns] = useState(loadColumns);
  const [tasks, setTasks] = useState(loadTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showAddColumnForm, setShowAddColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("kanban_columns", JSON.stringify(columns));
  }, [columns]);

  // Drag
  const handleDragStart = (taskId) => {
    setDraggedTask(taskId);
  };

  // Drop
  const handleDrop = (columnKey) => {
    if (!draggedTask) return;
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTask
          ? { ...task, status: columnKey }
          : task
      )
    );
    setDraggedTask(null);
  };

  // add new task
  const addTask = (columnKey, taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || "",
      status: columnKey,
      tag: taskData.tag || { label: "General", color: "#6b7280" },
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  // update a task
  const updateTask = (id, updates) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  // delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // add new column
  const addColumn = (e) => {
    e.preventDefault();
    if (!newColumnName.trim()) {
      alert("Please enter a column name");
      return;
    }
    const key = newColumnName.toLowerCase().replace(/\s+/g, "-");
    setColumns([...columns, { key, title: newColumnName.trim() }]);
    setNewColumnName("");
    setShowAddColumnForm(false);
  };

  // delete a column
  const deleteColumn = (columnKey) => {
    if (!window.confirm("Delete this column? Tasks will be moved to 'To Do'."))
      return;
    const newColumns = columns.filter((col) => col.key !== columnKey);
    setColumns(newColumns);
    // move tasks to 1st column when a column is deleted
    const firstCol = newColumns[0] ? newColumns[0].key : "todo";
    setTasks(
      tasks.map((task) =>
        task.status === columnKey ? { ...task, status: firstCol } : task
      )
    );
  };

  // allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <div>
            <h1 style={titleStyle}>Kanban Board</h1>
            <p style={subtitleStyle}>Organize and prioritize your work visually</p>
          </div>
          
          {/* add board form */}
          <div style={addBoardContainerStyle}>
            {showAddColumnForm ? (
              <form 
                onSubmit={addColumn}
                style={addBoardFormStyle}
              >
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Enter board name..."
                  style={boardInputStyle}
                  autoFocus
                />
                <div style={boardFormButtonsStyle}>
                  <button 
                    type="submit"
                    style={primaryButtonStyle}
                  >
                    Create
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddColumnForm(false);
                      setNewColumnName("");
                    }}
                    style={secondaryButtonStyle}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddColumnForm(true)}
                style={addBoardButtonStyle}
              >
                <span style={{ fontSize: "18px", marginRight: "6px" }}>+</span> 
                Add Board
              </button>
            )}
          </div>
        </div>
        
        <div style={statsStyle}>
          <span>Total Tasks: <strong>{tasks.length}</strong></span>
          <span>Boards: <strong>{columns.length}</strong></span>
          <span style={{ color: "#8c1111", fontSize: "12px" }}>
           Drag tasks between boards to change their status
          </span>
        </div>
      </header>

      <main style={mainStyle}>
        {columns.map((col) => (
          <div
            key={col.key}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col.key)}
            style={{ height: "100%" }}
          >
            <Column
              columnKey={col.key}
              title={col.title}
              tasks={tasks.filter((task) => task.status === col.key)}
              onAddTask={(data) => addTask(col.key, data)}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onDeleteColumn={() => deleteColumn(col.key)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.key)}
            />
          </div>
        ))}
        
        {/*no columns */}
        {columns.length === 0 && (
          <div style={emptyStateStyle}>
            <div style={emptyStateContentStyle}>
              <h3>No Boards Yet</h3>
              <p>Create your first board to start organizing tasks</p>
              <button
                onClick={() => setShowAddColumnForm(true)}
                style={emptyStateButtonStyle}
              >
                + Create First Board
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Styles
const appStyle = {
  padding: "20px",
  fontFamily: "Inter, sans-serif",
  minHeight: "100vh",
  background: "#ab8f6a",
  color: "#8c1111",
};

const headerStyle = {
  marginBottom: "30px",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "20px 24px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(140, 17, 17, 0.1)",
};

const headerContentStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "15px",
};

const titleStyle = {
  margin: "0 0 5px 0",
  color: "#8c1111",
  fontSize: "28px",
  fontWeight: "700",
};

const subtitleStyle = {
  margin: "0",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "400",
};

const addBoardContainerStyle = {
  position: "relative",
};

const addBoardFormStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: "white",
  padding: "16px",
  borderRadius: "10px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
  border: "1px solid rgba(140, 17, 17, 0.15)",
  minWidth: "280px",
};

const boardInputStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "2px solid #8c1111",
  fontSize: "14px",
  width: "100%",
  color: "#8c1111",
  background: "#fef2f2",
  outline: "none",
  transition: "border 0.2s",
};

const boardFormButtonsStyle = {
  display: "flex",
  gap: "10px",
};

const addBoardButtonStyle = {
  background: "#8c1111",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  transition: "all 0.2s",
  boxShadow: "0 3px 10px rgba(140, 17, 17, 0.2)",
};

const primaryButtonStyle = {
  flex: 1,
  background: "#8c1111",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "background 0.2s",
};

const secondaryButtonStyle = {
  flex: 1,
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.2s",
};

const statsStyle = {
  display: "flex",
  gap: "20px",
  fontSize: "13px",
  color: "#6b7280",
  paddingTop: "15px",
  borderTop: "1px solid #e5e7eb",
};

const mainStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  alignItems: "flex-start",
};

const emptyStateStyle = {
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "14px",
  border: "2px dashed rgba(140, 17, 17, 0.2)",
};

const emptyStateContentStyle = {
  textAlign: "center",
  padding: "40px",
  color: "#8c1111",
};

const emptyStateIconStyle = {
  fontSize: "48px",
  marginBottom: "20px",
  opacity: "0.7",
};

const emptyStateButtonStyle = {
  marginTop: "20px",
  background: "#8c1111",
  color: "white",
  border: "none",
  padding: "12px 28px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
};
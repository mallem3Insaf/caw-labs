import React, { useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function Column({
  title,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onDeleteColumn,
  onDragStart,
  onDragOver,
  onDrop,
  columnKey,
}) {
  const [showForm, setShowForm] = useState(false);
  
  const taskCount = tasks.length;

  return (
    <div
      style={columnStyle(taskCount)}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div style={columnHeaderStyle}>
        <div style={columnTitleStyle}>
          <h3 style={titleTextStyle}>{title}</h3>
          <span style={taskCountStyle}>{taskCount}</span>
        </div>
        <button
          onClick={() => {
            if (window.confirm(`Delete board "${title}"?`))
              onDeleteColumn(columnKey);
          }}
          style={deleteButtonStyle}
          title="Delete board"
        >
          ×
        </button>
      </div>

      <div style={tasksContainerStyle}>
        {taskCount === 0 ? (
          <div style={emptyColumnStyle}>
            <p style={emptyTextStyle}>No tasks here yet</p>
            <p style={emptySubtextStyle}>Add your first task below</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>

      {/* show the + btn or the form */}
      {showForm ? (
        <TaskForm 
          onAdd={(taskData) => {
            onAddTask(taskData);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          style={addTaskButtonStyle}
        >
          <span style={plusIconStyle}>+</span> 
          <span>Add Task</span>
        </button>
      )}
    </div>
  );
}

// Styles
const columnStyle = (taskCount) => ({
  background: "rgba(255, 255, 255, 0.95)",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid rgba(140, 17, 17, 0.1)",
  minHeight: taskCount === 0 ? "280px" : "400px",
  height: taskCount === 0 ? "auto" : "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
});

const columnHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "12px",
  borderBottom: "2px solid rgba(140, 17, 17, 0.1)",
};

const columnTitleStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const titleTextStyle = {
  margin: 0,
  fontSize: "16px",
  color: "#8c1111",
  fontWeight: "600",
};

const taskCountStyle = {
  background: "rgba(140, 17, 17, 0.1)",
  color: "#8c1111",
  padding: "2px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
  minWidth: "24px",
  textAlign: "center",
};

const deleteButtonStyle = {
  background: "transparent",
  color: "#9ca3af",
  border: "none",
  padding: "4px 8px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "18px",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  fontWeight: "300",
};

const tasksContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flex: 1,
  overflowY: "auto",
  paddingRight: "4px",
};

const emptyColumnStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 0",
  color: "#9ca3af",
};

const emptyIconStyle = {
  fontSize: "32px",
  marginBottom: "10px",
  opacity: "0.5",
};

const emptyTextStyle = {
  margin: "0 0 5px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#6b7280",
};

const emptySubtextStyle = {
  margin: 0,
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center",
};

const addTaskButtonStyle = {
  background: "rgba(140, 17, 17, 0.08)",
  color: "#8c1111",
  border: "1px dashed rgba(140, 17, 17, 0.3)",
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.2s",
  fontWeight: "500",
};

const plusIconStyle = {
  fontSize: "18px",
  fontWeight: "300",
};
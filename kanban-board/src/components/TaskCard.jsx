import React, { useState } from "react";

const TAGS = [
  { label: "Urgent", color: "#dc3545" },
  { label: "Important", color: "#fd7e14" },
  { label: "Bug", color: "#6f42c1" },
  { label: "Feature", color: "#20c997" },
  { label: "General", color: "#6b7280" },
  { label: "Enhancement", color: "#17a2b8" },
  { label: "Design", color: "#e83e8c" },
  { label: "Documentation", color: "#28a745" },
];

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
  onDragStart,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [selectedTag, setSelectedTag] = useState(task.tag || TAGS[4]);

  const handleSave = () => {
    onUpdate(task.id, { 
      title: title.trim(), 
      description: desc.trim(),
      tag: selectedTag
    });
    setIsEditing(false);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    onDragStart(task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (isEditing) {
    return (
      <div style={editCardStyle}>
        <div style={editFormStyle}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={editInputStyle}
            autoFocus
            placeholder="Task title"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={editTextareaStyle}
            placeholder="Description (optional)"
          />
          
          <div style={tagSectionStyle}>
            <label style={tagLabelStyle}>Tag:</label>
            <div style={tagsContainerStyle}>
              {TAGS.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  style={{
                    ...tagButtonStyle,
                    background: selectedTag.label === tag.label ? tag.color : "#f8f9fa",
                    color: selectedTag.label === tag.label ? "white" : tag.color,
                    border: `1px solid ${tag.color}`,
                  }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div style={editButtonsStyle}>
            <button 
              onClick={handleSave}
              style={saveButtonStyle}
            >
              Save Changes
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              style={cancelEditButtonStyle}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      style={taskCardStyle}
    >
      <div style={taskHeaderStyle}>
        <h4 style={taskTitleStyle}>{task.title}</h4>
        {task.tag && (
          <span
            style={tagStyle(task.tag.color)}
            title={task.tag.label}
          >
            {task.tag.label}
          </span>
        )}
      </div>
      
      {task.description && (
        <p style={descriptionStyle}>
          {task.description}
        </p>
      )}
      
      <div style={taskFooterStyle}>
        <small style={dateStyle}>
          {new Date(task.createdAt).toLocaleDateString()}
        </small>
        
        <div style={actionButtonsStyle}>
          <button 
            onClick={() => setIsEditing(true)}
            style={editButtonStyle}
            title="Edit task"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            style={deleteButtonStyle}
            title="Delete task"
          >
            Delete
          </button>
          
        </div>
      </div>
    </div>
  );
}

// Styles
const taskCardStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
  cursor: "grab",
  transition: "all 0.2s",
};

const taskHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "10px",
  gap: "10px",
};

const taskTitleStyle = {
  margin: 0,
  flex: 1,
  fontSize: "14px",
  color: "#111827",
  fontWeight: "500",
  lineHeight: "1.4",
};

const tagStyle = (color) => ({
  background: color,
  color: "white",
  padding: "3px 8px",
  borderRadius: "10px",
  fontSize: "10px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  flexShrink: 0,
});

const descriptionStyle = {
  margin: "0 0 12px 0",
  fontSize: "13px",
  color: "#6b7280",
  lineHeight: "1.5",
};

const taskFooterStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
};

const dateStyle = {
  color: "#9ca3af",
  fontSize: "11px",
  fontWeight: "400",
};

const actionButtonsStyle = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
};

const editButtonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  padding: "4px 6px",
  borderRadius: "4px",
  color: "#6b7280",
  transition: "all 0.2s",
};

const deleteButtonStyle = {
  ...editButtonStyle,
  color: "#ef4444",
};

const dragHintStyle = {
  color: "#9ca3af",
  fontSize: "12px",
  marginLeft: "4px",
  opacity: "0.7",
};

// Edit
const editCardStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "10px",
  border: "2px solid #8c1111",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
};

const editFormStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const editInputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "2px solid #8c1111",
  fontSize: "14px",
  color: "#8c1111",
  background: "#fef2f2",
  outline: "none",
  fontWeight: "500",
};

const editTextareaStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "13px",
  minHeight: "70px",
  resize: "vertical",
  color: "#374151",
  background: "#f9fafb",
  lineHeight: "1.5",
};

const tagSectionStyle = {
  marginTop: "5px",
};

const tagLabelStyle = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "8px",
  display: "block",
};

const tagsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const tagButtonStyle = {
  padding: "4px 8px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "10px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const editButtonsStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const saveButtonStyle = {
  flex: 1,
  background: "#8c1111",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "background 0.2s",
};

const cancelEditButtonStyle = {
  flex: 1,
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  transition: "background 0.2s",
};
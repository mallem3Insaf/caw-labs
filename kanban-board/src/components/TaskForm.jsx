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

export default function TaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState(TAGS[4]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    onAdd({
      title: title.trim(),
      description: description.trim(),
      tag: selectedTag,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div style={formContainerStyle}>
      <h4 style={formTitleStyle}>Add New Task</h4>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            autoFocus
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <textarea
            placeholder="Add details, description, or notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, ...textareaStyle }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Tag:</label>
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
                  boxShadow: selectedTag.label === tag.label ? `0 2px 4px ${tag.color}40` : "none",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
          <div style={tagPreviewStyle}>
            <span style={previewLabelStyle}>Selected:</span>
            <span
              style={{
                background: selectedTag.color,
                color: "white",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {selectedTag.label}
            </span>
          </div>
        </div>

        <div style={buttonGroupStyle}>
          <button type="submit" style={submitButtonStyle}>
            <span style={{ marginRight: "6px" }}>✓</span>
            Add Task
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={cancelButtonStyle}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Styles
const formContainerStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "16px",
  border: "1px solid rgba(140, 17, 17, 0.1)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
};

const formTitleStyle = {
  margin: "0 0 16px 0",
  color: "#8c1111",
  fontSize: "15px",
  fontWeight: "600",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "4px",
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "#111827",
  background: "#f9fafb",
  transition: "all 0.2s",
};

const textareaStyle = {
  height: "70px",
  resize: "vertical",
  lineHeight: "1.5",
};

const tagsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginTop: "4px",
};

const tagButtonStyle = {
  padding: "5px 10px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const tagPreviewStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
  fontSize: "13px",
};

const previewLabelStyle = {
  color: "#6b7280",
  fontWeight: "500",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "8px",
};

const submitButtonStyle = {
  flex: 1,
  background: "#8c1111",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
};

const cancelButtonStyle = {
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
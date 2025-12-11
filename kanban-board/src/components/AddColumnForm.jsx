import React, { useState } from "react";

export default function AddColumnForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a column name");
      return;
    }
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 300,
      }}
    >
      <h3 style={{ margin: 0, textAlign: "center" }}>Add New Column</h3>
      
      <input
        type="text"
        placeholder="Column name (e.g., 'Review', 'Testing')"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
        autoFocus
      />

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          type="submit"
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: "14px",
            flex: 1,
          }}
        >
          Add Column
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "#6c757d",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: "14px",
            flex: 1,
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
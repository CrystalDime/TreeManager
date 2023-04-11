import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ onAddNode }) => {
  const [pid, setPid] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/tree", { pid });
      onAddNode(response.data);
      setPid("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        PID:
        <input
          type="number"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default InputForm;

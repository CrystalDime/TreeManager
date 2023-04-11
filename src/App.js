import React, { useState, useEffect } from "react";
import axios from "axios";
import TreeView from "./components/TreeView";
import InputForm from "./components/InputForm";

const App = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get("/api/tree");
        setTreeData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTreeData();
  }, []);

  const handleAddNode = (newNode) => {
    setTreeData([...treeData, newNode]);
  };

  return (
    <div>
      <h1>Tree Manager</h1>
      <TreeView treeData={treeData} />
      <InputForm onAddNode={handleAddNode} />
    </div>
  );
};

export default App;

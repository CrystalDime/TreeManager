import mysql from "mysql2/promise";

const config = {
  host: "containers-us-west-201.railway.app",
  user: "root",
  password: "Hb1LFu7NG2ikQvTV7Ukx",
  port: "7807",
  database: "railway"
};

async function getTreeData() {
  const connection = await mysql.createConnection(config);
  console.log("we have connected");
  const [rows] = await connection.execute("SELECT * FROM tree_nodes");
  await connection.end();
  return rows;
}

async function addNode(parentId) {
  const connection = await mysql.createConnection(config);
  const [
    result
  ] = await connection.execute(
    "INSERT INTO tree_nodes (parent_id) VALUES (?)",
    [parentId]
  );
  const [node] = await connection.query(
    "SELECT * FROM tree_nodes WHERE id = ?",
    [result.insertId]
  );
  await connection.end();
  return node;
}

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const treeData = await getTreeData();
      res.status(200).json(treeData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tree data." });
    }
  } else if (req.method === "POST") {
    const { pid } = req.body;

    if (!pid) {
      res.status(400).json({ message: "Parent node ID is required." });
      return;
    }

    try {
      const newNode = await addNode(pid);
      res.status(200).json(newNode);
    } catch (error) {
      res.status(500).json({ message: "Error adding new node." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};

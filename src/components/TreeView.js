import React from "react";

const TreeView = ({ treeData }) => {
  const maxDepth = treeData.reduce((max, node) => Math.max(max, node.depth), 0);

  return (
    <table>
      <thead>
        <tr>
          <th>Depth</th>
          <th>Tree Nodes</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxDepth + 1 }).map((_, depth) => (
          <tr key={depth}>
            <td>{depth}</td>
            <td>
              {treeData
                .filter((node) => node.depth === depth)
                .map((node) => (
                  <span key={node.id}>
                    [P: {node.parent === null ? "NONE" : node.parent} ID:{" "}
                    {node.id}]
                  </span>
                ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TreeView;

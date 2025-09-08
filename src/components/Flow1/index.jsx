import React, { useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  SelectionMode,
  Panel,
  NodeToolbar,
  NodeResizer,
} from "reactflow";

import "reactflow/dist/style.css";
import "./index.scss";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "input",
    style: { backgroundColor: "#ff0072", color: "white" },
  },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: "output" },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "to target" },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [variant, setVariant] = useState("dots");

  return (
    <div className="flow-wrapper">
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={{ animated: true }}
        panOnScroll // 空格 + 拖动鼠标、滚动、鼠标中键或鼠标右键
        panOnDrag={[1, 2]} // 拖动鼠标创建
        selectionOnDrag
        selectionMode={SelectionMode.Partial} // 将仅部分选择的节点添加到选择中
      >
        <Controls />
        <MiniMap
          zoomable
          pannable
          nodeStrokeWidth={10}
          nodeColor={(node) => {
            switch (node.type) {
              case "input":
                return "#6ede87";
              case "output":
                return "#6865A5";
              default:
                return "#ff0072";
            }
          }}
        />
        <Panel>
          <div>variant:</div>
          <button onClick={() => setVariant("dots")}>dots</button>
          <button onClick={() => setVariant("lines")}>lines</button>
          <button onClick={() => setVariant("cross")}>cross</button>
        </Panel>
        <NodeToolbar />
        <NodeResizer />
        <Background variant={variant} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

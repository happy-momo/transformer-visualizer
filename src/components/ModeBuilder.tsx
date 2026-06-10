import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ModelConfig } from '../types';
import { ReactFlow, Background, useNodesState, useEdgesState, addEdge, Connection, Edge, Node, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ModuleNode from './ModuleNode';
import CodeWindowNode from './CodeWindowNode';
import { snippets, CodeSnippet } from '../data/codeSnippets';
import { Sparkles, MousePointer2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const nodeTypes = {
  moduleNode: ModuleNode,
  codeNode: CodeWindowNode,
};

function formatSnippet(code: string, config: ModelConfig) {
  return code
      .replace(/\{d_model\}/g, config.dModel.toString())
      .replace(/\{n_heads\}/g, config.nHeads.toString())
      .replace(/\{d_ff\}/g, config.dFfn.toString())
      .replace(/\{dropout\}/g, config.dropout.toString());
}

function ModeBuilderFlow({ config }: { config: ModelConfig }) {
  const { lang, theme } = useAppContext();
  const t = {
    zh: {
      srcInputTitle: '源序列输入', srcInputSub: '批处理字符串', tgtInputTitle: '目标序列输入', tgtInputSub: '右移对齐', embedTitle: '词嵌入与位置编码', embedSubEnc: '输入向量映射', embedSubDec: '目标向量映射', encTitle: 'Encoder 层', encSub: '多头注意力与前馈网络', decTitle: 'Decoder 层', decSub: '掩码注意力与交叉注意力', linearTitle: '线性映射层', linearSub: '词表维度映射', softmaxTitle: 'Softmax 激活', softmaxSub: '词汇概率分布', canvasTitle: '交互式画板',
      canvasDesc: '拖拽模块以重新排列，或点击模块查看底层 Python 实现机制。',
      zoom: '缩放: 滚轮',
      pan: '平移: 拖拽画板'
    },
    en: {
      canvasTitle: '{t.canvasTitle}s',
      canvasDesc: '{t.canvasDesc}',
      zoom: '{t.zoom}',
      pan: '{t.pan}'
    }
  }[lang];
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  
  // Re-generate nodes when config elements that affect layout change
  useEffect(() => {
    const nds: Node[] = [];
    const eds: Edge[] = [];
    
    // ENCODER PATH
    let eY = 50;
    const eX = 200;
    
    nds.push({
        id: 'enc-input', type: 'moduleNode', position: { x: eX, y: eY },
        data: { title: t.srcInputTitle, sub: t.srcInputSub, moduleType: 'input', hasOutput: true, bgClass: 'bg-slate-700/80' }
    });
    
    eY += 90;
    nds.push({
        id: 'enc-embed', type: 'moduleNode', position: { x: eX, y: eY },
        data: { title: t.embedTitle, sub: t.embedSubEnc, moduleType: 'embedding', hasInput: true, hasOutput: true, bgClass: 'bg-indigo-900/40 border-indigo-500/40 text-indigo-200' }
    });
    eds.push({ id: 'e-in-emb', source: 'enc-input', target: 'enc-embed' });
    
    let lastEnc = 'enc-embed';
    
    for (let i = 0; i < config.numEncoders; i++) {
        eY += 90;
        const id = `encoder-${i}`;
        nds.push({
            id, type: 'moduleNode', position: { x: eX, y: eY },
            data: { title: `${t.encTitle} ${i + 1}`, sub: t.encSub, moduleType: 'encoder', hasInput: true, hasOutput: true }
        });
        eds.push({ id: `e-${lastEnc}-${id}`, source: lastEnc, target: id });
        lastEnc = id;
    }
    
    // DECODER PATH
    let dY = 50;
    const dX = 550;
    
    nds.push({
        id: 'dec-input', type: 'moduleNode', position: { x: dX, y: dY },
        data: { title: t.tgtInputTitle, sub: t.tgtInputSub, moduleType: 'input', hasOutput: true, bgClass: 'bg-slate-700/80' }
    });
    
    dY += 90;
    nds.push({
        id: 'dec-embed', type: 'moduleNode', position: { x: dX, y: dY },
        data: { title: t.embedTitle, sub: t.embedSubDec, moduleType: 'embedding', hasInput: true, hasOutput: true, bgClass: 'bg-indigo-900/40 border-indigo-500/40 text-indigo-200' }
    });
    eds.push({ id: 'e-din-demb', source: 'dec-input', target: 'dec-embed' });
    
    let lastDec = 'dec-embed';
    
    for (let i = 0; i < config.numDecoders; i++) {
        dY += 90;
        const id = `decoder-${i}`;
        nds.push({
            id, type: 'moduleNode', position: { x: dX, y: dY },
            data: { title: `${t.decTitle} ${i + 1}`, sub: t.decSub, moduleType: 'decoder', hasInput: true, hasOutput: true, hasMemory: true }
        });
        eds.push({ id: `e-${lastDec}-${id}`, source: lastDec, target: id, targetHandle: 'in' });
        
        // Memory connection
        if (lastEnc !== 'enc-embed') {
           eds.push({ 
               id: `e-mem-${i}`, source: lastEnc, target: id, targetHandle: 'memory', 
               type: 'smoothstep', 
               animated: true,
               style: { stroke: '#6366f1', strokeWidth: 2 },
               label: 'Memory',
               labelStyle: { fill: '#818cf8', fontSize: 10, fontWeight: 700 },
               labelBgStyle: { fill: '#1e293b' }
           });
        }
        
        lastDec = id;
    }
    
    // OUTPUT
    dY += 90;
    nds.push({
        id: 'linear', type: 'moduleNode', position: { x: dX, y: dY },
        data: { title: t.linearTitle, sub: t.linearSub, moduleType: 'linear', hasInput: true, hasOutput: true, bgClass: 'bg-slate-800' }
    });
    eds.push({ id: `e-${lastDec}-linear`, source: lastDec, target: 'linear', targetHandle: 'in' });
    
    dY += 90;
    nds.push({
        id: 'softmax', type: 'moduleNode', position: { x: dX, y: dY },
        data: { title: t.softmaxTitle, sub: t.softmaxSub, moduleType: 'softmax', hasInput: true, bgClass: 'bg-rose-900/40 border-rose-500/40' }
    });
    eds.push({ id: `e-lin-soft`, source: 'linear', target: 'softmax', targetHandle: 'in' });

    setNodes(nds);
    setEdges(eds);
    
    // Cleanup floating code node on major restructure
  }, [config.numEncoders, config.numDecoders, setNodes, setEdges, lang]);
  
  // Also dynamically update active code nodes if param config changes without structural change
  useEffect(() => {
     setNodes((nds) => nds.map(n => {
         if (n.type === 'codeNode') {
             const type = n.data.activeModuleType as string;
             const baseSnippet = snippets[type] || snippets['encoder'];
             return {
                 ...n,
                 data: {
                     ...n.data,
                     snippet: {
                         title: baseSnippet.title,
                         pytorch: formatSnippet(baseSnippet.pytorch, config),
                         scratch: formatSnippet(baseSnippet.scratch, config)
                     }
                 }
             };
         }
         return n;
     }));
  }, [config.dModel, config.nHeads, config.dFfn, config.dropout, setNodes]);


  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const closeCodeWindow = useCallback(() => {
      setNodes((nds) => nds.filter(n => n.id !== 'code-node').map(n => ({...n, data: {...n.data, isActive: false}})));
      setEdges((eds) => eds.filter(e => e.id !== 'edge-code-top' && e.id !== 'edge-code-left'));
  }, [setNodes, setEdges]);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
      if (node.type === 'moduleNode') {
          const type = node.data.moduleType as string;
          const snippetData = snippets[type] || snippets['encoder'];
          
          const formattedSnippet = {
              title: snippetData.title,
              pytorch: formatSnippet(snippetData.pytorch, config),
              scratch: formatSnippet(snippetData.scratch, config),
          };

          setNodes((nds) => {
              const updatedNds = nds.map(n => {
                  if (n.type === 'moduleNode') {
                      return { ...n, data: { ...n.data, isActive: n.id === node.id } };
                  }
                  return n;
              });
              
              const existingCodeNode = updatedNds.find(n => n.id === 'code-node');
              if (existingCodeNode) {
                  return [...updatedNds.filter(n => n.id !== 'code-node'), {
                      ...existingCodeNode,
                      position: { x: node.position.x + 250, y: Math.max(20, node.position.y - 50) },
                      data: { 
                          snippet: formattedSnippet, 
                          activeNodeId: node.id,
                          activeModuleType: type,
                          onCloseClick: closeCodeWindow
                      }
                  }];
              } else {
                  return [...updatedNds, {
                      id: 'code-node',
                      type: 'codeNode',
                      position: { x: node.position.x + 250, y: Math.max(20, node.position.y - 50) },
                      dragHandle: '.code-drag-handle',
                      data: { 
                          snippet: formattedSnippet, 
                          activeNodeId: node.id,
                          activeModuleType: type,
                          onCloseClick: closeCodeWindow
                      },
                      zIndex: 1000
                  }];
              }
          });

          setEdges((eds) => {
              const filteredEds = eds.filter(e => e.id !== 'edge-code-top' && e.id !== 'edge-code-left');
              return [...filteredEds, {
                  id: 'edge-code-left',
                  source: node.id,
                  target: 'code-node',
                  targetHandle: 'left',
                  type: 'straight',
                  animated: true,
                  style: { stroke: '#fbbf24', strokeDasharray: '4, 4', strokeWidth: 2 },
                  zIndex: 0
              }];
          });
      }
  }, [setNodes, setEdges, config, closeCodeWindow]);

  // Handle graph clicks to close
  const onPaneClick = useCallback(() => {
     closeCodeWindow();
  }, [closeCodeWindow]);

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: "var(--color-slate-950)" }}> 
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
            className="bg-slate-950 touch-none"
        >
            <Background color="var(--color-slate-800)" gap={16} size={1} />
        </ReactFlow>

        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/50 p-4 rounded-xl shadow-xl pointer-events-none">
            <h3 className="text-slate-200 font-bold flex items-center gap-2 mb-1">
               <MousePointer2 className="w-4 h-4 text-indigo-400" />
               Interactive Canva
            </h3>
            <p className="text-xs text-slate-400">Drag modules to rearrange or click them to inspect underlying Python mechanisms.</p>
            <div className="flex gap-2 mt-3">
               <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">Zoom: Scroll</span>
               <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">Pan: Drag Canvas</span>
            </div>
        </div>
    </div>
  );
}

export default function ModeBuilder({ config }: { config: ModelConfig }) {
  return (
      <ReactFlowProvider>
          <ModeBuilderFlow config={config} />
      </ReactFlowProvider>
  )
}


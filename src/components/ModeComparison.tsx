import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

// Machine translation sequence scenario
const srcWords = ["这只", "聪慧", "狐狸", "<EOS>"];
const tgtInput = ["<SOS>", "The", "smart", "fox"];
const tgtOutput = ["The", "smart", "fox", "<EOS>"];

const colCenter = (i: number, total: number) => {
    // 0-3 belong to Encoder (0-48%), 4-7 belong to Decoder (52-100%)
    if (i < 4) {
        return `${(i + 0.5) * (48 / 4)}%`;
    } else {
        return `${52 + (i - 4 + 0.5) * (48 / 4)}%`;
    }
};

export default function ModeComparison() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lstmStep, setLstmStep] = useState(-1);
  const [transformerPhase, setTransformerPhase] = useState(-1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (lstmStep < 7) {
        timer = setTimeout(() => {
          setLstmStep(prev => prev + 1);
        }, 1200); 
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, lstmStep]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (transformerPhase < 3) {
        timer = setTimeout(() => {
          setTransformerPhase(prev => prev + 1);
        }, 2200); 
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, transformerPhase]);

  const start = () => {
    setLstmStep(-1);
    setTransformerPhase(-1);
    setIsPlaying(true);
    setTimeout(() => {
        setLstmStep(0);
        setTransformerPhase(0);
    }, 200);
  };

  const reset = () => {
    setIsPlaying(false);
    setLstmStep(-1);
    setTransformerPhase(-1);
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-950 p-6 overflow-y-auto">
      
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-5 shrink-0 max-w-6xl mx-auto w-full">
         <div>
            <h2 className="text-2xl font-bold text-slate-100">对比分析 (机器翻译训练场景)</h2>
            <p className="text-slate-400 text-sm mt-1">对比 RNN(串行) 与 Transformer(并行) 在多语种翻译训练时的特征传输</p>
         </div>
         <div className="flex gap-4">
             {isPlaying && (lstmStep < 7 || transformerPhase < 3) && (
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                   <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span> 模型运算中...
                </div>
             )}
             <button onClick={reset} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors" title="重置">
                <RotateCcw className="w-5 h-5" />
             </button>
             <button onClick={start} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded font-medium disabled:opacity-50 shadow-lg shadow-indigo-600/20">
                <Play className="w-4 h-4 fill-current" /> 启动翻译训练模拟
             </button>
         </div>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-16">
          
          {/* LSTM Row */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
             <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center relative z-10">
                 <div>
                     <h3 className="font-bold text-slate-200 uppercase tracking-widest text-sm flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                         循环网络 LSTM (Seq2Seq Bottleneck)
                     </h3>
                     <p className="text-xs text-slate-400 mt-1 min-h-[16px]">
                         {lstmStep === -1 && "等待训练。"}
                         {lstmStep >= 0 && lstmStep < 4 && "阶段 1: 编码器 (Encoder) 必须按时间步顺序，将源语言串行吸入以构成上下文向量。"}
                         {lstmStep >= 4 && "阶段 2: 解码器 (Decoder) 接收状态后，继续串行循环进行预测。"}
                     </p>
                 </div>
                 <div className="flex flex-col items-end">
                     <span className="text-xs text-rose-400 border border-rose-500/30 bg-rose-500/10 px-2 py-1 rounded">时间强依赖: 必须排队执行</span>
                     <span className="text-[10px] text-slate-500 font-mono mt-1">深度执行时间复杂度: O(N)</span>
                 </div>
             </div>

             <div className="relative w-full h-[380px] overflow-hidden bg-slate-950/30">
                 <div className="absolute top-2 left-0 right-0 flex px-8 z-0 opacity-50">
                     <div className="flex-1 text-center text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">Source Encoder</div>
                     <div className="flex-1 text-center text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">Target Decoder</div>
                 </div>

                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                     {/* Center divider */}
                     <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
                     
                     {Array.from({length: 8}).map((_, i) => {
                         const x = colCenter(i, 8);
                         const nextX = colCenter(i + 1, 8);
                         const isEncoder = i < 4;
                         return (
                            <g key={`lstm-conn-${i}`}>
                                {/* Vertical input to cell */}
                                <line x1={x} y1="50" x2={x} y2="120" stroke="#334155" strokeWidth="2" />
                                {i <= lstmStep && (
                                    <motion.line x1={x} y1="50" x2={x} y2="120" stroke={isEncoder ? '#38bdf8' : '#34d399'} strokeWidth="3"
                                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Horizontal recurrent path */}
                                {i < 7 && (
                                    <line x1={x} y1="152" x2={nextX} y2="152" stroke="#334155" strokeWidth="2" />
                                )}
                                {i < lstmStep && i < 7 && (
                                    <motion.line x1={x} y1="152" x2={nextX} y2="152" stroke="#818cf8" strokeWidth="4"
                                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                )}

                                {/* Output generation path */}
                                {!isEncoder && (
                                    <line x1={x} y1="184" x2={x} y2="300" stroke="#334155" strokeWidth="2" strokeDasharray="3 3"/>
                                )}
                                {!isEncoder && i <= lstmStep && (
                                    <motion.line x1={x} y1="184" x2={x} y2="300" stroke="#10b981" strokeWidth="3" strokeDasharray="3 3"
                                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }}
                                    />
                                )}
                            </g>
                         );
                     })}
                 </svg>

                 {/* DOM Nodes Overlay */}
                 {Array.from({length: 8}).map((_, i) => {
                     const x = colCenter(i, 8);
                     const isEncoder = i < 4;
                     const inputWord = isEncoder ? srcWords[i] : tgtInput[i - 4];
                     const outputWord = isEncoder ? null : tgtOutput[i - 4];
                     const active = lstmStep === i;
                     const past = lstmStep > i;

                     return (
                         <div key={i} className="absolute top-0 bottom-0 pointer-events-none flex flex-col items-center z-10" style={{ left: x }}>
                             {/* Input Word */}
                             <div className={`absolute top-[20px] -translate-x-1/2 text-sm font-mono font-bold transition-colors ${past || active ? (isEncoder ? 'text-sky-300' : 'text-emerald-300') : 'text-slate-600'}`}>
                                 {inputWord}
                             </div>
                             
                             {/* LSTM Cell Block */}
                             <motion.div 
                                className={`absolute top-[120px] -translate-x-1/2 w-16 h-16 rounded-xl shadow-lg flex flex-col items-center justify-center border-2 transition-all ${
                                    active ? 'border-indigo-400 bg-indigo-900 shadow-[0_0_25px_#818cf8] scale-110 z-20' : 
                                    past ? 'border-indigo-800 bg-slate-800 z-10' : 'border-slate-700 bg-slate-900 z-10'
                                }`}
                             >
                                 {active && <span className="w-3 h-3 rounded-full bg-white animate-ping absolute" />}
                                 {past && <span className="text-xs text-indigo-400 font-mono font-bold">{isEncoder ? 'ENC' : 'DEC'}</span>}
                             </motion.div>
                             
                             {/* Output Generation */}
                             {!isEncoder && outputWord && (
                                 <div className={`absolute top-[310px] -translate-x-1/2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-sm font-mono font-bold transition-all duration-300 ${past || active ? 'text-emerald-300 opacity-100 scale-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'opacity-0 scale-90 text-transparent'}`}>
                                    {outputWord}
                                 </div>
                             )}
                         </div>
                     )
                 })}
             </div>
          </div>

          {/* Transformer Row */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg mt-2">
             <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center relative z-10">
                 <div>
                     <h3 className="font-bold text-slate-200 uppercase tracking-widest text-sm flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                         Transformer 模型 (Parallelism)
                     </h3>
                     <p className="text-xs text-emerald-400 font-medium mt-1 min-h-[16px]">
                         {transformerPhase === -1 && "等待训练。"}
                         {transformerPhase === 0 && "阶段 1 (Input/PE): 一次性将源语言与目标语言全部加载，加入位置编码"}
                         {transformerPhase === 1 && "阶段 2 (Self-Attention): Encoder 全向交互特征，Decoder 在因果掩码 (防作弊) 下并行提取历史特征"}
                         {transformerPhase === 2 && "阶段 3 (Cross-Attention): Decoder 整体并行查询 Encoder 获取翻译对齐映射信息"}
                         {transformerPhase === 3 && "阶段 4 (FFN): 网络层级单步内即刻向外预测全体目标词结果"}
                     </p>
                 </div>
                 <div className="flex flex-col items-end">
                     <span className="text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">极致的空间并行: 层级化处理</span>
                     <span className="text-[10px] text-slate-500 font-mono mt-1">单层深度时间执行复杂度: 常数 O(1)</span>
                 </div>
             </div>

             <div className="relative w-full h-[380px] overflow-hidden bg-slate-950/30">
                 <div className="absolute top-2 left-0 right-0 flex px-8 z-0 opacity-50">
                     <div className="flex-1 text-center text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">Source Encoder</div>
                     <div className="flex-1 text-center text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">Target Decoder</div>
                 </div>

                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                     <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />

                     {/* Base Connections */}
                     {Array.from({length: 8}).map((_, i) => {
                         const x = colCenter(i, 8);
                         return (
                            <g key={`tx-conn-${i}`}>
                                {/* Input line */}
                                <line x1={x} y1="50" x2={x} y2="90" stroke="#334155" strokeWidth="2" />
                                {transformerPhase >= 0 && (
                                    <motion.line x1={x} y1="50" x2={x} y2="90" stroke="#34d399" strokeWidth="3"
                                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}
                                    />
                                )}

                                {/* Output line */}
                                {i >= 4 && (
                                    <line x1={x} y1="140" x2={x} y2="300" stroke="#334155" strokeWidth="2" strokeDasharray="3 3"/>
                                )}
                                {i >= 4 && transformerPhase >= 3 && (
                                    <motion.line x1={x} y1="140" x2={x} y2="300" stroke="#10b981" strokeWidth="3" strokeDasharray="3 3"
                                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                                    />
                                )}
                            </g>
                         );
                     })}

                     {/* Self Attention Arcs */}
                     {transformerPhase >= 1 && Array.from({length: 8}).map((_, i) => 
                        Array.from({length: 8}).map((_, j) => {
                            const isEncI = i < 4;
                            const isEncJ = j < 4;
                            if (isEncI !== isEncJ) return null; 
                            if (!isEncI && i < j) return null; // Decoder causal mask
                            if (i === j) return null;

                            const x1 = parseFloat(colCenter(i, 8));
                            const x2 = parseFloat(colCenter(j, 8));
                            return (
                                <motion.path
                                    key={`self-${i}-${j}`}
                                    d={`M ${x1}% 140 C ${x1}% ${140 + Math.abs(i-j)*25}, ${x2}% ${140 + Math.abs(i-j)*25}, ${x2}% 140`}
                                    stroke="rgba(52, 211, 153, 0.4)"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: Math.abs(i-j)*0.1 }}
                                />
                            )
                        })
                     )}

                     {/* Cross Attention Arcs */}
                     {transformerPhase >= 2 && Array.from({length: 4}).map((_, i) => 
                        Array.from({length: 4}).map((_, j) => { 
                            const x1 = parseFloat(colCenter(i, 8));     // Encoder Keys
                            const x2 = parseFloat(colCenter(j + 4, 8)); // Decoder Queries
                            return (
                                <motion.path
                                    key={`cross-${i}-${j}`}
                                    d={`M ${x1}% 140 C ${x1}% 270, ${x2}% 270, ${x2}% 140`}
                                    stroke="rgba(14, 165, 233, 0.4)"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: Math.random()*0.3 }}
                                />
                            )
                        })
                     )}
                 </svg>

                 {/* Transformer Nodes */}
                 {Array.from({length: 8}).map((_, i) => {
                     const x = colCenter(i, 8);
                     const isEncoder = i < 4;
                     const inputWord = isEncoder ? srcWords[i] : tgtInput[i - 4];
                     const outputWord = isEncoder ? null : tgtOutput[i - 4];
                     
                     return (
                         <div key={i} className="absolute top-0 bottom-0 pointer-events-none flex flex-col items-center z-10" style={{ left: x }}>
                             
                             <div className={`absolute top-[20px] -translate-x-1/2 text-sm font-mono font-bold transition-colors ${transformerPhase >= 0 ? (isEncoder?'text-sky-300':'text-emerald-300') : 'text-slate-600'}`}>
                                 {inputWord}
                             </div>
                             
                             <motion.div 
                                  className={`absolute top-[90px] -translate-x-1/2 w-[4.5rem] h-12 rounded-lg flex flex-col items-center justify-center border-2 transition-all relative overflow-hidden bg-slate-900 shadow-xl ${
                                      transformerPhase === -1 ? 'border-slate-700' :
                                      transformerPhase === 0 ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]' :
                                      transformerPhase === 1 ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-slate-800' :
                                      transformerPhase === 2 ? (isEncoder ? 'border-slate-600 opacity-50' : 'border-sky-500 shadow-[0_0_25px_rgba(14,165,233,0.5)] bg-slate-800') :
                                      'border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.4)]'
                                  }`}
                             >
                                  {transformerPhase === 0 && <span className="font-mono text-[9px] text-indigo-300 font-bold drop-shadow-md">EMB + PE</span>}
                                  {transformerPhase === 1 && <span className="font-mono text-[10px] text-emerald-300 font-bold drop-shadow-md">Self-Attn</span>}
                                  {transformerPhase === 2 && <span className="font-mono text-[10px] text-sky-300 font-bold drop-shadow-md">{isEncoder?"----":"Cross-Attn"}</span>}
                                  {transformerPhase === 3 && <span className="font-mono text-[11px] text-orange-300 font-bold drop-shadow-md tracking-wider">FFN</span>}
                             </motion.div>

                             {!isEncoder && outputWord && (
                                 <motion.div 
                                     initial={{ opacity: 0, y: -20, scale: 0.8 }} 
                                     animate={{ 
                                        opacity: transformerPhase >= 3 ? 1 : 0, 
                                        y: transformerPhase >= 3 ? 0 : -20,
                                        scale: transformerPhase >= 3 ? 1 : 0.8
                                     }} 
                                     transition={{ duration: 0.4 }}
                                     className="absolute top-[310px] -translate-x-1/2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-sm font-mono font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] tracking-wide"
                                 >
                                    {outputWord}
                                 </motion.div>
                             )}
                         </div>
                     )
                 })}
             </div>
          </div>
          
          {/* Summary Text Section */}
          <div className="mt-2 bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-lg w-full mb-12">
             <h4 className="text-slate-300 font-medium mb-6 uppercase text-sm tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4" /> 架构数据流与瓶颈解析
             </h4>
             <div className="grid grid-cols-2 gap-12 text-sm">
                <div>
                   <h5 className="text-indigo-400 font-bold text-base mb-3 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                     循环网络模型 (RNN/LSTM) 的局限
                   </h5>
                   <ul className="text-slate-400 space-y-3 list-disc pl-5">
                      <li className="leading-relaxed">由于强耦合的回溯串行机制，前向和反向传播<strong className="text-slate-300">无法跨 Token 并行计算</strong>。在机器翻译这类 Seq2Seq 任务中表现出致命的顺序依赖。</li>
                      <li className="leading-relaxed">时间序列计算复杂度为 <strong className="text-slate-300">O(N)</strong>，极其耗费循环等待周期，无法挥发当代大规模 GPU 矩阵乘法的算力结构。</li>
                      <li className="leading-relaxed">难以彻底解决远期距离的特征依赖关系。面对复杂的长本文推理时，仍会不可避免的发生隐秘的特征遗忘与消失现象。</li>
                   </ul>
                </div>
                <div>
                   <h5 className="text-emerald-400 font-bold text-base mb-3 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                     Transformer 架构为何成为霸主
                   </h5>
                   <ul className="text-slate-400 space-y-3 list-disc pl-5">
                      <li className="leading-relaxed">凭借全向量映射，彻底解除了计算顺序束缚，单层时间步的训练耗时直接压缩逼近恒值 <strong className="text-slate-300">O(1)</strong>。</li>
                      <li className="leading-relaxed">突破性的 <strong className="text-slate-300">全局注意力 (Global Attention)</strong> 赋予任何序列长短距离为极其稳固的直连捷径路径，精准洞察庞大的关联语意。</li>
                      <li className="text-slate-500 italic mt-4 leading-relaxed text-xs p-3 bg-slate-950 rounded border border-slate-800">
                        *注意：这种并行属于 “训练时验证阶段 (Teacher Forcing)”。在现实业务中推理产生翻译时，由于无法窥探未来，解码器仍会回归为经典的 Autoregressive (自回归) 迭代策略来逐词输出。
                      </li>
                   </ul>
                </div>
             </div>
          </div>

      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Copy, Check, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Minimal syntax highlighting with preservation of strings and comments
function highlight(code: string) {
  const preserved: string[] = [];
  
  // 1. Preserve comments and strings
  let step1 = code.replace(/(#.*|"(.*?)"|'(.*?)')/g, (match) => {
    preserved.push(match);
    return `__PRESERVED_${preserved.length - 1}__`;
  });

  // 2. Apply highlighting to code
  let step2 = step1
    .replace(/\b(import|class|def|super|return|if|else|elif|for|in)\b/g, "<span class='text-pink-400'>$1</span>")
    .replace(/\b(self)\b/g, "<span class='text-purple-400'>$1</span>")
    .replace(/\b(nn\.Module|nn\.TransformerEncoderLayer|nn\.TransformerDecoderLayer|nn\.Embedding|nn\.Linear|nn\.MultiheadAttention|nn\.LayerNorm|nn\.Dropout|nn\.Parameter)\b/g, "<span class='text-blue-300'>$1</span>")
    .replace(/\b(__init__|forward)\b/g, "<span class='text-blue-400'>$1</span>")
    .replace(/(=)(\s*\-?\d+\.?\d*)/g, "$1<span class='text-emerald-300'>$2</span>")
    .replace(/\b(math\.sqrt|torch\.matmul|torch\.softmax|torch\.exp|torch\.max|torch\.sum|torch\.arange|torch\.zeros|torch\.sin|torch\.cos|math\.log|F\.linear|F\.softmax)\b/g, "<span class='text-amber-300'>$1</span>")
    .replace(/\b(torch\.tensor|torch\.float|torch\.Tensor|int|float)\b/g, "<span class='text-emerald-400'>$1</span>");

  // 3. Restore and highlight comments and strings
  return step2.replace(/__PRESERVED_(\d+)__/g, (_, p1) => {
    const val = preserved[parseInt(p1, 10)];
    if (val.startsWith('#')) {
      return `<span class='text-slate-500'>${val}</span>`;
    } else {
      return `<span class='text-green-400'>${val}</span>`;
    }
  });
}

export default function CodeWindowNode({ data }: { data: any }) {
  const { lang } = useAppContext();
  const t = {
    zh: { drag: '拖拽此处', hide: '隐藏源码', copy: '复制代码', copied: '已复制' },
    en: { drag: 'Drag here', hide: 'Hide Src', copy: 'Copy Code', copied: 'Copied' }
  }[lang];
    const [tab, setTab] = useState<'pytorch' | 'scratch'>('pytorch');
    const [copied, setCopied] = useState(false);
    const snippet = data.snippet;

    const handleCopy = () => {
        const codeToCopy = tab === 'pytorch' ? snippet.pytorch : snippet.scratch;
        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // React Flow requirement: custom node must have handles to connect to edges.
    // We make it invisible but present.
    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] w-[450px] overflow-hidden flex flex-col pointer-events-auto">
            <div className="px-4 py-3 flex justify-between items-center cursor-move code-drag-handle transition-colors group bg-slate-800 hover:bg-slate-800/80">
                <span className="text-amber-400 text-sm font-bold flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    {snippet.title}
                </span>
                <div className="flex items-center gap-3">
                   <button 
                       onClick={handleCopy} 
                       className="flex items-center gap-1 text-[10px] bg-slate-950/50 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded transition-colors"
                   >
                       {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                       {copied ? t.copied : t.copy}
                   </button>
                   <span className="text-[10px] bg-slate-950/50 border border-slate-700 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider">拖拽此处</span>
                   <button onClick={data.onCloseClick} className="text-slate-500 hover:text-white cursor-pointer p-1">
                      <X className="w-4 h-4" />
                   </button>
                </div>
            </div>
            
            <div className="flex border-b border-slate-800 bg-slate-900">
                <button 
                  onClick={() => setTab('pytorch')}
                  className={`flex-1 py-2 text-xs font-semibold text-center transition-colors ${tab === 'pytorch' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>
                      PyTorch 标准 API
                </button>
                <button 
                  onClick={() => setTab('scratch')}
                  className={`flex-1 py-2 text-xs font-semibold text-center transition-colors ${tab === 'scratch' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>
                      Python 底层推导演示
                </button>
            </div>
            
            <div className="p-5 bg-slate-950 font-mono text-[11px] overflow-auto max-h-[400px] text-slate-300 whitespace-pre-wrap leading-relaxed relative nodrag nowheel">
               <Handle type="target" position={Position.Left} id="left" className="opacity-0 w-8 h-full rounded-none absolute top-0 -left-4 pointer-events-none" />
               <Handle type="target" position={Position.Top} id="top" className="opacity-0 w-full h-8 rounded-none absolute -top-4 left-0 pointer-events-none" />
               
               <code dangerouslySetInnerHTML={{ __html: highlight(tab === 'pytorch' ? snippet.pytorch : snippet.scratch) }} />
            </div>
        </div>
    )
}

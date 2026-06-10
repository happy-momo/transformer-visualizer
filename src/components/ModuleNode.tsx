import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function ModuleNode({ data }: { data: any }) {
    return (
        <div className={`px-4 py-3 rounded-lg border shadow-lg text-center backdrop-blur-sm min-w-[150px] transition-all cursor-pointer 
            ${data.isActive ? 'border-amber-400 ring-4 ring-amber-400/20 shadow-amber-500/20 bg-slate-800' : 'border-slate-700 hover:border-slate-500 ' + (data.bgClass || 'bg-slate-800')} 
        `}>
            {data.hasInput && (
                <Handle 
                    type="target" 
                    position={Position.Top} 
                    id="in" 
                    className="w-3 h-3 bg-slate-600 border-2 border-slate-900" 
                />
            )}
            
            {data.hasMemory && (
                <Handle 
                    type="target" 
                    position={Position.Left} 
                    id="memory" 
                    className="w-3 h-3 bg-indigo-500 border-2 border-slate-900" 
                />
            )}
            
            <div className={`font-bold text-sm ${data.isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                {data.title}
            </div>
            
            <div className="text-[10px] text-slate-400 mt-1">
                {data.sub}
            </div>

            {data.hasOutput && (
                <Handle 
                    type="source" 
                    position={Position.Bottom} 
                    id="out" 
                    className="w-3 h-3 bg-slate-600 border-2 border-slate-900" 
                />
            )}
        </div>
    );
}

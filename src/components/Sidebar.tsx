import React, { useState } from 'react';
import { LayoutDashboard, Workflow, GitCompare, Code2, Settings2, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Sidebar({
  mode,
  setMode,
}: {
  mode: string;
  setMode: (mode: any) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useAppContext();

  const t = {
    desc: '交互式架构原理解析',
    builder: '大模型架构组装器',
    workflow: '运行推演与执行流程',
    compare: '对比: 传统 LSTM',
    version: 'v1.0.0 · 教学演示工具'
  };

  return (
    <div className={`bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-y-auto transition-all duration-300 ease-in-out shrink-0 z-20 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      
      {/* Header */}
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center border-b border-slate-800' : 'justify-between'}`}>
        <div className={`flex items-center gap-2 ${isCollapsed ? 'hidden' : 'flex'}`}>
           <Code2 className="w-6 h-6 text-indigo-400 shrink-0" />
           <div className="flex flex-col">
             <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight leading-tight">Transformer</h1>
             <p className="text-[10px] text-slate-400">{t.desc}</p>
           </div>
        </div>
        <button 
           onClick={() => setIsCollapsed(!isCollapsed)}
           className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors shrink-0"
           title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
        >
           {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className={`flex-1 space-y-2 mt-4 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <button
          onClick={() => setMode('builder')}
          title={t.builder}
          className={`w-full flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${mode === 'builder' ? 'bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>{t.builder}</span>}
        </button>
        <button
          onClick={() => setMode('workflow')}
          title={t.workflow}
          className={`w-full flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${mode === 'workflow' ? 'bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <Workflow className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>{t.workflow}</span>}
        </button>
        <button
          onClick={() => setMode('comparison')}
          title={t.compare}
          className={`w-full flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${mode === 'comparison' ? 'bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <GitCompare className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>{t.compare}</span>}
        </button>
      </nav>
      
      <div className={`p-4 border-t border-slate-800 flex flex-col gap-4 ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-3' : 'justify-between'}`}>
           <button 
             onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
             }}
             className={`flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors ${isCollapsed ? 'p-2' : 'px-3 py-2 bg-slate-950/50 border border-slate-800'}`}
             title={theme === 'dark' ? "切换浅色模式" : "切换深色模式"}
           >
             {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
             {!isCollapsed && <span className="font-semibold">{theme === 'dark' ? 'Light' : 'Dark'}</span>}
           </button>
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-2 text-[10px] text-slate-500 cursor-default opacity-60 ml-1">
             <Settings2 className="w-3 h-3" />
             {t.version}
          </div>
        )}
      </div>
    </div>
  );
}

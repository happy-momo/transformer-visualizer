import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ConfigPanel from './components/ConfigPanel';
import { AppMode, ModelConfig, defaultConfig } from './types';
import ModeBuilder from './components/ModeBuilder';
import ModeWorkflow from './components/ModeWorkflow';
import ModeComparison from './components/ModeComparison';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [mode, setMode] = useState<AppMode>('builder');
  const [config, setConfig] = useState<ModelConfig>(defaultConfig);

  return (
    <AppProvider>
      <div className="flex h-screen w-full bg-slate-950 text-slate-50 font-sans overflow-hidden selection:bg-indigo-500/30 transition-colors duration-300">
        <Sidebar mode={mode} setMode={setMode} />
        
        <main className="flex-1 flex overflow-hidden">
          {mode === 'builder' && <ModeBuilder config={config} />}
          {mode === 'workflow' && <ModeWorkflow config={config} />}
          {mode === 'comparison' && <ModeComparison />}
        </main>

        {mode === 'builder' && <ConfigPanel config={config} setConfig={setConfig} />}
      </div>
    </AppProvider>
  );
}

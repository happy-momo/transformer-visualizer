import React, { useState } from 'react';
import { ModelConfig } from '../types';
import { ChevronRight, ChevronLeft, Settings2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CustomSlider = ({ min, max, step, value, onChange }: any) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 
        [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(99,102,241,0.5)]
        hover:[&::-webkit-slider-thumb]:ring-4 hover:[&::-webkit-slider-thumb]:ring-indigo-500/30 hover:[&::-webkit-slider-thumb]:scale-110
        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
        [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:border-0
        [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md
        hover:[&::-moz-range-thumb]:ring-4 hover:[&::-moz-range-thumb]:ring-indigo-500/30 hover:[&::-moz-range-thumb]:scale-110
        [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
        focus:outline-none`}
      style={{
        background: `linear-gradient(to right, var(--color-indigo-500) 0%, var(--color-indigo-400) ${percentage}%, var(--color-slate-800) ${percentage}%, var(--color-slate-800) 100%)`
      }}
    />
  );
};

export default function ConfigPanel({
  config,
  setConfig,
}: {
  config: ModelConfig;
  setConfig: React.Dispatch<React.SetStateAction<ModelConfig>>;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { lang } = useAppContext();

  const handleChange = (key: keyof ModelConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const text = {
    zh: {
      expand: '展开配置面板',
      collapse: '收起配置面板',
      title: '模型配置与超参',
      hyper: '超参调优',
      dmodel: '模型嵌入维度 (d_model)',
      heads: '多头注意力数量 (Heads)',
      dff: '前馈网络维度 (d_ff)',
      dropout: '失活率 (Dropout Rate)',
      layout: '网络层级搭设',
      encoder: 'Encoder 堆叠层数',
      decoder: 'Decoder 堆叠层数'
    },
    en: {
      expand: 'Expand Config',
      collapse: 'Collapse Config',
      title: 'Model Configuration',
      hyper: 'Hyperparameters',
      dmodel: 'Embedding Dim (d_model)',
      heads: 'Attention Heads (Heads)',
      dff: 'Feedforward Dim (d_ff)',
      dropout: 'Dropout Rate',
      layout: 'Network Layers',
      encoder: 'Encoder Layers',
      decoder: 'Decoder Layers'
    }
  };

  const t = text[lang];

  return (
    <div className={`bg-slate-900 border-l border-slate-800 flex flex-col transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-12' : 'w-72'}`}>
      {/* Collapsed State Content */}
      <div className={`absolute top-0 left-0 w-full flex flex-col items-center py-4 gap-6 transition-opacity duration-300 ${isCollapsed ? 'opacity-100 pointer-events-auto delay-150' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors flex flex-col items-center"
          title={t.expand}
        >
          <Settings2 className="w-5 h-5 mb-2" />
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded State Content */}
      <div className={`flex flex-col h-full w-[288px] transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto delay-150'}`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 shrink-0">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-indigo-500" />
            {t.title}
          </h3>
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors shrink-0"
            title={t.collapse}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-6 flex-1">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{t.hyper}</h4>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400">{t.dmodel}</label>
                  <span className="text-indigo-500 font-mono font-semibold">{config.dModel}</span>
                </div>
                <CustomSlider
                  min="128"
                  max="2048"
                  step="128"
                  value={config.dModel}
                  onChange={(e: any) => handleChange('dModel', parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400">{t.heads}</label>
                  <span className="text-indigo-500 font-mono font-semibold">{config.nHeads}</span>
                </div>
                <CustomSlider
                  min="2"
                  max="32"
                  step="2"
                  value={config.nHeads}
                  onChange={(e: any) => handleChange('nHeads', parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400">{t.dff}</label>
                  <span className="text-indigo-500 font-mono font-semibold">{config.dFfn}</span>
                </div>
                <CustomSlider
                  min="512"
                  max="8192"
                  step="512"
                  value={config.dFfn}
                  onChange={(e: any) => handleChange('dFfn', parseInt(e.target.value))}
                />
              </div>
              
               <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400">{t.dropout}</label>
                  <span className="text-indigo-500 font-mono font-semibold">{config.dropout.toFixed(2)}</span>
                </div>
                <CustomSlider
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={config.dropout}
                  onChange={(e: any) => handleChange('dropout', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          <hr className="border-slate-800" />
          
           <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{t.layout}</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-400">{t.encoder}</label>
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                  <button 
                    onClick={() => handleChange('numEncoders', Math.max(1, config.numEncoders - 1))}
                    className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="text-sm w-4 text-center font-mono font-semibold text-slate-200">{config.numEncoders}</span>
                  <button 
                    onClick={() => handleChange('numEncoders', Math.min(24, config.numEncoders + 1))}
                    className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>
              
               <div className="flex items-center justify-between">
                <label className="text-xs text-slate-400">{t.decoder}</label>
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                  <button 
                    onClick={() => handleChange('numDecoders', Math.max(0, config.numDecoders - 1))}
                    className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="text-sm w-4 text-center font-mono font-semibold text-slate-200">{config.numDecoders}</span>
                  <button 
                    onClick={() => handleChange('numDecoders', Math.min(24, config.numDecoders + 1))}
                    className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

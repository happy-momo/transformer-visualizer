import React, { useState } from 'react';
import { ModelConfig } from '../types';
import { ArrowRight, ArrowDown, Database, Cpu, Activity, Repeat, Layers, Zap, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type ScenarioId = 'enc-dec-train' | 'enc-dec-infer' | 'llm-train' | 'llm-infer';

const getScenarios = (lang: string): Record<ScenarioId, { title: string, description: string, steps: { id: string, title: string, desc: string }[] }> => ({
  'enc-dec-train': {
    title: lang === 'zh' ? 'Encoder-Decoder: 模型训练 (多轮 Batch)' : 'Encoder-Decoder: Training (Batched)',
    description: lang === 'zh' ? '多 Batch 数据流通：演示数据前向传播、计算 Loss 并反向更新权重的完整多轮训练过程。' : 'Multi-batch Data Flow: Demonstrates the complete multi-turn training process of forward propagation, loss calculation, and backward weight updates.',
    steps: [
      { id: 'b1-forward', title: lang === 'zh' ? '1. [Batch 1] 前向传播' : '1. [Batch 1] Forward Propagation', desc: lang === 'zh' ? '输入: "Hallo Welt" -> "[<SOS>] Hello World"。经过 Encoder-Decoder 并行前向计算，得到预测分布。' : 'Input: "Hallo Welt" -> "[<SOS>] Hello World". Passes through parallel Encoder-Decoder to get prediction distributions.' },
      { id: 'b1-backward', title: lang === 'zh' ? '2. [Batch 1] 损失计算与反向传播' : '2. [Batch 1] Loss & Backward Pass', desc: lang === 'zh' ? '计算输出与真实标签 ("Hello World [<EOS>]") 的交叉熵 Loss。并执行 Backward 反向传播，更新模型权重矩阵。' : 'Calculate Cross-Entropy Loss against ground truth ("Hello World [<EOS>]"). Execute Backward pass to update the model weight matrices.' },
      { id: 'b2-forward', title: lang === 'zh' ? '3. [Batch 2] 提取新数据前向计算' : '3. [Batch 2] Forward with New Data', desc: lang === 'zh' ? '输入新数据: "Guten Morgen" -> "[<SOS>] Good Morning"。模型使用上一步更新后的"更聪明"的权重进行前向传播。' : 'New input: "Guten Morgen" -> "[<SOS>] Good Morning". Model performs forward pass using the newly updated "smarter" weights.' },
      { id: 'b2-backward', title: lang === 'zh' ? '4. [Batch 2] 持续反向传播与优化' : '4. [Batch 2] Continued Optimization', desc: lang === 'zh' ? '计算新 Batch 预测与目标的 Loss（相比初始权重有所下降），再次执行反向传播，梯度持续下降，进一步优化网络参数。' : 'Calculate Loss for new Batch predictions against targets (will be lower than initial weights), execute backward pass again to continuously minimize gradients.' },
      { id: 'training-loop', title: lang === 'zh' ? '5. 多轮循环收敛' : '5. Multi-epoch Convergence', desc: lang === 'zh' ? '模型不断吃入 Batch 数据并迭代参数，直至在整个训练集上的 Loss 趋于平稳（模型收敛），结束训练。' : 'The model continues consuming Batches and iterating parameters until the Loss across the entire dataset plateaus (model converges), terminating training.' }
    ]
  },
  'enc-dec-infer': {
    title: lang === 'zh' ? 'Encoder-Decoder: 模型推理 (多轮解码)' : 'Encoder-Decoder: Inference (Decoding)',
    description: lang === 'zh' ? '针对未知目标的 Seq2Seq 任务进行 Autoregressive (自回归) 生成，直至输出结束符终止。' : 'Performs Autoregressive generation for Seq2Seq tasks on target sequence until the End-Of-Sequence token is generated.',
    steps: [
      { id: 'encode', title: lang === 'zh' ? '1. 统一编码源序列 (仅一次)' : '1. Encode Source Sequence (Once)', desc: lang === 'zh' ? '完整的源序列 "Hallo Welt" 先由 Encoder 计算，生成的上下文 Memory 矩阵 (K, V) 将在整个解码过程中被复用。' : 'The complete source sequence "Hallo Welt" is computed by the Encoder once. The resulting contextual Memory Matrix (K, V) is reused throughout decoding.' },
      { id: 'decode-1', title: lang === 'zh' ? '2. 轮次 1：启动预测' : '2. Turn 1: Start Prediction', desc: lang === 'zh' ? 'Decoder 接收启动符 [<SOS>]，依靠 Encoder Memory 预测出最大概率单词 "Hello"。' : 'Decoder receives start token [<SOS>] and uses Encoder Memory to predict the highest probability word "Hello".' },
      { id: 'decode-2', title: lang === 'zh' ? '3. 轮次 2：自回归生成' : '3. Turn 2: Autoregressive Gen', desc: lang === 'zh' ? '将上步结果加入序列变成 "[<SOS>] Hello" 输入 Decoder，再次跨注意力查询，预测出 "World"。' : 'Appends last output to sequence as "[<SOS>] Hello" into Decoder, queries Memory via cross-attention to predict "World".' },
      { id: 'decode-3', title: lang === 'zh' ? '4. 轮次 3：遇到终止符停止' : '4. Turn 3: Terminate on EOS', desc: lang === 'zh' ? '序列现为 "[<SOS>] Hello World" 送入，模型预测出代表句末的 [<EOS>] Token。推理循环完成，返回最终句子。' : 'Sequence "[<SOS>] Hello World" is inputted, and model predicts [<EOS>] Token indicating end of sentence. Inference loop terminates.' }
    ]
  },
  'llm-train': {
    title: lang === 'zh' ? 'Decoder-Only LLM: 模型预训练 (多轮迭代)' : 'Decoder-Only LLM: Pre-training',
    description: lang === 'zh' ? '在大规模无标注文本语料上执行 Next-Token 并行预测与反向权重更新。' : 'Executes parallel Next-Token prediction and backward weight updating on large unaligned text corpora.',
    steps: [
      { id: 't1-forward', title: lang === 'zh' ? '1. [Chunk 1] Causal 并行前向' : '1. [Chunk 1] Causal Forward', desc: lang === 'zh' ? '序列 X = "The quick brown fox"。因果掩码确保模型并行预测出各位置的 Next-Token 分布。' : 'Sequence X = "The quick brown fox". Causal masking ensures parallel processing for Next-Token prediction at each position.' },
      { id: 't1-backward', title: lang === 'zh' ? '2. [Chunk 1] Loss与参数更新' : '2. [Chunk 1] Loss & Weight Update', desc: lang === 'zh' ? '将全部并行预测与实际 Y = "quick brown fox jumps" 比对计算全局 Loss，梯度反向传播修改模型全部参数。' : 'Compare all parallel predictions to Y = "quick brown fox jumps" to compute global Loss. Execute backward pass back-propagating gradients.' },
      { id: 't2-forward', title: lang === 'zh' ? '3. [Chunk 2] 新语料段落输入' : '3. [Chunk 2] New Corpus Input', desc: lang === 'zh' ? '截取下一段: X = "jumps over the lazy"。利用刚优化过的新参数矩阵再次执行 Causal 前向计算。' : 'Parse next paragraph chunk: X = "jumps over the lazy". Use newly updated parameter matrix to execute Causal forward propagation again.' },
      { id: 't2-backward', title: lang === 'zh' ? '4. [Chunk 2] 深度特征迭代' : '4. [Chunk 2] Deep Feature Iter', desc: lang === 'zh' ? '计算与 Y = "over the lazy dog" 的 Loss，执行反向传播深化语言特征的记忆，逐步提升预训练语言表达能力。' : 'Compute Loss against Y = "over the lazy dog", execute backward pass to deepen memorization of language features.' }
    ]
  },
  'llm-infer': {
    title: lang === 'zh' ? 'Decoder-Only LLM: 生成式推理 (多轮增量)' : 'Decoder-Only LLM: Incremental Inference',
    description: lang === 'zh' ? '利用 KV Cache 加速文本生成，单步增量循环预测下一个词的多轮展示。' : 'Leverages KV Caching to accelerate text generation. Demonstrates multi-turn incremental step-by-step prediction.',
    steps: [
      { id: 'prefill', title: lang === 'zh' ? '1. Prefill 阶段 (预填充 Prompt)' : '1. Prefill Phase (Prompting)', desc: lang === 'zh' ? '用户 Prompt "I think therefore I"。模型一次性并行计算，将 KV 缓存，并推测出首个新 Token "am"。' : 'User Prompt "I think therefore I". Model computes once in parallel, stores KVs to Cache, and infers first token "am".' },
      { id: 'gen-1', title: lang === 'zh' ? '2. 轮次 1: Token "a"' : '2. Turn 1: Token "a"', desc: lang === 'zh' ? '只需输入 "am"，系统读取 KV Cache 计算剩余 Attention，将 "am" 的新 KV 存入缓存，并预测出 "a"。' : 'Only input "am", read memory from KV Cache to infer remaining Attention, push new KV for "am" to cache and predict "a".' },
      { id: 'gen-2', title: lang === 'zh' ? '3. 轮次 2: Token "student"' : '3. Turn 2: Token "student"', desc: lang === 'zh' ? '输入 "a" 增量推演，模型再次基于不断壮大的 KV Cache 进行 O(1) 检索计算，并预测出 "student"。' : 'Input "a" incrementally. Model operates on the expanding KV Cache with O(1) context traversal, predicting "student".' },
      { id: 'gen-3', title: lang === 'zh' ? '4. 轮次 3: 触发 <EOS> 终止' : '4. Turn 3: Terminate <EOS>', desc: lang === 'zh' ? '输入 "student"，因果结构将查出终止符 <EOS>。文本增量循环到此完结。' : 'Input "student". Causal structure infers End-Of-Sequence <EOS> Token. Incremental generation ends.' }
    ]
  }
});

const getSnippets = (lang: string): Record<string, { title: string, code: string }> => ({
  embed: {
    title: lang === 'zh' ? 'Embedding 与 Positional Encoding' : 'Embedding & Positional Encoding',
    code: `class EmbeddingPE(nn.Module):\n    def __init__(self, vocab_size, d_model, max_len):\n        super().__init__()\n        self.emb = nn.Embedding(vocab_size, d_model)\n        self.pe = PositionalEncoding(d_model, max_len)\n\n    def forward(self, x):\n        # x is shape [batch_size, seq_len]\n        x = self.emb(x) * math.sqrt(d_model)\n        return self.pe(x)`
  },
  self_attn_bi: {
    title: lang === 'zh' ? 'Bidirectional Self-Attention (双向自注意力)' : 'Bidirectional Self-Attention',
    code: `attn_output, attn_weights = self.self_attn(\n    query=x, key=x, value=x,\n    key_padding_mask=src_key_padding_mask\n)\n\n# 残差连接与 Layer Norm\nx = x + self.dropout(attn_output)\nx = self.norm1(x)`
  },
  self_attn_causal: {
    title: lang === 'zh' ? 'Causal Masked Self-Attention (因果掩蔽序列)' : 'Causal Masked Self-Attention',
    code: `# causal_mask 防止网络查看到未生成的未来 Token\ncausal_mask = nn.Transformer.generate_square_subsequent_mask(seq_len)\n\nattn_output, _ = self.self_attn(\n    query=x, key=x, value=x,\n    attn_mask=causal_mask,\n    key_padding_mask=tgt_key_padding_mask\n)\n\n# 残差连接与 Layer Norm\nx = x + self.dropout(attn_output)\nx = self.norm1(x)`
  },
  cross_attn: {
    title: lang === 'zh' ? 'Cross-Attention (交叉注意力)' : 'Cross-Attention',
    code: `# Q 来自 Decoder, K/V 直接利用 Encoder Memory\nattn_output, _ = self.cross_attn(\n    query=x, \n    key=memory, \n    value=memory,\n    key_padding_mask=memory_key_padding_mask\n)\n\nx = x + self.dropout(attn_output)\nx = self.norm2(x)`
  },
  ffn: {
    title: lang === 'zh' ? 'Feed Forward Network (前馈神经网络)' : 'Feed Forward Network',
    code: `class PointWiseFeedForward(nn.Module):\n    def __init__(self, d_model, d_ff, dropout=0.1):\n        super().__init__()\n        self.linear1 = nn.Linear(d_model, d_ff)\n        self.dropout = nn.Dropout(dropout)\n        self.linear2 = nn.Linear(d_ff, d_model)\n        \n    def forward(self, x):\n        # x: [batch, seq_len, d_model]\n        return self.linear2(self.dropout(F.relu(self.linear1(x))))\n\nffn_output = self.ffn(x)\nx = x + self.dropout(ffn_output)\nx = self.norm3(x)`
  },
  output_train: {
    title: lang === 'zh' ? 'Projection 与 Loss' : 'Projection & Loss',
    code: `logits = self.output_layer(x)  # shape: [batch, seq_len, vocab_size]\n\n# 展平矩阵，并针对目标 Token 标签计算 Cross-Entropy 损失\nloss = F.cross_entropy(\n    logits.view(-1, vocab_size), \n    target_ids.view(-1),\n    ignore_index=pad_token_id\n)\n\nloss.backward()`
  },
  output_infer: {
    title: lang === 'zh' ? 'Autoregressive Sampling (自回归采样)' : 'Autoregressive Sampling',
    code: `logits = self.output_layer(x)  # [batch, seq_len, vocab_size]\n\n# 获取序列最后一位 Token 对应的全词表分布概率\nnext_token_logits = logits[:, -1, :]\n\nprobs = torch.softmax(next_token_logits, dim=-1)\n\n# Greedy Decoding (贪心解码)\nnext_token = torch.argmax(probs, dim=-1)\n\n# 或使用 Nucleus (Top-p) / Temperature 采样\n# next_token = sample(probs, temperature=0.7)`
  },
  kv_cache: {
    title: lang === 'zh' ? 'KV Cache (缓存机制)' : 'KV Cache (Key-Value Caching)',
    code: `# KV Cache 的推理调用精简实现案例\ndef forward(self, x, past_key_values=None):\n    key = self.k_proj(x)\n    value = self.v_proj(x)\n\n    if past_key_values is not None:\n        # 将本时间步新产生的 K, V 特征追加组合至旧有的缓存中\n        past_k, past_v = past_key_values\n        key = torch.cat([past_k, key], dim=-2)\n        value = torch.cat([past_v, value], dim=-2)\n    \n    # 打包组合组合特征并透传用于下一时间步\n    present_key_values = (key, value)\n    \n    # 使用具备完整历史信息的 key/value 矩阵完成点积计算\n    # ...`
  }
});

// Architecture Box Component
const Box = ({ active, label, sub, type = 'normal', className = "", onClick }: any) => {
    let bg = 'bg-slate-800/80 border-slate-700/80 text-slate-400';
    if (active) {
        if (type === 'attn') bg = 'bg-emerald-900/80 border-emerald-500 text-emerald-200 ring-4 ring-emerald-500/20 shadow-lg shadow-emerald-500/20';
        else if (type === 'ffn') bg = 'bg-orange-900/80 border-orange-500 text-orange-200 ring-4 ring-orange-500/20 shadow-lg shadow-orange-500/20';
        else bg = 'bg-indigo-900/80 border-indigo-500 text-indigo-200 ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/20';
    }
    
    const clickClasses = onClick ? 'cursor-pointer hover:scale-105 hover:brightness-125 hover:z-20' : '';
    
    return (
        <div 
           onClick={onClick}
           className={`p-2 sm:p-3 border rounded-lg text-center transition-all duration-300 w-full flex flex-col justify-center min-h-[50px] sm:min-h-[60px] z-10 relative select-none ${bg} ${clickClasses} ${className}`}
        >
           <div className="font-bold text-[10px] sm:text-xs leading-tight drop-shadow-sm">{label}</div>
           {sub && <div className="text-[9px] sm:text-[10px] mt-1 font-mono opacity-80">{sub}</div>}
        </div>
    );
};

const EncDecTrainCanvas = ({ step, setCode }:  { step: number, setCode: any }) => {
    const { lang } = useAppContext();
    const PYTORCH_SNIPPETS = getSnippets(lang);
    const text = {
      zh: {
        srcInput: 'Source 输入',
        embed: '词嵌入与位置编码',
        tgtInput: 'Target 输入',
        encoderFW: 'Encoder 前向 (双向自注意力)',
        decoderFW: 'Decoder 前向 (Masked/交叉注意力)',
        ceDec: '交叉熵计算 (Cross-Entropy)',
        backprop: '梯度反向传播',
        predDist: '预测分布 (Logits)',
        ans: '参考答案 (Target)',
        prompt: '用户 Prompt',
        nextPre: '新词推演 (Next-Token)',
        kvStore: '存入 KV Cache',
        kvAccess: '复用 KV Cache',
        causalFW: 'Causal 前向 (多头注意力)',
        encInfer: '单次完整编码',
        decStep: '自回归生成步',
        genOutput: '当前生成词',
        lossOpt: 'Loss 计算与前向传播',
        encTgt: 'Encoder 对目标序列一次性编码'
      },
      en: {
        srcInput: 'Source Input',
        embed: 'Embedding & Position',
        tgtInput: 'Target Input',
        encoderFW: 'Encoder Forward (Bi-Self-Attn)',
        decoderFW: 'Decoder Forward (Cross-Attn)',
        ceDec: 'Cross-Entropy Loss',
        backprop: 'Gradient Backprop',
        predDist: 'Prediction Dist (Logits)',
        ans: 'Ground Truth Target',
        prompt: 'User Prompt',
        nextPre: 'Next-Token Infer',
        kvStore: 'Store in KV Cache',
        kvAccess: 'Access KV Cache',
        causalFW: 'Causal Forward (Multi-Head)',
        encInfer: 'Encode Source Once',
        decStep: 'Autoregressive Step',
        genOutput: 'Generated Word',
        lossOpt: 'Loss Calculation',
        encTgt: 'Encoder context output'
      }
    };
    const t = text[lang];
  
    const isBatch2 = step >= 2;
    const isLossStep = step === 1 || step === 3 || step === 4;
    const sourceData = isBatch2 ? "[ 'Guten', 'Morgen' ]" : "[ 'Hallo', 'Welt' ]";
    const targetData = isBatch2 ? "[ '<SOS>', 'Good', 'Morning' ]" : "[ '<SOS>', 'Hello', 'World' ]";
    const labelData = isBatch2 ? "['Good', 'Morning', '<EOS>']" : "['Hello', 'World', '<EOS>']";
    const activeForward = step === 0 || step === 2 || step === 4;

    return (
    <div className="flex w-full h-full p-2 sm:p-4 gap-2 sm:gap-6 lg:gap-10 justify-center items-center font-mono relative pt-8">
        <div className="flex flex-col items-center w-36 sm:w-44 lg:w-56 gap-3 lg:gap-4 relative">
            <Box active={activeForward} label={`${t.srcInput} (Batch ${isBatch2 ? 2 : 1})`} sub={sourceData} />
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-indigo-400' : 'text-slate-700'}`} />
            <Box active={activeForward} label="Embedding + PE" onClick={() => setCode(PYTORCH_SNIPPETS.embed)} />
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-indigo-400' : 'text-slate-700'}`} />
            <div className={`border rounded p-3 w-full flex flex-col gap-2 transition-colors duration-500 ${activeForward ? 'border-indigo-500 bg-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-800 bg-slate-900/50'}`}>
               <div className="text-[10px] text-center text-slate-500 tracking-widest font-bold">Nx Encoder</div>
               <Box active={activeForward} label="Bidirectional Self-Attn" type="attn" onClick={() => setCode(PYTORCH_SNIPPETS.self_attn_bi)} />
               <Box active={activeForward} label="Feed Forward 模块" type="ffn" onClick={() => setCode(PYTORCH_SNIPPETS.ffn)} />
            </div>
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-emerald-400' : 'text-slate-700'}`} />
            <Box active={step >= 0} label="Encoder Memory" sub="(上下文 K, V 特征)" type="attn" className={step >= 0 ? "ring-emerald-500/50 bg-emerald-900/50 !border-emerald-500/50 !text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : ""} />
        </div>

        <div className="w-12 sm:w-20 lg:w-24 flex flex-col justify-center items-center relative z-0" style={{ transform: 'translateY(1.5rem)' }}>
           <div className={`w-full border-t-2 border-dashed transition-all duration-500 ${activeForward ? 'border-emerald-500 shadow-[0_0_8px_#10b981]' : 'border-slate-700'}`}></div>
           <span className={`text-[8px] lg:text-[10px] absolute -top-4 px-1 ${activeForward ? 'text-emerald-400 font-bold' : 'text-slate-600'} whitespace-nowrap bg-slate-900`}>Cross-Attn (K,V)</span>
           <ArrowRight className={`absolute -right-2 -top-2 w-4 h-4 ${activeForward ? 'text-emerald-500' : 'text-slate-700'}`} />
        </div>

        <div className="flex flex-col items-center w-36 sm:w-44 lg:w-56 gap-3 lg:gap-4 relative">
            <Box active={activeForward} label="Target 标记序列右移" sub={targetData} />
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-indigo-400' : 'text-slate-700'}`} />
            <Box active={activeForward} label="Embedding + PE" onClick={() => setCode(PYTORCH_SNIPPETS.embed)} />
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-indigo-400' : 'text-slate-700'}`} />
            <div className={`border rounded p-3 w-full flex flex-col gap-2 transition-colors duration-500 ${activeForward ? 'border-indigo-500 bg-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-800 bg-slate-900/50'}`}>
               <div className="text-[10px] text-center text-slate-500 tracking-widest font-bold">Nx Decoder</div>
               <Box active={activeForward} label="Causal Masked Attn" type="attn" onClick={() => setCode(PYTORCH_SNIPPETS.self_attn_causal)} />
               <Box active={activeForward} label="Cross-Attention (Q)" type="attn" className={activeForward ? '!border-emerald-500/50 !bg-emerald-900/50 !text-emerald-200' : ''} onClick={() => setCode(PYTORCH_SNIPPETS.cross_attn)} />
               <Box active={activeForward} label="Feed Forward 模块" type="ffn" onClick={() => setCode(PYTORCH_SNIPPETS.ffn)} />
            </div>
            <ArrowDown className={`w-4 h-4 ${activeForward || isLossStep ? 'text-rose-400' : 'text-slate-700'}`} />
            <div className="flex gap-2 w-full relative">
               <Box active={activeForward || isLossStep} label={isLossStep ? "计算反向传播与Loss" : "投影预测全序列分布"} sub={isLossStep ? `计算并更新梯度 (对比: ${labelData})` : "计算 Softmax"} className={(activeForward || isLossStep) ? '!border-rose-500 !bg-rose-900/60 !text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : ''} onClick={() => setCode(PYTORCH_SNIPPETS.output_train)} />
               
               {isLossStep && step < 4 && (
                   <div className="absolute -left-10 lg:-left-16 bottom-0 top-0 flex flex-col justify-center animate-pulse z-30">
                       <ArrowDown className="w-8 h-8 text-rose-500 mb-2 rotate-180 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                   </div>
               )}
               {step === 4 && (
                   <div className="absolute -right-8 lg:-right-12 top-0 bottom-0 w-8 lg:w-10 border-r-2 border-t-2 border-b-2 border-indigo-500/50 border-dashed rounded-r-xl flex items-center justify-center animate-pulse">
                        <div className="text-[8px] bg-slate-950 text-indigo-300 font-bold rotate-90 p-1 border border-indigo-500/30 rounded whitespace-nowrap">不断重复 Epoch</div>
                   </div>
               )}
            </div>
        </div>
    </div>
    );
};

const EncDecInferCanvas = ({ step, setCode }:  { step: number, setCode: any }) => {
    const { lang } = useAppContext();
    const PYTORCH_SNIPPETS = getSnippets(lang);
    const text = {
      zh: {
        srcInput: 'Source 输入',
        embed: '词嵌入与位置编码',
        tgtInput: 'Target 输入',
        encoderFW: 'Encoder 前向 (双向自注意力)',
        decoderFW: 'Decoder 前向 (Masked/交叉注意力)',
        ceDec: '交叉熵计算 (Cross-Entropy)',
        backprop: '梯度反向传播',
        predDist: '预测分布 (Logits)',
        ans: '参考答案 (Target)',
        prompt: '用户 Prompt',
        nextPre: '新词推演 (Next-Token)',
        kvStore: '存入 KV Cache',
        kvAccess: '复用 KV Cache',
        causalFW: 'Causal 前向 (多头注意力)',
        encInfer: '单次完整编码',
        decStep: '自回归生成步',
        genOutput: '当前生成词',
        lossOpt: 'Loss 计算与前向传播',
        encTgt: 'Encoder 对目标序列一次性编码'
      },
      en: {
        srcInput: 'Source Input',
        embed: 'Embedding & Position',
        tgtInput: 'Target Input',
        encoderFW: 'Encoder Forward (Bi-Self-Attn)',
        decoderFW: 'Decoder Forward (Cross-Attn)',
        ceDec: 'Cross-Entropy Loss',
        backprop: 'Gradient Backprop',
        predDist: 'Prediction Dist (Logits)',
        ans: 'Ground Truth Target',
        prompt: 'User Prompt',
        nextPre: 'Next-Token Infer',
        kvStore: 'Store in KV Cache',
        kvAccess: 'Access KV Cache',
        causalFW: 'Causal Forward (Multi-Head)',
        encInfer: 'Encode Source Once',
        decStep: 'Autoregressive Step',
        genOutput: 'Generated Word',
        lossOpt: 'Loss Calculation',
        encTgt: 'Encoder context output'
      }
    };
    const t = text[lang];
  
    let decodeInput = "['<SOS>']";
    let predToken = "'Hello'";
    if (step === 2) { decodeInput = "['<SOS>', 'Hello']"; predToken = "'World'"; }
    else if (step === 3) { decodeInput = "['<SOS>', 'Hello', 'World']"; predToken = "'<EOS>'"; }

    return (
    <div className="flex w-full h-full p-2 sm:p-4 gap-2 sm:gap-6 lg:gap-10 justify-center items-center font-mono pt-8 relative">
        <div className="flex flex-col items-center w-36 sm:w-44 lg:w-56 gap-3 lg:gap-4 relative">
            <Box active={step === 0} label={t.srcInput} sub="['Hallo', 'Welt']" />
            <ArrowDown className={`w-4 h-4 ${step === 0 ? 'text-indigo-400' : 'text-slate-700'}`} />
            <div className={`border rounded p-3 w-full flex flex-col gap-2 transition-colors duration-500 ${step === 0 ? 'border-indigo-500 bg-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-800 bg-slate-900/50'}`}>
               <div className="text-[10px] text-center text-slate-500 tracking-widest font-bold">Nx Encoder</div>
               <Box active={step === 0} label="Bidirectional Self-Attn" type="attn" onClick={() => setCode(PYTORCH_SNIPPETS.self_attn_bi)} />
               <Box active={step === 0} label="Feed Forward 模块" type="ffn" onClick={() => setCode(PYTORCH_SNIPPETS.ffn)} />
            </div>
            <ArrowDown className={`w-4 h-4 ${step >= 0 ? 'text-emerald-400' : 'text-slate-700'}`} />
            <Box active={step >= 0} label="Encoder Memory" sub="(上下文全局 K, V 特征)" type="attn" className={step >= 0 ? "ring-emerald-500/50 bg-emerald-900/50 !border-emerald-500/50 !text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : ""} />
        </div>

        <div className="w-12 sm:w-20 lg:w-24 flex flex-col justify-center items-center relative z-0" style={{ transform: 'translateY(1.5rem)' }}>
           <div className={`w-full border-t-2 border-dashed transition-all duration-500 ${step >= 1 ? 'border-emerald-500 shadow-[0_0_8px_#10b981]' : 'border-slate-700'}`}></div>
           <span className={`text-[8px] lg:text-[10px] absolute -top-4 px-1 whitespace-nowrap bg-slate-900 ${step >= 1 ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>Cross-Attn (K,V)</span>
           <ArrowRight className={`absolute -right-2 -top-2 w-4 h-4 ${step >= 1 ? 'text-emerald-500' : 'text-slate-700'}`} />
        </div>

        <div className="flex flex-col items-center w-36 sm:w-44 lg:w-56 gap-3 lg:gap-4 relative">
            <Box active={step >= 1} label="当前解码状态输出序列" sub={decodeInput} />
            <ArrowDown className={`w-4 h-4 ${step >= 1 ? 'text-indigo-400' : 'text-slate-700'}`} />
            <div className={`border rounded p-3 w-full flex flex-col gap-2 transition-colors duration-500 ${step >= 1 ? 'border-indigo-500 bg-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-800 bg-slate-900/50'}`}>
               <div className="text-[10px] text-center text-slate-500 tracking-widest font-bold">Nx Decoder</div>
               <Box active={step >= 1} label="Causal Masked Attn" type="attn" onClick={() => setCode(PYTORCH_SNIPPETS.self_attn_causal)} />
               <Box active={step >= 1} label="Cross-Attention (Q)" type="attn" className={step >= 1 ? '!border-emerald-500/50 !bg-emerald-900/50 !text-emerald-200' : ''} onClick={() => setCode(PYTORCH_SNIPPETS.cross_attn)} />
               <Box active={step >= 1} label="Feed Forward 模块" type="ffn" onClick={() => setCode(PYTORCH_SNIPPETS.ffn)} />
            </div>
            <ArrowDown className={`w-4 h-4 ${step >= 1 ? 'text-rose-400' : 'text-slate-700'}`} />
            <Box active={step >= 1} label="Linear 预测与 Softmax 采样" sub={step >= 1 ? `采样预测下个 Token: ${predToken}` : "预热排列生成序列中..."} type="ffn" className={step >= 1 ? '!border-rose-500 !bg-rose-900/60 !text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : ''} onClick={() => setCode(PYTORCH_SNIPPETS.output_infer)} />
            
           {step >= 1 && (
               <div className="absolute -right-8 lg:-right-12 top-12 bottom-12 w-8 lg:w-10 border-r-2 border-t-2 border-b-2 border-indigo-500/50 border-dashed rounded-r-2xl flex items-center justify-center animate-pulse">
                    <div className="text-[8px] lg:text-[10px] bg-slate-950 text-indigo-300 font-bold rotate-90 whitespace-nowrap p-1 border border-indigo-500/30 rounded shadow-md">自回归循环生成</div>
               </div>
           )}
        </div>
    </div>
    );
};

const LlmTrainCanvas = ({ step, setCode }:  { step: number, setCode: any }) => {
    const { lang } = useAppContext();
    const PYTORCH_SNIPPETS = getSnippets(lang);
    const text = {
      zh: {
        srcInput: 'Source 输入',
        embed: '词嵌入与位置编码',
        tgtInput: 'Target 输入',
        encoderFW: 'Encoder 前向 (双向自注意力)',
        decoderFW: 'Decoder 前向 (Masked/交叉注意力)',
        ceDec: '交叉熵计算 (Cross-Entropy)',
        backprop: '梯度反向传播',
        predDist: '预测分布 (Logits)',
        ans: '参考答案 (Target)',
        prompt: '用户 Prompt',
        nextPre: '新词推演 (Next-Token)',
        kvStore: '存入 KV Cache',
        kvAccess: '复用 KV Cache',
        causalFW: 'Causal 前向 (多头注意力)',
        encInfer: '单次完整编码',
        decStep: '自回归生成步',
        genOutput: '当前生成词',
        lossOpt: 'Loss 计算与前向传播',
        encTgt: 'Encoder 对目标序列一次性编码'
      },
      en: {
        srcInput: 'Source Input',
        embed: 'Embedding & Position',
        tgtInput: 'Target Input',
        encoderFW: 'Encoder Forward (Bi-Self-Attn)',
        decoderFW: 'Decoder Forward (Cross-Attn)',
        ceDec: 'Cross-Entropy Loss',
        backprop: 'Gradient Backprop',
        predDist: 'Prediction Dist (Logits)',
        ans: 'Ground Truth Target',
        prompt: 'User Prompt',
        nextPre: 'Next-Token Infer',
        kvStore: 'Store in KV Cache',
        kvAccess: 'Access KV Cache',
        causalFW: 'Causal Forward (Multi-Head)',
        encInfer: 'Encode Source Once',
        decStep: 'Autoregressive Step',
        genOutput: 'Generated Word',
        lossOpt: 'Loss Calculation',
        encTgt: 'Encoder context output'
      }
    };
    const t = text[lang];
  
    const isChunk2 = step >= 2;
    const isLossStep = step === 1 || step === 3;
    const chunkData = isChunk2 ? "['jumps', 'over', 'the', 'lazy']" : "['The', 'quick', 'brown', 'fox']";
    const labelData = isChunk2 ? "['over', 'the', 'lazy', 'dog']" : "['quick', 'brown', 'fox', 'jumps']";
    const activeForward = step === 0 || step === 2;

    return (
    <div className="flex w-full h-full p-4 justify-center items-center font-mono relative pt-8">
        <div className="flex flex-col items-center w-64 md:w-80 lg:w-96 gap-3 lg:gap-4 relative">
            <Box active={activeForward} label={`提取连续语料文本片段 (Chunk ${isChunk2 ? 2 : 1})`} sub={`Tokens: ${chunkData}`} />
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-indigo-400' : 'text-slate-700'}`} />
            <Box active={activeForward} label="Token Embedding + 位置编码 (PE)" onClick={() => setCode(PYTORCH_SNIPPETS.embed)} />
            <ArrowDown className={`w-4 h-4 ${activeForward ? 'text-indigo-400' : 'text-slate-700'}`} />
            <div className={`border rounded p-4 w-full flex flex-col gap-3 transition-colors duration-500 ${activeForward ? 'border-indigo-500 bg-slate-800 shadow-[0_0_25px_rgba(99,102,241,0.2)]' : 'border-slate-800 bg-slate-900/50'}`}>
               <div className="text-[10px] text-center text-slate-500 tracking-widest font-bold">Nx Decoder Arch</div>
               <div className="relative">
                  <Box active={activeForward} label="Causal Masked Self-Attention" type="attn" onClick={() => setCode(PYTORCH_SNIPPETS.self_attn_causal)} />
                  {activeForward && (
                     <div className="absolute -right-20 lg:-right-36 top-1/2 -translate-y-1/2 flex flex-col items-center text-[8px] lg:text-[10px] bg-slate-950 p-2 border border-slate-800 rounded text-emerald-400 z-20 shadow-lg">
                         <div className="text-[8px] text-slate-400 mb-1 border-b border-slate-800 w-full text-center pb-1 whitespace-nowrap">Attention Mask (注意掩码)</div>
                         <div>[1, 0, 0, 0]</div>
                         <div>[1, 1, 0, 0]</div>
                         <div>[1, 1, 1, 0]</div>
                         <div>[1, 1, 1, 1]</div>
                     </div>
                  )}
               </div>
               <Box active={activeForward} label="Feed Forward 网络结构" type="ffn" onClick={() => setCode(PYTORCH_SNIPPETS.ffn)} />
            </div>
            <ArrowDown className={`w-4 h-4 ${activeForward || isLossStep ? 'text-indigo-400' : 'text-slate-700'}`} />
            <Box active={activeForward || isLossStep} label={isLossStep ? "全序列梯队更新与迭代" : "全序列并行投影层计算"} sub={isLossStep ? `计算并反向传播 Loss (对比期望: ${labelData})` : "计算 Softmax 分布概率"} className={isLossStep ? '!border-rose-500 !bg-rose-900/60 !text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : ''} onClick={() => setCode(PYTORCH_SNIPPETS.output_train)} />
            
            {isLossStep && (
                <div className="absolute -left-12 lg:-left-20 top-[65%] flex flex-col items-center animate-pulse z-30">
                    <ArrowDown className="w-6 h-6 lg:w-8 lg:h-8 text-rose-500 mb-2 rotate-180 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                    <div className="bg-rose-950 border border-rose-500 rounded-lg text-rose-200 text-[9px] lg:text-xs p-3 text-center font-bold shadow-[0_0_20px_#f43f5e] z-30 pointer-events-auto whitespace-nowrap">
                        反向传播<br/>权重自学习参数更新
                    </div>
                </div>
            )}
        </div>
    </div>
    );
};

const LlmInferCanvas = ({ step, setCode }:  { step: number, setCode: any }) => {
    const { lang } = useAppContext();
    const PYTORCH_SNIPPETS = getSnippets(lang);
    const text = {
      zh: {
        srcInput: 'Source 输入',
        embed: '词嵌入与位置编码',
        tgtInput: 'Target 输入',
        encoderFW: 'Encoder 前向 (双向自注意力)',
        decoderFW: 'Decoder 前向 (Masked/交叉注意力)',
        ceDec: '交叉熵计算 (Cross-Entropy)',
        backprop: '梯度反向传播',
        predDist: '预测分布 (Logits)',
        ans: '参考答案 (Target)',
        prompt: '用户 Prompt',
        nextPre: '新词推演 (Next-Token)',
        kvStore: '存入 KV Cache',
        kvAccess: '复用 KV Cache',
        causalFW: 'Causal 前向 (多头注意力)',
        encInfer: '单次完整编码',
        decStep: '自回归生成步',
        genOutput: '当前生成词',
        lossOpt: 'Loss 计算与前向传播',
        encTgt: 'Encoder 对目标序列一次性编码'
      },
      en: {
        srcInput: 'Source Input',
        embed: 'Embedding & Position',
        tgtInput: 'Target Input',
        encoderFW: 'Encoder Forward (Bi-Self-Attn)',
        decoderFW: 'Decoder Forward (Cross-Attn)',
        ceDec: 'Cross-Entropy Loss',
        backprop: 'Gradient Backprop',
        predDist: 'Prediction Dist (Logits)',
        ans: 'Ground Truth Target',
        prompt: 'User Prompt',
        nextPre: 'Next-Token Infer',
        kvStore: 'Store in KV Cache',
        kvAccess: 'Access KV Cache',
        causalFW: 'Causal Forward (Multi-Head)',
        encInfer: 'Encode Source Once',
        decStep: 'Autoregressive Step',
        genOutput: 'Generated Word',
        lossOpt: 'Loss Calculation',
        encTgt: 'Encoder context output'
      }
    };
    const t = text[lang];
  
    let inputToken = "['I', 'think', 'therefore', 'I']";
    let nextToken = "'am'";
    let label = "Prefill User Prompt 预存加载";
    if (step === 1) {
        inputToken = "['am']";
        nextToken = "'a'";
        label = "第 1 轮增量 Token 回馈";
    } else if (step === 2) {
         inputToken = "['a']";
        nextToken = "'student'";
        label = "第 2 轮增量 Token 回馈";
    } else if (step === 3) {
         inputToken = "['student']";
        nextToken = "'<EOS>'";
        label = "第 3 轮增量 Token 回馈";
    }

    return (
    <div className="flex w-full h-full p-2 sm:p-4 gap-4 lg:gap-12 justify-center items-center font-mono relative pt-8">
        <div className="flex flex-col items-center w-40 sm:w-48 lg:w-64 gap-3 relative z-10">
            {/* Input Node */}
            <Box active={true} label={label} sub={inputToken} />
            <ArrowDown className={`w-4 h-4 text-indigo-400`} />
            
            {/* Embed Node */}
            <Box active={true} label="Embedding + PE" onClick={() => setCode(PYTORCH_SNIPPETS.embed)} />
            <ArrowDown className={`w-4 h-4 text-indigo-400`} />
            
            {/* Decoder Model */}
            <div className={`border rounded p-3 lg:p-4 w-full flex flex-col gap-3 transition-colors duration-500 border-indigo-500 bg-slate-800 shadow-[0_0_25px_rgba(99,102,241,0.2)]`}>
               <div className="text-[10px] text-center text-slate-500 tracking-widest font-bold">Nx Decoder 计算引擎</div>
               <div className="relative">
                 <Box active={true} label={step >= 1 ? "Self-Attention (读取 KV记忆)" : "Causal Self-Attention (Prefill)"} type="attn" onClick={() => setCode(step >= 1 ? PYTORCH_SNIPPETS.cross_attn : PYTORCH_SNIPPETS.self_attn_causal)} />
                 <Zap className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] z-20" />
               </div>
               <Box active={true} label="Feed Forward 模块" type="ffn" onClick={() => setCode(PYTORCH_SNIPPETS.ffn)} />
            </div>
            <ArrowDown className={`w-4 h-4 text-indigo-400`} />
            
            {/* Output Node */}
            <Box active={true} label="Linear 预测与 Softmax 采样" sub={`计算提取采样 Token: ${nextToken}`} className={'!text-rose-200 !bg-rose-900/60 !border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'} onClick={() => setCode(PYTORCH_SNIPPETS.output_infer)} />
            
            {(step >= 1) && (
               <div className="absolute -left-8 lg:-left-12 top-12 bottom-12 w-8 lg:w-10 border-l-2 border-t-2 border-b-2 border-indigo-500/50 border-dashed rounded-l-2xl flex items-center justify-center animate-pulse">
                    <div className="text-[8px] lg:text-[10px] bg-slate-950 text-indigo-300 font-bold -rotate-90 whitespace-nowrap p-1 border border-indigo-500/30 rounded shadow-md">Autoregressive 循环</div>
               </div>
           )}
        </div>

        {/* KV Cache Panel */}
        <div className="flex flex-col justify-center items-center h-full relative pl-8 lg:pl-12 z-0">
           <div className="border-l-2 border-dashed border-emerald-500/50 absolute left-3 lg:left-6 h-[50%] top-[25%] z-0"></div>
           
           {/* Write to cache arrow */}
           <div className="absolute left-1 top-[35%] -translate-y-2 flex items-center">
             <div className={`h-0.5 w-6 lg:w-10 transition-colors bg-emerald-500`}></div>
             <ArrowRight className={`w-4 h-4 lg:w-6 lg:h-6 -ml-2 text-emerald-500`} />
             <span className={`absolute -top-4 left-0 text-[8px] lg:text-[10px] whitespace-nowrap text-emerald-400 font-bold`}>写入全新 K, V</span>
           </div>
           
           {/* Read from cache arrow */}
           <div className="absolute left-1 top-[65%] translate-y-2 flex items-center flex-row-reverse">
             <div className={`h-0.5 w-6 lg:w-10 transition-colors ${step >= 1 ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
             <ArrowRight className={`w-4 h-4 lg:w-6 lg:h-6 rotate-180 -mr-2 ${step >= 1 ? 'text-amber-500' : 'text-slate-700'}`} />
             <span className={`absolute -bottom-4 right-0 text-[8px] lg:text-[10px] whitespace-nowrap ${step >= 1 ? 'text-amber-400 font-bold' : 'text-slate-600'}`}>读取记忆 K, V</span>
           </div>
           
           <div className={`w-40 lg:w-56 bg-slate-900 border transition-all duration-500 z-10 relative border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] rounded-xl p-3 lg:p-5 flex flex-col gap-2`} onClick={() => setCode(PYTORCH_SNIPPETS.kv_cache)}>
               <h4 className="text-emerald-400 font-bold text-[10px] lg:text-sm tracking-widest uppercase text-center mb-1 lg:mb-3 flex justify-center items-center gap-1 lg:gap-2 drop-shadow-md cursor-pointer">
                  <Database className="w-3 h-3 lg:w-4 lg:h-4"/> KV Cache
               </h4>
               <div className="text-[8px] lg:text-[10px] text-slate-400 text-center mb-1 pb-2 border-b border-slate-800">历史序列特征缓存</div>
               <div className={`p-2 border rounded font-mono text-[9px] lg:text-[10px] truncate transition-colors flex bg-emerald-950 border-emerald-500/30 text-emerald-200`}>
                  <span className="opacity-60 mr-2 w-10 shrink-0">Seq[0..n]</span> <span className="truncate ml-auto"> {step >= 1 ? "Prompt Cached" : "缓存生成..."}</span>
               </div>
               {step >= 1 && (
                   <div className="p-2 border rounded font-mono text-[9px] lg:text-[10px] truncate flex bg-emerald-800/60 border-emerald-400 text-emerald-100 shadow-[0_0_10px_#34d399] animate-pulse">
                      <span className="opacity-80 mr-2 w-12 shrink-0">+增量补充</span> <span className="truncate ml-auto"> 'am' (K, V)</span>
                   </div>
               )}
               {step >= 2 && (
                   <div className="p-2 border rounded font-mono text-[9px] lg:text-[10px] truncate flex bg-emerald-800/60 border-emerald-400 text-emerald-100 shadow-[0_0_10px_#34d399] animate-pulse">
                      <span className="opacity-80 mr-2 w-12 shrink-0">+增量补充</span> <span className="truncate ml-auto"> 'a' (K, V)</span>
                   </div>
               )}
               {step >= 3 && (
                   <div className="p-2 border rounded font-mono text-[9px] lg:text-[10px] truncate flex bg-emerald-800/60 border-emerald-400 text-emerald-100 shadow-[0_0_10px_#34d399] animate-pulse">
                      <span className="opacity-80 mr-2 w-12 shrink-0">+增量补充</span> <span className="truncate ml-auto"> 'student'</span>
                   </div>
               )}
           </div>
        </div>
    </div>
    );
};


export default function ModeWorkflow({ config }: { config: ModelConfig }) {
  const { lang } = useAppContext();
  const SCENARIOS = getScenarios(lang);
  const PYTORCH_SNIPPETS = getSnippets(lang);

  const [scenarioId, setScenarioId] = useState<ScenarioId>('enc-dec-train');
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedCode, setSelectedCode] = useState<{ title: string, code: string } | null>(null);

  const scenario = SCENARIOS[scenarioId];
  const steps = scenario.steps;

  // Reset step whenever scenario changes
  const handleScenarioChange = (id: ScenarioId) => {
      setScenarioId(id);
      setStepIndex(0);
      setSelectedCode(null);
  };

  const text = {
    zh: {
      pytorchImpl: 'PyTorch 实现原理验证',
      stepsTitle: '推演步骤解构',
      prevStep: '上一步',
      nextStep: '执行下一步',
      workflowTitle: '工作流漫游与底层拆解',
      workflowSub: '通过实际运行场景，观察 Tensor 数据如何穿梭于 Transformer 结构中，并点击节点查看对应 PyTorch 伪代码源码实现。'
    },
    en: {
      pytorchImpl: 'PyTorch Implementation Validation',
      stepsTitle: 'Execution Steps',
      prevStep: 'Previous Step',
      nextStep: 'Execute Next Step',
      workflowTitle: 'Workflow Roaming & Low-level Analysis',
      workflowSub: 'Observe how Tensor data flows through the Transformer structure in actual running scenarios. Click nodes to see the corresponding PyTorch pseudo-code implementation.'
    }
  };
  const t = text[lang];

  const renderCanvas = () => {
      switch (scenarioId) {
          case 'enc-dec-train': return <EncDecTrainCanvas step={stepIndex} setCode={setSelectedCode} />;
          case 'enc-dec-infer': return <EncDecInferCanvas step={stepIndex} setCode={setSelectedCode} />;
          case 'llm-train': return <LlmTrainCanvas step={stepIndex} setCode={setSelectedCode} />;
          case 'llm-infer': return <LlmInferCanvas step={stepIndex} setCode={setSelectedCode} />;
          default: return null;
      }
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-950">
      
      {/* Top Scenario Selector */}
      <div className="w-full bg-slate-900 border-b border-slate-800 p-3 lg:p-4 shrink-0 shadow-md z-20">
        <div className="mx-auto flex flex-col md:flex-row gap-4 justify-between items-center w-full max-w-full px-4 lg:px-8">
            
            <div className="flex bg-slate-950 border border-slate-800 p-1.5 rounded-xl overflow-x-auto w-full md:w-auto no-scrollbar gap-1 custom-scrollbar">
                {(Object.entries(SCENARIOS) as [ScenarioId, any][]).map(([id, data]) => (
                    <button
                        key={id}
                        onClick={() => handleScenarioChange(id)}
                        className={`px-5 py-2.5 text-xs lg:text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${scenarioId === id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'}`}
                    >
                        {data.title}
                    </button>
                ))}
            </div>
            
            <div className="text-right flex flex-col hidden md:flex">
                <span className="text-sm font-bold text-slate-100">{scenario.title}</span>
                <span className="text-xs text-slate-400 max-w-sm mt-1 leading-snug">{scenario.description}</span>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full relative">
         
         {/* Left: Interactive Canvas */}
         <div className="flex-1 relative flex flex-col items-center justify-center p-4 xl:p-12 border-r border-slate-800/50 bg-slate-900 shadow-inner overflow-hidden min-h-[400px]">
             <div className="flex-1 w-full flex items-center justify-center relative scale-90 md:scale-95 lg:scale-100 origin-center transition-transform">
                 {renderCanvas()}
             </div>
             
             {/* Code Snippet Overlay */}
             {selectedCode && (
                <div className="absolute bottom-4 left-4 right-4 xl:bottom-6 xl:left-8 xl:right-8 bg-slate-900 border border-slate-700 shadow-2xl rounded-xl z-50 overflow-hidden duration-300">
                    <div className="flex justify-between items-center px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                           <Layers className="w-4 h-4 text-emerald-400" />
                           <h4 className="text-emerald-400 font-bold text-xs lg:text-sm tracking-wide">{selectedCode.title} <span className="text-slate-400 font-normal ml-2">{t.pytorchImpl}</span></h4>
                        </div>
                        <button 
                            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-700"
                            onClick={() => setSelectedCode(null)}
                        >
                            <X className="w-4 h-4"/>
                        </button>
                    </div>
                    <div className="p-4 overflow-x-auto bg-slate-900 max-h-[30vh] overflow-y-auto custom-scrollbar">
                        <pre className="text-[10px] lg:text-xs text-slate-300 font-mono leading-relaxed">
                            {selectedCode.code}
                        </pre>
                    </div>
                </div>
             )}
         </div>

         {/* Right: Steps Guide - Adjusted width to be smaller */}
         <div className="w-full md:w-80 xl:w-[350px] bg-slate-900/60 flex flex-col shrink-0 border-l border-slate-800 shadow-2xl">
             <div className="p-6 xl:p-8 flex-1 overflow-y-auto w-full custom-scrollbar">
                 <h3 className="text-slate-200 font-bold mb-8 text-sm xl:text-base tracking-widest border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    执行运作流程解析
                 </h3>
                 
                 <div className="relative pl-6 lg:pl-8 border-l-2 border-slate-800 space-y-10">
                     {steps.map((s, idx) => (
                         <div 
                           key={s.id} 
                           className={`relative cursor-pointer transition-all duration-300 ${idx === stepIndex ? 'scale-105 origin-left' : 'opacity-50 hover:opacity-100'}`}
                           onClick={() => setStepIndex(idx)}
                         >
                             <div className={`absolute -left-[37px] lg:-left-[45px] w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 flex items-center justify-center text-[10px] lg:text-xs font-bold bg-slate-900 transition-colors ${idx === stepIndex ? 'border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)]' : idx < stepIndex ? 'border-emerald-500 text-emerald-500' : 'border-slate-700 text-slate-500'}`}>
                                {idx < stepIndex ? '✓' : idx + 1}
                             </div>
                             
                             <h4 className={`text-sm lg:text-base font-bold ${idx === stepIndex ? 'text-indigo-300 drop-shadow-sm' : 'text-slate-300'}`}>{s.title}</h4>
                             {idx === stepIndex && (
                                 <p className="text-xs lg:text-sm text-slate-400 mt-2 lg:mt-3 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                                     {s.desc}
                                 </p>
                             )}
                         </div>
                     ))}
                 </div>
             </div>
             
             {/* Bottom Nav Controller */}
             <div className="p-5 xl:p-6 bg-slate-900 border-t border-slate-800 flex justify-between gap-4 shrink-0 rounded-tl-2xl md:rounded-none shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                  <button 
                       className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-lg disabled:opacity-30 transition-all duration-200"
                       onClick={() => setStepIndex(prev => Math.max(0, prev - 1))}
                       disabled={stepIndex === 0}
                  >
                       上一步
                  </button>
                  <button 
                       className={`flex-1 py-3 text-white text-sm font-semibold rounded-lg transition-all duration-300 ${stepIndex === steps.length - 1 ? 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_4px_15px_rgba(16,185,129,0.3)]' : 'bg-indigo-600 hover:bg-indigo-500 shadow-[0_4px_15px_rgba(99,102,241,0.4)]'}`}
                       onClick={() => {
                           if (stepIndex === steps.length - 1) {
                               setStepIndex(0); // Reset
                           } else {
                               setStepIndex(prev => Math.min(steps.length - 1, prev + 1));
                           }
                       }}
                  >
                       {stepIndex === steps.length - 1 ? '重新演示' : '执行下一步'}
                  </button>
             </div>
         </div>
      </div>
    </div>
  );
}

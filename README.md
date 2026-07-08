<div align="center">

<br/>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19"/>
<img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/React_Flow-12-FF0072?style=for-the-badge&logo=react&logoColor=white" alt="React Flow"/>
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>

<br/>
<br/>

<h1 style="font-size: 3em; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
  🧠 Transformer Visualizer
</h1>

**交互式深度学习架构可视化教学工具**
**Interactive Deep Learning Architecture Visualization Teaching Tool**

<p style="max-width: 640px; margin: 1em auto; color: #94a3b8; font-size: 1.05em;">

🇨🇳 可视化探索 Transformer 架构的内部机理 —— 从词嵌入到多头注意力，从训练到推理，从 Encoder-Decoder 到 Decoder-Only 大语言模型。

🇺🇸 Visually explore the inner workings of the Transformer architecture — from embeddings to multi-head attention, from training to inference, from Encoder-Decoder to Decoder-Only LLMs.

</p>

<p>
  <a href="https://happy-momo.github.io/transformervis.github.io/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Click_Here-8B5CF6?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<br/>

<p>
  <a href="#-核心功能--features">功能 / Features</a> •
  <a href="#-快速开始--quick-start">快速开始 / Quick Start</a> •
  <a href="#-使用指南--user-guide">使用指南 / User Guide</a> •
  <a href="#-项目架构--architecture">架构 / Architecture</a> •
  <a href="#-技术栈--tech-stack">技术栈 / Tech Stack</a>
</p>

<br/>

</div>

---

> 🌐 **[Online Demo](https://happy-momo.github.io/transformervis.github.io/)** — 无需安装，直接在浏览器中体验完整功能。
> No installation required — experience all features directly in your browser.

---

## 📸 预览 / Preview

<table>
  <tr>
    <td align="center"><b>🏗️ Builder Mode</b></td>
    <td align="center"><b>🔄 Workflow Mode</b></td>
  </tr>
  <tr>
    <td><img width="1912" alt="Builder Mode" src="https://github.com/user-attachments/assets/3a73f8de-f3b3-458b-a946-0feb2a4d9fff"/></td>
    <td><img width="1912" alt="Workflow Mode" src="https://github.com/user-attachments/assets/da68d2b0-9c89-43eb-b4ce-a6151a9b9369"/></td>
  </tr>
  <tr>
    <td align="center"><b>⚖️ Comparison Mode</b></td>
    <td align="center"><b>📝 Code Window</b></td>
  </tr>
  <tr>
    <td><img width="1912" alt="Comparison Mode" src="https://github.com/user-attachments/assets/bd1f7973-f02f-40ea-b981-f34073ab7164"/></td>
    <td align="center" valign="middle"><sub>Click any module node to open<br/>a floating code window with<br/>PyTorch & from-scratch views</sub></td>
  </tr>
</table>

---

## ✨ 核心功能 / Features

<table>
  <tr>
    <td width="50%">
      <h3>🧩 交互式架构组装器 / Interactive Builder</h3>
      <p><b>🇨🇳</b> 以拖拽节点图的形式直观构建 Transformer 模型。点击任意模块即可查看其底层 PyTorch 实现代码。</p>
      <p><b>🇺🇸</b> Build Transformer models visually with a drag-and-drop node graph. Click any module to inspect its PyTorch implementation.</p>
      <ul>
        <li>可调节超参数：<code>d_model</code>、<code>n_heads</code>、<code>d_ff</code>、<code>dropout</code><br/><sub>Adjustable hyperparameters with real-time code interpolation</sub></li>
        <li>Encoder / Decoder 堆叠层数自由配置（1–24 层）<br/><sub>Freely configure Encoder/Decoder stack depth (1–24 layers)</sub></li>
        <li>代码片段随参数实时插值更新<br/><sub>Code snippets update in real-time as parameters change</sub></li>
        <li>Memory（交叉注意力）连接可视化<br/><sub>Memory (cross-attention) connection visualization</sub></li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔄 运行推演与执行流程 / Workflow Execution</h3>
      <p><b>🇨🇳</b> 分步推演真实训练与推理场景中的数据流转，伴随动画状态切换，深入理解每一步的计算含义。</p>
      <p><b>🇺🇸</b> Step through real training and inference scenarios with animated state transitions to understand the computational meaning of each step.</p>
      <ul>
        <li><b>Encoder-Decoder 训练</b> — 多 Batch 前向传播与反向传播<br/><sub>Multi-batch forward & backward propagation</sub></li>
        <li><b>Encoder-Decoder 推理</b> — 基于 Memory 的自回归解码<br/><sub>Memory-based autoregressive decoding</sub></li>
        <li><b>LLM 预训练</b> — 因果语言模型文本语料训练<br/><sub>Causal language model corpus training</sub></li>
        <li><b>LLM 推理</b> — KV Cache 加速文本生成<br/><sub>KV Cache accelerated text generation</sub></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚡ LSTM vs Transformer 对比 / Comparison</h3>
      <p><b>🇨🇳</b> 通过生动的动画，直观对比传统循环网络与 Transformer 在并行计算能力上的本质差异。</p>
      <p><b>🇺🇸</b> Animated side-by-side comparison revealing the fundamental difference in parallelism between RNNs and Transformers.</p>
      <ul>
        <li>串行 O(N) 与并行 O(1) 计算模式对比<br/><sub>Serial O(N) vs parallel O(1) computation comparison</sub></li>
        <li>Self-Attention 与 Cross-Attention 弧线实时绘制<br/><sub>Real-time Self-Attention & Cross-Attention arc rendering</sub></li>
        <li>理解 Teacher Forcing 与自回归解码的区别<br/><sub>Understand Teacher Forcing vs autoregressive decoding</sub></li>
      </ul>
    </td>
    <td width="50%">
      <h3>📝 PyTorch 源码深度集成 / Code Integration</h3>
      <p><b>🇨🇳</b> 每个架构模块都关联了 PyTorch 官方 API 实现和纯 Python 手写推导两种代码视图。</p>
      <p><b>🇺🇸</b> Every architecture module links to both PyTorch official API and from-scratch Python implementations.</p>
      <ul>
        <li>从零实现多头注意力机制<br/><sub>Multi-head attention from scratch</sub></li>
        <li>正弦/余弦位置编码<br/><sub>Sinusoidal positional encoding</sub></li>
        <li>Encoder / Decoder 逐层代码解析<br/><sub>Layer-by-layer Encoder/Decoder code walkthrough</sub></li>
        <li>一键复制代码 / One-click copy</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 快速开始 / Quick Start

### 环境要求 / Prerequisites

| | |
|---|---|
| **Node.js** | ≥ 18（推荐 / Recommended: 20 LTS） |
| **npm** | ≥ 9（或 / or yarn / pnpm） |

### 安装 / Installation

```bash
# 克隆仓库 / Clone the repository
git clone https://github.com/happy-momo/transformer-visualizer.git
cd transformer-visualizer

# 安装依赖 / Install dependencies
npm install

# 配置环境变量（可选，仅 AI Studio 部署需要）
# Configure environment variables (optional, only for AI Studio deployment)
cp .env.example .env.local
```

> 💡 **说明 / Note：** `.env.local` 中的 `GEMINI_API_KEY` 仅在部署到 Google AI Studio 时需要。本地开发完全离线运行，无需 API 密钥。
> The `GEMINI_API_KEY` in `.env.local` is only needed for Google AI Studio deployment. Local development runs fully offline — no API key required.

### 启动开发服务器 / Start Dev Server

```bash
npm run dev
```

浏览器打开 / Open in browser: [http://localhost:3000](http://localhost:3000)

支持热模块替换（HMR），代码修改即时生效。
Hot Module Replacement (HMR) enabled — changes reflect instantly.

### 生产构建 / Production Build

```bash
# 构建 / Build
npm run build

# 本地预览 / Preview locally
npm run preview
```

构建产物输出到 `dist/` 目录，可部署到任意静态托管服务。
Build output goes to `dist/`, deployable to any static hosting service.

---

## 📖 使用指南 / User Guide

### 1. 🏗️ 架构组装器模式 / Builder Mode

默认进入的交互式节点图视图 / The default interactive node-graph view：

| 操作 / Action | 说明 / Description |
|---|---|
| **左侧边栏 / Left Sidebar** | 在三种模式间切换 / Switch between three modes |
| **中央画布 / Center Canvas** | 拖拽平移，滚轮缩放 / Drag to pan, scroll to zoom |
| **右侧配置面板 / Right Config Panel** | 调节超参数 / Adjust hyperparameters |
| **点击模块 / Click Module** | 弹出浮动代码窗口 / Open floating code window |
| **拖拽节点 / Drag Node** | 重新排布布局 / Rearrange layout |
| **调整滑块 / Adjust Sliders** | 实时更新参数与代码 / Real-time parameter & code update |

**代码窗口功能 / Code Window Features：**
- 切换 **PyTorch 标准 API** 与 **Python 底层推导** 两种视图 / Toggle between PyTorch API and from-scratch views
- 一键复制代码 / One-click copy to clipboard
- 拖拽窗口头部重新定位 / Drag header to reposition
- 点击 × 或画布空白区域关闭 / Click × or canvas blank area to close

### 2. 🔄 工作流漫游模式 / Workflow Mode

分步推演真实执行场景 / Step through real execution scenarios：

| 场景 / Scenario | 步骤 / Steps | 说明 / Description |
|---|---|---|
| **Encoder-Decoder 训练 / Training** | 5 | 多 Batch 训练循环：前向传播 → 损失计算 → 反向传播 → 新 Batch → 收敛<br/>Multi-batch training loop: forward → loss → backward → new batch → convergence |
| **Encoder-Decoder 推理 / Inference** | 4 | 源端编码 → 自回归逐 Token 生成 → EOS 终止<br/>Source encoding → autoregressive token generation → EOS termination |
| **LLM 预训练 / Pre-training** | 4 | 因果前向传播 → 损失与权重更新 → 新语料块 → 深层特征迭代<br/>Causal forward → loss & weight update → new corpus chunk → deep feature iteration |
| **LLM 推理 / Inference** | 4 | Prefill 阶段 → KV Cache 增量生成 → EOS 终止<br/>Prefill phase → KV Cache incremental generation → EOS termination |

**操作方式 / How to use：**
1. 选择场景（顶部标签栏）/ Select scenario (top tab bar)
2. 使用右侧步骤面板或底部按钮推进 / Use step panel or bottom buttons to advance
3. 点击模块查看源码 / Click modules to view source code
4. 观看动画：活跃模块高亮、数据流动画 / Watch animations: active module highlights, data flow

### 3. ⚖️ 对比分析模式 / Comparison Mode

LSTM 与 Transformer 的动画对比 / Animated LSTM vs Transformer comparison：

1. 点击 **启动翻译训练模拟** / Click **Start Translation Training Simulation**
2. 观察 LSTM **串行逐个** 处理 Token，Transformer **并行一次性** 处理 / Observe LSTM processing tokens serially vs Transformer in parallel
3. 观察 Self-Attention 弧线在所有 Token 对之间同时形成 / Watch Self-Attention arcs form simultaneously across all token pairs
4. 观察 Cross-Attention 在 Encoder 与 Decoder 之间的连接 / Observe Cross-Attention connections between Encoder and Decoder
5. 底部架构分析总结 / Architecture analysis summary at bottom

### 4. ⚙️ 配置面板参数 / Configuration Parameters

| 参数 / Parameter | 范围 / Range | 步长 / Step | 默认值 / Default | 说明 / Description |
|---|---|---|---|---|
| `d_model` | 128 – 2048 | 128 | 512 | 词嵌入维度 / Embedding dimension |
| `n_heads` | 2 – 32 | 2 | 8 | 注意力头数 / Number of attention heads |
| `d_ff` | 512 – 8192 | 512 | 2048 | 前馈网络隐藏层维度 / FFN hidden dimension |
| `dropout` | 0 – 0.5 | 0.05 | 0.1 | 随机失活率 / Dropout rate |
| Encoder 层数 / Layers | 1 – 24 | 1 | 6 | Encoder 堆叠块数量 / Encoder stack depth |
| Decoder 层数 / Layers | 0 – 24 | 1 | 6 | Decoder 堆叠块数量（0 = Decoder-Only）/ Decoder stack depth (0 = Decoder-Only) |

### 5. 🌗 主题切换 / Theme Toggle

点击侧边栏底部的 **Light / Dark** 按钮，在深色模式（默认）与浅色模式之间切换。
Click the **Light / Dark** button at the bottom of the sidebar to toggle between dark mode (default) and light mode.

---

## 🏛️ 项目架构 / Architecture

```
transformer-visualizer/
├── index.html                  # 入口 HTML / Entry HTML
├── vite.config.ts              # Vite 配置 / Vite config (React + Tailwind plugins)
├── tsconfig.json               # TypeScript 配置 / TypeScript config
├── package.json                # 依赖与脚本 / Dependencies & scripts
├── metadata.json               # AI Studio 部署元数据 / AI Studio deployment metadata
├── .env.example                # 环境变量模板 / Environment variable template
│
└── src/
    ├── main.tsx                # React 入口 / React entry point
    ├── App.tsx                 # 根组件，按模式路由 / Root component, mode routing
    ├── index.css               # 全局样式 + 主题变量 / Global styles + theme variables
    ├── types.ts                # TypeScript 类型定义 / Type definitions
    │
    ├── context/
    │   └── AppContext.tsx       # 全局状态（主题、语言）/ Global state (theme, language)
    │
    ├── components/
    │   ├── Sidebar.tsx          # 导航侧边栏 / Navigation sidebar
    │   ├── ConfigPanel.tsx      # 超参数配置面板 / Hyperparameter config panel
    │   ├── ModeBuilder.tsx      # 架构组装器 / Architecture builder (React Flow canvas)
    │   ├── ModeWorkflow.tsx     # 工作流分步执行 / Workflow step-by-step executor
    │   ├── ModeComparison.tsx   # LSTM vs Transformer 对比 / Comparison mode
    │   ├── ModuleNode.tsx       # 自定义模块节点 / Custom module node
    │   └── CodeWindowNode.tsx   # 浮动代码窗口 / Floating code window node
    │
    └── data/
        └── codeSnippets.ts     # PyTorch 代码片段 / PyTorch code snippets
```

### 组件数据流 / Component Data Flow

```
App
├── Sidebar              ← 模式选择 / Mode selection (builder / workflow / comparison)
├── Main Content Area
│   ├── ModeBuilder      ← React Flow 交互画布 / Interactive canvas
│   │   ├── ModuleNode   ← Transformer 模块节点 / Module nodes
│   │   └── CodeWindowNode ← 浮动代码面板 / Floating code panels
│   ├── ModeWorkflow     ← 分步动画推演 / Step-by-step animation
│   │   ├── EncDecTrainCanvas   — Encoder-Decoder 训练 / Training
│   │   ├── EncDecInferCanvas   — Encoder-Decoder 推理 / Inference
│   │   ├── LlmTrainCanvas      — LLM 预训练 / Pre-training
│   │   └── LlmInferCanvas      — LLM 推理 / Inference
│   └── ModeComparison   ← LSTM vs Transformer 动画 / Animated comparison
└── ConfigPanel          ← 超参数控制 / Hyperparameter controls (Builder mode only)
```

---

## 🛠️ 技术栈 / Tech Stack

| 技术 / Technology | 用途 / Purpose |
|---|---|
| [React 19](https://react.dev/) | 前端 UI 框架，支持并发特性 / UI framework with concurrent features |
| [TypeScript 5.8](https://www.typescriptlang.org/) | 类型安全的开发体验 / Type-safe development |
| [Vite 6](https://vitejs.dev/) | 构建工具与开发服务器 / Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | 原子化 CSS，CSS 变量主题切换 / Utility-first CSS with theme variables |
| [React Flow 12](https://reactflow.dev/) | 交互式节点图可视化引擎 / Interactive node graph engine |
| [Framer Motion 12](https://motion.dev/) | 流畅的动画与过渡效果 / Smooth animations & transitions |
| [Lucide React](https://lucide.dev/) | 一致的高质量图标库 / Consistent icon library |

---

## 🧪 可用脚本 / Available Scripts

| 命令 / Command | 说明 / Description |
|---|---|
| `npm run dev` | 启动开发服务器（端口 3000）/ Start dev server (port 3000) |
| `npm run build` | 构建生产版本 / Build for production |
| `npm run preview` | 本地预览生产构建 / Preview production build locally |
| `npm run lint` | TypeScript 类型检查 / TypeScript type checking |
| `npm run clean` | 清除 `dist/` 和 `server.js` / Clean `dist/` and `server.js` |

---

## 📚 教学目标 / Educational Goals

本工具面向以下人群设计 / This tool is designed for：

| 🇨🇳 | 🇺🇸 |
|---|---|
| **学生** — 初次学习 Transformer 架构的深度学习入门者 | **Students** — Deep learning beginners encountering Transformer for the first time |
| **教育工作者** — 在 NLP 课程中使用交互式演示辅助教学 | **Educators** — Using interactive demos in NLP courses |
| **工程师** — 从 RNN 模型迁移到 Transformer 架构的从业者 | **Engineers** — Transitioning from RNN to Transformer architectures |
| **研究者** — 需要可视化展示架构概念的科研人员 | **Researchers** — Needing visual demonstrations of architectural concepts |

### 涵盖的核心概念 / Core Concepts Covered

- [x] 缩放点积注意力（Q, K, V）/ Scaled Dot-Product Attention
- [x] 多头注意力机制 / Multi-Head Attention
- [x] 位置编码（正弦/余弦）/ Positional Encoding (Sinusoidal)
- [x] Encoder-Decoder 架构 / Encoder-Decoder Architecture
- [x] 因果掩码自注意力 / Causal Masked Self-Attention
- [x] Encoder-Decoder 交叉注意力 / Cross-Attention
- [x] 残差连接 + 层归一化 / Residual Connection + Layer Normalization
- [x] 前馈神经网络（FFN）/ Feed-Forward Network
- [x] Teacher Forcing 与自回归解码 / Teacher Forcing & Autoregressive Decoding
- [x] KV Cache 推理加速 / KV Cache Inference Acceleration
- [x] 梯度反向传播 / Gradient Backpropagation

---

## 🌐 部署 / Deployment

### GitHub Pages

本项目已部署到 GitHub Pages / This project is deployed on GitHub Pages：

🔗 **[https://happy-momo.github.io/transformervis.github.io/](https://happy-momo.github.io/transformervis.github.io/)**

部署仓库 / Deployment repo: [happy-momo/transformervis.github.io](https://github.com/happy-momo/transformervis.github.io)

构建时通过 `BASE_URL` 环境变量控制 base 路径 / The base path is controlled via the `BASE_URL` environment variable at build time：

```bash
# GitHub Pages 项目站点 / Project site
BASE_URL=/transformervis.github.io/ npm run build

# 本地开发或根路径部署 / Local dev or root deployment
npm run build
```

---

## 🤝 参与贡献 / Contributing

欢迎贡献！/ Contributions are welcome!

**🇨🇳** 如果你有改进建议，欢迎提交 Issue 或 Pull Request：
- 更多工作流场景
- 更详细的代码实现
- 更多架构对比（如 Transformer vs CNN）
- 性能优化
- 多语言国际化支持

**🇺🇸** If you have improvement suggestions, feel free to submit an Issue or Pull Request:
- More workflow scenarios
- More detailed code implementations
- More architecture comparisons (e.g., Transformer vs CNN)
- Performance optimizations
- Internationalization (i18n) support

---

## 📄 开源协议 / License

本项目基于 [MIT 协议](LICENSE) 开源。
This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <br/>
  <p>
    为深度学习社区打造的教学工具<br/>
    <sub>A teaching tool built for the deep learning community</sub>
  </p>
  <p>
    <sub>基于 / Built with React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · React Flow 12</sub>
  </p>
  <br/>
</div>

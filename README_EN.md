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

**Interactive Deep Learning Architecture Visualization Teaching Tool**

<p style="max-width: 640px; margin: 1em auto; color: #94a3b8; font-size: 1.05em;">
  Visually explore the inner workings of the Transformer architecture — from embeddings to multi-head attention, from training to inference, from Encoder-Decoder to Decoder-Only LLMs.
</p>

<p>
  <a href="https://happy-momo.github.io/transformervis.github.io/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Click_Here-8B5CF6?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<br/>

<p>
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-user-guide">User Guide</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

<p>
  <a href="README.md">🇨🇳 中文</a> | <b>🇺🇸 English</b>
</p>

<br/>

</div>

---

> 🌐 **[Online Demo](https://happy-momo.github.io/transformervis.github.io/)** — No installation required — experience all features directly in your browser.

---

## 📸 Preview

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

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🧩 Interactive Architecture Builder</h3>
      <p>Build Transformer models visually with a drag-and-drop node graph. Click any module to inspect its underlying PyTorch implementation.</p>
      <ul>
        <li>Adjustable hyperparameters: <code>d_model</code>, <code>n_heads</code>, <code>d_ff</code>, <code>dropout</code> with real-time code interpolation</li>
        <li>Freely configure Encoder/Decoder stack depth (1–24 layers)</li>
        <li>Code snippets update in real-time as parameters change</li>
        <li>Memory (cross-attention) connection visualization</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔄 Workflow Execution & Step-by-Step Replay</h3>
      <p>Step through real training and inference scenarios with animated state transitions to understand the computational meaning of each step.</p>
      <ul>
        <li><b>Encoder-Decoder Training</b> — Multi-batch forward & backward propagation</li>
        <li><b>Encoder-Decoder Inference</b> — Memory-based autoregressive decoding</li>
        <li><b>LLM Pre-training</b> — Causal language model corpus training</li>
        <li><b>LLM Inference</b> — KV Cache accelerated text generation</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚡ LSTM vs Transformer Comparison</h3>
      <p>Animated side-by-side comparison revealing the fundamental difference in parallelism between RNNs and Transformers.</p>
      <ul>
        <li>Serial O(N) vs parallel O(1) computation comparison</li>
        <li>Real-time Self-Attention & Cross-Attention arc rendering</li>
        <li>Understand Teacher Forcing vs autoregressive decoding</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📝 Deep PyTorch Code Integration</h3>
      <p>Every architecture module links to both PyTorch official API and from-scratch Python implementations.</p>
      <ul>
        <li>Multi-head attention from scratch</li>
        <li>Sinusoidal positional encoding</li>
        <li>Layer-by-layer Encoder/Decoder code walkthrough</li>
        <li>One-click copy to clipboard</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

| | |
|---|---|
| **Node.js** | ≥ 18 (Recommended: 20 LTS) |
| **npm** | ≥ 9 (or yarn / pnpm) |

### Installation

```bash
# Clone the repository
git clone https://github.com/happy-momo/transformer-visualizer.git
cd transformer-visualizer

# Install dependencies
npm install

# Configure environment variables (optional, only for AI Studio deployment)
cp .env.example .env.local
```

> 💡 **Note:** The `GEMINI_API_KEY` in `.env.local` is only needed for Google AI Studio deployment. Local development runs fully offline — no API key required.

### Start Dev Server

```bash
npm run dev
```

Open in browser: [http://localhost:3000](http://localhost:3000)

Hot Module Replacement (HMR) enabled — changes reflect instantly.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Build output goes to `dist/`, deployable to any static hosting service.

---

## 📖 User Guide

### 1. 🏗️ Builder Mode

The default interactive node-graph view:

| Action | Description |
|---|---|
| **Left Sidebar** | Switch between three modes: Builder / Workflow / Comparison |
| **Center Canvas** | Drag to pan, scroll to zoom. Each node represents an architecture module |
| **Right Config Panel** | Adjust hyperparameters via sliders and +/- buttons |
| **Click Module** | Open a floating code window showing the PyTorch implementation |
| **Drag Node** | Rearrange the layout |
| **Adjust Sliders** | Real-time parameter & code update |

**Code Window Features:**
- Toggle between **PyTorch Standard API** and **Python From-Scratch** views
- One-click copy to clipboard
- Drag window header to reposition
- Click × or canvas blank area to close

### 2. 🔄 Workflow Mode

Step through real execution scenarios:

| Scenario | Steps | Description |
|---|---|---|
| **Encoder-Decoder Training** | 5 | Multi-batch training loop: forward → loss → backward → new batch → convergence |
| **Encoder-Decoder Inference** | 4 | Source encoding → autoregressive token generation → EOS termination |
| **LLM Pre-training** | 4 | Causal forward → loss & weight update → new corpus chunk → deep feature iteration |
| **LLM Inference** | 4 | Prefill phase → KV Cache incremental generation → EOS termination |

**How to use:**
1. Select a scenario from the top tab bar
2. Use the step panel on the right or the bottom buttons to advance
3. Click any module to view its source code
4. Watch animations: active module highlights, data flow transitions

### 3. ⚖️ Comparison Mode

Animated LSTM vs Transformer comparison:

1. Click **Start Translation Training Simulation**
2. Observe LSTM processing tokens **serially one-by-one** vs Transformer processing **all in parallel**
3. Watch Self-Attention arcs form simultaneously across all token pairs
4. Observe Cross-Attention connections between Encoder and Decoder
5. Read the architecture analysis summary at the bottom

### 4. ⚙️ Configuration Parameters

| Parameter | Range | Step | Default | Description |
|---|---|---|---|---|
| `d_model` | 128 – 2048 | 128 | 512 | Embedding dimension — vector size of token representations |
| `n_heads` | 2 – 32 | 2 | 8 | Number of attention heads — parallel attention computation streams |
| `d_ff` | 512 – 8192 | 512 | 2048 | Feed-forward network hidden dimension |
| `dropout` | 0 – 0.5 | 0.05 | 0.1 | Dropout rate — prevents overfitting |
| Encoder Layers | 1 – 24 | 1 | 6 | Number of Encoder stack blocks |
| Decoder Layers | 0 – 24 | 1 | 6 | Number of Decoder stack blocks (0 = Decoder-Only architecture) |

### 5. 🌗 Theme Toggle

Click the **Light / Dark** button at the bottom of the sidebar to toggle between dark mode (default) and light mode.

---

## 🏛️ Architecture

```
transformer-visualizer/
├── index.html                  # Entry HTML
├── vite.config.ts              # Vite config (React + Tailwind plugins)
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies & scripts
├── metadata.json               # AI Studio deployment metadata
├── .env.example                # Environment variable template
│
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Root component, mode routing
    ├── index.css               # Global styles + theme CSS variables
    ├── types.ts                # TypeScript type definitions
    │
    ├── context/
    │   └── AppContext.tsx       # Global state (theme, language)
    │
    ├── components/
    │   ├── Sidebar.tsx          # Navigation sidebar, mode switcher
    │   ├── ConfigPanel.tsx      # Hyperparameter configuration panel
    │   ├── ModeBuilder.tsx      # Architecture builder (React Flow canvas)
    │   ├── ModeWorkflow.tsx     # Workflow step-by-step executor
    │   ├── ModeComparison.tsx   # LSTM vs Transformer comparison
    │   ├── ModuleNode.tsx       # Custom React Flow module node
    │   └── CodeWindowNode.tsx   # Floating code display node
    │
    └── data/
        └── codeSnippets.ts     # All PyTorch code snippets with template interpolation
```

### Component Data Flow

```
App
├── Sidebar              ← Mode selection (builder / workflow / comparison)
├── Main Content Area
│   ├── ModeBuilder      ← React Flow interactive canvas
│   │   ├── ModuleNode   ← Transformer module visualization nodes
│   │   └── CodeWindowNode ← Floating code display panels
│   ├── ModeWorkflow     ← Step-by-step animation replay
│   │   ├── EncDecTrainCanvas   — Encoder-Decoder Training
│   │   ├── EncDecInferCanvas   — Encoder-Decoder Inference
│   │   ├── LlmTrainCanvas      — LLM Pre-training
│   │   └── LlmInferCanvas      — LLM Inference
│   └── ModeComparison   ← LSTM vs Transformer animated comparison
└── ConfigPanel          ← Hyperparameter controls (Builder mode only)
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework with concurrent features |
| [TypeScript 5.8](https://www.typescriptlang.org/) | Type-safe development |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS with CSS variable theme switching |
| [React Flow 12](https://reactflow.dev/) | Interactive node graph visualization engine |
| [Framer Motion 12](https://motion.dev/) | Smooth animations & transitions |
| [Lucide React](https://lucide.dev/) | Consistent high-quality icon library |

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Clean `dist/` and `server.js` |

---

## 📚 Educational Goals

This tool is designed for:

| Audience | Description |
|---|---|
| **Students** | Deep learning beginners encountering Transformer for the first time |
| **Educators** | Using interactive demos to enhance NLP courses |
| **Engineers** | Transitioning from RNN to Transformer architectures |
| **Researchers** | Needing visual demonstrations of architectural concepts |

### Core Concepts Covered

- [x] Scaled Dot-Product Attention (Q, K, V)
- [x] Multi-Head Attention
- [x] Positional Encoding (Sinusoidal)
- [x] Encoder-Decoder Architecture
- [x] Causal Masked Self-Attention
- [x] Encoder-Decoder Cross-Attention
- [x] Residual Connection + Layer Normalization
- [x] Feed-Forward Network (FFN)
- [x] Teacher Forcing & Autoregressive Decoding
- [x] KV Cache Inference Acceleration
- [x] Gradient Backpropagation

---

## 🌐 Deployment

### GitHub Pages

This project is deployed on GitHub Pages:

🔗 **[https://happy-momo.github.io/transformervis.github.io/](https://happy-momo.github.io/transformervis.github.io/)**

Deployment repo: [happy-momo/transformervis.github.io](https://github.com/happy-momo/transformervis.github.io)

The base path is controlled via the `BASE_URL` environment variable at build time:

```bash
# GitHub Pages project site
BASE_URL=/transformervis.github.io/ npm run build

# Local dev or root-path deployment
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! If you have improvement suggestions, feel free to submit an Issue or Pull Request:

- More workflow scenarios
- More detailed code implementations
- More architecture comparisons (e.g., Transformer vs CNN)
- Performance optimizations
- Internationalization (i18n) support

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <br/>
  <p>
    A teaching tool built for the deep learning community
  </p>
  <p>
    <sub>Built with React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · React Flow 12</sub>
  </p>
  <br/>
</div>

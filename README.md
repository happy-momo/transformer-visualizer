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

<p style="max-width: 640px; margin: 1em auto; color: #94a3b8; font-size: 1.05em;">
  可视化探索 Transformer 架构的内部机理 —— 从词嵌入到多头注意力，从训练到推理，从 Encoder-Decoder 到 Decoder-Only 大语言模型。
</p>

<p>
  <a href="https://happy-momo.github.io/transformervis.github.io/">
    <img src="https://img.shields.io/badge/🌐_在线演示-点击体验-8B5CF6?style=for-the-badge" alt="在线演示"/>
  </a>
</p>

<br/>

<p>
  <a href="#-核心功能">核心功能</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-使用指南">使用指南</a> •
  <a href="#-项目架构">项目架构</a> •
  <a href="#-技术栈">技术栈</a>
</p>

<p>
  <b>🇨🇳 中文</b> | <a href="README_EN.md">🇺🇸 English</a>
</p>

<br/>

</div>

---

> 🌐 **[在线演示](https://happy-momo.github.io/transformervis.github.io/)** — 无需安装，直接在浏览器中体验完整功能。

---

## 📸 预览

<table>
  <tr>
    <td align="center"><b>🏗️ 架构组装器</b></td>
    <td align="center"><b>🔄 工作流推演</b></td>
  </tr>
  <tr>
    <td><img width="1912" alt="架构组装器" src="https://github.com/user-attachments/assets/3a73f8de-f3b3-458b-a946-0feb2a4d9fff"/></td>
    <td><img width="1912" alt="工作流推演" src="https://github.com/user-attachments/assets/da68d2b0-9c89-43eb-b4ce-a6151a9b9369"/></td>
  </tr>
  <tr>
    <td align="center"><b>⚖️ 对比分析</b></td>
    <td align="center"><b>📝 代码窗口</b></td>
  </tr>
  <tr>
    <td><img width="1912" alt="对比分析" src="https://github.com/user-attachments/assets/bd1f7973-f02f-40ea-b981-f34073ab7164"/></td>
    <td align="center" valign="middle"><sub>点击任意模块节点<br/>弹出浮动代码窗口<br/>支持 PyTorch 与手写推导两种视图</sub></td>
  </tr>
</table>

---

## ✨ 核心功能

<table>
  <tr>
    <td width="50%">
      <h3>🧩 交互式架构组装器</h3>
      <p>以拖拽节点图的形式直观构建 Transformer 模型。点击任意模块即可查看其底层 PyTorch 实现代码。</p>
      <ul>
        <li>可调节超参数：<code>d_model</code>、<code>n_heads</code>、<code>d_ff</code>、<code>dropout</code>，代码片段实时插值更新</li>
        <li>Encoder / Decoder 堆叠层数自由配置（1–24 层）</li>
        <li>代码片段随参数实时插值更新</li>
        <li>Memory（交叉注意力）连接可视化</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔄 运行推演与执行流程</h3>
      <p>分步推演真实训练与推理场景中的数据流转，伴随动画状态切换，深入理解每一步的计算含义。</p>
      <ul>
        <li><b>Encoder-Decoder 训练</b> — 多 Batch 前向传播与反向传播</li>
        <li><b>Encoder-Decoder 推理</b> — 基于 Memory 的自回归解码</li>
        <li><b>LLM 预训练</b> — 因果语言模型文本语料训练</li>
        <li><b>LLM 推理</b> — KV Cache 加速文本生成</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚡ LSTM vs Transformer 对比</h3>
      <p>通过生动的动画，直观对比传统循环网络与 Transformer 在并行计算能力上的本质差异。</p>
      <ul>
        <li>串行 O(N) 与并行 O(1) 计算模式可视化对比</li>
        <li>Self-Attention 与 Cross-Attention 连接弧线实时绘制</li>
        <li>理解 Teacher Forcing 与自回归解码的区别</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📝 PyTorch 源码深度集成</h3>
      <p>每个架构模块都关联了 PyTorch 官方 API 实现和纯 Python 手写推导两种代码视图。</p>
      <ul>
        <li>从零实现多头注意力机制</li>
        <li>正弦/余弦位置编码</li>
        <li>Encoder / Decoder 逐层代码解析</li>
        <li>一键复制代码</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 快速开始

### 环境要求

| | |
|---|---|
| **Node.js** | ≥ 18（推荐 20 LTS） |
| **npm** | ≥ 9（或 yarn / pnpm） |

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/happy-momo/transformer-visualizer.git
cd transformer-visualizer

# 安装依赖
npm install

# 配置环境变量（可选，仅 AI Studio 部署需要）
cp .env.example .env.local
```

> 💡 **说明：** `.env.local` 中的 `GEMINI_API_KEY` 仅在部署到 Google AI Studio 时需要。本地开发完全离线运行，无需 API 密钥。

### 启动开发服务器

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可访问。支持热模块替换（HMR），代码修改即时生效。

### 生产构建

```bash
# 构建生产版本
npm run build

# 本地预览生产构建
npm run preview
```

构建产物输出到 `dist/` 目录，可部署到任意静态托管服务。

---

## 📖 使用指南

### 1. 🏗️ 架构组装器模式（Builder）

默认进入的交互式节点图视图：

| 操作 | 说明 |
|---|---|
| **左侧边栏** | 在三种模式间切换：组装器 / 工作流 / 对比 |
| **中央画布** | 拖拽平移，滚轮缩放。每个节点代表一个架构模块 |
| **右侧配置面板** | 通过滑块和 +/- 按钮调节超参数 |
| **点击模块** | 弹出浮动代码窗口，展示对应的 PyTorch 实现 |
| **拖拽节点** | 重新排布布局 |
| **调整滑块** | 实时更新超参数，架构图中的代码片段也随之变化 |

**代码窗口功能：**
- 切换 **PyTorch 标准 API** 与 **Python 底层推导** 两种代码视图
- 点击 **复制** 按钮将代码复制到剪贴板
- 拖拽代码窗口头部进行重新定位
- 点击 **×** 或点击画布空白区域关闭

### 2. 🔄 工作流漫游模式（Workflow）

分步推演真实执行场景：

| 场景 | 步骤 | 说明 |
|---|---|
| **Encoder-Decoder 训练** | 5 步 — 多 Batch 训练循环：前向传播 → 损失计算 → 反向传播 → 新 Batch → 收敛 |
| **Encoder-Decoder 推理** | 4 步 — 源端编码 → 自回归逐 Token 生成 → EOS 终止 |
| **LLM 预训练** | 4 步 — 因果前向传播 → 损失与权重更新 → 新语料块 → 深层特征迭代 |
| **LLM 推理** | 4 步 — Prefill 阶段 → KV Cache 增量生成 → EOS 终止 |

**操作方式：**
1. 选择场景（顶部标签栏）
2. 使用右侧步骤面板或底部按钮推进
3. 点击模块查看源码
4. 观看动画：活跃模块高亮、数据流动画、状态变化均有视觉强调

### 3. ⚖️ 对比分析模式（Comparison）

LSTM 与 Transformer 的动画对比：

1. 点击 **启动翻译训练模拟** 开始对比动画
2. 观察 LSTM **串行逐个** 处理 Token，而 Transformer **并行一次性** 处理所有 Token
3. 观察 Self-Attention 弧线在所有 Token 对之间同时形成
4. 观察 Cross-Attention 在 Encoder 与 Decoder 之间的连接
5. 底部提供架构分析总结，解释 Transformer 为何成为 NLP 领域的主流架构

### 4. ⚙️ 配置面板参数

| 参数 | 范围 | 步长 | 默认值 | 说明 |
|---|---|---|---|---|
| `d_model` | 128 – 2048 | 128 | 512 | 词嵌入维度 —— Token 表示的向量大小 |
| `n_heads` | 2 – 32 | 2 | 8 | 注意力头数 —— 并行注意力计算流的数量 |
| `d_ff` | 512 – 8192 | 512 | 2048 | 前馈网络隐藏层维度 |
| `dropout` | 0 – 0.5 | 0.05 | 0.1 | 随机失活率 —— 防止过拟合 |
| Encoder 层数 | 1 – 24 | 1 | 6 | Encoder 堆叠块数量 |
| Decoder 层数 | 0 – 24 | 1 | 6 | Decoder 堆叠块数量（设为 0 即 Decoder-Only 架构） |

### 5. 🌗 主题切换

点击侧边栏底部的 **Light / Dark** 按钮，在深色模式（默认）与浅色模式之间切换。

---

## 🏛️ 项目架构

```
transformer-visualizer/
├── index.html                  # 入口 HTML
├── vite.config.ts              # Vite 配置（React + Tailwind 插件）
├── tsconfig.json               # TypeScript 配置
├── package.json                # 依赖与脚本
├── metadata.json               # AI Studio 部署元数据
├── .env.example                # 环境变量模板
│
└── src/
    ├── main.tsx                # React 入口
    ├── App.tsx                 # 根组件，按模式路由
    ├── index.css               # 全局样式 + 浅色主题 CSS 变量
    ├── types.ts                # TypeScript 类型定义
    │
    ├── context/
    │   └── AppContext.tsx       # 全局状态（主题、语言）
    │
    ├── components/
    │   ├── Sidebar.tsx          # 导航侧边栏，模式切换
    │   ├── ConfigPanel.tsx      # 超参数配置面板
    │   ├── ModeBuilder.tsx      # 架构组装器（React Flow 画布）
    │   ├── ModeWorkflow.tsx     # 工作流分步执行查看器
    │   ├── ModeComparison.tsx   # LSTM vs Transformer 对比
    │   ├── ModuleNode.tsx       # 自定义 React Flow 模块节点
    │   └── CodeWindowNode.tsx   # 浮动代码显示节点
    │
    └── data/
        └── codeSnippets.ts     # 所有模块的 PyTorch 代码片段
```

### 组件数据流

```
App
├── Sidebar              ← 模式选择（builder / workflow / comparison）
├── 主内容区域
│   ├── ModeBuilder      ← React Flow 交互画布
│   │   ├── ModuleNode   ← 每个 Transformer 模块的可视化节点
│   │   └── CodeWindowNode ← 浮动代码展示面板
│   ├── ModeWorkflow     ← 分步动画场景推演
│   │   ├── EncDecTrainCanvas   — Encoder-Decoder 训练可视化
│   │   ├── EncDecInferCanvas   — Encoder-Decoder 推理可视化
│   │   ├── LlmTrainCanvas      — LLM 预训练可视化
│   │   └── LlmInferCanvas      — LLM 推理可视化
│   └── ModeComparison   ← LSTM vs Transformer 动画对比
└── ConfigPanel          ← 超参数控制（仅在 Builder 模式显示）
```

---

## 🛠️ 技术栈

| 技术 | 用途 |
|---|---|
| [React 19](https://react.dev/) | 前端 UI 框架，支持并发特性 |
| [TypeScript 5.8](https://www.typescriptlang.org/) | 类型安全的开发体验 |
| [Vite 6](https://vitejs.dev/) | 构建工具与开发服务器 |
| [Tailwind CSS 4](https://tailwindcss.com/) | 原子化 CSS 框架，支持 CSS 变量主题切换 |
| [React Flow 12](https://reactflow.dev/) | 交互式节点图可视化引擎 |
| [Framer Motion 12](https://motion.dev/) | 流畅的动画与过渡效果 |
| [Lucide React](https://lucide.dev/) | 一致的高质量图标库 |

---

## 🧪 可用脚本

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器（端口 3000） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | TypeScript 类型检查 |
| `npm run clean` | 清除 `dist/` 和 `server.js` |

---

## 📚 教学目标

本工具面向以下人群设计：

| 人群 | 说明 |
|---|---|
| **学生** | 初次学习 Transformer 架构的深度学习入门者 |
| **教育工作者** | 在 NLP 课程中使用交互式演示辅助教学 |
| **工程师** | 从 RNN 模型迁移到 Transformer 架构的从业者 |
| **研究者** | 需要可视化展示架构概念的科研人员 |

### 涵盖的核心概念

- [x] 缩放点积注意力（Q, K, V）
- [x] 多头注意力机制
- [x] 位置编码（正弦/余弦）
- [x] Encoder-Decoder 架构
- [x] 因果掩码自注意力
- [x] Encoder-Decoder 交叉注意力
- [x] 残差连接 + 层归一化
- [x] 前馈神经网络（FFN）
- [x] Teacher Forcing 与自回归解码
- [x] KV Cache 推理加速
- [x] 梯度反向传播

---

## 🌐 部署

### GitHub Pages

本项目已部署到 GitHub Pages：

🔗 **[https://happy-momo.github.io/transformervis.github.io/](https://happy-momo.github.io/transformervis.github.io/)**

部署仓库：[happy-momo/transformervis.github.io](https://github.com/happy-momo/transformervis.github.io)

构建时通过 `BASE_URL` 环境变量控制 base 路径：

```bash
# GitHub Pages 项目站点
BASE_URL=/transformervis.github.io/ npm run build

# 本地开发或根路径部署
npm run build
```

---

## 🤝 参与贡献

欢迎贡献！如果你有改进建议，欢迎提交 Issue 或 Pull Request：

- 更多工作流场景
- 更详细的代码实现
- 更多架构对比（如 Transformer vs CNN）
- 性能优化
- 多语言国际化支持

---

## 📄 开源协议

本项目基于 [MIT 协议](LICENSE) 开源。

---

<div align="center">
  <br/>
  <p>
    为深度学习社区打造的教学工具
  </p>
  <p>
    <sub>基于 React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · React Flow 12 构建</sub>
  </p>
  <br/>
</div>

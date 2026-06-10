export type CodeSnippet = { title: string; pytorch: string; scratch: string; };

export const snippets: Record<string, CodeSnippet> = {
  input: {
    title: 'Input Tokenizer',
    pytorch: `# Inputs are tokenized integer arrays representing text
# E.g., shape: (batch_size, sequence_length)
input_ids = tokenizer("Hello World", return_tensors="pt")["input_ids"]`,
    scratch: `# Text is split into subwords and mapped to IDs
vocab = {"Hello": 101, "World": 102}
tokens = [vocab.get(w, 0) for w in text.split()]
input_ids = torch.tensor([tokens])`
  },
  embedding: {
    title: 'Input Embedding & Positional Encoding',
    pytorch: `import torch.nn as nn

embedding = nn.Embedding(num_embeddings=32000, embedding_dim={d_model})
# PositionalEncoding is commonly custom implemented as below
`,
    scratch: `import math

import torch
import torch.nn as nn


class PositionalEncoding(nn.Module):
    def __init__(self, d_model: int, max_len: int = 5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return x + self.pe[:, :x.size(1), :]

# Forward pass example:
# x = embedding(input_ids) * math.sqrt({d_model})
# x = positional_encoding(x)`
  },
  encoder: {
    title: 'Transformer Encoder Layer',
    pytorch: `import torch.nn as nn

encoder_layer = nn.TransformerEncoderLayer(
    d_model={d_model}, 
    nhead={n_heads}, 
    dim_feedforward={d_ff}, 
    dropout={dropout},
    batch_first=True
)

# The full stack:
# encoder = nn.TransformerEncoder(encoder_layer, num_layers=N)`,
    scratch: `import torch
import torch.nn as nn


class EncoderLayer(nn.Module):
    def __init__(self, d_model: int, heads: int, d_ff: int, dropout: float):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, heads)
        self.ffn = FeedForward(d_model, d_ff)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(
        self, 
        x: torch.Tensor, 
        mask: torch.Tensor = None
    ) -> torch.Tensor:
        attn_out = self.self_attn(x, x, x, mask)
        x = self.norm1(x + self.dropout(attn_out))
        
        ffn_out = self.ffn(x)
        x = self.norm2(x + self.dropout(ffn_out))
        return x`
  },
  decoder: {
    title: 'Transformer Decoder Layer',
    pytorch: `import torch.nn as nn

decoder_layer = nn.TransformerDecoderLayer(
    d_model={d_model}, 
    nhead={n_heads}, 
    dim_feedforward={d_ff}, 
    dropout={dropout},
    batch_first=True
)

# The full stack:
# decoder = nn.TransformerDecoder(decoder_layer, num_layers=N)`,
    scratch: `import torch
import torch.nn as nn


class DecoderLayer(nn.Module):
    def __init__(self, d_model: int, heads: int, d_ff: int, dropout: float):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, heads)
        self.cross_attn = MultiHeadAttention(d_model, heads)
        self.ffn = FeedForward(d_model, d_ff)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.norm3 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(
        self, 
        x: torch.Tensor, 
        memory: torch.Tensor, 
        src_mask: torch.Tensor = None, 
        tgt_mask: torch.Tensor = None
    ) -> torch.Tensor:
        attn1 = self.self_attn(x, x, x, tgt_mask)
        x = self.norm1(x + self.dropout(attn1))
        
        attn2 = self.cross_attn(x, memory, memory, src_mask)
        x = self.norm2(x + self.dropout(attn2))
        
        ffn_out = self.ffn(x)
        x = self.norm3(x + self.dropout(ffn_out))
        return x`
  },
  attention: {
    title: 'Multi-Head Attention',
    pytorch: `import torch.nn as nn

self_attn = nn.MultiheadAttention(
    embed_dim={d_model}, 
    num_heads={n_heads}, 
    dropout={dropout},
    batch_first=True
)`,
    scratch: `import math

import torch
import torch.nn as nn


class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, heads: int):
        super().__init__()
        self.d_model = d_model
        self.h = heads
        self.d_k = d_model // heads
        
        self.q_lin = nn.Linear(d_model, d_model)
        self.k_lin = nn.Linear(d_model, d_model)
        self.v_lin = nn.Linear(d_model, d_model)
        self.out_lin = nn.Linear(d_model, d_model)
        
    def forward(
        self, 
        q: torch.Tensor, 
        k: torch.Tensor, 
        v: torch.Tensor, 
        mask: torch.Tensor = None
    ) -> torch.Tensor:
        bs = q.size(0)
        
        # Linear projections & split into 'heads'
        k = self.k_lin(k).view(bs, -1, self.h, self.d_k).transpose(1, 2)
        q = self.q_lin(q).view(bs, -1, self.h, self.d_k).transpose(1, 2)
        v = self.v_lin(v).view(bs, -1, self.h, self.d_k).transpose(1, 2)
        
        # Scaled dot-product attention
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            # fill with -inf to approach 0 after softmax
            scores = scores.masked_fill(mask == 0, float('-inf'))
        scores = torch.softmax(scores, dim=-1)
        
        # Re-assemble all heads
        output = torch.matmul(scores, v)
        output = output.transpose(1, 2).contiguous().view(bs, -1, self.d_model)
        
        return self.out_lin(output)`
  },
  linear: {
      title: 'Linear Projection',
      pytorch: `import torch.nn as nn

# Linear projection to vocabulary size
fc_out = nn.Linear(in_features={d_model}, out_features=vocab_size, bias=False)`,
      scratch: `import torch
import torch.nn as nn
import torch.nn.functional as F


class LinearProjection(nn.Module):
    def __init__(self, d_model: int, vocab_size: int):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(vocab_size, d_model))
        self.bias = nn.Parameter(torch.zeros(vocab_size))
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x shape: (batch_size, seq_len, d_model)
        return F.linear(x, self.weight, self.bias)`
  },
  softmax: {
      title: 'Softmax Probabilities',
      pytorch: `import torch.nn.functional as F

# Compute probabilities across vocabulary
probs = F.softmax(logits, dim=-1)`,
      scratch: `import torch


# Standard mathematical softmax implementation
def softmax(x: torch.Tensor, dim: int = -1) -> torch.Tensor:
    # Subtract max for numerical stability
    e_x = torch.exp(x - torch.max(x, dim=dim, keepdim=True)[0])
    return e_x / torch.sum(e_x, dim=dim, keepdim=True)`
  }
};

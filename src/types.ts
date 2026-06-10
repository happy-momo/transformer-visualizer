export type AppMode = 'builder' | 'comparison' | 'workflow';

export interface ModelConfig {
  dModel: number;
  nHeads: number;
  dFfn: number;
  numEncoders: number;
  numDecoders: number;
  dropout: number;
}

export const defaultConfig: ModelConfig = {
  dModel: 512,
  nHeads: 8,
  dFfn: 2048,
  numEncoders: 6,
  numDecoders: 6,
  dropout: 0.1,
};

export interface DataStep {
  step: number;
  name: string;
  description: string;
}

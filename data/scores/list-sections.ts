import type { ListClinicalPhase, ScoreDefinition, ScoreOrgan } from '../../types/score';
import { LIST_CLINICAL_PHASE_ORDER } from '../../types/score';

/** 一覧ページの臨床フェーズ（表示順は LIST_CLINICAL_PHASE_ORDER） */
export { LIST_CLINICAL_PHASE_ORDER };

const SCORE_LIST_PHASE: Record<string, ListClinicalPhase> = {
  // スクリーニング
  apcs: 'screening',
  gbs: 'screening',
  noblads: 'screening',
  // 検査
  bbps: 'examination',
  aronchick: 'examination',
  // 背景粘膜（胃）
  'kimura-takemoto': 'background-mucosa',
  kyoto: 'background-mucosa',
  eggim: 'background-mucosa',
  // 病理
  vienna: 'pathology',
  // 治療
  'esophagus-esd-curability': 'treatment',
  'gastric-esd-curability': 'treatment',
  'ecura-hatta': 'treatment',
  sekiguchi: 'treatment',
  'best-j': 'treatment',
  'esd-fibrosis': 'treatment',
  'colorectal-esd-curability': 'treatment',
  'kajiwara-nomogram': 'treatment',
};

const DEFAULT_LIST_PHASE: ListClinicalPhase = 'diagnosis';

export function getScoreListPhase(id: string): ListClinicalPhase {
  return SCORE_LIST_PHASE[id] ?? DEFAULT_LIST_PHASE;
}

export type ScoreListPhaseGroup = {
  phase: ListClinicalPhase;
  scores: ScoreDefinition[];
};

export function organUsesListPhases(organ: ScoreOrgan): boolean {
  return organ !== 'bleeding';
}

/** 臓器内の既存順序を保ちつつ、フェーズ別にグループ化する */
export function groupScoresByListPhase(scores: ScoreDefinition[]): ScoreListPhaseGroup[] {
  const buckets = new Map<ListClinicalPhase, ScoreDefinition[]>();
  for (const phase of LIST_CLINICAL_PHASE_ORDER) {
    buckets.set(phase, []);
  }
  for (const score of scores) {
    buckets.get(getScoreListPhase(score.id))!.push(score);
  }
  return LIST_CLINICAL_PHASE_ORDER.map((phase) => ({
    phase,
    scores: buckets.get(phase)!,
  })).filter((group) => group.scores.length > 0);
}

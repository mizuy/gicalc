import type {
  DuodenumSite,
  ListClinicalPhase,
  ListNavCategory,
  ScoreDefinition,
} from '../../types/score';
import { DUODENUM_SITE_ORDER, LIST_CLINICAL_PHASE_ORDER } from '../../types/score';

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

export function navCategoryUsesListPhases(category: ListNavCategory): boolean {
  return category !== 'bleeding' && category !== 'pathology' && category !== 'duodenum';
}

const DUODENUM_SITE: Record<string, DuodenumSite> = {
  spigelman: 'non-ampullary',
  ishii: 'non-ampullary',
  kakushima: 'non-ampullary',
  'kikuchi-mebi': 'non-ampullary',
  toya: 'non-ampullary',
  uchiyama: 'ampulla',
  'ampullary-macroscopic': 'ampulla',
};

export function getDuodenumSite(id: string): DuodenumSite {
  return DUODENUM_SITE[id] ?? 'non-ampullary';
}

export type ScoreDuodenumSiteGroup = {
  site: DuodenumSite;
  scores: ScoreDefinition[];
};

/** 十二指腸は非乳頭部 / 乳頭部でグループ化（既存順序を保持） */
export function groupScoresByDuodenumSite(scores: ScoreDefinition[]): ScoreDuodenumSiteGroup[] {
  const buckets = new Map<DuodenumSite, ScoreDefinition[]>();
  for (const site of DUODENUM_SITE_ORDER) {
    buckets.set(site, []);
  }
  for (const score of scores) {
    buckets.get(getDuodenumSite(score.id))!.push(score);
  }
  return DUODENUM_SITE_ORDER.map((site) => ({
    site,
    scores: buckets.get(site)!,
  })).filter((group) => group.scores.length > 0);
}

/** 大カテゴリ内の既存順序を保ちつつ、フェーズ別にグループ化する */
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

import { ORGAN_LABELS, ORGAN_ORDER, type ScoreOrgan, type ScoreDefinition } from '../../types/score';
import { apcsScore } from './apcs';
import { aronchickScore } from './aronchick';
import { bbpsScore } from './bbps';
import { bestJScore } from './best-j';
import { ecuraHattaScore } from './ecura-hatta';
import { eggimScore } from './eggim';
import { gbsScore } from './gbs';
import { jesScore } from './jes';
import { jnetScore } from './jnet';
import { kajiwaraNomogram } from './kajiwara-nomogram';
import { kimuraTakemotoScore } from './kimura-takemoto';
import { kudoTsurutaScore } from './kudo-tsuruta';
import { kyotoScore } from './kyoto';
import { kyotoModifiedScore } from './kyoto-modified';
import { lstScore } from './lst';
import { mesdaGScore } from './mesda-g';
import { niceScore } from './nice';
import { nobladsScore } from './noblads';
import { parisScore } from './paris';
import { sekiguchiScore } from './sekiguchi';

/** 表示順: 食道 → 胃 → 大腸 → 出血。臓器内は分類→リスク→治療予測 */
export const SCORES: ScoreDefinition[] = [
  jesScore,
  kimuraTakemotoScore,
  mesdaGScore,
  kyotoScore,
  kyotoModifiedScore,
  eggimScore,
  ecuraHattaScore,
  sekiguchiScore,
  bestJScore,
  apcsScore,
  parisScore,
  lstScore,
  kudoTsurutaScore,
  niceScore,
  jnetScore,
  kajiwaraNomogram,
  bbpsScore,
  aronchickScore,
  gbsScore,
  nobladsScore,
];

export function getScoreById(id: string): ScoreDefinition | undefined {
  return SCORES.find((score) => score.id === id);
}

export type ScoreOrganGroup = {
  organ: ScoreOrgan;
  label: string;
  scores: ScoreDefinition[];
};

export function getScoresGroupedByOrgan(): ScoreOrganGroup[] {
  return ORGAN_ORDER.map((organ) => ({
    organ,
    label: ORGAN_LABELS[organ],
    scores: SCORES.filter((score) => score.organ === organ),
  })).filter((group) => group.scores.length > 0);
}

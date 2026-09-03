import { ORGAN_LABELS, ORGAN_ORDER, type ScoreOrgan, type ScoreDefinition } from '../../types/score';
import { apcsScore } from './apcs';
import { aronchickScore } from './aronchick';
import { bbpsScore } from './bbps';
import { bestJScore } from './best-j';
import { colorectalEcScore } from './colorectal-ec';
import { ecuraHattaScore } from './ecura-hatta';
import { esdFibrosisScore } from './esd-fibrosis';
import { eggimScore } from './eggim';
import { erefsScore } from './erefs';
import { forrestScore } from './forrest';
import { gbsScore } from './gbs';
import { hillScore } from './hill';
import { ishiiScore } from './ishii';
import { jesScore } from './jes';
import { jnetScore } from './jnet';
import { jsphVaricesScore } from './jsph-varices';
import { kajiwaraNomogram } from './kajiwara-nomogram';
import { kakushimaScore } from './kakushima';
import { kimuraTakemotoScore } from './kimura-takemoto';
import { kudoTsurutaScore } from './kudo-tsuruta';
import { kyotoScore } from './kyoto';
import { kyotoModifiedScore } from './kyoto-modified';
import { laScore } from './la';
import { lstScore } from './lst';
import { mesdaGScore } from './mesda-g';
import { modifiedSpigelmanScore } from './modified-spigelman';
import { niceScore } from './nice';
import { nobladsScore } from './noblads';
import { parisScore } from './paris';
import { pragueScore } from './prague';
import { sarinScore } from './sarin';
import { sekiguchiScore } from './sekiguchi';
import { siewertScore } from './siewert';
import { spigelmanScore } from './spigelman';
import { spsScore } from './sps';
import { toyaScore } from './toya';
import { viennaScore } from './vienna';
import { waspScore } from './wasp';

/** 表示順: 食道 → 胃 → 十二指腸 → 大腸 → 出血。臓器内は分類→リスク→治療予測 */
export const SCORES: ScoreDefinition[] = [
  jesScore,
  laScore,
  pragueScore,
  siewertScore,
  erefsScore,
  jsphVaricesScore,
  kimuraTakemotoScore,
  hillScore,
  sarinScore,
  mesdaGScore,
  kyotoScore,
  kyotoModifiedScore,
  eggimScore,
  ecuraHattaScore,
  sekiguchiScore,
  bestJScore,
  spigelmanScore,
  modifiedSpigelmanScore,
  ishiiScore,
  kakushimaScore,
  toyaScore,
  apcsScore,
  spsScore,
  viennaScore,
  parisScore,
  lstScore,
  kudoTsurutaScore,
  esdFibrosisScore,
  colorectalEcScore,
  niceScore,
  waspScore,
  jnetScore,
  kajiwaraNomogram,
  bbpsScore,
  aronchickScore,
  forrestScore,
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

import { ORGAN_LABELS, ORGAN_ORDER, type ScoreOrgan, type ScoreDefinition } from '../../types/score';
import { appendicealOrificeScore } from './appendiceal-orifice';
import { apcsModifiedScore } from './apcs-modified';
import { apcsScore } from './apcs';
import { aronchickScore } from './aronchick';
import { bbpsScore } from './bbps';
import { bestJScore } from './best-j';
import { colorectalEsdCurabilityScore } from './colorectal-esd-curability';
import { colorectalEcScore } from './colorectal-ec';
import { ecuraHattaScore } from './ecura-hatta';
import { esophagusEsdCurabilityScore } from './esophagus-esd-curability';
import { esdFibrosisScore } from './esd-fibrosis';
import { gastricEsdCurabilityScore } from './gastric-esd-curability';
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
import { HIDDEN_LIST_SCORE_IDS } from './variant-groups';

/** 全定義（タブ variant 含む） */
export const ALL_SCORE_DEFINITIONS: ScoreDefinition[] = [
  jesScore,
  laScore,
  pragueScore,
  siewertScore,
  erefsScore,
  jsphVaricesScore,
  esophagusEsdCurabilityScore,
  kimuraTakemotoScore,
  hillScore,
  sarinScore,
  mesdaGScore,
  kyotoScore,
  kyotoModifiedScore,
  eggimScore,
  gastricEsdCurabilityScore,
  ecuraHattaScore,
  sekiguchiScore,
  bestJScore,
  spigelmanScore,
  modifiedSpigelmanScore,
  ishiiScore,
  kakushimaScore,
  toyaScore,
  apcsScore,
  apcsModifiedScore,
  spsScore,
  viennaScore,
  parisScore,
  lstScore,
  appendicealOrificeScore,
  kudoTsurutaScore,
  esdFibrosisScore,
  colorectalEsdCurabilityScore,
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

/** ホーム一覧用（variant 専用 id は除外） */
export const SCORES: ScoreDefinition[] = ALL_SCORE_DEFINITIONS.filter(
  (score) => !HIDDEN_LIST_SCORE_IDS.has(score.id),
);

/** 表示順: 食道 → 胃 → 十二指腸 → 大腸 → 出血。臓器内は分類→リスク→治療予測 */
export { SCORES as default };

export function getScoreById(id: string): ScoreDefinition | undefined {
  return ALL_SCORE_DEFINITIONS.find((score) => score.id === id);
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

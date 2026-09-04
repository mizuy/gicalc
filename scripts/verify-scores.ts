import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  NOMOGRAM_ITEM_POINTS,
  nomogramTotalPoints,
  predictLnmProbability,
  valuesToNomogramInput,
} from '../lib/nomogram/kajiwara';
import { computeBestJ } from '../lib/scores/best-j';
import { computeEcura, ECURA_LNM_BY_SCORE } from '../lib/scores/ecura';
import {
  computeColorectalEsdCurability,
  resolveColorectalEsdCurabilityHighlight,
} from '../lib/scores/colorectal-esd-curability';
import {
  computeEsophagusEsdCurability,
  resolveEsophagusEsdCurabilityHighlight,
} from '../lib/scores/esophagus-esd-curability';
import { computeGastricEsdCurability, resolveGastricEsdCurabilityHighlight } from '../lib/scores/gastric-esd-curability';
import { computeEggim } from '../lib/scores/eggim';
import { computeGbs } from '../lib/scores/gbs';
import { computeKyoto } from '../lib/scores/kyoto';
import { computeKyotoModified } from '../lib/scores/kyoto-modified';
import { computeNoblads } from '../lib/scores/noblads';
import { computeApcs } from '../lib/scores/apcs';
import { computeAronchick } from '../lib/scores/aronchick';
import { computeBbps } from '../lib/scores/bbps';
import { computeSekiguchi } from '../lib/scores/sekiguchi';
import { computeIshii } from '../lib/scores/ishii';
import { computeKakushima } from '../lib/scores/kakushima';
import { computeModifiedSpigelman, computeSpigelman } from '../lib/scores/spigelman';
import { lowestFieldValues } from '../lib/scores/initialValues';
import { getScoreById, getScoresGroupedByOrgan, SCORES } from '../data/scores';
import { ISHII_2021_PUBMED } from '../data/scores/ishii';
import { KAKUSHIMA_2017_PUBMED } from '../data/scores/kakushima';
import { QUACH_2019_PUBMED } from '../data/scores/kimura-takemoto';
import { APPENDICEAL_ORIFICE_2016_PUBMED, OUNG_2020_PUBMED } from '../data/scores/appendiceal-orifice';
import { LST_2008_PUBMED } from '../data/scores/lst';
import { MESDA_G_2016_PUBMED } from '../data/scores/mesda-g';
import { ESD_FIBROSIS_2010_PUBMED, ESD_FIBROSIS_2016_PUBMED } from '../data/scores/esd-fibrosis';
import { EREFS_2013_PUBMED } from '../data/scores/erefs';
import { FORREST_1974_PUBMED } from '../data/scores/forrest';
import { HILL_1996_PUBMED } from '../data/scores/hill';
import { LA_1999_PUBMED } from '../data/scores/la';
import { SAURIN_2004_PUBMED } from '../data/scores/modified-spigelman';
import { NICE_2013_PUBMED } from '../data/scores/nice';
import { PARIS_2003_PUBMED } from '../data/scores/paris';
import { PRAGUE_2006_PUBMED } from '../data/scores/prague';
import { JSPH_VARICES_2010_PUBMED, KJ_HUGR_2024_PUBMED, NAGASHIMA_2022_PUBMED, PALL_2023_PUBMED } from '../data/scores/jsph-varices';
import { SARIN_1992_PUBMED } from '../data/scores/sarin';
import { JCE_11_PART2_PUBMED, SIEWERT_1998_PUBMED } from '../data/scores/siewert';
import { SPIGELMAN_1989_PUBMED } from '../data/scores/spigelman';
import { DEKKER_2020_PUBMED, MCWHINNEY_2023_PUBMED } from '../data/scores/sps';
import { KUDO_EC_2011_PUBMED, MAEDA_EC_REVIEW_2021_PUBMED } from '../data/scores/colorectal-ec';
import { KIKUCHI_2014_PUBMED, TOYA_2020_PUBMED } from '../data/scores/toya';
import { VIENNA_2000_PUBMED } from '../data/scores/vienna';
import { WASP_2016_PUBMED } from '../data/scores/wasp';
import { DEFAULT_LOCALE, localizeResult, localizeScore, SCORE_EN, UI } from '../lib/i18n';
import { pubmedUrl } from '../lib/pubmed';
import {
  applyAlgorithmAnswer,
  findEntryForResult,
  walkAlgorithmFlow,
} from '../lib/scores/algorithmFlow';
import { isPwaUpdateAvailable, shouldOfferUpdateAfterControllerChange } from '../lib/web/pwaUpdate';
import { getToolKind, hasAlgorithmFlow, isClassification, isJapanDeveloped, TOOL_KIND_LABELS } from '../types/score';
import { classificationOriginalLocale } from '../lib/i18n/localize';

test('登録スコアは42種で臓器順に並ぶ', () => {
  assert.deepEqual(
    SCORES.map((score) => score.id),
    [
      'jes',
      'la',
      'prague',
      'siewert',
      'erefs',
      'jsph-varices',
      'esophagus-esd-curability',
      'kimura-takemoto',
      'hill',
      'sarin',
      'mesda-g',
      'kyoto',
      'kyoto-modified',
      'eggim',
      'gastric-esd-curability',
      'ecura-hatta',
      'sekiguchi',
      'best-j',
      'spigelman',
      'modified-spigelman',
      'ishii',
      'kakushima',
      'toya',
      'apcs',
      'sps',
      'vienna',
      'paris',
      'lst',
      'appendiceal-orifice',
      'kudo-tsuruta',
      'esd-fibrosis',
      'colorectal-esd-curability',
      'colorectal-ec',
      'nice',
      'wasp',
      'jnet',
      'kajiwara-nomogram',
      'bbps',
      'aronchick',
      'forrest',
      'gbs',
      'noblads',
    ],
  );
  assert.deepEqual(
    getScoresGroupedByOrgan().map((group) => [group.organ, group.scores.map((score) => score.id)]),
    [
      ['esophagus', ['jes', 'la', 'prague', 'siewert', 'erefs', 'jsph-varices', 'esophagus-esd-curability']],
      [
        'stomach',
        [
          'kimura-takemoto',
          'hill',
          'sarin',
          'mesda-g',
          'kyoto',
          'kyoto-modified',
          'eggim',
          'gastric-esd-curability',
          'ecura-hatta',
          'sekiguchi',
          'best-j',
        ],
      ],
      [
        'duodenum',
        ['spigelman', 'modified-spigelman', 'ishii', 'kakushima', 'toya'],
      ],
      [
        'colorectum',
        ['apcs', 'sps', 'vienna', 'paris', 'lst', 'appendiceal-orifice', 'kudo-tsuruta', 'esd-fibrosis', 'colorectal-esd-curability', 'colorectal-ec', 'nice', 'wasp', 'jnet', 'kajiwara-nomogram', 'bbps', 'aronchick'],
      ],
      ['bleeding', ['forrest', 'gbs', 'noblads']],
    ],
  );
});

test('各ツールは CLASSIFICATION / SCORE / PREDICTION MODEL / ALGORITHM のいずれか', () => {
  const expected: Record<string, ReturnType<typeof getToolKind>> = {
    jes: 'classification',
    la: 'classification',
    prague: 'classification',
    siewert: 'classification',
    erefs: 'classification',
    'jsph-varices': 'classification',
    'esophagus-esd-curability': 'algorithm',
    'kimura-takemoto': 'classification',
    hill: 'classification',
    sarin: 'classification',
    'mesda-g': 'algorithm',
    kyoto: 'score',
    'kyoto-modified': 'score',
    eggim: 'score',
    'gastric-esd-curability': 'algorithm',
    'ecura-hatta': 'score',
    sekiguchi: 'score',
    'best-j': 'score',
    spigelman: 'score',
    'modified-spigelman': 'score',
    ishii: 'prediction',
    kakushima: 'prediction',
    toya: 'algorithm',
    apcs: 'score',
    sps: 'classification',
    vienna: 'classification',
    paris: 'classification',
    lst: 'classification',
    'appendiceal-orifice': 'classification',
    'kudo-tsuruta': 'classification',
    'esd-fibrosis': 'classification',
    'colorectal-esd-curability': 'algorithm',
    'colorectal-ec': 'classification',
    nice: 'classification',
    wasp: 'classification',
    jnet: 'classification',
    'kajiwara-nomogram': 'prediction',
    bbps: 'score',
    aronchick: 'score',
    forrest: 'classification',
    gbs: 'score',
    noblads: 'score',
  };
  assert.deepEqual(
    Object.fromEntries(SCORES.map((score) => [score.id, getToolKind(score)])),
    expected,
  );
  assert.equal(TOOL_KIND_LABELS.classification, 'CLASSIFICATION');
  assert.equal(TOOL_KIND_LABELS.score, 'SCORE');
  assert.equal(TOOL_KIND_LABELS.prediction, 'PREDICTION MODEL');
  assert.equal(TOOL_KIND_LABELS.algorithm, 'ALGORITHM');
});

test('日本で開発されたツールだけに日本マークを付ける', () => {
  const japan = [
    'jes',
    'jsph-varices',
    'esophagus-esd-curability',
    'kimura-takemoto',
    'mesda-g',
    'kyoto',
    'kyoto-modified',
    'gastric-esd-curability',
    'ecura-hatta',
    'sekiguchi',
    'best-j',
    'ishii',
    'kakushima',
    'toya',
    'lst',
    'appendiceal-orifice',
    'kudo-tsuruta',
    'esd-fibrosis',
    'colorectal-esd-curability',
    'colorectal-ec',
    'jnet',
    'kajiwara-nomogram',
    'noblads',
  ];
  const international = [
    'la',
    'prague',
    'siewert',
    'erefs',
    'hill',
    'sarin',
    'eggim',
    'spigelman',
    'modified-spigelman',
    'apcs',
    'sps',
    'vienna',
    'paris',
    'nice',
    'wasp',
    'bbps',
    'aronchick',
    'forrest',
    'gbs',
  ];
  assert.deepEqual(
    SCORES.filter((score) => isJapanDeveloped(score)).map((score) => score.id),
    japan,
  );
  assert.deepEqual(
    SCORES.filter((score) => !isJapanDeveloped(score)).map((score) => score.id),
    international,
  );
  assert.equal(UI.en.japanDeveloped, 'Japan-developed');
  assert.doesNotMatch(UI.en.japanDeveloped, /[\u3040-\u30ff\u4e00-\u9faf]/);
});

test('Kajiwara: 参照カテゴリは切片のみで約 0.3%', () => {
  const probability = predictLnmProbability({
    sex: 'male',
    location: 'transverse',
    grade: 'g1',
    lvi: 'negative',
    smDepth: 'lt1000',
    budding: 'bd1',
  });
  assert.equal(probability, 0.3);
});

test('Kajiwara: 多変量係数の代表組み合わせ', () => {
  const cases = [
    {
      input: {
        sex: 'female' as const,
        location: 'transverse' as const,
        grade: 'g1' as const,
        lvi: 'negative' as const,
        smDepth: 'lt1000' as const,
        budding: 'bd1' as const,
      },
      probability: 0.5,
    },
    {
      input: {
        sex: 'male' as const,
        location: 'transverse' as const,
        grade: 'g1' as const,
        lvi: 'positive' as const,
        smDepth: 'lt1000' as const,
        budding: 'bd1' as const,
      },
      probability: 1.1,
    },
    {
      input: {
        sex: 'male' as const,
        location: 'transverse' as const,
        grade: 'g1' as const,
        lvi: 'negative' as const,
        smDepth: 'sm2000plus' as const,
        budding: 'bd1' as const,
      },
      probability: 1.5,
    },
    {
      input: {
        sex: 'male' as const,
        location: 'srb' as const,
        grade: 'g1' as const,
        lvi: 'positive' as const,
        smDepth: 'sm2000plus' as const,
        budding: 'bd1' as const,
      },
      probability: 9.1,
    },
    {
      input: {
        sex: 'female' as const,
        location: 'rsra' as const,
        grade: 'g3' as const,
        lvi: 'positive' as const,
        smDepth: 'sm2000plus' as const,
        budding: 'bd23' as const,
      },
      probability: 56.3,
    },
  ];

  for (const { input, probability } of cases) {
    assert.equal(predictLnmProbability(input), probability, JSON.stringify(input));
  }
});

test('Kajiwara: 高リスク組み合わせは 15% 以上', () => {
  const probability = predictLnmProbability({
    sex: 'female',
    location: 'rsra',
    grade: 'g3',
    lvi: 'positive',
    smDepth: 'sm2000plus',
    budding: 'bd23',
  });
  assert.ok(probability >= 15);
  assert.equal(probability, 56.3);
});

test('Kajiwara: フィールド値 0 は参照カテゴリに写像される', () => {
  const input = valuesToNomogramInput({
    sex: 0,
    location: 0,
    grade: 0,
    lvi: 0,
    smDepth: 0,
    budding: 0,
  });
  assert.deepEqual(input, {
    sex: 'male',
    location: 'transverse',
    grade: 'g1',
    lvi: 'negative',
    smDepth: 'lt1000',
    budding: 'bd1',
  });
});

test('Kajiwara: 部位は C A T D S RS Ra Rb で、同じ係数は同じ点数', () => {
  const defined = getScoreById('kajiwara-nomogram');
  assert.ok(defined && !isClassification(defined));
  assert.deepEqual(
    defined.fields.find((field) => field.id === 'location')?.options.map((option) => option.label),
    ['C', 'A', 'T', 'D', 'S', 'RS', 'Ra', 'Rb'],
  );
  assert.equal(valuesToNomogramInput({ location: 1 }).location, 'acd');
  assert.equal(valuesToNomogramInput({ location: 2 }).location, 'acd');
  assert.equal(valuesToNomogramInput({ location: 0 }).location, 'transverse');
  assert.equal(valuesToNomogramInput({ location: 3 }).location, 'acd');
  assert.equal(valuesToNomogramInput({ location: 4 }).location, 'srb');
  assert.equal(valuesToNomogramInput({ location: 5 }).location, 'rsra');
  assert.equal(valuesToNomogramInput({ location: 6 }).location, 'rsra');
  assert.equal(valuesToNomogramInput({ location: 7 }).location, 'srb');
  assert.equal(NOMOGRAM_ITEM_POINTS.locationAcD, 37.8);
  assert.equal(NOMOGRAM_ITEM_POINTS.locationSRb, 53.0);
  assert.equal(NOMOGRAM_ITEM_POINTS.locationRsRa, 64.9);
  assert.equal(NOMOGRAM_ITEM_POINTS.sm2000plus, 100);
  assert.equal(NOMOGRAM_ITEM_POINTS.sexFemale, 29.7);

  const reference = defined.compute({
    sex: 0,
    location: 0,
    grade: 0,
    lvi: 0,
    smDepth: 0,
    budding: 0,
  });
  assert.equal(reference.probability, 0.3);
  assert.equal(reference.nomogramPoints, 0);

  const cecum = defined.compute({
    sex: 0,
    location: 1,
    grade: 0,
    lvi: 0,
    smDepth: 0,
    budding: 0,
  });
  assert.equal(cecum.nomogramPoints, 37.8);
  assert.equal(cecum.probability, 0.6);
  assert.equal(
    nomogramTotalPoints({
      sex: 'male',
      location: 'acd',
      grade: 'g1',
      lvi: 'negative',
      smDepth: 'lt1000',
      budding: 'bd1',
    }),
    37.8,
  );
  assert.equal(defined.officialUrl, 'https://nomogram.jsccr.jp/nomograms/lnm');
  assert.match(defined.note ?? '', /β係数/);
  assert.equal(defined.figures?.length, 1);
  assert.equal(defined.figures?.[0]?.src, undefined);
  assert.match(defined.figures?.[0]?.href ?? '', /S0016510723000263-gr2_lrg\.jpg/);
  assert.equal(defined.figures?.[0]?.hrefLabel, 'Fig. 2');
  assert.match(defined.figures?.[0]?.caption ?? '', /Fig\. 2/);
  assert.match(defined.figures?.[0]?.source ?? '', /Kajiwara Y/);
  assert.match(defined.figures?.[0]?.doi ?? '', /10\.1016\/j\.gie\.2023\.01\.022/);
  assert.equal(defined.figures?.[0]?.pubmed, '36669574');
  assert.match(defined.figures?.[0]?.note ?? '', /CC ではない/);
  assert.equal(defined.figures?.[0]?.license, undefined);
  const english = localizeScore(defined, 'en');
  assert.equal(english.officialUrl, 'https://nomogram.jsccr.jp/nomograms/lnm');
  assert.equal(english.officialLinkLabel, 'Official calculator (JSCCR)');
  assert.match(english.note ?? '', /β coefficients/);
  assert.doesNotMatch(english.note ?? '', /[\u3040-\u30ff\u4e00-\u9faf]/);
  assert.equal(english.figures?.[0]?.href, defined.figures?.[0]?.href);
  assert.match(english.figures?.[0]?.note ?? '', /not hosted/);
  assert.doesNotMatch(english.figures?.[0]?.note ?? '', /[\u3040-\u30ff\u4e00-\u9faf]/);
});

test('eCura: 0–1 低リスク / 2–4 中リスク / 5–7 高リスク', () => {
  const zero = computeEcura({ ly: 0, size: 0, vm: 0, v: 0, sm: 0 });
  assert.equal(zero.total, 0);
  assert.equal(zero.severity, 'none');
  assert.match(zero.details?.[0] ?? '', /1\.6%/);
  assert.match(zero.details?.[0] ?? '', /1\/62/);

  const low = computeEcura({ ly: 0, size: 0, vm: 0, v: 0, sm: 1 });
  assert.equal(low.total, 1);
  assert.equal(low.severity, 'none');
  assert.equal(low.displayMode, 'points');
  assert.equal(low.maxScore, 7);
  assert.match(low.details?.[0] ?? '', /2\.6%/);
  assert.match(low.details?.[1] ?? '', /2\.5%/);

  const mid = computeEcura({ ly: 3, size: 1, vm: 0, v: 0, sm: 0 });
  assert.equal(mid.total, 4);
  assert.equal(mid.severity, 'moderate');
  assert.match(mid.details?.[0] ?? '', /8\.3%/);

  const high = computeEcura({ ly: 3, size: 1, vm: 1, v: 1, sm: 1 });
  assert.equal(high.total, 7);
  assert.equal(high.severity, 'severe');
  assert.match(high.details?.[0] ?? '', /26\.7%/);
  assert.equal(Object.keys(ECURA_LNM_BY_SCORE).length, 8);
});

test('BEST-J: 抗血栓は継続が満点、休薬は満点-1', () => {
  const continued = computeBestJ({
    warfarin: 4,
    doac: 0,
    p2y12: 0,
    aspirin: 0,
    cilostazol: 0,
    dialysis: 0,
    tumorSize: 0,
    lowerThird: 0,
    multiple: 0,
  });
  assert.equal(continued.total, 4);
  assert.equal(continued.severity, 'moderate');

  const withdrawn = computeBestJ({
    warfarin: 3,
    doac: 0,
    p2y12: 0,
    aspirin: 0,
    cilostazol: 0,
    dialysis: 0,
    tumorSize: 0,
    lowerThird: 0,
    multiple: 0,
  });
  assert.equal(withdrawn.total, 3);
  assert.equal(withdrawn.interpretation, '高リスク');

  const veryHigh = computeBestJ({
    warfarin: 4,
    doac: 4,
    p2y12: 0,
    aspirin: 0,
    cilostazol: 0,
    dialysis: 3,
    tumorSize: 0,
    lowerThird: 0,
    multiple: 0,
  });
  assert.equal(veryHigh.total, 11);
  assert.equal(veryHigh.severity, 'severe');
  assert.equal(veryHigh.interpretation, '超高リスク');
});

test('Spigelman / Modified: 0 点は Stage 0、12 点は Stage IV', () => {
  const zero = computeSpigelman({ number: 0, size: 0, histology: 0, dysplasia: 0 });
  assert.equal(zero.total, 0);
  assert.equal(zero.maxScore, 12);
  assert.equal(zero.interpretation, 'Stage 0');
  assert.match(zero.details?.[1] ?? '', /5年ごと/);

  const stageIv = computeSpigelman({ number: 3, size: 3, histology: 3, dysplasia: 3 });
  assert.equal(stageIv.total, 12);
  assert.equal(stageIv.interpretation, 'Stage IV');
  assert.match(stageIv.details?.[1] ?? '', /6–12か月/);

  const stageIii = computeSpigelman({ number: 2, size: 2, histology: 2, dysplasia: 2 });
  assert.equal(stageIii.total, 8);
  assert.equal(stageIii.interpretation, 'Stage III');

  const modified = computeModifiedSpigelman({ number: 2, size: 2, histology: 1, dysplasia: 3 });
  assert.equal(modified.total, 8);
  assert.equal(modified.interpretation, 'Stage III');
  assert.match(modified.details?.[0] ?? '', /LGD 1 点 \/ HGD 3 点/);
});

test('Ishii / Kakushima: ≥3 点で C4/5、未満は C3', () => {
  const ishiiLow = computeIshii({ color: 0, size: 0, surface: 0, vessels: 0 });
  assert.equal(ishiiLow.total, 0);
  assert.equal(ishiiLow.maxScore, 5);
  assert.equal(ishiiLow.interpretation, 'VCL C3（LGA）を疑う');

  const ishiiCut = computeIshii({ color: 1, size: 1, surface: 1, vessels: 0 });
  assert.equal(ishiiCut.total, 3);
  assert.equal(ishiiCut.interpretation, 'VCL C4/5（HGA / 癌）を疑う');

  const ishiiMax = computeIshii({ color: 1, size: 2, surface: 1, vessels: 1 });
  assert.equal(ishiiMax.total, 5);

  const kakuLow = computeKakushima({ diameter: 0, color: 0, macro: 0, nodularity: 0 });
  assert.equal(kakuLow.total, 0);
  assert.equal(kakuLow.interpretation, 'VCL 3（LGA）を疑う');

  const kakuCut = computeKakushima({ diameter: 1, color: 1, macro: 1, nodularity: 0 });
  assert.equal(kakuCut.total, 3);
  assert.equal(kakuCut.interpretation, 'VCL 4 以上（HGA / 癌）を疑う');

  const kakuMax = computeKakushima({ diameter: 1, color: 2, macro: 1, nodularity: 1 });
  assert.equal(kakuMax.total, 5);
});

test('各スコア定義の compute がフィールド経由で動く', () => {
  const kajiwara = getScoreById('kajiwara-nomogram');
  assert.ok(kajiwara);
  const probability = kajiwara.compute({
    sex: 0,
    location: 0,
    grade: 0,
    lvi: 0,
    smDepth: 0,
    budding: 0,
  });
  assert.equal(probability.displayMode, 'probability');
  assert.equal(probability.probability, 0.3);

  const ecura = getScoreById('ecura-hatta');
  assert.ok(ecura);
  assert.equal(ecura.compute({ ly: 0, size: 0, vm: 0, v: 0, sm: 0 }).total, 0);

  const curability = getScoreById('gastric-esd-curability');
  assert.ok(curability && !isClassification(curability));
  const baseA = {
    enBloc: 0,
    histology: 0,
    size: 2,
    depth: 0,
    ul: 0,
    hm: 0,
    vm: 0,
    ly: 0,
    v: 0,
    undiffSize: 0,
    undiffInSm: 0,
  };
  assert.equal(computeGastricEsdCurability(baseA).interpretation, 'eCuraA（治癒切除）');
  assert.equal(
    computeGastricEsdCurability({ ...baseA, enBloc: 1 }).interpretation,
    'eCuraC-1（非治癒切除）',
  );
  assert.equal(
    computeGastricEsdCurability({ ...baseA, depth: 1, size: 1 }).interpretation,
    'eCuraA（治癒切除）',
  );
  assert.equal(
    computeGastricEsdCurability({ ...baseA, histology: 1, undiffSize: 1 }).interpretation,
    'eCuraC-2（非治癒切除）',
  );
  assert.equal(
    computeGastricEsdCurability({ ...baseA, ly: 1 }).interpretation,
    'eCuraC-2（非治癒切除）',
  );

  const highlightA = resolveGastricEsdCurabilityHighlight(baseA);
  assert.equal(highlightA.complete, true);
  assert.deepEqual(highlightA.cells, ['cell-pt1a-ul0-diff-le3', 'cell-pt1a-ul0-diff-gt3']);

  const highlightC1 = resolveGastricEsdCurabilityHighlight({ ...baseA, enBloc: 1 });
  assert.equal(highlightC1.complete, true);
  assert.ok(highlightC1.cells.includes('cell-pt1a-ul0-diff-le3'));
  assert.ok(highlightC1.cells.includes('cell-pt1a-ul0-diff-gt3'));
  assert.ok(highlightC1.cells.includes('row-c1'));

  const highlightFig6 = resolveGastricEsdCurabilityHighlight({
    ...baseA,
    histology: 1,
    undiffSize: 1,
  });
  assert.equal(highlightFig6.complete, true);
  assert.ok(highlightFig6.cells.includes('row-fig6-undiff-size'));
  assert.ok(highlightFig6.cells.includes('row-c2'));

  const highlightPartial = resolveGastricEsdCurabilityHighlight({
    histology: 0,
    depth: 0,
    ul: 0,
    size: 1,
  });
  assert.equal(highlightPartial.partial, true);
  assert.equal(highlightPartial.complete, false);
  assert.deepEqual(highlightPartial.cells, ['cell-pt1a-ul0-diff-le3', 'cell-pt1a-ul0-diff-gt3']);

  const esophagusCurability = getScoreById('esophagus-esd-curability');
  assert.ok(esophagusCurability && !isClassification(esophagusCurability));
  const esophBase = { depth: 0, vascular: 0, margin: 0, enBloc: 0 };
  assert.equal(computeEsophagusEsdCurability(esophBase).interpretation, '治癒切除');
  assert.equal(
    computeEsophagusEsdCurability({ ...esophBase, margin: 1 }).interpretation,
    '非治癒切除（断端陽性）',
  );
  assert.equal(
    computeEsophagusEsdCurability({ ...esophBase, depth: 1, vascular: 0 }).interpretation,
    '追加治療要個別判断',
  );
  assert.equal(
    computeEsophagusEsdCurability({ ...esophBase, depth: 1, vascular: 1 }).interpretation,
    '追加治療強く推奨',
  );
  assert.equal(
    computeEsophagusEsdCurability({ ...esophBase, depth: 2 }).interpretation,
    '追加治療強く推奨',
  );

  const esophHighlight = resolveEsophagusEsdCurabilityHighlight(esophBase);
  assert.equal(esophHighlight.complete, true);
  assert.deepEqual(esophHighlight.cells, ['cell-ep-lpm-v0']);

  const esophPartial = resolveEsophagusEsdCurabilityHighlight({ depth: 0, vascular: 0, margin: 0 });
  assert.equal(esophPartial.partial, true);
  assert.equal(esophPartial.complete, false);

  const colorectalCurability = getScoreById('colorectal-esd-curability');
  assert.ok(colorectalCurability && !isClassification(colorectalCurability));
  const coloTis = { depth: 0, vm: 0, enBloc: 0, histology: 0, smDepth: 0, lyv: 0, budding: 0 };
  assert.equal(computeColorectalEsdCurability(coloTis).interpretation, '治癒切除（pTis/M）');
  assert.equal(
    computeColorectalEsdCurability({ ...coloTis, vm: 1 }).interpretation,
    '非治癒切除（VM1）',
  );
  const coloSmCurative = { depth: 1, vm: 0, enBloc: 0, histology: 0, smDepth: 0, lyv: 0, budding: 0 };
  assert.equal(
    computeColorectalEsdCurability(coloSmCurative).interpretation,
    '内視鏡的治癒切除（pT1 SM）',
  );
  assert.equal(
    computeColorectalEsdCurability({ ...coloSmCurative, lyv: 1 }).interpretation,
    '追加腸切除要検討',
  );

  const coloHighlight = resolveColorectalEsdCurabilityHighlight(coloSmCurative);
  assert.equal(coloHighlight.complete, true);
  assert.ok(coloHighlight.cells.includes('crit-vm'));
  assert.ok(coloHighlight.cells.includes('crit-histology'));

  const coloPartial = resolveColorectalEsdCurabilityHighlight({ depth: 1, vm: 0, histology: 0 });
  assert.equal(coloPartial.partial, true);
  assert.equal(coloPartial.complete, false);

  const bestJ = getScoreById('best-j');
  assert.ok(bestJ);
  assert.equal(
    bestJ.compute({
      warfarin: 0,
      doac: 0,
      p2y12: 0,
      aspirin: 0,
      cilostazol: 0,
      dialysis: 0,
      tumorSize: 0,
      lowerThird: 0,
      multiple: 0,
    }).interpretation,
    '低リスク',
  );
});

test('GBS: 全因子オフは 0、男性 Hb<10 + BUN≥70 は高点', () => {
  const zero = computeGbs({
    sex: 0,
    bun: 0,
    hb: 0,
    sbp: 0,
    pulse: 0,
    melena: 0,
    syncope: 0,
    hepatic: 0,
    cardiac: 0,
  });
  assert.equal(zero.total, 0);
  assert.equal(zero.interpretation, '超低リスク');

  const high = computeGbs({
    sex: 0,
    bun: 6,
    hb: 3,
    sbp: 3,
    pulse: 1,
    melena: 1,
    syncope: 2,
    hepatic: 2,
    cardiac: 2,
  });
  assert.equal(high.total, 23);
  assert.equal(high.interpretation, '超高リスク');

  const femaleMidHb = computeGbs({
    sex: 1,
    bun: 0,
    hb: 2,
    sbp: 0,
    pulse: 0,
    melena: 0,
    syncope: 0,
    hepatic: 0,
    cardiac: 0,
  });
  assert.equal(femaleMidHb.total, 1);

  const maleMidHb = computeGbs({
    sex: 0,
    bun: 0,
    hb: 2,
    sbp: 0,
    pulse: 0,
    melena: 0,
    syncope: 0,
    hepatic: 0,
    cardiac: 0,
  });
  assert.equal(maleMidHb.total, 3);
});

test('NOBLADS: 0 は低リスク、5 以上は超高リスク', () => {
  const low = computeNoblads({
    nsaids: 0,
    noDiarrhea: 0,
    noTenderness: 0,
    hypotension: 0,
    antiplatelet: 0,
    albumin: 0,
    charlson: 0,
    syncope: 0,
  });
  assert.equal(low.total, 0);
  assert.equal(low.severity, 'none');

  const high = computeNoblads({
    nsaids: 1,
    noDiarrhea: 1,
    noTenderness: 1,
    hypotension: 1,
    antiplatelet: 1,
    albumin: 0,
    charlson: 0,
    syncope: 0,
  });
  assert.equal(high.total, 5);
  assert.equal(high.severity, 'severe');
});

test('Sekiguchi: 0 点は LNM 0%、11 点は 65.4%', () => {
  const zero = computeSekiguchi({ size: 0, depth: 0, histology: 0, ulcer: 0, lvi: 0 });
  assert.equal(zero.total, 0);
  assert.ok(zero.details?.[0]?.includes('0.0%'));

  const mixedDiff = computeSekiguchi({ size: 0, depth: 0, histology: 2, ulcer: 0, lvi: 0 });
  assert.equal(mixedDiff.total, 1);

  const max = computeSekiguchi({ size: 2, depth: 2, histology: 3, ulcer: 1, lvi: 4 });
  assert.equal(max.total, 11);
  assert.ok(max.details?.[0]?.includes('65.4%'));
});

test('京都分類原法 0–8 / 改変 0–5 / EGGIM 0–8', () => {
  assert.equal(computeKyoto({ atrophy: 0, im: 0, fold: 0, nodularity: 0, redness: 0 }).total, 0);
  assert.equal(computeKyoto({ atrophy: 2, im: 2, fold: 1, nodularity: 1, redness: 2 }).total, 8);

  const modifiedLow = computeKyotoModified({
    rac: 0,
    openAtrophy: 0,
    corpusIm: 0,
    mapRedness: 0,
  });
  assert.equal(modifiedLow.total, 0);
  assert.equal(modifiedLow.interpretation, '低リスク');

  const modifiedHigh = computeKyotoModified({
    rac: 2,
    openAtrophy: 1,
    corpusIm: 1,
    mapRedness: 1,
  });
  assert.equal(modifiedHigh.total, 5);
  assert.equal(modifiedHigh.interpretation, '高リスク');

  assert.equal(
    computeEggim({ antrumLesser: 0, antrumGreater: 0, corpusLesser: 0, corpusGreater: 0 }).total,
    0,
  );
  const eggimHigh = computeEggim({
    antrumLesser: 2,
    antrumGreater: 2,
    corpusLesser: 2,
    corpusGreater: 2,
  });
  assert.equal(eggimHigh.total, 8);
  assert.equal(eggimHigh.severity, 'severe');
});

test('BBPS: 各区域 ≥2 は adequate、1つでも 1 以下は inadequate', () => {
  const adequate = computeBbps({ right: 2, transverse: 2, left: 2 });
  assert.equal(adequate.total, 6);
  assert.equal(adequate.interpretation, 'adequate');

  const excellent = computeBbps({ right: 3, transverse: 3, left: 3 });
  assert.equal(excellent.total, 9);
  assert.equal(excellent.interpretation, '良好（adequate）');

  const poorRight = computeBbps({ right: 1, transverse: 3, left: 3 });
  assert.equal(poorRight.total, 7);
  assert.equal(poorRight.interpretation, '不十分（inadequate）');
});

test('APCS: 0–1 平均 / 2–3 中等度 / 4–7 高リスク（Yeoh 2011）', () => {
  const average = computeApcs({ age: 0, sex: 0, family: 0, smoking: 0 });
  assert.equal(average.total, 0);
  assert.equal(average.interpretation, '平均リスク（AR）');
  assert.equal(average.severity, 'none');
  assert.equal(average.maxScore, 7);

  const averageMale = computeApcs({ age: 0, sex: 1, family: 0, smoking: 0 });
  assert.equal(averageMale.total, 1);
  assert.equal(averageMale.interpretation, '平均リスク（AR）');

  const moderate = computeApcs({ age: 2, sex: 0, family: 0, smoking: 0 });
  assert.equal(moderate.total, 2);
  assert.equal(moderate.interpretation, '中等度リスク（MR）');
  assert.equal(moderate.severity, 'moderate');

  const familyOnly = computeApcs({ age: 0, sex: 0, family: 2, smoking: 0 });
  assert.equal(familyOnly.total, 2);
  assert.equal(familyOnly.interpretation, '中等度リスク（MR）');

  const high = computeApcs({ age: 2, sex: 1, family: 0, smoking: 1 });
  assert.equal(high.total, 4);
  assert.equal(high.interpretation, '高リスク（HR）');
  assert.equal(high.severity, 'severe');

  const max = computeApcs({ age: 3, sex: 1, family: 2, smoking: 1 });
  assert.equal(max.total, 7);
  assert.equal(max.interpretation, '高リスク（HR）');

  const defined = getScoreById('apcs');
  assert.ok(defined);
  assert.equal(defined.compute({ age: 0, sex: 0, family: 0, smoking: 0 }).interpretation, '平均リスク（AR）');
});

test('Aronchick: Excellent/Good は adequate、Poor/Inadequate は inadequate', () => {
  const excellent = computeAronchick({ grade: 1 });
  assert.equal(excellent.interpretation, 'Excellent（優）');
  assert.equal(excellent.severity, 'none');

  const fair = computeAronchick({ grade: 3 });
  assert.equal(fair.interpretation, 'Fair（可）');
  assert.equal(fair.severity, 'moderate');

  const inadequate = computeAronchick({ grade: 5 });
  assert.equal(inadequate.interpretation, 'Inadequate（不適）');
  assert.equal(inadequate.severity, 'severe');
});

test('分類は選択計算ではなく定義一覧を持つ', () => {
  const jnet = getScoreById('jnet');
  assert.ok(jnet && isClassification(jnet));
  assert.deepEqual(
    jnet.entries.map((entry) => entry.label),
    ['Type 1', 'Type 2A', 'Type 2B', 'Type 3'],
  );
  assert.equal(jnet.entries[1]?.meaning, 'Low-grade intramucosal neoplasia');
  assert.match(jnet.originalLead ?? '', /vessel and surface pattern/);
  assert.match(jnet.entries[0]?.rows.find((row) => row.heading === '*1')?.text ?? '', /caliber/);

  const kudo = getScoreById('kudo-tsuruta');
  assert.ok(kudo && isClassification(kudo));
  assert.deepEqual(
    kudo.entries.map((entry) => entry.label),
    ['Type I', 'Type II', 'Type IIIs', 'Type IIIL', 'Type IV', 'Type VI', 'Type VN'],
  );
  assert.equal(kudo.entries[5]?.meaning, 'Intramucosal / superficial SM ca');
  assert.match(kudo.originalLead ?? '', /Type V was later subdivided/);
  assert.match(kudo.entries[2]?.rows.find((row) => row.heading === 'Note')?.text ?? '', /small or short/);

  const esdFibrosis = getScoreById('esd-fibrosis');
  assert.ok(esdFibrosis && isClassification(esdFibrosis));
  assert.deepEqual(
    esdFibrosis.entries.map((entry) => entry.label),
    ['F0', 'F1', 'F2', 'Assessment'],
  );
  assert.equal(esdFibrosis.entries[2]?.meaning, 'Severe fibrosis');
  assert.match(esdFibrosis.originalLead ?? '', /white muscular-like structure/);
  assert.equal(esdFibrosis.developedInJapan, true);
  assert.equal(esdFibrosis.pubmed, ESD_FIBROSIS_2010_PUBMED);
  assert.match(localizeScore(esdFibrosis, 'ja').description, /pit pattern/);
  assert.match(esdFibrosis.description, /とは別の分類/);

  const colorectalEc = getScoreById('colorectal-ec');
  assert.ok(colorectalEc && isClassification(colorectalEc));
  assert.deepEqual(
    colorectalEc.entries.map((entry) => entry.label),
    ['EC1a', 'EC1b', 'EC2', 'EC3a', 'EC3b', 'EC-V1', 'EC-V2', 'EC-V3', 'Observation'],
  );
  assert.equal(colorectalEc.developedInJapan, true);
  assert.match(colorectalEc.originalLead ?? '', /EC-V1/);
  assert.match(colorectalEc.originalLead ?? '', /methylene blue/);
  assert.equal(colorectalEc.pubmed, KUDO_EC_2011_PUBMED);

  const jes = getScoreById('jes');
  assert.ok(jes && isClassification(jes));
  assert.deepEqual(
    jes.entries.map((entry) => entry.label),
    ['Type A', 'Type B1', 'Type B2', 'Type B3', 'AVA'],
  );
  assert.equal(jes.entries[2]?.meaning, 'T1a-MM or T1b-SM1');
  assert.match(jes.originalLead ?? '', /three or fewer factors/);
  assert.equal(jes.entries[2]?.comment, '食道 SM1 は ≤200 μm。');

  const kimura = getScoreById('kimura-takemoto');
  assert.ok(kimura && isClassification(kimura));
  assert.deepEqual(
    kimura.entries.map((entry) => entry.label),
    ['C-0', 'C-1', 'C-2', 'C-3', 'O-1', 'O-2', 'O-3'],
  );
  assert.equal(kimura.entries[0]?.group, '萎縮なし');
  assert.equal(kimura.entries[6]?.meaning, 'Open type');
  assert.match(kimura.entries[0]?.comment ?? '', /原著の6型にはない/);

  const paris = getScoreById('paris');
  assert.ok(paris && isClassification(paris));
  assert.deepEqual(
    paris.entries.map((entry) => entry.label),
    ['0-Ip', '0-Is', '0-IIa', '0-IIb', '0-IIc', '0-IIc+IIa', '0-IIa+IIc', '0-III', '0-IIc+III', '0-III+IIc'],
  );
  assert.equal(paris.entries[0]?.meaning, 'Pedunculated');
  assert.match(paris.originalLead ?? '', /Type 0 is divided into three categories/);
  assert.doesNotMatch(paris.entries.map((entry) => entry.label).join(' '), /Isp/);
  assert.equal(paris.pubmed, PARIS_2003_PUBMED);

  const sps = getScoreById('sps');
  assert.ok(sps && isClassification(sps));
  assert.deepEqual(
    sps.entries.map((entry) => entry.label),
    [
      'Criterion I',
      'Criterion II',
      'Type 1',
      'Type 2',
      'Type 3',
      'HP',
      'SSL',
      'TSA',
      'Counting rules',
      'Surveillance',
    ],
  );
  assert.match(sps.originalLead ?? '', /Criterion I/);
  assert.match(sps.originalLead ?? '', /cumulative over a lifetime/);
  assert.equal(sps.pubmed, DEKKER_2020_PUBMED);
  assert.equal(sps.developedInJapan, undefined);

  const lst = getScoreById('lst');
  assert.ok(lst && isClassification(lst));
  assert.deepEqual(
    lst.entries.map((entry) => entry.label),
    ['LST-G homogeneous', 'LST-G mixed nodular', 'LST-NG flat elevated', 'LST-NG pseudodepressed'],
  );
  assert.equal(lst.entries[3]?.meaning, 'Basin-like depression');
  assert.match(lst.originalLead ?? '', /at least 10 mm/);
  assert.equal(lst.pubmed, LST_2008_PUBMED);

  const appendicealOrifice = getScoreById('appendiceal-orifice');
  assert.ok(appendicealOrifice && isClassification(appendicealOrifice));
  assert.deepEqual(
    appendicealOrifice.entries.map((entry) => entry.label),
    ['Type 0', 'Type 1', 'Type 2', 'Type 3', 'Type 3a'],
  );
  assert.equal(appendicealOrifice.entries[2]?.meaning, 'Partial invasion, edge visible');
  assert.match(appendicealOrifice.originalLead ?? '', /Type 3a denotes deep invasion/);
  assert.equal(appendicealOrifice.pubmed, APPENDICEAL_ORIFICE_2016_PUBMED);
  assert.equal(appendicealOrifice.developedInJapan, true);
  assert.equal(appendicealOrifice.figures?.length, 1);
  assert.match(appendicealOrifice.figures?.[0]?.src ?? '', /oung2020-fig2/);
  assert.equal(appendicealOrifice.figures?.[0]?.license, 'CC BY-NC-ND 4.0');
  assert.equal(appendicealOrifice.figures?.[0]?.pubmed, OUNG_2020_PUBMED);
  assert.match(appendicealOrifice.figures?.[0]?.note ?? '', /Type 0/);

  const nice = getScoreById('nice');
  assert.ok(nice && isClassification(nice));
  assert.deepEqual(
    nice.entries.map((entry) => entry.label),
    ['Type 1', 'Type 2', 'Type 3'],
  );
  assert.equal(nice.entries[0]?.meaning, 'Hyperplastic');
  assert.equal(nice.entries[2]?.meaning, 'Deep SM invasive cancer');
  assert.match(nice.originalLead ?? '', /without optical \(zoom\) magnification/);
  assert.match(nice.entries[1]?.rows.find((row) => row.heading === '***')?.text ?? '', /Vienna classification/);
  assert.doesNotMatch(nice.entries.map((entry) => entry.label).join(' '), /2A|2B/);
  assert.equal(nice.pubmed, NICE_2013_PUBMED);

  const mesda = getScoreById('mesda-g');
  assert.ok(mesda && isClassification(mesda));
  assert.deepEqual(
    mesda.entries.map((entry) => entry.label),
    [
      'Suspicious lesion',
      'Demarcation line (DL)',
      'DL absent',
      'Regular MV and MS within DL',
      'Irregular MV and/or MS within DL',
      'Regular MV',
      'Irregular MV',
      'Absent MV',
      'Regular MS',
      'Irregular MS',
      'Absent MS',
    ],
  );
  assert.equal(mesda.entries[4]?.meaning, 'EGC');
  assert.equal(mesda.entries[2]?.meaning, 'Non-cancer');
  assert.match(mesda.originalLead ?? '', /demarcation line \(DL\)/);
  assert.match(
    mesda.entries[4]?.rows.find((row) => row.heading === 'Criteria')?.text ?? '',
    /irregular MV pattern with a DL/,
  );
  assert.doesNotMatch(mesda.entries.map((entry) => entry.label).join(' '), /Type 1|2A|2B|NICE|JNET/);
  assert.equal(mesda.pubmed, MESDA_G_2016_PUBMED);
  assert.equal(mesda.organ, 'stomach');

  const la = getScoreById('la');
  assert.ok(la && isClassification(la));
  assert.deepEqual(
    la.entries.map((entry) => entry.label),
    ['Grade A', 'Grade B', 'Grade C', 'Grade D'],
  );
  assert.match(la.originalLead ?? '', /mucosal break no longer than 5 mm/);
  assert.equal(la.pubmed, LA_1999_PUBMED);
  assert.equal(la.organ, 'esophagus');

  const prague = getScoreById('prague');
  assert.ok(prague && isClassification(prague));
  assert.deepEqual(
    prague.entries.map((entry) => entry.label),
    ['GEJ', 'C', 'M', 'C2M5', 'C0M1', 'C2M2'],
  );
  assert.match(prague.originalLead ?? '', /tops of the gastric mucosal folds/);
  assert.equal(prague.pubmed, PRAGUE_2006_PUBMED);

  const siewert = getScoreById('siewert');
  assert.ok(siewert && isClassification(siewert));
  assert.deepEqual(
    siewert.entries.map((entry) => entry.label),
    ['EGJ', 'Type I', 'Type II', 'Type III', 'Nishi EGJ carcinoma', 'E', 'EG', 'E=G', 'GE', 'G', 'JGCA / JES guideline'],
  );
  assert.equal(siewert.entries[1]?.meaning, 'Distal esophageal adenocarcinoma');
  assert.equal(siewert.entries[2]?.meaning, 'True cardia carcinoma');
  assert.match(siewert.originalLead ?? '', /proximal end of the longitudinal gastric mucosal folds/);
  assert.match(siewert.entries[4]?.rows.find((row) => row.heading === 'Definition')?.text ?? '', /2 cm proximal/);
  assert.match(siewert.entries[4]?.rows.find((row) => row.heading === 'Scope')?.text ?? '', /Siewert Type II/);
  assert.match(siewert.note ?? '', /西分類/);
  assert.match(siewert.description, /西分類/);
  assert.equal(siewert.pubmed, SIEWERT_1998_PUBMED);
  assert.equal(siewert.organ, 'esophagus');
  assert.equal(siewert.developedInJapan, undefined);
  assert.doesNotMatch(siewert.entries.map((entry) => entry.label).join(' '), /JNET|NICE|WASP/);

  const erefs = getScoreById('erefs');
  assert.ok(erefs && isClassification(erefs));
  assert.deepEqual(
    erefs.entries.map((entry) => entry.label),
    ['Edema', 'Rings', 'Exudates', 'Furrows', 'Stricture', 'Total'],
  );
  assert.match(erefs.originalLead ?? '', /not a substitute for esophageal biopsies/);
  assert.equal(erefs.pubmed, EREFS_2013_PUBMED);

  const jsphVarices = getScoreById('jsph-varices');
  assert.ok(jsphVarices && isClassification(jsphVarices));
  assert.deepEqual(
    jsphVarices.entries.map((entry) => entry.label),
    ['F / L / C', 'Ls', 'Lm', 'Li', 'Lg', 'F0', 'F1', 'F2', 'F3', 'Cw', 'Cb', 'RC', 'RC type', 'Bleeding', 'Mucosa', 'Guideline'],
  );
  assert.equal(jsphVarices.name, '門脈圧亢進症学会分類（F / L / C）');
  assert.equal(jsphVarices.shortName, 'F / L / C');
  assert.equal(jsphVarices.entries[6]?.meaning, 'Straight, small-caliber');
  assert.equal(jsphVarices.entries[8]?.meaning, 'Nodular or tumor-shaped');
  assert.match(jsphVarices.originalLead ?? '', /straight, small-caliber varices/);
  assert.match(jsphVarices.entries[4]?.rows.find((row) => row.heading === 'Lg-c')?.text ?? '', /Sarin GOV1/);
  assert.match(jsphVarices.note ?? '', /Sarin/);
  assert.match(jsphVarices.description, /Sarin/);
  assert.match(jsphVarices.description, /門脈圧亢進症学会/);
  assert.equal(jsphVarices.pubmed, JSPH_VARICES_2010_PUBMED);
  assert.equal(jsphVarices.organ, 'esophagus');
  assert.equal(jsphVarices.developedInJapan, true);
  assert.doesNotMatch(jsphVarices.entries.map((entry) => entry.label).join(' '), /JNET|NICE|WASP|GOV1/);

  const sarin = getScoreById('sarin');
  assert.ok(sarin && isClassification(sarin));
  assert.deepEqual(
    sarin.entries.map((entry) => entry.label),
    ['GOV1', 'GOV2', 'IGV1', 'IGV2', 'Lg', 'Guideline'],
  );
  assert.equal(sarin.entries[0]?.meaning, 'Lesser-curve extension');
  assert.equal(sarin.entries[2]?.meaning, 'Isolated fundal');
  assert.match(sarin.originalLead ?? '', /along the lesser curvature/);
  assert.match(sarin.entries[4]?.rows.find((row) => row.heading === 'Lg-f')?.text ?? '', /IGV1/);
  assert.match(sarin.note ?? '', /Lg/);
  assert.match(sarin.description, /Lg-c/);
  assert.equal(sarin.pubmed, SARIN_1992_PUBMED);
  assert.equal(sarin.organ, 'stomach');
  assert.equal(sarin.developedInJapan, undefined);
  assert.doesNotMatch(sarin.entries.map((entry) => entry.label).join(' '), /JNET|NICE|F1|F2/);

  const hill = getScoreById('hill');
  assert.ok(hill && isClassification(hill));
  assert.deepEqual(
    hill.entries.map((entry) => entry.label),
    ['Grade I', 'Grade II', 'Grade III', 'Grade IV'],
  );
  assert.match(hill.originalLead ?? '', /closely apposed to the endoscope/);
  assert.equal(hill.pubmed, HILL_1996_PUBMED);
  assert.equal(hill.organ, 'stomach');

  const forrest = getScoreById('forrest');
  assert.ok(forrest && isClassification(forrest));
  assert.deepEqual(
    forrest.entries.map((entry) => entry.label),
    ['Ia', 'Ib', 'IIa', 'IIb', 'IIc', 'III'],
  );
  assert.match(forrest.originalLead ?? '', /spurting hemorrhage/);
  assert.equal(forrest.pubmed, FORREST_1974_PUBMED);
  assert.equal(forrest.organ, 'bleeding');

  const wasp = getScoreById('wasp');
  assert.ok(wasp && isClassification(wasp));
  assert.deepEqual(
    wasp.entries.map((entry) => entry.label),
    [
      'Step 1 · NICE',
      'Step 2 · SSL features',
      'Type 1 + <2 SSL features',
      'Type 1 + ≥2 SSL features',
      'Type 2 + <2 SSL features',
      'Type 2 + ≥2 SSL features',
    ],
  );
  assert.match(wasp.originalLead ?? '', /at least two SSA\/P-like features/);
  assert.doesNotMatch(wasp.entries.map((entry) => entry.label).join(' '), /2A|2B|JNET/);
  assert.equal(wasp.pubmed, WASP_2016_PUBMED);
  assert.equal(wasp.organ, 'colorectum');

  const toya = getScoreById('toya');
  assert.ok(toya && isClassification(toya));
  assert.deepEqual(
    toya.entries.map((entry) => entry.label),
    ['Monotype', 'Mixed type', 'Pinecone', 'Irregular', 'Monotonous'],
  );
  assert.equal(toya.entries[4]?.meaning, 'Regular monotype (not pinecone)');
  assert.match(toya.originalLead ?? '', /crystal violet staining/);
  assert.equal(toya.pubmed, TOYA_2020_PUBMED);
  assert.equal(toya.organ, 'duodenum');

  const vienna = getScoreById('vienna');
  assert.ok(vienna && isClassification(vienna));
  assert.deepEqual(
    vienna.entries.map((entry) => entry.label),
    ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
  );
  assert.equal(vienna.entries[2]?.meaning, 'Non-invasive low-grade neoplasia');
  assert.match(vienna.originalLead ?? '', /negative for neoplasia\/dysplasia/);
  assert.equal(vienna.pubmed, VIENNA_2000_PUBMED);
  assert.equal(vienna.organ, 'colorectum');

  assert.ok(hasAlgorithmFlow(wasp));
  assert.ok(hasAlgorithmFlow(mesda));
  assert.ok(hasAlgorithmFlow(toya));
  for (const score of [jnet, kudo, esdFibrosis, jes, kimura, paris, lst, nice, la, prague, siewert, erefs, jsphVarices, hill, sarin, forrest, vienna, sps, colorectalEc]) {
    assert.equal(hasAlgorithmFlow(score), false, score.id);
  }

  for (const score of [jnet, kudo, esdFibrosis, jes, kimura, paris, lst, nice, mesda, la, prague, siewert, erefs, jsphVarices, hill, sarin, forrest, wasp, toya, vienna, sps, colorectalEc]) {
    for (const entry of score.entries) {
      assert.ok(
        entry.rows.every((row) => row.heading !== '注'),
        `${score.id} ${entry.label} の行は原著`,
      );
    }
  }

  const apcs = getScoreById('apcs');
  assert.ok(apcs && !isClassification(apcs));
});

test('分類は原著の図を出典付きで持つ', () => {
  const jnet = getScoreById('jnet');
  assert.ok(jnet && isClassification(jnet));
  assert.equal(jnet.figures?.length, 1);
  assert.match(jnet.figures?.[0]?.source ?? '', /Sano Y/);
  assert.match(jnet.figures?.[0]?.doi ?? '', /10\.1111\/den\.12644/);
  assert.equal(jnet.figures?.[0]?.src, undefined);
  assert.match(jnet.figures?.[0]?.href ?? '', /den12644-fig-0007/);
  assert.equal(jnet.figures?.[0]?.hrefLabel, 'Fig. 7');
  assert.match(jnet.figures?.[0]?.caption ?? '', /Fig\. 7/);
  assert.equal(jnet.pubmed, '26927367');
  assert.equal(jnet.figures?.[0]?.pubmed, '26927367');
  assert.equal(jnet.figures?.[0]?.license, undefined);
  assert.match(jnet.figures?.[0]?.note ?? '', /CC ではない/);

  const kudo = getScoreById('kudo-tsuruta');
  assert.ok(kudo && isClassification(kudo));
  assert.equal(kudo.figures?.length, 1);
  assert.match(kudo.figures?.[0]?.source ?? '', /Kudo S/);
  assert.match(kudo.figures?.[0]?.doi ?? '', /10\.5946\/ce\.2024\.263/);
  assert.equal(kudo.figures?.[0]?.src, undefined);
  assert.match(kudo.figures?.[0]?.href ?? '', /f4-ce-2024-263/);
  assert.equal(kudo.figures?.[0]?.hrefLabel, 'Fig. 4');
  assert.match(kudo.figures?.[0]?.caption ?? '', /Fig\. 4/);
  assert.equal(kudo.pubmed, '8836710');
  assert.equal(kudo.figures?.[0]?.pubmed, '40336268');
  assert.equal(kudo.figures?.[0]?.license, undefined);
  assert.match(kudo.figures?.[0]?.note ?? '', /Tanaka 2004/);
  assert.match(kudo.figures?.[0]?.note ?? '', /CC ではない/);

  const colorectalEcFig = getScoreById('colorectal-ec');
  assert.ok(colorectalEcFig && isClassification(colorectalEcFig));
  assert.equal(colorectalEcFig.figures?.length, 2);
  assert.match(colorectalEcFig.figures?.[0]?.src ?? '', /ec-maeda2021-fig2/);
  assert.match(colorectalEcFig.figures?.[1]?.src ?? '', /ec-maeda2021-fig3/);
  assert.equal(colorectalEcFig.figures?.[0]?.license, 'CC BY-NC 3.0');
  assert.equal(colorectalEcFig.figures?.[0]?.pubmed, MAEDA_EC_REVIEW_2021_PUBMED);
  assert.match(colorectalEcFig.figures?.[0]?.caption ?? '', /Fig\. 2/);
  assert.match(colorectalEcFig.figures?.[1]?.caption ?? '', /Fig\. 3/);
  assert.equal(colorectalEcFig.pubmed, KUDO_EC_2011_PUBMED);

  const jes = getScoreById('jes');
  assert.ok(jes && isClassification(jes));
  assert.equal(jes.figures, undefined);
  assert.equal(jes.entries[0]?.figures?.length, 1);
  assert.equal(jes.entries[1]?.figures?.length, 1);
  assert.equal(jes.entries[2]?.figures?.length, 1);
  assert.equal(jes.entries[3]?.figures?.length, 1);
  assert.equal(jes.entries[4]?.figures?.length, 3);
  assert.match(jes.entries[0]?.figures?.[0]?.src ?? '', /fig1-type-a/);
  assert.match(jes.entries[1]?.figures?.[0]?.src ?? '', /fig2-type-b1/);
  assert.match(jes.entries[2]?.figures?.[0]?.src ?? '', /fig3-type-b2/);
  assert.match(jes.entries[3]?.figures?.[0]?.src ?? '', /fig4-type-b3/);
  assert.match(jes.entries[4]?.figures?.[0]?.src ?? '', /ava-small/);
  assert.match(jes.entries[4]?.figures?.[1]?.src ?? '', /ava-middle/);
  assert.match(jes.entries[4]?.figures?.[2]?.src ?? '', /ava-large/);
  assert.match(jes.entries[0]?.figures?.[0]?.source ?? '', /Oyama T/);
  assert.match(jes.entries[0]?.figures?.[0]?.doi ?? '', /10\.1007\/s10388-016-0527-7/);
  assert.equal(jes.pubmed, '28386209');
  assert.equal(jes.license, 'CC BY 4.0');
  assert.equal(jes.entries[0]?.figures?.[0]?.license, 'CC BY 4.0');
  assert.match(jes.entries[0]?.figures?.[0]?.note ?? '', /切り抜き/);
  assert.match(jes.entries[0]?.figures?.[0]?.note ?? '', /CC BY 4\.0/);

  const kimura = getScoreById('kimura-takemoto');
  assert.ok(kimura && isClassification(kimura));
  assert.match(kimura.figures?.[0]?.source ?? '', /Quach DT/);
  assert.match(kimura.figures?.[0]?.doi ?? '', /10\.5946\/ce\.2019\.072/);
  assert.match(kimura.figures?.[0]?.src ?? '', /kimura-takemoto-1969\.png/);
  assert.equal(kimura.pubmed, QUACH_2019_PUBMED);
  assert.equal(kimura.license, 'CC BY-NC 3.0');
  assert.equal(kimura.figures?.[0]?.pubmed, QUACH_2019_PUBMED);
  assert.equal(kimura.figures?.[0]?.license, 'CC BY-NC 3.0');
  assert.match(kimura.figures?.[0]?.note ?? '', /CC BY-NC 3\.0/);
  assert.match(kimura.figures?.[0]?.note ?? '', /白地/);
  assert.doesNotMatch(kimura.figures?.[0]?.note ?? '', /1969/);

  const paris = getScoreById('paris');
  assert.ok(paris && isClassification(paris));
  assert.equal(paris.figures?.length, 1);
  assert.match(paris.figures?.[0]?.src ?? '', /paris-ce2025-fig2/);
  assert.match(paris.figures?.[0]?.caption ?? '', /Fig\. 2/);
  assert.match(paris.figures?.[0]?.source ?? '', /Paris workshop/);
  assert.equal(paris.pubmed, PARIS_2003_PUBMED);
  assert.equal(paris.figures?.[0]?.license, 'CC BY-NC 4.0');
  assert.match(paris.figures?.[0]?.note ?? '', /CC BY-NC 4\.0/);
  assert.match(paris.figures?.[0]?.note ?? '', /CC BY-NC-ND 4\.0/);

  const spsFig = getScoreById('sps');
  assert.ok(spsFig && isClassification(spsFig));
  assert.equal(spsFig.figures?.length, 2);
  assert.equal(spsFig.figures?.[0]?.src, undefined);
  assert.match(spsFig.figures?.[0]?.href ?? '', /10\.1055\/a-2157-4125/);
  assert.equal(spsFig.figures?.[0]?.hrefLabel, 'Table 1');
  assert.equal(spsFig.figures?.[0]?.license, 'CC BY-NC-ND 4.0');
  assert.equal(spsFig.figures?.[0]?.pubmed, MCWHINNEY_2023_PUBMED);
  assert.match(spsFig.figures?.[1]?.href ?? '', /10\.1053\/j\.gastro\.2019\.11\.310/);
  assert.equal(spsFig.figures?.[1]?.pubmed, DEKKER_2020_PUBMED);

  const lst = getScoreById('lst');
  assert.ok(lst && isClassification(lst));
  assert.equal(lst.figures?.length, 1);
  assert.match(lst.figures?.[0]?.src ?? '', /lst-ce2025-fig3/);
  assert.match(lst.figures?.[0]?.caption ?? '', /Fig\. 3/);
  assert.match(lst.figures?.[0]?.source ?? '', /Kudo S/);
  assert.equal(lst.pubmed, LST_2008_PUBMED);
  assert.equal(lst.figures?.[0]?.license, 'CC BY-NC 4.0');
  assert.match(lst.figures?.[0]?.note ?? '', /CC BY-NC 4\.0/);

  const appendicealOrificeFig = getScoreById('appendiceal-orifice');
  assert.ok(appendicealOrificeFig && isClassification(appendicealOrificeFig));
  assert.equal(appendicealOrificeFig.figures?.length, 1);
  assert.match(appendicealOrificeFig.figures?.[0]?.src ?? '', /oung2020-fig2/);
  assert.match(appendicealOrificeFig.figures?.[0]?.caption ?? '', /Fig\. 2/);
  assert.match(appendicealOrificeFig.figures?.[0]?.source ?? '', /Oung B/);
  assert.equal(appendicealOrificeFig.figures?.[0]?.license, 'CC BY-NC-ND 4.0');
  assert.match(appendicealOrificeFig.figures?.[0]?.note ?? '', /CC BY-NC-ND 4\.0/);
  assert.match(appendicealOrificeFig.figures?.[0]?.note ?? '', /Type 0/);

  const nice = getScoreById('nice');
  assert.ok(nice && isClassification(nice));
  assert.equal(nice.figures?.length, 1);
  assert.equal(nice.figures?.[0]?.src, undefined);
  assert.match(nice.figures?.[0]?.href ?? '', /S0016510713018531-gr1_lrg\.jpg/);
  assert.equal(nice.figures?.[0]?.hrefLabel, 'Fig. 1');
  assert.match(nice.figures?.[0]?.caption ?? '', /Fig\. 1/);
  assert.match(nice.figures?.[0]?.source ?? '', /Hayashi N/);
  assert.equal(nice.pubmed, NICE_2013_PUBMED);
  assert.equal(nice.figures?.[0]?.pubmed, NICE_2013_PUBMED);
  assert.equal(nice.figures?.[0]?.license, undefined);
  assert.match(nice.figures?.[0]?.note ?? '', /CC ではない/);

  const esdFibrosisFig = getScoreById('esd-fibrosis');
  assert.ok(esdFibrosisFig && isClassification(esdFibrosisFig));
  assert.equal(esdFibrosisFig.figures?.length, 1);
  assert.equal(esdFibrosisFig.figures?.[0]?.src, undefined);
  assert.match(esdFibrosisFig.figures?.[0]?.href ?? '', /irjournal\.org/);
  assert.equal(esdFibrosisFig.figures?.[0]?.hrefLabel, 'Fig. 1');
  assert.match(esdFibrosisFig.figures?.[0]?.caption ?? '', /Fig\. 1/);
  assert.match(esdFibrosisFig.figures?.[0]?.source ?? '', /Matsumoto A/);
  assert.equal(esdFibrosisFig.pubmed, ESD_FIBROSIS_2010_PUBMED);
  assert.equal(esdFibrosisFig.figures?.[0]?.pubmed, ESD_FIBROSIS_2016_PUBMED);
  assert.equal(esdFibrosisFig.figures?.[0]?.license, undefined);
  assert.match(esdFibrosisFig.figures?.[0]?.note ?? '', /CC ではない/);

  const mesda = getScoreById('mesda-g');
  assert.ok(mesda && isClassification(mesda));
  assert.equal(mesda.figures?.length, 2);
  assert.equal(mesda.figures?.[0]?.src, undefined);
  assert.match(mesda.figures?.[0]?.href ?? '', /den12638-fig-0001/);
  assert.equal(mesda.figures?.[0]?.hrefLabel, 'Fig. 1');
  assert.match(mesda.figures?.[0]?.caption ?? '', /Fig\. 1/);
  assert.match(mesda.figures?.[0]?.source ?? '', /Muto M/);
  assert.match(mesda.figures?.[0]?.note ?? '', /埋め込まず/);
  assert.match(mesda.figures?.[1]?.src ?? '', /mesda-g-muto2016-fig13/);
  assert.match(mesda.figures?.[1]?.caption ?? '', /Fig\. 13/);
  assert.equal(mesda.pubmed, MESDA_G_2016_PUBMED);
  assert.equal(mesda.figures?.[0]?.pubmed, MESDA_G_2016_PUBMED);
  assert.equal(mesda.figures?.[1]?.pubmed, MESDA_G_2016_PUBMED);
  assert.equal(mesda.license, 'CC BY-NC-ND 4.0');
  assert.equal(mesda.figures?.[0]?.license, 'CC BY-NC-ND 4.0');
  assert.equal(mesda.figures?.[1]?.license, 'CC BY-NC-ND 4.0');
  assert.match(mesda.figures?.[0]?.note ?? '', /CC BY-NC-ND 4\.0/);

  const erefsFig = getScoreById('erefs');
  assert.ok(erefsFig && isClassification(erefsFig));
  assert.equal(erefsFig.figures?.length, 1);
  assert.match(erefsFig.figures?.[0]?.src ?? '', /erefs-abe2022-fig2/);
  assert.match(erefsFig.figures?.[0]?.source ?? '', /Abe Y/);
  assert.equal(erefsFig.figures?.[0]?.license, 'CC BY 4.0');
  assert.match(erefsFig.figures?.[0]?.note ?? '', /CC BY 4\.0/);
  assert.equal(erefsFig.pubmed, EREFS_2013_PUBMED);

  const hillFig = getScoreById('hill');
  assert.ok(hillFig && isClassification(hillFig));
  assert.match(hillFig.figures?.[0]?.src ?? '', /hill-ge2023-fig1/);
  assert.match(hillFig.figures?.[0]?.source ?? '', /Hill LD/);
  assert.equal(hillFig.figures?.[0]?.license, 'CC BY-NC 4.0');
  assert.equal(hillFig.pubmed, HILL_1996_PUBMED);

  const forrestFig = getScoreById('forrest');
  assert.ok(forrestFig && isClassification(forrestFig));
  assert.match(forrestFig.figures?.[0]?.src ?? '', /forrest-jsmu2025-fig1/);
  assert.match(forrestFig.figures?.[0]?.source ?? '', /Forrest JA/);
  assert.equal(forrestFig.figures?.[0]?.license, 'CC BY-NC-ND 4.0');
  assert.equal(forrestFig.pubmed, FORREST_1974_PUBMED);

  const jsphFig = getScoreById('jsph-varices');
  assert.ok(jsphFig && isClassification(jsphFig));
  assert.equal(jsphFig.figures?.length, 4);
  assert.match(jsphFig.figures?.[0]?.src ?? '', /varices-popescu2023-fig1/);
  assert.match(jsphFig.figures?.[0]?.caption ?? '', /F1 \(a\), F2 \(b\), F3 \(c\)/);
  assert.equal(jsphFig.figures?.[0]?.license, 'CC BY 4.0');
  assert.equal(jsphFig.figures?.[0]?.pubmed, PALL_2023_PUBMED);
  assert.match(jsphFig.figures?.[1]?.src ?? '', /varices-kjhugr2024-fig1/);
  assert.match(jsphFig.figures?.[1]?.caption ?? '', /RC0–RC3/);
  assert.equal(jsphFig.figures?.[1]?.license, 'CC BY-NC 4.0');
  assert.equal(jsphFig.figures?.[1]?.pubmed, KJ_HUGR_2024_PUBMED);
  assert.match(jsphFig.figures?.[2]?.src ?? '', /varices-nagashima2022-fig2/);
  assert.match(jsphFig.figures?.[2]?.caption ?? '', /Fig\. 2/);
  assert.equal(jsphFig.figures?.[2]?.license, 'CC BY 4.0');
  assert.equal(jsphFig.figures?.[2]?.pubmed, NAGASHIMA_2022_PUBMED);
  assert.equal(jsphFig.figures?.[3]?.src, undefined);
  assert.match(jsphFig.figures?.[3]?.href ?? '', /10\.1111\/j\.1443-1661\.2009\.00929\.x/);
  assert.equal(jsphFig.figures?.[3]?.hrefLabel, 'Dig Endosc 2010');
  assert.match(jsphFig.figures?.[3]?.note ?? '', /CC ではない/);
  assert.equal(jsphFig.pubmed, JSPH_VARICES_2010_PUBMED);
  assert.match(jsphFig.officialUrl ?? '', /jsge\.or\.jp\/committees\/guideline\/guideline\/lc\.html/);

  const sarinFig = getScoreById('sarin');
  assert.ok(sarinFig && isClassification(sarinFig));
  assert.equal(sarinFig.figures?.length, 1);
  assert.equal(sarinFig.figures?.[0]?.src, undefined);
  assert.match(sarinFig.figures?.[0]?.href ?? '', /10\.1002\/hep\.1840160607/);
  assert.equal(sarinFig.figures?.[0]?.hrefLabel, '1992 paper');
  assert.match(sarinFig.figures?.[0]?.note ?? '', /CC ではない/);
  assert.equal(sarinFig.pubmed, SARIN_1992_PUBMED);
  assert.match(sarinFig.officialUrl ?? '', /jsge\.or\.jp\/committees\/guideline\/guideline\/lc\.html/);

  const pragueFig = getScoreById('prague');
  assert.ok(pragueFig && isClassification(pragueFig));
  assert.equal(pragueFig.figures?.[0]?.src, undefined);
  assert.match(pragueFig.figures?.[0]?.href ?? '', /S0016508506017914-gr3\.jpg/);
  assert.equal(pragueFig.figures?.[0]?.hrefLabel, 'Fig. 3');
  assert.equal(pragueFig.figures?.[0]?.license, undefined);
  assert.match(pragueFig.figures?.[0]?.note ?? '', /CC ではない/);
  assert.equal(pragueFig.pubmed, PRAGUE_2006_PUBMED);

  const siewertFig = getScoreById('siewert');
  assert.ok(siewertFig && isClassification(siewertFig));
  assert.equal(siewertFig.figures?.length, 4);
  assert.match(siewertFig.figures?.[0]?.src ?? '', /siewert-jce2017-fig2-6/);
  assert.match(siewertFig.figures?.[0]?.caption ?? '', /Fig\. 2-6/);
  assert.equal(siewertFig.figures?.[0]?.license, 'CC BY 4.0');
  assert.match(siewertFig.figures?.[1]?.src ?? '', /siewert-jce2017-fig2-5/);
  assert.match(siewertFig.figures?.[2]?.src ?? '', /siewert-jce2017-fig2-7/);
  assert.equal(siewertFig.figures?.[3]?.src, undefined);
  assert.match(siewertFig.figures?.[3]?.href ?? '', /10\.1046\/j\.1365-2168\.1998\.00940\.x/);
  assert.equal(siewertFig.figures?.[3]?.hrefLabel, '1998 paper');
  assert.match(siewertFig.figures?.[3]?.note ?? '', /CC ではない/);
  assert.equal(siewertFig.pubmed, SIEWERT_1998_PUBMED);
  assert.equal(siewertFig.figures?.[0]?.pubmed, JCE_11_PART2_PUBMED);
  assert.match(siewertFig.officialUrl ?? '', /jgca\.jp\/guideline\/sixth/);

  const laFig = getScoreById('la');
  assert.ok(laFig && isClassification(laFig));
  assert.equal(laFig.figures?.[0]?.src, undefined);
  assert.match(laFig.figures?.[0]?.href ?? '', /S2212-0971\(13\)70046-3/);
  assert.equal(laFig.figures?.[0]?.license, undefined);
  assert.match(laFig.figures?.[0]?.note ?? '', /CC ではない/);
  assert.equal(laFig.pubmed, LA_1999_PUBMED);

  const waspFig = getScoreById('wasp');
  assert.ok(waspFig && isClassification(waspFig));
  assert.equal(waspFig.figures?.[0]?.src, undefined);
  assert.match(waspFig.figures?.[0]?.href ?? '', /65\/6\/963#F1/);
  assert.equal(waspFig.figures?.[0]?.hrefLabel, 'Fig. 1');
  assert.equal(waspFig.figures?.[0]?.license, undefined);
  assert.match(waspFig.figures?.[0]?.note ?? '', /CC ではない/);
  assert.equal(waspFig.pubmed, WASP_2016_PUBMED);

  const toyaFig = getScoreById('toya');
  assert.ok(toyaFig && isClassification(toyaFig));
  assert.equal(toyaFig.figures?.length, 2);
  assert.equal(toyaFig.figures?.[0]?.src, undefined);
  assert.match(toyaFig.figures?.[0]?.href ?? '', /den\.13640/);
  assert.equal(toyaFig.figures?.[0]?.hrefLabel, 'Toya 2020');
  assert.equal(toyaFig.figures?.[0]?.pubmed, TOYA_2020_PUBMED);
  assert.equal(toyaFig.figures?.[0]?.license, undefined);
  assert.match(toyaFig.figures?.[0]?.note ?? '', /CC ではない/);
  assert.equal(toyaFig.figures?.[1]?.src, undefined);
  assert.match(toyaFig.figures?.[1]?.href ?? '', /den\.12282/);
  assert.equal(toyaFig.figures?.[1]?.hrefLabel, 'Kikuchi 2014');
  assert.equal(toyaFig.figures?.[1]?.pubmed, KIKUCHI_2014_PUBMED);

  const viennaFig = getScoreById('vienna');
  assert.ok(viennaFig && isClassification(viennaFig));
  assert.equal(viennaFig.figures?.[0]?.src, undefined);
  assert.match(viennaFig.figures?.[0]?.href ?? '', /gut\.bmj\.com\/content\/47\/2\/251/);
  assert.equal(viennaFig.figures?.[0]?.hrefLabel, '2000 paper');
  assert.equal(viennaFig.figures?.[0]?.pubmed, VIENNA_2000_PUBMED);
  assert.equal(viennaFig.figures?.[0]?.license, undefined);
  assert.match(viennaFig.figures?.[0]?.note ?? '', /CC ではない/);

  const spigelman = getScoreById('spigelman');
  assert.ok(spigelman);
  assert.equal(spigelman.pubmed, SPIGELMAN_1989_PUBMED);
  assert.equal(spigelman.figures?.[0]?.src, undefined);
  assert.match(spigelman.figures?.[0]?.href ?? '', /fap\.T\.spigelman/);
  assert.equal(spigelman.figures?.[0]?.hrefLabel, 'Table 5');

  const modified = getScoreById('modified-spigelman');
  assert.ok(modified);
  assert.equal(modified.pubmed, SAURIN_2004_PUBMED);
  assert.equal(modified.figures?.[0]?.src, undefined);

  const ishii = getScoreById('ishii');
  assert.ok(ishii);
  assert.equal(ishii.pubmed, ISHII_2021_PUBMED);
  assert.equal(ishii.figures?.[0]?.src, undefined);

  const kakushima = getScoreById('kakushima');
  assert.ok(kakushima);
  assert.equal(kakushima.pubmed, KAKUSHIMA_2017_PUBMED);
  assert.equal(kakushima.license, 'CC BY-NC-ND 4.0');
  assert.equal(kakushima.figures?.[0]?.src, undefined);
  assert.match(kakushima.figures?.[0]?.href ?? '', /table-2/);
  assert.equal(kakushima.figures?.[0]?.hrefLabel, 'Table 2');
  assert.equal(kakushima.figures?.[0]?.license, 'CC BY-NC-ND 4.0');

  const bestJ = getScoreById('best-j');
  assert.ok(bestJ);
  assert.equal(bestJ.license, 'CC BY-NC 4.0');

  const aronchick = getScoreById('aronchick');
  assert.ok(aronchick);
  assert.equal(aronchick.license, 'CC BY-NC-ND 4.0');
});

test('分類は日本語モードでも英語原著なら定義文を英語で表示する', () => {
  const japanese = /[\u3040-\u30ff\u4e00-\u9faf]/;
  const nice = getScoreById('nice');
  assert.ok(nice && isClassification(nice));
  const jaNice = localizeScore(nice, 'ja');
  assert.equal(jaNice.name, nice.name);
  assert.equal(jaNice.description, SCORE_EN.nice.description);
  assert.doesNotMatch(jaNice.description, japanese);
  const type1 = jaNice.entries.find((entry) => entry.label === 'Type 1');
  assert.match(type1?.comment ?? '', japanese);

  const kimura = getScoreById('kimura-takemoto');
  assert.ok(kimura && isClassification(kimura));
  assert.equal(classificationOriginalLocale(kimura), 'ja');
  const jaKimura = localizeScore(kimura, 'ja');
  assert.match(jaKimura.description, japanese);

  const jsph = getScoreById('jsph-varices');
  assert.ok(jsph && isClassification(jsph));
  assert.equal(classificationOriginalLocale(jsph), 'ja');
  assert.match(localizeScore(jsph, 'ja').description, japanese);
});

test('英語コピーが全スコアの表示項目を覆う', () => {
  const japanese = /[\u3040-\u30ff\u4e00-\u9faf]/;
  for (const score of SCORES) {
    const copy = SCORE_EN[score.id];
    assert.ok(copy, score.id);
    const english = localizeScore(score, 'en');
    assert.equal(english.name, copy.name);
    assert.equal(english.categoryLabel, UI.en.category[score.category]);
    assert.equal(localizeScore(score, 'ja').name, score.name);
    assert.doesNotMatch(english.name, japanese);
    assert.doesNotMatch(english.description, japanese);

    if (isClassification(score) && isClassification(english)) {
      if (classificationOriginalLocale(score) !== 'ja') {
        const jaLocalized = localizeScore(score, 'ja');
        assert.equal(jaLocalized.description, copy.description, score.id);
      }
      for (const entry of score.entries) {
        if (entry.group) {
          assert.ok(copy.groups?.[entry.group], `${score.id} group ${entry.group}`);
        }
        if (entry.comment) {
          assert.ok(copy.comments?.[entry.label], `${score.id} comment ${entry.label}`);
        }
        if (entry.figures?.length) {
          assert.equal(
            copy.entryFigureNotes?.[entry.label]?.length,
            entry.figures.length,
            `${score.id} entry figures ${entry.label}`,
          );
        }
      }
      for (const entry of english.entries) {
        if (entry.group) assert.doesNotMatch(entry.group, japanese);
        if (entry.comment) assert.doesNotMatch(entry.comment, japanese);
        if (entry.meaning) assert.doesNotMatch(entry.meaning, japanese);
        for (const figure of entry.figures ?? []) {
          assert.doesNotMatch(figure.note, japanese, `${score.id} ${entry.label} figure`);
        }
      }
      if (hasAlgorithmFlow(score)) {
        assert.ok(copy.flow, `${score.id} flow copy`);
        assert.ok(hasAlgorithmFlow(english));
        assert.doesNotMatch(english.flow.title, japanese);
        for (const step of Object.values(english.flow.steps)) {
          assert.doesNotMatch(step.prompt, japanese, step.prompt);
          if (step.hint) assert.doesNotMatch(step.hint, japanese, step.hint);
          for (const option of step.options) {
            assert.doesNotMatch(option.label, japanese, option.label);
          }
        }
        const mapNodes = [english.flow.map];
        while (mapNodes.length) {
          const node = mapNodes.pop()!;
          assert.ok(copy.flow?.map[node.id], `${score.id} map ${node.id}`);
          assert.doesNotMatch(node.label, japanese, node.label);
          mapNodes.push(...(node.children ?? []));
        }
      } else if (isClassification(score)) {
        assert.equal(score.flow, undefined, score.id);
      }
    }

    for (const note of english.figures?.map((figure) => figure.note) ?? []) {
      assert.doesNotMatch(note, japanese);
    }

    if (!isClassification(score) && !isClassification(english)) {
      assert.ok(copy.fields);
      for (const field of score.fields) {
        const fieldCopy = copy.fields?.[field.id];
        assert.ok(fieldCopy, `${score.id}.${field.id}`);
        assert.equal(fieldCopy.options.length, field.options.length, `${score.id}.${field.id} options`);
      }
      for (const field of english.fields) {
        assert.doesNotMatch(field.label, japanese, field.label);
        if (field.description) assert.doesNotMatch(field.description, japanese, field.description);
        for (const option of field.options) {
          assert.doesNotMatch(option.label, japanese, option.label);
          if (option.description) assert.doesNotMatch(option.description, japanese, option.description);
        }
      }
    }
  }
});

test('英語結果は解釈だけ訳し、点数は変えない', () => {
  const japanese = computeBestJ({
    warfarin: 0,
    doac: 0,
    p2y12: 0,
    aspirin: 0,
    cilostazol: 0,
    dialysis: 0,
    tumorSize: 0,
    lowerThird: 0,
    multiple: 0,
  });
  const english = localizeResult(japanese, 'en');
  assert.equal(english.total, japanese.total);
  assert.equal(english.severity, japanese.severity);
  assert.equal(english.interpretation, 'Low risk');
  assert.deepEqual(english.details, ['Delayed post-ESD bleeding rate 2.8%']);
  assert.equal(localizeResult(japanese, 'ja').interpretation, '低リスク');

  const bbps = localizeResult(computeBbps({ right: 2, transverse: 2, left: 2 }), 'en');
  assert.equal(bbps.interpretation, 'Adequate');
  assert.match(bbps.details?.[0] ?? '', /Right \(cecum\/ascending\) 2/);

  const sekiguchi = localizeResult(
    computeSekiguchi({ size: 0, depth: 0, histology: 0, ulcer: 0, lvi: 0 }),
    'en',
  );
  assert.match(sekiguchi.details?.[0] ?? '', /derivation cohort/);

  const ecura = localizeResult(computeEcura({ ly: 0, size: 0, vm: 0, v: 0, sm: 0 }), 'en');
  assert.equal(ecura.interpretation, 'Low risk');
  assert.match(ecura.details?.[0] ?? '', /LNM rate at this score 1\.6%/);
  assert.doesNotMatch(ecura.details?.join(' ') ?? '', /[\u3040-\u30ff\u4e00-\u9faf]/);

  const curabilityEn = localizeResult(
    computeGastricEsdCurability({
      enBloc: 0,
      histology: 0,
      size: 0,
      depth: 0,
      ul: 0,
      hm: 0,
      vm: 0,
      ly: 0,
      v: 0,
      undiffSize: 0,
      undiffInSm: 0,
    }),
    'en',
  );
  assert.equal(curabilityEn.interpretation, 'eCuraA (curative resection)');
  assert.doesNotMatch(curabilityEn.details?.join(' ') ?? '', /[\u3040-\u30ff\u4e00-\u9faf]/);

  const esophCurabilityEn = localizeResult(
    computeEsophagusEsdCurability({ depth: 0, vascular: 0, margin: 0, enBloc: 0 }),
    'en',
  );
  assert.equal(esophCurabilityEn.interpretation, 'Curative resection');
  assert.doesNotMatch(esophCurabilityEn.details?.join(' ') ?? '', /[\u3040-\u30ff\u4e00-\u9faf]/);

  const coloCurabilityEn = localizeResult(
    computeColorectalEsdCurability({
      depth: 1,
      vm: 0,
      enBloc: 0,
      histology: 0,
      smDepth: 0,
      lyv: 0,
      budding: 0,
    }),
    'en',
  );
  assert.equal(coloCurabilityEn.interpretation, 'Endoscopic curative resection (pT1 SM)');
  assert.doesNotMatch(coloCurabilityEn.details?.join(' ') ?? '', /[\u3040-\u30ff\u4e00-\u9faf]/);

  const japaneseChars = /[\u3040-\u30ff\u4e00-\u9faf]/;
  const spigelmanEn = localizeResult(
    computeSpigelman({ number: 3, size: 3, histology: 3, dysplasia: 3 }),
    'en',
  );
  assert.equal(spigelmanEn.interpretation, 'Stage IV');
  assert.match(spigelmanEn.details?.[1] ?? '', /every 6–12 months/);
  assert.doesNotMatch(spigelmanEn.details?.join(' ') ?? '', japaneseChars);

  const ishiiEn = localizeResult(computeIshii({ color: 1, size: 2, surface: 1, vessels: 1 }), 'en');
  assert.equal(ishiiEn.interpretation, 'Suggests VCL C4/5 (HGA / cancer)');
  assert.doesNotMatch(ishiiEn.details?.join(' ') ?? '', japaneseChars);

  const kakushimaEn = localizeResult(
    computeKakushima({ diameter: 0, color: 0, macro: 0, nodularity: 0 }),
    'en',
  );
  assert.equal(kakushimaEn.interpretation, 'Suggests VCL 3 (LGA)');
  assert.doesNotMatch(kakushimaEn.details?.join(' ') ?? '', japaneseChars);
});

test('既定言語は英語で、計算は最低点から始まる', () => {
  assert.equal(DEFAULT_LOCALE, 'en');

  const ecura = getScoreById('ecura-hatta');
  assert.ok(ecura && !isClassification(ecura));
  assert.deepEqual(lowestFieldValues(ecura.fields), { ly: 0, size: 0, vm: 0, v: 0, sm: 0 });

  const aronchick = getScoreById('aronchick');
  assert.ok(aronchick && !isClassification(aronchick));
  assert.deepEqual(lowestFieldValues(aronchick.fields), { grade: 1 });

  const apcs = getScoreById('apcs');
  assert.ok(apcs && !isClassification(apcs));
  assert.deepEqual(lowestFieldValues(apcs.fields), { age: 0, sex: 0, family: 0, smoking: 0 });
  assert.equal(apcs.compute(lowestFieldValues(apcs.fields)).interpretation, '平均リスク（AR）');

  const spigelman = getScoreById('spigelman');
  assert.ok(spigelman && !isClassification(spigelman));
  assert.deepEqual(lowestFieldValues(spigelman.fields), {
    number: 0,
    size: 0,
    histology: 0,
    dysplasia: 0,
  });
  assert.equal(spigelman.compute(lowestFieldValues(spigelman.fields)).interpretation, 'Stage 0');

  const ishii = getScoreById('ishii');
  assert.ok(ishii && !isClassification(ishii));
  assert.deepEqual(lowestFieldValues(ishii.fields), { color: 0, size: 0, surface: 0, vessels: 0 });

  const kakushima = getScoreById('kakushima');
  assert.ok(kakushima && !isClassification(kakushima));
  assert.deepEqual(lowestFieldValues(kakushima.fields), {
    diameter: 0,
    color: 0,
    macro: 0,
    nodularity: 0,
  });
});

test('WASP / MESDA-G / Toya のフローは選択すると診断まで進む', () => {
  const wasp = getScoreById('wasp');
  const mesda = getScoreById('mesda-g');
  const toya = getScoreById('toya');
  assert.ok(hasAlgorithmFlow(wasp));
  assert.ok(hasAlgorithmFlow(mesda));
  assert.ok(hasAlgorithmFlow(toya));

  const waspHp = walkAlgorithmFlow(wasp.flow, { nice: 'type1', ssl1: 'lt2' });
  assert.equal(waspHp.result?.entryLabel, 'Type 1 + <2 SSL features');
  assert.equal(findEntryForResult(wasp.entries, waspHp.result)?.meaning, 'Hyperplastic polyp');

  const waspSsap = walkAlgorithmFlow(wasp.flow, { nice: 'type1', ssl1: 'gte2' });
  assert.equal(waspSsap.result?.entryLabel, 'Type 1 + ≥2 SSL features');
  assert.equal(findEntryForResult(wasp.entries, waspSsap.result)?.meaning, 'SSA/P');

  const waspAdenoma = walkAlgorithmFlow(wasp.flow, { nice: 'type2', ssl2: 'lt2' });
  assert.equal(waspAdenoma.result?.entryLabel, 'Type 2 + <2 SSL features');
  assert.equal(findEntryForResult(wasp.entries, waspAdenoma.result)?.meaning, 'Adenoma');

  const waspSsap2 = walkAlgorithmFlow(wasp.flow, { nice: 'type2', ssl2: 'gte2' });
  assert.equal(findEntryForResult(wasp.entries, waspSsap2.result)?.meaning, 'SSA/P');

  const afterNice = walkAlgorithmFlow(wasp.flow, { nice: 'type1' });
  assert.equal(afterNice.currentStep?.id, 'ssl1');
  assert.equal(afterNice.result, null);

  const switched = applyAlgorithmAnswer(wasp.flow, { nice: 'type1', ssl1: 'lt2' }, 'nice', 'type2');
  assert.deepEqual(switched, { nice: 'type2' });
  assert.equal(walkAlgorithmFlow(wasp.flow, switched).currentStep?.id, 'ssl2');

  const mesdaNoncancer = walkAlgorithmFlow(mesda.flow, { dl: 'absent' });
  assert.equal(findEntryForResult(mesda.entries, mesdaNoncancer.result)?.meaning, 'Non-cancer');
  assert.equal(mesdaNoncancer.currentStep, null);

  const afterDl = walkAlgorithmFlow(mesda.flow, { dl: 'present' });
  assert.equal(afterDl.currentStep?.id, 'mvms');
  assert.equal(afterDl.result, null);

  const mesdaEgc = walkAlgorithmFlow(mesda.flow, { dl: 'present', mvms: 'irregular' });
  assert.equal(findEntryForResult(mesda.entries, mesdaEgc.result)?.meaning, 'EGC');

  const mesdaRegular = walkAlgorithmFlow(mesda.flow, { dl: 'present', mvms: 'regular' });
  assert.equal(findEntryForResult(mesda.entries, mesdaRegular.result)?.meaning, 'Non-cancer');

  const dropped = applyAlgorithmAnswer(mesda.flow, { dl: 'present', mvms: 'irregular' }, 'dl', 'absent');
  assert.deepEqual(dropped, { dl: 'absent' });

  const mapJapanese = /[\u3040-\u30ff\u4e00-\u9faf]/;
  const mapLabels = (node: { label: string; children?: unknown[] }): string[] => [
    node.label,
    ...(node.children ?? []).flatMap((child) => mapLabels(child as { label: string; children?: unknown[] })),
  ];
  for (const label of [
    ...mapLabels(wasp.flow.map),
    ...mapLabels(mesda.flow.map),
    ...mapLabels(toya.flow.map),
  ]) {
    assert.doesNotMatch(label, mapJapanese, label);
  }
  assert.equal(wasp.flow.map.label, 'Polyp <10 mm');
  assert.ok(mapLabels(wasp.flow.map).includes('SSA/P-like features'));
  assert.ok(mapLabels(wasp.flow.map).includes('Hyperplastic polyp'));
  assert.equal(mesda.flow.map.label, 'Suspicious lesion');
  assert.ok(mapLabels(mesda.flow.map).includes('IMVP and/or IMSP'));
  assert.ok(mapLabels(mesda.flow.map).includes('EGC'));

  const englishWasp = localizeScore(wasp, 'en');
  assert.ok(hasAlgorithmFlow(englishWasp));
  assert.equal(englishWasp.flow.steps.nice.prompt, 'Is this NICE Type 1 or Type 2?');
  assert.equal(englishWasp.flow.map.label, 'Polyp <10 mm');
  const englishMesda = localizeScore(mesda, 'en');
  assert.ok(hasAlgorithmFlow(englishMesda));
  assert.equal(englishMesda.flow.steps.dl.options[0]?.label, 'Absent');
  assert.equal(englishMesda.flow.map.label, 'Suspicious lesion');
  assert.equal(englishMesda.figures?.[0]?.src, undefined);
  assert.match(englishMesda.figures?.[0]?.note ?? '', /not hosted/);

  const toyaMixed = walkAlgorithmFlow(toya.flow, { type: 'mixed' });
  assert.equal(findEntryForResult(toya.entries, toyaMixed.result)?.meaning, 'Multiple surface patterns');
  assert.equal(toyaMixed.currentStep, null);

  const afterMono = walkAlgorithmFlow(toya.flow, { type: 'mono' });
  assert.equal(afterMono.currentStep?.id, 'pattern');
  assert.equal(afterMono.result, null);

  const toyaPine = walkAlgorithmFlow(toya.flow, { type: 'mono', pattern: 'pinecone' });
  assert.equal(findEntryForResult(toya.entries, toyaPine.result)?.label, 'Pinecone');

  const toyaC3 = walkAlgorithmFlow(toya.flow, { type: 'mono', pattern: 'monotonous' });
  assert.equal(findEntryForResult(toya.entries, toyaC3.result)?.meaning, 'Regular monotype (not pinecone)');

  const englishToya = localizeScore(toya, 'en');
  assert.ok(hasAlgorithmFlow(englishToya));
  assert.equal(englishToya.flow.steps.type.prompt, 'Is the surface pattern single or multiple?');
  assert.equal(englishToya.flow.map.label, 'SNADET · ME-CV');
  assert.equal(englishToya.figures?.[0]?.src, undefined);
  assert.match(englishToya.figures?.[0]?.note ?? '', /not CC/);
});

test('PWA 更新はユーザー操作まで waiting のままにする', () => {
  const workbox = require('../workbox-config.js') as { skipWaiting: boolean; clientsClaim: boolean };
  assert.equal(workbox.skipWaiting, false);
  assert.equal(workbox.clientsClaim, true);
});

test('PWA 更新バナーの文言と検知', () => {
  const japanese = /[\u3040-\u30ff\u4e00-\u9faf]/;
  assert.equal(UI.ja.pwa.updateAvailable, '新しい版があります');
  assert.equal(UI.ja.pwa.reload, '再読み込み');
  assert.equal(UI.ja.pwa.later, '後で');
  assert.match(UI.ja.about.pwaUpdate, /再読み込み/);
  assert.equal(UI.en.pwa.updateAvailable, 'A new version is available');
  assert.equal(UI.en.pwa.reload, 'Reload');
  assert.equal(UI.en.pwa.later, 'Later');
  assert.match(UI.en.about.pwaUpdate, /Reload/);
  assert.doesNotMatch(UI.en.pwa.updateAvailable, japanese);
  assert.doesNotMatch(UI.en.pwa.reload, japanese);
  assert.doesNotMatch(UI.en.pwa.later, japanese);
  assert.doesNotMatch(UI.en.about.pwaUpdate, japanese);

  assert.equal(isPwaUpdateAvailable({ hasController: false, waiting: true }), false);
  assert.equal(isPwaUpdateAvailable({ hasController: true, waiting: true }), true);
  assert.equal(isPwaUpdateAvailable({ hasController: true, waiting: false, installingState: 'installing' }), false);
  assert.equal(isPwaUpdateAvailable({ hasController: true, waiting: false, installingState: 'installed' }), true);
  assert.equal(shouldOfferUpdateAfterControllerChange(false), false);
  assert.equal(shouldOfferUpdateAfterControllerChange(true), true);
});

test('About は CC と非 CC を分けて書く', () => {
  assert.match(UI.ja.about.citationsCcBody, /CC BY-NC-ND 4\.0/);
  assert.match(UI.ja.about.citationsCcBody, /CC BY 4\.0/);
  assert.match(UI.ja.about.citationsCcBody, /Abe 2022/);
  assert.match(UI.ja.about.citationsCcBody, /Nagashima 2022/);
  assert.match(UI.ja.about.citationsCcBody, /Ge 2023/);
  assert.match(UI.ja.about.esophagusBody, /門脈圧亢進症学会/);
  assert.match(UI.ja.about.esophagusBody, /F \/ L \/ C/);
  assert.match(UI.ja.about.stomachBody, /Sarin/);
  assert.match(UI.en.about.esophagusBody, /varices/);
  assert.match(UI.en.about.esophagusBody, /JSPH/);
  assert.match(UI.en.about.stomachBody, /Sarin/);
  assert.match(UI.ja.about.citationsNotCcBody, /Tajiri 2010/);
  assert.match(UI.ja.about.citationsNotCcBody, /Sarin 1992/);
  assert.match(UI.ja.about.citationsNotCcBody, /JNET/);
  assert.match(UI.ja.about.citationsNotCcBody, /NICE/);
  assert.match(UI.ja.about.citationsNotCcBody, /WASP/);
  assert.match(UI.ja.about.citationsNotCcBody, /Prague/);
  assert.match(UI.ja.about.citationsNotCcBody, /Kajiwara/);
  assert.match(UI.ja.about.citationsNotCcBody, /埋め込まず/);
  assert.match(UI.ja.about.esophagusBody, /Siewert/);
  assert.match(UI.ja.about.esophagusBody, /西分類/);
  assert.match(UI.en.about.esophagusBody, /Siewert/);
  assert.match(UI.ja.about.citationsCcBody, /西分類/);
  assert.match(UI.ja.about.citationsNotCcBody, /Siewert 1998/);
  assert.match(UI.ja.about.citationsCcBody, /Quach 2019/);
  assert.match(UI.ja.about.citationsCcBody, /Fig\. 13/);
  assert.match(UI.ja.about.citationsCcBody, /埋め込まず/);
  assert.doesNotMatch(UI.ja.about.citationsNotCcBody, /1969/);
  assert.match(UI.en.about.citationsCcBody, /CC BY-NC-ND 4\.0/);
  assert.match(UI.en.about.citationsCcBody, /Fig\. 13/);
  assert.match(UI.en.about.citationsNotCcBody, /not CC/);
  assert.match(UI.en.about.citationsNotCcBody, /not hosted/);
  assert.doesNotMatch(UI.en.about.citationsNotCcBody, /1969/);
  assert.match(UI.ja.about.citationsCcBody, /Kakushima/);
  assert.match(UI.ja.about.citationsNotCcBody, /Spigelman/);
  assert.match(UI.ja.about.citationsNotCcBody, /Vienna/);
  assert.match(UI.en.about.duodenumBody, /Spigelman/);
  assert.match(UI.en.about.colorectumBody, /Vienna/);
  assert.match(UI.en.about.colorectumBody, /SPS/);
  assert.match(UI.en.about.colorectumBody, /EC/);
  assert.match(UI.en.about.colorectumBody, /ESD-F/);
  assert.match(UI.ja.about.colorectumBody, /ESD-F/);
  assert.match(UI.ja.about.citationsNotCcBody, /ESD-F/);
  assert.match(UI.ja.about.citationsNotCcBody, /Dekker 2020/);
  assert.match(UI.ja.about.citationsCcBody, /Misawa 2021/);
  assert.match(UI.ja.about.citationsNotCcBody, /Kudo 2011/);
});

test('引用は PubMed へ行く', () => {
  assert.equal(pubmedUrl('26927367'), 'https://pubmed.ncbi.nlm.nih.gov/26927367/');
  assert.equal(pubmedUrl(QUACH_2019_PUBMED), 'https://pubmed.ncbi.nlm.nih.gov/31327182/');
  for (const score of SCORES) {
    assert.ok(score.pubmed, score.id);
    assert.match(pubmedUrl(score.pubmed!), /^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\//);
  }
});

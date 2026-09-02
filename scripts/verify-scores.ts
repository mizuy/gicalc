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
import { computeEggim } from '../lib/scores/eggim';
import { computeGbs } from '../lib/scores/gbs';
import { computeKyoto } from '../lib/scores/kyoto';
import { computeKyotoModified } from '../lib/scores/kyoto-modified';
import { computeNoblads } from '../lib/scores/noblads';
import { computeApcs } from '../lib/scores/apcs';
import { computeAronchick } from '../lib/scores/aronchick';
import { computeBbps } from '../lib/scores/bbps';
import { computeSekiguchi } from '../lib/scores/sekiguchi';
import { lowestFieldValues } from '../lib/scores/initialValues';
import { getScoreById, getScoresGroupedByOrgan, SCORES } from '../data/scores';
import { KIMURA_1969_PUBMED } from '../data/scores/kimura-takemoto';
import { DEFAULT_LOCALE, localizeResult, localizeScore, SCORE_EN, UI } from '../lib/i18n';
import { pubmedUrl } from '../lib/pubmed';
import { isClassification } from '../types/score';

test('登録スコアは16種で臓器順に並ぶ', () => {
  assert.deepEqual(
    SCORES.map((score) => score.id),
    [
      'jes',
      'kimura-takemoto',
      'kyoto',
      'kyoto-modified',
      'eggim',
      'ecura-hatta',
      'sekiguchi',
      'best-j',
      'apcs',
      'kudo-tsuruta',
      'jnet',
      'kajiwara-nomogram',
      'bbps',
      'aronchick',
      'gbs',
      'noblads',
    ],
  );
  assert.deepEqual(
    getScoresGroupedByOrgan().map((group) => [group.organ, group.scores.map((score) => score.id)]),
    [
      ['esophagus', ['jes']],
      [
        'stomach',
        ['kimura-takemoto', 'kyoto', 'kyoto-modified', 'eggim', 'ecura-hatta', 'sekiguchi', 'best-j'],
      ],
      ['colorectum', ['apcs', 'kudo-tsuruta', 'jnet', 'kajiwara-nomogram', 'bbps', 'aronchick']],
      ['bleeding', ['gbs', 'noblads']],
    ],
  );
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

  for (const score of [jnet, kudo, jes, kimura]) {
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
  assert.match(jnet.figures?.[0]?.src ?? '', /jnet-sano2016-fig7/);
  assert.match(jnet.figures?.[0]?.caption ?? '', /Fig\. 7/);
  assert.equal(jnet.pubmed, '26927367');
  assert.equal(jnet.figures?.[0]?.pubmed, '26927367');

  const kudo = getScoreById('kudo-tsuruta');
  assert.ok(kudo && isClassification(kudo));
  assert.equal(kudo.figures?.length, 1);
  assert.match(kudo.figures?.[0]?.source ?? '', /Kudo S/);
  assert.match(kudo.figures?.[0]?.doi ?? '', /10\.5946\/ce\.2024\.263/);
  assert.match(kudo.figures?.[0]?.src ?? '', /kudo-tsuruta-pit/);
  assert.match(kudo.figures?.[0]?.caption ?? '', /Fig\. 4/);
  assert.equal(kudo.pubmed, '8836710');
  assert.equal(kudo.figures?.[0]?.pubmed, '40336268');

  const jes = getScoreById('jes');
  assert.ok(jes && isClassification(jes));
  assert.equal(jes.figures?.length, 2);
  assert.match(jes.figures?.[0]?.source ?? '', /Oyama T/);
  assert.match(jes.figures?.[0]?.doi ?? '', /10\.1007\/s10388-016-0527-7/);
  assert.match(jes.figures?.[0]?.src ?? '', /jes-oyama2017-fig1-4/);
  assert.match(jes.figures?.[1]?.src ?? '', /jes-oyama2017-fig5/);
  assert.equal(jes.pubmed, '28386209');

  const kimura = getScoreById('kimura-takemoto');
  assert.ok(kimura && isClassification(kimura));
  assert.match(kimura.figures?.[0]?.source ?? '', /Kimura K/);
  assert.match(kimura.figures?.[0]?.doi ?? '', /10\.1055\/s-0028-1098086/);
  assert.match(kimura.figures?.[0]?.src ?? '', /kimura-takemoto-1969/);
  assert.equal(kimura.pubmed, KIMURA_1969_PUBMED);
  assert.equal(kimura.figures?.[0]?.pubmed, '31327182');
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
      for (const entry of score.entries) {
        if (entry.group) {
          assert.ok(copy.groups?.[entry.group], `${score.id} group ${entry.group}`);
        }
        if (entry.comment) {
          assert.ok(copy.comments?.[entry.label], `${score.id} comment ${entry.label}`);
        }
      }
      for (const entry of english.entries) {
        if (entry.group) assert.doesNotMatch(entry.group, japanese);
        if (entry.comment) assert.doesNotMatch(entry.comment, japanese);
        if (entry.meaning) assert.doesNotMatch(entry.meaning, japanese);
      }
      for (const note of english.figures?.map((figure) => figure.note) ?? []) {
        assert.doesNotMatch(note, japanese);
      }
    } else if (!isClassification(score) && !isClassification(english)) {
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
});

test('引用は PubMed へ行く', () => {
  assert.equal(pubmedUrl('26927367'), 'https://pubmed.ncbi.nlm.nih.gov/26927367/');
  assert.equal(pubmedUrl(KIMURA_1969_PUBMED), KIMURA_1969_PUBMED);
  for (const score of SCORES) {
    assert.ok(score.pubmed, score.id);
    assert.match(pubmedUrl(score.pubmed!), /^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\//);
  }
});

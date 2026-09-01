import assert from 'node:assert/strict';
import { test } from 'node:test';

import { predictLnmProbability, valuesToNomogramInput } from '../lib/nomogram/kajiwara';
import { computeBestJ } from '../lib/scores/best-j';
import { computeEcura } from '../lib/scores/ecura';
import { computeEggim } from '../lib/scores/eggim';
import { computeGbs } from '../lib/scores/gbs';
import { computeKyoto } from '../lib/scores/kyoto';
import { computeKyotoModified } from '../lib/scores/kyoto-modified';
import { computeNoblads } from '../lib/scores/noblads';
import { computeApcs } from '../lib/scores/apcs';
import { computeAronchick } from '../lib/scores/aronchick';
import { computeBbps } from '../lib/scores/bbps';
import { computeJes } from '../lib/scores/jes';
import { computeJnet } from '../lib/scores/jnet';
import { computeKimuraTakemoto } from '../lib/scores/kimura-takemoto';
import { computeSekiguchi } from '../lib/scores/sekiguchi';
import { getScoreById, SCORES } from '../data/scores';

test('登録スコアは15種でカテゴリ順に並ぶ', () => {
  assert.deepEqual(
    SCORES.map((score) => score.id),
    [
      'apcs',
      'jes',
      'kimura-takemoto',
      'jnet',
      'kajiwara-nomogram',
      'bbps',
      'aronchick',
      'ecura-hatta',
      'sekiguchi',
      'best-j',
      'kyoto',
      'kyoto-modified',
      'eggim',
      'gbs',
      'noblads',
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

test('eCura: 0–1 低リスク / 2–4 中リスク / 5–7 高リスク', () => {
  const low = computeEcura({ ly: 0, size: 0, vm: 0, v: 0, sm: 1 });
  assert.equal(low.total, 1);
  assert.equal(low.severity, 'none');
  assert.equal(low.displayMode, 'points');
  assert.equal(low.maxScore, 7);

  const mid = computeEcura({ ly: 3, size: 1, vm: 0, v: 0, sm: 0 });
  assert.equal(mid.total, 4);
  assert.equal(mid.severity, 'moderate');

  const high = computeEcura({ ly: 3, size: 1, vm: 1, v: 1, sm: 1 });
  assert.equal(high.total, 7);
  assert.equal(high.severity, 'severe');
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

test('JNET: Type 1 / 2A / 2B / 3 は分類表示で組織推定が分かれる', () => {
  const type1 = computeJnet({ type: 1 });
  assert.equal(type1.displayMode, 'classification');
  assert.equal(type1.classificationLabel, 'Type 1');
  assert.equal(type1.interpretation, '過形成 / SSL');

  const type2a = computeJnet({ type: 2 });
  assert.equal(type2a.classificationLabel, 'Type 2A');
  assert.equal(type2a.interpretation, '腺腫（LGIEN）');

  const type2b = computeJnet({ type: 3 });
  assert.equal(type2b.classificationLabel, 'Type 2B');
  assert.equal(type2b.interpretation, 'HGIEN / 浅層SM');

  const type3 = computeJnet({ type: 4 });
  assert.equal(type3.classificationLabel, 'Type 3');
  assert.equal(type3.interpretation, '深層SM以深');
  assert.equal(type3.severity, 'severe');

  const defined = getScoreById('jnet');
  assert.ok(defined);
  assert.equal(defined.compute({ type: 2 }).classificationLabel, 'Type 2A');
});

test('JES: Type A / B1 / B2 / B3 は推定深達度が分かれる', () => {
  const typeA = computeJes({ type: 1 });
  assert.equal(typeA.classificationLabel, 'Type A');
  assert.equal(typeA.interpretation, '非癌（炎症 / LGIN）');

  const typeB1 = computeJes({ type: 2 });
  assert.equal(typeB1.classificationLabel, 'Type B1');
  assert.equal(typeB1.interpretation, 'EP / LPM');

  const typeB2 = computeJes({ type: 3 });
  assert.equal(typeB2.classificationLabel, 'Type B2');
  assert.equal(typeB2.interpretation, 'MM / SM1');

  const typeB3 = computeJes({ type: 4 });
  assert.equal(typeB3.classificationLabel, 'Type B3');
  assert.equal(typeB3.interpretation, 'SM2 以深');
  assert.equal(typeB3.severity, 'severe');
});

test('木村–竹本: C-0 から O-3 まで閉鎖型と開放型が分かれる', () => {
  const c0 = computeKimuraTakemoto({ grade: 0 });
  assert.equal(c0.classificationLabel, 'C-0');
  assert.equal(c0.interpretation, '萎縮なし');

  const c2 = computeKimuraTakemoto({ grade: 2 });
  assert.equal(c2.classificationLabel, 'C-2');
  assert.equal(c2.interpretation, '閉鎖型（中等度）');

  const o3 = computeKimuraTakemoto({ grade: 6 });
  assert.equal(o3.classificationLabel, 'O-3');
  assert.equal(o3.interpretation, '開放型（高度）');
  assert.equal(o3.severity, 'severe');

  const defined = getScoreById('kimura-takemoto');
  assert.ok(defined);
  assert.equal(defined.compute({ grade: 4 }).classificationLabel, 'O-1');
});

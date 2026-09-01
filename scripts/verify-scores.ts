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
import { computeAronchick } from '../lib/scores/aronchick';
import { computeBbps } from '../lib/scores/bbps';
import { computeSekiguchi } from '../lib/scores/sekiguchi';
import { getScoreById, SCORES } from '../data/scores';

test('登録スコアは11種でカテゴリ順に並ぶ', () => {
  assert.deepEqual(
    SCORES.map((score) => score.id),
    [
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

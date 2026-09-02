import type { ScoreResult } from '../../types/score';
import type { Locale } from './types';

const INTERPRETATION_EN: Record<string, string> = {
  低リスク: 'Low risk',
  中リスク: 'Intermediate risk',
  中間リスク: 'Intermediate risk',
  中等度リスク: 'Moderate risk',
  高リスク: 'High risk',
  超高リスク: 'Very high risk',
  超低リスク: 'Very low risk',
  '低リスク群（0–4）': 'Low-risk group (0–4)',
  腸上皮化生なし: 'No intestinal metaplasia',
  '低リスク（0–4）': 'Low risk (0–4)',
  '高リスク（5–8）': 'High risk (5–8)',
  '平均リスク（AR）': 'Average risk (AR)',
  '中等度リスク（MR）': 'Moderate risk (MR)',
  '高リスク（HR）': 'High risk (HR)',
  'Excellent（優）': 'Excellent',
  'Good（良）': 'Good',
  'Fair（可）': 'Fair',
  'Poor（不良）': 'Poor',
  'Inadequate（不適）': 'Inadequate',
  '良好（adequate）': 'Excellent (adequate)',
  adequate: 'Adequate',
  '不十分（inadequate）': 'Inadequate',
};

const DETAIL_EXACT_EN: Record<string, string> = {
  'ESD後遅発性出血率 2.8%': 'Delayed post-ESD bleeding rate 2.8%',
  'ESD後遅発性出血率 6.1%': 'Delayed post-ESD bleeding rate 6.1%',
  'ESD後遅発性出血率 11.4%': 'Delayed post-ESD bleeding rate 11.4%',
  'ESD後遅発性出血率 29.7%': 'Delayed post-ESD bleeding rate 29.7%',
  'LNM率 2.5%（CSS 99.6%）': 'LNM rate 2.5% (CSS 99.6%)',
  'ESD単独も選択肢です。': 'ESD alone is also an option.',
  'LNM率 6.7%（CSS 96.0%）': 'LNM rate 6.7% (CSS 96.0%)',
  '追加治療は個別判断してください。': 'Decide additional treatment case by case.',
  'LNM率 22.7%（CSS 90.1%）': 'LNM rate 22.7% (CSS 90.1%)',
  '救済胃切除＋リンパ節郭清を推奨します。': 'Salvage gastrectomy with lymphadenectomy is recommended.',
  '介入不要の見込みが高いです。': 'Intervention is unlikely to be needed.',
  'ESGE では GBS 0–1 を外来管理の候補とします。': 'ESGE considers GBS 0–1 a candidate for outpatient care.',
  '入院・早期内視鏡を検討してください。': 'Consider admission and early endoscopy.',
  '治療介入（輸血・内視鏡）の必要性が高いです。': 'Therapeutic intervention (transfusion or endoscopy) is likely.',
  '集中治療と緊急内視鏡を強く検討してください。': 'Strongly consider intensive care and urgent endoscopy.',
  '外来管理の候補です。': 'A candidate for outpatient management.',
  '入院を検討してください。': 'Consider hospital admission.',
  '輸血・止血介入の可能性が高いです。緊急大腸内視鏡を検討してください。':
    'Transfusion or hemostasis is likely. Consider urgent colonoscopy.',
  'Kawamura 2021 の原法カットオフ。萎縮が強いほど注意してください。':
    'Kawamura 2021 cutoff for the original score. Greater atrophy warrants closer attention.',
  '5–8 点は高リスク群です。丁寧な観察とサーベイランスを検討してください。':
    'Scores 5–8 are high risk. Consider careful inspection and surveillance.',
  '0–1 点。未分化型胃癌はこの群にも少数あります。':
    '0–1 points. A few undifferentiated gastric cancers still occur in this group.',
  '2–3 点。注意深い観察を行ってください。': '2–3 points. Inspect carefully.',
  '4–5 点。サーベイランス間隔の短縮を検討してください。':
    '4–5 points. Consider a shorter surveillance interval.',
  'IEE で腸上皮化生を認めません。': 'No intestinal metaplasia on IEE.',
  'Kawamura 2021 では EGGIM 0–4 を低リスクとしています。':
    'Kawamura 2021 treats EGGIM 0–4 as low risk.',
  '広範な腸上皮化生です。胃癌リスクが高く、サーベイランスを検討してください。':
    'Extensive intestinal metaplasia. Gastric cancer risk is higher; consider surveillance.',
  '検証コホートの進行腫瘍有病率 1.3%。': 'Advanced-neoplasia prevalence 1.3% in the validation cohort.',
  '便潜血による検診も選択肢です。': 'Fecal occult-blood screening is also an option.',
  '検証コホートの進行腫瘍有病率 3.2%（平均リスクの 2.6 倍）。':
    'Advanced-neoplasia prevalence 3.2% in the validation cohort (2.6× average risk).',
  '第一度近親者の家族歴（+2）はこの群に入ります。':
    'A first-degree family history (+2) falls in this group.',
  '検証コホートの進行腫瘍有病率 5.2%（平均リスクの 4.3 倍）。':
    'Advanced-neoplasia prevalence 5.2% in the validation cohort (4.3× average risk).',
  '大腸内視鏡検診の優先対象です。': 'A priority for colonoscopy screening.',
  '透明な少量の液体。粘膜の 95% 超が見える。': 'Small amount of clear fluid. >95% of mucosa visible.',
  'adequate。洗浄前に全体を評価します。': 'Adequate. Score the whole colon before washing.',
  '透明な液体が多めでも、粘膜の 90% 超が見える。':
    'Larger volume of clear fluid, but >90% of mucosa visible.',
  '半固形便があるが吸引・洗浄で除去でき、粘膜の 90% 超が見える。':
    'Semisolid stool that can be suctioned or washed; >90% of mucosa visible.',
  '施設により adequate に含めることがあります。': 'Some centers still count this as adequate.',
  '半固形便を吸引できず、粘膜の 90% 未満しか見えない。':
    'Semisolid stool cannot be suctioned; <90% of mucosa visible.',
  'inadequate。再検査を検討してください。': 'Inadequate. Consider a repeat examination.',
  '残渣が多く検査を完遂できない。再前処置が必要です。':
    'Too much residue to complete the exam. Repeat preparation is required.',
  '各区域 ≥2 かつ合計 ≥6 は、通常のサーベイランス間隔の目安です。':
    'Each segment ≥2 and a total ≥6 is a usual surveillance-interval benchmark.',
  '洗浄・吸引後の抜去時に評価します。Aronchick とは時点が違います。':
    'Score during withdrawal after washing and suction. Timing differs from Aronchick.',
  '1つでも区域が 0–1 なら inadequate とするのが一般的です。再検査間隔の短縮を検討してください。':
    'Any segment of 0–1 is generally inadequate. Consider a shorter recall interval.',
  '洗浄・吸引後の抜去時に評価します。': 'Score during withdrawal after washing and suction.',
  'リンパ節転移リスクは 5% 未満です。': 'Lymph-node metastasis risk is below 5%.',
  '経過観察も選択肢です。': 'Observation is also an option.',
  'リンパ節転移リスクは 5–15% です。': 'Lymph-node metastasis risk is 5–15%.',
  '追加外科切除を慎重に検討してください。': 'Carefully consider additional surgical resection.',
  'リンパ節転移リスクは 15% 以上です。': 'Lymph-node metastasis risk is 15% or higher.',
  '追加腸切除＋リンパ節郭清を強く検討してください。':
    'Strongly consider additional bowel resection with lymphadenectomy.',
  '追加胃切除は個別判断してください。': 'Decide additional gastrectomy case by case.',
  '胃切除＋リンパ節郭清を強く検討してください。': 'Strongly consider gastrectomy with lymphadenectomy.',
};

const DETAIL_PATTERNS: Array<{ re: RegExp; to: (...args: string[]) => string }> = [
  {
    re: /^右（盲腸・上行） (\d+) \/ 横行（肝・脾弯曲含む） (\d+) \/ 左（下行・S状・直腸） (\d+)$/,
    to: (right, transverse, left) =>
      `Right (cecum/ascending) ${right} / Transverse (incl. flexures) ${transverse} / Left (descending/sigmoid/rectum) ${left}`,
  },
  {
    re: /^LNM (.+)（95% CI (.+)、導出コホート）$/,
    to: (rate, ci) => `LNM ${rate} (95% CI ${ci}, derivation cohort)`,
  },
  {
    re: /^LNM (.+)（95% CI (.+)）$/,
    to: (rate, ci) => `LNM ${rate} (95% CI ${ci})`,
  },
  {
    re: /^重症 LGIB 率 (.+)（導出コホート）$/,
    to: (rate) => `Severe LGIB rate ${rate} (derivation cohort)`,
  },
  {
    re: /^重症 LGIB 率 (.+)$/,
    to: (rate) => `Severe LGIB rate ${rate}`,
  },
];

export function localizeInterpretation(interpretation: string, locale: Locale): string {
  if (locale === 'ja') return interpretation;
  return INTERPRETATION_EN[interpretation] ?? interpretation;
}

export function localizeDetail(detail: string, locale: Locale): string {
  if (locale === 'ja') return detail;
  const exact = DETAIL_EXACT_EN[detail];
  if (exact) return exact;
  for (const { re, to } of DETAIL_PATTERNS) {
    const match = detail.match(re);
    if (match) {
      return to(...match.slice(1));
    }
  }
  return detail;
}

export function localizeResult(result: ScoreResult, locale: Locale): ScoreResult {
  if (locale === 'ja') return result;
  return {
    ...result,
    interpretation: localizeInterpretation(result.interpretation, locale),
    details: result.details?.map((detail) => localizeDetail(detail, locale)),
  };
}

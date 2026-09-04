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
  'Stage 0': 'Stage 0',
  'Stage I': 'Stage I',
  'Stage II': 'Stage II',
  'Stage III': 'Stage III',
  'Stage IV': 'Stage IV',
  'VCL C4/5（HGA / 癌）を疑う': 'Suggests VCL C4/5 (HGA / cancer)',
  'VCL C3（LGA）を疑う': 'Suggests VCL C3 (LGA)',
  'VCL 4 以上（HGA / 癌）を疑う': 'Suggests VCL 4 or higher (HGA / cancer)',
  'VCL 3（LGA）を疑う': 'Suggests VCL 3 (LGA)',
  'Excellent（優）': 'Excellent',
  'Good（良）': 'Good',
  'Fair（可）': 'Fair',
  'Poor（不良）': 'Poor',
  'Inadequate（不適）': 'Inadequate',
  '良好（adequate）': 'Excellent (adequate)',
  adequate: 'Adequate',
  'eCuraA（治癒切除）': 'eCuraA (curative resection)',
  'eCuraB（治癒切除）': 'eCuraB (curative resection)',
  'eCuraC-1（非治癒切除）': 'eCuraC-1 (non-curative resection)',
  'eCuraC-2（非治癒切除）': 'eCuraC-2 (non-curative resection)',
  '不十分（inadequate）': 'Inadequate',
};

const DETAIL_EXACT_EN: Record<string, string> = {
  'ESD後遅発性出血率 2.8%': 'Delayed post-ESD bleeding rate 2.8%',
  'ESD後遅発性出血率 6.1%': 'Delayed post-ESD bleeding rate 6.1%',
  'ESD後遅発性出血率 11.4%': 'Delayed post-ESD bleeding rate 11.4%',
  'ESD後遅発性出血率 29.7%': 'Delayed post-ESD bleeding rate 29.7%',
  'LNM率 2.5%（CSS 99.6%）': 'LNM rate 2.5% (CSS 99.6%)',
  'リスク区分の LNM率 2.5%（CSS 99.6%）': 'Risk-group LNM rate 2.5% (CSS 99.6%)',
  'ESD単独も選択肢です。': 'ESD alone is also an option.',
  'LNM率 6.7%（CSS 96.0%）': 'LNM rate 6.7% (CSS 96.0%)',
  'リスク区分の LNM率 6.7%（CSS 96.0%）': 'Risk-group LNM rate 6.7% (CSS 96.0%)',
  '追加治療は個別判断してください。': 'Decide additional treatment case by case.',
  'LNM率 22.7%（CSS 90.1%）': 'LNM rate 22.7% (CSS 90.1%)',
  'リスク区分の LNM率 22.7%（CSS 90.1%）': 'Risk-group LNM rate 22.7% (CSS 90.1%)',
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
  'カットオフ ≥3 点。導出コホートの正診率 92%、感度 95%、特異度 93%。':
    'Cutoff ≥3. Derivation-cohort accuracy 92%, sensitivity 95%, specificity 93%.',
  '色調は白光、表面・血管は NBI 拡大で評価する。': 'Score color on WLI; surface and vessels on magnifying NBI.',
  'カットオフ <3 点。低異型度腺腫の見込み。': 'Cutoff <3. Favors low-grade adenoma.',
  'カットオフ ≥3 点。検証コホートの感度 88%、特異度 79%、正診率 86%。':
    'Cutoff ≥3. Validation sensitivity 88%, specificity 79%, accuracy 86%.',
  '白光（必要ならインジゴカルミン）のみ。混在色調は高い点を採用。':
    'WLI only (± indigo carmine). If mixed colors, take the higher points.',
  '乳頭部は別評価。Stage IV は十二指腸・乳頭部癌リスクが高い。':
    'Assess the papilla separately. Stage IV has a high risk of duodenal and papillary cancer.',
  '1989 原法の軽度・中等度・高度は使わない。乳頭部は別評価。':
    'Do not use the 1989 mild / moderate / severe grades. Assess the papilla separately.',
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
  'JGES 胃癌 ESD/EMR ガイドライン第2版・胃癌治療ガイドライン第6版に基づく内視鏡的根治度です。':
    'Endoscopic curability per the JGES gastric ESD/EMR guideline (2nd ed.) and JGCA gastric cancer treatment guideline (6th ed.).',
  '病理診断（p 診）に基づき判定します。適応決定は c 診、治癒判定は p 診です（ESD ガイドライン）。':
    'Judged from pathological (p) findings. Indications use clinical (c) diagnosis; curability uses p diagnosis (ESD guideline).',
  '治癒切除に相当します。外科的胃切除と同等の長期成績が得られるとされています。':
    'Equivalent to curative resection. Long-term outcomes are considered equal to surgical gastrectomy.',
  '【ESD ガイドライン】eCuraA 後は異時性胃癌検出を主目的に EGD を年 1–2 回（推奨 1）。':
    '[ESD guideline] After eCuraA, EGD once or twice yearly primarily to detect metachronous gastric cancer (grade 1).',
  '【ESD ガイドライン】H. pylori 陽性例では除菌を推奨（A, 2）。除菌後も EGD フォローは継続。':
    '[ESD guideline] Eradicate H. pylori when positive (A, 2). Continue EGD surveillance after eradication.',
  '【治療 GL 第6版】治癒切除後は H. pylori 検査・除菌、年 1–2 回の内視鏡経過観察。':
    '[Treatment GL 6th ed.] After curative resection: test/eradicate H. pylori; endoscopic follow-up once or twice yearly.',
  '治癒切除に相当します（適応拡大）。十分な長期成績は限られますが、根治が期待されます。':
    'Equivalent to curative resection (expanded indication). Limited long-term data, but cure is expected.',
  '【ESD ガイドライン】eCuraB 後は EGD に加え、転移検索のため US または CT も望ましい（C, 2）。':
    '[ESD guideline] After eCuraB, add US or CT for metastasis detection in addition to EGD (C, 2).',
  '【ESD ガイドライン】H. pylori 陽性例では除菌を推奨。':
    '[ESD guideline] Eradicate H. pylori when positive.',
  '【治療 GL 第6版】SM1（<500 µm）、長径 ≤3 cm、分化型、pT1b1（SM1）の条件に該当。':
    '[Treatment GL 6th ed.] Meets SM1 (<500 µm), long diameter ≤3 cm, differentiated type, pT1b1 (SM1).',
  '非治癒切除（eCuraC）ですが、転移リスクは eCuraC-2 より低いとされます。':
    'Non-curative resection (eCuraC), but metastasis risk is considered lower than eCuraC-2.',
  '【ESD ガイドライン】追加外科切除に加え、再 ESD・焼灼・経過観察も施設方針と同意のもと選択可（C）。':
    '[ESD guideline] Besides additional surgery, repeat ESD, ablation, or observation may be chosen per institutional policy and consent (C).',
  '【ESD ガイドライン】原則追加外科切除：① 長径 ≤3 cm・分化型・pT1a・UL1、② 長径 ≤3 cm・分化型・pT1b1（SM1）で、内視鏡的遺残＋標本内癌の合計 >30 mm、または SM 浸潤部の分割切除・断端陽性（Fig. 2–3）。':
    '[ESD guideline] Additional surgery generally indicated: (1) ≤3 cm, differentiated, pT1a, UL1; (2) ≤3 cm, differentiated, pT1b1 (SM1) with endoscopic remnant plus specimen tumor >30 mm, or piecemeal/positive margin in the SM-invasive part (Figs 2–3).',
  '【ESD ガイドライン】追加切除せず経過観察を選ぶ場合は EGD 慎重フォロー（C, 2）。HM 陽性 ≥6 mm や長径 ≥2 cm では局所再発リスク上昇。':
    '[ESD guideline] If observation without additional resection is chosen, careful EGD follow-up (C, 2). Local recurrence risk rises with HM ≥6 mm or long diameter ≥2 cm.',
  '【治療 GL 第6版】側方断端陽性・分割切除のみが eCuraA/B から外れる場合は eCuraC-1。追加切除は個別判断。':
    '[Treatment GL 6th ed.] eCuraC-1 when only piecemeal resection or positive lateral margin excludes eCuraA/B. Additional resection is case-by-case.',
  '非治癒切除です。遺残腫瘍の可能性があります。':
    'Non-curative resection. Residual tumor is possible.',
  '【ESD ガイドライン】原則開腹または腹腔鏡下胃切除（C, 1）。追加切除不能時は LNM 頻度データ（Table 3–4）を参考に説明・同意。':
    '[ESD guideline] Open or laparoscopic gastrectomy is generally indicated (C, 1). If surgery is not feasible, explain using LNM data (Tables 3–4) and obtain consent.',
  '【治療 GL 第6版】eCuraC-2 は原則追加外科切除。年齢・合併症等で追加切除しない場合は LNM リスクと再発時の予後不良を説明。':
    '[Treatment GL 6th ed.] eCuraC-2: additional surgery in principle. If declined, explain LNM risk and poor prognosis if recurrence occurs.',
  'LNM リスク層別化には本アプリの eCura スコア（0–7 点）を参照してください。':
    'For LNM risk stratification, use the eCura score page (0–7 points) in this app.',
  '注：分化型優位で未分化型成分の長径合計が >2 cm のため eCuraC-2（ESD ガイドライン Fig. 6）。':
    'Note: eCuraC-2 because total undifferentiated long diameter >2 cm in differentiated-dominant lesion (ESD guideline Fig. 6).',
  '未分化型領域は再構築（mapping）上の長径合計で計測。複数領域は合算。':
    'Measure total long diameter of undifferentiated areas on reconstruction; sum multiple areas.',
  '注：SM 浸潤部に未分化型成分があるため eCuraB ではなく eCuraC-2（ESD ガイドライン Fig. 6）。':
    'Note: eCuraC-2, not eCuraB, because undifferentiated component is present in the SM-invasive part (ESD guideline Fig. 6).',
  '該当：分化型優位・長径 ≤3 cm・pT1b1（SM1, <500 µm）・一括切除・HM0・VM0・Ly0・V0。':
    'Meets: differentiated-dominant, long diameter ≤3 cm, pT1b1 (SM1, <500 µm), en bloc, HM0, VM0, Ly0, V0.',
};

const DETAIL_PATTERNS: Array<{ re: RegExp; to: (...args: string[]) => string }> = [
  {
    re: /^該当パターン：(.+)。一括切除、HM0、VM0、Ly0、V0。$/,
    to: (pattern) => {
      const patterns: Record<string, string> = {
        '（i）分化型優位・pT1a・UL0（長径不問）': '(i) differentiated-dominant, pT1a, UL0 (any size)',
        '（ii）未分化型優位・長径 ≤2 cm・pT1a・UL0':
          '(ii) undifferentiated-dominant, long diameter ≤2 cm, pT1a, UL0',
        '（iii）分化型優位・長径 ≤3 cm・pT1a・UL1':
          '(iii) differentiated-dominant, long diameter ≤3 cm, pT1a, UL1',
      };
      return `Pattern: ${patterns[pattern] ?? pattern}. En bloc, HM0, VM0, Ly0, V0.`;
    },
  },
  {
    re: /^eCuraA\/B の条件を満たすが、(.+)のため eCuraC-1。$/,
    to: (reason) => {
      const en = reason
        .replace(/分割切除（一括切除でない）/g, 'piecemeal resection (not en bloc)')
        .replace(/水平断端陽性（HM1）/g, 'positive horizontal margin (HM1)')
        .replace(/・/g, ' · ');
      return `Would meet eCuraA/B criteria, but eCuraC-1 because ${en}.`;
    },
  },
  {
    re: /^主な要因：(.+)。$/,
    to: (factors) => {
      const en = factors
        .replace(/垂直断端陽性（VM1）/g, 'positive vertical margin (VM1)')
        .replace(/リンパ管侵襲陽性（Ly1）/g, 'lymphatic invasion (Ly1)')
        .replace(/静脈侵襲陽性（V1）/g, 'venous invasion (V1)')
        .replace(/pT1b（SM2）以深/g, 'pT1b (SM2) or deeper')
        .replace(/未分化型優位で eCuraA（ii）の条件外/g, 'undifferentiated-dominant outside eCuraA (ii)')
        .replace(/長径 >3 cm の pT1a（eCuraA 条件外）/g, 'pT1a with long diameter >3 cm (outside eCuraA)')
        .replace(/、/g, ', ');
      return `Main factors: ${en}.`;
    },
  },
  {
    re: /^この点数の LNM率 (.+)（(.+)、95% CI (.+)）$/,
    to: (rate, n, ci) => `LNM rate at this score ${rate} (${n}, 95% CI ${ci})`,
  },
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
  {
    re: /^Spigelman stage (.+)（0–12 点）。$/,
    to: (stage) => `Spigelman stage ${stage} (0–12 points).`,
  },
  {
    re: /^Modified Spigelman stage (.+)（Vienna: LGD 1 点 \/ HGD 3 点）。$/,
    to: (stage) => `Modified Spigelman stage ${stage} (Vienna: LGD 1 point / HGD 3 points).`,
  },
  {
    re: /^ESGE 2019 の十二指腸サーベイランス目安: (.+)。$/,
    to: (interval) => {
      const intervals: Record<string, string> = {
        '5年ごと': 'every 5 years',
        '3年ごと': 'every 3 years',
        '1年ごと': 'every 1 year',
        '6–12か月。膵温存十二指腸切除も検討':
          'every 6–12 months; consider pancreas-preserving duodenectomy',
      };
      return `ESGE 2019 duodenal surveillance guide: ${intervals[interval] ?? interval}.`;
    },
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

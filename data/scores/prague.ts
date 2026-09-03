import type { ClassificationDefinition } from '../../types/score';

/** Sharma 2006 Gastroenterology（PMID 17101315） */
export const PRAGUE_2006_PUBMED = '17101315';

export const pragueScore: ClassificationDefinition = {
  id: 'prague',
  kind: 'classification',
  name: 'Prague C & M（Barrett食道）',
  shortName: 'Prague',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    'Barrett 食道の内視鏡的広がりを、胃食道接合部からの円周方向（C）と最長（M）で記録する。',
  originalLead:
    'The Prague C & M Criteria include assessment of the circumferential (C) and maximum (M) extent of the endoscopically visualized Barrett’s esophagus segment as well as endoscopic landmarks. Identify the gastroesophageal junction as at the tops of the gastric mucosal folds. If hiatus hernia is present, do not mistake the diaphragmatic hiatal impression for the gastroesophageal junction. For circumferential columnar-appearing mucosa above the gastroesophageal junction define this extent in centimetres: report as the C value. For any tongue-like areas of columnar-appearing mucosa, measure the maximum extent in centimetres above the gastroesophageal junction: report as the M value. Recognition is reliable at 1 cm and above and poor below 1 cm.',
  reference: 'Sharma P et al. Gastroenterology 2006;131:1392-1399',
  pubmed: PRAGUE_2006_PUBMED,
  figures: [
    {
      href: 'https://ars.els-cdn.com/content/image/1-s2.0-S0016508506017914-gr3.jpg',
      hrefLabel: 'Fig. 3',
      alt: 'Diagram of Prague C2M5 Barrett segment (Sharma 2006 Fig. 3)',
      caption: 'Fig. 3. Diagrammatic representation of endoscopic Barrett’s esophagus classified as C2M5',
      source:
        'Sharma P, Dent J, Armstrong D, et al. The development and validation of an endoscopic grading system for Barrett’s esophagus: the Prague C & M criteria. Gastroenterology. 2006;131:1392-1399. Fig. 3.',
      doi: 'https://doi.org/10.1053/j.gastro.2006.08.032',
      pubmed: PRAGUE_2006_PUBMED,
      note: '原著 Fig. 3（C2M5 の模式図）。Elsevier / Gastroenterology の著作権。CC ではないので画像は置かず、出版社の Fig. 3 画像へリンクする。',
    },
  ],
  entries: [
    {
      label: 'GEJ',
      meaning: 'Gastroesophageal junction',
      group: 'ランドマーク',
      severity: 'none',
      rows: [
        {
          heading: 'Landmark',
          text: 'Tops of the gastric mucosal folds, assessed with moderate insufflation',
        },
        {
          heading: 'Hernia',
          text: 'If hiatus hernia is present, do not mistake the diaphragmatic hiatal impression for the gastroesophageal junction',
        },
      ],
    },
    {
      label: 'C',
      meaning: 'Circumferential extent',
      group: '計測',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Circumferential extent of columnar-appearing mucosa above the gastroesophageal junction, in centimetres',
        },
        {
          heading: 'C0',
          text: 'A segment made entirely of tongues has C = 0',
        },
      ],
    },
    {
      label: 'M',
      meaning: 'Maximum extent',
      group: '計測',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Maximum extent of columnar-appearing mucosa above the gastroesophageal junction, including the longest tongue, in centimetres',
        },
        {
          heading: 'Rule',
          text: 'M cannot be less than C. Separate islands of columnar mucosa are recorded descriptively and are not included in M',
        },
      ],
      comment: '舌状の長さだけを M とする誤りが多い。M は最長（円周部＋舌）。',
    },
    {
      label: 'C2M5',
      meaning: 'Example: C 2 cm, M 5 cm',
      group: '記載例',
      severity: 'moderate',
      rows: [
        {
          heading: 'Example',
          text: 'C 2 cm and M 5 cm (C plus a distal tongue of 3 cm), reported as C2M5',
        },
      ],
    },
    {
      label: 'C0M1',
      meaning: 'Example: tongue only',
      group: '記載例',
      severity: 'none',
      rows: [
        {
          heading: 'Example',
          text: 'A 1 cm tongue without a circumferential segment is reported as C0M1',
        },
      ],
      comment: '1 cm 未満は認識の信頼性が低い（原著 RC 0.22）。',
    },
    {
      label: 'C2M2',
      meaning: 'Example: circular, no tongue',
      group: '記載例',
      severity: 'mild',
      rows: [
        {
          heading: 'Example',
          text: 'A 2 cm circular segment with a relatively straight proximal boundary is reported as C2M2',
        },
      ],
    },
  ],
};

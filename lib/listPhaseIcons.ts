import type { ListClinicalPhase } from '@/types/score';

export const LIST_PHASE_ICONS: Record<ListClinicalPhase, number> = {
  screening: require('../assets/images/list-phase/screening.webp'),
  examination: require('../assets/images/list-phase/examination.webp'),
  'background-mucosa': require('../assets/images/list-phase/background-mucosa.webp'),
  diagnosis: require('../assets/images/list-phase/diagnosis.webp'),
  treatment: require('../assets/images/list-phase/treatment.webp'),
};

import { StyleSheet, View } from 'react-native';

import { ScoreListItem } from '@/components/calculator/ScoreListItem';
import { useThemeColor } from '@/components/Themed';
import type { ScoreDefinition } from '@/types/score';

type Props = {
  scores: ScoreDefinition[];
};

export function ScoreListSection({ scores }: Props) {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');

  return (
    <View style={[styles.table, { backgroundColor: surface, borderColor: border }]}>
      {scores.map((score, index) => (
        <ScoreListItem key={score.id} score={score} last={index === scores.length - 1} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
});

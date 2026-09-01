import { Stack, useLocalSearchParams } from 'expo-router';

import { ClassificationReferenceScreen } from '@/components/calculator/ClassificationReferenceScreen';
import { ScoreCalculatorScreen } from '@/components/calculator/ScoreCalculatorScreen';
import { Text, View } from '@/components/Themed';
import { SCORES, getScoreById } from '@/data/scores';
import { isClassification } from '@/types/score';

export function generateStaticParams() {
  return SCORES.map((score) => ({ id: score.id }));
}

export default function ScoreScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const score = typeof id === 'string' ? getScoreById(id) : undefined;

  if (!score) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Stack.Screen options={{ title: '未登録', headerBackTitle: '戻る' }} />
        <Text>指定されたスコアは見つかりません。</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: score.shortName, headerBackTitle: '戻る' }} />
      {isClassification(score) ? (
        <ClassificationReferenceScreen score={score} />
      ) : (
        <ScoreCalculatorScreen score={score} />
      )}
    </>
  );
}

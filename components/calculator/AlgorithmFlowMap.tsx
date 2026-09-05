import { ScrollView, StyleSheet, View } from 'react-native';

import {
  AlgorithmFlowMapTree,
  type AlgorithmFlowMapProps,
} from '@/components/calculator/AlgorithmFlowMapTree';

/** Native / fallback: 手動 flex ツリー */
export function AlgorithmFlowMap({ flow, nodeFlags, onChoose }: AlgorithmFlowMapProps) {
  const compact = flow.mapLayout === 'compact';

  if (compact) {
    return (
      <View style={[styles.mapInner, styles.mapInnerCompact]}>
        <AlgorithmFlowMapTree node={flow.map} nodeFlags={nodeFlags} onChoose={onChoose} compact />
      </View>
    );
  }

  return (
    <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false}>
      <View style={styles.mapInner}>
        <AlgorithmFlowMapTree node={flow.map} nodeFlags={nodeFlags} onChoose={onChoose} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mapInner: {
    minWidth: 560,
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'stretch',
  },
  mapInnerCompact: {
    minWidth: 0,
    paddingHorizontal: 4,
  },
});

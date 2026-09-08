import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { classificationOverviewNodes } from '@/lib/classificationOverview';
import { useLocale } from '@/lib/i18n';
import type { ClassificationDefinition, ClassificationHierarchyNode } from '@/types/score';

function HierarchyList({
  nodes,
  depth = 0,
  borderColor,
}: {
  nodes: ClassificationHierarchyNode[];
  depth?: number;
  borderColor: string;
}) {
  return (
    <View
      style={[
        styles.hierarchyList,
        depth > 0 && styles.hierarchyNested,
        depth > 0 && { borderLeftColor: borderColor },
      ]}>
      {nodes.map((node) => (
        <View key={node.id} style={styles.hierarchyItem}>
          <View style={styles.hierarchyLine}>
            <Text style={styles.hierarchyBullet}>•</Text>
            <Text style={[styles.hierarchyLabel, depth === 0 && styles.hierarchyRootLabel]}>
              {node.label}
            </Text>
          </View>
          {node.children?.length ? (
            <HierarchyList nodes={node.children} depth={depth + 1} borderColor={borderColor} />
          ) : null}
        </View>
      ))}
    </View>
  );
}

export function ClassificationOverview({ score }: { score: ClassificationDefinition }) {
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { t } = useLocale();
  const nodes = classificationOverviewNodes(score);

  return (
    <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
      <Text style={[styles.title, { color: tint }]}>{t.classificationOverview}</Text>
      <HierarchyList nodes={nodes} borderColor={border} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  hierarchyList: {
    gap: 5,
  },
  hierarchyNested: {
    borderLeftWidth: 2,
    marginLeft: 7,
    paddingLeft: 16,
    marginTop: 5,
  },
  hierarchyItem: {
    minWidth: 0,
  },
  hierarchyLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  hierarchyBullet: {
    fontSize: 17,
    lineHeight: 22,
  },
  hierarchyLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  hierarchyRootLabel: {
    fontWeight: '700',
  },
});

import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { classificationOverviewNodes, classificationOverviewTabs } from '@/lib/classificationOverview';
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
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();
  const tabs = classificationOverviewTabs(score);
  const [activeTabId, setActiveTabId] = useState(tabs?.[0]?.id ?? '');
  const activeTab = tabs?.find((tab) => tab.id === activeTabId) ?? tabs?.[0];
  const nodes = activeTab?.nodes ?? classificationOverviewNodes(score);

  return (
    <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
      <Text style={[styles.title, { color: tint }]}>{t.classificationOverview}</Text>
      {tabs?.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabRow}
          keyboardShouldPersistTaps="handled">
          {tabs.map((tab) => {
            const active = tab.id === activeTab?.id;
            return (
              <Pressable
                key={tab.id}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                onPress={() => setActiveTabId(tab.id)}
                style={({ pressed }) => [
                  styles.tab,
                  {
                    borderColor: active ? tint : border,
                    backgroundColor: active ? `${tint}14` : 'transparent',
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}>
                <Text style={[styles.tabLabel, { color: active ? tint : textSecondary }]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}
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
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  tab: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
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

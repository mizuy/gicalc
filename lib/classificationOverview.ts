import type {
  ClassificationDefinition,
  ClassificationHierarchyNode,
} from '../types/score';

function entryLabel(label: string, meaning?: string): string {
  if (!meaning || meaning === label) return label;
  return `${label} · ${meaning}`;
}

export function classificationOverviewNodes(
  score: ClassificationDefinition,
): ClassificationHierarchyNode[] {
  if (score.hierarchy?.length) return score.hierarchy;

  const nodes: ClassificationHierarchyNode[] = [];
  const groups = new Map<string, ClassificationHierarchyNode>();

  score.entries.forEach((entry, index) => {
    const node = {
      id: `${score.id}-overview-entry-${index}`,
      label: entryLabel(entry.label, entry.meaning),
    };

    if (!entry.group) {
      nodes.push(node);
      return;
    }

    let group = groups.get(entry.group);
    if (!group) {
      group = {
        id: `${score.id}-overview-group-${groups.size}`,
        label: entry.group,
        children: [],
      };
      groups.set(entry.group, group);
      nodes.push(group);
    }
    group.children?.push(node);
  });

  return nodes;
}

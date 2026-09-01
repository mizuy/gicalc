import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';

export default function AboutScreen() {
  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const accent = useThemeColor({}, 'accent');

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: background }]} contentContainerStyle={styles.content}>
      <Text style={styles.title}>GI Calc / gicalc</Text>
      <Text style={[styles.body, { color: textSecondary }]}>
        消化管内視鏡臨床医向けのスコアリング・予測ツールです。ブラウザとPWAで利用でき、App
        Storeは不要です。スコア追加は data/scores/ に定義ファイルを足すだけです。
      </Text>

      <Text style={[styles.section, { color: tint }]}>収録ツール（3体系は混同しない）</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>T1 Nomogram</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          大腸T1癌のリンパ節転移確率（Kajiwara / JSCCR）。出力は確率（%）です。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>eCura</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          早期胃癌の非治癒切除後LNMリスク（Hatta 2017）。大腸T1向けではありません。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>BEST-J</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          早期胃癌ESD後の遅発性出血リスク（Hatta 2021）。大腸T1ノモグラムとは別体系です。
        </Text>
      </View>

      <Text style={[styles.section, { color: tint }]}>PWA インストール手順</Text>
      <Text style={[styles.body, { color: textSecondary }]}>
        iPhone / iPad（Safari）: 共有ボタン → 「ホーム画面に追加」
      </Text>
      <Text style={[styles.body, { color: textSecondary }]}>
        Android（Chrome）: メニュー → 「アプリをインストール」または「ホーム画面に追加」
      </Text>
      <Text style={[styles.body, { color: textSecondary }]}>
        対応ブラウザではホーム画面のインストールバナーからも追加できます。
      </Text>

      <Text style={[styles.section, { color: accent }]}>免責事項</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={[styles.body, { color: textSecondary }]}>
          本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。
        </Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          スコア・ノモグラムの解釈は最新のJSCCR/JGESガイドラインと施設プロトコルに従ってください。
        </Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          3つのスコア体系（T1 Nomogram / eCura / BEST-J）は目的・対象疾患が異なります。
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  section: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
});

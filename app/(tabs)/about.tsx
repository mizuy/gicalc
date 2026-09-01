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

      <Text style={[styles.section, { color: tint }]}>収録ツール（体系は混同しない）</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>T1 Nomogram</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          大腸T1癌のリンパ節転移確率（Kajiwara 2023）。出力は確率（%）です。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>eCura / Sekiguchi</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          早期胃癌のLNM。eCura（Hatta 2017、0–7）と Sekiguchi（2016、0–11、混合型を区別）は別スコアです。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>BEST-J</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          早期胃癌ESD後の遅発性出血（Hatta 2021）。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>京都分類 / 改変京都 / EGGIM</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          胃炎からの胃癌リスク。原法0–8（Shichijo 2017）、改変0–5とEGGIM（Kawamura 2021）。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>GBS / NOBLADS</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          上部出血は GBS（Blatchford 2000）、下部出血は NOBLADS（Aoki 2016）。混ぜないでください。
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
          収録スコアは目的・対象疾患が異なります。同名に見えても混同しないでください。
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

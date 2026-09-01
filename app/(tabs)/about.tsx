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
        消化管内視鏡臨床医向けのスコア・予測・内視鏡分類ツールです。ブラウザとPWAで利用でき、App
        Storeは不要です。追加は data/scores/ に定義ファイルを足すだけです。
      </Text>

      <Text style={[styles.section, { color: tint }]}>収録ツール（臓器別。体系は混同しない）</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>食道</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          JES（Oyama 2017）: Type A / B1 / B2 / B3。原著の図と定義文。文献は PubMed に飛びます。Inoue
          IPCL I–V とは別です。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>胃</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          木村–竹本（萎縮分類）、京都 / 改変京都 / EGGIM（胃炎リスク）、eCura / Sekiguchi（LNM）、BEST-J（ESD後出血）。混ぜないでください。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>大腸</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          APCS（検診）、JNET（NBI拡大分類）、T1 Nomogram（Kajiwara）、BBPS / Aronchick（前処置）。混ぜないでください。
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>出血</Text>
        <Text style={[styles.body, { color: textSecondary }]}>
          上部は GBS（Blatchford 2000）、下部は NOBLADS（Aoki 2016）。混ぜないでください。
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

import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ImageStyle,
  type StyleProp,
} from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import { publicPath } from '@/lib/web/baseUrl';
import type { ClassificationFigure as Figure } from '@/types/score';

type Props = {
  figure: Figure;
  /** 分類カード内の参考画像。出典の長い行は出さない */
  compact?: boolean;
};

type WebLinkProps = {
  href: string;
  hrefAttrs: { target: string; rel: string };
};

type FigureImageProps = {
  uri: string;
  alt: string;
  aspectRatio: number;
  compact: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  lazy?: boolean;
};

function FigureImage({ uri, alt, aspectRatio, compact, imageStyle, lazy = false }: FigureImageProps) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const { t } = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [uri]);

  const webLazyProps =
    Platform.OS === 'web' && lazy
      ? ({ loading: 'lazy' } as Record<string, string>)
      : {};

  return (
    <View style={[styles.imageShell, { aspectRatio }]}>
      {!loaded && !failed ? (
        <View style={[styles.placeholder, { borderColor: border, backgroundColor: '#FFFFFF' }]}>
          <ActivityIndicator color={tint} size="small" />
        </View>
      ) : null}
      {failed ? (
        <View style={[styles.placeholder, styles.placeholderFailed, { borderColor: border }]}>
          <Text style={[styles.placeholderText, { color: textSecondary }]}>{t.figureLoadError}</Text>
        </View>
      ) : (
        <Image
          accessibilityLabel={alt}
          source={{ uri }}
          style={[
            styles.image,
            imageStyle,
            { aspectRatio, opacity: loaded ? 1 : 0 },
          ]}
          resizeMode="contain"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          {...webLazyProps}
        />
      )}
    </View>
  );
}

export function ClassificationFigure({ figure, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const { t } = useLocale();
  const uri = figure.src ? publicPath(figure.src) : undefined;
  const aspectRatio = figure.aspectRatio ?? 16 / 9;

  return (
    <View
      style={[
        styles.box,
        compact ? styles.boxCompact : null,
        { backgroundColor: surface, borderColor: border },
      ]}>
      {uri ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${figure.alt}. ${t.enlargeHint}`}
          onPress={() => setOpen(true)}
          style={({ pressed }) => [styles.thumbWrap, pressed ? styles.thumbPressed : null]}>
          <FigureImage uri={uri} alt={figure.alt} aspectRatio={aspectRatio} compact={compact} lazy />
          <View style={[styles.enlargeBadge, compact ? styles.enlargeBadgeCompact : null, { backgroundColor: tint }]}>
            <Text style={styles.enlargeBadgeText}>{t.enlargeHint}</Text>
          </View>
        </Pressable>
      ) : figure.href ? (
        <FigureHrefButton href={figure.href} label={`${t.openFigure}: ${figure.hrefLabel ?? figure.caption}`} />
      ) : null}
      <Text style={[styles.caption, compact ? styles.captionCompact : null]}>{figure.caption}</Text>
      {compact ? null : <CitationLink label={`${t.source}: ${figure.source}`} pubmed={figure.pubmed} />}
      {figure.license ? (
        <CitationLink label={`${t.license}: ${figure.license}`} href={figure.licenseUrl} />
      ) : null}
      <Text style={[styles.note, { color: textSecondary }]}>{figure.note}</Text>

      {uri ? (
        <Modal
          visible={open}
          transparent
          animationType="fade"
          presentationStyle="overFullScreen"
          onRequestClose={() => setOpen(false)}
          statusBarTranslucent>
          <View style={styles.lightbox}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.closeFigure}
              onPress={() => setOpen(false)}
              style={styles.lightboxBackdrop}
            />
            <ScrollView
              style={styles.lightboxScroll}
              contentContainerStyle={styles.lightboxContent}
              maximumZoomScale={4}
              minimumZoomScale={1}
              bouncesZoom
              horizontal={false}>
              <ScrollView
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator
                contentContainerStyle={styles.lightboxHContent}>
                <FigureImage
                  uri={uri}
                  alt={figure.alt}
                  aspectRatio={aspectRatio}
                  compact={false}
                  imageStyle={styles.lightboxImage}
                />
              </ScrollView>
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              onPress={() => setOpen(false)}
              style={({ pressed }) => [styles.closeButton, { opacity: pressed ? 0.8 : 1 }]}>
              <Text style={styles.closeButtonText}>{t.closeFigure}</Text>
            </Pressable>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

function FigureHrefButton({ href, label }: { href: string; label: string }) {
  const tint = useThemeColor({}, 'tint');
  const webProps: WebLinkProps | Record<string, never> =
    Platform.OS === 'web'
      ? { href, hrefAttrs: { target: '_blank', rel: 'noopener noreferrer' } }
      : {};

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      onPress={
        Platform.OS === 'web'
          ? undefined
          : () => {
              void Linking.openURL(href);
            }
      }
      style={({ pressed }) => [styles.hrefButton, { backgroundColor: tint, opacity: pressed ? 0.88 : 1 }]}
      {...webProps}>
      <Text style={styles.hrefButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  boxCompact: {
    flex: 1,
    minWidth: 140,
    borderRadius: 10,
    padding: 8,
    marginBottom: 0,
  },
  thumbWrap: {
    position: 'relative',
  },
  thumbPressed: {
    opacity: 0.88,
  },
  imageShell: {
    width: '100%',
    position: 'relative',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  placeholderFailed: {
    position: 'relative',
    minHeight: 72,
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  hrefButton: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  hrefButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  enlargeBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  enlargeBadgeCompact: {
    right: 4,
    bottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  enlargeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  caption: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    lineHeight: 20,
  },
  captionCompact: {
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  note: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  lightbox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    justifyContent: 'center',
  },
  lightboxBackdrop: {
    ...StyleSheet.absoluteFill,
  },
  lightboxScroll: {
    flex: 1,
    zIndex: 1,
  },
  lightboxContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 56,
    paddingBottom: 24,
  },
  lightboxHContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  lightboxImage: {
    width: 1000,
    maxWidth: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

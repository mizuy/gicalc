import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { Text, useThemeColor } from '@/components/Themed';
import { figureCreditHref, figureCreditLabel } from '@/lib/figures/credit';
import { useLocale } from '@/lib/i18n';
import { figureImageSource } from '@/lib/figures/source';
import type { ClassificationFigure as Figure } from '@/types/score';

type Props = {
  figure: Figure;
  /** 分類カード内の参考画像。出典は短い論文リンクにする */
  compact?: boolean;
};

type FigureImageProps = {
  source: ImageSourcePropType;
  sourceKey: string;
  alt: string;
  aspectRatio: number;
  compact: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  shellStyle?: StyleProp<ViewStyle>;
  /** ライトボックス等、表示領域いっぱいにフィットさせるときのピクセルサイズ */
  displaySize?: { width: number; height: number };
  lazy?: boolean;
};

function fitWithinBounds(aspectRatio: number, maxWidth: number, maxHeight: number) {
  let width = maxWidth;
  let height = width / aspectRatio;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  return { width: Math.floor(width), height: Math.floor(height) };
}

const LIGHTBOX_PADDING_TOP = 56;
const LIGHTBOX_PADDING_BOTTOM = 24;
const LIGHTBOX_PADDING_HORIZONTAL = 32;

function FigureImage({
  source,
  sourceKey,
  alt,
  aspectRatio,
  compact,
  imageStyle,
  shellStyle,
  displaySize,
  lazy = false,
}: FigureImageProps) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const { t } = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [sourceKey]);

  const webLazyProps =
    Platform.OS === 'web' && lazy
      ? ({ loading: 'lazy' } as Record<string, string>)
      : {};

  return (
    <View
      style={[
        styles.imageShell,
        displaySize
          ? { width: displaySize.width, height: displaySize.height }
          : { aspectRatio, width: '100%' },
        shellStyle,
      ]}>
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
          source={source}
          style={[
            styles.image,
            imageStyle,
            displaySize
              ? {
                  width: displaySize.width,
                  height: displaySize.height,
                  opacity: loaded ? 1 : 0,
                }
              : { aspectRatio, opacity: loaded ? 1 : 0 },
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
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const { t } = useLocale();
  const imageSource = figure.src ? figureImageSource(figure.src) : undefined;
  const sourceKey = figure.src ?? '';
  const aspectRatio = figure.aspectRatio ?? 16 / 9;
  const lightboxMaxHeight = windowHeight - LIGHTBOX_PADDING_TOP - LIGHTBOX_PADDING_BOTTOM;
  const lightboxMaxWidth = windowWidth - LIGHTBOX_PADDING_HORIZONTAL;
  const lightboxSize = fitWithinBounds(aspectRatio, lightboxMaxWidth, lightboxMaxHeight);

  const creditLabel = figureCreditLabel(figure);
  const creditHref = figureCreditHref(figure);

  return (
    <View
      style={[
        styles.box,
        compact ? styles.boxCompact : null,
        { backgroundColor: surface, borderColor: border },
      ]}>
      {imageSource ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${figure.alt}. ${t.enlargeHint}`}
          onPress={() => setOpen(true)}
          style={({ pressed }) => [styles.thumbWrap, pressed ? styles.thumbPressed : null]}>
          <FigureImage
            source={imageSource}
            sourceKey={sourceKey}
            alt={figure.alt}
            aspectRatio={aspectRatio}
            compact={compact}
            lazy
          />
          <View style={[styles.enlargeBadge, compact ? styles.enlargeBadgeCompact : null, { backgroundColor: tint }]}>
            <Text style={styles.enlargeBadgeText}>{t.enlargeHint}</Text>
          </View>
        </Pressable>
      ) : null}
      <FigureLegend text={figure.legend} compact={compact} />
      <FigureCredit label={creditLabel} href={creditHref} compact={compact} />

      {imageSource && open ? (
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
                <View>
                  <FigureImage
                    source={imageSource}
                    sourceKey={sourceKey}
                    alt={figure.alt}
                    aspectRatio={aspectRatio}
                    compact={false}
                    displaySize={lightboxSize}
                  />
                  <FigureLegend text={figure.legend} compact={false} onDark />
                  <FigureCredit label={creditLabel} href={creditHref} compact={false} onDark />
                </View>
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

function FigureLegend({
  text,
  compact,
  onDark = false,
}: {
  text?: string;
  compact: boolean;
  onDark?: boolean;
}) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();
  if (!text?.trim() || compact) return null;

  return (
    <View style={styles.legendWrap}>
      <Text
        style={[
          styles.legendLabel,
          { color: onDark ? '#E8EEF6' : textSecondary },
        ]}>
        {t.atlas.legend}
      </Text>
      <Text style={[styles.legend, onDark ? styles.legendOnDark : { color: textSecondary }]}>
        {text}
      </Text>
    </View>
  );
}

function FigureCredit({
  label,
  href,
  compact,
  onDark = false,
}: {
  label: string;
  href?: string;
  compact: boolean;
  onDark?: boolean;
}) {
  return (
    <CitationLink
      label={label}
      href={href}
      style={[
        styles.credit,
        compact ? styles.creditCompact : null,
        onDark ? styles.creditOnDark : null,
      ]}
    />
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
  legendWrap: {
    marginTop: 10,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  legend: {
    fontSize: 13,
    lineHeight: 20,
  },
  legendOnDark: {
    color: '#E8EEF6',
  },
  credit: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  creditCompact: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
  creditOnDark: {
    color: '#E8EEF6',
    marginTop: 10,
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
    ...StyleSheet.absoluteFill,
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
    justifyContent: 'center',
    minHeight: '100%',
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

import { useState } from 'react';
import * as Linking from 'expo-linking';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import { publicPath } from '@/lib/web/baseUrl';
import type { ClassificationFigure as Figure } from '@/types/score';

type Props = {
  figure: Figure;
};

type WebLinkProps = {
  href: string;
  hrefAttrs: { target: string; rel: string };
};

export function ClassificationFigure({ figure }: Props) {
  const [open, setOpen] = useState(false);
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const { t } = useLocale();
  const uri = figure.src ? publicPath(figure.src) : undefined;
  const aspectRatio = figure.aspectRatio ?? 16 / 9;

  return (
    <View style={[styles.box, { backgroundColor: surface, borderColor: border }]}>
      {uri ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${figure.alt}. ${t.enlargeHint}`}
          onPress={() => setOpen(true)}
          style={({ pressed }) => [styles.thumbWrap, pressed ? styles.thumbPressed : null]}>
          <Image
            accessibilityLabel={figure.alt}
            source={{ uri }}
            style={[styles.image, { aspectRatio }]}
            resizeMode="contain"
          />
          <View style={[styles.enlargeBadge, { backgroundColor: tint }]}>
            <Text style={styles.enlargeBadgeText}>{t.enlargeHint}</Text>
          </View>
        </Pressable>
      ) : figure.href ? (
        <FigureHrefButton href={figure.href} label={`${t.openFigure}: ${figure.hrefLabel ?? figure.caption}`} />
      ) : null}
      <Text style={styles.caption}>{figure.caption}</Text>
      <CitationLink label={`${t.source}: ${figure.source}`} pubmed={figure.pubmed} />
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
                <Image
                  accessibilityLabel={figure.alt}
                  source={{ uri }}
                  style={[styles.lightboxImage, { aspectRatio }]}
                  resizeMode="contain"
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
  thumbWrap: {
    position: 'relative',
  },
  thumbPressed: {
    opacity: 0.88,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
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

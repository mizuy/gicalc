import { Platform, type ImageSourcePropType } from 'react-native';

import { BUNDLED_FIGURES } from './bundledAssets';
import { publicPath } from '../web/baseUrl';

export function figureImageSource(src: string): ImageSourcePropType {
  if (Platform.OS !== 'web') {
    const bundled = BUNDLED_FIGURES[src];
    if (bundled) return bundled;
  }
  return { uri: publicPath(src) };
}

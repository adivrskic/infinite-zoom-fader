interface ZoomConfig {
  zoom: string;
  zoomScale: number;
  zoomTime: number;
  zoomTimingFunction: string;
  zoomMax: number;
  transitionTime: number;
}

export interface Image {
  src: string;
  alt: string;
}

export interface InfiniteZoomFaderProps {
  images: Image[];
  zoomConfig: ZoomConfig;
  children: React.ReactNode;
}

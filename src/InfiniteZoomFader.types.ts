interface ImageData {
  src: string;
  alt: string;
}

interface ImageObject {
  desktop: ImageData[];
  mobile: ImageData[];
}

export interface InfiniteZoomFaderProps {
  images: ImageObject;
  zoom: string;
  zoomMax: number;
  zoomScale: number;
  zoomTime: number;
  zoomTimingFunction: string;
  transitionTime: number;
  children: React.ReactNode;
}

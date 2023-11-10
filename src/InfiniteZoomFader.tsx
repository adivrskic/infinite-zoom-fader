import React, { useState, useEffect } from "react";
import "./InfiniteZoomFader.scss";
import { InfiniteZoomFaderProps } from "./InfiniteZoomFader.types";

const defaultProps = {
  images: [],
  zoomConfig: {
    zoom: "out",
    zoomScale: 0.5,
    zoomTime: 10,
    zoomTimingFunction: "linear",
    zoomMax: 0.25,
    transitionTime: 1,
  },
};

const InfiniteZoomFader = (props: InfiniteZoomFaderProps) => {
  const { images, zoomConfig, children } = props;
  let {
    zoom,
    zoomScale,
    zoomTime,
    zoomTimingFunction,
    zoomMax,
    transitionTime,
  } = zoomConfig;
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [switching, setSwitching] = useState(false);
  const validateProps = () => {
    if (zoomScale > 1) zoomScale = 1;
    if (zoomScale < 0) zoomScale = 0;
    if (zoomMax > 1) zoomMax = 1;
    if (zoomMax < 0) zoomMax = 0;
  };

  useEffect(() => {
    validateProps();

    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 1);

    return () => clearTimeout(timeout);
  }, []);

  const scaling =
    zoom === "in" ? 1 + zoomMax * zoomScale : 1 + zoomMax - zoomMax * zoomScale;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex) =>
        activeIndex >= images.length - 1 ? 0 : activeIndex + 1
      );

      setSwitching(true);

      const timeout = setTimeout(() => {
        setSwitching(false);
      }, transitionTime * 1000);

      return () => clearTimeout(timeout);
    }, (zoomTime - transitionTime) * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPreviousIndex(activeIndex - 1 < 0 ? images.length - 1 : activeIndex - 1);
  }, [activeIndex]);

  const shouldAnimate = (index: number) => {
    return (
      activeIndex === index ||
      (activeIndex === index + 1 && switching) ||
      (activeIndex === 0 &&
        previousIndex === images.length - 1 &&
        switching &&
        (index === 0 || index === images.length - 1))
    );
  };

  return (
    <div
      className="izf"
      style={{ ["--izf-scale" as any]: `${zoom === "out" ? 1 + zoomMax : 1}` }}
    >
      {images?.map(({ src, alt }, index) => (
        <img
          className={`izf__image 
          ${shouldAnimate(index) ? "izf__image--active " : ""}${
            zoom === "out" ? "izf__image--zoom-out " : "izf__image--zoom-in "
          }`}
          style={
            shouldAnimate(index)
              ? {
                  transition: `opacity .5s ease-in, transform ${zoomTime}s ${zoomTimingFunction}`,
                  transform: `scale(${scaling})`,
                  zIndex: `${
                    activeIndex === 0 && previousIndex === images.length - 1
                      ? images.length - index
                      : ""
                  }`,
                }
              : {}
          }
          src={src}
          key={`${src}-${index}`}
          alt={alt}
          loading="lazy"
        />
      ))}
      {children && <div className={`izf__children`}>{children}</div>}
    </div>
  );
};

InfiniteZoomFader.defaultProps = defaultProps;

export default InfiniteZoomFader;

import React, { useState, useEffect } from "react";
import { arrayOf, number, oneOf, shape, string } from "prop-types";

import { InfiniteZoomFaderProps } from "./InfiniteZoomFader.types";

import { DEFAULT_PROPS } from "./constants";
import { useScreenSize } from "./hooks";

import "./InfiniteZoomFader.scss";

const InfiniteZoomFader = (props: InfiniteZoomFaderProps) => {
  const {
    images,
    zoom,
    zoomTime,
    zoomTimingFunction,
    transitionTime,
    children,
    zoomMax,
    zoomScale,
  } = props;

  if (!images) return null;

  const isMobile = useScreenSize();
  const imageArray = isMobile ? images?.mobile : images?.desktop;

  const [loadedCount, setLoadedCount] = useState(2);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [switching, setSwitching] = useState(false);

  const getVal = (val: number) => {
    if (val < 0) return 0;
    if (val > 1) return 1;
    return val;
  };

  const max = getVal(zoomMax);
  const scale = getVal(zoomScale);
  const scaling = zoom === "in" ? 1 + max * scale : 1 + max - max * scale;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 1);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex) =>
        activeIndex >= imageArray?.length - 1 ? 0 : activeIndex + 1
      );

      setSwitching(true);
      setLoadedCount((loadedCount) =>
        loadedCount >= imageArray?.length
          ? imageArray?.length
          : (loadedCount += 1)
      );

      const timeout = setTimeout(() => {
        setSwitching(false);
      }, transitionTime * 1000);

      return () => clearTimeout(timeout);
    }, (zoomTime - transitionTime) * 1000);

    return () => clearInterval(interval);
  }, [zoomTime, transitionTime]);

  useEffect(() => {
    setPreviousIndex(
      activeIndex - 1 < 0 ? imageArray?.length - 1 : activeIndex - 1
    );
  }, [activeIndex]);

  const shouldAnimate = (index: number) => {
    return (
      activeIndex === index ||
      (activeIndex === index + 1 && switching) ||
      (activeIndex === 0 &&
        previousIndex === imageArray?.length - 1 &&
        switching &&
        (index === 0 || index === imageArray?.length - 1))
    );
  };

  return (
    <div
      className="izf"
      style={{
        ["--izf-scale" as string]: `${
          zoom === "out" ? 1 + getVal(zoomMax) : 1
        }`,
        ["--izf-max-z-index" as string]: `${imageArray?.length}`,
      }}
    >
      {imageArray?.slice(0, loadedCount)?.map(({ src, alt }, index) => (
        <img
          className={`izf__image 
            ${shouldAnimate(index) ? "izf__image--active " : ""}
            ${zoom === "out" && "izf__image--zoom-out"}
            ${zoom === "in" && "izf__image--zoom-in"} 
          }`}
          style={
            shouldAnimate(index)
              ? {
                  transition: `opacity 0.67s ${zoomTimingFunction}, transform ${zoomTime}s ${zoomTimingFunction}`,
                  transform: `scale(${scaling})`,
                  zIndex: `${
                    activeIndex === 0 &&
                    previousIndex === imageArray?.length - 1
                      ? imageArray?.length - index
                      : ""
                  }`,
                }
              : {}
          }
          src={src}
          key={`${src}-${index}`}
          alt={alt}
        />
      ))}
      {children && <div className={`izf__children`}>{children}</div>}
    </div>
  );
};

InfiniteZoomFader.defaultProps = DEFAULT_PROPS;
InfiniteZoomFader.propTypes = {
  images: shape({
    desktop: arrayOf(shape({ src: string, alt: string })),
    mobile: arrayOf(shape({ src: string, alt: string })),
  }).isRequired,
  zoom: oneOf(["in", "out"]),
  zoomMax: (props: InfiniteZoomFaderProps) => {
    if (props.zoomScale < 0 || props.zoomScale > 1) {
      return new Error(
        "Invalid value supplied as zoomMax: must be a value between 0 and 1"
      );
    }
  },
  zoomScale: (props: InfiniteZoomFaderProps) => {
    if (props.zoomScale < 0 || props.zoomScale > 1) {
      return new Error(
        "Invalid value supplied as zoomScale: must be a value between 0 and 1"
      );
    }
  },
  zoomTime: number,
  zoomTimingFunction: oneOf([
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    RegExp(
      /cubic-bezier\\(([0-9]*\\.?[0-9]+),\\s*([0-9]*\\.?[0-9]+),\\s*([0-9]*\\.?[0-9]+),\\s*([0-9]*\\.?[0-9]+)\\)/
    ),
  ]),
  transitionTime: number,
};

export default InfiniteZoomFader;

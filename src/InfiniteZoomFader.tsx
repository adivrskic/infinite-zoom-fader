import React, { useState, useEffect } from "react";
import { arrayOf, number, oneOf, shape, string } from "prop-types";
import "./InfiniteZoomFader.scss";
import { InfiniteZoomFaderProps } from "./InfiniteZoomFader.types";
import { MOBILE_WIDTH, DEFAULT_PROPS } from "./constants";

const InfiniteZoomFader = (props: InfiniteZoomFaderProps) => {
  const {
    images,
    zoom,
    zoomTime,
    zoomTimingFunction,
    transitionTime,
    children,
  } = props;
  let { zoomMax, zoomScale } = props;

  if (!images) return null;

  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= MOBILE_WIDTH;
  const imageArray = isMobile ? images?.mobile : images?.desktop;

  const [loadedCount, setLoadedCount] = useState(2);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [switching, setSwitching] = useState(false);
  const scaling =
    zoom === "in" ? 1 + zoomMax * zoomScale : 1 + zoomMax - zoomMax * zoomScale;

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
  }, []);

  useEffect(() => {
    setPreviousIndex(
      activeIndex - 1 < 0 ? imageArray?.length - 1 : activeIndex - 1
    );
  }, [activeIndex]);

  useEffect(() => {
    if (zoomScale < 0) zoomScale = 0;
    if (zoomScale > 1) zoomScale = 1;
    if (zoomMax < 0) zoomMax = 0;
    if (zoomMax > 1) zoomMax = 1;
  }, [zoomScale, zoomMax]);

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
        ["--izf-scale" as any]: `${zoom === "out" ? 1 + zoomMax : 1}`,
        ["--izf-max-z-index" as any]: `${imageArray?.length}`,
      }}
    >
      {imageArray?.slice(0, loadedCount)?.map(({ src, alt }, index) => (
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

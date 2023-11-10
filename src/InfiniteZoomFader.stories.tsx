import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import InfiniteZoomFader from "./InfiniteZoomFader";

export default {
  title: "Infinite Zoom Fader Demo",
  component: InfiniteZoomFader,
} as ComponentMeta<typeof InfiniteZoomFader>;

const Template: ComponentStory<typeof InfiniteZoomFader> = (args) => (
  <InfiniteZoomFader {...args} />
);

const images = [
  {
    src: "/images/car1.jpg",
    alt: "car 1",
  },
  {
    src: "/images/car2.jpg",
    alt: "car 2",
  },
  {
    src: "/images/car3.jpg",
    alt: "car 3",
  },
  {
    src: "/images/car4.jpg",
    alt: "car 4",
  },
  {
    src: "/images/car5.jpg",
    alt: "car 5",
  },
  {
    src: "/images/car6.jpg",
    alt: "car 6",
  },
  {
    src: "/images/car7.jpg",
    alt: "car 7",
  },
  {
    src: "/images/car8.jpg",
    alt: "car 8",
  },
  {
    src: "/images/car9.jpg",
    alt: "car 9",
  },
  {
    src: "/images/car10.jpg",
    alt: "car 10",
  },
];

export const Demo = Template.bind({});
Demo.args = {
  images,
  zoomConfig: {
    zoom: "in",
    zoomScale: 0.125,
    zoomTime: 12,
    zoomMax: 0.25,
    transitionTime: 1,
  },
};

export const DemoWithChildren = Template.bind({});
DemoWithChildren.args = {
  images,
  zoomConfig: {
    zoom: "out",
    zoomScale: 0.125,
    zoomTime: 12,
    zoomMax: 0.25,
    transitionTime: 1,
  },
  children: [
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "#fff", fontSize: "36px", margin: 0 }}>
        Overlay Added
      </h1>
      <p style={{ color: "#fff" }}>
        Add child elements here to display them with an overlay
      </p>
    </div>,
  ],
};

# Infinite Zoom Fader

A lightweight, dynamic and configurable image slideshow React component.

## Demo Site

[Demo Site](https://scintillating-malasada-3227fb.netlify.app/)

## Installation

`npm i infinite-zoom-fader`

`yarn add infinite-zoom-fader`

Import the component into your project

`import { InfiniteZoomFader } from "infinite-zoom-fader";`

## Example

```
import { InfiniteZoomFader } from "infinite-zoom-fader";
import { images } from "./images";

const App = () => {
  return (
    <InfiniteZoomFader
      images={images}
      zoom: "out",
      zoomScale: 0.5,
      zoomTime: 10,
      zoomMax: 0.25,
      zoomTimingFunction: 'linear',
      transitionTime: 1
    />
  );
};

export default App;
```

## Example With Child Elements

Add any elements as children to display them on the slideshow with an overlay.

```
import { InfiniteZoomFader } from "infinite-zoom-fader";
import { images } from "./images";

const App = () => {
  return (
    <InfiniteZoomFader
      images={images}
      zoom: "out",
      zoomScale: 0.5,
      zoomTime: 10,
      zoomMax: 0.25,
      zoomTimingFunction: 'linear',
      transitionTime: 1
    >
      <div>
        <h1>Header</h1>
        <p>Subheader</p>
        <button>Call To Action</button>
      </div>
    </InfiniteZoomFader>
  );
};

export default App;
```

## Props

`images`: (Required) An object containing arrays of your desktop and mobile image sources and alts

`zoom`: 'in' or 'out'

`zoomMax`: Number Between 0 and 1

`zoomScale`: Number Between 0 and 1

`zoomTime`: Number

`zoomTimingFunction`: CSS Timing Function or Cubic Bezier Function

`transitionTime`: Number

## Images

Structure your images object with either desktop images, mobile images, or both. Mobile images will display if the viewport is smaller, and desktop images will display if the viewport is larger.

```
const images = {
  desktop: [
    {
      src: '/images/image1Src',
      alt: 'Image 1 alt
    }
    ...
  ],
  mobile: [
    {
      src: '/images/mobileImage1Src',
      alt: 'Mobile image 1 alt
    }
    ...
  ]
}
```

## Default Props

The component uses predefined config props by default to get you up and running quickly.
`zoom`: 'out'

`zoomMax`: 0.25

`zoomScale`: 0.5

`zoomTime`: 10

`zoomTimingFunction`: 'linear'

`transitionTime`: 1

## License

MIT

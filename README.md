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
  const zoomConfig = {
    zoom: "out",
    zoomScale: 0.5,
    zoomTime: 10,
    zoomMax: 0.25,
    zoomTimingFunction: 'linear',
    transitionTime: 1,
  };

  return (
    <InfiniteZoomFader images={images} zoomConfig={...zoomConfig} />
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
  const zoomConfig = {
    zoom: "out",
    zoomScale: 0.5,
    zoomTime: 10,
    zoomMax: 0.25,
    zoomTimingFunction: 'linear',
    transitionTime: 1,
  };

  return (
    <InfiniteZoomFader images={images} zoomConfig={...zoomConfig}>
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

`images`: An array of objects containing your image sources and alt texts.

`zoomConfig`: An object containing the component configuration.

`zoomConfig.zoom`: 'in' or 'out'

`zoomConfig.zoomMax`: Number Between 0 and 1

`zoomConfig.zoomScale`: Number Between 0 and 1

`zoomConfig.zoomTime`: Number

`zoomConfig.zoomTimingFunction`: CSS Timing Function or Cubic Bezier Function

`zoomConfig.transitionTime`: Number

## License

MIT

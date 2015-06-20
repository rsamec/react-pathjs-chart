React Component Starter
=======================

These component offers react components - charts (Pie,SmoothLine) and other components (Tree) using [paths-js](https://github.com/andreaferretti/paths-js).

All credits go to [paths-js-react-demo](https://github.com/andreaferretti/paths-js-react-demo), it is based on clone of these examples from [path-js](https://github.com/andreaferretti/paths-js-react-demo) and is extended so that it is easier to use it.

+   instead of accessor function you can use string key to determine the accessor key in data
+   wrapped to be used by package managers (npm, bower) or standalone package

## Demo & Examples

[Live demo](http://rsamec.github.io/react-pathjs-chart/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use this component is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-pathjs-chart.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-pathjs-chart --save
```


## Usage



```
import {Pie,Tree,SmoothLine} from 'react-pathjs-chart';

<Pie data={ countries } color='#9ac7f7' r={ 60 } R={ 140 } accessorKey="population"  />
<SmoothLine data={stockData} xKey="date" yKey="value" />
<Tree data={treeData} />

```

### Properties



### Notes



### License

MIT. Copyright (c) 2015 Roman Samec


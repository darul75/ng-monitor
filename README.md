ng-monitor [![NPM version](https://badge.fury.io/js/ng-monitor.png)](http://badge.fury.io/js/ng-monitor) [![Build Status](https://travis-ci.org/darul75/ng-monitor.png?branch=master)](https://travis-ci.org/darul75/ng-monitor) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/ng-monitor/counters/views.png)](https://sourcegraph.com/github.com/darul75/ng-monitor)
=====================

Angular directive monitoring with friendly funky status display.

Canvas mandatory.

Why
------------

Play with canvas, get simple back-office status display (server, disk usage..)

Demo
------------
http://darul75.github.io/ng-monitor/

How to use it
-------------

You should already have script required for Angular.

```html
<script type="text/javascript" src="angular.min.js"></script>
```

to the list above, you should add:

```html
<script type="text/javascript" src="ng-monitor.min.js"></script>
```

Inject `ngMonitor` in your application module:

```javascript
angular.module('myApp', ['ngMonitor']);
```

and then just add 

```html
<canvas monitor id='2' w='300' h='200'></canvas>
```

and broadcast some events of that kind with percentage value:

```javascript
$scope.$broadcast('ng-monitor', {prc: val});
// val: 50 for 50%...

```

### Options

TODO: animation improves ( faster, slower...)
...


Installation
------------

Using npm:

```
npm install ng-monitor

```


How to use it
-------------


### Build

You can run the tests by running

```
npm install
```
or
```
npm test
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli
```

## License

The MIT License (MIT)

Copyright (c) 2014 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.





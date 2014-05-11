ng-notification [![NPM version](https://badge.fury.io/js/ng-notification.png)](http://badge.fury.io/js/ng-notification) [![Build Status](https://travis-ci.org/darul75/ng-notification.png?branch=master)](https://travis-ci.org/darul75/ng-notification) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/ng-notification/counters/views.png)](https://sourcegraph.com/github.com/darul75/ng-notification)
=====================

Simple angular notification directive Bootstrap 3 style. 

It includes a small CSS3 effect, so you may guess IE6 do not like it.

*Bootstrap version 3.*

Why
------------

I had to test some CSS3 instructions and play with it.

Then AngularStrap or native Boostrap alert messages are not very friendly, popup too big, this one looks less intrusive.

This directive is fully based on angular event broadcasting, you trigger event => directive catch it.

Demo
------------
http://darul75.github.io/ng-notification/

How to use it
-------------

You should already have script required for Angular.

```html
<script type="text/javascript" src="angular.min.js"></script>
```

to the list above, you should add:

```html
<link rel="stylesheet" type="text/css" href="ng-notification.min.css">
<script type="text/javascript" src="ng-notification.min.js"></script>
```

Inject `ngNotification` in your application module:

```javascript
angular.module('myApp', ['ngNotification']);
```

and then just add 

```html
<notification></notification>
```

and broadcast some events to display notifications when needed

```javascript
$scope.$broadcast('notification', {type: 'info', msg:'This is ' + type + ' and it can be long message why not'});
// possible type field values are : 'primary','success', 'info', 'warning', 'danger'

```

### Options

TODO


Installation
------------

Using npm:

```
npm install ng-notification

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





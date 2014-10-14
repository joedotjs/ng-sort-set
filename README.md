ng-sort-set
=========

<img src="http://i.imgur.com/XUVWcyt.gif" />

**ngSortSet** is a small AngularJS module that provides an object that simplifies managing sort predicates used by AngularJS' built-in *orderBy* filter.

This object was built specifically for managing ASC and DESC in custom tables more easily.

## Install:
```bash
$ bower install ng-sort-set
```
```js
var myApp = angular.module('MyApp', ['ngSortSet']);
```

## Usage:
- Inject the `SortSet` constructor and create a new instance.
- The constructed object will have a `.sort` array containing your sort predicates.
- `.set` method takes a string that will be modified as a predicate. Depending on prefix, it may be added, modified or removed from the sort array.

```js
myApp.controller('MyController', function (SortSet) {
  var sorter = new SortSet();
  sorter.sort;             // []
  sorter.set('firstName'); // sorter.sort is ['+firstName']
  sorter.set('firstName'); // sorter.sort is ['-firstName']
  sorter.set('firstName'); // sorter.sort is []
});
```

- If another string is supplied to the set function, it will take precedence to previously set predicates.

```js
sorter.sort;             // sorter.sort is ['+firstName']
sorter.set('lastName');  // sorter.sort is ['+lastName', '+firstName']
sorter.set('firstName'); // sorter.sort is ['-firstName', '+lastName']
```

Refer to the [demo code](https://github.com/joedotjs/ng-sort-set/blob/gh-pages/demo/index.html#L62) to an applied use.

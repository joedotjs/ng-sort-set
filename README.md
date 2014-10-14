ng-sort-set
=========

<img src="http://i.imgur.com/XUVWcyt.gif" />

**ngSortSet** is a small AngularJS module that provides an object that simplifies managing sort predicates used by AngularJS' built-in *orderBy* filter.

This object was built with managing ASC and DESC in custom tables more easily in mind.

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
  sorter.set('firstName'); // ['+firstName']
  sorter.set('firstName'); // ['-firstName']
  sorter.set('firstName'); // []
});
```

- If another strings are supplied to the set function, they will take precedence to previously set predicates.

```js
sorter.sort; // ['+firstName']
sorter.set('lastName'); // ['+lastName', '+firstName']
sorter.set('firstName'); // ['-firstName', '+lastName']
```

Refer to the [demo code](https://github.com/joedotjs/ng-sort-set/blob/gh-pages/demo/index.html#L62) to an applied use.

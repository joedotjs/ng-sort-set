ng-sort-set
=========

<img src="http://i.imgur.com/XUVWcyt.gif" />

**ngSortSet** is a small AngularJS module that provides an object that simplifies managing sort predicates used by AngularJS' built-in *orderBy* filter.

This object was built specifically for managing ASC and DESC in custom tables more easily.

Check out the [live demo](http://joedotjs.github.io/ng-sort-set/).

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

Refer to the [demo code](https://github.com/joedotjs/ng-sort-set/blob/gh-pages/demo/index.html#L62) for an example of applied use.

# Methods:

###set(key, [order])
- Modifies the sort array in regards to the given key.
- If the predicate does not exist, it will be added with `+` and take precedence.
- If the predicate exists as `+`, it will toggle to `-` and take precedence.
- If the predicate exists as `-`, it will be removed.
- If the **order** ('asc', 'desc' or null) parameter is defined, it will set the predicate to that order.

###remove(key)
- Removes predicate from sort array.

###empty()
- Removes all predicates from sort array.

###isAsc(key) / isDesc(key)
- returns a boolean signifying if the passed in key is ascending (+) or descending (-). Will return `false` if the predicate does not exist.

###querySort(key)
- returns `'asc'`, `'desc'` or `null` signifying if the key is +, -, or does not exist.

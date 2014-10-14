(function (window, document) {

'use strict';
var mod = window.angular.module('ngSortSet', []);

// Private methods.
var addKeyAsAsc = function (key) {
  this.remove(key);
  this.sort.unshift('+' + key);
};

var addKeyAsDesc = function (key) {
  this.remove(key);
  this.sort.unshift('-' + key);
};

var setKeyWithOrder = function (key, order) {
  if (order === null) {
    this.remove(key);
  } else if (order === 'asc') {
    addKeyAsAsc.call(this, key);
  } else if (order === 'desc') {
    addKeyAsDesc.call(this, key);
  }
};

var setKeyWithoutOrder = function (key) {
  var currentSort = this.querySort(key);
  if (!currentSort) {
      addKeyAsAsc.call(this, key);
  } else if (currentSort === 'asc') {
      addKeyAsDesc.call(this, key);
  } else if (currentSort === 'desc') {
      this.remove(key);
  }
};

mod.factory('SortSet', function () {

  var SortSet = function () {
    this.sort = [];
  };

  SortSet.prototype.set = function (key, order) {
    if (typeof order !== 'undefined') {
      setKeyWithOrder.call(this, key, order);
    } else {
      setKeyWithoutOrder.call(this, key);
    }
  };

  SortSet.prototype.empty = function () {
    this.sort.splice(0, this.sort.length);
  };

  SortSet.prototype.getIndex = function (key) {

    var ascIndex = this.sort.indexOf('+' + key);
    if (ascIndex !== -1) {
      return ascIndex;
    }

    var descIndex = this.sort.indexOf('-' + key);
    if (descIndex !== -1) {
      return descIndex;
    }

    return -1;

  };

  SortSet.prototype.remove = function (key) {
    var index = this.getIndex(key);
    if (index !== -1) {
      this.sort.splice(index, 1);
    }
  };

  SortSet.prototype.isAsc = function (key) {
    return this.sort.indexOf('+' + key) !== -1;
  };

  SortSet.prototype.isDesc = function (key) {
    return this.sort.indexOf('-' + key) !== -1;
  };

  SortSet.prototype.querySort = function (key) {
    if (this.isAsc(key)) return 'asc';
    if (this.isDesc(key)) return 'desc';
    return null;
  };

  return SortSet;

});

})(window, document);

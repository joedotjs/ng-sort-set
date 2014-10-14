describe('Sort Manager', function () {

  beforeEach(module('ngSortSet'));

  var sortSet;
  beforeEach(inject(function (SortSet) {
    sortSet = new SortSet();
  }));

  it('should have an array on the sort key', function () {
    expect(sortSet.sort).to.be.an('array');
  });

  describe('queries', function () {

    beforeEach(function () {
      sortSet.sort = ['+name', '-FavoriteFood', '+age'];
    });

    describe('isAsc', function () {
      it('should work correctly', function () {
        expect(sortSet.isAsc('name')).to.be.ok;
        expect(sortSet.isAsc('age')).to.be.ok;
        expect(sortSet.isAsc('FavoriteFood')).to.be.not.ok;
        expect(sortSet.isAsc('Missing')).to.be.not.ok;
      });
    });

    describe('isDesc', function () {
      it('should work correctly', function () {
        expect(sortSet.isDesc('name')).to.be.not.ok;
        expect(sortSet.isDesc('age')).to.be.not.ok;
        expect(sortSet.isDesc('FavoriteFood')).to.be.ok;
        expect(sortSet.isDesc('Missing')).to.be.not.ok;
      });
    });

    describe('querySort', function () {
      it('should work correctly', function () {
        expect(sortSet.querySort('name')).to.be.equal('asc');
        expect(sortSet.querySort('age')).to.be.equal('asc');
        expect(sortSet.querySort('FavoriteFood')).to.be.equal('desc');
        expect(sortSet.querySort('Missing')).to.be.equal(null);
      });
    });

  });

  describe('remove', function () {

    beforeEach(function () {
      sortSet.sort = ['+name', '-age', '+FavoriteFood'];
    });

    it('should work correctly', function () {
      sortSet.remove('name');
      expect(sortSet.sort).to.be.deep.equal(['-age', '+FavoriteFood']);
      sortSet.remove('FavoriteFood');
      expect(sortSet.sort).to.be.deep.equal(['-age']);
    });

  });

  describe('set method', function () {

    describe('without supplied order', function () {

      it('should add key as asc if it does not exist', function () {
        sortSet.set('name');
        expect(sortSet.sort[0]).to.be.equal('+name');
      });

      it('should switch key to desc if it exists as asc', function () {
        sortSet.sort = ['+name'];
        sortSet.set('name');
        expect(sortSet.sort[0]).to.be.equal('-name');
      });

      it('should remove key it exists as desc', function () {
        sortSet.sort = ['-name'];
        sortSet.set('name');
        expect(sortSet.sort[0]).to.be.equal(undefined);
      });

      it('should always set key as first element in array', function () {
        sortSet.sort = ['+name'];
        sortSet.set('age');
        expect(sortSet.sort[0]).to.be.equal('+age');
        sortSet.set('name');
        expect(sortSet.sort[0]).to.be.equal('-name');
      });

    });

    describe('with supplied order', function () {

      it('should set that key with desc', function () {
        sortSet.set('name', 'desc');
        expect(sortSet.sort[0]).to.be.equal('-name');
      });

      it('should set that key with asc', function () {
        sortSet.sort = ['-name'];
        sortSet.set('name', 'asc');
        expect(sortSet.sort[0]).to.be.equal('+name');
      });

      it('should remove that key with null', function () {
        sortSet.sort = ['+name'];
        sortSet.set('name', null);
        expect(sortSet.sort.length).to.be.equal(0);
      });

    });

  });

  describe('empty', function () {
    it('should clear out the array', function () {
      sortSet.sort = ['+name', '-FavoriteFood', '+age'];
      sortSet.empty();
      expect(sortSet.sort).to.be.deep.equal([]);
    });
  });

});

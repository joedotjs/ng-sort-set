describe('Sort Manager', function () {

  beforeEach(module('ngSorter'));

  var sorter;
  beforeEach(inject(function (Sorter) {
    sorter = new Sorter();
  }));

  it('should have an array on the sort key', function () {
    expect(sorter.sort).to.be.an('array');
  });

  describe('queries', function () {

    beforeEach(function () {
      sorter.sort = ['+name', '-FavoriteFood', '+age'];
    });

    describe('isAsc', function () {
      it('should work correctly', function () {
        expect(sorter.isAsc('name')).to.be.ok;
        expect(sorter.isAsc('age')).to.be.ok;
        expect(sorter.isAsc('FavoriteFood')).to.be.not.ok;
        expect(sorter.isAsc('Missing')).to.be.not.ok;
      });
    });

    describe('isDesc', function () {
      it('should work correctly', function () {
        expect(sorter.isDesc('name')).to.be.not.ok;
        expect(sorter.isDesc('age')).to.be.not.ok;
        expect(sorter.isDesc('FavoriteFood')).to.be.ok;
        expect(sorter.isDesc('Missing')).to.be.not.ok;
      });
    });

    describe('querySort', function () {
      it('should work correctly', function () {
        expect(sorter.querySort('name')).to.be.equal('asc');
        expect(sorter.querySort('age')).to.be.equal('asc');
        expect(sorter.querySort('FavoriteFood')).to.be.equal('desc');
        expect(sorter.querySort('Missing')).to.be.equal(null);
      });
    });

  });

  describe('remove', function () {

    beforeEach(function () {
      sorter.sort = ['+name', '-age', '+FavoriteFood'];
    });

    it('should work correctly', function () {
      sorter.remove('name');
      expect(sorter.sort).to.be.deep.equal(['-age', '+FavoriteFood']);
      sorter.remove('FavoriteFood');
      expect(sorter.sort).to.be.deep.equal(['-age']);
    });

  });

  describe('set method', function () {

    describe('without supplied order', function () {

      it('should add key as asc if it does not exist', function () {
        sorter.set('name');
        expect(sorter.sort[0]).to.be.equal('+name');
      });

      it('should switch key to desc if it exists as asc', function () {
        sorter.sort = ['+name'];
        sorter.set('name');
        expect(sorter.sort[0]).to.be.equal('-name');
      });

      it('should remove key it exists as desc', function () {
        sorter.sort = ['-name'];
        sorter.set('name');
        expect(sorter.sort[0]).to.be.equal(undefined);
      });

      it('should always set key as first element in array', function () {
        sorter.sort = ['+name'];
        sorter.set('age');
        expect(sorter.sort[0]).to.be.equal('+age');
        sorter.set('name');
        expect(sorter.sort[0]).to.be.equal('-name');
      });

    });

    describe('with supplied order', function () {

      it('should set that key with desc', function () {
        sorter.set('name', 'desc');
        expect(sorter.sort[0]).to.be.equal('-name');
      });

      it('should set that key with asc', function () {
        sorter.sort = ['-name'];
        sorter.set('name', 'asc');
        expect(sorter.sort[0]).to.be.equal('+name');
      });

      it('should remove that key with null', function () {
        sorter.sort = ['+name'];
        sorter.set('name', null);
        expect(sorter.sort.length).to.be.equal(0);
      });

    });

  });

  describe('empty', function () {
    it('should clear out the array', function () {
      sorter.sort = ['+name', '-FavoriteFood', '+age'];
      sorter.empty();
      expect(sorter.sort).to.be.deep.equal([]);
    });
  });

});

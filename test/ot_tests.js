describe("ot", function() {

  describe("#apply", function() {

    describe("traversal", function() {

      it("should traverse deep objects", function() {
        var state    = {a: {b: {c: 0}}};
        var op       = ["na", ["a", "b", "c"], [1]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({a: {b: {c: 1}}});
      });

      it("should traverse event multiple key object", function() {
        var state    = {a: 0, b: 2};
        var op       = ["na", ["b"], [2]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({a: 0, b: 4});
      });

      it("should traverse complex objects", function() {
        var state    = {a: [1, 2, {c: 1}], b: 3};
        var op       = ["na", ["a", 2, "c"], [2]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({a: [1, 2, {c: 3}], b: 3});
      });

    });

    describe("na", function() {

      it("should add a value to a int", function() {
        var state    = {x: 0};
        var op       = ["na", ["x"], [1]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({x: 1});
      });

      it("should add a value to a float", function() {
        var state    = {x: 0.25};
        var op       = ["na", ["x"], [1.25]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({x: 1.50});
      });

    });

    describe("si", function() {

      it("should append a string", function() {
        var state    = {x: "abc"};
        var op       = ["si", ["x"], ["def", 3]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({x: "abcdef"});
      });

      it("should prepend a string", function() {
        var state    = {x: "abc"};
        var op       = ["si", ["x"], ["def", 0]];
        var newState = ot.apply(state, op);

        expect(newState).to.eql({x: "defabc"});
      });

    });

  });

});
(function(globalScope) {

  var ot = {

    apply: function(state, op) {
      var type = op[0];
      var path = op[1];
      var opts = op[2];

      if (path.length !== 0) {
        var key = path[0];
        path = path.slice(1);

        state[key] = ot.apply(state[key], [type, path, opts]);
        return state;
      }

      switch (type) {
      case "na":
        return ot._apply_na(state, opts[0]);
      };
    },

    _apply_na: function(state, value) {
      return state + value;
    }

  };

  globalScope.ot = ot;
}(window));

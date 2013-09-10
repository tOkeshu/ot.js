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
      case "si":
        return ot._apply_si(state, opts[0], opts[1]);
      case "sd":
        return ot._apply_sd(state, opts[0], opts[1]);
      };
    },

    _apply_na: function(state, value) {
      return state + value;
    },

    _apply_si: function(state, value, offset) {
      var prefix = state.slice(0, offset);
      var suffix = state.slice(offset);
      return prefix + value + suffix;
    },

    _apply_sd: function(state, value, offset) {
      var prefix = state.slice(0, offset);
      var string = state.slice(offset, offset + value.length);
      var suffix = state.slice(offset + value.length);
      return prefix + suffix;
    },


  };

  globalScope.ot = ot;
}(window));

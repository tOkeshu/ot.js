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

    transform: function(toTrOp, op) {
      var type = op[0];

      switch (type) {
      case "si":
        return ot._transform_by_si(toTrOp, op);
      case "sd":
        return ot._transform_by_sd(toTrOp, op);
      };
    },

    _transform_by_si: function(op2, op1) {
      var type      = op2[0];
      var path      = op2[1];
      var newString = op2[2][0];
      var index     = op2[2][1];
      var oldString = op1[2][0];
      var shift     = op1[2][1];

      if (index >= shift)
        return [type, path, [newString, index + oldString.length]];
      return op2;
    },

    _transform_by_sd: function(op2, op1) {
      var type      = op2[0];
      var path      = op2[1];
      var newString = op2[2][0];
      var index     = op2[2][1];
      var oldString = op1[2][0];
      var shift     = op1[2][1];

      if (index >= shift)
        return [type, path, [newString, index - oldString.length]];
      return op2;
    }
  };

  globalScope.ot = ot;
}(window));

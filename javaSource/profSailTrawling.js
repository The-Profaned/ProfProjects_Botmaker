var LOG_COLOR_GRAY = {
  r: 128,
  g: 128,
  b: 128
};
var LOG_COLOR_DEFAULT = LOG_COLOR_GRAY;
var logger = (state, type, source, message, color) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  var printToLog = () => {
    var chosenColor = LOG_COLOR_DEFAULT;
    log.printRGB(logMessage, chosenColor.r, chosenColor.g, chosenColor.b);
  };
  if (type === 'all') log.printGameMessage(logMessage);
  if (!state) {
    if (type === 'all') {
      printToLog();
    }
    return;
  }
  if (type === 'all' || type === 'debug' && state.debugEnabled) {
    printToLog();
  }
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function createUi(_state) {}

var stateDebugger = function stateDebugger(state) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var recurse = (object, pfx) => {
    for (var _i = 0, _Object$entries = Object.entries(object); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      var type = _typeof(value);
      if (type === 'string' || type === 'number' || type === 'boolean') {
        logger(state, 'debug', 'stateDebugger', "".concat(pfx).concat(key, ": ").concat(String(value)));
      } else if (Array.isArray(value)) {
        logger(state, 'debug', 'stateDebugger', "".concat(pfx).concat(key, " Length: ").concat(value.length));
      } else if (type === 'object' && value !== null) {
        recurse(value, "".concat(pfx).concat(key, "."));
      }
    }
  };
  recurse(state, prefix);
};

var timeoutManager = {
  conditions: [],
  globalFallback: undefined,
  globalFallbackThreshold: 60,
  globalTicksWaiting: 0,
  add(_ref) {
    var state = _ref.state,
      conditionFunction = _ref.conditionFunction,
      maxWait = _ref.maxWait,
      onFail = _ref.onFail,
      _ref$initialTimeout = _ref.initialTimeout,
      initialTimeout = _ref$initialTimeout === void 0 ? 0 : _ref$initialTimeout;
    var failCallback = typeof onFail === 'string' ? () => logger(state, 'all', 'Timeout', onFail) : onFail;
    this.conditions.push({
      conditionFunction,
      maxWait,
      ticksWaited: 0,
      ticksDelayed: initialTimeout,
      onFail: failCallback
    });
  },
  tick() {
    this.conditions = this.conditions.filter(condition => {
      if (condition.ticksDelayed > 0) {
        condition.ticksDelayed--;
        return true;
      }
      if (condition.conditionFunction()) return false;
      condition.ticksWaited++;
      if (condition.ticksWaited >= condition.maxWait) {
        var _condition$onFail;
        (_condition$onFail = condition.onFail) === null || _condition$onFail === void 0 || _condition$onFail.call(condition);
        return false;
      }
      return true;
    });
    if (this.conditions.length === 0) {
      this.globalTicksWaiting++;
      if (this.globalFallback && this.globalTicksWaiting >= this.globalFallbackThreshold) {
        this.globalFallback();
        this.globalTicksWaiting = 0;
      }
    } else {
      this.globalTicksWaiting = 0;
    }
  },
  isWaiting() {
    return this.conditions.length > 0;
  }
};

var gameTick = state => {
  try {
    if (state.debugEnabled && state.debugFullState) {
      logger(state, 'debug', 'onGameTick', "Script game tick ".concat(state.gameTick, " ----------------"));
      stateDebugger(state);
    }
    state.gameTick++;
    if (state.timeout > 0) {
      state.timeout--;
      return false;
    }
    timeoutManager.tick();
    if (timeoutManager.isWaiting()) return false;
  } catch (error) {
    var fatalMessage = error.toString();
    logger(state, 'all', 'Script', fatalMessage);
    handleFailure(state, 'gameTick', fatalMessage);
    return false;
  }
  return true;
};
var onFailures = (state, failureLocation, failureMessage, failureResetState) => {
  var failureKey = "".concat(failureLocation, " - ").concat(failureMessage);
  logger(state, 'debug', 'onFailures', failureMessage);
  state.failureCounts[failureKey] = state.lastFailureKey === failureKey ? (state.failureCounts[failureKey] || 1) + 1 : 1;
  state.lastFailureKey = failureKey;
  state.failureOrigin = failureKey;
  if (state.failureCounts[failureKey] >= 3) {
    logger(state, 'all', 'Script', "Fatal error: \"".concat(failureKey, "\" occured 3x in a row."));
    bot.terminate();
    return;
  }
};
var handleFailure = (state, failureLocation, failureMessage, failureResetState) => {
  onFailures(state, failureLocation, failureMessage);
};
var endScript = state => {
  bot.breakHandler.setBreakHandlerStatus(false);
  if (state !== null && state !== void 0 && state.scriptName) {
    log.printGameMessage("Termination of ".concat(state.scriptName, "."));
  } else {
    log.printGameMessage('Termination of script.');
  }
  bot.walking.webWalkCancel();
  bot.events.unregisterAll();
};

var state = {
  debugEnabled: true,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  scriptInitalized: false,
  scriptName: 'profSailTrawling',
  uiCompleted: false,
  timeout: 0,
  gameTick: 0,
  subState: ''
};
function onStart() {
  try {
    createUi(state);
    logger(state, 'all', 'script', "".concat(state.scriptName, " started."));
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
}
function onGameTick() {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitalized) notifyScriptInitialized();
      state.scriptInitalized = true;
    } else {
      return;
    }
    if (!gameTick(state)) return;
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'start_state') bot.breakHandler.setBreakHandlerStatus(true);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
}
function notifyScriptInitialized() {
  log.printGameMessage('Script initialized.');
}
function onEnd() {
  logger(state, 'all', 'script', "".concat(state.scriptName, " ended."));
  endScript(state);
}
function stateManager() {
  logger(state, 'debug', 'stateManager', "".concat(state.mainState));
  switch (state.mainState) {
    case 'start_state':
      {
        break;
      }
    case 'next_state':
      {
        break;
      }
    default:
      {
        state.mainState = 'start_state';
        break;
      }
  }
}


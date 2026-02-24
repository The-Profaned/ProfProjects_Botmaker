function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
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
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
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

var LOG_COLOR_GRAY = {
  r: 128,
  g: 128,
  b: 128
};
var LOG_COLOR_PINK = {
  r: 239,
  g: 71,
  b: 111
};
var LOG_COLOR_CORAL = {
  r: 247,
  g: 140,
  b: 107
};
var LOG_COLOR_GOLD = {
  r: 255,
  g: 209,
  b: 102
};
var LOG_COLOR_EMERALD = {
  r: 6,
  g: 214,
  b: 160
};
var LOG_COLOR_BLUE = {
  r: 17,
  g: 138,
  b: 178
};
var LOG_COLOR_TEAL = {
  r: 7,
  g: 59,
  b: 76
};
var LOG_COLOR_DEFAULT = LOG_COLOR_GRAY;
var LOG_COLOR = {
  GRAY: LOG_COLOR_GRAY,
  PINK: LOG_COLOR_PINK,
  CORAL: LOG_COLOR_CORAL,
  GOLD: LOG_COLOR_GOLD,
  EMERALD: LOG_COLOR_EMERALD,
  BLUE: LOG_COLOR_BLUE,
  TEAL: LOG_COLOR_TEAL,
  DEFAULT: LOG_COLOR_DEFAULT
};
var logger = (state, type, source, message, color) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  var printToLog = () => {
    var chosenColor = color !== null && color !== void 0 ? color : LOG_COLOR_DEFAULT;
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

var ItemID = net.runelite.api.ItemID;

({
  boxTrap: ItemID.BOX_TRAP,
  gamesNecklace1: ItemID.GAMES_NECKLACE1,
  gamesNecklace2: ItemID.GAMES_NECKLACE2,
  gamesNecklace3: ItemID.GAMES_NECKLACE3,
  gamesNecklace4: ItemID.GAMES_NECKLACE4,
  gamesNecklace5: ItemID.GAMES_NECKLACE5,
  gamesNecklace6: ItemID.GAMES_NECKLACE6,
  gamesNecklace7: ItemID.GAMES_NECKLACE7,
  gamesNecklace8: ItemID.GAMES_NECKLACE8
});
({
  tBow: ItemID.TWISTED_BOW,
  bowfa: ItemID.BOW_OF_FAERDHINEN,
  bowfac: ItemID.BOW_OF_FAERDHINEN_C,
  blowpipe: ItemID.TOXIC_BLOWPIPE,
  rcbow: ItemID.RUNE_CROSSBOW
});
({
  normalDelay: {
    item: {
      monkFish: ItemID.MONKFISH,
      shark: ItemID.SHARK,
      mantaRay: ItemID.MANTA_RAY,
      anglerFish: ItemID.ANGLERFISH
    }
  },
  comboDelay: {
    item: {
      karambwan: ItemID.COOKED_KARAMBWAN
    }
  }
});
var potion = {
  normalDelay: {
    item: {
      stamina_potion_1: ItemID.STAMINA_POTION1,
      stamina_potion_2: ItemID.STAMINA_POTION2,
      stamina_potion_3: ItemID.STAMINA_POTION3,
      stamina_potion_4: ItemID.STAMINA_POTION4,
      prayer_potion_1: ItemID.PRAYER_POTION1,
      prayer_potion_2: ItemID.PRAYER_POTION2,
      prayer_potion_3: ItemID.PRAYER_POTION3,
      prayer_potion_4: ItemID.PRAYER_POTION4,
      saradomin_brew_1: ItemID.SARADOMIN_BREW1,
      saradomin_brew_2: ItemID.SARADOMIN_BREW2,
      saradomin_brew_3: ItemID.SARADOMIN_BREW3,
      saradomin_brew_4: ItemID.SARADOMIN_BREW4,
      super_restore_1: ItemID.SUPER_RESTORE1,
      super_restore_2: ItemID.SUPER_RESTORE2,
      super_restore_3: ItemID.SUPER_RESTORE3,
      super_restore_4: ItemID.SUPER_RESTORE4,
      drange_potion_1: ItemID.DIVINE_RANGING_POTION1,
      drange_potion_2: ItemID.DIVINE_RANGING_POTION2,
      drange_potion_3: ItemID.DIVINE_RANGING_POTION3,
      drange_potion_4: ItemID.DIVINE_RANGING_POTION4
    }
  }
};
var potionGroups = {
  stam1_4: [potion.normalDelay.item.stamina_potion_1, potion.normalDelay.item.stamina_potion_2, potion.normalDelay.item.stamina_potion_3, potion.normalDelay.item.stamina_potion_4],
  ppots1_4: [potion.normalDelay.item.prayer_potion_1, potion.normalDelay.item.prayer_potion_2, potion.normalDelay.item.prayer_potion_3, potion.normalDelay.item.prayer_potion_4],
  brews1_4: [potion.normalDelay.item.saradomin_brew_1, potion.normalDelay.item.saradomin_brew_2, potion.normalDelay.item.saradomin_brew_3, potion.normalDelay.item.saradomin_brew_4],
  restores1_4: [potion.normalDelay.item.super_restore_1, potion.normalDelay.item.super_restore_2, potion.normalDelay.item.super_restore_3, potion.normalDelay.item.super_restore_4],
  drange1_4: [potion.normalDelay.item.drange_potion_1, potion.normalDelay.item.drange_potion_2, potion.normalDelay.item.drange_potion_3, potion.normalDelay.item.drange_potion_4]
};
_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, potion.normalDelay.item.prayer_potion_1, 1), potion.normalDelay.item.prayer_potion_2, 2), potion.normalDelay.item.prayer_potion_3, 3), potion.normalDelay.item.prayer_potion_4, 4);
_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, potion.normalDelay.item.super_restore_1, 1), potion.normalDelay.item.super_restore_2, 2), potion.normalDelay.item.super_restore_3, 3), potion.normalDelay.item.super_restore_4, 4);
_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, potion.normalDelay.item.drange_potion_1, 1), potion.normalDelay.item.drange_potion_2, 2), potion.normalDelay.item.drange_potion_3, 3), potion.normalDelay.item.drange_potion_4, 4);

var shuffle = length => {
  var random = Array.from({
    length
  }, (_, index) => index + 1);
  for (var index = random.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    var _ref = [random[randomIndex], random[index]];
    random[index] = _ref[0];
    random[randomIndex] = _ref[1];
  }
  return random;
};

var state$1 = null;
var currentAction = 'Idle';
var chinsThrown = 0;
var botMakerLogOverlayReference = null;
var botMakerMainOverlayReference = null;
var overlayManager = net.runelite.client.RuneLite.getInjector().getInstance(net.runelite.client.ui.overlay.OverlayManager);
var overlay = {
  sub: [],
  subscribe(overlayItem) {
    overlayManager.add(overlayItem);
    this.sub.push(overlayItem);
  },
  unsubscribe(overlayItem) {
    overlayManager.remove(overlayItem);
    var index = this.sub.indexOf(overlayItem);
    if (index > -1) this.sub.splice(index, 1);
  },
  stop() {
    if (this.sub.length > 0) {
      this.sub.forEach(overlayItem => {
        overlayManager.remove(overlayItem);
      });
    }
    this.sub = [];
  },
  start() {
    overlayPanel.start();
  }
};
var overlayPanel = {
  panel: null,
  override: {
    render(graphics) {
      if (!state$1) {
        return this.super$render(graphics);
      }
      if (!this.panelComponent) {
        return this.super$render(graphics);
      }
      var children = this.panelComponent.getChildren();
      children.clear();
      var lines = [{
        left: 'State:',
        right: currentAction,
        leftColor: java.awt.Color.CYAN,
        rightColor: java.awt.Color.GREEN
      }, {
        left: 'Chins Thrown:',
        right: "".concat(chinsThrown),
        leftColor: java.awt.Color.CYAN,
        rightColor: java.awt.Color.YELLOW
      }];
      for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
        var line = _lines[_i];
        var builder = net.runelite.client.ui.overlay.components.LineComponent.builder();
        var lineComponent = builder.left(line.left).right(line.right).leftColor(line.leftColor).rightColor(line.rightColor).build();
        children.add(lineComponent);
      }
      return this.super$render(graphics);
    }
  },
  create() {
    var adapter = JavaAdapter;
    var panel = new adapter(net.runelite.client.ui.overlay.OverlayPanel, this.override);
    panel.setPosition(net.runelite.client.ui.overlay.OverlayPosition.ABOVE_CHATBOX_RIGHT);
    panel.setPriority(net.runelite.client.ui.overlay.OverlayPriority.MED);
    panel.setPreferredSize(new java.awt.Dimension(220, 120));
    return panel;
  },
  start() {
    this.panel = this.create();
    overlay.subscribe(this.panel);
  },
  remove() {
    if (this.panel) {
      overlay.unsubscribe(this.panel);
    }
    this.panel = null;
  }
};
function disableBotMakerOverlay() {
  try {
    overlayManager.removeIf(overlayItem => {
      var item = overlayItem;
      if (!item.getClass || !item.getLayer || !item.getPosition) {
        return false;
      }
      var overlayClass = item.getClass();
      if (!overlayClass) {
        return false;
      }
      var overlayName = overlayClass.getName();
      if (!overlayName || !overlayName.includes('plugins.botmaker')) {
        return false;
      }
      var layer = item.getLayer();
      var position = item.getPosition();
      if (layer === net.runelite.client.ui.overlay.OverlayLayer.UNDER_WIDGETS && position === net.runelite.client.ui.overlay.OverlayPosition.TOP_LEFT) {
        botMakerLogOverlayReference = overlayItem;
        if (state$1) {
          logger(state$1, 'all', 'UI', 'Disabling BotMaker log overlay');
        }
        return true;
      }
      if (layer === net.runelite.client.ui.overlay.OverlayLayer.UNDER_WIDGETS && position === net.runelite.client.ui.overlay.OverlayPosition.BOTTOM_LEFT) {
        botMakerMainOverlayReference = overlayItem;
        if (state$1) {
          logger(state$1, 'all', 'UI', 'Disabling BotMaker main overlay');
        }
        return true;
      }
      return false;
    });
  } catch (error) {
    if (state$1) {
      logger(state$1, 'all', 'UI', 'Error disabling BotMaker overlay: ' + String(error));
    }
  }
}
function enableBotMakerOverlay() {
  try {
    if (botMakerLogOverlayReference) {
      overlayManager.add(botMakerLogOverlayReference);
      botMakerLogOverlayReference = null;
    }
    if (botMakerMainOverlayReference) {
      overlayManager.add(botMakerMainOverlayReference);
      botMakerMainOverlayReference = null;
    }
  } catch (error) {
    if (state$1 && error instanceof Error) {
      logger(state$1, 'all', 'UI', 'Error enabling BotMaker overlay: ' + error.message);
    }
  }
}
function initializeUI(scriptState) {
  state$1 = scriptState;
}
var profChinBurstUI = {
  get currentAction() {
    return currentAction;
  },
  set currentAction(value) {
    currentAction = value;
  },
  get chinsThrown() {
    return chinsThrown;
  },
  set chinsThrown(value) {
    chinsThrown = value;
  },
  start() {
    overlay.start();
  },
  stop() {
    overlay.stop();
  },
  disableBotMakerOverlay() {
    disableBotMakerOverlay();
  },
  enableBotMakerOverlay() {
    enableBotMakerOverlay();
  }
};

var START_LOCATION = new net.runelite.api.coords.WorldPoint(2572, 9168, 1);
var ENTER_OBJECT_ID = 28772;
var ENTER_ACTION = 'Enter';
var ATTACK_ANIMATION = 7618;
var TEN_MINUTES_TICKS = 1000;
var QUICK_PRAYER_VARBIT = net.runelite.api.Varbits.QUICK_PRAYER;
var PATH = [new net.runelite.api.coords.WorldPoint(2380, 9168, 1), new net.runelite.api.coords.WorldPoint(2393, 9174, 1), new net.runelite.api.coords.WorldPoint(2405, 9176, 1), new net.runelite.api.coords.WorldPoint(2417, 9178, 1), new net.runelite.api.coords.WorldPoint(2426, 9172, 1), new net.runelite.api.coords.WorldPoint(2437, 9172, 1), new net.runelite.api.coords.WorldPoint(2448, 9173, 1)];
var COMBAT_TILE_A = new net.runelite.api.coords.WorldPoint(2448, 9173, 1);
var COMBAT_TILE_B = new net.runelite.api.coords.WorldPoint(2449, 9172, 1);
var RESET_TILES = [new net.runelite.api.coords.WorldPoint(2447, 9157, 1), new net.runelite.api.coords.WorldPoint(2428, 9159, 1)];
var PRAYER_POTIONS = [potion.normalDelay.item.prayer_potion_1, potion.normalDelay.item.prayer_potion_2, potion.normalDelay.item.prayer_potion_3, potion.normalDelay.item.prayer_potion_4];
var DIVINE_RANGING_POTIONS = [potion.normalDelay.item.drange_potion_1, potion.normalDelay.item.drange_potion_2, potion.normalDelay.item.drange_potion_3, potion.normalDelay.item.drange_potion_4];
var POTION_NAME_BY_ID = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, potion.normalDelay.item.prayer_potion_1, 'Prayer potion(1)'), potion.normalDelay.item.prayer_potion_2, 'Prayer potion(2)'), potion.normalDelay.item.prayer_potion_3, 'Prayer potion(3)'), potion.normalDelay.item.prayer_potion_4, 'Prayer potion(4)'), potion.normalDelay.item.drange_potion_1, 'Divine ranging potion(1)'), potion.normalDelay.item.drange_potion_2, 'Divine ranging potion(2)'), potion.normalDelay.item.drange_potion_3, 'Divine ranging potion(3)'), potion.normalDelay.item.drange_potion_4, 'Divine ranging potion(4)');
var state = {
  debugEnabled: true,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  scriptInitalized: false,
  scriptName: 'profChinBurst',
  uiCompleted: true,
  timeout: 0,
  gameTick: 0,
  subState: ''
};
var pathIndex = 0;
var combatTarget = COMBAT_TILE_A;
var jitterRemaining = 0;
var cycleStartTick = null;
var lastAttackTick = null;
var attackAnimationCount = 0;
var hasDrankRangePotion = false;
var resetTarget = null;
var returningFromReset = false;
var totalChinsThrown = 0;
var lastLoggedState = null;
var lastActionLogTick = null;
var lastResetIndex = null;
var nextChinMilestone = randomInt(25, 75);
var FUNNY_LOGS = ['killing more chins', 'running between tiles. still...', 'repetitive motion', 'why wont they just leave me alone?', 'if i stop moving, do they win?', 'this is fine. totally fine.', 'who needs cardio when you have chins?', 'left, right, left, right...', 'the floor tiles know my secrets now', 'keeping the rhythm alive', 'not suspicious. just very busy.', 'what even is personal space?'];
var OBLITERATION_LOGS = ['You have obliterated even more beautiful creatures.', 'The chin population files a complaint.', 'Another batch sent to the void.', 'Dust to dust, chin to chin.', 'Your reputation grows. Their numbers do not.', 'The ground trembles from all that fluff.'];
var funnyLogOrder = [];
var funnyLogIndex = 0;
var obliterationLogOrder = [];
var obliterationLogIndex = 0;
function onStart() {
  state.uiCompleted = true;
  initializeUI(state);
  profChinBurstUI.disableBotMakerOverlay();
  profChinBurstUI.start();
  profChinBurstUI.currentAction = 'Starting';
  logger(state, 'all', 'script', "".concat(state.scriptName, " started."));
}
function onEnd() {
  profChinBurstUI.stop();
  profChinBurstUI.enableBotMakerOverlay();
  logger(state, 'all', 'summary', "Total chins obliterated: ".concat(totalChinsThrown, ". You are an evil person."), LOG_COLOR.PINK);
  logger(state, 'all', 'script', "".concat(state.scriptName, " ended."));
  endScript(state);
}
function onGameTick() {
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitalized) {
        log.printGameMessage('Script initialized.');
      }
      state.scriptInitalized = true;
    } else {
      return;
    }
    if (!gameTick(state)) return;
    stateManager();
    logCurrentAction();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
}
function stateManager() {
  logStateChange();
  switch (state.mainState) {
    case 'start_state':
      {
        setCurrentAction('Moving to start');
        var player = client.getLocalPlayer();
        if (player) {
          var playerLoc = player.getWorldLocation();
          if (equalsWorldPoint(playerLoc, COMBAT_TILE_A) || equalsWorldPoint(playerLoc, COMBAT_TILE_B)) {
            state.mainState = 'combat';
            initializeCombatCycle();
            return;
          }
        }
        if (!moveToStartAndEnter()) {
          return;
        }
        state.mainState = 'walk_path';
        pathIndex = 0;
        break;
      }
    case 'walk_path':
      {
        setCurrentAction('Following path');
        if (!followPath()) {
          return;
        }
        state.mainState = 'combat';
        initializeCombatCycle();
        break;
      }
    case 'combat':
      {
        setCurrentAction('Combat');
        if (!handleCombatLoop()) {
          return;
        }
        state.mainState = 'reset_aggro';
        resetTarget = null;
        returningFromReset = false;
        break;
      }
    case 'reset_aggro':
      {
        setCurrentAction('Resetting aggro');
        if (!handleAggroReset()) {
          return;
        }
        state.mainState = 'combat';
        initializeCombatCycle();
        break;
      }
    default:
      {
        state.mainState = 'start_state';
        break;
      }
  }
}
function moveToStartAndEnter() {
  var player = client.getLocalPlayer();
  if (!player) return false;
  var playerLoc = player.getWorldLocation();
  if (distanceTo(playerLoc, START_LOCATION) > 1) {
    if (!bot.walking.isWebWalking() && !bot.localPlayerMoving()) {
      bot.walking.walkToWorldPoint(START_LOCATION.getX(), START_LOCATION.getY());
    }
    return false;
  }
  var objects = bot.objects.getTileObjectsWithIds([ENTER_OBJECT_ID]);
  if (!objects || objects.length === 0) {
    return false;
  }
  bot.objects.interactSuppliedObject(objects[0], ENTER_ACTION);
  return true;
}
function followPath() {
  var player = client.getLocalPlayer();
  if (!player) return false;
  ensureQuickPrayers(player);
  if (pathIndex >= PATH.length) {
    return true;
  }
  var playerLoc = player.getWorldLocation();
  var target = PATH[pathIndex];
  if (distanceTo(playerLoc, target) <= 1) {
    pathIndex += 1;
    return pathIndex >= PATH.length;
  }
  if (!bot.localPlayerMoving()) {
    var randomizedTarget = getRandomizedTargetTile(target);
    bot.walking.walkToWorldPoint(randomizedTarget.getX(), randomizedTarget.getY());
  }
  return false;
}
function initializeCombatCycle() {
  cycleStartTick = client.getTickCount();
  lastAttackTick = null;
  attackAnimationCount = 0;
  combatTarget = COMBAT_TILE_A;
  jitterRemaining = randomInt(7, 9);
  hasDrankRangePotion = false;
}
function handleCombatLoop() {
  var player = client.getLocalPlayer();
  if (!player) return false;
  ensureQuickPrayers(player);
  lootPrayerPotion();
  handlePrayerPotion();
  handleRangePotion();
  if (jitterRemaining > 0) {
    if (moveBetweenCombatTiles()) {
      jitterRemaining -= 1;
    }
    return false;
  }
  var currentTick = client.getTickCount();
  if (cycleStartTick !== null && currentTick - cycleStartTick >= TEN_MINUTES_TICKS) {
    return true;
  }
  var animation = player.getAnimation();
  if (animation === ATTACK_ANIMATION && lastAttackTick !== currentTick) {
    lastAttackTick = currentTick;
    attackAnimationCount += 1;
    updateChinsThrown();
    if (attackAnimationCount % 2 === 0) {
      moveBetweenCombatTiles();
    }
  }
  return false;
}
function handleAggroReset() {
  var player = client.getLocalPlayer();
  if (!player) return false;
  ensureQuickPrayers(player);
  if (!resetTarget) {
    var choiceIndex = randomInt(0, RESET_TILES.length - 1);
    if (lastResetIndex !== null && RESET_TILES.length > 1 && choiceIndex === lastResetIndex) {
      choiceIndex = (choiceIndex + 1) % RESET_TILES.length;
    }
    resetTarget = RESET_TILES[choiceIndex];
    lastResetIndex = choiceIndex;
  }
  var playerLoc = player.getWorldLocation();
  if (!returningFromReset) {
    if (distanceTo(playerLoc, resetTarget) > 1) {
      if (!bot.localPlayerMoving()) {
        var randomizedTarget = getRandomizedTargetTile(resetTarget);
        bot.walking.walkToWorldPoint(randomizedTarget.getX(), randomizedTarget.getY());
      }
      return false;
    }
    returningFromReset = true;
    return false;
  }
  if (distanceTo(playerLoc, COMBAT_TILE_A) > 1) {
    if (!bot.localPlayerMoving()) {
      bot.walking.walkToWorldPoint(COMBAT_TILE_A.getX(), COMBAT_TILE_A.getY());
    }
    return false;
  }
  return true;
}
function moveBetweenCombatTiles() {
  var player = client.getLocalPlayer();
  if (!player) return false;
  var playerLoc = player.getWorldLocation();
  var nextTarget = equalsWorldPoint(playerLoc, COMBAT_TILE_A) ? COMBAT_TILE_B : COMBAT_TILE_A;
  if (!equalsWorldPoint(combatTarget, nextTarget)) {
    combatTarget = nextTarget;
  }
  if (!bot.localPlayerMoving()) {
    bot.walking.walkToWorldPoint(combatTarget.getX(), combatTarget.getY());
    return true;
  }
  return false;
}
function handleRangePotion() {
  var ranged = net.runelite.api.Skill.RANGED;
  var boosted = client.getBoostedSkillLevel(ranged);
  var real = client.getRealSkillLevel(ranged);
  if (!hasDrankRangePotion) {
    if (drinkLowestPotion(DIVINE_RANGING_POTIONS)) {
      hasDrankRangePotion = true;
    }
    return;
  }
  if (boosted <= real) {
    drinkLowestPotion(DIVINE_RANGING_POTIONS);
  }
}
function handlePrayerPotion() {
  var prayer = net.runelite.api.Skill.PRAYER;
  var currentPrayer = client.getBoostedSkillLevel(prayer);
  if (currentPrayer < 40) {
    drinkLowestPotion(PRAYER_POTIONS);
  }
}
function lootPrayerPotion() {
  if (bot.inventory.isFull()) {
    return;
  }
  bot.tileItems.lootItemsWithIds([potion.normalDelay.item.prayer_potion_1], 2);
}
function drinkLowestPotion(potions) {
  var _iterator = _createForOfIteratorHelper(potions),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var potionId = _step.value;
      if (bot.inventory.containsId(potionId)) {
        var _POTION_NAME_BY_ID$po;
        bot.inventory.interactWithIds([potionId], ['Drink']);
        var potionName = (_POTION_NAME_BY_ID$po = POTION_NAME_BY_ID[potionId]) !== null && _POTION_NAME_BY_ID$po !== void 0 ? _POTION_NAME_BY_ID$po : 'Unknown potion';
        logger(state, 'debug', 'potion', "Drank potion: ".concat(potionName), LOG_COLOR.GOLD);
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
}
function distanceTo(from, to) {
  var dx = Math.abs(from.getX() - to.getX());
  var dy = Math.abs(from.getY() - to.getY());
  return dx + dy;
}
function equalsWorldPoint(left, right) {
  return left.getX() === right.getX() && left.getY() === right.getY() && left.getPlane() === right.getPlane();
}
function randomInt(min, max) {
  var lower = Math.min(min, max);
  var upper = Math.max(min, max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
function getRandomizedTargetTile(target) {
  var randomX = target.getX() + randomInt(-1, 1);
  var randomY = target.getY() + randomInt(-1, 1);
  return new net.runelite.api.coords.WorldPoint(randomX, randomY, target.getPlane());
}
function ensureQuickPrayers(player) {
  var playerLoc = player.getWorldLocation();
  if (equalsWorldPoint(playerLoc, START_LOCATION)) {
    return;
  }
  var quickPrayerActive = client.getVarbitValue(QUICK_PRAYER_VARBIT) === 1;
  if (!quickPrayerActive) {
    bot.widgets.interactSpecifiedWidget(10485780, 1, 57, -1);
  }
}
function setCurrentAction(action) {
  if (profChinBurstUI.currentAction !== action) {
    profChinBurstUI.currentAction = action;
  }
}
function updateChinsThrown() {
  totalChinsThrown += 1;
  profChinBurstUI.chinsThrown = totalChinsThrown;
  if (totalChinsThrown >= nextChinMilestone) {
    var message = getNextObliterationLog();
    logger(state, 'debug', 'chins', message, LOG_COLOR.PINK);
    nextChinMilestone = totalChinsThrown + randomInt(25, 75);
  }
}
function logStateChange() {
  if (state.mainState === lastLoggedState) {
    return;
  }
  logger(state, 'debug', 'stateManager', "State changed to: ".concat(state.mainState), LOG_COLOR.GOLD);
  lastLoggedState = state.mainState;
}
function logCurrentAction() {
  var currentTick = state.gameTick;
  var player = client.getLocalPlayer();
  if (!player) {
    return;
  }
  var playerLoc = player.getWorldLocation();
  if (!equalsWorldPoint(playerLoc, COMBAT_TILE_A) && !equalsWorldPoint(playerLoc, COMBAT_TILE_B)) {
    return;
  }
  if (lastActionLogTick !== null && currentTick - lastActionLogTick < 20) {
    return;
  }
  var message = getNextFunnyLog();
  logger(state, 'debug', 'action', message, LOG_COLOR.EMERALD);
  lastActionLogTick = currentTick;
}
function getNextFunnyLog() {
  if (FUNNY_LOGS.length === 0) {
    return '...';
  }
  if (funnyLogOrder.length === 0 || funnyLogIndex >= funnyLogOrder.length) {
    funnyLogOrder = shuffle(FUNNY_LOGS.length);
    funnyLogIndex = 0;
  }
  var orderValue = funnyLogOrder[funnyLogIndex];
  funnyLogIndex += 1;
  var index = Math.max(0, Math.min(FUNNY_LOGS.length - 1, orderValue - 1));
  return FUNNY_LOGS[index];
}
function getNextObliterationLog() {
  if (OBLITERATION_LOGS.length === 0) {
    return 'Chins. Chins everywhere.';
  }
  if (obliterationLogOrder.length === 0 || obliterationLogIndex >= obliterationLogOrder.length) {
    obliterationLogOrder = shuffle(OBLITERATION_LOGS.length);
    obliterationLogIndex = 0;
  }
  var orderValue = obliterationLogOrder[obliterationLogIndex];
  obliterationLogIndex += 1;
  var index = Math.max(0, Math.min(OBLITERATION_LOGS.length - 1, orderValue - 1));
  return OBLITERATION_LOGS[index];
}


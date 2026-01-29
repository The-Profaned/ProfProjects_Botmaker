function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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

var logger = (state, type, source, message) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  if (type === 'all') bot.printGameMessage(logMessage);
  if (type === 'all' || type === 'debug' && state.debugEnabled) bot.printLogMessage(logMessage);
};

var debugFunctions = {
  stateDebugger: function stateDebugger(state) {
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
  }
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

var generalFunctions = {
  gameTick: state => {
    try {
      if (state.debugEnabled && state.debugFullState) {
        logger(state, 'debug', 'onGameTick', "Script game tick ".concat(state.gameTick, " ----------------"));
        debugFunctions.stateDebugger(state);
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
      generalFunctions.handleFailure(state, 'gameTick', fatalMessage);
      return false;
    }
    return true;
  },
  onFailures: (state, failureLocation, failureMessage, failureResetState) => {
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
    if (failureResetState) state.mainState = failureResetState;
  },
  handleFailure: (state, failureLocation, failureMessage, failureResetState) => {
    generalFunctions.onFailures(state, failureLocation, failureMessage, failureResetState);
  },
  endScript: state => {
    bot.breakHandler.setBreakHandlerStatus(false);
    bot.printGameMessage("Termination of ".concat(state.scriptName, "."));
    bot.walking.webWalkCancel();
    bot.events.unregisterAll();
  }
};

var itemIds = {
  stamina_potion_1: 12631,
  stamina_potion_2: 12629,
  stamina_potion_3: 12627,
  stamina_potion_4: 12625,
  boxTrap: 10008,
  tBow: 20997
};

var objectIds = {
  boxTrapLayed: 9380,
  boxTrap_Failed: 9385,
  boxTrap_Shaking: 9383
};

var state$2;
var trapLocationsCache$2;
var isOccupiedByTrapOrGround$1;
var maxTraps$1;
var currentAction = 'Idle';
var totalChinsCaught = 0;
var lastHunterXp = 0;
var botMakerLogOverlayReference = null;
var botMakerMainOverlayReference = null;
var overlay = {
  manager: net.runelite.client.RuneLite.getInjector().getInstance(net.runelite.client.ui.overlay.OverlayManager),
  sub: [],
  subscribe(overlay) {
    this.manager.add(overlay);
    this.sub.push(overlay);
  },
  unsubscribe(overlay) {
    this.manager.remove(overlay);
    var index = this.sub.indexOf(overlay);
    if (index > -1) this.sub.splice(index, 1);
  },
  stop() {
    if (this.sub.length > 0) {
      this.sub.forEach(overlay => {
        this.manager.remove(overlay);
      });
    }
    this.sub = [];
  },
  start() {
    overlayPanel.start();
    overlayTile.start();
  }
};
var overlayPanel = {
  panel: null,
  override: {
    shrink: false,
    maxWidth: 0,
    panelComponent: null,
    render(graphics) {
      var trapsLaid = 0;
      var _iterator = _createForOfIteratorHelper(trapLocationsCache$2),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var loc = _step.value;
          if (isOccupiedByTrapOrGround$1(loc)) {
            trapsLaid++;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var panelText1 = this.shrink ? 'Caught:' : 'Chins caught:';
      this.addText(graphics, this.panelComponent, panelText1, "".concat(totalChinsCaught), java.awt.Color.CYAN, java.awt.Color.YELLOW);
      var maxAllowed = maxTraps$1();
      var panelText2 = this.shrink ? 'Traps:' : 'Traps laid:';
      this.addText(graphics, this.panelComponent, panelText2, "".concat(trapsLaid, "/").concat(maxAllowed), java.awt.Color.CYAN, java.awt.Color.GREEN);
      var stateText = this.shrink ? 'Action:' : 'Current Action:';
      var stateValue = currentAction;
      var stateColor = java.awt.Color.GREEN;
      this.addText(graphics, this.panelComponent, stateText, stateValue, java.awt.Color.CYAN, stateColor);
      return this.super$render(graphics);
    },
    addText(graphics, comp, left, right, leftColor, rightColor) {
      if (!comp) return;
      var l = left || '';
      var r = right || '';
      var lc = leftColor || java.awt.Color.WHITE;
      var rc = rightColor || java.awt.Color.WHITE;
      var lineWidth = graphics.getFontMetrics().stringWidth(l + ' ' + r);
      if (lineWidth > this.maxWidth) {
        this.maxWidth = lineWidth;
        if (overlayPanel.panel) {
          overlayPanel.panel.setPreferredSize(new java.awt.Dimension(this.maxWidth + 20, 0));
        }
      }
      if (overlayPanel.panel && overlayPanel.panel.getPreferredSize().width < this.maxWidth) {
        overlayPanel.panel.setPreferredSize(new java.awt.Dimension(this.maxWidth + 20, 0));
      }
      var builder = net.runelite.client.ui.overlay.components.LineComponent.builder();
      comp.getChildren().add(builder.left(l).right(r).leftColor(lc).rightColor(rc).build());
    }
  },
  toggleShrink() {
    this.override.shrink = !this.override.shrink;
    this.override.maxWidth = 0;
  },
  create() {
    var o = new JavaAdapter(net.runelite.client.ui.overlay.OverlayPanel, this.override);
    o.setPosition(net.runelite.client.ui.overlay.OverlayPosition.ABOVE_CHATBOX_RIGHT);
    o.setPriority(net.runelite.client.ui.overlay.OverlayPriority.MED);
    o.setResizable(true);
    o.setPreferredSize(new java.awt.Dimension(500, 200));
    o.addMenuEntry(net.runelite.api.MenuAction.RUNELITE_OVERLAY, 'Shrink', 'ProfChins panel', () => this.toggleShrink());
    o.addMenuEntry(net.runelite.api.MenuAction.RUNELITE_OVERLAY, 'Disable', 'ProfChins panel', () => this.remove());
    return o;
  },
  start() {
    this.panel = this.create();
    overlay.subscribe(this.panel);
  },
  remove() {
    overlay.unsubscribe(this.panel);
    this.panel = null;
  }
};
var overlayTile = {
  tiles: null,
  tileStates: new Map(),
  override: {
    render(graphics) {
      try {
        trapLocationsCache$2.forEach((loc, index) => {
          try {
            var locKey = "".concat(loc.getX(), ",").concat(loc.getY());
            var stateColor = java.awt.Color.GRAY;
            var stateText = "Box ".concat(index + 1);
            var shakingTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Shaking]).find(o => o && o.getWorldLocation() && o.getWorldLocation().getX() === loc.getX() && o.getWorldLocation().getY() === loc.getY());
            if (shakingTrap) {
              stateColor = java.awt.Color.GREEN;
              stateText = 'Caught!';
              overlayTile.tileStates.set(locKey, {
                color: stateColor,
                text: stateText
              });
            } else {
              var failedTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Failed]).find(o => o && o.getWorldLocation() && o.getWorldLocation().getX() === loc.getX() && o.getWorldLocation().getY() === loc.getY());
              if (failedTrap) {
                stateColor = java.awt.Color.RED;
                stateText = 'Reset';
                overlayTile.tileStates.set(locKey, {
                  color: stateColor,
                  text: stateText
                });
              } else {
                var laidTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrapLayed]).find(o => o && o.getWorldLocation() && o.getWorldLocation().getX() === loc.getX() && o.getWorldLocation().getY() === loc.getY());
                if (laidTrap) {
                  stateColor = java.awt.Color.YELLOW;
                  stateText = 'Active';
                  overlayTile.tileStates.set(locKey, {
                    color: stateColor,
                    text: stateText
                  });
                } else {
                  var cachedState = overlayTile.tileStates.get(locKey);
                  if (cachedState) {
                    if (cachedState.text === 'Caught!' || cachedState.text === 'Reset') {
                      stateColor = java.awt.Color.GRAY;
                      stateText = 'Laying...';
                      overlayTile.tileStates.set(locKey, {
                        color: stateColor,
                        text: stateText
                      });
                    } else {
                      stateColor = cachedState.color;
                      stateText = cachedState.text;
                    }
                  } else {
                    stateColor = java.awt.Color.GRAY;
                    stateText = "Box ".concat(index + 1);
                  }
                }
              }
            }
            this.drawTileOverlay(graphics, loc, stateColor, stateText);
          } catch (_unused) {}
        });
      } catch (_unused2) {}
      return null;
    },
    drawTileOverlay(graphics, worldPoint, borderColor, text) {
      if (!graphics) return null;
      if (!worldPoint) return null;
      var wv = client.getTopLevelWorldView();
      if (!wv) return null;
      var lp = net.runelite.api.coords.LocalPoint.fromWorld(client, worldPoint);
      if (!lp) return null;
      var polygon = net.runelite.api.Perspective.getCanvasTilePoly(client, lp);
      if (polygon == null) return null;
      net.runelite.client.ui.overlay.OverlayUtil.renderPolygon(graphics, polygon, borderColor);
      if (text == null) return null;
      var center = net.runelite.api.Perspective.getCanvasTextLocation(client, graphics, lp, text, 0);
      if (!center) return null;
      net.runelite.client.ui.overlay.OverlayUtil.renderTextLocation(graphics, center, text, borderColor);
      return null;
    }
  },
  create() {
    var o = new JavaAdapter(net.runelite.client.ui.overlay.Overlay, this.override);
    o.setPriority(net.runelite.client.ui.overlay.OverlayPriority.MED);
    o.setPosition(net.runelite.client.ui.overlay.OverlayPosition.DYNAMIC);
    o.setLayer(net.runelite.client.ui.overlay.OverlayLayer.ABOVE_SCENE);
    return o;
  },
  start() {
    this.tiles = this.create();
    overlay.subscribe(this.tiles);
  },
  remove() {
    overlay.unsubscribe(this.tiles);
    this.tiles = null;
  }
};
function disableBotMakerOverlay() {
  try {
    var manager = overlay.manager;
    if (!manager) {
      return;
    }
    manager.removeIf(overlayItem => {
      try {
        if (!overlayItem || !overlayItem.getClass) {
          return false;
        }
        var overlayClass = overlayItem.getClass();
        if (!overlayClass) {
          return false;
        }
        var overlayName = overlayClass.getName();
        if (!overlayName || !overlayName.includes('plugins.botmaker')) {
          return false;
        }
        var layer = overlayItem.getLayer();
        var position = overlayItem.getPosition();
        if (layer === net.runelite.client.ui.overlay.OverlayLayer.UNDER_WIDGETS && position === net.runelite.client.ui.overlay.OverlayPosition.TOP_LEFT) {
          botMakerLogOverlayReference = overlayItem;
          if (state$2) {
            logger(state$2, 'all', 'UI', 'Disabling BotMaker log overlay');
          }
          return true;
        }
        if (layer === net.runelite.client.ui.overlay.OverlayLayer.UNDER_WIDGETS && position === net.runelite.client.ui.overlay.OverlayPosition.BOTTOM_LEFT) {
          botMakerMainOverlayReference = overlayItem;
          if (state$2) {
            logger(state$2, 'all', 'UI', 'Disabling BotMaker main overlay');
          }
          return true;
        }
        return false;
      } catch (_unused3) {
        return false;
      }
    });
  } catch (error) {
    if (state$2) {
      logger(state$2, 'all', 'UI', 'Error disabling BotMaker overlay: ' + String(error));
    }
  }
}
function enableBotMakerOverlay() {
  try {
    var manager = overlay.manager;
    if (!manager) return;
    if (botMakerLogOverlayReference) {
      manager.add(botMakerLogOverlayReference);
      botMakerLogOverlayReference = null;
    }
    if (botMakerMainOverlayReference) {
      manager.add(botMakerMainOverlayReference);
      botMakerMainOverlayReference = null;
    }
  } catch (error) {
    logger(state$2, 'all', 'UI', 'Error enabling BotMaker overlay: ' + String(error));
  }
}
function initializeUI(scriptState, traps, isOccupied, maxTrapsFunction) {
  state$2 = scriptState;
  trapLocationsCache$2 = traps;
  isOccupiedByTrapOrGround$1 = isOccupied;
  maxTraps$1 = maxTrapsFunction;
}
var profChinsUI = {
  get currentAction() {
    return currentAction;
  },
  set currentAction(value) {
    currentAction = value;
  },
  get totalChinsCaught() {
    return totalChinsCaught;
  },
  set totalChinsCaught(value) {
    totalChinsCaught = value;
  },
  get lastHunterXp() {
    return lastHunterXp;
  },
  set lastHunterXp(value) {
    lastHunterXp = value;
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

var utilityFunctions = {
  randInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  shuffle: length => {
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
  }
};

var state$1;
var trapLocationsCache$1;
var safeTilesCache;
var player_location$1;
var hunterLvl$1;
var _resetInProgress = false;
var _resetTargetLocation = null;
var _resetPhase = null;
var _resetTickCount = 0;
var _nextTrapSearchAttempts = 0;
var _tickManipulationTriggered = false;
var _isPlayerMoving = false;
var _layingTrapLocation = null;
var _layingTickCount = 0;
var _layingLocationIndex = 0;
var _layingWalkCommandIssued = false;
var _layingPhase = null;
var _groundTrapHandlingLocation = null;
var _groundTrapPhase = null;
var _groundTrapTickCount = 0;
var _groundTrapJustLaid = false;
var shakingTrapTimestamps = new Map();
var failedTrapTimestamps = new Map();
var playerLaidTraps = new Set();
var utilState = {
  get resetInProgress() {
    return _resetInProgress;
  },
  set resetInProgress(value) {
    _resetInProgress = value;
  },
  get resetTargetLocation() {
    return _resetTargetLocation;
  },
  set resetTargetLocation(value) {
    _resetTargetLocation = value;
  },
  get resetPhase() {
    return _resetPhase;
  },
  set resetPhase(value) {
    _resetPhase = value;
  },
  get resetTickCount() {
    return _resetTickCount;
  },
  set resetTickCount(value) {
    _resetTickCount = value;
  },
  get tickManipulationTriggered() {
    return _tickManipulationTriggered;
  },
  set tickManipulationTriggered(value) {
    _tickManipulationTriggered = value;
  },
  get isPlayerMoving() {
    return _isPlayerMoving;
  },
  set isPlayerMoving(value) {
    _isPlayerMoving = value;
  },
  get layingTrapLocation() {
    return _layingTrapLocation;
  },
  set layingTrapLocation(value) {
    _layingTrapLocation = value;
  },
  get layingTickCount() {
    return _layingTickCount;
  },
  set layingTickCount(value) {
    _layingTickCount = value;
  },
  get layingLocationIndex() {
    return _layingLocationIndex;
  },
  set layingLocationIndex(value) {
    _layingLocationIndex = value;
  },
  get layingWalkCommandIssued() {
    return _layingWalkCommandIssued;
  },
  set layingWalkCommandIssued(value) {
    _layingWalkCommandIssued = value;
  },
  get layingPhase() {
    return _layingPhase;
  },
  set layingPhase(value) {
    _layingPhase = value;
  },
  get groundTrapHandlingLocation() {
    return _groundTrapHandlingLocation;
  },
  set groundTrapHandlingLocation(value) {
    _groundTrapHandlingLocation = value;
  },
  get groundTrapPhase() {
    return _groundTrapPhase;
  },
  set groundTrapPhase(value) {
    _groundTrapPhase = value;
  },
  get groundTrapTickCount() {
    return _groundTrapTickCount;
  },
  set groundTrapTickCount(value) {
    _groundTrapTickCount = value;
  }
};
function initializeUtilFunctions(scriptState, traps, safeTiles, playerLoc, hunterLevel) {
  state$1 = scriptState;
  trapLocationsCache$1 = traps;
  safeTilesCache = safeTiles;
  player_location$1 = playerLoc;
  hunterLvl$1 = hunterLevel;
}
function maxTraps() {
  if (hunterLvl$1 < 20) return 1;
  if (hunterLvl$1 >= 20 && hunterLvl$1 < 39) return 2;
  if (hunterLvl$1 >= 40 && hunterLvl$1 < 59) return 3;
  if (hunterLvl$1 >= 60 && hunterLvl$1 < 79) return 4;
  if (hunterLvl$1 >= 80) return 5;
  return 0;
}
function getInitialTrapLocations() {
  var allTiles = [];
  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      var tile = player_location$1.dx(dx).dy(dy);
      allTiles.push(tile);
    }
  }
  var shuffledKey = utilityFunctions.shuffle(allTiles.length);
  var shuffledTiles = shuffledKey.map(index => allTiles[index - 1]);
  var selectedLocations = shuffledTiles.slice(0, maxTraps());
  var locationString = selectedLocations.map(loc => "(".concat(loc.getX(), ", ").concat(loc.getY(), ")")).join(', ');
  logger(state$1, 'debug', 'getInitialTrapLocations', "Selected ".concat(maxTraps(), " trap locations: ").concat(locationString));
  return selectedLocations;
}
function getSafeTiles() {
  var allTiles = [];
  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      var tile = player_location$1.dx(dx).dy(dy);
      allTiles.push(tile);
    }
  }
  var safeTiles = allTiles.filter(tile => !trapLocationsCache$1.some(trapLoc => trapLoc.getX() === tile.getX() && trapLoc.getY() === tile.getY()));
  return safeTiles;
}
function isOccupiedByTrapOrGround(loc) {
  var allTrapIds = [objectIds.boxTrapLayed, objectIds.boxTrap_Failed, objectIds.boxTrap_Shaking, itemIds.boxTrap];
  var objectAtLoc = bot.objects.getTileObjectsWithIds(allTrapIds).find(o => {
    if (!o) return false;
    var worldLoc = o.getWorldLocation();
    if (!worldLoc) return false;
    return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
  });
  return objectAtLoc !== undefined;
}
var cachedOldestTrap = null;
function maintainAllTrapTimestamps() {
  var now = Date.now();
  var oldestTrap = null;
  var oldestTime = Number.POSITIVE_INFINITY;
  var _iterator = _createForOfIteratorHelper(trapLocationsCache$1),
    _step;
  try {
    var _loop = function _loop() {
      var loc = _step.value;
      var key = "".concat(loc.getX(), ",").concat(loc.getY());
      var shakingTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Shaking]).find(o => {
        if (!o) return false;
        var worldLoc = o.getWorldLocation();
        if (!worldLoc) return false;
        return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
      });
      if (shakingTrap && !shakingTrapTimestamps.has(key)) {
        shakingTrapTimestamps.set(key, now);
        if (!playerLaidTraps.has(key)) {
          playerLaidTraps.add(key);
        }
        logger(state$1, 'debug', 'maintainAllTrapTimestamps', "Assigned timestamp to shaking trap at ".concat(key, " (may be slightly delayed)"));
      }
      if (!shakingTrap && shakingTrapTimestamps.has(key)) {
        shakingTrapTimestamps.delete(key);
      }
      if (shakingTrap) {
        var timestamp = shakingTrapTimestamps.get(key) || now;
        if (timestamp < oldestTime) {
          oldestTime = timestamp;
          oldestTrap = {
            trap: shakingTrap,
            loc: loc,
            timestamp,
            type: 'shaking'
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(trapLocationsCache$1),
    _step2;
  try {
    var _loop2 = function _loop2() {
      var loc = _step2.value;
      var key = "".concat(loc.getX(), ",").concat(loc.getY());
      var failedTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Failed]).find(o => {
        if (!o) return false;
        var worldLoc = o.getWorldLocation();
        if (!worldLoc) return false;
        return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
      });
      if (failedTrap && !failedTrapTimestamps.has(key)) {
        failedTrapTimestamps.set(key, now);
        if (!playerLaidTraps.has(key)) {
          playerLaidTraps.add(key);
        }
        logger(state$1, 'debug', 'maintainAllTrapTimestamps', "Assigned timestamp to failed trap at ".concat(key, " (may be slightly delayed)"));
      }
      if (!failedTrap && failedTrapTimestamps.has(key)) {
        failedTrapTimestamps.delete(key);
      }
      if (failedTrap) {
        var timestamp = failedTrapTimestamps.get(key) || now;
        if (timestamp < oldestTime) {
          oldestTime = timestamp;
          oldestTrap = {
            trap: failedTrap,
            loc: loc,
            timestamp,
            type: 'failed'
          };
        }
      }
    };
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  cachedOldestTrap = oldestTrap;
}
function resetTraps() {
  var maintainedOldestTrap = cachedOldestTrap;
  if (_resetInProgress && _resetTargetLocation) {
    var playerWp = client.getLocalPlayer().getWorldLocation();
    var targetLoc = _resetTargetLocation;
    var atTarget = playerWp.equals(targetLoc);
    if (_resetPhase === 'walking') {
      if (atTarget || Math.abs(playerWp.getX() - targetLoc.getX()) <= 2 && Math.abs(playerWp.getY() - targetLoc.getY()) <= 2) {
        var trapToReset = bot.objects.getTileObjectsWithIds([objectIds.boxTrapLayed, objectIds.boxTrap_Shaking, objectIds.boxTrap_Failed]).find(o => {
          if (!o) return false;
          var worldLoc = o.getWorldLocation();
          if (!worldLoc) return false;
          return worldLoc.getX() === targetLoc.getX() && worldLoc.getY() === targetLoc.getY();
        });
        if (trapToReset) {
          var isShaking = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Shaking]).find(o => {
            if (!o) return false;
            var worldLoc = o.getWorldLocation();
            if (!worldLoc) return false;
            return worldLoc.getX() === targetLoc.getX() && worldLoc.getY() === targetLoc.getY();
          });
          if (isShaking) {
            profChinsUI.currentAction = 'Collecting chin';
            logger(state$1, 'debug', 'resetTraps', "Trap shaking - resetting");
          } else {
            profChinsUI.currentAction = 'Resetting failed trap';
          }
          bot.objects.interactSuppliedObject(trapToReset, 'Reset');
          _resetPhase = 'animating';
          _resetTickCount = 0;
          _tickManipulationTriggered = true;
        }
      } else if (!_isPlayerMoving) {
        _resetInProgress = false;
        _resetTargetLocation = null;
        _resetPhase = null;
        _tickManipulationTriggered = false;
      }
      return true;
    }
    if (_resetPhase === 'animating') {
      if (_resetTargetLocation) {
        var newTrapLaid = bot.objects.getTileObjectsWithIds([objectIds.boxTrapLayed]).find(o => {
          if (!o) return false;
          var worldLoc = o.getWorldLocation();
          if (!worldLoc) return false;
          return worldLoc.getX() === _resetTargetLocation.getX() && worldLoc.getY() === _resetTargetLocation.getY();
        });
        if (newTrapLaid) {
          logger(state$1, 'debug', 'resetTraps', "Trap reset - object detected. Finding next trap immediately");
          var _key = "".concat(_resetTargetLocation.getX(), ",").concat(_resetTargetLocation.getY());
          shakingTrapTimestamps.delete(_key);
          failedTrapTimestamps.delete(_key);
          var nextOldestTrap = null;
          var nextOldestTime = Number.POSITIVE_INFINITY;
          var _iterator3 = _createForOfIteratorHelper(trapLocationsCache$1),
            _step3;
          try {
            var _loop3 = function _loop3() {
                var loc = _step3.value;
                var locKey = "".concat(loc.getX(), ",").concat(loc.getY());
                if (!playerLaidTraps.has(locKey)) return 0; // continue
                if (locKey === _key) return 0; // continue
                var shakingTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Shaking]).find(o => {
                  if (!o) return false;
                  var worldLoc = o.getWorldLocation();
                  if (!worldLoc) return false;
                  return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
                });
                if (shakingTrap) {
                  var timestamp = shakingTrapTimestamps.get(locKey) || Date.now();
                  if (timestamp < nextOldestTime) {
                    nextOldestTime = timestamp;
                    nextOldestTrap = shakingTrap;
                  }
                }
              },
              _ret;
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _ret = _loop3();
              if (_ret === 0) continue;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          var _iterator4 = _createForOfIteratorHelper(trapLocationsCache$1),
            _step4;
          try {
            var _loop4 = function _loop4() {
                var loc = _step4.value;
                var locKey = "".concat(loc.getX(), ",").concat(loc.getY());
                if (!playerLaidTraps.has(locKey)) return 0; // continue
                if (locKey === _key) return 0; // continue
                var failedTrap = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Failed]).find(o => {
                  if (!o) return false;
                  var worldLoc = o.getWorldLocation();
                  if (!worldLoc) return false;
                  return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
                });
                if (failedTrap) {
                  var timestamp = failedTrapTimestamps.get(locKey) || Date.now();
                  if (timestamp < nextOldestTime) {
                    nextOldestTime = timestamp;
                    nextOldestTrap = failedTrap;
                  }
                }
              },
              _ret2;
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              _ret2 = _loop4();
              if (_ret2 === 0) continue;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          if (nextOldestTrap) {
            bot.objects.interactSuppliedObject(nextOldestTrap, 'Reset');
            _resetInProgress = true;
            _resetTargetLocation = nextOldestTrap.getWorldLocation();
            _resetPhase = 'animating';
            _resetTickCount = 0;
            _nextTrapSearchAttempts = 0;
            return true;
          }
          _nextTrapSearchAttempts++;
          if (_nextTrapSearchAttempts >= 3) {
            logger(state$1, 'debug', 'resetTraps', "No traps found after ".concat(_nextTrapSearchAttempts, " attempts, exiting reset sequence."));
            _resetInProgress = false;
            _resetTargetLocation = null;
            _resetPhase = null;
            _resetTickCount = 0;
            _nextTrapSearchAttempts = 0;
            _tickManipulationTriggered = false;
            return true;
          }
          return true;
        }
      }
      _resetTickCount++;
      if (_resetTickCount > 10) {
        _resetInProgress = false;
        _resetTargetLocation = null;
        _resetPhase = null;
        _resetTickCount = 0;
        _nextTrapSearchAttempts = 0;
        _tickManipulationTriggered = false;
      }
      return true;
    }
    return false;
  }
  var oldestTrap = maintainedOldestTrap;
  if (utilState.groundTrapHandlingLocation !== null && handleGroundTraps()) {
    _resetInProgress = true;
    return true;
  }
  if (isPlayerOnTrapLocation()) ;
  if (!oldestTrap) {
    if (handleGroundTraps()) {
      _resetInProgress = true;
      return true;
    }
    _resetInProgress = false;
    return false;
  }
  var ageInMs = Date.now() - oldestTrap.timestamp;
  var ageInTicks = Math.floor(ageInMs / 600);
  logger(state$1, 'debug', 'resetTraps', "Starting reset sequence for ".concat(oldestTrap.type, " trap at (").concat(oldestTrap.loc.getX(), ", ").concat(oldestTrap.loc.getY(), ") - age: ").concat(ageInTicks, " ticks"));
  var key = "".concat(oldestTrap.loc.getX(), ",").concat(oldestTrap.loc.getY());
  if (oldestTrap.type === 'shaking') {
    shakingTrapTimestamps.delete(key);
  } else {
    failedTrapTimestamps.delete(key);
  }
  bot.objects.interactSuppliedObject(oldestTrap.trap, 'Reset');
  _resetInProgress = true;
  _resetTargetLocation = oldestTrap.loc;
  _resetPhase = 'animating';
  _resetTickCount = 0;
  return true;
}
function layingInitialTraps(maxAllowed, trapsOnGround) {
  if (trapsOnGround >= maxAllowed) {
    return;
  }
  if (_layingTrapLocation !== null) {
    var playerWp = client.getLocalPlayer().getWorldLocation();
    if (_layingPhase === 'walking') {
      var atTarget = playerWp.equals(_layingTrapLocation);
      var dx = Math.abs(playerWp.getX() - _layingTrapLocation.getX());
      var dy = Math.abs(playerWp.getY() - _layingTrapLocation.getY());
      if (atTarget || dx <= 2 && dy <= 2) {
        bot.inventory.interactWithIds([itemIds.boxTrap], ['Lay']);
        logger(state$1, 'debug', 'layingInitialTraps', "Laying trap at location ".concat(_layingLocationIndex + 1));
        _layingPhase = 'animating';
        _layingTickCount = 0;
      } else if (!_isPlayerMoving) {
        _layingTrapLocation = null;
        _layingPhase = null;
        _tickManipulationTriggered = false;
        _layingWalkCommandIssued = false;
      }
      return;
    }
    if (_layingPhase === 'animating') {
      if (_layingTrapLocation) {
        var newTrapLaid = bot.objects.getTileObjectsWithIds([objectIds.boxTrapLayed]).find(o => {
          if (!o) return false;
          var worldLoc = o.getWorldLocation();
          if (!worldLoc) return false;
          return worldLoc.getX() === _layingTrapLocation.getX() && worldLoc.getY() === _layingTrapLocation.getY();
        });
        if (newTrapLaid) {
          logger(state$1, 'debug', 'layingInitialTraps', "Trap laid - object detected. Issuing next walk immediately");
          var key = "".concat(_layingTrapLocation.getX(), ",").concat(_layingTrapLocation.getY());
          playerLaidTraps.add(key);
          var nextLocation = null;
          for (var index = _layingLocationIndex + 1; index < trapLocationsCache$1.length; index++) {
            var loc = trapLocationsCache$1[index];
            if (!isOccupiedByTrapOrGround(loc)) {
              nextLocation = loc;
              break;
            }
          }
          if (nextLocation) {
            bot.walking.walkToWorldPoint(nextLocation.getX(), nextLocation.getY());
          }
          _layingTrapLocation = null;
          _layingPhase = null;
          _layingTickCount = 0;
          _tickManipulationTriggered = false;
          _layingLocationIndex++;
          _layingWalkCommandIssued = false;
        }
      }
      _layingTickCount++;
      if (_layingTickCount > 10) {
        _layingTrapLocation = null;
        _layingPhase = null;
        _layingTickCount = 0;
        _tickManipulationTriggered = false;
        _layingWalkCommandIssued = false;
      }
      return;
    }
  }
  for (var _index = _layingLocationIndex; _index < trapLocationsCache$1.length; _index++) {
    var _loc = trapLocationsCache$1[_index];
    if (trapsOnGround >= maxAllowed) {
      return;
    }
    var occupied = isOccupiedByTrapOrGround(_loc);
    if (!occupied && !_tickManipulationTriggered && bot.inventory.containsId(itemIds.boxTrap)) {
      var _playerWp = client.getLocalPlayer().getWorldLocation();
      if (!_playerWp.equals(_loc)) {
        if (!_layingWalkCommandIssued) {
          bot.walking.walkToWorldPoint(_loc.getX(), _loc.getY());
          _layingWalkCommandIssued = true;
          logger(state$1, 'debug', 'layingInitialTraps', "Walking to trap location");
        }
        _layingTrapLocation = _loc;
        _layingPhase = 'walking';
        _layingLocationIndex = _index;
        _tickManipulationTriggered = true;
        return;
      }
      _layingTrapLocation = _loc;
      _layingPhase = 'walking';
      _layingLocationIndex = _index;
      _tickManipulationTriggered = true;
      return;
    }
  }
}
function isPlayerOnTrapLocation() {
  var playerWp = client.getLocalPlayer().getWorldLocation();
  return trapLocationsCache$1.some(loc => loc.getX() === playerWp.getX() && loc.getY() === playerWp.getY());
}
function moveToSafeTileIfNeeded() {
  var playerWp = client.getLocalPlayer().getWorldLocation();
  var isOnSafeTile = safeTilesCache.some(safeTile => safeTile.getX() === playerWp.getX() && safeTile.getY() === playerWp.getY());
  if (isOnSafeTile) {
    return false;
  }
  var closestSafeTile = null;
  var closestDistance = Number.POSITIVE_INFINITY;
  var _iterator5 = _createForOfIteratorHelper(safeTilesCache),
    _step5;
  try {
    var _loop5 = function _loop5() {
      var safeTile = _step5.value;
      var dx = playerWp.getX() - safeTile.getX();
      var dy = playerWp.getY() - safeTile.getY();
      var distance = Math.hypot(dx, dy);
      var within2TilesOfAllTraps = trapLocationsCache$1.every(trapLoc => {
        var trapDx = Math.abs(safeTile.getX() - trapLoc.getX());
        var trapDy = Math.abs(safeTile.getY() - trapLoc.getY());
        return trapDx <= 2 && trapDy <= 2;
      });
      if (within2TilesOfAllTraps && distance < closestDistance) {
        closestDistance = distance;
        closestSafeTile = safeTile;
      }
    };
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      _loop5();
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if (closestSafeTile) {
    logger(state$1, 'debug', 'moveToSafeTileIfNeeded', "Moving to safe tile (".concat(closestSafeTile.getX(), ", ").concat(closestSafeTile.getY(), ") to stay within 2 tiles of all traps"));
    bot.walking.walkToWorldPoint(closestSafeTile.getX(), closestSafeTile.getY());
    profChinsUI.currentAction = 'Positioning';
    return true;
  }
  return false;
}
function criticalTrapChecker() {
  var CRITICAL_TICK_THRESHOLD = 80;
  var now = Date.now();
  var _iterator6 = _createForOfIteratorHelper(trapLocationsCache$1),
    _step6;
  try {
    var _loop6 = function _loop6() {
        var loc = _step6.value;
        var key = "".concat(loc.getX(), ",").concat(loc.getY());
        if (!playerLaidTraps.has(key)) return 0; // continue
        var shaking = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Shaking]).find(o => {
          if (!o) return false;
          var worldLoc = o.getWorldLocation();
          if (!worldLoc) return false;
          return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
        });
        if (shaking) {
          var timestamp = shakingTrapTimestamps.get(key) || now;
          var ageInSeconds = (now - timestamp) / 1000;
          var ageInTicks = Math.floor(ageInSeconds / 0.6);
          if (ageInTicks >= CRITICAL_TICK_THRESHOLD) {
            logger(state$1, 'all', 'criticalTrapChecker', "CRITICAL: Shaking trap at (".concat(loc.getX(), ", ").concat(loc.getY(), ") hit 80-tick timeout! Age: ").concat(ageInTicks, " ticks. Forcing reset!"));
            utilState.resetInProgress = true;
            utilState.resetTargetLocation = loc;
            utilState.resetPhase = 'walking';
            return {
              v: true
            };
          }
        }
      },
      _ret3;
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      _ret3 = _loop6();
      if (_ret3 === 0) continue;
      if (_ret3) return _ret3.v;
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var _iterator7 = _createForOfIteratorHelper(trapLocationsCache$1),
    _step7;
  try {
    var _loop7 = function _loop7() {
        var loc = _step7.value;
        var key = "".concat(loc.getX(), ",").concat(loc.getY());
        if (!playerLaidTraps.has(key)) return 0; // continue
        var failed = bot.objects.getTileObjectsWithIds([objectIds.boxTrap_Failed]).find(o => {
          if (!o) return false;
          var worldLoc = o.getWorldLocation();
          if (!worldLoc) return false;
          return worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY();
        });
        if (failed) {
          var timestamp = failedTrapTimestamps.get(key) || now;
          var ageInSeconds = (now - timestamp) / 1000;
          var ageInTicks = Math.floor(ageInSeconds / 0.6);
          if (ageInTicks >= CRITICAL_TICK_THRESHOLD) {
            logger(state$1, 'all', 'criticalTrapChecker', "CRITICAL: Failed trap at (".concat(loc.getX(), ", ").concat(loc.getY(), ") hit 80-tick timeout! Age: ").concat(ageInTicks, " ticks. Forcing reset!"));
            utilState.resetInProgress = true;
            utilState.resetTargetLocation = loc;
            utilState.resetPhase = 'walking';
            return {
              v: true
            };
          }
        }
      },
      _ret4;
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      _ret4 = _loop7();
      if (_ret4 === 0) continue;
      if (_ret4) return _ret4.v;
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return false;
}
function handleGroundTraps() {
  if (_groundTrapJustLaid) {
    if (bot.localPlayerIdle()) {
      _groundTrapJustLaid = false;
      return false;
    }
    return true;
  }
  if (utilState.groundTrapHandlingLocation) {
    var targetLoc = utilState.groundTrapHandlingLocation;
    var trapLaidAtLocation = bot.objects.getTileObjectsWithIds([objectIds.boxTrapLayed]).find(o => {
      if (!o) return false;
      var worldLoc = o.getWorldLocation();
      if (!worldLoc) return false;
      return worldLoc.getX() === targetLoc.getX() && worldLoc.getY() === targetLoc.getY();
    });
    if (trapLaidAtLocation) {
      logger(state$1, 'debug', 'handleGroundTraps', "Trap successfully laid at (".concat(targetLoc.getX(), ", ").concat(targetLoc.getY(), "). Waiting for player to idle before repositioning."));
      utilState.groundTrapHandlingLocation = null;
      utilState.groundTrapTickCount = 0;
      _groundTrapJustLaid = true;
      return true;
    }
    utilState.groundTrapTickCount++;
    if (utilState.groundTrapTickCount === 2 && bot.inventory.containsId(itemIds.boxTrap)) {
      logger(state$1, 'debug', 'handleGroundTraps', "Laying trap from inventory at (".concat(targetLoc.getX(), ", ").concat(targetLoc.getY(), ")."));
      bot.inventory.interactWithIds([itemIds.boxTrap], ['Lay']);
      profChinsUI.currentAction = 'Laying trap';
    }
    if (utilState.groundTrapTickCount > 10) {
      logger(state$1, 'debug', 'handleGroundTraps', "Timeout waiting for trap at (".concat(targetLoc.getX(), ", ").concat(targetLoc.getY(), "). Resetting state."));
      utilState.groundTrapHandlingLocation = null;
      utilState.groundTrapTickCount = 0;
      return false;
    }
    return true;
  }
  var groundTraps = bot.tileItems.getItemsWithIds([itemIds.boxTrap]);
  var _iterator8 = _createForOfIteratorHelper(groundTraps),
    _step8;
  try {
    var _loop8 = function _loop8() {
        var groundTrap = _step8.value;
        if (!groundTrap || !groundTrap.tile) return 0; // continue
        var trapLoc = groundTrap.tile.getWorldLocation();
        if (!trapLoc) return 0; // continue
        var isAtCachedLocation = trapLocationsCache$1.some(loc => loc.getX() === trapLoc.getX() && loc.getY() === trapLoc.getY());
        if (isAtCachedLocation) {
          utilState.groundTrapHandlingLocation = trapLoc;
          utilState.groundTrapTickCount = 0;
          logger(state$1, 'debug', 'handleGroundTraps', "Looting trap from ground at (".concat(trapLoc.getX(), ", ").concat(trapLoc.getY(), ")."));
          bot.tileItems.lootItem(groundTrap);
          profChinsUI.currentAction = 'Looting fallen trap';
          var relayKey = "".concat(trapLoc.getX(), ",").concat(trapLoc.getY());
          playerLaidTraps.add(relayKey);
          return {
            v: true
          };
        }
      },
      _ret5;
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      _ret5 = _loop8();
      if (_ret5 === 0) continue;
      if (_ret5) return _ret5.v;
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  return false;
}
var utilFunctions = {
  maxTraps,
  getInitialTrapLocations,
  getSafeTiles,
  isOccupiedByTrapOrGround,
  maintainAllTrapTimestamps,
  resetTraps,
  layingInitialTraps,
  isPlayerOnTrapLocation,
  moveToSafeTileIfNeeded,
  criticalTrapChecker,
  handleGroundTraps
};

var state = {
  debugEnabled: true,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  scriptInitialized: false,
  scriptName: 'profChins',
  uiCompleted: false,
  timeout: 0,
  gameTick: 0,
  sub_State: ''
};
var lastLoggedState = '';
var stuckStateTracker = {
  currentState: '',
  tickCount: 0
};
var MAX_TICKS_PER_STATE = 8;
var player_location;
try {
  var localPlayer = client.getLocalPlayer();
  if (!localPlayer) {
    bot.printGameMessage('ERROR: Could not get local player on startup. Script stopping.');
    throw new Error('Local player is null at startup');
  }
  player_location = localPlayer.getWorldLocation();
  if (!player_location) {
    bot.printGameMessage('ERROR: Could not get player world location on startup. Script stopping.');
    throw new Error('Player world location is null at startup');
  }
} catch (error) {
  bot.printGameMessage("FATAL: Player initialization failed: ".concat(String(error)));
  throw error;
}
var hunterLvl;
try {
  hunterLvl = client.getRealSkillLevel(net.runelite.api.Skill.HUNTER);
  if (hunterLvl === undefined || hunterLvl === null || hunterLvl < 0) {
    bot.printGameMessage('ERROR: Could not get valid hunter level. Script stopping.');
    throw new Error('Hunter level is invalid at startup');
  }
} catch (error) {
  bot.printGameMessage("FATAL: Hunter level initialization failed: ".concat(String(error)));
  throw error;
}
initializeUtilFunctions(state, [], [], player_location, hunterLvl);
var initialTrapLocations = utilFunctions.getInitialTrapLocations();
initializeUtilFunctions(state, initialTrapLocations, [], player_location, hunterLvl);
var initialSafeTiles = utilFunctions.getSafeTiles();
initializeUtilFunctions(state, initialTrapLocations, initialSafeTiles, player_location, hunterLvl);
var trapLocationsCache = initialTrapLocations;
function onStart() {
  try {
    state.uiCompleted = true;
    try {
      initializeUI(state, trapLocationsCache, utilFunctions.isOccupiedByTrapOrGround, utilFunctions.maxTraps);
    } catch (error) {
      bot.printGameMessage("Error in initializeUI: ".concat(String(error)));
    }
    try {
      profChinsUI.disableBotMakerOverlay();
    } catch (error) {
      bot.printGameMessage("Error in disableBotMakerOverlay: ".concat(String(error)));
    }
    try {
      profChinsUI.start();
    } catch (error) {
      bot.printGameMessage("Error in profChinsUI.start: ".concat(String(error)));
    }
    try {
      var hunterXp = client.getSkillExperience(net.runelite.api.Skill.HUNTER);
      profChinsUI.lastHunterXp = hunterXp;
    } catch (error) {
      bot.printGameMessage("Error getting hunter XP: ".concat(String(error)));
    }
    logger(state, 'all', 'script', String(state.scriptName) + ' started.');
  } catch (error) {
    try {
      logger(state, 'all', 'Script', String(error));
    } catch (_unused) {
      bot.printGameMessage("Critical error: ".concat(String(error)));
    }
    bot.terminate();
  }
}
function onGameTick() {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitialized) notifyScriptInitialized();
      state.scriptInitialized = true;
    } else {
      return;
    }
    if (!generalFunctions.gameTick(state)) return;
    utilState.isPlayerMoving = bot.walking.isWebWalking();
    utilFunctions.maintainAllTrapTimestamps();
    var currentHunterXp = client.getSkillExperience(net.runelite.api.Skill.HUNTER);
    if (currentHunterXp > profChinsUI.lastHunterXp) {
      profChinsUI.totalChinsCaught++;
      logger(state, 'debug', 'onGameTick', "Hunter XP gained. Total chins caught: ".concat(profChinsUI.totalChinsCaught));
      profChinsUI.lastHunterXp = currentHunterXp;
    }
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'start_state') bot.breakHandler.setBreakHandlerStatus(true);
    var excludeFromStuckDetection = ['initial_traps', 'resetting_traps'];
    if (excludeFromStuckDetection.includes(state.mainState)) {
      stuckStateTracker.currentState = state.mainState;
      stuckStateTracker.tickCount = 0;
    } else {
      if (stuckStateTracker.currentState === state.mainState) {
        stuckStateTracker.tickCount++;
        if (stuckStateTracker.tickCount > MAX_TICKS_PER_STATE) {
          logger(state, 'debug', 'stuckStateDetection', "Stuck in ".concat(state.mainState, " for ").concat(stuckStateTracker.tickCount, " ticks. Resetting to maintaining_traps."));
          state.mainState = 'maintaining_traps';
          stuckStateTracker.currentState = '';
          stuckStateTracker.tickCount = 0;
        }
      } else {
        stuckStateTracker.currentState = state.mainState;
        stuckStateTracker.tickCount = 0;
      }
    }
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
}
function notifyScriptInitialized() {
  bot.printGameMessage('Script initialized.');
}
function onEnd() {
  profChinsUI.stop();
  profChinsUI.enableBotMakerOverlay();
  generalFunctions.endScript(state);
}
function stateManager() {
  try {
    if (state.mainState !== lastLoggedState) {
      logger(state, 'debug', 'stateManager', "State changed to: ".concat(state.mainState));
      lastLoggedState = state.mainState;
    }
    var maxAllowed = utilFunctions.maxTraps();
    var trapsOnGround = 0;
    var _iterator = _createForOfIteratorHelper(trapLocationsCache),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var loc = _step.value;
        if (!loc) continue;
        if (utilFunctions.isOccupiedByTrapOrGround(loc)) {
          trapsOnGround++;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    switch (state.mainState) {
      case 'start_state':
        {
          try {
            profChinsUI.currentAction = 'Starting...';
            var trapCount = bot.inventory.getQuantityOfId(itemIds.boxTrap);
            if (!trapCount && trapCount !== 0) {
              bot.printGameMessage('ERROR: Could not get trap quantity from inventory');
              bot.terminate();
              return;
            }
            if (trapCount >= maxAllowed) {
              state.mainState = 'initial_traps';
            } else {
              profChinsUI.currentAction = 'Error: Not enough traps';
              logger(state, 'debug', 'stateManager', "Not enough box traps (have ".concat(trapCount, ", need ").concat(maxAllowed, ")"));
              bot.terminate();
            }
          } catch (error) {
            bot.printGameMessage("ERROR in start_state: ".concat(String(error)));
            bot.terminate();
          }
          break;
        }
      case 'initial_traps':
        {
          var action = 'Laying initial traps';
          if (profChinsUI.currentAction !== action) {
            profChinsUI.currentAction = action;
            logger(state, 'debug', 'stateManager', 'Placing initial traps.');
          }
          if (trapsOnGround >= maxAllowed) {
            state.mainState = 'awaiting_activity';
            utilState.layingLocationIndex = 0;
            return;
          }
          utilFunctions.layingInitialTraps(maxAllowed, trapsOnGround);
          break;
        }
      case 'awaiting_activity':
        {
          var _action = 'Awaiting trap activity';
          if (profChinsUI.currentAction !== _action) {
            profChinsUI.currentAction = _action;
            logger(state, 'debug', 'stateManager', 'Awaiting trap activity.');
          }
          if (trapsOnGround > 0) {
            profChinsUI.currentAction = _action;
            logger(state, 'debug', 'stateManager', 'Maintaining traps.');
          }
          if (!utilState.resetInProgress && utilFunctions.criticalTrapChecker()) {
            state.mainState = 'critical_trap_handling';
          } else if (utilState.resetInProgress) {
            state.mainState = 'resetting_traps';
          } else {
            state.mainState = 'resetting_traps';
          }
          break;
        }
      case 'critical_trap_handling':
        {
          var _action2 = 'Maintaining traps';
          if (profChinsUI.currentAction !== _action2) {
            profChinsUI.currentAction = _action2;
          }
          if (!utilState.resetInProgress && utilFunctions.criticalTrapChecker()) {
            utilFunctions.resetTraps();
          } else {
            state.mainState = 'maintaining_traps';
          }
          break;
        }
      case 'resetting_traps':
        {
          var _action3 = 'Maintaining traps';
          if (profChinsUI.currentAction !== _action3) {
            profChinsUI.currentAction = _action3;
          }
          utilFunctions.resetTraps();
          if (!utilState.resetInProgress) {
            state.mainState = 'maintaining_traps';
          }
          break;
        }
      case 'maintaining_traps':
        {
          state.mainState = 'awaiting_activity';
          break;
        }
      default:
        {
          state.mainState = 'start_state';
          break;
        }
    }
  } catch (error) {
    var errorMessage = String(error);
    bot.printGameMessage("CRITICAL ERROR in stateManager: ".concat(errorMessage));
    logger(state, 'all', 'stateManager', "Critical error: ".concat(errorMessage));
    bot.terminate();
  }
}


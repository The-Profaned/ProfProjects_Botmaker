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
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
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

var logger = (state, type, source, message) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  if (type === 'all') log.printGameMessage(logMessage);
  if (type === 'all' || type === 'debug' && state.debugEnabled) log.print(logMessage);
};

function createUi(_state) {}

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

var NpcID = net.runelite.api.gameval.NpcID;
var ItemID = net.runelite.api.ItemID;

var NPC = {
  leviathan: NpcID.LEVIATHAN,
  leviathanQuest: NpcID.LEVIATHAN_QUEST,
  abbyssalPathfinder: NpcID.LEVIATHAN_BUFF_NPC,
  graveDefault: NpcID.GRAVESTONE_DEFAULT,
  graveAngel: NpcID.GRAVESTONE_ANGEL
};
var npcGroupIds = {
  leviathans: [NPC.leviathan, NPC.leviathanQuest]
};
var animationPrayerMap = {};
var animationTypeMap = {};
var projectilePrayerMap = {};
var projectileTypeMap = {};

var prayers = {
  protMelee: net.runelite.api.Prayer.PROTECT_FROM_MELEE,
  protMage: net.runelite.api.Prayer.PROTECT_FROM_MAGIC,
  protRange: net.runelite.api.Prayer.PROTECT_FROM_MISSILES,
  piety: net.runelite.api.Prayer.PIETY,
  eagleEye: net.runelite.api.Prayer.EAGLE_EYE,
  rigour: net.runelite.api.Prayer.RIGOUR,
  mysticMight: net.runelite.api.Prayer.MYSTIC_MIGHT,
  augury: net.runelite.api.Prayer.AUGURY,
  redemption: net.runelite.api.Prayer.REDEMPTION,
  smite: net.runelite.api.Prayer.SMITE
};
var prayerFunctions = {
  checkPrayer: (state, prayerKey) => {
    var prayer = prayers[prayerKey];
    if (!prayer) {
      logger(state, 'debug', 'checkPrayer', "Unknown prayer key: ".concat(prayerKey));
      return false;
    }
    var active = client.isPrayerActive(prayer);
    logger(state, 'debug', 'checkPrayer', "".concat(prayerKey, " is ").concat(active ? 'active' : 'inactive'));
    return active;
  },
  togglePrayer: (state, prayerKey) => {
    var prayer = prayers[prayerKey];
    logger(state, 'debug', 'togglePrayer', "Activating prayer: ".concat(prayerKey));
    if (!prayer) {
      logger(state, 'debug', 'togglePrayer', "Unknown prayer key: ".concat(prayerKey));
      return false;
    }
    if (client.isPrayerActive(prayer)) {
      logger(state, 'debug', 'togglePrayer', "".concat(prayerKey, " already active"));
      return true;
    }
    bot.prayer.togglePrayer(prayer, true);
    var nowActive = client.isPrayerActive(prayer);
    logger(state, 'debug', 'togglePrayer', "".concat(prayerKey, " activated ").concat(nowActive ? 'successfully' : '(failed)'));
    return nowActive;
  },
  getActivePrayer: state => {
    var protectionPrayers = ['protMage', 'protRange', 'protMelee'];
    for (var _i = 0, _protectionPrayers = protectionPrayers; _i < _protectionPrayers.length; _i++) {
      var prayer = _protectionPrayers[_i];
      if (prayerFunctions.checkPrayer(state, prayer)) {
        logger(state, 'debug', 'getActivePrayer', "Active prayer: ".concat(prayer));
        return prayer;
      }
    }
    logger(state, 'debug', 'getActivePrayer', 'No active protection prayer');
    return null;
  }
};

var projectileFunctions = {
  trackedProjectiles: new Map(),
  projectileHitTimes: new Map(),
  initializeProjectileTracking: state => {
    logger(state, 'debug', 'initializeProjectileTracking', 'Projectile tracking initialized (polling-based).');
  },
  updateProjectileDistance: state => {
    var _bot$projectiles$getP, _bot$projectiles, _bot$projectiles$getP2, _client, _client$getLocalPlaye, _player$getWorldLocat;
    var trackedProjectileIds = Object.keys(projectilePrayerMap).concat(Object.keys(projectileTypeMap)).map(Number);
    if (trackedProjectileIds.length === 0) return;
    var projectiles = (_bot$projectiles$getP = (_bot$projectiles = bot.projectiles) === null || _bot$projectiles === void 0 || (_bot$projectiles$getP2 = _bot$projectiles.getProjectilesWithIds) === null || _bot$projectiles$getP2 === void 0 ? void 0 : _bot$projectiles$getP2.call(_bot$projectiles, trackedProjectileIds)) !== null && _bot$projectiles$getP !== void 0 ? _bot$projectiles$getP : [];
    var player = (_client = client) === null || _client === void 0 || (_client$getLocalPlaye = _client.getLocalPlayer) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.call(_client);
    var playerLoc = player === null || player === void 0 || (_player$getWorldLocat = player.getWorldLocation) === null || _player$getWorldLocat === void 0 ? void 0 : _player$getWorldLocat.call(player);
    if (!playerLoc) return;
    var maxDistance = 10;
    var currentProjectileIds = new Set();
    var _iterator = _createForOfIteratorHelper(projectiles),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _projectile$getWorldL;
        var projectileRaw = _step.value;
        var projectile = projectileRaw;
        var id = void 0;
        if (typeof projectile.getId === 'function') {
          id = projectile.getId();
        } else if (typeof projectile.id === 'number') {
          id = projectile.id;
        }
        var projLoc = (_projectile$getWorldL = projectile.getWorldLocation) === null || _projectile$getWorldL === void 0 ? void 0 : _projectile$getWorldL.call(projectile);
        if (!(projLoc !== null && projLoc !== void 0 && projLoc.distanceTo) || typeof id !== 'number') continue;
        var distance = projLoc.distanceTo(playerLoc);
        if (distance <= maxDistance) {
          var _projectile$getX, _projectile$getY, _projectile$getRemain, _projectile$getStartC, _projectile$getEndCyc;
          currentProjectileIds.add(id);
          var targetX = (_projectile$getX = projectile.getX) === null || _projectile$getX === void 0 ? void 0 : _projectile$getX.call(projectile);
          var targetY = (_projectile$getY = projectile.getY) === null || _projectile$getY === void 0 ? void 0 : _projectile$getY.call(projectile);
          var remainingCycles = (_projectile$getRemain = projectile.getRemainingCycles) === null || _projectile$getRemain === void 0 ? void 0 : _projectile$getRemain.call(projectile);
          var ticksUntilHit = remainingCycles ? Math.ceil(remainingCycles / 30) : undefined;
          var startCycle = (_projectile$getStartC = projectile.getStartCycle) === null || _projectile$getStartC === void 0 ? void 0 : _projectile$getStartC.call(projectile);
          var endCycle = (_projectile$getEndCyc = projectile.getEndCycle) === null || _projectile$getEndCyc === void 0 ? void 0 : _projectile$getEndCyc.call(projectile);
          if (projectileFunctions.trackedProjectiles.has(id)) {
            var tracked = projectileFunctions.trackedProjectiles.get(id);
            tracked.distance = distance;
            tracked.ticksUntilHit = ticksUntilHit;
          } else {
            projectileFunctions.trackedProjectiles.set(id, {
              id,
              distance,
              hasHit: false,
              targetX,
              targetY,
              ticksUntilHit,
              startCycle,
              endCycle
            });
            logger(state, 'debug', 'updateProjectileDistance', "Tracking projectile ".concat(id, " at distance ").concat(distance, ", hits in ").concat(ticksUntilHit, " ticks at (").concat(targetX, ", ").concat(targetY, ")"));
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(projectileFunctions.trackedProjectiles.keys()),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _id = _step2.value;
        if (!currentProjectileIds.has(_id)) {
          projectileFunctions.recordProjectileHit(state, _id);
          projectileFunctions.trackedProjectiles.delete(_id);
          logger(state, 'debug', 'updateProjectileDistance', "Projectile ".concat(_id, " out of range"));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  },
  getSortedProjectiles: state => {
    var sorted = Array.from(projectileFunctions.trackedProjectiles.values()).filter(p => !p.hasHit).sort((a, b) => a.distance - b.distance);
    if (sorted.length > 0) {
      logger(state, 'debug', 'getSortedProjectiles', "Found ".concat(sorted.length, " active projectiles. Closest: ID ").concat(sorted[0].id, " at distance ").concat(sorted[0].distance, " tiles, ETA ").concat(sorted[0].ticksUntilHit, " ticks."));
    }
    return sorted;
  },
  projectileType: (state, projectile) => {
    var id;
    if (typeof projectile.getId === 'function') {
      id = projectile.getId();
    } else if (typeof projectile.id === 'number') {
      id = projectile.id;
    }
    var type = typeof id === 'number' && projectileTypeMap[id] ? projectileTypeMap[id] : 'unknown';
    logger(state, 'debug', 'projectileType', "Projectile id=".concat(id, " classified as ").concat(type, "."));
    return type;
  },
  prayProjectile: (state, projectile) => {
    var id;
    if (typeof projectile.getId === 'function') {
      id = projectile.getId();
    } else if (typeof projectile.id === 'number') {
      id = projectile.id;
    }
    var prayerKey = typeof id === 'number' && projectilePrayerMap[id] ? projectilePrayerMap[id] : undefined;
    if (!prayerKey) {
      logger(state, 'debug', 'prayProjectile', "No prayer mapping for projectile id=".concat(id, "."));
      return false;
    }
    logger(state, 'debug', 'prayProjectile', "Toggling prayer for projectile id=".concat(id, ": ").concat(prayerKey));
    return prayerFunctions.togglePrayer(state, prayerKey);
  },
  getProjectileMapValue: (projectileId, map) => {
    var _map$projectileId;
    return (_map$projectileId = map[projectileId]) !== null && _map$projectileId !== void 0 ? _map$projectileId : null;
  },
  getPrayerKeyForProjectile: projectileId => {
    return projectileFunctions.getProjectileMapValue(projectileId, projectilePrayerMap);
  },
  getTypeKeyForProjectile: projectileId => {
    return projectileFunctions.getProjectileMapValue(projectileId, projectileTypeMap);
  },
  getSortedNpcAttacksDist: () => {
    return [];
  },
  getPlayerLocation: () => {
    var _client2, _client2$getLocalPlay, _client2$getLocalPlay2;
    return (_client2 = client) === null || _client2 === void 0 || (_client2$getLocalPlay = _client2.getLocalPlayer) === null || _client2$getLocalPlay === void 0 || (_client2$getLocalPlay = _client2$getLocalPlay.call(_client2)) === null || _client2$getLocalPlay === void 0 || (_client2$getLocalPlay2 = _client2$getLocalPlay.getWorldLocation) === null || _client2$getLocalPlay2 === void 0 ? void 0 : _client2$getLocalPlay2.call(_client2$getLocalPlay);
  },
  willHitPlayer: projectile => {
    var _projectile$getX2, _projectile$getY2, _projectile$getFloor;
    var playerLoc = projectileFunctions.getPlayerLocation();
    if (!playerLoc) return false;
    var targetX = (_projectile$getX2 = projectile.getX) === null || _projectile$getX2 === void 0 ? void 0 : _projectile$getX2.call(projectile);
    var targetY = (_projectile$getY2 = projectile.getY) === null || _projectile$getY2 === void 0 ? void 0 : _projectile$getY2.call(projectile);
    var plane = (_projectile$getFloor = projectile.getFloor) === null || _projectile$getFloor === void 0 ? void 0 : _projectile$getFloor.call(projectile);
    return targetX === playerLoc.getX() && targetY === playerLoc.getY() && plane === playerLoc.getPlane();
  },
  getProjectilesTargetingPlayer: () => {
    var playerLoc = projectileFunctions.getPlayerLocation();
    return Array.from(projectileFunctions.trackedProjectiles.values()).filter(p => {
      return p.targetX === (playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getX()) && p.targetY === (playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getY());
    }).map(p => {
      var _p$ticksUntilHit;
      return {
        id: p.id,
        ticksUntilHit: (_p$ticksUntilHit = p.ticksUntilHit) !== null && _p$ticksUntilHit !== void 0 ? _p$ticksUntilHit : 0
      };
    }).sort((a, b) => a.ticksUntilHit - b.ticksUntilHit);
  },
  recordProjectileHit: (state, projectileId) => {
    if (!projectileFunctions.projectileHitTimes.has(projectileId)) {
      projectileFunctions.projectileHitTimes.set(projectileId, []);
    }
    var hitTimes = projectileFunctions.projectileHitTimes.get(projectileId);
    hitTimes.push(state.gameTick);
    if (hitTimes.length > 20) {
      hitTimes.shift();
    }
  },
  getProjectileHitRate: function getProjectileHitRate(state, projectileId) {
    var windowSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
    var hitTimes = projectileFunctions.projectileHitTimes.get(projectileId) || [];
    var recentHits = hitTimes.filter(tick => state.gameTick - tick < windowSize);
    var intervals = [];
    for (var index = 1; index < recentHits.length; index++) {
      intervals.push(recentHits[index] - recentHits[index - 1]);
    }
    var hitsEveryTick = intervals.length > 0 && intervals.every(interval => interval === 1);
    var projectilesPerTick = recentHits.length > 0 ? recentHits.length / windowSize : 0;
    return {
      projectilesPerTick: Number.parseFloat(projectilesPerTick.toFixed(2)),
      totalHits: recentHits.length,
      hitIntervals: intervals,
      hitsEveryTick
    };
  },
  getAllProjectileHitRates: function getAllProjectileHitRates(state) {
    var windowSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var rates = {};
    var _iterator3 = _createForOfIteratorHelper(projectileFunctions.projectileHitTimes.keys()),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var projectileId = _step3.value;
        rates[projectileId] = projectileFunctions.getProjectileHitRate(state, projectileId, windowSize);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return rates;
  },
  logProjectileHitRates: function logProjectileHitRates(state) {
    var windowSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var rates = projectileFunctions.getAllProjectileHitRates(state, windowSize);
    for (var _i = 0, _Object$entries = Object.entries(rates); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        projectileId = _Object$entries$_i[0],
        rate = _Object$entries$_i[1];
      var rateString = rate.hitsEveryTick ? "EVERY TICK (".concat(rate.projectilesPerTick.toFixed(2), "/tick)") : "".concat(rate.projectilesPerTick.toFixed(2), "/tick, intervals: [").concat(rate.hitIntervals.join(', '), "]");
      logger(state, 'debug', 'getProjectileHitRate', "Projectile ".concat(projectileId, ": ").concat(rateString, " (").concat(rate.totalHits, " hits in last ").concat(windowSize, " ticks)"));
    }
  }
};

var npcFunctions = {
  trackedNpcAttacks: new Map(),
  npcRendered: npcId => bot.npcs.getWithIds([npcId]).length > 0,
  isNpcAlive: npc => {
    var _npc$getHealthRatio, _npc$getHealthRatio2;
    if (!npc) return false;
    return ((_npc$getHealthRatio = (_npc$getHealthRatio2 = npc.getHealthRatio) === null || _npc$getHealthRatio2 === void 0 ? void 0 : _npc$getHealthRatio2.call(npc)) !== null && _npc$getHealthRatio !== void 0 ? _npc$getHealthRatio : 0) > 0;
  },
  getFirstNPC: npcId => bot.npcs.getWithIds([npcId])[0],
  getClosestNPC: npcIds => {
    var npcs = bot.npcs.getWithIds(npcIds);
    if (!(npcs !== null && npcs !== void 0 && npcs.length)) return undefined;
    var closest = null;
    var minDistance = Number.POSITIVE_INFINITY;
    npcs.forEach(npc => {
      var distance = client.getLocalPlayer().getWorldLocation().distanceTo(npc.getWorldLocation());
      if (distance < minDistance) {
        minDistance = distance;
        closest = npc;
      }
    });
    return closest || undefined;
  },
  initializeNpcAttackTracking: state => {
    bot.events.register('AnimationChanged', event => {
      npcFunctions.updateNpcAttackAnimation(state, event);
    }, 0);
    bot.events.register('NpcDespawned', event => {
      npcFunctions.removeNpcAttack(state, event);
    }, 0);
  },
  updateNpcAttackAnimation: (state, event) => {
    var _event$getActor, _event$getAnimationId, _event$getAnimationId2, _npc$getAnimation, _client, _client$getLocalPlaye, _player$getWorldLocat, _npc$getWorldLocation, _actor$isNpc, _npc$getIndex3, _npc$getIndex4;
    var actor = (_event$getActor = event.getActor) === null || _event$getActor === void 0 ? void 0 : _event$getActor.call(event);
    var npc = actor;
    var animationId = (_event$getAnimationId = (_event$getAnimationId2 = event.getAnimationId) === null || _event$getAnimationId2 === void 0 ? void 0 : _event$getAnimationId2.call(event)) !== null && _event$getAnimationId !== void 0 ? _event$getAnimationId : (_npc$getAnimation = npc.getAnimation) === null || _npc$getAnimation === void 0 ? void 0 : _npc$getAnimation.call(npc);
    var prayerKey = animationPrayerMap[animationId];
    var player = (_client = client) === null || _client === void 0 || (_client$getLocalPlaye = _client.getLocalPlayer) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.call(_client);
    var playerLoc = player === null || player === void 0 || (_player$getWorldLocat = player.getWorldLocation) === null || _player$getWorldLocat === void 0 ? void 0 : _player$getWorldLocat.call(player);
    var npcLoc = npc === null || npc === void 0 || (_npc$getWorldLocation = npc.getWorldLocation) === null || _npc$getWorldLocation === void 0 ? void 0 : _npc$getWorldLocation.call(npc);
    var distance = npcLoc.distanceTo(playerLoc);
    var maxDistance = 10;
    if (!(actor !== null && actor !== void 0 && (_actor$isNpc = actor.isNpc) !== null && _actor$isNpc !== void 0 && _actor$isNpc.call(actor))) return;
    if (!animationId) return;
    if (!prayerKey) {
      var _npc$getIndex, _npc$getIndex2;
      npcFunctions.trackedNpcAttacks.delete((_npc$getIndex = (_npc$getIndex2 = npc.getIndex) === null || _npc$getIndex2 === void 0 ? void 0 : _npc$getIndex2.call(npc)) !== null && _npc$getIndex !== void 0 ? _npc$getIndex : -1);
      return;
    }
    if (!playerLoc || !npcLoc) return;
    var npcIndex = (_npc$getIndex3 = (_npc$getIndex4 = npc.getIndex) === null || _npc$getIndex4 === void 0 ? void 0 : _npc$getIndex4.call(npc)) !== null && _npc$getIndex3 !== void 0 ? _npc$getIndex3 : -1;
    if (distance <= maxDistance) {
      npcFunctions.trackedNpcAttacks.set(npcIndex, {
        npcIndex,
        animationId,
        distance
      });
      logger(state, 'debug', 'updateNpcAttackAnimation', "Tracking npc ".concat(npcIndex, " anim=").concat(animationId, " at distance ").concat(distance));
    } else if (npcFunctions.trackedNpcAttacks.has(npcIndex)) {
      npcFunctions.trackedNpcAttacks.delete(npcIndex);
      logger(state, 'debug', 'updateNpcAttackAnimation', "Npc ".concat(npcIndex, " out of range"));
    }
  },
  removeNpcAttack: (state, event) => {
    var _event$getNpc, _npc$getIndex5, _npc$getIndex6;
    var npc = (_event$getNpc = event.getNpc) === null || _event$getNpc === void 0 ? void 0 : _event$getNpc.call(event);
    if (!npc) return;
    var npcIndex = (_npc$getIndex5 = (_npc$getIndex6 = npc.getIndex) === null || _npc$getIndex6 === void 0 ? void 0 : _npc$getIndex6.call(npc)) !== null && _npc$getIndex5 !== void 0 ? _npc$getIndex5 : -1;
    if (npcFunctions.trackedNpcAttacks.has(npcIndex)) {
      npcFunctions.trackedNpcAttacks.delete(npcIndex);
      logger(state, 'debug', 'removeNpcAttack', "Npc ".concat(npcIndex, " despawned/removed"));
    }
  },
  getAnimationMapValue: (animationId, map) => {
    var _map$animationId;
    return (_map$animationId = map[animationId]) !== null && _map$animationId !== void 0 ? _map$animationId : null;
  },
  getPrayerKeyForAnimation: animationId => {
    return npcFunctions.getAnimationMapValue(animationId, animationPrayerMap);
  },
  getTypeKeyForAnimation: animationId => {
    return npcFunctions.getAnimationMapValue(animationId, animationTypeMap);
  },
  npcOrientationToPlayer: npc => {
    var _npc$getOrientation, _npc$getOrientation2;
    if (!npc) {
      return {
        npcOrientation: null,
        angleToPlayer: 0,
        isFacingPlayer: false,
        facingDirection: 'UNKNOWN'
      };
    }
    var player = client.getLocalPlayer();
    if (!player) {
      return {
        npcOrientation: null,
        angleToPlayer: 0,
        isFacingPlayer: false,
        facingDirection: 'UNKNOWN'
      };
    }
    var playerLoc = player.getWorldLocation();
    var npcLoc = npc.getWorldLocation();
    var npcOrientation = (_npc$getOrientation = (_npc$getOrientation2 = npc.getOrientation) === null || _npc$getOrientation2 === void 0 ? void 0 : _npc$getOrientation2.call(npc)) !== null && _npc$getOrientation !== void 0 ? _npc$getOrientation : null;
    var deltaX = playerLoc.getX() - npcLoc.getX();
    var deltaY = playerLoc.getY() - npcLoc.getY();
    var angleToPlayerRad = Math.atan2(deltaY, deltaX);
    var angleToPlayerDeg = angleToPlayerRad * 180 / Math.PI;
    var normalizedAngleToPlayer = (angleToPlayerDeg + 360) % 360;
    var npcFacingDirection = 'UNKNOWN';
    if (npcOrientation !== null) {
      var normalizedOrientation = npcOrientation % 2048;
      if (normalizedOrientation >= 1920 || normalizedOrientation < 128) {
        npcFacingDirection = 'EAST';
      } else if (normalizedOrientation >= 128 && normalizedOrientation < 384) {
        npcFacingDirection = 'NORTHEAST';
      } else if (normalizedOrientation >= 384 && normalizedOrientation < 640) {
        npcFacingDirection = 'NORTH';
      } else if (normalizedOrientation >= 640 && normalizedOrientation < 896) {
        npcFacingDirection = 'NORTHWEST';
      } else if (normalizedOrientation >= 896 && normalizedOrientation < 1152) {
        npcFacingDirection = 'WEST';
      } else if (normalizedOrientation >= 1152 && normalizedOrientation < 1408) {
        npcFacingDirection = 'SOUTHWEST';
      } else if (normalizedOrientation >= 1408 && normalizedOrientation < 1664) {
        npcFacingDirection = 'SOUTH';
      } else if (normalizedOrientation >= 1664 && normalizedOrientation < 1920) {
        npcFacingDirection = 'SOUTHEAST';
      }
    }
    var isFacingPlayer = false;
    if (npcOrientation !== null) {
      var _normalizedOrientation = npcOrientation % 2048;
      var npcFacingDeg = _normalizedOrientation / 2048 * 360;
      var angleDiff = Math.abs(npcFacingDeg - normalizedAngleToPlayer);
      if (angleDiff > 180) {
        angleDiff = 360 - angleDiff;
      }
      isFacingPlayer = angleDiff < 45;
    }
    return {
      npcOrientation,
      angleToPlayer: normalizedAngleToPlayer,
      isFacingPlayer,
      facingDirection: npcFacingDirection
    };
  }
};

var object = {
  leviHandHolds: 47593
};
var dangerousObjectIds = {
  leviFallingRock: 29736,
  books: 1260
};

var tileSets = {
  safeTileSets: {
    leviSafeTiles: [{
      x: 0,
      y: 0,
      plane: 0
    }],
    leviDebrisTiles: {
      north: [{
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }],
      south: [{
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }],
      east: [{
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }],
      west: [{
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }, {
        x: 0,
        y: 0,
        plane: 0
      }]
    }
  },
  dangerousTileSets: {
    leviDangerTiles: [{
      x: 2079,
      y: 6376,
      plane: 0
    }, {
      x: 2080,
      y: 6376,
      plane: 0
    }, {
      x: 2081,
      y: 6376,
      plane: 0
    }, {
      x: 2082,
      y: 6376,
      plane: 0
    }, {
      x: 2083,
      y: 6376,
      plane: 0
    }, {
      x: 2079,
      y: 6368,
      plane: 0
    }, {
      x: 2080,
      y: 6368,
      plane: 0
    }, {
      x: 2081,
      y: 6368,
      plane: 0
    }, {
      x: 2082,
      y: 6368,
      plane: 0
    }, {
      x: 2083,
      y: 6368,
      plane: 0
    }, {
      x: 2085,
      y: 6370,
      plane: 0
    }, {
      x: 2085,
      y: 6371,
      plane: 0
    }, {
      x: 2085,
      y: 6372,
      plane: 0
    }, {
      x: 2085,
      y: 6373,
      plane: 0
    }, {
      x: 2085,
      y: 6374,
      plane: 0
    }, {
      x: 2077,
      y: 6370,
      plane: 0
    }, {
      x: 2077,
      y: 6371,
      plane: 0
    }, {
      x: 2077,
      y: 6372,
      plane: 0
    }, {
      x: 2077,
      y: 6373,
      plane: 0
    }, {
      x: 2077,
      y: 6374,
      plane: 0
    }]
  },
  safeTiles: function safeTiles(setName) {
    return this.safeTileSets[setName] || [];
  },
  dangerousTiles: function dangerousTiles(setName) {
    return this.dangerousTileSets[setName] || [];
  }
};

var tileFunctions = {
  getAction: (tileObjectID, actionIndexToGet) => {
    var _composition$getActio;
    var composition = bot.objects.getTileObjectComposition(tileObjectID);
    var actions = composition === null || composition === void 0 || (_composition$getActio = composition.getActions) === null || _composition$getActio === void 0 ? void 0 : _composition$getActio.call(composition);
    if (!actions || actionIndexToGet < 0 || actionIndexToGet >= actions.length) {
      return null;
    }
    return actions[actionIndexToGet];
  },
  getTileObjectWithID: tileObjectId => {
    var _tileObjectIds$;
    var tileObjectIds = bot.objects.getTileObjectsWithIds([tileObjectId]);
    return (_tileObjectIds$ = tileObjectIds[0]) !== null && _tileObjectIds$ !== void 0 ? _tileObjectIds$ : null;
  },
  validTileName: (tileObjectId, tileName) => bot.objects.getTileObjectComposition(tileObjectId).getName() === tileName,
  getDangerousTiles: () => {
    var ids = Object.values(dangerousObjectIds);
    var dangerousObjects = bot.objects.getTileObjectsWithIds(ids);
    return dangerousObjects.map(obj => obj.getWorldLocation());
  },
  isInTileList: (tile, list) => list.some(t => t.getX() === tile.getX() && t.getY() === tile.getY() && t.getPlane() === tile.getPlane()),
  getSafeTile: (state, searchRadius) => {
    logger(state, 'debug', 'getSafeTile', "Searching for safe tile within ".concat(searchRadius, " tiles."));
    var playerLoc = client.getLocalPlayer().getWorldLocation();
    var dangerousTiles = tileFunctions.getDangerousTiles();
    var safeTilesRaw = tileSets.safeTiles('leviSafeTiles') || [];
    var safeTiles = Array.isArray(safeTilesRaw) ? safeTilesRaw.map(t => new WorldPoint(t.x, t.y, t.plane)) : [];
    if (tileFunctions.isInTileList(playerLoc, dangerousTiles)) {
      logger(state, 'debug', 'getSafeTile', 'Player is standing on DangerousTiles.');
    }
    for (var distribution = 0; distribution <= searchRadius; distribution++) {
      for (var dx = -distribution; dx <= distribution; dx++) {
        for (var dy = -distribution; dy <= distribution; dy++) {
          if (Math.abs(dx) !== distribution && Math.abs(dy) !== distribution) continue;
          var testTile = new WorldPoint(playerLoc.getX() + dx, playerLoc.getY() + dy, playerLoc.getPlane());
          if (tileFunctions.isInTileList(testTile, dangerousTiles)) {
            continue;
          }
          if (safeTiles.length > 0 && !tileFunctions.isInTileList(testTile, safeTiles)) {
            continue;
          }
          logger(state, 'debug', 'getSafeTile', "Found safe tile at (".concat(testTile.getX(), ", ").concat(testTile.getY(), ")"));
          return testTile;
        }
      }
    }
    logger(state, 'debug', 'getSafeTile', 'No safe tile found.');
    return new WorldPoint(playerLoc.getX(), playerLoc.getY(), playerLoc.getPlane());
  },
  isPlayerInArea: (state, minX, maxX, minY, maxY, plane) => {
    var playerLoc = client.getLocalPlayer().getWorldLocation();
    var playerX = playerLoc.getX();
    var playerY = playerLoc.getY();
    var playerPlane = playerLoc.getPlane();
    var inXBounds = playerX >= minX && playerX <= maxX;
    var inYBounds = playerY >= minY && playerY <= maxY;
    var inPlane = plane === undefined || playerPlane === plane;
    var result = inXBounds && inYBounds && inPlane;
    logger(state, 'debug', 'isPlayerInArea', "Player at (".concat(playerX, ", ").concat(playerY, ", ").concat(playerPlane, "). Area bounds: X[").concat(minX, "-").concat(maxX, "], Y[").concat(minY, "-").concat(maxY, "], Plane[").concat(plane !== null && plane !== void 0 ? plane : 'any', "]. In area: ").concat(result));
    return result;
  },
  areObjectsInBoundaries: (state, boundaries) => {
    var dangerousObjectIdArray = Object.values(dangerousObjectIds);
    var nearbyObjects = bot.objects.getTileObjectsWithIds(dangerousObjectIdArray);
    var objectsFound = nearbyObjects.some(obj => {
      var objLoc = obj.getWorldLocation();
      return boundaries.some(boundary => objLoc.getX() >= boundary.minX && objLoc.getX() <= boundary.maxX && objLoc.getY() >= boundary.minY && objLoc.getY() <= boundary.maxY);
    });
    logger(state, 'debug', 'areObjectsInBoundaries', "Objects found in boundaries: ".concat(objectsFound));
    return objectsFound;
  },
  webWalkCalculator: (state, destinationX, destinationY) => {
    bot.walking.walkToTrueWorldPoint(destinationX, destinationY);
    var path = bot.walking.getWebWalkCalculatedPath();
    if (path && path.length > 0) {
      logger(state, 'debug', 'webWalkCalculator', 'Webwalk path is possible.');
      path.forEach((waypoint, index) => {
        logger(state, 'debug', 'webWalkCalculator', "Waypoint ".concat(index, ": (").concat(waypoint.getX(), ", ").concat(waypoint.getY(), ")"));
      });
      var destination = path.at(-1);
      if (destination) {
        logger(state, 'debug', 'webWalkCalculator', "Destination: (".concat(destination.getX(), ", ").concat(destination.getY(), ")"));
      } else {
        logger(state, 'debug', 'webWalkCalculator', 'Destination is undefined.');
      }
    } else {
      logger(state, 'debug', 'webWalkCalculator', 'No webwalk path available.');
    }
    return path;
  }
};

var playerFunctions = {
  disableProtectionPrayers: state => {
    var protectionPrayers = ['protMelee', 'protMage', 'protRange'];
    for (var _i = 0, _protectionPrayers = protectionPrayers; _i < _protectionPrayers.length; _i++) {
      var prayer = _protectionPrayers[_i];
      if (prayerFunctions.checkPrayer(state, prayer)) {
        bot.prayer.togglePrayer(prayers[prayer], false);
        logger(state, 'debug', 'disableProtectionPrayers', "Toggled off ".concat(prayer));
      }
    }
  },
  activatePrayerForThreat: (state, prayerKey, threatSource) => {
    if (!prayerKey) {
      logger(state, 'debug', 'activatePrayerForThreat', "No prayer mapping for threat source: ".concat(threatSource));
      return false;
    }
    if (prayerFunctions.checkPrayer(state, prayerKey)) {
      logger(state, 'debug', 'activatePrayerForThreat', "Already praying ".concat(prayerKey, " for ").concat(threatSource));
      return true;
    }
    var activated = prayerFunctions.togglePrayer(state, prayerKey);
    logger(state, 'debug', 'activatePrayerForThreat', "Activated ".concat(prayerKey, " for ").concat(threatSource));
    return activated;
  },
  activatePrayerForProjectile: (state, projectile) => {
    var _ref, _projectile$getId, _projectile$getId2, _projectile$getWorldL;
    var projectileId = (_ref = (_projectile$getId = (_projectile$getId2 = projectile.getId) === null || _projectile$getId2 === void 0 ? void 0 : _projectile$getId2.call(projectile)) !== null && _projectile$getId !== void 0 ? _projectile$getId : projectile.id) !== null && _ref !== void 0 ? _ref : -1;
    var prayerKey = projectileFunctions.getPrayerKeyForProjectile(projectileId);
    var distance = (_projectile$getWorldL = projectile.getWorldLocation) === null || _projectile$getWorldL === void 0 || (_projectile$getWorldL = _projectile$getWorldL.call(projectile)) === null || _projectile$getWorldL === void 0 ? void 0 : _projectile$getWorldL.distanceTo(client.getLocalPlayer().getWorldLocation());
    return playerFunctions.activatePrayerForThreat(state, prayerKey, "projectile ".concat(projectileId, " at distance ").concat(distance));
  },
  activatePrayerForNpcAttack: (state, npcAttack) => {
    var prayerKey = npcFunctions.getPrayerKeyForAnimation(npcAttack.animationId);
    return playerFunctions.activatePrayerForThreat(state, prayerKey, "NPC ".concat(npcAttack.npcIndex, " anim ").concat(npcAttack.animationId, " at distance ").concat(npcAttack.distance));
  },
  handleIncomingProjectiles: state => {
    var sortedProjectiles = projectileFunctions.getSortedProjectiles(state);
    if (sortedProjectiles.length === 0) {
      logger(state, 'debug', 'handleIncomingProjectiles', 'No tracked projectiles within range.');
      playerFunctions.disableProtectionPrayers(state);
      state.currentPrayProjectileId = undefined;
      return false;
    }
    var targetProjectile = sortedProjectiles[0];
    if (state.currentPrayProjectileId === undefined) {
      state.currentPrayProjectileId = targetProjectile.id;
    } else {
      var currentProjectile = sortedProjectiles.find(p => p.id === state.currentPrayProjectileId);
      if (currentProjectile && !currentProjectile.hasHit) {
        targetProjectile = currentProjectile;
      } else {
        state.currentPrayProjectileId = targetProjectile.id;
        logger(state, 'debug', 'handleIncomingProjectiles', "Previous projectile hit. Switching to projectile ".concat(targetProjectile.id, "."));
      }
    }
    logger(state, 'debug', 'handleIncomingProjectiles', "Projectile queue (".concat(sortedProjectiles.length, "): ").concat(sortedProjectiles.map(p => "".concat(p.id, "(").concat(p.distance, "t)")).join(', '), " | Praying for: ").concat(targetProjectile.id));
    return playerFunctions.activatePrayerForProjectile(state, targetProjectile);
  },
  handleNpcAttackAnimations: state => {
    var sortedAttacks = projectileFunctions.getSortedNpcAttacksDist();
    if (sortedAttacks.length === 0) {
      logger(state, 'debug', 'handleNpcAttackAnimations', 'No tracked NPC attack animations within range (or stub not implemented).');
      return false;
    }
    logger(state, 'debug', 'handleNpcAttackAnimations', "NPC attack queue (".concat(sortedAttacks.length, "): ").concat(sortedAttacks.map(a => "".concat(a.npcIndex, ":").concat(a.animationId, "(").concat(a.distance, "t)")).join(', ')));
    return playerFunctions.activatePrayerForNpcAttack(state, sortedAttacks[0]);
  },
  attackTargetNpc: (state, npcId) => {
    var _client, _client$getLocalPlaye, _player$getInteractin, _npc$getName, _npc$getWorldLocation, _npc$getWorldLocation2, _npc$getWorldLocation3;
    var npc = npcFunctions.getClosestNPC([npcId]);
    var player = (_client = client) === null || _client === void 0 || (_client$getLocalPlaye = _client.getLocalPlayer) === null || _client$getLocalPlaye === void 0 ? void 0 : _client$getLocalPlaye.call(_client);
    var interacting = (_player$getInteractin = player.getInteracting) === null || _player$getInteractin === void 0 ? void 0 : _player$getInteractin.call(player);
    if (!npc) {
      logger(state, 'debug', 'attackTargetNpc', "No NPC found with ID ".concat(npcId));
      return false;
    }
    if (!player) {
      logger(state, 'debug', 'attackTargetNpc', 'Player not found');
      return false;
    }
    if (interacting && interacting === npc) {
      logger(state, 'debug', 'attackTargetNpc', "Already attacking NPC ".concat(npcId));
      return true;
    }
    bot.npcs.interact((_npc$getName = npc.getName) === null || _npc$getName === void 0 ? void 0 : _npc$getName.call(npc), 'Attack');
    logger(state, 'debug', 'attackTargetNpc', "Attacking NPC ".concat(npcId, " at ").concat((_npc$getWorldLocation = npc.getWorldLocation) === null || _npc$getWorldLocation === void 0 ? void 0 : _npc$getWorldLocation.call(npc).getX(), ", ").concat((_npc$getWorldLocation2 = npc.getWorldLocation) === null || _npc$getWorldLocation2 === void 0 ? void 0 : _npc$getWorldLocation2.call(npc).getY(), ", ").concat((_npc$getWorldLocation3 = npc.getWorldLocation) === null || _npc$getWorldLocation3 === void 0 ? void 0 : _npc$getWorldLocation3.call(npc).getPlane()));
    return true;
  },
  moveToSafeTile: (state, _moveToSafeTile) => {
    var _client2, _client2$getLocalPlay, _player$getWorldLocat;
    var player = (_client2 = client) === null || _client2 === void 0 || (_client2$getLocalPlay = _client2.getLocalPlayer) === null || _client2$getLocalPlay === void 0 ? void 0 : _client2$getLocalPlay.call(_client2);
    var playerLoc = (_player$getWorldLocat = player.getWorldLocation) === null || _player$getWorldLocat === void 0 ? void 0 : _player$getWorldLocat.call(player);
    if (!player) {
      logger(state, 'debug', 'moveToSafeTile', 'Player not found');
      return false;
    }
    if (!playerLoc) {
      logger(state, 'debug', 'moveToSafeTile', 'Player location not found');
      return false;
    }
    if (playerLoc.getX() === _moveToSafeTile.x && playerLoc.getY() === _moveToSafeTile.y) {
      logger(state, 'debug', 'moveToSafeTile', "Already at safe tile (".concat(_moveToSafeTile.x, ", ").concat(_moveToSafeTile.y, ")"));
      return true;
    }
    bot.walking.walkToWorldPoint(_moveToSafeTile.x, _moveToSafeTile.y);
    logger(state, 'debug', 'moveToSafeTile', "Moving to safe tile (".concat(_moveToSafeTile.x, ", ").concat(_moveToSafeTile.y, ")"));
    return true;
  },
  getWornEquipment: state => {
    var equipment = {};
    var equipmentItems = bot.equipment.getEquipment();
    var equipmentSlots = {
      0: 'head',
      1: 'cape',
      2: 'neck',
      3: 'weapon',
      4: 'body',
      5: 'shield',
      7: 'legs',
      9: 'hands',
      10: 'feet',
      12: 'ring',
      13: 'ammo'
    };
    for (var _i2 = 0, _Object$entries = Object.entries(equipmentSlots); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        slotIndex = _Object$entries$_i[0],
        slotName = _Object$entries$_i[1];
      var index = Number(slotIndex);
      var item = equipmentItems[index];
      if (item && item.id > 0) {
        equipment[slotName] = item.id;
      }
    }
    logger(state, 'debug', 'getWornEquipment', "Current equipment: ".concat(JSON.stringify(equipment)));
    return equipment;
  },
  hasRequiredEquipment: (state, requiredEquipment) => {
    var _playerFunctions$getG = playerFunctions.getGearSnapshot(state, requiredEquipment),
      isFullyGeared = _playerFunctions$getG.isFullyGeared,
      missingSlot = _playerFunctions$getG.missingSlot,
      missingItemId = _playerFunctions$getG.missingItemId;
    logger(state, 'debug', 'hasRequiredEquipment', isFullyGeared ? 'All required equipment verified' : "Missing required item ".concat(missingItemId, " in slot ").concat(missingSlot));
    return isFullyGeared;
  },
  getGearSnapshot: (state, initialEquipmentReferance) => {
    if (Object.keys(initialEquipmentReferance).length === 0) {
      var _wornEquipment = playerFunctions.getWornEquipment(state);
      Object.assign(initialEquipmentReferance, _wornEquipment);
    }
    var requiredEquipment = initialEquipmentReferance;
    var wornEquipment = playerFunctions.getWornEquipment(state);
    var isFullyGeared = true;
    var missingSlot = null;
    var missingItemId = null;
    for (var _i3 = 0, _Object$entries2 = Object.entries(requiredEquipment); _i3 < _Object$entries2.length; _i3++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
        slot = _Object$entries2$_i[0],
        itemId = _Object$entries2$_i[1];
      if (wornEquipment[slot] !== itemId) {
        isFullyGeared = false;
        missingSlot = slot;
        missingItemId = itemId;
        break;
      }
    }
    return {
      requiredEquipment,
      wornEquipment,
      isFullyGeared,
      missingSlot,
      missingItemId
    };
  },
  engageNPC: (state, areaBounds) => {
    if (!areaBounds) {
      state.inCombatArea = true;
      state.subState = 'manage_hp/prayer';
      logger(state, 'debug', 'engageNPC', 'No area bounds. Transitioning to manage_hp/prayer.');
      return true;
    }
    var isInArea = tileFunctions.isPlayerInArea(state, areaBounds.minX, areaBounds.maxX, areaBounds.minY, areaBounds.maxY, areaBounds.plane);
    if (isInArea && !state.inCombatArea) {
      state.inCombatArea = true;
      state.subState = 'manage_hp/prayer';
      logger(state, 'debug', 'engageNPC', 'Player in combat area. Transitioning to manage_hp/prayer.');
      return true;
    }
    if (!isInArea && state.inCombatArea) {
      state.inCombatArea = false;
      logger(state, 'debug', 'engageNPC', 'Player left combat area.');
      return false;
    }
    if (!isInArea && !state.inCombatArea) {
      logger(state, 'debug', 'engageNPC', 'Moving to combat area...');
      return false;
    }
    return false;
  },
  castSpellOnNpc: (state, spellNames, npcIds) => {
    var _targetNpc$getName;
    var targetNpc = npcFunctions.getClosestNPC(npcIds);
    if (!targetNpc) {
      logger(state, 'debug', 'castSpellOnNpc', "No NPC found with IDs: ".concat(npcIds.join(', ')));
      return false;
    }
    if (spellNames.length === 0) {
      logger(state, 'debug', 'castSpellOnNpc', 'No spell names provided.');
      return false;
    }
    var spellName = spellNames[0];
    bot.magic.castOnNpc(spellName, targetNpc);
    logger(state, 'debug', 'castSpellOnNpc', "Cast spell ".concat(spellName, " on NPC ").concat((_targetNpc$getName = targetNpc.getName) === null || _targetNpc$getName === void 0 ? void 0 : _targetNpc$getName.call(targetNpc)));
    return true;
  },
  eatFood: (state, foodItemIds, foodDelay) => {
    if (state.lastFoodEatTick && state.lastFoodDelay) {
      var ticksSinceLastEat = state.gameTick - state.lastFoodEatTick;
      if (ticksSinceLastEat < state.lastFoodDelay) {
        logger(state, 'debug', 'eatFood', "Food locked out - ".concat(state.lastFoodDelay - ticksSinceLastEat, " ticks remaining"));
        return false;
      }
    }
    var _iterator = _createForOfIteratorHelper(foodItemIds),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var itemIds = _step.value;
        if (bot.inventory.containsId(itemIds)) {
          bot.inventory.interactWithIds([itemIds], ['Eat']);
          state.lastFoodEatTick = state.gameTick;
          state.lastFoodDelay = foodDelay;
          logger(state, 'debug', 'eatFood', "Eating food item ID ".concat(itemIds, " with ").concat(foodDelay, " tick delay"));
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  },
  comboEat: (state, normalFoodIds, comboFoodIds, normalFoodDelay) => {
    if (state.lastFoodEatTick && state.lastFoodDelay) {
      var ticksSinceLastEat = state.gameTick - state.lastFoodEatTick;
      if (ticksSinceLastEat < state.lastFoodDelay) {
        logger(state, 'debug', 'comboEat', "Food locked out - ".concat(state.lastFoodDelay - ticksSinceLastEat, " ticks remaining"));
        return false;
      }
    }
    var hasNormalFood = normalFoodIds.some(id => bot.inventory.containsId(id));
    var hasComboFood = comboFoodIds.some(id => bot.inventory.containsId(id));
    if (!hasNormalFood || !hasComboFood) {
      logger(state, 'debug', 'comboEat', "Missing food - normal: ".concat(hasNormalFood, ", combo: ").concat(hasComboFood));
      return false;
    }
    var normalEaten = false;
    var _iterator2 = _createForOfIteratorHelper(normalFoodIds),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _itemId = _step2.value;
        if (bot.inventory.containsId(_itemId)) {
          bot.inventory.interactWithIds([_itemId], ['Eat']);
          logger(state, 'debug', 'comboEat', "Eating normal food item ID ".concat(_itemId));
          normalEaten = true;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (normalEaten) {
      var _iterator3 = _createForOfIteratorHelper(comboFoodIds),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var itemId = _step3.value;
          if (bot.inventory.containsId(itemId)) {
            bot.inventory.interactWithIds([itemId], ['Eat']);
            state.lastFoodEatTick = state.gameTick;
            state.lastFoodDelay = normalFoodDelay;
            logger(state, 'debug', 'comboEat', "Combo eating item ID ".concat(itemId, " with ").concat(normalFoodDelay, " tick delay"));
            return true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  eatFoodAndDrinkPotion: (state, foodItemIds, foodDelay, potionItemIds, potionDelay) => {
    if (state.lastFoodEatTick && state.lastFoodDelay) {
      var ticksSinceLastEat = state.gameTick - state.lastFoodEatTick;
      if (ticksSinceLastEat < state.lastFoodDelay) {
        logger(state, 'debug', 'eatFoodAndDrinkPotion', "Food locked out - ".concat(state.lastFoodDelay - ticksSinceLastEat, " ticks remaining"));
        return false;
      }
    }
    if (state.lastPotionDrinkTick) {
      var ticksSinceLastDrink = state.gameTick - state.lastPotionDrinkTick;
      if (ticksSinceLastDrink < potionDelay) {
        logger(state, 'debug', 'eatFoodAndDrinkPotion', "Potion locked out - ".concat(potionDelay - ticksSinceLastDrink, " ticks remaining"));
        return false;
      }
    }
    var hasFood = foodItemIds.some(id => bot.inventory.containsId(id));
    var hasPotion = potionItemIds.some(id => bot.inventory.containsId(id));
    if (!hasFood || !hasPotion) {
      logger(state, 'debug', 'eatFoodAndDrinkPotion', "Missing items - food: ".concat(hasFood, ", potion: ").concat(hasPotion));
      return false;
    }
    var foodEaten = false;
    var _iterator4 = _createForOfIteratorHelper(foodItemIds),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _itemId2 = _step4.value;
        if (bot.inventory.containsId(_itemId2)) {
          bot.inventory.interactWithIds([_itemId2], ['Eat']);
          logger(state, 'debug', 'eatFoodAndDrinkPotion', "Eating food item ID ".concat(_itemId2));
          foodEaten = true;
          break;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    if (foodEaten) {
      var _iterator5 = _createForOfIteratorHelper(potionItemIds),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var itemId = _step5.value;
          if (bot.inventory.containsId(itemId)) {
            bot.inventory.interactWithIds([itemId], ['Drink']);
            state.lastFoodEatTick = state.gameTick;
            state.lastFoodDelay = foodDelay;
            state.lastPotionDrinkTick = state.gameTick;
            logger(state, 'debug', 'eatFoodAndDrinkPotion', "Drinking potion item ID ".concat(itemId, " - food delay: ").concat(foodDelay, ", potion delay: ").concat(potionDelay));
            return true;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
    return false;
  },
  drinkPotion: (state, potionItemIds, potionDelay) => {
    if (state.lastPotionDrinkTick) {
      var ticksSinceLastDrink = state.gameTick - state.lastPotionDrinkTick;
      if (ticksSinceLastDrink < potionDelay) {
        logger(state, 'debug', 'drinkPotion', "Potion locked out - ".concat(potionDelay - ticksSinceLastDrink, " ticks remaining"));
        return false;
      }
    }
    var _iterator6 = _createForOfIteratorHelper(potionItemIds),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var itemIds = _step6.value;
        if (bot.inventory.containsId(itemIds)) {
          bot.inventory.interactWithIds([itemIds], ['Drink']);
          state.lastPotionDrinkTick = state.gameTick;
          logger(state, 'debug', 'drinkPotion', "Drinking potion item ID ".concat(itemIds, " with ").concat(potionDelay, " tick delay"));
          return true;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return false;
  },
  runBetweenTiles: (state, tileA, tileB) => {
    var _client3, _client3$getLocalPlay, _player$getWorldLocat2;
    var player = (_client3 = client) === null || _client3 === void 0 || (_client3$getLocalPlay = _client3.getLocalPlayer) === null || _client3$getLocalPlay === void 0 ? void 0 : _client3$getLocalPlay.call(_client3);
    var playerLoc = (_player$getWorldLocat2 = player.getWorldLocation) === null || _player$getWorldLocat2 === void 0 ? void 0 : _player$getWorldLocat2.call(player);
    if (!player || !playerLoc) {
      logger(state, 'debug', 'runBetweenTiles', 'Player or location not found');
      return false;
    }
    var isAtA = playerLoc.getX() === tileA.x && playerLoc.getY() === tileA.y;
    var targetTile = isAtA ? tileB : tileA;
    var targetDesc = isAtA ? "Tile B (".concat(tileB.x, ", ").concat(tileB.y, ")") : "Tile A (".concat(tileA.x, ", ").concat(tileA.y, ")");
    bot.walking.walkToWorldPoint(targetTile.x, targetTile.y);
    logger(state, 'debug', 'runBetweenTiles', "Walking to ".concat(targetDesc));
    return true;
  }
};

var NORMAL_FOOD_DELAY = 3;
var POTION_DELAY = 3;
({
  boxTrap: ItemID.BOX_TRAP
});
var gear = {
  tBow: ItemID.TWISTED_BOW,
  bowfa: ItemID.BOW_OF_FAERDHINEN,
  bowfac: ItemID.BOW_OF_FAERDHINEN_C,
  blowpipe: ItemID.TOXIC_BLOWPIPE
};
var food = {
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
};
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
      super_restore_4: ItemID.SUPER_RESTORE4
    }
  }
};
var potionGroups = {
  stam1_4: [potion.normalDelay.item.stamina_potion_1, potion.normalDelay.item.stamina_potion_2, potion.normalDelay.item.stamina_potion_3, potion.normalDelay.item.stamina_potion_4],
  ppots1_4: [potion.normalDelay.item.prayer_potion_1, potion.normalDelay.item.prayer_potion_2, potion.normalDelay.item.prayer_potion_3, potion.normalDelay.item.prayer_potion_4],
  brews1_4: [potion.normalDelay.item.saradomin_brew_1, potion.normalDelay.item.saradomin_brew_2, potion.normalDelay.item.saradomin_brew_3, potion.normalDelay.item.saradomin_brew_4],
  restores1_4: [potion.normalDelay.item.super_restore_1, potion.normalDelay.item.super_restore_2, potion.normalDelay.item.super_restore_3, potion.normalDelay.item.super_restore_4]
};

var weaponAttackSpeeds = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, gear.tBow, 5), gear.bowfa, 4), gear.bowfac, 4), gear.blowpipe, 2);
var attackTimers = {
  getAttackSpeed: weaponId => {
    return weaponAttackSpeeds[weaponId];
  },
  hasAttackSpeed: weaponId => {
    return weaponId in weaponAttackSpeeds;
  },
  getWeaponsBySpeed: tickSpeed => {
    return Object.entries(weaponAttackSpeeds).filter(_ref => {
      var _ref2 = _slicedToArray(_ref, 2),
        speed = _ref2[1];
      return speed === tickSpeed;
    }).map(_ref3 => {
      var _ref4 = _slicedToArray(_ref3, 1),
        weaponId = _ref4[0];
      return Number(weaponId);
    });
  },
  getEquippedWeaponSpeed: state => {
    var equippedGear = playerFunctions.getWornEquipment(state);
    var weaponId = equippedGear.weapon;
    if (!weaponId) {
      logger(state, 'debug', 'getEquippedWeaponSpeed', 'No weapon equipped');
      return 0;
    }
    var speed = attackTimers.getAttackSpeed(weaponId);
    if (speed !== undefined) {
      logger(state, 'debug', 'getEquippedWeaponSpeed', "Equipped weapon speed: ".concat(speed, " ticks"));
      return speed;
    }
    logger(state, 'debug', 'getEquippedWeaponSpeed', "Unknown weapon attack speed for ID: ".concat(weaponId));
    return 0;
  }
};

var locationFunctions = {
  coordsToWP: _ref => {
    var _ref2 = _slicedToArray(_ref, 3),
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2[2];
    return new net.runelite.api.coords.WorldPoint(x, y, z);
  },
  localPlayerDistFromWP: worldPoint => client.getLocalPlayer().getWorldLocation().distanceTo(worldPoint),
  isPlayerNearWP: function isPlayerNearWP(worldPoint) {
    var tileThreshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    return locationFunctions.localPlayerDistFromWP(worldPoint) <= tileThreshold;
  },
  wWalkTimeout: function wWalkTimeout(state, worldPoint, targetDescription, maxWait) {
    var targetDistance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;
    var isPlayerAtLocation = () => locationFunctions.isPlayerNearWP(worldPoint, targetDistance);
    if (!isPlayerAtLocation() && !bot.walking.isWebWalking()) {
      logger(state, 'all', 'wWalkTimeout', "Web walking to ".concat(targetDescription));
      bot.walking.webWalkStart(worldPoint);
      timeoutManager.add({
        state,
        conditionFunction: () => isPlayerAtLocation(),
        maxWait,
        onFail: () => generalFunctions.handleFailure(state, 'wWalkTimeout', "Unable to locate player at ".concat(targetDescription, " after ").concat(maxWait, " ticks."))
      });
      return false;
    }
    logger(state, 'debug', 'wWalkTimeout', "Player is at ".concat(targetDescription, "."));
    return true;
  }
};

var inventoryFunctions = {
  dropItem: (state, itemId, failResetState) => {
    if (bot.inventory.containsId(itemId)) {
      bot.inventory.interactWithIds([itemId], ['Drop']);
      inventoryFunctions.itemInventoryTimeout.absent(state, itemId, failResetState);
      return false;
    }
    return true;
  },
  getExistingItemId: function getExistingItemId(itemIds) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'first';
    if (!bot.inventory.containsAnyIds(itemIds)) return undefined;
    var existingItemIds = itemIds.filter(id => bot.inventory.containsId(id));
    if (existingItemIds.length === 0) return undefined;
    return selector === 'random' ? existingItemIds[Math.floor(Math.random() * existingItemIds.length)] : existingItemIds[0];
  },
  getFirstExistingItemId: itemIds => inventoryFunctions.getExistingItemId(itemIds, 'first'),
  getRandomExistingItemId: itemIds => inventoryFunctions.getExistingItemId(itemIds, 'random'),
  checkQuantities: (state, items) => {
    logger(state, 'debug', "checkQuantities", 'Checking inventory item quantities.');
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (bot.inventory.getQuantityOfId(item.itemId) !== item.quantity) return false;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  },
  itemInventoryTimeout: {
    present: (state, itemId, failResetState) => itemInventoryTimeoutCore(state, itemId, failResetState, true),
    absent: (state, itemId, failResetState) => itemInventoryTimeoutCore(state, itemId, failResetState, false)
  },
  swapGear: (state, itemIds, itemNames, targetSlot, failResetState) => {
    if (bot.inventory.containsAnyIds(itemIds)) {
      var sourceSlot = bot.inventory.interactWithIds(itemIds, ['Equip']);
      if (sourceSlot !== undefined) {
        logger(state, 'debug', 'swapGear', "Swapping item ID ".concat(itemIds.join(', '), " from slot ").concat(sourceSlot, " to slot ").concat(targetSlot));
        return true;
      }
    }
    if (itemNames && itemNames.length > 0) {
      var _sourceSlot = bot.inventory.interactWithNames(itemNames, ['Equip']);
      if (_sourceSlot !== undefined) {
        logger(state, 'debug', 'swapGear', "Swapping item by name \"".concat(itemNames, "\" from slot ").concat(_sourceSlot, " to slot ").concat(targetSlot));
        return true;
      }
    }
    logger(state, 'debug', 'swapGear', "No items found with IDs ".concat(itemIds, " or names ").concat(itemNames));
    if (failResetState) {
      generalFunctions.handleFailure(state, 'swapGear', "Item not found for swapping", failResetState);
    }
    return false;
  },
  cacheInventory: state => {
    var cachedInventory = {};
    var inventoryContainer = client.getItemContainer(93);
    if (inventoryContainer) {
      var items = inventoryContainer.getItems();
      var _iterator2 = _createForOfIteratorHelper(items.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            slot = _step2$value[0],
            item = _step2$value[1];
          if (item && item.getId() > 0) {
            cachedInventory[slot] = {
              itemId: item.getId(),
              quantity: item.getQuantity()
            };
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    logger(state, 'debug', 'cacheInventory', "Cached inventory state: ".concat(JSON.stringify(cachedInventory, null, 2)));
    var inventoryLog = 'Inventory Cache:\n';
    for (var _slot = 0; _slot < 28; _slot++) {
      inventoryLog += cachedInventory[_slot] ? "Slot ".concat(_slot, ": Item ID ").concat(cachedInventory[_slot].itemId, " x").concat(cachedInventory[_slot].quantity, "\n") : "Slot ".concat(_slot, ": Empty\n");
    }
    logger(state, 'debug', 'cacheInventory', inventoryLog);
    return cachedInventory;
  }
};
function itemInventoryTimeoutCore(state, itemId, failResetState) {
  var waitForPresence = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var inInventory = bot.inventory.containsId(itemId);
  var shouldPass = waitForPresence ? inInventory : !inInventory;
  if (!shouldPass) {
    logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " ").concat(waitForPresence ? 'not in' : 'still in', " inventory."));
    timeoutManager.add({
      state,
      conditionFunction: () => waitForPresence ? bot.inventory.containsId(itemId) : !bot.inventory.containsId(itemId),
      initialTimeout: 1,
      maxWait: 10,
      onFail: () => generalFunctions.handleFailure(state, 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " ").concat(waitForPresence ? 'not in' : 'still in', " inventory after 10 ticks."), failResetState)
    });
    return false;
  }
  logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " is ").concat(waitForPresence ? 'in' : 'not in', " inventory."));
  return true;
}

var bankFunctions = {
  toggleBank: (state, shouldBeOpen) => {
    var isOpen = bot.bank.isOpen();
    if (isOpen === shouldBeOpen) return true;
    var action = shouldBeOpen ? 'Opening' : 'Closing';
    logger(state, 'debug', 'bankFunctions.toggleBank', "".concat(action, " the bank"));
    shouldBeOpen ? bot.bank.open() : bot.bank.close();
    timeoutManager.add({
      state,
      conditionFunction: () => bot.bank.isOpen() === shouldBeOpen,
      initialTimeout: 1,
      maxWait: 10,
      onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.toggleBank', "Bank is ".concat(shouldBeOpen ? 'still closed' : 'still open', " after 10 ticks."))
    });
    return false;
  },
  requireBankState: (state, shouldBeOpen, fallbackState) => {
    if (bot.bank.isOpen() !== shouldBeOpen) {
      state.mainState = fallbackState;
      return false;
    }
    return true;
  },
  lowQuantityInBank: (itemId, quantity) => bot.bank.getQuantityOfId(itemId) < quantity,
  anyQuantityLowInBank: items => items.some(item => bankFunctions.lowQuantityInBank(item.id, item.quantity)),
  depositItemsTimeout: {
    all: (state, failResetState) => depositItemsTimeoutBase(state, undefined, failResetState),
    some: (state, itemId, failResetState) => depositItemsTimeoutBase(state, itemId, failResetState)
  },
  withdrawMissingItems: (state, items, failResetState) => {
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (!bot.inventory.containsId(item.id)) {
          logger(state, 'debug', 'bankFunctions.withdrawMissingItems', "Withdrawing item ID ".concat(item.id, " with quantity ").concat(item.quantity));
          item.quantity == 'all' ? bot.bank.withdrawAllWithId(item.id) : bot.bank.withdrawQuantityWithId(item.id, item.quantity);
          if (!inventoryFunctions.itemInventoryTimeout.present(state, item.id, failResetState)) return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  },
  withdrawFirstExistingItem: (state, itemIds, quantity, failResetState) => {
    var _iterator2 = _createForOfIteratorHelper(itemIds),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var itemId = _step2.value;
        var bankQuantity = bot.bank.getQuantityOfId(itemId);
        if (bankQuantity === 0) continue;
        logger(state, 'debug', 'bankFunctions.withdrawFirstExistingItem', "Withdrawing item ID ".concat(itemId, " with quantity ").concat(quantity));
        bot.bank.withdrawQuantityWithId(itemId, quantity);
        return inventoryFunctions.itemInventoryTimeout.present(state, itemId, failResetState);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    logger(state, 'debug', 'bankFunctions.withdrawFirstExistingItem', "No items found in bank with IDs: ".concat(itemIds.join(', ')));
    return false;
  },
  quickBanking: (state, initialInventory, progress, failResetState) => {
    if (!progress.initialized) {
      var deposited = bankFunctions.depositItemsTimeout.all(state, failResetState);
      if (!deposited) return false;
      var requiredItems = [];
      progress.slots = [];
      for (var slot = 0; slot < 28; slot++) {
        var item = initialInventory[slot];
        if (!item) continue;
        requiredItems.push({
          id: item.itemId,
          quantity: item.quantity
        });
        progress.slots.push(slot);
      }
      if (bankFunctions.anyQuantityLowInBank(requiredItems)) {
        logger(state, 'all', 'bankFunctions.quickBanking', 'No more required items, resupply before you start again');
        bot.terminate();
        return false;
      }
      progress.index = 0;
      progress.initialized = true;
    }
    if (bot.bank.isBanking()) {
      logger(state, 'debug', 'bankFunctions.quickBanking', 'Waiting for banking dialog to close');
      return false;
    }
    var itemsProcessed = 0;
    var allowedThisTick = 3;
    while (progress.index < progress.slots.length && itemsProcessed < allowedThisTick) {
      var _slot = progress.slots[progress.index];
      var _item = initialInventory[_slot];
      progress.index++;
      if (!_item) continue;
      var quantity = _item.quantity;
      var isStandardQuantity = quantity === 1 || quantity === 5 || quantity === 10;
      if (!isStandardQuantity) {
        bot.bank.withdrawQuantityWithId(_item.itemId, quantity);
        return false;
      }
      bot.bank.withdrawQuantityWithId(_item.itemId, quantity);
      var itemPresent = inventoryFunctions.itemInventoryTimeout.present(state, _item.itemId, failResetState);
      if (!itemPresent) {
        logger(state, 'all', 'bankFunctions.quickBanking', 'No more required items, resupply before you start again');
        bot.terminate();
        return false;
      }
      itemsProcessed++;
    }
    if (progress.index >= progress.slots.length) {
      progress.initialized = false;
      progress.index = 0;
      progress.slots = [];
      return true;
    }
    return false;
  },
  processBankOpen: (state, onOpen) => {
    if (state.bankWalkInitiated === undefined) {
      state.bankWalkInitiated = false;
    }
    if (state.isAtBankLocation === undefined) {
      state.isAtBankLocation = false;
    }
    if (state.bankOpenAttemptTick === undefined) {
      state.bankOpenAttemptTick = -1;
    }
    if (bot.bank.isOpen()) {
      state.bankWalkInitiated = false;
      state.isAtBankLocation = false;
      state.bankOpenAttemptTick = -1;
      onOpen();
      return;
    }
    if (bot.walking.isWebWalking()) {
      state.isAtBankLocation = false;
      state.bankOpenAttemptTick = -1;
      return;
    }
    if (!state.bankWalkInitiated) {
      bot.walking.webWalkToNearestBank();
      state.bankWalkInitiated = true;
      state.isAtBankLocation = false;
      state.bankOpenAttemptTick = -1;
      return;
    }
    if (!state.isAtBankLocation) {
      state.isAtBankLocation = true;
      state.bankOpenAttemptTick = state.gameTick;
      bot.bank.open();
      return;
    }
    if (state.bankOpenAttemptTick === -1 || state.gameTick - state.bankOpenAttemptTick >= 5) {
      state.bankOpenAttemptTick = state.gameTick;
      bot.bank.open();
    }
  }
};
var depositItemsTimeoutBase = (state, itemId, failResetState) => {
  var currentEmptySlots = bot.inventory.getEmptySlots();
  if (currentEmptySlots == 28) return true;
  if (!itemId || itemId && bot.inventory.containsId(itemId)) {
    logger(state, 'debug', 'bankFunctions.depositItemsTimeout', "Depositing ".concat(itemId ? "item ID ".concat(itemId) : 'all items'));
    itemId ? bot.bank.depositAllWithId(itemId) : bot.bank.depositAll();
    timeoutManager.add({
      state,
      conditionFunction: () => currentEmptySlots < bot.inventory.getEmptySlots(),
      initialTimeout: 1,
      maxWait: 10,
      onFail: () => generalFunctions.handleFailure(state, 'bankFunctions.depositItemsTimeout', "Failed to deposit ".concat(itemId ? "item ID ".concat(itemId) : 'all items', " after 10 ticks."), failResetState)
    });
    return false;
  }
  return true;
};

var state = {
  debugEnabled: false,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  subState: '',
  scriptInitialized: false,
  scriptName: 'profLeviathan',
  uiCompleted: false,
  timeout: 0,
  gameTick: 0,
  movementStartTick: 0,
  attackSpeed: 0,
  lastAttackTick: 0,
  inCombatArea: false,
  returnWalkInitiated: false,
  bankWalkInitiated: false,
  isAtBankLocation: false,
  bankOpenAttemptTick: -1,
  debrisMovementState: null,
  pathfinderPrevLoc: null,
  leviathanLastHealth: 100,
  initialInventory: {},
  initialEquipment: {},
  graveLootAttempts: 0,
  bankingProgress: {
    initialized: false,
    slots: [],
    index: 0
  }
};
var arenaBoundaries = {
  north: {
    minX: 2078,
    maxX: 2084,
    minY: 6376,
    maxY: 6381,
    lightningSafeTileA: {
      x: 0,
      y: 0
    },
    lightningSafeTileB: {
      x: 0,
      y: 0
    },
    debrisStartTileA: {
      x: 0,
      y: 0
    },
    debrisStartTileB: {
      x: 0,
      y: 0
    }
  },
  south: {
    minX: 2078,
    maxX: 2084,
    minY: 6363,
    maxY: 6368,
    lightningSafeTileA: {
      x: 0,
      y: 0
    },
    lightningSafeTileB: {
      x: 0,
      y: 0
    },
    debrisStartTileA: {
      x: 0,
      y: 0
    },
    debrisStartTileB: {
      x: 0,
      y: 0
    }
  },
  east: {
    minX: 2085,
    maxX: 2091,
    minY: 6363,
    maxY: 6381,
    lightningSafeTileA: {
      x: 0,
      y: 0
    },
    lightningSafeTileB: {
      x: 0,
      y: 0
    },
    debrisStartTileA: {
      x: 0,
      y: 0
    },
    debrisStartTileB: {
      x: 0,
      y: 0
    }
  },
  west: {
    minX: 2071,
    maxX: 2080,
    minY: 6363,
    maxY: 6381,
    lightningSafeTileA: {
      x: 0,
      y: 0
    },
    lightningSafeTileB: {
      x: 0,
      y: 0
    },
    debrisStartTileA: {
      x: 0,
      y: 0
    },
    debrisStartTileB: {
      x: 0,
      y: 0
    }
  },
  ladder: {
    minX: 2062,
    maxX: 2069,
    minY: 6365,
    maxY: 6367
  }
};
var pathfinderStartLocation = {
  x: 2076,
  y: 6377
};
var graveLocation = locationFunctions.coordsToWP([2062, 6436, 0]);
var LEVIATHAN_TARGET_ID = npcGroupIds.leviathans[0];
var NORMAL_FOODS = Object.values(food.normalDelay.item);
var COMBO_FOODS = Object.values(food.comboDelay.item);
var PRAYER_POTIONS = [].concat(_toConsumableArray(potionGroups.ppots1_4), _toConsumableArray(potionGroups.restores1_4));
var lastOppositeTile = null;
var equipmentSlotIndices = {
  head: 0,
  cape: 1,
  neck: 2,
  weapon: 3,
  body: 4,
  shield: 5,
  legs: 7,
  hands: 9,
  feet: 10,
  ring: 12,
  ammo: 13
};
var isWithinBoundary = (boundaryKey, x, y) => {
  var boundary = arenaBoundaries[boundaryKey];
  return x >= boundary.minX && x <= boundary.maxX && y >= boundary.minY && y <= boundary.maxY;
};
var getBoundaryForPoint = (x, y) => {
  var keys = ['north', 'south', 'east', 'west'];
  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    if (isWithinBoundary(key, x, y)) return key;
  }
  return null;
};
var getOppositeBoundary = current => {
  if (current === 'north') return 'south';
  if (current === 'south') return 'north';
  if (current === 'east') return 'west';
  if (current === 'west') return 'east';
  return null;
};
function getOppositeSideTiles(playerLoc) {
  var playerX = playerLoc.getX();
  var playerY = playerLoc.getY();
  var dangerousTiles = tileSets.dangerousTileSets.leviDangerTiles;
  var dangerousSet = new Set(dangerousTiles.map(t => "".concat(t.x, ",").concat(t.y)));
  var currentBoundary = getBoundaryForPoint(playerX, playerY);
  var oppositeBoundary = getOppositeBoundary(currentBoundary);
  var oppositeTiles = [];
  if (oppositeBoundary) {
    var boundary = arenaBoundaries[oppositeBoundary];
    for (var x = boundary.minX; x <= boundary.maxX; x++) {
      for (var y = boundary.minY; y <= boundary.maxY; y++) {
        var key = "".concat(x, ",").concat(y);
        if (!dangerousSet.has(key)) {
          oppositeTiles.push({
            x,
            y
          });
        }
      }
    }
  }
  var availableTiles = oppositeTiles;
  if (lastOppositeTile) {
    availableTiles = oppositeTiles.filter(t => !(t.x === lastOppositeTile.x && t.y === lastOppositeTile.y));
  }
  var selectedTile;
  if (availableTiles.length > 0) {
    selectedTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
  } else if (oppositeTiles.length > 0) {
    selectedTile = oppositeTiles[Math.floor(Math.random() * oppositeTiles.length)];
  } else {
    selectedTile = {
      x: playerX,
      y: playerY
    };
  }
  lastOppositeTile = selectedTile;
  return selectedTile;
}
function findClosestFrontTile(frontTiles, playerLoc) {
  var targetTile = frontTiles[0];
  var minDistanceSquared = (playerLoc.getX() - targetTile.x) ** 2 + (playerLoc.getY() - targetTile.y) ** 2;
  var _iterator = _createForOfIteratorHelper(frontTiles),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tile = _step.value;
      var dx = playerLoc.getX() - tile.x;
      var dy = playerLoc.getY() - tile.y;
      var distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < minDistanceSquared) {
        minDistanceSquared = distanceSquared;
        targetTile = tile;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return targetTile;
}
function executeSpecialAttackPhases1to3(attackType, playerLocOverride, leviathanOverride) {
  var _ref, _client, _client$getLocalPlaye, _client$getLocalPlaye2, _playerLoc$getX, _playerLoc$getY;
  var leviathan = leviathanOverride !== null && leviathanOverride !== void 0 ? leviathanOverride : bot.npcs.getWithIds(npcGroupIds.leviathans).find(npc => npcFunctions.isNpcAlive(npc));
  var playerLoc = (_ref = playerLocOverride !== null && playerLocOverride !== void 0 ? playerLocOverride : (_client = client) === null || _client === void 0 || (_client$getLocalPlaye = _client.getLocalPlayer) === null || _client$getLocalPlaye === void 0 || (_client$getLocalPlaye = _client$getLocalPlaye.call(_client)) === null || _client$getLocalPlaye === void 0 || (_client$getLocalPlaye2 = _client$getLocalPlaye.getWorldLocation) === null || _client$getLocalPlaye2 === void 0 ? void 0 : _client$getLocalPlaye2.call(_client$getLocalPlaye)) !== null && _ref !== void 0 ? _ref : null;
  var playerX = (_playerLoc$getX = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getX()) !== null && _playerLoc$getX !== void 0 ? _playerLoc$getX : 0;
  var playerY = (_playerLoc$getY = playerLoc === null || playerLoc === void 0 ? void 0 : playerLoc.getY()) !== null && _playerLoc$getY !== void 0 ? _playerLoc$getY : 0;
  var currentBoundary = getBoundaryForPoint(playerX, playerY);
  var safeTileA = {
    x: 0,
    y: 0
  };
  var safeTileB = {
    x: 0,
    y: 0
  };
  if (currentBoundary) {
    if (attackType === 'lightning') {
      safeTileA = arenaBoundaries[currentBoundary].lightningSafeTileA;
      safeTileB = arenaBoundaries[currentBoundary].lightningSafeTileB;
    } else {
      safeTileA = arenaBoundaries[currentBoundary].debrisStartTileA;
      safeTileB = arenaBoundaries[currentBoundary].debrisStartTileB;
    }
  }
  var isOnSafeTileA = playerX === safeTileA.x && playerY === safeTileA.y;
  var isOnSafeTileB = playerX === safeTileB.x && playerY === safeTileB.y;
  var isOnSafeTile = isOnSafeTileA || isOnSafeTileB;
  var orientationData = leviathan ? npcFunctions.npcOrientationToPlayer(leviathan) : false;
  var isFacingPlayer = orientationData && _typeof(orientationData) === 'object' ? orientationData.isFacingPlayer : false;
  var oppositeBoundary = getOppositeBoundary(currentBoundary);
  var oppositeTile = playerLoc ? getOppositeSideTiles(playerLoc) : {
    x: playerX,
    y: playerY
  };
  var isAtOppositeBoundary = oppositeBoundary ? isWithinBoundary(oppositeBoundary, playerX, playerY) : false;
  if (!isAtOppositeBoundary) {
    bot.walking.walkToWorldPoint(oppositeTile.x, oppositeTile.y);
    return null;
  }
  if (!isFacingPlayer) {
    playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
  }
  if (!isOnSafeTile) {
    var distanceToA = Math.sqrt(Math.pow(playerX - safeTileA.x, 2) + Math.pow(playerY - safeTileA.y, 2));
    var distanceToB = Math.sqrt(Math.pow(playerX - safeTileB.x, 2) + Math.pow(playerY - safeTileB.y, 2));
    var closestTile = distanceToA <= distanceToB ? safeTileA : safeTileB;
    bot.walking.walkToWorldPoint(closestTile.x, closestTile.y);
    return null;
  }
  playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
  return {
    currentBoundary,
    safeTileA,
    safeTileB,
    isOnSafeTile,
    isFacingPlayer,
    playerX,
    playerY
  };
}
function tryEquipMissingGearFromInventory(stateReference, requiredEquipment, wornEquipment) {
  for (var _i2 = 0, _Object$entries = Object.entries(requiredEquipment); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      slot = _Object$entries$_i[0],
      itemId = _Object$entries$_i[1];
    if (wornEquipment[slot] === itemId) {
      continue;
    }
    if (bot.inventory.containsId(itemId)) {
      var _equipmentSlotIndices;
      inventoryFunctions.swapGear(stateReference, [itemId], [], (_equipmentSlotIndices = equipmentSlotIndices[slot]) !== null && _equipmentSlotIndices !== void 0 ? _equipmentSlotIndices : -1, 'death');
      return true;
    }
  }
  return false;
}
function webWalkToPointIfIdle(worldPoint) {
  if (!bot.walking.isWebWalking()) {
    bot.walking.webWalkStart(worldPoint);
  }
}
function onStart() {
  try {
    createUi(state);
    projectileFunctions.initializeProjectileTracking(state);
    npcFunctions.initializeNpcAttackTracking(state);
    state.initialInventory = inventoryFunctions.cacheInventory(state);
    state.initialEquipment = playerFunctions.getWornEquipment(state);
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
      if (!state.scriptInitialized) notifyScriptInitialized();
      state.scriptInitialized = true;
    } else {
      return;
    }
    if (!generalFunctions.gameTick(state)) return;
    projectileFunctions.updateProjectileDistance(state);
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState === 'start_state') {
      bot.breakHandler.setBreakHandlerStatus(true);
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
  return generalFunctions.endScript(state);
}
function stateManager() {
  logger(state, 'debug', 'stateManager', "".concat(state.mainState, " - ").concat(state.subState));
  switch (state.mainState) {
    case 'start_state':
      {
        logger(state, 'debug', 'stateManager', 'Starting Auto Leviathan. Grabbing required data.');
        state.attackSpeed = attackTimers.getEquippedWeaponSpeed(state);
        state.mainState = 'approach_leviathan';
        break;
      }
    case 'approach_leviathan':
      {
        var _client$getLocalPlaye3, _client2, _client2$getLocalPlay, _player$getWorldLocat, _player$getWorldLocat2;
        var player = (_client$getLocalPlaye3 = (_client2 = client) === null || _client2 === void 0 || (_client2$getLocalPlay = _client2.getLocalPlayer) === null || _client2$getLocalPlay === void 0 ? void 0 : _client2$getLocalPlay.call(_client2)) !== null && _client$getLocalPlaye3 !== void 0 ? _client$getLocalPlaye3 : null;
        var playerLoc = (_player$getWorldLocat = player === null || player === void 0 || (_player$getWorldLocat2 = player.getWorldLocation) === null || _player$getWorldLocat2 === void 0 ? void 0 : _player$getWorldLocat2.call(player)) !== null && _player$getWorldLocat !== void 0 ? _player$getWorldLocat : null;
        if (!playerLoc) break;
        var ladderBoundary = arenaBoundaries.ladder;
        var isInLadderArea = playerLoc.getX() >= ladderBoundary.minX && playerLoc.getX() <= ladderBoundary.maxX && playerLoc.getY() >= ladderBoundary.minY && playerLoc.getY() <= ladderBoundary.maxY;
        if (isInLadderArea) {
          var _bot$objects$getTileO;
          var ladderObject = (_bot$objects$getTileO = bot.objects.getTileObjectsWithIds([object.leviHandHolds])[0]) !== null && _bot$objects$getTileO !== void 0 ? _bot$objects$getTileO : null;
          if (ladderObject) {
            bot.objects.interactSuppliedObject(ladderObject, 'Climb');
          }
        }
        break;
      }
    case 'prepare_combat':
      {
        var inCombatArea = playerFunctions.engageNPC(state, {
          minX: 2017,
          maxX: 2091,
          minY: 6363,
          maxY: 6381,
          plane: 0
        });
        if (inCombatArea) {
          state.mainState = 'leviathan_combat';
          state.subState = 'manage_hp/prayer';
        } else {
          logger(state, 'debug', 'prepare_combat', 'Not in combat area. Returning to Leviathan.');
          state.mainState = 'return_to_leviathan';
        }
        break;
      }
    case 'leviathan_combat':
      {
        var _player$getWorldLocat3, _player$getWorldLocat4;
        var HP = net.runelite.api.Skill.HITPOINTS;
        var Prayer = net.runelite.api.Skill.PRAYER;
        var currentHealthLeft = client.getBoostedSkillLevel(HP);
        var _player = client.getLocalPlayer();
        var _playerLoc = (_player$getWorldLocat3 = _player === null || _player === void 0 || (_player$getWorldLocat4 = _player.getWorldLocation) === null || _player$getWorldLocat4 === void 0 ? void 0 : _player$getWorldLocat4.call(_player)) !== null && _player$getWorldLocat3 !== void 0 ? _player$getWorldLocat3 : null;
        var playerLocForTick = _playerLoc !== null && _playerLoc !== void 0 ? _playerLoc : client.getLocalPlayer().getWorldLocation();
        if (currentHealthLeft <= 0) {
          logger(state, 'debug', 'leviathan_combat', 'Player is dead. Transitioning to death state.');
          state.mainState = 'death';
          state.subState = 'return_to_grave';
          break;
        }
        var leviathan = bot.npcs.getWithIds(npcGroupIds.leviathans).find(npc => npcFunctions.isNpcAlive(npc));
        var sortedProjectiles = projectileFunctions.getSortedProjectiles(state);
        if (sortedProjectiles.length > 0) {
          playerFunctions.handleIncomingProjectiles(state);
        }
        var allProjectileRates = projectileFunctions.getAllProjectileHitRates(state, 10);
        var takingProjectileEveryTick = Object.values(allProjectileRates).some(rate => rate.hitsEveryTick && rate.totalHits > 0);
        if (takingProjectileEveryTick && state.subState !== 'reset_leviathan') {
          logger(state, 'debug', 'leviathan_combat', 'Taking projectiles every tick. Stunning Leviathan.');
          state.subState = 'reset_leviathan';
        }
        if (leviathan) {
          var _leviathan$getHealthR;
          var leviathanHealthRatio = (_leviathan$getHealthR = leviathan.getHealthRatio()) !== null && _leviathan$getHealthR !== void 0 ? _leviathan$getHealthR : 255;
          var leviathanHealthPercent = Math.round(leviathanHealthRatio / 255 * 100);
          state.leviathanLastHealth = leviathanHealthPercent;
          if (leviathanHealthPercent <= 25 && leviathanHealthPercent > 20 && !['moving_to_pathfinder', 'track_abyss_pathfinder'].includes(state.subState)) {
            logger(state, 'debug', 'leviathan_combat', "Leviathan at ".concat(leviathanHealthPercent, "% health. Moving to pathfinder location."));
            state.subState = 'moving_to_pathfinder';
          }
          if (leviathanHealthPercent <= 20 && state.subState !== 'track_abyss_pathfinder') {
            logger(state, 'debug', 'leviathan_combat', "Leviathan at ".concat(leviathanHealthPercent, "% health. Starting pathfinder phase!"));
            state.subState = 'track_abyss_pathfinder';
          }
        }
        var dangerousTiles = tileFunctions.getDangerousTiles();
        var inSpecialAttackState = ['reset_leviathan', 'avoid_lightning', 'dodge_debris'].includes(state.subState);
        if (dangerousTiles.length > 0 && !inSpecialAttackState) {
          logger(state, 'debug', 'leviathan_combat', "Dangerous tiles detected (".concat(dangerousTiles.length, " tiles). Moving to safety."));
          state.subState = 'handle_danger_tiles';
        }
        switch (state.subState) {
          case 'manage_hp/prayer':
            {
              var currentPrayerLeft = client.getBoostedSkillLevel(Prayer);
              if (currentHealthLeft < 25) {
                playerFunctions.comboEat(state, NORMAL_FOODS, COMBO_FOODS, NORMAL_FOOD_DELAY);
                break;
              }
              if (currentHealthLeft < 50 && currentPrayerLeft < 30) {
                playerFunctions.eatFoodAndDrinkPotion(state, NORMAL_FOODS, NORMAL_FOOD_DELAY, PRAYER_POTIONS, POTION_DELAY);
                break;
              }
              if (currentPrayerLeft < 30) {
                playerFunctions.drinkPotion(state, PRAYER_POTIONS, POTION_DELAY);
                break;
              }
              if (currentHealthLeft < 50) {
                playerFunctions.eatFood(state, NORMAL_FOODS, NORMAL_FOOD_DELAY);
                break;
              }
              state.subState = 'engage_combat';
              break;
            }
          case 'engage_combat':
            {
              if (!leviathan || !npcFunctions.isNpcAlive(leviathan)) {
                logger(state, 'debug', 'engage_combat', 'Leviathan not found or dead.');
                state.mainState = 'prepare_combat';
                break;
              }
              var ticksSinceLastAttack = state.gameTick - state.lastAttackTick;
              var attackCooldown = state.attackSpeed > 0 ? state.attackSpeed : 4;
              if (ticksSinceLastAttack >= attackCooldown) {
                playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
                state.lastAttackTick = state.gameTick;
                logger(state, 'debug', 'engage_combat', "Attacking Leviathan. Cooldown: ".concat(attackCooldown, " ticks."));
              }
              break;
            }
          case 'handle_danger_tiles':
            {
              if (dangerousTiles.length === 0) {
                logger(state, 'debug', 'handle_danger_tiles', 'No dangerous tiles detected. Returning to manage_hp/prayer.');
                state.subState = 'manage_hp/prayer';
                break;
              }
              var safeTile = tileFunctions.getSafeTile(state, 5);
              if (safeTile) {
                var currentPlayerLoc = playerLocForTick;
                if (currentPlayerLoc.getX() !== safeTile.getX() || currentPlayerLoc.getY() !== safeTile.getY()) {
                  bot.walking.walkToWorldPoint(safeTile.getX(), safeTile.getY());
                  state.movementStartTick = state.gameTick;
                  logger(state, 'debug', 'handle_danger_tiles', "Moving to safe tile (".concat(safeTile.getX(), ", ").concat(safeTile.getY(), ")."));
                  state.subState = 'engage_combat';
                } else {
                  logger(state, 'debug', 'handle_danger_tiles', 'At safe tile. Returning to manage_hp/prayer.');
                  state.subState = 'manage_hp/prayer';
                }
              } else {
                logger(state, 'debug', 'handle_danger_tiles', 'No safe tile found. Get ready to die!');
              }
              break;
            }
          case 'reset_leviathan':
            {
              var objectsInBoundaries = tileFunctions.areObjectsInBoundaries(state, [arenaBoundaries.west, arenaBoundaries.east]);
              playerFunctions.castSpellOnNpc(state, ['SHADOW_RUSH', 'SHADOW_BURST', 'SHADOW_BLITZ', 'SHADOW_BARRAGE'], [LEVIATHAN_TARGET_ID]);
              if (objectsInBoundaries) {
                logger(state, 'debug', 'reset_leviathan', 'Lightning special attack detected. Transitioning to avoid_lightning.');
                state.subState = 'avoid_lightning';
              } else {
                logger(state, 'debug', 'reset_leviathan', 'Debris special attack detected. Transitioning to dodge_debris.');
                state.subState = 'dodge_debris';
              }
              break;
            }
          case 'avoid_lightning':
            {
              var lightningAnimationId = 12345;
              var isAnimationActive = (leviathan === null || leviathan === void 0 ? void 0 : leviathan.getAnimation()) === lightningAnimationId;
              var phaseData = executeSpecialAttackPhases1to3('lightning', playerLocForTick, leviathan !== null && leviathan !== void 0 ? leviathan : null);
              if (!phaseData) break;
              var safeTileA = phaseData.safeTileA,
                safeTileB = phaseData.safeTileB,
                isOnSafeTile = phaseData.isOnSafeTile,
                isFacingPlayer = phaseData.isFacingPlayer;
              if (!isAnimationActive) {
                logger(state, 'debug', 'avoid_lightning', 'Lightning special attack ended. Returning to manage_hp/prayer.');
                state.subState = 'manage_hp/prayer';
                break;
              }
              if (isFacingPlayer) {
                playerFunctions.runBetweenTiles(state, safeTileA, safeTileB);
              } else {
                if (isOnSafeTile) {
                  playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
                }
              }
              logger(state, 'debug', 'avoid_lightning', "".concat(isFacingPlayer ? 'Alternating between tiles.' : 'Attacking from safe tile.'));
              break;
            }
          case 'dodge_debris':
            {
              var _currentPlayerLoc = playerLocForTick;
              var playerX = _currentPlayerLoc.getX();
              var playerY = _currentPlayerLoc.getY();
              var currentBoundary = getBoundaryForPoint(playerX, playerY);
              var _phaseData = executeSpecialAttackPhases1to3('debris', playerLocForTick, leviathan !== null && leviathan !== void 0 ? leviathan : null);
              if (!_phaseData) break;
              var debrisAnimationId = 12346;
              var _isAnimationActive = (leviathan === null || leviathan === void 0 ? void 0 : leviathan.getAnimation()) === debrisAnimationId;
              playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
              if (!_isAnimationActive) {
                logger(state, 'debug', 'dodge_debris', 'Debris special attack ended. Returning to manage_hp/prayer.');
                state.subState = 'manage_hp/prayer';
                break;
              }
              if (!state.debrisMovementState && currentBoundary) {
                state.debrisMovementState = {
                  currentTileIndex: 0,
                  ticksOnCurrentTile: 0,
                  tilesCompleted: 0
                };
              }
              var debrisState = state.debrisMovementState;
              if (!debrisState || !currentBoundary) break;
              var debrisTiles = tileSets.safeTileSets.leviDebrisTiles[currentBoundary];
              debrisState.ticksOnCurrentTile++;
              if (debrisState.ticksOnCurrentTile >= 2) {
                if (debrisState.tilesCompleted < 4) {
                  debrisState.currentTileIndex++;
                  var nextTile = debrisTiles[debrisState.currentTileIndex];
                  if (nextTile) {
                    bot.walking.walkToWorldPoint(nextTile.x, nextTile.y);
                    debrisState.ticksOnCurrentTile = 0;
                    debrisState.tilesCompleted++;
                    logger(state, 'debug', 'dodge_debris', "Moving to tile ".concat(debrisState.currentTileIndex + 1, " (move ").concat(debrisState.tilesCompleted, "/4)"));
                  }
                } else {
                  if (leviathan) {
                    var _leviathan$getWorldLo;
                    var leviathanLoc = (_leviathan$getWorldLo = leviathan.getWorldLocation) === null || _leviathan$getWorldLo === void 0 ? void 0 : _leviathan$getWorldLo.call(leviathan);
                    if (leviathanLoc && debrisTiles[3]) {
                      var rock4 = debrisTiles[3];
                      var directionX = rock4.x - leviathanLoc.getX();
                      var directionY = rock4.y - leviathanLoc.getY();
                      var directionXSign = 0;
                      if (directionX > 0) {
                        directionXSign = 1;
                      } else if (directionX < 0) {
                        directionXSign = -1;
                      }
                      var directionYSign = 0;
                      if (directionY > 0) {
                        directionYSign = 1;
                      } else if (directionY < 0) {
                        directionYSign = -1;
                      }
                      var behindX = rock4.x + directionXSign;
                      var behindY = rock4.y + directionYSign;
                      bot.walking.walkToWorldPoint(behindX, behindY);
                      logger(state, 'debug', 'dodge_debris', "Positioning 1 tile behind rock 4 at (".concat(behindX, ", ").concat(behindY, ") to obstruct line of sight"));
                      state.debrisMovementState = null;
                      state.subState = 'manage_hp/prayer';
                      break;
                    }
                  }
                }
              } else if (debrisState.ticksOnCurrentTile === 1 && debrisState.tilesCompleted > 0) {
                playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
              }
              var waveAnimationId = 12347;
              var isWaveAnimationActive = (leviathan === null || leviathan === void 0 ? void 0 : leviathan.getAnimation()) === waveAnimationId;
              if (isWaveAnimationActive) {
                logger(state, 'debug', 'dodge_debris', 'Wave animation detected during debris special. Returning to manage_hp/prayer.');
                state.debrisMovementState = null;
                state.subState = 'manage_hp/prayer';
                break;
              }
              logger(state, 'debug', 'dodge_debris', "Standing on tile (".concat(debrisState.ticksOnCurrentTile, "/2 ticks)"));
              break;
            }
          case 'moving_to_pathfinder':
            {
              var _currentPlayerLoc2 = playerLocForTick;
              if (_currentPlayerLoc2.getX() === pathfinderStartLocation.x && _currentPlayerLoc2.getY() === pathfinderStartLocation.y) {
                logger(state, 'debug', 'moving_to_pathfinder', 'Arrived at pathfinder location. Waiting for 20% health.');
                break;
              }
              bot.walking.walkToWorldPoint(pathfinderStartLocation.x, pathfinderStartLocation.y);
              if (leviathan && bot.localPlayerIdle() && state.gameTick - state.lastAttackTick >= state.attackSpeed) {
                bot.npcs.interact(leviathan.getName(), 'Attack');
                state.lastAttackTick = state.gameTick;
                logger(state, 'debug', 'moving_to_pathfinder', 'Attacking leviathan while moving');
              }
              logger(state, 'debug', 'moving_to_pathfinder', "Moving to pathfinder location (".concat(pathfinderStartLocation.x, ", ").concat(pathfinderStartLocation.y, ")"));
              break;
            }
          case 'track_abyss_pathfinder':
            {
              var _currentPlayerLoc3 = playerLocForTick;
              if (_currentPlayerLoc3.getX() !== pathfinderStartLocation.x || _currentPlayerLoc3.getY() !== pathfinderStartLocation.y) {
                bot.walking.walkToWorldPoint(pathfinderStartLocation.x, pathfinderStartLocation.y);
                logger(state, 'debug', 'track_abyss_pathfinder', "Sprinting to pathfinder location (".concat(pathfinderStartLocation.x, ", ").concat(pathfinderStartLocation.y, ")"));
                break;
              }
              var pathfinder = bot.npcs.getWithIds([NPC.abbyssalPathfinder]).find(npc => npcFunctions.isNpcAlive(npc));
              if (!pathfinder) {
                logger(state, 'debug', 'track_abyss_pathfinder', 'Abyss pathfinder not found. Resuming normal combat.');
                state.subState = '';
                state.pathfinderPrevLoc = null;
                break;
              }
              var pathfinderLoc = pathfinder.getWorldLocation();
              if (!pathfinderLoc) break;
              var safeAreaTiles = [];
              for (var dx = -2; dx <= 2; dx++) {
                for (var dy = -2; dy <= 2; dy++) {
                  safeAreaTiles.push({
                    x: pathfinderLoc.getX() + dx,
                    y: pathfinderLoc.getY() + dy
                  });
                }
              }
              var _directionX = 0;
              var _directionY = 0;
              if (state.pathfinderPrevLoc) {
                _directionX = Math.sign(pathfinderLoc.getX() - state.pathfinderPrevLoc.x) || _directionX;
                _directionY = Math.sign(pathfinderLoc.getY() - state.pathfinderPrevLoc.y) || _directionY;
              }
              var frontTiles = [];
              if (_directionX > 0 || _directionX < 0) {
                frontTiles = safeAreaTiles.filter(t => t.x === pathfinderLoc.getX() + (_directionX > 0 ? 1 : -1));
              } else if (_directionY > 0 || _directionY < 0) {
                frontTiles = safeAreaTiles.filter(t => t.y === pathfinderLoc.getY() + (_directionY > 0 ? 1 : -1));
              } else {
                frontTiles = [{
                  x: pathfinderLoc.getX(),
                  y: pathfinderLoc.getY()
                }];
              }
              var playerLocForPathfinder = _currentPlayerLoc3;
              var isInSafeArea = safeAreaTiles.some(tile => tile.x === playerLocForPathfinder.getX() && tile.y === playerLocForPathfinder.getY());
              if (!isInSafeArea) {
                var targetTile = findClosestFrontTile(frontTiles, playerLocForPathfinder);
                bot.walking.walkToWorldPoint(targetTile.x, targetTile.y);
                logger(state, 'debug', 'track_abyss_pathfinder', "Moving to front tile. Target: (".concat(targetTile.x, ", ").concat(targetTile.y, "), Direction: (").concat(_directionX, ", ").concat(_directionY, ")"));
                break;
              }
              var isOnFrontTile = frontTiles.some(tile => tile.x === playerLocForPathfinder.getX() && tile.y === playerLocForPathfinder.getY());
              if (!isOnFrontTile && bot.localPlayerIdle()) {
                var _targetTile = findClosestFrontTile(frontTiles, playerLocForPathfinder);
                bot.walking.walkToWorldPoint(_targetTile.x, _targetTile.y);
                logger(state, 'debug', 'track_abyss_pathfinder', "Repositioning to front tile. Target: (".concat(_targetTile.x, ", ").concat(_targetTile.y, ")"));
                break;
              }
              if (leviathan && isOnFrontTile) {
                if (bot.localPlayerIdle() && state.gameTick - state.lastAttackTick >= state.attackSpeed) {
                  bot.npcs.interact(leviathan.getName(), 'Attack');
                  state.lastAttackTick = state.gameTick;
                  logger(state, 'debug', 'track_abyss_pathfinder', 'Attacking leviathan from front tile (idle)');
                } else if (state.gameTick - state.lastAttackTick >= state.attackSpeed) {
                  bot.npcs.interact(leviathan.getName(), 'Attack');
                  state.lastAttackTick = state.gameTick;
                  logger(state, 'debug', 'track_abyss_pathfinder', 'Re-attacking leviathan from front tile (post-move)');
                }
              }
              state.pathfinderPrevLoc = {
                x: pathfinderLoc.getX(),
                y: pathfinderLoc.getY()
              };
              if (!pathfinder || !npcFunctions.isNpcAlive(pathfinder)) {
                logger(state, 'debug', 'track_abyss_pathfinder', 'Pathfinder phase complete. Resuming normal combat.');
                state.mainState = 'looting';
                state.pathfinderPrevLoc = null;
              }
              break;
            }
          default:
            {
              logger(state, 'debug', 'leviathan_combat', "Unknown subState: ".concat(state.subState, ". Returning to manage_hp/prayer."));
              state.subState = 'manage_hp/prayer';
              break;
            }
        }
        break;
      }
    case 'looting':
      {
        break;
      }
    case 'inventory_management':
      {
        break;
      }
    case 'run_to_bank':
      {
        bankFunctions.processBankOpen(state, () => {
          state.mainState = 'banking';
        });
        break;
      }
    case 'banking':
      {
        var completed = bankFunctions.quickBanking(state, state.initialInventory, state.bankingProgress, 'banking');
        if (completed) {
          state.mainState = 'return_to_leviathan';
        }
        break;
      }
    case 'return_to_leviathan':
      {
        if (bot.walking.isWebWalking()) {
          break;
        }
        if (!state.returnWalkInitiated) {
          var bossLocationX = 2066;
          var bossLocationY = 6368;
          tileFunctions.webWalkCalculator(state, bossLocationX, bossLocationY);
          state.returnWalkInitiated = true;
          break;
        }
        state.returnWalkInitiated = false;
        state.mainState = 'leviathan_combat';
        state.subState = 'approach_leviathan';
        break;
      }
    case 'death':
      {
        var _HP = net.runelite.api.Skill.HITPOINTS;
        var _currentHealthLeft = client.getBoostedSkillLevel(_HP);
        if (_currentHealthLeft <= 0) {
          break;
        }
        if (!state.subState) {
          state.subState = 'return_to_grave';
        }
        switch (state.subState) {
          case 'return_to_grave':
            {
              var isAtGraveLocation = locationFunctions.isPlayerNearWP(graveLocation, 2);
              if (!isAtGraveLocation) {
                webWalkToPointIfIdle(graveLocation);
                break;
              }
              var graveNpc = npcFunctions.getClosestNPC([NPC.graveDefault, NPC.graveAngel]);
              if (!graveNpc) {
                state.graveLootAttempts = 0;
                state.subState = 'return_to_bank';
                break;
              }
              var _playerFunctions$getG = playerFunctions.getGearSnapshot(state, state.initialEquipment),
                requiredEquipment = _playerFunctions$getG.requiredEquipment,
                wornEquipment = _playerFunctions$getG.wornEquipment,
                isFullyGeared = _playerFunctions$getG.isFullyGeared;
              if (!isFullyGeared && tryEquipMissingGearFromInventory(state, requiredEquipment, wornEquipment)) {
                break;
              }
              if (state.graveLootAttempts >= 2) {
                state.graveLootAttempts = 0;
                state.subState = 'return_to_bank';
                break;
              }
              bot.npcs.interact(graveNpc.getName(), 'Loot');
              state.graveLootAttempts += 1;
              break;
            }
          case 'return_to_bank':
            {
              bankFunctions.processBankOpen(state, () => {
                state.subState = 're_gear';
              });
              break;
            }
          case 're_gear':
            {
              if (!bot.bank.isOpen()) {
                state.subState = 'return_to_bank';
                break;
              }
              var _playerFunctions$getG2 = playerFunctions.getGearSnapshot(state, state.initialEquipment),
                _requiredEquipment = _playerFunctions$getG2.requiredEquipment,
                _wornEquipment = _playerFunctions$getG2.wornEquipment,
                _isFullyGeared = _playerFunctions$getG2.isFullyGeared;
              if (_isFullyGeared) {
                state.mainState = 'banking';
                state.subState = '';
                break;
              }
              if (tryEquipMissingGearFromInventory(state, _requiredEquipment, _wornEquipment)) {
                break;
              }
              for (var _i3 = 0, _Object$entries2 = Object.entries(_requiredEquipment); _i3 < _Object$entries2.length; _i3++) {
                var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
                  slot = _Object$entries2$_i[0],
                  itemId = _Object$entries2$_i[1];
                if (_wornEquipment[slot] === itemId) {
                  continue;
                }
                var bankQuantity = bot.bank.getQuantityOfId(itemId);
                if (bankQuantity <= 0) {
                  var message = "Missing required gear item ".concat(itemId, " in slot ").concat(slot, ".");
                  bot.printGameMessage(message);
                  logger(state, 'all', 're_gear', message);
                  bot.terminate();
                  break;
                }
                bot.bank.withdrawQuantityWithId(itemId, 1);
                inventoryFunctions.itemInventoryTimeout.present(state, itemId, 'death');
                break;
              }
              break;
            }
          default:
            {
              state.subState = 'return_to_grave';
              break;
            }
        }
        break;
      }
    default:
      {
        logger(state, 'debug', 'stateManager', 'Unknown mainState, resetting to start_state.');
        state.mainState = 'start_state';
        state.subState = '';
        break;
      }
  }
}


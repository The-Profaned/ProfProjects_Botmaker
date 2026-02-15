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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
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
var includesAny = (text, keywords) => keywords.some(keyword => text.includes(keyword));
var DANGER_KEYWORDS = ['danger', 'dangerous', 'fatal', 'error', 'failed', 'failure', 'timeout', 'dead', 'death', 'low hp', 'critical'];
var NPC_ACTION_KEYWORDS = ['npc', 'projectile', 'animation', 'despawn', 'spawn'];
var STATE_KEYWORDS = ['state', 'substate', 'phase', 'transition', 'entering', 'exiting', 'resume', 'resuming', 'initialize', 'initialized', 'start', 'started', 'end', 'ended'];
var PLAYER_ACTION_KEYWORDS = ['attack', 'attacking', 'prayer', 'walk', 'walking', 'move', 'moving', 'webwalk', 'eat', 'eating', 'drink', 'drinking', 'equip', 'unequip', 'cast', 'bank', 'withdraw', 'deposit', 'loot'];
var SYSTEM_KEYWORDS = ['debug', 'cache', 'snapshot', 'poll', 'tracking', 'tick', 'status', 'queue', 'path', 'waypoint', 'distance', 'timer'];
var classifyLogColor = (source, message) => {
  var text = "".concat(source, " ").concat(message).toLowerCase();
  if (includesAny(text, DANGER_KEYWORDS)) return LOG_COLOR_PINK;
  if (includesAny(text, STATE_KEYWORDS)) return LOG_COLOR_GOLD;
  if (includesAny(text, NPC_ACTION_KEYWORDS)) return LOG_COLOR_CORAL;
  if (includesAny(text, PLAYER_ACTION_KEYWORDS)) return LOG_COLOR_EMERALD;
  if (includesAny(text, SYSTEM_KEYWORDS)) return LOG_COLOR_TEAL;
  return LOG_COLOR_BLUE;
};
var logger = (state, type, source, message, color) => {
  var logMessage = "[".concat(source, "] ").concat(message);
  var printToLog = () => {
    var chosenColor = classifyLogColor(source, message);
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
  if (failureResetState) state.mainState = failureResetState;
};
var handleFailure = (state, failureLocation, failureMessage, failureResetState) => {
  onFailures(state, failureLocation, failureMessage, failureResetState);
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

var itemInventoryTimeoutPresent = (state, itemId, failResetState) => itemInventoryTimeoutCore(state, itemId, failResetState, true);
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
      onFail: () => handleFailure(state, 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " ").concat(waitForPresence ? 'not in' : 'still in', " inventory after 10 ticks."), failResetState)
    });
    return false;
  }
  logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', "Item ID ".concat(itemId, " is ").concat(waitForPresence ? 'in' : 'not in', " inventory."));
  return true;
}

var withdrawFirstExistingItem = (state, itemIds, quantity, failResetState) => {
  var _iterator2 = _createForOfIteratorHelper(itemIds),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var itemId = _step2.value;
      var bankQuantity = bot.bank.getQuantityOfId(itemId);
      if (bankQuantity === 0) continue;
      logger(state, 'debug', 'bankFunctions.withdrawFirstExistingItem', "Withdrawing item ID ".concat(itemId, " with quantity ").concat(quantity));
      bot.bank.withdrawQuantityWithId(itemId, quantity);
      return itemInventoryTimeoutPresent(state, itemId, failResetState);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  logger(state, 'debug', 'bankFunctions.withdrawFirstExistingItem', "No items found in bank with IDs: ".concat(itemIds.join(', ')));
  return false;
};
var processBankOpen = (state, onOpen) => {
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
    var player = client.getLocalPlayer();
    if (player) {
      var playerLoc = player.getWorldLocation();
      var bankNames = ['Bank booth', 'Bank chest', 'Grand Exchange booth', 'Bank', 'Banker'];
      var nearbyBanks = bot.objects.getTileObjectsWithNames(bankNames);
      if (nearbyBanks && nearbyBanks.length > 0) {
        var _iterator3 = _createForOfIteratorHelper(nearbyBanks),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var bank = _step3.value;
            var bankLoc = bank.getWorldLocation();
            var distance = Math.max(Math.abs(playerLoc.getX() - bankLoc.getX()), Math.abs(playerLoc.getY() - bankLoc.getY()));
            if (distance <= 3) {
              logger(state, 'debug', 'bankFunctions.processBankOpen', "Player within ".concat(distance, " tiles of bank, skipping webwalk"));
              state.bankWalkInitiated = true;
              state.isAtBankLocation = false;
              state.bankOpenAttemptTick = -1;
              return;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
    logger(state, 'debug', 'bankFunctions.processBankOpen', 'Initiating webwalk to nearest bank');
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
};

var NpcID = net.runelite.api.gameval.NpcID;
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
var gamesNecklace = [ItemID.GAMES_NECKLACE1, ItemID.GAMES_NECKLACE2, ItemID.GAMES_NECKLACE3, ItemID.GAMES_NECKLACE4, ItemID.GAMES_NECKLACE5, ItemID.GAMES_NECKLACE6, ItemID.GAMES_NECKLACE7, ItemID.GAMES_NECKLACE8];
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

({
  leviathan: NpcID.LEVIATHAN,
  leviathanQuest: NpcID.LEVIATHAN_QUEST,
  abbyssalPathfinder: NpcID.LEVIATHAN_BUFF_NPC,
  graveDefault: NpcID.GRAVESTONE_DEFAULT,
  graveAngel: NpcID.GRAVESTONE_ANGEL
});
var npcProjectileIds = {
  leviathanMagic: 2489,
  leviathanRanged: 2487,
  leviathanMelee: 2488
};
_defineProperty(_defineProperty(_defineProperty({}, npcProjectileIds.leviathanMagic, 'protMage'), npcProjectileIds.leviathanRanged, 'protRange'), npcProjectileIds.leviathanMelee, 'protMelee');
_defineProperty(_defineProperty(_defineProperty({}, npcProjectileIds.leviathanRanged, 'ranged'), npcProjectileIds.leviathanMelee, 'melee'), npcProjectileIds.leviathanMagic, 'magic');

({
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
});

var isPlayerInArea = (state, minX, maxX, minY, maxY, plane) => {
  var playerLoc = client.getLocalPlayer().getWorldLocation();
  var playerX = playerLoc.getX();
  var playerY = playerLoc.getY();
  var playerPlane = playerLoc.getPlane();
  var inXBounds = playerX >= minX && playerX <= maxX;
  var inYBounds = playerY >= minY && playerY <= maxY;
  var inPlane = plane === undefined || playerPlane === plane;
  var result = inXBounds && inYBounds && inPlane;
  if (state.debugFullState) {
    logger(state, 'debug', 'isPlayerInArea', "Player at (".concat(playerX, ", ").concat(playerY, ", ").concat(playerPlane, "). Area bounds: X[").concat(minX, "-").concat(maxX, "], Y[").concat(minY, "-").concat(maxY, "], Plane[").concat(plane , "]. In area: ").concat(result));
  }
  return result;
};

var getWornEquipment = state => {
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
    var _item$getId;
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      slotIndex = _Object$entries$_i[0],
      slotName = _Object$entries$_i[1];
    var index = Number(slotIndex);
    var item = equipmentItems[index];
    if (item && (_item$getId = item.getId) !== null && _item$getId !== void 0 && _item$getId.call(item) && item.getId() > 0) {
      equipment[slotName] = item.getId();
    }
  }
  logger(state, 'debug', 'getWornEquipment', "Current equipment: ".concat(JSON.stringify(equipment)));
  return equipment;
};

var BLUE_TEAR_WALLS = [6661, 6665];
var GREEN_TEAR_WALLS = [6662, 6666];
var WEEPING_WALL_ID = 6660;
var STARTING_TILE = new net.runelite.api.coords.WorldPoint(3257, 9517, 2);
var WALL_TILES = [new net.runelite.api.coords.WorldPoint(3257, 9520, 2), new net.runelite.api.coords.WorldPoint(3258, 9520, 2), new net.runelite.api.coords.WorldPoint(3259, 9520, 2), new net.runelite.api.coords.WorldPoint(3261, 9518, 2), new net.runelite.api.coords.WorldPoint(3261, 9517, 2), new net.runelite.api.coords.WorldPoint(3261, 9516, 2), new net.runelite.api.coords.WorldPoint(3259, 9514, 2), new net.runelite.api.coords.WorldPoint(3258, 9514, 2), new net.runelite.api.coords.WorldPoint(3257, 9514, 2)];
var PLAYER_STANDING_TILES = [new net.runelite.api.coords.WorldPoint(3257, 9519, 2), new net.runelite.api.coords.WorldPoint(3258, 9519, 2), new net.runelite.api.coords.WorldPoint(3259, 9519, 2), new net.runelite.api.coords.WorldPoint(3260, 9518, 2), new net.runelite.api.coords.WorldPoint(3260, 9517, 2), new net.runelite.api.coords.WorldPoint(3260, 9516, 2), new net.runelite.api.coords.WorldPoint(3259, 9515, 2), new net.runelite.api.coords.WorldPoint(3258, 9515, 2), new net.runelite.api.coords.WorldPoint(3257, 9515, 2)];
var state$1 = null;
var scriptInitialized = false;
var junaDialogCompleted = false;
var minigameActive = true;
var startingIdleTicks = 0;
var hasStarted = false;
var initialClickDone = false;
var activeWalls = new Map();
var spawnCycle = [];
var cyclePosition = 0;
var cycleVerified = false;
var observedSpawns = 0;
var bluePhaseStartIndex = 3;
var blueSpawnCount = 0;
var canClickThisCycle = false;
var blueSpawnLocations = [null, null, null];
var lastClickedWallLocation = null;
function initializeTearsUtils(scriptState) {
  state$1 = scriptState;
}
function resetTearsState() {
  scriptInitialized = false;
  junaDialogCompleted = false;
  minigameActive = true;
  startingIdleTicks = 0;
  hasStarted = false;
  initialClickDone = false;
  activeWalls = new Map();
  spawnCycle = [];
  cyclePosition = 0;
  cycleVerified = false;
  observedSpawns = 0;
  bluePhaseStartIndex = 3;
  blueSpawnCount = 0;
  canClickThisCycle = false;
  blueSpawnLocations = [null, null, null];
  lastClickedWallLocation = null;
}
var logMessage = (level, source, message) => {
  if (state$1) {
    logger(state$1, level, source, message);
    return;
  }
  log.print("[".concat(source, "] ").concat(message));
};
function talkToJuna() {
  var junaList = bot.objects.getTileObjectsWithNames(['Juna']);
  if (!junaList || junaList.length === 0) {
    logMessage('debug', 'juna', 'Could not find Juna game object');
    return;
  }
  var juna = junaList[0];
  logMessage('debug', 'juna', 'Interacting with Juna');
  bot.objects.interactSuppliedObject(juna, 'Story');
  junaDialogCompleted = true;
}
function getTearsStateFlags() {
  return {
    scriptInitialized,
    junaDialogCompleted,
    minigameActive
  };
}
function setTearsStateFlags(flags) {
  if (flags.scriptInitialized !== undefined) {
    scriptInitialized = flags.scriptInitialized;
  }
  if (flags.junaDialogCompleted !== undefined) {
    junaDialogCompleted = flags.junaDialogCompleted;
  }
  if (flags.minigameActive !== undefined) {
    minigameActive = flags.minigameActive;
  }
}
function worldPointEquals(a, b) {
  return a.getX() === b.getX() && a.getY() === b.getY() && a.getPlane() === b.getPlane();
}
function getWallTypeAtLocation(location) {
  var blueWalls = bot.objects.getTileObjectsWithIds(BLUE_TEAR_WALLS);
  if (blueWalls) {
    var _iterator = _createForOfIteratorHelper(blueWalls),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var wall = _step.value;
        if (!worldPointEquals(wall.getWorldLocation(), location)) {
          continue;
        }
        return 'blue';
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var greenWalls = bot.objects.getTileObjectsWithIds(GREEN_TEAR_WALLS);
  if (greenWalls) {
    var _iterator2 = _createForOfIteratorHelper(greenWalls),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _wall = _step2.value;
        if (!worldPointEquals(_wall.getWorldLocation(), location)) {
          continue;
        }
        return 'green';
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return 'none';
}
function getAdjacentWallIndex() {
  var player = client.getLocalPlayer();
  if (!player) {
    return -1;
  }
  var playerLoc = player.getWorldLocation();
  var _iterator3 = _createForOfIteratorHelper(PLAYER_STANDING_TILES.entries()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = _slicedToArray(_step3.value, 2),
        index = _step3$value[0],
        tile = _step3$value[1];
      if (worldPointEquals(playerLoc, tile)) {
        return index;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return -1;
}
function findNearestBlueWall() {
  var player = client.getLocalPlayer();
  if (!player) {
    return null;
  }
  var playerLoc = player.getWorldLocation();
  var nearestWall = null;
  var nearestDistance = 999;
  var _iterator4 = _createForOfIteratorHelper(WALL_TILES),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var wallTile = _step4.value;
      var wallType = getWallTypeAtLocation(wallTile);
      if (wallType === 'blue') {
        var distance = Math.abs(playerLoc.getX() - wallTile.getX()) + Math.abs(playerLoc.getY() - wallTile.getY());
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestWall = wallTile;
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return nearestWall;
}
function areWallsAdjacent(wall1, wall2) {
  var wall1Index = WALL_TILES.findIndex(w => worldPointEquals(w, wall1));
  var wall2Index = WALL_TILES.findIndex(w => worldPointEquals(w, wall2));
  if (wall1Index === -1 || wall2Index === -1) {
    return false;
  }
  return Math.abs(wall1Index - wall2Index) === 1 || wall1Index === 0 && wall2Index === WALL_TILES.length - 1 || wall1Index === WALL_TILES.length - 1 && wall2Index === 0;
}
function findPriorityBlueWall() {
  if (lastClickedWallLocation && blueSpawnLocations[0] && blueSpawnLocations[1]) {
    var wall1Type = getWallTypeAtLocation(blueSpawnLocations[0]);
    var wall2Type = getWallTypeAtLocation(blueSpawnLocations[1]);
    if (wall1Type === 'blue' && wall2Type === 'blue') {
      var isWall2Adjacent = areWallsAdjacent(lastClickedWallLocation, blueSpawnLocations[1]);
      if (isWall2Adjacent) {
        var player = client.getLocalPlayer();
        if (player) {
          var playerLoc = player.getWorldLocation();
          var wall1Distance = Math.abs(playerLoc.getX() - blueSpawnLocations[0].getX()) + Math.abs(playerLoc.getY() - blueSpawnLocations[0].getY());
          if (wall1Distance > 3) {
            logMessage('debug', 'click', "Wall 2 adjacent optimization: choosing wall 2 at (".concat(blueSpawnLocations[1].getX(), ", ").concat(blueSpawnLocations[1].getY(), ") over distant wall 1"));
            return blueSpawnLocations[1];
          }
        }
      }
    }
  }
  var _iterator5 = _createForOfIteratorHelper(blueSpawnLocations),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var location = _step5.value;
      if (!location) {
        continue;
      }
      if (getWallTypeAtLocation(location) === 'blue') {
        return location;
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return null;
}
function findNewestBlueWall() {
  for (var index = blueSpawnLocations.length - 1; index >= 0; index -= 1) {
    var location = blueSpawnLocations[index];
    if (!location) {
      continue;
    }
    if (getWallTypeAtLocation(location) === 'blue') {
      return location;
    }
  }
  return null;
}
function getWeepingWallAtLocation(location) {
  var walls = bot.objects.getTileObjectsWithIds([WEEPING_WALL_ID]);
  if (!walls) {
    return null;
  }
  var _iterator6 = _createForOfIteratorHelper(walls),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var wall = _step6.value;
      if (worldPointEquals(wall.getWorldLocation(), location)) {
        return wall;
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return null;
}
function locationToKey(loc) {
  return "".concat(loc.getX(), "_").concat(loc.getY(), "_").concat(loc.getPlane());
}
function trackWallCycle() {
  var currentWalls = new Map();
  var _iterator7 = _createForOfIteratorHelper(WALL_TILES),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var wallTile = _step7.value;
      var wallType = getWallTypeAtLocation(wallTile);
      if (wallType !== 'none') {
        var key = locationToKey(wallTile);
        currentWalls.set(key, {
          location: wallTile,
          type: wallType
        });
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  var _iterator8 = _createForOfIteratorHelper(currentWalls),
    _step8;
  try {
    var _loop = function _loop() {
      var _step8$value = _slicedToArray(_step8.value, 2),
        key = _step8$value[0],
        wallState = _step8$value[1];
      if (activeWalls.has(key)) {
        return 1; // continue
      }
      if (wallState.type !== 'none') {
        spawnCycle.push(wallState.type);
      }
      observedSpawns += 1;
      if (spawnCycle.length > 6) {
        spawnCycle.shift();
      }
      cyclePosition = (cyclePosition + 1) % 6;
      if (cycleVerified) {
        if (wallState.type === 'blue') {
          blueSpawnCount += 1;
          var existingIndex = blueSpawnLocations.findIndex(loc => loc && worldPointEquals(loc, wallState.location));
          if (existingIndex >= 0) {
            blueSpawnLocations[existingIndex] = null;
          }
          var slotIndex = Math.min(blueSpawnCount - 1, 2);
          blueSpawnLocations[slotIndex] = wallState.location;
          if (blueSpawnCount === 3) {
            canClickThisCycle = true;
            logMessage('debug', 'cycle', '3rd blue wall spawned - Click allowed');
          }
        } else {
          blueSpawnCount = 0;
          blueSpawnLocations = [null, null, null];
        }
      }
      if (cycleVerified || observedSpawns < 6) {} else {
        var last6 = spawnCycle.slice(-6);
        var blueCount = last6.filter(t => t === 'blue').length;
        var greenCount = last6.filter(t => t === 'green').length;
        if (blueCount !== 3 || greenCount !== 3) {} else {
          var blueStart = -1;
          for (var index = 0; index < last6.length; index++) {
            if (last6[index] === 'blue' && last6[(index + 1) % 6] === 'blue') {
              blueStart = index;
              break;
            }
          }
          if (blueStart === -1) {} else {
            bluePhaseStartIndex = blueStart;
            cycleVerified = true;
            logMessage('debug', 'cycle', "Cycle pattern verified: ".concat(last6.join(','), " | Blue phase starts at position ").concat(bluePhaseStartIndex));
          }
        }
      }
      logMessage('debug', 'cycle', "".concat(wallState.type, " wall spawned - Position: ").concat(cyclePosition, ", Observed: ").concat(observedSpawns, "/6 (").concat(cyclePosition < 3 ? 'GREEN phase' : 'BLUE phase', ")"));
    };
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      if (_loop()) continue;
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  var _iterator9 = _createForOfIteratorHelper(activeWalls),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _step9$value = _slicedToArray(_step9.value, 2),
        _key = _step9$value[0],
        wallState = _step9$value[1];
      if (!currentWalls.has(_key)) {
        logMessage('debug', 'cycle', "".concat(wallState.type, " wall despawned"));
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  activeWalls = currentWalls;
}
function isCycleVerified() {
  return cycleVerified;
}
function getCycleStatus() {
  var inBluePhase = isInBluePhase();
  return {
    verified: cycleVerified,
    observedSpawns: observedSpawns,
    currentPosition: cyclePosition,
    currentPhase: inBluePhase ? 'BLUE' : 'GREEN'
  };
}
function isInBluePhase() {
  var pos0 = bluePhaseStartIndex;
  var pos1 = (bluePhaseStartIndex + 1) % 6;
  var pos2 = (bluePhaseStartIndex + 2) % 6;
  return cyclePosition === pos0 || cyclePosition === pos1 || cyclePosition === pos2;
}
function clickBlueWall() {
  var _findPriorityBlueWall;
  if (!minigameActive) {
    return null;
  }
  var player = client.getLocalPlayer();
  if (!player) {
    return null;
  }
  var playerLoc = player.getWorldLocation();
  var isOnStartingTile = worldPointEquals(playerLoc, STARTING_TILE);
  if (!initialClickDone) {
    var _findNewestBlueWall;
    if (!isOnStartingTile || bot.localPlayerMoving() || !bot.localPlayerIdle()) {
      startingIdleTicks = 0;
      return null;
    }
    startingIdleTicks += 1;
    if (startingIdleTicks < 4) {
      return null;
    }
    var firstTarget = (_findNewestBlueWall = findNewestBlueWall()) !== null && _findNewestBlueWall !== void 0 ? _findNewestBlueWall : findNearestBlueWall();
    if (!firstTarget) {
      return null;
    }
    var firstWeepingWall = getWeepingWallAtLocation(firstTarget);
    if (!firstWeepingWall) {
      return null;
    }
    logMessage('debug', 'click', "Initial click on WEEPING_WALL at (".concat(firstTarget.getX(), ", ").concat(firstTarget.getY(), ")"));
    bot.objects.interactSuppliedObject(firstWeepingWall, 'Collect-from');
    lastClickedWallLocation = firstTarget;
    initialClickDone = true;
    hasStarted = true;
    canClickThisCycle = false;
    return firstTarget;
  }
  if (!hasStarted) {
    hasStarted = true;
    canClickThisCycle = true;
    logMessage('debug', 'start', "Starting wall interactions from tile (".concat(playerLoc.getX(), ", ").concat(playerLoc.getY(), ")"));
  }
  if (bot.localPlayerMoving()) {
    return null;
  }
  var adjacentIndex = getAdjacentWallIndex();
  if (adjacentIndex >= 0) {
    var wallType = getWallTypeAtLocation(WALL_TILES[adjacentIndex]);
    switch (wallType) {
      case 'green':
        {
          if (!canClickThisCycle) {
            return null;
          }
          logMessage('debug', 'switch', 'On green wall - forcing switch to blue');
          break;
        }
      case 'none':
        {
          if (!canClickThisCycle) {
            return null;
          }
          logMessage('debug', 'switch', 'On dead wall (no decoration) - finding blue wall');
          break;
        }
      case 'blue':
        {
          if (!canClickThisCycle) {
            return null;
          }
          break;
        }
    }
  } else {
    if (!canClickThisCycle) {
      return null;
    }
  }
  logMessage('debug', 'click', "Click window: ".concat(canClickThisCycle, ", adjacentIndex: ").concat(adjacentIndex));
  if (lastClickedWallLocation) {
    var lastWallType = getWallTypeAtLocation(lastClickedWallLocation);
    logMessage('debug', 'click', "Current wall: (".concat(lastClickedWallLocation.getX(), ", ").concat(lastClickedWallLocation.getY(), ") type=").concat(lastWallType));
    if (lastWallType === 'blue') {
      canClickThisCycle = false;
      return null;
    }
  } else {
    logMessage('debug', 'click', 'Current wall: none');
  }
  var targetWallLoc = (_findPriorityBlueWall = findPriorityBlueWall()) !== null && _findPriorityBlueWall !== void 0 ? _findPriorityBlueWall : findNearestBlueWall();
  if (!targetWallLoc) {
    logMessage('debug', 'click', 'No blue wall location found');
    return null;
  }
  var weepingWall = getWeepingWallAtLocation(targetWallLoc);
  if (!weepingWall) {
    logMessage('debug', 'click', 'No WEEPING_WALL at blue location');
    return null;
  }
  logMessage('debug', 'click', "Clicking WEEPING_WALL at (".concat(targetWallLoc.getX(), ", ").concat(targetWallLoc.getY(), ")"));
  bot.objects.interactSuppliedObject(weepingWall, 'Collect-from');
  lastClickedWallLocation = targetWallLoc;
  canClickThisCycle = false;
  return targetWallLoc;
}

var state = {
  debugEnabled: true,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  scriptInitalized: false,
  scriptName: 'profTears',
  uiCompleted: true,
  timeout: 0,
  gameTick: 0,
  subState: ''
};
var minigameBounds = {
  minX: 3254,
  maxX: 3261,
  minY: 9514,
  maxY: 9520,
  plane: 2
};
var minigameStartBounds = {
  minX: 3241,
  maxX: 3252,
  minY: 9498,
  maxY: 9528,
  plane: 2
};
var ToG = new net.runelite.api.coords.WorldPoint(3250, 9516, 2);
var scriptEnding = false;
var minigameEntered = false;
var pendingUnequipItemIds = [];
var junaInteractionTick = -1;
function onStart() {
  try {
    initializeTearsUtils(state);
    resetTearsState();
    state.uiCompleted = true;
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
    bot.widgets.handleDialogue([]);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', error.toString());
    bot.terminate();
  }
}
function updateMinigameState() {
  var flags = getTearsStateFlags();
  var minigameActive = isPlayerInArea(state, minigameBounds.minX, minigameBounds.maxX, minigameBounds.minY, minigameBounds.maxY, minigameBounds.plane);
  if (minigameActive !== flags.minigameActive) {
    setTearsStateFlags(_objectSpread2(_objectSpread2({}, flags), {}, {
      minigameActive
    }));
  }
  if (minigameActive) {
    minigameEntered = true;
  }
  return minigameActive;
}
function handleMinigameEnded(minigameActive) {
  if (minigameActive) {
    return false;
  }
  if (!minigameEntered) {
    return false;
  }
  if (!scriptEnding) {
    scriptEnding = true;
    logger(state, 'debug', 'timer', 'Player left minigame area. Stopping script.');
    bot.terminate();
  }
  return true;
}
function unequipWeaponOffhand() {
  if (pendingUnequipItemIds.length === 0) {
    var equipment = getWornEquipment(state);
    pendingUnequipItemIds = ['weapon', 'shield'].map(slot => equipment[slot]).filter(value => value !== undefined && value !== null);
  }
  var requiredSlots = pendingUnequipItemIds.length;
  if (requiredSlots === 0) {
    return true;
  }
  var emptySlots = bot.inventory.getEmptySlots();
  if (emptySlots < requiredSlots) {
    logger(state, 'all', 'equipment', "Need at least ".concat(requiredSlots, " empty inventory slot").concat(requiredSlots === 1 ? '' : 's', " to unequip weapon and offhand."));
    return false;
  }
  var _iterator = _createForOfIteratorHelper(pendingUnequipItemIds),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var itemId = _step.value;
      if (bot.equipment.containsId(itemId)) {
        bot.equipment.unequip(itemId);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var remainingIds = pendingUnequipItemIds.filter(id => bot.equipment.containsId(id));
  if (remainingIds.length === 0) {
    pendingUnequipItemIds = [];
    return true;
  }
  return false;
}
function getTickContext() {
  var player = client.getLocalPlayer();
  if (!player) {
    return null;
  }
  var currentTick = client.getTickCount();
  var minigameActive = updateMinigameState();
  if (handleMinigameEnded(minigameActive)) {
    return null;
  }
  return {
    currentTick,
    minigameActive
  };
}
function notifyScriptInitialized() {
  log.printGameMessage('Script initialized.');
}
function onEnd() {
  logger(state, 'all', 'script', "".concat(state.scriptName, " ended."));
  endScript(state);
}
function stateManager() {
  switch (state.mainState) {
    case 'start_state':
      {
        logger(state, 'debug', 'start_state', 'Processing start_state');
        var tickContext = getTickContext();
        if (!tickContext) {
          logger(state, 'debug', 'start_state', 'No tickContext available');
          return;
        }
        var isInStartBounds = isPlayerInArea(state, minigameStartBounds.minX, minigameStartBounds.maxX, minigameStartBounds.minY, minigameStartBounds.maxY, minigameStartBounds.plane);
        logger(state, 'debug', 'start_state', "Player in start bounds: ".concat(isInStartBounds));
        if (!isInStartBounds) {
          logger(state, 'debug', 'start_state', 'Not in bounds, transitioning to navigate_to_cave');
          state.mainState = 'navigate_to_cave';
          return;
        }
        logger(state, 'debug', 'start_state', 'In bounds, attempting to unequip weapon/offhand');
        var unequipped = unequipWeaponOffhand();
        logger(state, 'debug', 'start_state', "Unequip result: ".concat(unequipped));
        if (!unequipped) {
          logger(state, 'debug', 'start_state', 'Failed to unequip, waiting for next tick');
          return;
        }
        logger(state, 'debug', 'start_state', 'Unequipped successfully, transitioning to talk_to_juna');
        state.mainState = 'talk_to_juna';
        break;
      }
    case 'talk_to_juna':
      {
        logger(state, 'debug', 'talk_to_juna', 'Processing talk_to_juna state');
        var _tickContext = getTickContext();
        if (!_tickContext) {
          logger(state, 'debug', 'talk_to_juna', 'No tickContext available');
          return;
        }
        trackWallCycle();
        var flags = getTearsStateFlags();
        if (flags.junaDialogCompleted) {
          var ticksSinceTalk = _tickContext.currentTick - junaInteractionTick;
          if (ticksSinceTalk < 5) {
            logger(state, 'debug', 'talk_to_juna', "Waiting for dialog completion (".concat(ticksSinceTalk, "/5 ticks)"));
            return;
          }
          logger(state, 'debug', 'talk_to_juna', 'Dialog complete, transitioning to walk_in_cave');
          state.mainState = 'walk_in_cave';
          break;
        }
        logger(state, 'debug', 'talk_to_juna', 'Starting walk to Juna');
        state.mainState = 'navigate_to_juna';
        break;
      }
    case 'navigate_to_juna':
      {
        var _tickContext2 = getTickContext();
        if (!_tickContext2) {
          return;
        }
        trackWallCycle();
        var player = client.getLocalPlayer();
        if (!player) {
          return;
        }
        var playerLoc = player.getWorldLocation();
        var junaLoc = new net.runelite.api.coords.WorldPoint(3248, 9516, 2);
        var distance = Math.max(Math.abs(playerLoc.getX() - junaLoc.getX()), Math.abs(playerLoc.getY() - junaLoc.getY()));
        if (distance <= 2) {
          if (!isCycleVerified()) {
            var cycleStatus = getCycleStatus();
            if (cycleStatus.observedSpawns >= 12) {
              logger(state, 'all', 'cycle', 'Please log into the appropriate Tears of Guthix World.');
              bot.terminate();
              return;
            }
            return;
          }
          logger(state, 'debug', 'navigate_to_juna', 'Close to Juna and cycle verified, attempting to talk');
          talkToJuna();
          junaInteractionTick = _tickContext2.currentTick;
          state.mainState = 'talk_to_juna';
          break;
        }
        if (!bot.localPlayerMoving() && !bot.walking.isWebWalking()) {
          logger(state, 'debug', 'navigate_to_juna', "Walking to Juna (distance: ".concat(distance, "), target: (").concat(ToG.getX(), ", ").concat(ToG.getY(), ")"));
          bot.walking.walkToTrueWorldPoint(ToG.getX(), ToG.getY());
        }
        break;
      }
    case 'walk_in_cave':
      {
        var _tickContext3 = getTickContext();
        if (!_tickContext3) {
          return;
        }
        if (bot.localPlayerMoving() || !bot.localPlayerIdle()) {
          break;
        }
        var _flags = getTearsStateFlags();
        setTearsStateFlags(_objectSpread2(_objectSpread2({}, _flags), {}, {
          scriptInitialized: true
        }));
        logger(state, 'debug', 'init', 'Player idle in cave, starting wall interactions');
        state.mainState = 'click_blue_tears';
        break;
      }
    case 'click_blue_tears':
      {
        var _tickContext4 = getTickContext();
        if (!_tickContext4) {
          return;
        }
        trackWallCycle();
        var clickedTile = clickBlueWall();
        if (clickedTile) {
          logger(state, 'debug', 'click_blue_tears', "Clicked tile: (".concat(clickedTile.getX(), ", ").concat(clickedTile.getY(), ")"));
        }
        break;
      }
    case 'navigate_to_cave':
      {
        if (!state.subState) {
          state.subState = 'get_to_bank';
        }
        switch (state.subState) {
          case 'get_to_bank':
            {
              processBankOpen(state, () => {
                logger(state, 'debug', 'bank', 'Bank opened');
                state.subState = 'find_teleport';
              });
              break;
            }
          case 'find_teleport':
            {
              var necklaceCandidates = gamesNecklace.slice(0, 8);
              var hasNecklace = bot.inventory.containsAnyIds(necklaceCandidates);
              if (!hasNecklace && !bot.bank.isOpen()) {
                state.subState = 'get_to_bank';
                break;
              }
              if (!hasNecklace) {
                withdrawFirstExistingItem(state, necklaceCandidates, 1, 'navigate_to_cave');
                break;
              }
              if (bot.bank.isOpen()) {
                logger(state, 'debug', 'bank', 'Closing bank');
                bot.bank.close();
                break;
              }
              var selectedNecklace = necklaceCandidates.find(id => bot.inventory.containsId(id));
              if (!selectedNecklace) {
                state.subState = 'get_to_bank';
                break;
              }
              logger(state, 'debug', 'webwalk', "Webwalking to ToG with necklace ".concat(selectedNecklace));
              bot.walking.webWalkStart(ToG);
              state.subState = '';
              state.mainState = 'talk_to_juna';
              break;
            }
          default:
            {
              state.subState = 'get_to_bank';
              break;
            }
        }
        break;
      }
    default:
      {
        state.mainState = 'start_state';
        break;
      }
  }
}


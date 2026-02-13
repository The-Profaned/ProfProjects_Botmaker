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
  logger(state, 'debug', 'isPlayerInArea', "Player at (".concat(playerX, ", ").concat(playerY, ", ").concat(playerPlane, "). Area bounds: X[").concat(minX, "-").concat(maxX, "], Y[").concat(minY, "-").concat(maxY, "], Plane[").concat(plane , "]. In area: ").concat(result));
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
};
var unequipWornEquipment = (state, slots) => {
  var equipment = getWornEquipment(state);
  var targetSlots = slots !== null && slots !== void 0 ? slots : Object.keys(equipment);
  var attemptedIds = [];
  var _iterator = _createForOfIteratorHelper(targetSlots),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var slot = _step.value;
      var itemId = equipment[slot];
      if (!itemId) {
        continue;
      }
      attemptedIds.push(itemId);
      bot.equipment.unequip(itemId);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var remainingIds = attemptedIds.filter(id => bot.equipment.containsId(id));
  var success = attemptedIds.length > 0 && remainingIds.length === 0;
  logger(state, 'debug', 'unequipWornEquipment', "Attempted unequip: ".concat(JSON.stringify(attemptedIds), " | Remaining: ").concat(JSON.stringify(remainingIds)));
  return {
    attemptedIds,
    remainingIds,
    success
  };
};

var BLUE_TEAR_WALLS = [6661, 6665];
var GREEN_TEAR_WALLS = [6662, 6666];
var state$1 = null;
var activeBlueWalls = new Map();
var activeGreenWalls = new Map();
var wallSpawnHistory = [];
var currentInteractingWall = null;
var currentInteractingType = 'empty';
var lastClickedWallKey = null;
var waitingForPlayerAnimation = false;
var lastPlayerAnimation = -1;
var scriptInitialized = false;
var junaDialogCompleted = false;
var lastPlayerMovementState = false;
var playerStoppedMovingTicks = 0;
var blueCycleSeen = new Set();
var blueCycleComplete = false;
var blueRespawnOnCurrent = false;
var blueCycleOrder = [];
var pendingSwitchToFirst = false;
var lastBlueChangeTick = null;
var blueCycleCompleteTick = null;
var blueWallCount = 0;
var greenWallCount = 0;
var minigameActive = true;
function initializeTearsUtils(scriptState) {
  state$1 = scriptState;
}
function resetTearsState() {
  activeBlueWalls = new Map();
  activeGreenWalls = new Map();
  wallSpawnHistory = [];
  currentInteractingWall = null;
  currentInteractingType = 'empty';
  lastClickedWallKey = null;
  waitingForPlayerAnimation = false;
  lastPlayerAnimation = -1;
  scriptInitialized = false;
  junaDialogCompleted = false;
  lastPlayerMovementState = false;
  playerStoppedMovingTicks = 0;
  minigameActive = true;
  blueWallCount = 0;
  greenWallCount = 0;
  blueCycleSeen = new Set();
  blueCycleComplete = false;
  blueRespawnOnCurrent = false;
  blueCycleOrder = [];
  pendingSwitchToFirst = false;
  lastBlueChangeTick = null;
  blueCycleCompleteTick = null;
}
function findBlueTearWalls() {
  var _bot$objects$getTileO;
  return (_bot$objects$getTileO = bot.objects.getTileObjectsWithIds(BLUE_TEAR_WALLS)) !== null && _bot$objects$getTileO !== void 0 ? _bot$objects$getTileO : [];
}
function findGreenTearWalls() {
  var _bot$objects$getTileO2;
  return (_bot$objects$getTileO2 = bot.objects.getTileObjectsWithIds(GREEN_TEAR_WALLS)) !== null && _bot$objects$getTileO2 !== void 0 ? _bot$objects$getTileO2 : [];
}
function wallUniqueKey(wall) {
  var loc = wall.getWorldLocation();
  return wall.getId() + '_' + loc.getX() + '_' + loc.getY() + '_' + loc.getPlane();
}
var logMessage = (level, source, message, color) => {
  if (state$1) {
    logger(state$1, level, source, message, color);
    return;
  }
  if (color) {
    log.printRGB("[".concat(source, "] ").concat(message), color.r, color.g, color.b);
    return;
  }
  log.print("[".concat(source, "] ").concat(message));
};
function trackWallChanges() {
  var currentTick = client.getTickCount();
  var blueTears = findBlueTearWalls();
  var greenTears = findGreenTearWalls();
  if (blueTears.length === 0) {
    blueCycleSeen = new Set();
    blueCycleComplete = false;
    blueRespawnOnCurrent = false;
    blueCycleOrder = [];
    pendingSwitchToFirst = false;
    lastBlueChangeTick = null;
    blueCycleCompleteTick = null;
  }
  var currentBlueIds = new Set();
  if (blueTears.length > 0) {
    blueWallCount = blueTears.length;
    var _iterator = _createForOfIteratorHelper(blueTears),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var wall = _step.value;
        var wallId = wall.getId();
        var location = wall.getWorldLocation();
        var x = location.getX();
        var y = location.getY();
        var plane = location.getPlane();
        var uniqueId = wallId + '_' + x + '_' + y + '_' + plane;
        var simpleKey = wallUniqueKey(wall);
        currentBlueIds.add(uniqueId);
        blueCycleSeen.add(simpleKey);
        if (!blueCycleOrder.includes(simpleKey)) {
          blueCycleOrder.push(simpleKey);
        }
        if (!blueCycleComplete && blueCycleSeen.size >= 3) {
          blueCycleComplete = true;
          blueCycleCompleteTick = currentTick;
          logMessage('debug', 'cycle', 'All 3 blue walls observed', LOG_COLOR.BLUE);
        }
        var currentWallKey = currentInteractingWall ? wallUniqueKey(currentInteractingWall) : null;
        if (currentInteractingType === 'blue' && currentWallKey !== null && currentWallKey === simpleKey) {
          if (!blueRespawnOnCurrent) {
            blueRespawnOnCurrent = true;
            logMessage('debug', 'respawn', 'Blue wall reappeared on current wall; hold position', LOG_COLOR.BLUE);
          }
        } else {
          blueRespawnOnCurrent = false;
        }
        if (!activeBlueWalls.has(uniqueId)) {
          var spawn = {
            wallId,
            location,
            spawnTick: currentTick,
            despawnTick: null,
            duration: null,
            type: 'blue',
            simpleKey
          };
          activeBlueWalls.set(uniqueId, spawn);
          lastBlueChangeTick = currentTick;
          logMessage('debug', 'spawn', "Blue wall #".concat(wallId, " at (").concat(x, ", ").concat(y, ", ").concat(plane, ") tick ").concat(currentTick), LOG_COLOR.TEAL);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    blueWallCount = 0;
  }
  var currentGreenIds = new Set();
  if (greenTears.length > 0) {
    greenWallCount = greenTears.length;
    var _iterator2 = _createForOfIteratorHelper(greenTears),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _wall = _step2.value;
        var _wallId = _wall.getId();
        var _location = _wall.getWorldLocation();
        var _x = _location.getX();
        var _y = _location.getY();
        var _plane = _location.getPlane();
        var _uniqueId = _wallId + '_' + _x + '_' + _y + '_' + _plane;
        currentGreenIds.add(_uniqueId);
        if (!activeGreenWalls.has(_uniqueId)) {
          var _spawn = {
            wallId: _wallId,
            location: _location,
            spawnTick: currentTick,
            despawnTick: null,
            duration: null,
            type: 'green',
            simpleKey: _uniqueId
          };
          activeGreenWalls.set(_uniqueId, _spawn);
          logMessage('debug', 'spawn', "Green wall #".concat(_wallId, " at (").concat(_x, ", ").concat(_y, ", ").concat(_plane, ") tick ").concat(currentTick), LOG_COLOR.EMERALD);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } else {
    greenWallCount = 0;
  }
  activeBlueWalls.forEach((spawn, id) => {
    if (!currentBlueIds.has(id)) {
      spawn.despawnTick = currentTick;
      spawn.duration = spawn.despawnTick - spawn.spawnTick;
      var thirdKey = blueCycleOrder.length >= 3 ? blueCycleOrder[2] : null;
      if (thirdKey && spawn.simpleKey === thirdKey && currentInteractingType === 'blue' && currentInteractingWall && wallUniqueKey(currentInteractingWall) === spawn.simpleKey && blueRespawnOnCurrent) {
        pendingSwitchToFirst = true;
        logMessage('debug', 'cycle', '3rd blue despawned under player; queue switch to first blue', LOG_COLOR.BLUE);
      }
      wallSpawnHistory.push(spawn);
      activeBlueWalls.delete(id);
      lastBlueChangeTick = currentTick;
      logMessage('debug', 'despawn', "Blue wall #".concat(spawn.wallId, " lasted ").concat(spawn.duration, " ticks"), LOG_COLOR.TEAL);
    }
  });
  activeGreenWalls.forEach((spawn, id) => {
    if (!currentGreenIds.has(id)) {
      spawn.despawnTick = currentTick;
      spawn.duration = spawn.despawnTick - spawn.spawnTick;
      wallSpawnHistory.push(spawn);
      activeGreenWalls.delete(id);
      logMessage('debug', 'despawn', "Green wall #".concat(spawn.wallId, " lasted ").concat(spawn.duration, " ticks"), LOG_COLOR.EMERALD);
    }
  });
}
function getAverageWallDuration(type) {
  var relevantSpawns = wallSpawnHistory.filter(spawn => {
    return spawn.duration !== null;
  });
  if (relevantSpawns.length === 0) return 0;
  var totalDuration = relevantSpawns.reduce((sum, spawn) => {
    var _spawn$duration;
    return sum + ((_spawn$duration = spawn.duration) !== null && _spawn$duration !== void 0 ? _spawn$duration : 0);
  }, 0);
  return totalDuration / relevantSpawns.length;
}
function getAdjacentWall() {
  var player = client.getLocalPlayer();
  if (!player) {
    return {
      type: 'empty',
      wall: null
    };
  }
  var playerLocation = player.getWorldLocation();
  var playerX = playerLocation.getX();
  var playerY = playerLocation.getY();
  var playerPlane = playerLocation.getPlane();
  var blueTears = findBlueTearWalls();
  var greenTears = findGreenTearWalls();
  var adjacentOffsets = [{
    dx: 0,
    dy: 1
  }, {
    dx: 0,
    dy: -1
  }, {
    dx: 1,
    dy: 0
  }, {
    dx: -1,
    dy: 0
  }];
  for (var _i = 0, _adjacentOffsets = adjacentOffsets; _i < _adjacentOffsets.length; _i++) {
    var offset = _adjacentOffsets[_i];
    var checkX = playerX + offset.dx;
    var checkY = playerY + offset.dy;
    var _iterator3 = _createForOfIteratorHelper(blueTears),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var wall = _step3.value;
        var wallId = wall.getId();
        var wallLoc = wall.getWorldLocation();
        if (BLUE_TEAR_WALLS.includes(wallId) && wallLoc.getX() === checkX && wallLoc.getY() === checkY && wallLoc.getPlane() === playerPlane) {
          return {
            type: 'blue',
            wall
          };
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var _iterator4 = _createForOfIteratorHelper(greenTears),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _wall2 = _step4.value;
        var _wallId2 = _wall2.getId();
        var _wallLoc = _wall2.getWorldLocation();
        if (GREEN_TEAR_WALLS.includes(_wallId2) && _wallLoc.getX() === checkX && _wallLoc.getY() === checkY && _wallLoc.getPlane() === playerPlane) {
          return {
            type: 'green',
            wall: _wall2
          };
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
  return {
    type: 'empty',
    wall: null
  };
}
function getDistanceToWall(wall) {
  var player = client.getLocalPlayer();
  if (!player) return 999;
  var playerLoc = player.getWorldLocation();
  var wallLoc = wall.getWorldLocation();
  var dx = Math.abs(playerLoc.getX() - wallLoc.getX());
  var dy = Math.abs(playerLoc.getY() - wallLoc.getY());
  return dx + dy;
}
function selectPreferredBlueTarget() {
  var blues = findBlueTearWalls();
  var player = client.getLocalPlayer();
  if (!player) return null;
  var preferredKeys = [];
  if (blueCycleOrder.length > 0) preferredKeys.push(blueCycleOrder[0]);
  if (blueCycleOrder.length > 1) preferredKeys.push(blueCycleOrder[1]);
  var candidates = [];
  var _loop = function _loop() {
    var key = _preferredKeys[_i2];
    var found = blues.find(w => wallUniqueKey(w) === key);
    if (found) candidates.push(found);
  };
  for (var _i2 = 0, _preferredKeys = preferredKeys; _i2 < _preferredKeys.length; _i2++) {
    _loop();
  }
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];
  var distributionToFirst = getDistanceToWall(candidates[0]);
  var distributionToSecond = getDistanceToWall(candidates[1]);
  if (distributionToFirst > 3 && distributionToSecond <= distributionToFirst) {
    logMessage('debug', 'distance', "Wall 1 too far (".concat(distributionToFirst, " tiles); choosing closer wall 2 (").concat(distributionToSecond, " tiles)"), LOG_COLOR.CORAL);
    return candidates[1];
  }
  return candidates[0];
}
function talkToJuna() {
  var junaList = bot.objects.getTileObjectsWithNames(['Juna']);
  if (!junaList || junaList.length === 0) {
    logMessage('debug', 'juna', 'Could not find Juna game object', LOG_COLOR.PINK);
    return;
  }
  var juna = junaList[0];
  logMessage('debug', 'juna', 'Found Juna, interacting with story', LOG_COLOR.PINK);
  bot.objects.interactSuppliedObject(juna, 'Story');
  junaDialogCompleted = true;
  logMessage('debug', 'juna', 'Story dialog initiated', LOG_COLOR.PINK);
}
function updateInteractionState() {
  var adjacent = getAdjacentWall();
  if ((pendingSwitchToFirst || currentInteractingType !== 'blue') && blueCycleOrder.length > 0) {
    var target = selectPreferredBlueTarget();
    if (target) {
      currentInteractingWall = target;
      currentInteractingType = 'blue';
      pendingSwitchToFirst = false;
      var loc = target.getWorldLocation();
      logMessage('debug', 'target', "Selecting preferred blue at (".concat(loc.getX(), ", ").concat(loc.getY(), ", ").concat(loc.getPlane(), ")"), LOG_COLOR.TEAL);
      return;
    }
  }
  if (adjacent.type !== currentInteractingType || adjacent.wall !== currentInteractingWall) {
    currentInteractingType = adjacent.type;
    currentInteractingWall = adjacent.wall;
    if (currentInteractingType === 'empty') {
      logMessage('debug', 'interact', 'No adjacent tear wall', LOG_COLOR.GOLD);
    } else {
      var _currentInteractingWa;
      var _loc = (_currentInteractingWa = currentInteractingWall) === null || _currentInteractingWa === void 0 ? void 0 : _currentInteractingWa.getWorldLocation();
      if (_loc) {
        logMessage('debug', 'interact', "".concat(currentInteractingType.toUpperCase(), " wall at (").concat(_loc.getX(), ", ").concat(_loc.getY(), ", ").concat(_loc.getPlane(), ")"), LOG_COLOR.GOLD);
      }
    }
  }
}
function interactWithBlueWall() {
  var targetWall = selectPreferredBlueTarget();
  if (!targetWall) {
    return;
  }
  var player = client.getLocalPlayer();
  if (!player) {
    return;
  }
  var wallKey = wallUniqueKey(targetWall);
  if (lastClickedWallKey === wallKey && waitingForPlayerAnimation) {
    var currentAnimation = player.getAnimation();
    if (currentAnimation === -1) {
      if (lastPlayerAnimation !== -1) {
        logMessage('debug', 'wait', 'Player animation stopped, ready for next wall');
        lastClickedWallKey = null;
        waitingForPlayerAnimation = false;
        lastPlayerAnimation = -1;
      }
    } else if (currentAnimation !== lastPlayerAnimation) {
      lastPlayerAnimation = currentAnimation;
    }
    return;
  }
  if (lastClickedWallKey !== wallKey) {
    var distance = getDistanceToWall(targetWall);
    if (distance > 1) {
      return;
    }
    var wallLoc = targetWall.getWorldLocation();
    var localLoc = net.runelite.api.coords.LocalPoint.fromWorld(client, new net.runelite.api.coords.WorldPoint(wallLoc.getX(), wallLoc.getY(), wallLoc.getPlane()));
    if (!localLoc) {
      return;
    }
    var sceneX = localLoc.getSceneX();
    var sceneY = localLoc.getSceneY();
    bot.menuAction(sceneX, sceneY, net.runelite.api.MenuAction.GAME_OBJECT_FIRST_OPTION, targetWall.getId(), 0, 'Interact', '<col=4080ff>Tear</col>');
    logMessage('debug', 'click', "Clicking blue wall at (".concat(wallLoc.getX(), ", ").concat(wallLoc.getY(), ")"), LOG_COLOR.GOLD);
    lastClickedWallKey = wallKey;
    waitingForPlayerAnimation = true;
    lastPlayerAnimation = player.getAnimation();
  }
}
function getTearsStateFlags() {
  return {
    scriptInitialized,
    junaDialogCompleted,
    lastPlayerMovementState,
    playerStoppedMovingTicks,
    minigameActive
  };
}
function setTearsStateFlags(paramaters) {
  scriptInitialized = paramaters.scriptInitialized;
  junaDialogCompleted = paramaters.junaDialogCompleted;
  lastPlayerMovementState = paramaters.lastPlayerMovementState;
  playerStoppedMovingTicks = paramaters.playerStoppedMovingTicks;
  minigameActive = paramaters.minigameActive;
}
function getTearsWallStats() {
  return {
    blueWallCount,
    greenWallCount,
    historyCount: wallSpawnHistory.length
  };
}
function getTearsInteractionStatus() {
  return {
    lastClickedWallKey,
    blueCycleComplete,
    blueCycleOrderLength: blueCycleOrder.length,
    blueRespawnOnCurrent,
    pendingSwitchToFirst,
    currentInteractingType
  };
}
function getBlueCycleTiming() {
  var currentTick = client.getTickCount();
  var ticksSinceLastBlueChange = lastBlueChangeTick === null ? null : currentTick - lastBlueChangeTick;
  return {
    lastBlueChangeTick,
    blueCycleCompleteTick,
    ticksSinceLastBlueChange
  };
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
  uiCompleted: false,
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
  minY: 9503,
  maxY: 9528,
  plane: 2
};
var ToG = new net.runelite.api.coords.WorldPoint(3249, 9515, 2);
var scriptEnding = false;
var minigameEntered = false;
function onStart() {
  try {
    initializeTearsUtils(state);
    resetTearsState();
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
    logger(state, 'all', 'timer', 'Player left minigame area. Stopping script.');
    bot.terminate();
  }
  return true;
}
function unequipWeaponOffhand() {
  var emptySlots = bot.inventory.getEmptySlots();
  if (emptySlots < 2) {
    logger(state, 'all', 'equipment', 'Need at least 2 empty inventory slots to unequip weapon and offhand.', LOG_COLOR.GOLD);
    return false;
  }
  var result = unequipWornEquipment(state, ['weapon', 'shield']);
  return result.success;
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
  trackWallChanges();
  updateInteractionState();
  return {
    currentTick,
    minigameActive
  };
}
function logWallStatus(currentTick) {
  var flags = getTearsStateFlags();
  if (currentTick % 10 !== 0 || !flags.minigameActive) {
    return;
  }
  var avgDuration = getAverageWallDuration();
  var stats = getTearsWallStats();
  logger(state, 'debug', 'status', "Blue: ".concat(stats.blueWallCount, " | Green: ").concat(stats.greenWallCount, " | Avg duration: ").concat(avgDuration.toFixed(1), " ticks | History: ").concat(stats.historyCount), LOG_COLOR.GOLD);
}
function notifyScriptInitialized() {
  log.printGameMessage('Script initialized.');
}
function onEnd() {
  logger(state, 'all', 'script', "".concat(state.scriptName, " ended."));
  endScript(state);
}
function stateManager() {
  logger(state, 'debug', 'stateManager', "".concat(state.mainState), LOG_COLOR.GOLD);
  switch (state.mainState) {
    case 'start_state':
      {
        var tickContext = getTickContext();
        if (!tickContext) {
          return;
        }
        var isInStartBounds = isPlayerInArea(state, minigameStartBounds.minX, minigameStartBounds.maxX, minigameStartBounds.minY, minigameStartBounds.maxY, minigameStartBounds.plane);
        if (!isInStartBounds) {
          state.mainState = 'navigate_to_cave';
          return;
        }
        var unequipped = unequipWeaponOffhand();
        if (!unequipped) {
          return;
        }
        state.mainState = 'talk_to_juna';
        break;
      }
    case 'talk_to_juna':
      {
        var _tickContext = getTickContext();
        if (!_tickContext) {
          return;
        }
        var flags = getTearsStateFlags();
        if (!flags.junaDialogCompleted) {
          talkToJuna();
          return;
        }
        state.mainState = 'walk_in_cave';
        break;
      }
    case 'walk_in_cave':
      {
        var _tickContext2 = getTickContext();
        if (!_tickContext2) {
          return;
        }
        var _flags = getTearsStateFlags();
        var isPlayerMoving = bot.localPlayerMoving();
        if (isPlayerMoving) {
          setTearsStateFlags(_objectSpread2(_objectSpread2({}, _flags), {}, {
            lastPlayerMovementState: true,
            playerStoppedMovingTicks: 0
          }));
          return;
        }
        if (_flags.lastPlayerMovementState) {
          var stoppedTicks = _flags.playerStoppedMovingTicks + 1;
          if (stoppedTicks >= 1) {
            setTearsStateFlags(_objectSpread2(_objectSpread2({}, _flags), {}, {
              scriptInitialized: true,
              playerStoppedMovingTicks: stoppedTicks
            }));
            logger(state, 'debug', 'init', 'Player stopped moving, starting wall interactions');
            state.mainState = 'click_blue_tears';
            return;
          }
          setTearsStateFlags(_objectSpread2(_objectSpread2({}, _flags), {}, {
            playerStoppedMovingTicks: stoppedTicks
          }));
        }
        break;
      }
    case 'click_blue_tears':
      {
        var _tickContext3 = getTickContext();
        if (!_tickContext3) {
          return;
        }
        logWallStatus(_tickContext3.currentTick);
        var interactionStatus = getTearsInteractionStatus();
        if (!interactionStatus.lastClickedWallKey) {
          interactWithBlueWall();
          return;
        }
        if (!interactionStatus.blueCycleComplete) {
          return;
        }
        var timing = getBlueCycleTiming();
        if (timing.ticksSinceLastBlueChange !== null && timing.ticksSinceLastBlueChange < 1) {
          return;
        }
        interactWithBlueWall();
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
                state.subState = 'find_teleport';
              });
              break;
            }
          case 'find_teleport':
            {
              if (!bot.bank.isOpen()) {
                state.subState = 'get_to_bank';
                break;
              }
              var necklaceCandidates = gamesNecklace.slice(1, 7);
              var hasNecklace = bot.inventory.containsAnyIds(necklaceCandidates);
              if (!hasNecklace) {
                var withdrew = withdrawFirstExistingItem(state, necklaceCandidates, 1, 'navigate_to_cave');
                if (!withdrew) {
                  break;
                }
              }
              bot.bank.close();
              if (bot.bank.isOpen()) {
                break;
              }
              var selectedNecklace = necklaceCandidates.find(id => bot.inventory.containsId(id));
              if (!selectedNecklace) {
                break;
              }
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


var LOG_COLOR = {
  SCRIPT: {
    r: 17,
    g: 138,
    b: 178
  },
  STATE: {
    r: 255,
    g: 209,
    b: 102
  },
  BANK: {
    r: 6,
    g: 214,
    b: 160
  },
  TRAVEL: {
    r: 247,
    g: 140,
    b: 107
  }
};
var lastLoggedMessage = '';
var logMessage = (source, message, color) => {
  var fullMessage = "[".concat(source, "] ").concat(message);
  if (fullMessage === lastLoggedMessage) return;
  lastLoggedMessage = fullMessage;
  log.printRGB(fullMessage, color.r, color.g, color.b);
};
var logGlass = message => {
  logMessage('glass', message, LOG_COLOR.SCRIPT);
};
var logState = message => {
  logMessage('state', message, LOG_COLOR.STATE);
};
var logBank = message => {
  logMessage('bank', message, LOG_COLOR.BANK);
};
var logTravel = message => {
  logMessage('travel', message, LOG_COLOR.TRAVEL);
};

var GlassMakeMode;
(function (GlassMakeMode) {
  GlassMakeMode["CRAFT_ONLY"] = "craft-only";
  GlassMakeMode["CRAFT_PLUS_SPORES"] = "craft-plus-spores";
  GlassMakeMode["SPORES_ONLY"] = "spores-only";
})(GlassMakeMode || (GlassMakeMode = {}));
var BANK_OBJECT_ID = 30796;
var ROWBOAT_OBJECT_ID = 30919;
var ANCHOR_ROPE_OBJECT_ID = 30948;
var GLASSBLOWING_PIPE_ITEM_ID = 1785;
var MOLTEN_GLASS_ITEM_ID = 1775;
var SEAWEED_SPORE_ITEM_ID = 21490;
var BANK_DEPOSIT_WIDGET_ID = 786473;
var BANK_DEPOSIT_WIDGET_IDENTIFIER = 1;
var BANK_DEPOSIT_WIDGET_OPCODE = 57;
var BANK_DEPOSIT_WIDGET_PARAM0 = -1;
var ROWBOAT_CONTINUE_WIDGET_ID = 14352385;
var ROWBOAT_CONTINUE_WIDGET_IDENTIFIER = 0;
var ROWBOAT_CONTINUE_WIDGET_OPCODE = 30;
var ROWBOAT_CONTINUE_WIDGET_PARAM0 = 1;
var TARGET_MOLTEN_GLASS_SEAWEED_MODE = 26;
var TARGET_MOLTEN_GLASS_NORMAL_MODE = 27;
var ISLAND_ARRIVAL_TILE = {
  x: 3732,
  y: 10281,
  plane: 1
};
var BANK_RETURN_TILE = {
  x: 3764,
  y: 3899,
  plane: 0
};
var SELECTED_MODE = GlassMakeMode.CRAFT_ONLY;

var MainStates;
(function (MainStates) {
  MainStates["BANKING"] = "BANKING";
  MainStates["TRAVEL_TO_ROWBOAT"] = "TRAVEL_TO_ROWBOAT";
  MainStates["GLASSBLOWING"] = "GLASSBLOWING";
  MainStates["LOOTING_SEAWEED_SPORE"] = "LOOTING_SEAWEED_SPORE";
  MainStates["SPORES_ONLY"] = "SPORES_ONLY";
  MainStates["RETURN_TO_BANK"] = "RETURN_TO_BANK";
})(MainStates || (MainStates = {}));
var state = {
  gameTick: 0,
  mainState: MainStates.BANKING,
  selectedMode: SELECTED_MODE,
  startStateResolved: false,
  depositedThisBankOpen: false,
  bankCloseRequested: false,
  ticksUntilNextAction: 0,
  hasClickedRowboat: false,
  hasTriggeredGlassblow: false,
  waitingForGlassDialog: false,
  glassDialogWaitTicks: 0,
  lastLoggedMainState: null
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
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
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var isAtCoordinate = coordinate => {
  var player = client.getLocalPlayer();
  if (!player) return false;
  var location = player.getWorldLocation();
  return location.getX() === coordinate.x && location.getY() === coordinate.y && location.getPlane() === coordinate.plane;
};
var isAtIslandArrival = () => isAtCoordinate(ISLAND_ARRIVAL_TILE);
var isAtBankReturnTile = () => isAtCoordinate(BANK_RETURN_TILE);
var hasRequiredLockedItems = mode => {
  if (mode === GlassMakeMode.SPORES_ONLY) return true;
  var hasPipe = bot.inventory.containsId(GLASSBLOWING_PIPE_ITEM_ID);
  if (!hasPipe) return false;
  if (mode !== GlassMakeMode.CRAFT_PLUS_SPORES) return true;
  return bot.inventory.containsId(SEAWEED_SPORE_ITEM_ID);
};
var getMoltenGlassCount = () => bot.inventory.getQuantityOfId(MOLTEN_GLASS_ITEM_ID);
var hasMoltenGlass = () => getMoltenGlassCount() > 0;
var findClosestObjectById = objectId => {
  var player = client.getLocalPlayer();
  if (!player) return null;
  var objects = bot.objects.getTileObjectsWithIds([objectId]);
  if (!objects || objects.length === 0) return null;
  var playerLocation = player.getWorldLocation();
  var closest = null;
  var closestDistance = Number.POSITIVE_INFINITY;
  var _iterator = _createForOfIteratorHelper(objects),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var object = _step.value;
      if (!object) continue;
      var location = object.getWorldLocation();
      if (!location) continue;
      var distance = playerLocation.distanceTo(location);
      if (distance >= closestDistance) continue;
      closestDistance = distance;
      closest = object;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return closest;
};
var findClosestBankObject = () => findClosestObjectById(BANK_OBJECT_ID);
var findClosestRowboat = () => findClosestObjectById(ROWBOAT_OBJECT_ID);
var findClosestAnchorRope = () => findClosestObjectById(ANCHOR_ROPE_OBJECT_ID);
var triggerGlassblowAction = () => {
  logGlass("[TRIGGER GLASSBLOW] Starting glassblowing action");
  if (!bot.inventory.containsId(GLASSBLOWING_PIPE_ITEM_ID)) {
    logGlass("[TRIGGER GLASSBLOW] \u2717 Inventory does not contain pipe ID ".concat(GLASSBLOWING_PIPE_ITEM_ID));
    return false;
  }
  if (!bot.inventory.containsId(MOLTEN_GLASS_ITEM_ID)) {
    logGlass("[TRIGGER GLASSBLOW] \u2717 Inventory does not contain molten glass ID ".concat(MOLTEN_GLASS_ITEM_ID));
    return false;
  }
  logGlass("[TRIGGER GLASSBLOW] Using itemOnItemWithIds: pipe (".concat(GLASSBLOWING_PIPE_ITEM_ID, ") -> molten glass (").concat(MOLTEN_GLASS_ITEM_ID, ")"));
  bot.inventory.itemOnItemWithIds(GLASSBLOWING_PIPE_ITEM_ID, MOLTEN_GLASS_ITEM_ID);
  logGlass("[TRIGGER GLASSBLOW] \u2713 Glassblowing action triggered");
  return true;
};

var openBankIfNeeded = () => {
  if (bot.bank.isOpen()) return true;
  if (state.bankCloseRequested) return false;
  state.depositedThisBankOpen = false;
  var bankObject = findClosestBankObject();
  if (!bankObject) {
    logBank('Bank object not found.');
    return false;
  }
  if (bot.localPlayerMoving()) return false;
  bot.objects.interactSuppliedObject(bankObject, 'Use');
  state.ticksUntilNextAction = 2;
  return false;
};
var depositInventoryViaWidget = () => {
  bot.widgets.interactSpecifiedWidget(BANK_DEPOSIT_WIDGET_ID, BANK_DEPOSIT_WIDGET_IDENTIFIER, BANK_DEPOSIT_WIDGET_OPCODE, BANK_DEPOSIT_WIDGET_PARAM0);
};
var getMoltenCapacity = () => {
  var inventory = client.getItemContainer(net.runelite.api.InventoryID.INVENTORY);
  if (!inventory) return 0;
  var items = inventory.getItems();
  var nonMoltenOccupiedSlots = 0;
  var _iterator = _createForOfIteratorHelper(items),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (!item) continue;
      var itemId = item.getId();
      if (itemId <= 0) continue;
      if (itemId === MOLTEN_GLASS_ITEM_ID) continue;
      nonMoltenOccupiedSlots += 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return Math.max(28 - nonMoltenOccupiedSlots, 0);
};
var ensureRequiredSupportItemsInInventory = () => {
  var hasPipe = bot.inventory.containsId(GLASSBLOWING_PIPE_ITEM_ID);
  if (!hasPipe) {
    var pipeInBank = bot.bank.getQuantityOfId(GLASSBLOWING_PIPE_ITEM_ID);
    if (pipeInBank <= 0) {
      var warningMessage = 'Missing Glassblowing pipe in inventory and bank. Stopping script.';
      logBank(warningMessage);
      log.printGameMessage("[profGlassBlowing] ".concat(warningMessage));
      bot.terminate();
      return false;
    }
    bot.bank.withdrawQuantityWithId(GLASSBLOWING_PIPE_ITEM_ID, 1);
    return false;
  }
  if (state.selectedMode !== GlassMakeMode.CRAFT_PLUS_SPORES) return true;
  var hasSeaweedSpore = bot.inventory.containsId(SEAWEED_SPORE_ITEM_ID);
  if (hasSeaweedSpore) return true;
  var seaweedSporeInBank = bot.bank.getQuantityOfId(SEAWEED_SPORE_ITEM_ID);
  if (seaweedSporeInBank <= 0) {
    var _warningMessage = 'Missing Seaweed spore in inventory and bank. Stopping script.';
    logBank(_warningMessage);
    log.printGameMessage("[profGlassBlowing] ".concat(_warningMessage));
    bot.terminate();
    return false;
  }
  bot.bank.withdrawQuantityWithId(SEAWEED_SPORE_ITEM_ID, 1);
  return false;
};
var Banking = () => {
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  if (state.selectedMode === GlassMakeMode.SPORES_ONLY) {
    state.mainState = MainStates.TRAVEL_TO_ROWBOAT;
    return;
  }
  if (state.bankCloseRequested) {
    if (bot.bank.isOpen()) {
      bot.bank.close();
      return;
    }
    state.bankCloseRequested = false;
    state.depositedThisBankOpen = false;
    state.hasClickedRowboat = false;
    state.hasTriggeredGlassblow = false;
    state.mainState = state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES ? MainStates.TRAVEL_TO_ROWBOAT : MainStates.GLASSBLOWING;
    return;
  }
  if (!openBankIfNeeded()) return;
  if (!state.depositedThisBankOpen) {
    depositInventoryViaWidget();
    state.depositedThisBankOpen = true;
    return;
  }
  if (!ensureRequiredSupportItemsInInventory()) return;
  var targetMoltenGlass = state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES ? TARGET_MOLTEN_GLASS_SEAWEED_MODE : TARGET_MOLTEN_GLASS_NORMAL_MODE;
  var capacityTarget = Math.min(targetMoltenGlass, getMoltenCapacity());
  var moltenGlassCount = getMoltenGlassCount();
  if (moltenGlassCount > capacityTarget) {
    depositInventoryViaWidget();
    return;
  }
  if (moltenGlassCount < capacityTarget) {
    var needed = capacityTarget - moltenGlassCount;
    var available = bot.bank.getQuantityOfId(MOLTEN_GLASS_ITEM_ID);
    if (available < needed) {
      logBank('Bank is out of molten glass. Stopping script.');
      bot.terminate();
      return;
    }
    bot.bank.withdrawQuantityWithId(MOLTEN_GLASS_ITEM_ID, needed);
    return;
  }
  state.bankCloseRequested = true;
  bot.bank.close();
};

var TravelToRowboat = () => {
  if (isAtIslandArrival()) {
    state.hasClickedRowboat = false;
    state.mainState = state.selectedMode === GlassMakeMode.SPORES_ONLY ? MainStates.SPORES_ONLY : MainStates.GLASSBLOWING;
    return;
  }
  if (state.hasClickedRowboat) {
    var handledDialogue = bot.widgets.handleDialogue([]);
    if (handledDialogue) {
      logTravel('Handled rowboat Continue dialogue.');
      state.ticksUntilNextAction = 3;
      return;
    }
    if (bot.localPlayerMoving()) return;
    bot.widgets.interactSpecifiedWidget(ROWBOAT_CONTINUE_WIDGET_ID, ROWBOAT_CONTINUE_WIDGET_IDENTIFIER, ROWBOAT_CONTINUE_WIDGET_OPCODE, ROWBOAT_CONTINUE_WIDGET_PARAM0);
    logTravel('Attempted rowboat Continue via widget fallback.');
    state.ticksUntilNextAction = 3;
    return;
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  if (isAtIslandArrival()) {
    state.mainState = state.selectedMode === GlassMakeMode.SPORES_ONLY ? MainStates.SPORES_ONLY : MainStates.GLASSBLOWING;
    return;
  }
  var rowboat = findClosestRowboat();
  if (!rowboat) {
    logTravel("Rowboat object ".concat(ROWBOAT_OBJECT_ID, " not found nearby."));
    return;
  }
  if (bot.localPlayerMoving()) return;
  bot.objects.interactSuppliedObject(rowboat, 'Dive');
  state.hasClickedRowboat = true;
  state.ticksUntilNextAction = 3;
  if (state.selectedMode !== GlassMakeMode.CRAFT_ONLY) {
    logTravel('Using rowboat Dive to start seaweed-spore run.');
  }
};

var getTileItemId = tileItem => {
  var tileItemEntity = tileItem.item;
  if (tileItemEntity && typeof tileItemEntity.getId === 'function') return tileItemEntity.getId();
  var fallbackTileItem = tileItem;
  if (typeof fallbackTileItem.getId === 'function') return fallbackTileItem.getId();
  if (typeof fallbackTileItem.getItemId === 'function') return fallbackTileItem.getItemId();
  return null;
};
var getClosestSeaweedSpore = () => {
  var player = client.getLocalPlayer();
  if (!player) return null;
  var playerLocation = player.getWorldLocation();
  var items = bot.tileItems.getItemsWithIds([SEAWEED_SPORE_ITEM_ID]);
  if (!items || items.length === 0) return null;
  var closest = null;
  var closestDistance = Number.POSITIVE_INFINITY;
  var _iterator = _createForOfIteratorHelper(items),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tileItem = _step.value;
      var itemId = getTileItemId(tileItem);
      if (itemId !== SEAWEED_SPORE_ITEM_ID) continue;
      var tile = tileItem.tile;
      if (!tile) continue;
      var location = tile.getWorldLocation();
      if (!location) continue;
      if (location.getPlane() !== playerLocation.getPlane()) continue;
      var distance = playerLocation.distanceTo(location);
      if (distance >= closestDistance) continue;
      closestDistance = distance;
      closest = tileItem;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return closest;
};

var GLASS_DIALOG_WAIT_TICKS = 6;
var GLASS_IDLE_MIN_TICKS = 14;
var GLASS_IDLE_MAX_TICKS = 20;
var glassIdleTicks = 0;
var lastCraftingExperience = -1;
var glassIdleRestartThresholdTicks = Math.floor(Math.random() * (GLASS_IDLE_MAX_TICKS - GLASS_IDLE_MIN_TICKS + 1)) + GLASS_IDLE_MIN_TICKS;
var resetGlassIdleWatchdog = () => {
  glassIdleTicks = 0;
  glassIdleRestartThresholdTicks = Math.floor(Math.random() * (GLASS_IDLE_MAX_TICKS - GLASS_IDLE_MIN_TICKS + 1)) + GLASS_IDLE_MIN_TICKS;
};
var resetGlassIdleAndExperienceWatchdog = () => {
  resetGlassIdleWatchdog();
  lastCraftingExperience = -1;
};
var getPlayerCraftingExperience = () => client.getSkillExperience(net.runelite.api.Skill.CRAFTING);
var isPlayerIdleForGlassblowing = () => {
  if (bot.localPlayerMoving()) return false;
  var player = client.getLocalPlayer();
  if (!player) return false;
  var animationId = player.getAnimation();
  return animationId === -1;
};
var Glassblowing = () => {
  if (!hasMoltenGlass()) {
    if (state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES) {
      state.mainState = MainStates.RETURN_TO_BANK;
    } else if (state.selectedMode === GlassMakeMode.SPORES_ONLY) {
      state.mainState = MainStates.SPORES_ONLY;
    } else {
      state.mainState = MainStates.BANKING;
    }
    state.hasTriggeredGlassblow = false;
    state.waitingForGlassDialog = false;
    state.glassDialogWaitTicks = 0;
    resetGlassIdleAndExperienceWatchdog();
    return;
  }
  if (state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES) {
    var spore = getClosestSeaweedSpore();
    if (spore) {
      logTravel('Seaweed spore detected underwater. Switching to LOOTING_SEAWEED_SPORE.');
      state.hasTriggeredGlassblow = false;
      state.waitingForGlassDialog = false;
      state.glassDialogWaitTicks = 0;
      resetGlassIdleAndExperienceWatchdog();
      state.mainState = MainStates.LOOTING_SEAWEED_SPORE;
      return;
    }
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  if (!isPlayerIdleForGlassblowing()) {
    resetGlassIdleWatchdog();
    return;
  }
  if (state.waitingForGlassDialog) {
    resetGlassIdleWatchdog();
    state.glassDialogWaitTicks += 1;
    if (state.glassDialogWaitTicks < GLASS_DIALOG_WAIT_TICKS) return;
    state.waitingForGlassDialog = false;
    state.glassDialogWaitTicks = 0;
    state.hasTriggeredGlassblow = true;
    lastCraftingExperience = getPlayerCraftingExperience();
    state.ticksUntilNextAction = 4;
    return;
  }
  if (state.hasTriggeredGlassblow) {
    var currentCraftingExperience = getPlayerCraftingExperience();
    if (lastCraftingExperience < 0) {
      lastCraftingExperience = currentCraftingExperience;
    }
    if (currentCraftingExperience > lastCraftingExperience) {
      lastCraftingExperience = currentCraftingExperience;
      resetGlassIdleWatchdog();
      return;
    }
    glassIdleTicks += 1;
    if (glassIdleTicks < glassIdleRestartThresholdTicks) return;
    logGlass("Glassblowing idle for ".concat(glassIdleTicks, " ticks. Restarting glassblow action."));
    state.hasTriggeredGlassblow = false;
    state.waitingForGlassDialog = false;
    state.glassDialogWaitTicks = 0;
    resetGlassIdleWatchdog();
  }
  var success = triggerGlassblowAction();
  if (!success) return;
  state.waitingForGlassDialog = true;
  state.glassDialogWaitTicks = 0;
  state.ticksUntilNextAction = 1;
  lastCraftingExperience = getPlayerCraftingExperience();
  resetGlassIdleWatchdog();
};

var LootingSeaweedSpore = () => {
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  var spore = getClosestSeaweedSpore();
  if (!spore) {
    logTravel('No seaweed spore found. Returning to GLASSBLOWING state.');
    state.hasTriggeredGlassblow = false;
    state.waitingForGlassDialog = false;
    state.glassDialogWaitTicks = 0;
    state.mainState = MainStates.GLASSBLOWING;
    return;
  }
  logTravel('Seaweed spore found. Sending loot interaction.');
  bot.tileItems.lootItem(spore);
  if (typeof spore.loot === 'function') {
    spore.loot();
  }
  logTravel('Seaweed spore loot interaction sent.');
  state.ticksUntilNextAction = 2;
  state.hasTriggeredGlassblow = false;
  state.waitingForGlassDialog = false;
  state.glassDialogWaitTicks = 0;
  state.mainState = MainStates.GLASSBLOWING;
};

var SporesOnly = () => {
  if (!isAtIslandArrival()) {
    state.mainState = MainStates.TRAVEL_TO_ROWBOAT;
    return;
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  if (bot.localPlayerMoving()) return;
  var spore = getClosestSeaweedSpore();
  if (!spore) {
    logTravel('No seaweed spore found in spores-only mode. Waiting...');
    state.ticksUntilNextAction = 2;
    return;
  }
  logTravel('Seaweed spore found in spores-only mode. Sending loot interaction.');
  bot.tileItems.lootItem(spore);
  if (typeof spore.loot === 'function') {
    spore.loot();
  }
  state.ticksUntilNextAction = 2;
};

var ReturnToBank = () => {
  if (isAtBankReturnTile()) {
    logTravel('Reached bank return tile. Switching to BANKING state.');
    state.mainState = MainStates.BANKING;
    state.hasTriggeredGlassblow = false;
    return;
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  var anchorRope = findClosestAnchorRope();
  if (!anchorRope) {
    logTravel("Anchor rope object ".concat(ANCHOR_ROPE_OBJECT_ID, " not found nearby."));
    return;
  }
  if (bot.localPlayerMoving()) return;
  logTravel('Anchor rope found. Climbing back to bank.');
  bot.objects.interactSuppliedObject(anchorRope, 'Climb');
  state.ticksUntilNextAction = 2;
};

var stateManager = () => {
  if (state.lastLoggedMainState !== state.mainState) {
    logState("State changed to: ".concat(state.mainState));
    state.lastLoggedMainState = state.mainState;
  }
  switch (state.mainState) {
    case MainStates.BANKING:
      {
        Banking();
        break;
      }
    case MainStates.TRAVEL_TO_ROWBOAT:
      {
        TravelToRowboat();
        break;
      }
    case MainStates.GLASSBLOWING:
      {
        Glassblowing();
        break;
      }
    case MainStates.LOOTING_SEAWEED_SPORE:
      {
        LootingSeaweedSpore();
        break;
      }
    case MainStates.SPORES_ONLY:
      {
        SporesOnly();
        break;
      }
    case MainStates.RETURN_TO_BANK:
      {
        ReturnToBank();
        break;
      }
  }
};

var startFrame = null;
var disposeStartFrame = () => {
  if (!startFrame) return;
  startFrame.dispose();
  startFrame = null;
};
var getModeLabel = mode => {
  if (mode === GlassMakeMode.CRAFT_PLUS_SPORES) return 'Craft + Spores';
  if (mode === GlassMakeMode.SPORES_ONLY) return 'Spores only';
  return 'Craft Only';
};
var createStartFrame = state => {
  var frame = new javax.swing.JFrame('profGlassBlowing - Start Options');
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
  frame.setLayout(new java.awt.BorderLayout(10, 10));
  var mainPanel = new javax.swing.JPanel();
  mainPanel.setLayout(new javax.swing.BoxLayout(mainPanel, javax.swing.BoxLayout.Y_AXIS));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15));
  var instructions = new javax.swing.JLabel('Choose your mode:');
  instructions.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14));
  mainPanel.add(instructions);
  mainPanel.add(javax.swing.Box.createVerticalStrut(8));
  mainPanel.add(javax.swing.Box.createVerticalStrut(10));
  var craftOnlyCheckbox = new javax.swing.JCheckBox('Craft Only', true);
  var craftAndSporesCheckbox = new javax.swing.JCheckBox('Craft + Spores', false);
  var sporesOnlyCheckbox = new javax.swing.JCheckBox('Spores Only', false);
  var applySelection = mode => {
    state.selectedMode = mode;
  };
  craftOnlyCheckbox.addActionListener(() => {
    if (!craftOnlyCheckbox.isSelected()) return;
    craftAndSporesCheckbox.setSelected(false);
    sporesOnlyCheckbox.setSelected(false);
    applySelection(GlassMakeMode.CRAFT_ONLY);
  });
  craftAndSporesCheckbox.addActionListener(() => {
    if (!craftAndSporesCheckbox.isSelected()) return;
    craftOnlyCheckbox.setSelected(false);
    sporesOnlyCheckbox.setSelected(false);
    applySelection(GlassMakeMode.CRAFT_PLUS_SPORES);
  });
  sporesOnlyCheckbox.addActionListener(() => {
    if (!sporesOnlyCheckbox.isSelected()) return;
    craftOnlyCheckbox.setSelected(false);
    craftAndSporesCheckbox.setSelected(false);
    applySelection(GlassMakeMode.SPORES_ONLY);
  });
  mainPanel.add(craftOnlyCheckbox);
  mainPanel.add(craftAndSporesCheckbox);
  mainPanel.add(sporesOnlyCheckbox);
  var lockWarning = new javax.swing.JLabel('For crafting modes, lock Glassblowing pipe (+ Seaweed spore for Craft + Spores).');
  lockWarning.setFont(new java.awt.Font('SansSerif', java.awt.Font.PLAIN, 12));
  mainPanel.add(javax.swing.Box.createVerticalStrut(8));
  mainPanel.add(lockWarning);
  mainPanel.add(javax.swing.Box.createVerticalStrut(15));
  var startButton = new javax.swing.JButton('Start Script');
  startButton.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 12));
  startButton.setPreferredSize(new java.awt.Dimension(150, 40));
  startButton.addActionListener(() => {
    if (!craftOnlyCheckbox.isSelected() && !craftAndSporesCheckbox.isSelected() && !sporesOnlyCheckbox.isSelected()) {
      log.print('[profGlassBlowing] Select a mode before starting.');
      return;
    }
    state.uiCompleted = true;
    var selectedModeLabel = getModeLabel(state.selectedMode);
    log.print("[profGlassBlowing] Mode selected: ".concat(selectedModeLabel, "."));
    disposeStartFrame();
  });
  var buttonPanel = new javax.swing.JPanel();
  buttonPanel.setLayout(new java.awt.FlowLayout(java.awt.FlowLayout.CENTER));
  buttonPanel.add(startButton);
  mainPanel.add(buttonPanel);
  frame.add(mainPanel, java.awt.BorderLayout.CENTER);
  frame.pack();
  frame.setLocationRelativeTo(null);
  return frame;
};
var initializeGlassMakeUI = state => {
  if (state.uiCompleted && startFrame) return;
  if (state.uiCompleted && !startFrame) {
    state.uiCompleted = false;
  }
  disposeStartFrame();
  startFrame = createStartFrame(state);
  startFrame.setVisible(true);
};
var disposeGlassMakeUI = () => {
  disposeStartFrame();
};

var resolveInitialStateFromInventory = () => {
  var moltenGlassCount = getMoltenGlassCount();
  if (state.selectedMode === GlassMakeMode.CRAFT_ONLY) {
    var hasPipeLocked = hasRequiredLockedItems(GlassMakeMode.CRAFT_ONLY);
    state.mainState = hasPipeLocked && moltenGlassCount >= TARGET_MOLTEN_GLASS_NORMAL_MODE ? MainStates.GLASSBLOWING : MainStates.BANKING;
    return;
  }
  if (state.selectedMode === GlassMakeMode.SPORES_ONLY) {
    state.mainState = isAtIslandArrival() ? MainStates.SPORES_ONLY : MainStates.TRAVEL_TO_ROWBOAT;
    return;
  }
  var hasSeaweedSetupLocked = hasRequiredLockedItems(GlassMakeMode.CRAFT_PLUS_SPORES);
  var hasSeaweedTripGlass = moltenGlassCount >= TARGET_MOLTEN_GLASS_SEAWEED_MODE;
  if (isAtIslandArrival()) {
    state.mainState = hasSeaweedSetupLocked && hasSeaweedTripGlass ? MainStates.GLASSBLOWING : MainStates.RETURN_TO_BANK;
    return;
  }
  state.mainState = hasSeaweedSetupLocked && hasSeaweedTripGlass ? MainStates.TRAVEL_TO_ROWBOAT : MainStates.BANKING;
};
function onStart() {
  state.uiCompleted = false;
  state.selectedMode = GlassMakeMode.CRAFT_ONLY;
  initializeGlassMakeUI(state);
  state.mainState = MainStates.BANKING;
  state.startStateResolved = false;
  state.depositedThisBankOpen = false;
  state.bankCloseRequested = false;
  state.ticksUntilNextAction = 0;
  state.hasClickedRowboat = false;
  state.hasTriggeredGlassblow = false;
  state.waitingForGlassDialog = false;
  state.glassDialogWaitTicks = 0;
  state.lastLoggedMainState = null;
  state.gameTick = 0;
  logGlass('Script started. Waiting for UI selection.');
}
function onGameTick() {
  var player = client.getLocalPlayer();
  if (!player) return;
  if (!state.uiCompleted) return;
  if (!state.startStateResolved) {
    resolveInitialStateFromInventory();
    state.startStateResolved = true;
    logGlass("Initial state resolved to ".concat(state.mainState, "."));
  }
  state.gameTick++;
  stateManager();
}
function onEnd() {
  bot.walking.webWalkCancel();
  disposeGlassMakeUI();
  logGlass('Script ended.');
}


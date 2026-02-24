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
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
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
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

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
var LOG_COLOR = {
  CORAL: LOG_COLOR_CORAL,
  GOLD: LOG_COLOR_GOLD,
  EMERALD: LOG_COLOR_EMERALD,
  BLUE: LOG_COLOR_BLUE};

var lastLoggedMessage = '';
var logMessage = (source, message, color) => {
  var fullMessage = "[".concat(source, "] ").concat(message);
  if (fullMessage === lastLoggedMessage) return;
  lastLoggedMessage = fullMessage;
  log.printRGB(fullMessage, color.r, color.g, color.b);
};
var logMiner = message => {
  logMessage('miner', message, LOG_COLOR.BLUE);
};
var logState = message => {
  logMessage('state', message, LOG_COLOR.GOLD);
};
var logMining = message => {
  logMessage('mining', message, LOG_COLOR.CORAL);
};
var logDeposit = message => {
  logMessage('deposit', message, LOG_COLOR.EMERALD);
};

var RockType;
(function (RockType) {
  RockType["SOFT_CLAY"] = "soft-clay";
  RockType["IRON"] = "iron";
  RockType["SILVER"] = "silver";
})(RockType || (RockType = {}));
var SELECTED_ROCK_TYPE = RockType.SOFT_CLAY;
var ROCK_CONFIGS = _defineProperty(_defineProperty(_defineProperty({}, RockType.SOFT_CLAY, {
  name: 'Soft clay rocks',
  objectId: 36210,
  anchor: {
    x: 3295,
    y: 12444,
    plane: 0
  },
  locations: [{
    x: 3295,
    y: 12443,
    plane: 0
  }, {
    x: 3294,
    y: 12444,
    plane: 0
  }],
  action: 'Mine'
}), RockType.IRON, {
  name: 'Iron rocks',
  objectId: 36203,
  anchor: {
    x: 3304,
    y: 12446,
    plane: 0
  },
  locations: [{
    x: 3304,
    y: 12447,
    plane: 0
  }, {
    x: 3305,
    y: 12446,
    plane: 0
  }, {
    x: 3303,
    y: 12446,
    plane: 0
  }],
  action: 'Mine'
}), RockType.SILVER, {
  name: 'Silver rocks',
  objectId: 36205,
  anchor: {
    x: 3307,
    y: 12442,
    plane: 0
  },
  locations: [{
    x: 3307,
    y: 12442,
    plane: 0
  }, {
    x: 3307,
    y: 12444,
    plane: 0
  }, {
    x: 3306,
    y: 12441,
    plane: 0
  }, {
    x: 3305,
    y: 12440,
    plane: 0
  }, {
    x: 3303,
    y: 12442,
    plane: 0
  }, {
    x: 3304,
    y: 12443,
    plane: 0
  }, {
    x: 3303,
    y: 12444,
    plane: 0
  }],
  action: 'Mine'
});
var DEPOSIT_BOX_OBJECT_ID = 36219;
var DEPOSIT_BOX_ACTION = 'Deposit';
var DEPOSIT_WIDGET_ID = 12582942;
var DEPOSIT_WIDGET_IDENTIFIER = 1;
var DEPOSIT_WIDGET_OPCODE = 57;
var DEPOSIT_WIDGET_PARAM0 = -1;
var MAX_DEPOSIT_OPEN_ATTEMPTS = 8;
var MAX_DEPOSIT_ACTION_ATTEMPTS = 8;

var MainStates;
(function (MainStates) {
  MainStates["TRAVEL_TO_ROCK"] = "TRAVEL_TO_ROCK";
  MainStates["MINING"] = "MINING";
  MainStates["OPENING_DEPOSIT_BOX"] = "OPENING_DEPOSIT_BOX";
  MainStates["DEPOSITING_ITEMS"] = "DEPOSITING_ITEMS";
})(MainStates || (MainStates = {}));
var state = {
  gameTick: 0,
  mainState: MainStates.TRAVEL_TO_ROCK,
  isCurrentlyAnimating: false,
  hasInteractedWithRock: false,
  ticksUntilNextAction: 0,
  depositOpenAttempts: 0,
  depositActionAttempts: 0,
  hasVerifiedDepositTile: false,
  isWaitingForDepositWidget: false,
  depositWidgetReady: false,
  selectedRockType: SELECTED_ROCK_TYPE,
  activeRockType: SELECTED_ROCK_TYPE,
  lastLoggedMainState: null
};

var toWorldPoint = coordinate => new net.runelite.api.coords.WorldPoint(coordinate.x, coordinate.y, coordinate.plane);
var getActiveRockConfig = state => ROCK_CONFIGS[state.activeRockType];
var getRockConfig = rockType => ROCK_CONFIGS[rockType];
var isCoordinateMatch = (worldPoint, coordinate) => worldPoint.getX() === coordinate.x && worldPoint.getY() === coordinate.y && worldPoint.getPlane() === coordinate.plane;
var isInventoryFull = () => {
  var inventory = client.getItemContainer(net.runelite.api.InventoryID.INVENTORY);
  if (!inventory) return false;
  var items = inventory.getItems();
  if (!items || items.length === 0) return false;
  var occupiedSlots = 0;
  var _iterator = _createForOfIteratorHelper(items),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (!item) continue;
      if (item.getId() <= 0) continue;
      occupiedSlots += 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return occupiedSlots >= 28;
};
var findClosestRockAtConfiguredLocationsByConfig = rockConfig => {
  var player = client.getLocalPlayer();
  if (!player) return null;
  var rocks = bot.objects.getTileObjectsWithIds([rockConfig.objectId]);
  if (!rocks || rocks.length === 0) return null;
  var playerLocation = player.getWorldLocation();
  var closestRock = null;
  var closestDistance = Number.POSITIVE_INFINITY;
  var _iterator2 = _createForOfIteratorHelper(rocks),
    _step2;
  try {
    var _loop = function _loop() {
        var rock = _step2.value;
        if (!rock) return 0; // continue
        var rockLocation = rock.getWorldLocation();
        if (!rockLocation) return 0; // continue
        var isConfiguredLocation = rockConfig.locations.some(location => isCoordinateMatch(rockLocation, location));
        if (!isConfiguredLocation) return 0; // continue
        var distance = playerLocation.distanceTo(rockLocation);
        if (distance >= closestDistance) return 0; // continue
        closestDistance = distance;
        closestRock = rock;
      },
      _ret;
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return closestRock;
};
var findClosestRockAtConfiguredLocations = state => {
  var activeRockConfig = getActiveRockConfig(state);
  return findClosestRockAtConfiguredLocationsByConfig(activeRockConfig);
};
var findClosestRockAtConfiguredLocationsByType = rockType => {
  var rockConfig = getRockConfig(rockType);
  return findClosestRockAtConfiguredLocationsByConfig(rockConfig);
};
var findClosestDepositBox = () => {
  var player = client.getLocalPlayer();
  if (!player) return null;
  var depositBoxes = bot.objects.getTileObjectsWithIds([DEPOSIT_BOX_OBJECT_ID]);
  if (!depositBoxes || depositBoxes.length === 0) return null;
  var playerLocation = player.getWorldLocation();
  var closestDepositBox = null;
  var closestDistance = Number.POSITIVE_INFINITY;
  var _iterator3 = _createForOfIteratorHelper(depositBoxes),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var depositBox = _step3.value;
      if (!depositBox) continue;
      var depositLocation = depositBox.getWorldLocation();
      if (!depositLocation) continue;
      var distance = playerLocation.distanceTo(depositLocation);
      if (distance >= closestDistance) continue;
      closestDistance = distance;
      closestDepositBox = depositBox;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return closestDepositBox;
};

var TravelToRock = () => {
  if (isInventoryFull()) {
    state.depositOpenAttempts = 0;
    state.depositActionAttempts = 0;
    state.mainState = MainStates.OPENING_DEPOSIT_BOX;
    return;
  }
  var player = client.getLocalPlayer();
  if (!player) return;
  var activeRockConfig = getActiveRockConfig(state);
  var anchor = toWorldPoint(activeRockConfig.anchor);
  var playerLocation = player.getWorldLocation();
  if (playerLocation.distanceTo(anchor) <= 1) {
    state.mainState = MainStates.MINING;
    return;
  }
  if (bot.localPlayerMoving()) return;
  bot.walking.walkToWorldPoint(anchor.getX(), anchor.getY());
  logMining("Walking to ".concat(activeRockConfig.name, " anchor (").concat(activeRockConfig.anchor.x, ", ").concat(activeRockConfig.anchor.y, ", ").concat(activeRockConfig.anchor.plane, ")"));
};

var trySwitchBackToSilver = () => {
  if (state.selectedRockType !== RockType.SILVER) return false;
  if (state.activeRockType === RockType.SILVER) return false;
  var silverRock = findClosestRockAtConfiguredLocationsByType(RockType.SILVER);
  if (!silverRock) return false;
  state.activeRockType = RockType.SILVER;
  state.hasInteractedWithRock = false;
  state.ticksUntilNextAction = 0;
  state.mainState = MainStates.TRAVEL_TO_ROCK;
  logMining('Silver rocks respawned. Returning to silver.');
  return true;
};
var Mining = () => {
  var player = client.getLocalPlayer();
  if (!player) return;
  if (isInventoryFull()) {
    state.depositOpenAttempts = 0;
    state.depositActionAttempts = 0;
    state.hasInteractedWithRock = false;
    state.mainState = MainStates.OPENING_DEPOSIT_BOX;
    return;
  }
  if (trySwitchBackToSilver()) return;
  var currentAnimation = player.getAnimation();
  var isAnimatingNow = currentAnimation !== -1;
  if (!state.isCurrentlyAnimating && isAnimatingNow) {
    state.hasInteractedWithRock = false;
  }
  if (state.isCurrentlyAnimating && !isAnimatingNow) {
    state.hasInteractedWithRock = false;
  }
  state.isCurrentlyAnimating = isAnimatingNow;
  if (state.isCurrentlyAnimating) return;
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  if (bot.localPlayerMoving()) return;
  if (state.hasInteractedWithRock) return;
  var rock = findClosestRockAtConfiguredLocations(state);
  if (!rock) {
    var _activeRockConfig = getActiveRockConfig(state);
    if (state.selectedRockType === RockType.SILVER && state.activeRockType === RockType.SILVER) {
      state.activeRockType = RockType.IRON;
      state.hasInteractedWithRock = false;
      state.ticksUntilNextAction = 0;
      state.mainState = MainStates.TRAVEL_TO_ROCK;
      logMining('Silver rocks depleted. Switching to iron until respawn.');
      return;
    }
    logMining("No ".concat(_activeRockConfig.name, " rocks found at configured locations."));
    return;
  }
  var activeRockConfig = getActiveRockConfig(state);
  bot.objects.interactSuppliedObject(rock, activeRockConfig.action);
  state.hasInteractedWithRock = true;
};

var DEPOSIT_INTERACT_TILE = {
  x: 3307,
  y: 12443,
  plane: 0
};
var isPlayerOnDepositInteractTile = player => {
  var location = player.getWorldLocation();
  if (!location) return false;
  return location.getX() === DEPOSIT_INTERACT_TILE.x && location.getY() === DEPOSIT_INTERACT_TILE.y && location.getPlane() === DEPOSIT_INTERACT_TILE.plane;
};
var OpeningDepositBox = () => {
  if (!isInventoryFull()) {
    state.hasVerifiedDepositTile = false;
    state.isWaitingForDepositWidget = false;
    state.depositWidgetReady = false;
    state.mainState = MainStates.TRAVEL_TO_ROCK;
    return;
  }
  if (state.depositWidgetReady) {
    state.mainState = MainStates.DEPOSITING_ITEMS;
    return;
  }
  if (state.isWaitingForDepositWidget) {
    if (state.ticksUntilNextAction > 0) {
      state.ticksUntilNextAction--;
      return;
    }
    state.isWaitingForDepositWidget = false;
    state.depositWidgetReady = true;
    state.mainState = MainStates.DEPOSITING_ITEMS;
    return;
  }
  state.hasVerifiedDepositTile = false;
  var depositBox = findClosestDepositBox();
  if (!depositBox) {
    logDeposit('Deposit box object not found.');
    state.isWaitingForDepositWidget = false;
    state.depositWidgetReady = false;
    return;
  }
  var player = client.getLocalPlayer();
  if (!player) return;
  if (!isPlayerOnDepositInteractTile(player)) {
    if (bot.localPlayerMoving()) return;
    bot.walking.walkToWorldPoint(DEPOSIT_INTERACT_TILE.x, DEPOSIT_INTERACT_TILE.y);
    return;
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  bot.objects.interactSuppliedObject(depositBox, DEPOSIT_BOX_ACTION);
  state.depositOpenAttempts++;
  state.ticksUntilNextAction = 2;
  state.isWaitingForDepositWidget = true;
  if (state.depositOpenAttempts <= MAX_DEPOSIT_OPEN_ATTEMPTS) return;
  logDeposit('Deposit box did not open after attempts. Returning to mining.');
  state.depositOpenAttempts = 0;
  state.isWaitingForDepositWidget = false;
  state.depositWidgetReady = false;
  state.mainState = MainStates.TRAVEL_TO_ROCK;
};

var MAX_WIDGET_CLICK_ATTEMPTS_BEFORE_FALLBACK = 3;
var DepositingItems = () => {
  if (!bot.bank.isOpen() && !state.depositWidgetReady) {
    state.depositOpenAttempts = 0;
    state.hasVerifiedDepositTile = false;
    state.isWaitingForDepositWidget = false;
    state.mainState = MainStates.OPENING_DEPOSIT_BOX;
    return;
  }
  if (!isInventoryFull()) {
    state.depositActionAttempts = 0;
    state.hasInteractedWithRock = false;
    state.hasVerifiedDepositTile = false;
    state.isWaitingForDepositWidget = false;
    state.depositWidgetReady = false;
    state.mainState = MainStates.TRAVEL_TO_ROCK;
    return;
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  bot.widgets.interactSpecifiedWidget(DEPOSIT_WIDGET_ID, DEPOSIT_WIDGET_IDENTIFIER, DEPOSIT_WIDGET_OPCODE, DEPOSIT_WIDGET_PARAM0);
  logDeposit("Clicked deposit widget with param0=".concat(DEPOSIT_WIDGET_PARAM0));
  state.depositActionAttempts++;
  state.ticksUntilNextAction = 2;
  if (state.depositActionAttempts >= MAX_WIDGET_CLICK_ATTEMPTS_BEFORE_FALLBACK) {
    logDeposit('Widget click not activating. Trying depositAll fallback.');
    if (bot.bank.isOpen()) {
      bot.bank.depositAll();
    }
    state.depositActionAttempts = 0;
    state.ticksUntilNextAction = 2;
    return;
  }
  if (state.depositActionAttempts <= MAX_DEPOSIT_ACTION_ATTEMPTS) return;
  logDeposit('Deposit widget interaction timed out. Retrying deposit.');
  state.depositActionAttempts = 0;
  state.ticksUntilNextAction = 2;
};

var stateManager = () => {
  if (state.lastLoggedMainState !== state.mainState) {
    logState("State changed to: ".concat(state.mainState));
    state.lastLoggedMainState = state.mainState;
  }
  switch (state.mainState) {
    case MainStates.TRAVEL_TO_ROCK:
      {
        TravelToRock();
        break;
      }
    case MainStates.MINING:
      {
        Mining();
        break;
      }
    case MainStates.OPENING_DEPOSIT_BOX:
      {
        OpeningDepositBox();
        break;
      }
    case MainStates.DEPOSITING_ITEMS:
      {
        DepositingItems();
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
var createStartFrame = state => {
  var frame = new javax.swing.JFrame('profMiner - Rock Selection');
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
  frame.setLayout(new java.awt.BorderLayout(10, 10));
  var mainPanel = new javax.swing.JPanel();
  mainPanel.setLayout(new javax.swing.BoxLayout(mainPanel, javax.swing.BoxLayout.Y_AXIS));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15));
  var instructionsLabel = new javax.swing.JLabel('Select a rock type to mine:');
  instructionsLabel.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14));
  mainPanel.add(instructionsLabel);
  mainPanel.add(javax.swing.Box.createVerticalStrut(10));
  var ironCheckbox = new javax.swing.JCheckBox('Iron', false);
  var silverCheckbox = new javax.swing.JCheckBox('Silver', false);
  var softClayCheckbox = new javax.swing.JCheckBox('Soft Clay', false);
  var applySelection = rockType => {
    state.selectedRockType = rockType;
  };
  var clearOtherSelections = activeCheckbox => {
    if (activeCheckbox !== ironCheckbox) ironCheckbox.setSelected(false);
    if (activeCheckbox !== softClayCheckbox) softClayCheckbox.setSelected(false);
    if (activeCheckbox !== silverCheckbox) silverCheckbox.setSelected(false);
  };
  ironCheckbox.addActionListener(() => {
    if (!ironCheckbox.isSelected()) return;
    clearOtherSelections(ironCheckbox);
    applySelection(RockType.IRON);
  });
  silverCheckbox.addActionListener(() => {
    if (!silverCheckbox.isSelected()) return;
    clearOtherSelections(silverCheckbox);
    applySelection(RockType.SILVER);
  });
  softClayCheckbox.addActionListener(() => {
    if (!softClayCheckbox.isSelected()) return;
    clearOtherSelections(softClayCheckbox);
    applySelection(RockType.SOFT_CLAY);
  });
  mainPanel.add(ironCheckbox);
  mainPanel.add(silverCheckbox);
  mainPanel.add(softClayCheckbox);
  mainPanel.add(javax.swing.Box.createVerticalStrut(15));
  var startButton = new javax.swing.JButton('Start Script');
  startButton.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 12));
  startButton.setPreferredSize(new java.awt.Dimension(150, 40));
  startButton.addActionListener(() => {
    if (!ironCheckbox.isSelected() && !softClayCheckbox.isSelected() && !silverCheckbox.isSelected()) {
      log.print('[profMiner] Select a rock type before starting.');
      return;
    }
    state.uiCompleted = true;
    state.activeRockType = state.selectedRockType;
    var selectedRockLabel = 'Soft Clay';
    if (state.selectedRockType === RockType.IRON) {
      selectedRockLabel = 'Iron';
    } else if (state.selectedRockType === RockType.SILVER) {
      selectedRockLabel = 'Silver';
    }
    log.print("[profMiner] Rock selection: ".concat(selectedRockLabel, ". Starting script."));
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
var initializeMinerUI = state => {
  if (state.uiCompleted) return;
  disposeStartFrame();
  startFrame = createStartFrame(state);
  startFrame.setVisible(true);
};
var disposeMinerUI = () => {
  disposeStartFrame();
};

function onStart() {
  state.uiCompleted = false;
  initializeMinerUI(state);
  state.mainState = MainStates.TRAVEL_TO_ROCK;
  state.isCurrentlyAnimating = false;
  state.hasInteractedWithRock = false;
  state.ticksUntilNextAction = 0;
  state.depositOpenAttempts = 0;
  state.depositActionAttempts = 0;
  state.hasVerifiedDepositTile = false;
  state.isWaitingForDepositWidget = false;
  state.depositWidgetReady = false;
  state.activeRockType = state.selectedRockType;
  state.lastLoggedMainState = null;
  state.gameTick = 0;
  var activeRockConfig = getActiveRockConfig(state);
  logMiner("Script started. Rock type: ".concat(activeRockConfig.name, ". Object ID: ").concat(activeRockConfig.objectId, "."));
}
function onGameTick() {
  var player = client.getLocalPlayer();
  if (!player) return;
  if (!state.uiCompleted) return;
  state.gameTick++;
  stateManager();
}
function onEnd() {
  bot.walking.webWalkCancel();
  disposeMinerUI();
  logMiner('Script ended');
}


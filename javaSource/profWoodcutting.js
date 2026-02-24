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

var MAGIC_TREE_OBJECT_ID = 10834;
var YEW_TREE_OBJECT_ID = 10822;
var CAMPHOR_TREE_OBJECT_ID = 58557;
var MAGIC_LOGS_ITEM_ID = 1513;
var YEW_LOGS_ITEM_ID = 1515;
var CAMPHOR_LOG_ID = 32904;
var WOODCUTTING_ANIMATION_ID = 2846;
var FELLING_AXE_ANIMATION_ID = 10070;
var LOG_BASCKET_ID = 28142;
var CAMHPOR_BANK_WEBWALK_X = 3181;
var CAMHPOR_BANK_WEBWALK_Y = 2418;
var CAMPHOR_TREE_WEBWALK_X = 3238;
var CAMPHOR_TREE_WEBWALK_Y = 2393;
var DRAGON_AXE_ITEM_ID = 6739;
var SPECIAL_ATTACK_WIDGET_ID = 10485796;
var SPECIAL_ATTACK_IDENTIFIER = 1;
var SPECIAL_ATTACK_OPCODE = 57;
var SPECIAL_ATTACK_PARAM = -1;
var SPECIAL_ATTACK_VARP = 300;
var BANK_DEPOSIT_WIDGET_1 = 786471;
var BANK_DEPOSIT_WIDGET_2 = 786473;
var BANK_WIDGET_IDENTIFIER = 1;
var BANK_WIDGET_OPCODE = 57;
var BANK_WIDGET_PARAM = -1;

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
var logWoodcutting = message => {
  logMessage('woodcutting', message, LOG_COLOR.BLUE);
};
var logState = message => {
  logMessage('state', message, LOG_COLOR.GOLD);
};
var logObject = message => {
  logMessage('animation', message, LOG_COLOR.CORAL);
};
var logBank = message => {
  logMessage('bank', message, LOG_COLOR.EMERALD);
};
var logSpecial = message => {
  logMessage('special', message, LOG_COLOR.EMERALD);
};

var MainStates;
(function (MainStates) {
  MainStates["WOODCUTTING"] = "WOODCUTTING";
  MainStates["TRAVELING"] = "TRAVELING";
  MainStates["BANKING"] = "BANKING";
  MainStates["MOVING_TO_BANK"] = "MOVING_TO_BANK";
  MainStates["OPENING_BANK"] = "OPENING_BANK";
  MainStates["DEPOSITING_ITEMS"] = "DEPOSITING_ITEMS";
  MainStates["CLOSING_BANK"] = "CLOSING_BANK";
})(MainStates || (MainStates = {}));
var state = {
  debugEnabled: true,
  debugFullState: false,
  gameTick: 0,
  mainState: MainStates.WOODCUTTING,
  subState: '',
  scriptName: 'profWoodcutting',
  timeout: 0,
  isCurrentlyAnimating: false,
  hasInteractedWithTree: false,
  ticksUntilNextAction: 0,
  bankOpenAttempts: 0,
  lastSpecialAttackEnergy: 0,
  ticksUntilNextSpecial: 0,
  hasUsedSpecialThisSession: false,
  justUsedSpecialAttack: false,
  activeTreeObjectId: 10834,
  activeLogsItemId: 1513,
  treeTypeName: 'Magic',
  lastLoggedMainState: null,
  isTravelingToBank: false,
  previousMainState: MainStates.WOODCUTTING,
  hasClimbedRocks: false,
  hasCrossedSteppingStone: false,
  activeClimbRocksObjectId: 0,
  travelingStep: 0,
  idleTicks: 0,
  idleResetThreshold: 10,
  initialStateCheckDone: false
};

var hasDragonAxeEquipped = () => {
  return bot.equipment.containsId(DRAGON_AXE_ITEM_ID);
};
var getSpecialAttackEnergy = () => {
  var energy = client.getVarpValue(SPECIAL_ATTACK_VARP);
  return Math.floor(energy / 10);
};
var activateSpecialAttack = () => {
  logSpecial('Activating dragon axe special attack');
  bot.widgets.interactSpecifiedWidget(SPECIAL_ATTACK_WIDGET_ID, SPECIAL_ATTACK_IDENTIFIER, SPECIAL_ATTACK_OPCODE, SPECIAL_ATTACK_PARAM);
  state.hasUsedSpecialThisSession = true;
  state.justUsedSpecialAttack = true;
};
var handleDragonAxeSpecial = () => {
  if (!hasDragonAxeEquipped()) return;
  var currentEnergy = getSpecialAttackEnergy();
  if (currentEnergy !== state.lastSpecialAttackEnergy) {
    logSpecial("Special attack energy: ".concat(currentEnergy, "%"));
    state.lastSpecialAttackEnergy = currentEnergy;
  }
  if (state.ticksUntilNextSpecial > 0) {
    state.ticksUntilNextSpecial--;
    if (state.ticksUntilNextSpecial === 0) {
      logSpecial('Delay finished, ready to use special attack');
    }
    return;
  }
  if (currentEnergy >= 100) {
    if (!state.hasUsedSpecialThisSession && state.ticksUntilNextSpecial === 0) {
      state.ticksUntilNextSpecial = Math.floor(Math.random() * 26) + 5;
      logSpecial("Special attack ready! Waiting ".concat(state.ticksUntilNextSpecial, " ticks before using (human-like delay)"));
      state.hasUsedSpecialThisSession = true;
    } else if (state.ticksUntilNextSpecial === 0) {
      activateSpecialAttack();
    }
    return;
  }
  if (state.hasUsedSpecialThisSession && currentEnergy < 100) {
    state.hasUsedSpecialThisSession = false;
  }
};

var findClosestAvailableTree = () => {
  var treeObjects = bot.objects.getTileObjectsWithIds([state.activeTreeObjectId]);
  if (!treeObjects) {
    logObject("No ".concat(state.treeTypeName.toLowerCase(), " trees found"));
    return null;
  }
  var player = client.getLocalPlayer();
  if (!player) return null;
  var playerLoc = player.getWorldLocation();
  var closest = null;
  var closestDistance = Number.POSITIVE_INFINITY;
  for (var index = 0; index < treeObjects.length; index++) {
    var tree = treeObjects[index];
    if (!tree) continue;
    var treeLoc = tree.getWorldLocation();
    if (!treeLoc) continue;
    var distance = playerLoc.distanceTo(treeLoc);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = tree;
    }
  }
  return closest;
};
var isInventoryFull = () => {
  var inventory = client.getItemContainer(net.runelite.api.InventoryID.INVENTORY);
  if (!inventory) return false;
  var items = inventory.getItems();
  if (!items) return false;
  var basketCount = 0;
  var logsCount = 0;
  for (var index = 0; index < items.length; index++) {
    var item = items[index];
    if (!item) continue;
    if (item.getId() === LOG_BASCKET_ID) {
      basketCount += item.getQuantity();
    } else if (item.getId() === state.activeLogsItemId) {
      logsCount += item.getQuantity();
    }
  }
  if (basketCount >= 1) {
    var isFullWithBasket = logsCount >= 27;
    if (isFullWithBasket) {
      logWoodcutting("Inventory full: ".concat(basketCount, "x log basket, ").concat(logsCount, "x logs (with basket)"));
    }
    return isFullWithBasket;
  }
  var isFullWithoutBasket = logsCount >= 28;
  if (isFullWithoutBasket) {
    logWoodcutting("Inventory full: ".concat(logsCount, "x logs (no basket, full inventory)"));
  }
  return isFullWithoutBasket;
};
var Woodcutting = () => {
  var player = client.getLocalPlayer();
  if (!player) return;
  if (isInventoryFull()) {
    logState('Inventory full, moving to bank');
    if (state.treeTypeName === 'Camphor') {
      state.mainState = MainStates.TRAVELING;
      state.isTravelingToBank = true;
      state.travelingStep = 0;
    } else {
      state.mainState = MainStates.MOVING_TO_BANK;
    }
    return;
  }
  var currentAnimation = player.getAnimation();
  var wasAnimating = state.isCurrentlyAnimating;
  state.isCurrentlyAnimating = currentAnimation === WOODCUTTING_ANIMATION_ID || currentAnimation === FELLING_AXE_ANIMATION_ID;
  if (!wasAnimating && state.isCurrentlyAnimating) {
    logObject('Animation started - interaction successful');
    state.hasInteractedWithTree = false;
    state.idleTicks = 0;
    state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
  }
  if (wasAnimating && !state.isCurrentlyAnimating) {
    logObject('Animation ended, waiting before next action');
    state.hasInteractedWithTree = false;
    state.justUsedSpecialAttack = false;
    state.idleTicks = 0;
    state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
    state.ticksUntilNextAction = Math.floor(Math.random() * 7) + 2;
    logObject("Waiting ".concat(state.ticksUntilNextAction, " ticks before next action"));
  }
  var isIdle = !state.isCurrentlyAnimating && !bot.localPlayerMoving();
  if (isIdle) {
    state.idleTicks++;
  } else {
    state.idleTicks = 0;
  }
  if (state.idleTicks >= state.idleResetThreshold) {
    logObject("Idle for ".concat(state.idleTicks, " ticks in woodcutting, resetting tree interaction"));
    state.hasInteractedWithTree = false;
    state.justUsedSpecialAttack = false;
    state.ticksUntilNextAction = 0;
    state.idleTicks = 0;
    state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
  }
  if (state.ticksUntilNextAction > 0) {
    state.ticksUntilNextAction--;
    return;
  }
  if (state.justUsedSpecialAttack) {
    logSpecial('Skipping tree interaction after special attack - game will auto re-interact');
    return;
  }
  if (bot.walking.isWebWalking() || bot.localPlayerMoving()) {
    return;
  }
  if (!state.isCurrentlyAnimating && !state.hasInteractedWithTree) {
    var tree = findClosestAvailableTree();
    if (!tree) {
      logObject('No available trees found');
      return;
    }
    var treeLoc = tree.getWorldLocation();
    logObject("Found tree at (".concat(treeLoc.getX(), ", ").concat(treeLoc.getY(), ")"));
    var reCheckAnimation = player.getAnimation();
    var isAlreadyAnimating = reCheckAnimation === WOODCUTTING_ANIMATION_ID || reCheckAnimation === FELLING_AXE_ANIMATION_ID;
    if (isAlreadyAnimating) {
      logObject('Already animating, skipping tree interaction');
      state.hasInteractedWithTree = false;
      return;
    }
    bot.objects.interactSuppliedObject(tree, 'Chop down');
    state.hasInteractedWithTree = true;
    state.idleTicks = 0;
    state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
    logObject('Interacting with tree');
  }
};

var getTravelDestination = () => {
  if (state.isTravelingToBank) {
    return new net.runelite.api.coords.WorldPoint(CAMHPOR_BANK_WEBWALK_X, CAMHPOR_BANK_WEBWALK_Y, 0);
  }
  return new net.runelite.api.coords.WorldPoint(CAMPHOR_TREE_WEBWALK_X, CAMPHOR_TREE_WEBWALK_Y, 0);
};
var hasReachedDestination = (player, destination) => {
  var playerLocation = player.getWorldLocation();
  if (!playerLocation) return false;
  return playerLocation.distanceTo(destination) <= 3;
};
var Traveling = () => {
  var player = client.getLocalPlayer();
  if (!player) return;
  var destination = getTravelDestination();
  if (hasReachedDestination(player, destination)) {
    if (bot.walking.isWebWalking() || bot.localPlayerMoving()) {
      return;
    }
    if (state.isTravelingToBank) {
      logState('Reached bank travel destination, opening bank');
      state.mainState = MainStates.MOVING_TO_BANK;
      return;
    }
    logState('Reached tree travel destination, returning to woodcutting');
    state.mainState = MainStates.WOODCUTTING;
    return;
  }
  if (!bot.walking.isWebWalking() && !bot.localPlayerMoving()) {
    bot.walking.webWalkStart(destination);
    if (state.isTravelingToBank) {
      logState("Webwalking to bank destination (".concat(CAMHPOR_BANK_WEBWALK_X, ", ").concat(CAMHPOR_BANK_WEBWALK_Y, ")"));
      return;
    }
    logState("Webwalking to tree destination (".concat(CAMPHOR_TREE_WEBWALK_X, ", ").concat(CAMPHOR_TREE_WEBWALK_Y, ")"));
  }
};

var MovingToBank = () => {
  var player = client.getLocalPlayer();
  if (!player) return;
  logBank('Opening bank...');
  bot.bank.open();
  state.mainState = MainStates.OPENING_BANK;
};

var OpeningBank = () => {
  if (bot.bank.isOpen()) {
    logBank('Bank opened successfully');
    state.mainState = MainStates.DEPOSITING_ITEMS;
    return;
  }
  state.bankOpenAttempts++;
  if (state.bankOpenAttempts > 5) {
    logBank('Bank failed to open after multiple attempts, returning to trees');
    state.mainState = MainStates.WOODCUTTING;
    state.bankOpenAttempts = 0;
    return;
  }
  logBank("Waiting for bank to open (attempt ".concat(state.bankOpenAttempts, ")"));
};

var DepositingItems = () => {
  if (!bot.bank.isOpen()) {
    if (state.bankOpenAttempts < 3) {
      logBank('Bank not open yet, retrying');
      state.mainState = MainStates.OPENING_BANK;
    } else {
      logBank('Failed to open bank, moving back to trees');
      state.mainState = MainStates.WOODCUTTING;
    }
    return;
  }
  logBank('Depositing logs using bank widgets...');
  bot.widgets.interactSpecifiedWidget(BANK_DEPOSIT_WIDGET_1, BANK_WIDGET_IDENTIFIER, BANK_WIDGET_OPCODE, BANK_WIDGET_PARAM);
  bot.widgets.interactSpecifiedWidget(BANK_DEPOSIT_WIDGET_2, BANK_WIDGET_IDENTIFIER, BANK_WIDGET_OPCODE, BANK_WIDGET_PARAM);
  state.mainState = MainStates.CLOSING_BANK;
};

var ClosingBank = () => {
  logBank('Closing bank and returning to woodcutting');
  bot.bank.close();
  if (state.treeTypeName === 'Camphor') {
    state.mainState = MainStates.TRAVELING;
    state.isTravelingToBank = false;
    state.travelingStep = 0;
  } else {
    state.mainState = MainStates.WOODCUTTING;
  }
  state.isCurrentlyAnimating = false;
  state.hasInteractedWithTree = false;
  state.ticksUntilNextAction = 0;
  state.justUsedSpecialAttack = false;
};

var stateManager = () => {
  if (state.lastLoggedMainState !== state.mainState) {
    logState("State changed to: ".concat(state.mainState));
    state.lastLoggedMainState = state.mainState;
  }
  switch (state.mainState) {
    case MainStates.WOODCUTTING:
      {
        Woodcutting();
        break;
      }
    case MainStates.TRAVELING:
      {
        Traveling();
        break;
      }
    case MainStates.MOVING_TO_BANK:
      {
        MovingToBank();
        break;
      }
    case MainStates.OPENING_BANK:
      {
        OpeningBank();
        break;
      }
    case MainStates.DEPOSITING_ITEMS:
      {
        DepositingItems();
        break;
      }
    case MainStates.CLOSING_BANK:
      {
        ClosingBank();
        break;
      }
  }
};

var startFrame = null;
var TreeSelection;
(function (TreeSelection) {
  TreeSelection["YEW"] = "YEW";
  TreeSelection["MAGIC"] = "MAGIC";
  TreeSelection["CAMPHOR"] = "CAMPHOR";
})(TreeSelection || (TreeSelection = {}));
var applyTreeSelection = (state, selection) => {
  switch (selection) {
    case TreeSelection.MAGIC:
      {
        state.activeTreeObjectId = MAGIC_TREE_OBJECT_ID;
        state.activeLogsItemId = MAGIC_LOGS_ITEM_ID;
        state.treeTypeName = 'Magic';
        break;
      }
    case TreeSelection.CAMPHOR:
      {
        state.activeTreeObjectId = CAMPHOR_TREE_OBJECT_ID;
        state.activeLogsItemId = CAMPHOR_LOG_ID;
        state.treeTypeName = 'Camphor';
        break;
      }
    case TreeSelection.YEW:
      {
        state.activeTreeObjectId = YEW_TREE_OBJECT_ID;
        state.activeLogsItemId = YEW_LOGS_ITEM_ID;
        state.treeTypeName = 'Yew';
        break;
      }
  }
};
var disposeStartFrame = () => {
  if (!startFrame) return;
  startFrame.dispose();
  startFrame = null;
};
var createStartFrame = state => {
  var frame = new javax.swing.JFrame('profWoodcutting - Tree Selection');
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
  frame.setLayout(new java.awt.BorderLayout(10, 10));
  var mainPanel = new javax.swing.JPanel();
  mainPanel.setLayout(new javax.swing.BoxLayout(mainPanel, javax.swing.BoxLayout.Y_AXIS));
  mainPanel.setBorder(javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15));
  var instructionsLabel = new javax.swing.JLabel('Select a tree location to cut:');
  instructionsLabel.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14));
  mainPanel.add(instructionsLabel);
  mainPanel.add(javax.swing.Box.createVerticalStrut(10));
  var yewCheckbox = new javax.swing.JCheckBox('Woodcutting Guild Yew', false);
  var magicCheckbox = new javax.swing.JCheckBox('Woodcutting Guild Magic', false);
  var camphorCheckbox = new javax.swing.JCheckBox('Great Conch Camphor', false);
  yewCheckbox.addActionListener(() => {
    if (yewCheckbox.isSelected()) {
      magicCheckbox.setSelected(false);
      camphorCheckbox.setSelected(false);
      applyTreeSelection(state, TreeSelection.YEW);
    }
  });
  magicCheckbox.addActionListener(() => {
    if (magicCheckbox.isSelected()) {
      yewCheckbox.setSelected(false);
      camphorCheckbox.setSelected(false);
      applyTreeSelection(state, TreeSelection.MAGIC);
    }
  });
  camphorCheckbox.addActionListener(() => {
    if (camphorCheckbox.isSelected()) {
      yewCheckbox.setSelected(false);
      magicCheckbox.setSelected(false);
      applyTreeSelection(state, TreeSelection.CAMPHOR);
    }
  });
  mainPanel.add(yewCheckbox);
  mainPanel.add(magicCheckbox);
  mainPanel.add(camphorCheckbox);
  mainPanel.add(javax.swing.Box.createVerticalStrut(15));
  var startButton = new javax.swing.JButton('Start Script');
  startButton.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 12));
  startButton.setPreferredSize(new java.awt.Dimension(150, 40));
  startButton.addActionListener(() => {
    if (state.treeTypeName !== 'Yew' && state.treeTypeName !== 'Magic' && state.treeTypeName !== 'Camphor') {
      applyTreeSelection(state, TreeSelection.MAGIC);
    }
    state.uiCompleted = true;
    log.print("Tree selection: ".concat(state.treeTypeName, ". Starting script."));
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
var woodcuttingUI = {
  initialize: state => {
    if (state.uiCompleted) return;
    disposeStartFrame();
    startFrame = createStartFrame(state);
    startFrame.setVisible(true);
  },
  dispose: () => {
    disposeStartFrame();
  }
};

var checkInitialCamphorState = () => {
  if (state.treeTypeName !== 'Camphor') return;
  var inventory = client.getItemContainer(net.runelite.api.InventoryID.INVENTORY);
  if (!inventory) return;
  var items = inventory.getItems();
  if (!items) return;
  var basketCount = 0;
  var logsCount = 0;
  var _iterator = _createForOfIteratorHelper(items),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (!item) continue;
      if (item.getId() === LOG_BASCKET_ID) {
        basketCount += item.getQuantity();
      } else if (item.getId() === state.activeLogsItemId) {
        logsCount += item.getQuantity();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var hasBasket = basketCount >= 1;
  var isFull = hasBasket ? logsCount >= 27 : logsCount >= 28;
  state.mainState = MainStates.TRAVELING;
  state.isTravelingToBank = isFull;
  state.travelingStep = 0;
  if (isFull) {
    logWoodcutting('Startup inventory full - webwalking to bank');
    return;
  }
  logWoodcutting('Startup inventory not full - webwalking to tree');
};
function onGameTick() {
  var player = client.getLocalPlayer();
  if (!player) return;
  if (!state.uiCompleted) {
    return;
  }
  if (!state.initialStateCheckDone) {
    checkInitialCamphorState();
    state.initialStateCheckDone = true;
  }
  logWoodcutting("[".concat(state.mainState, "] Processing tick"));
  if (state.mainState === MainStates.WOODCUTTING) {
    handleDragonAxeSpecial();
  } else {
    state.ticksUntilNextSpecial = 0;
    state.hasUsedSpecialThisSession = false;
    state.justUsedSpecialAttack = false;
  }
  stateManager();
}
function onStart() {
  logWoodcutting('Script started. Opening tree selection UI...');
  state.uiCompleted = false;
  woodcuttingUI.initialize(state);
  var woodcuttingLevel = client.getRealSkillLevel(net.runelite.api.Skill.WOODCUTTING);
  var hasDragonAxe = bot.equipment.containsId(DRAGON_AXE_ITEM_ID);
  var hasLogBasket = bot.inventory.containsId(LOG_BASCKET_ID);
  logWoodcutting('=== Player Configuration ===');
  logWoodcutting("Woodcutting Level: ".concat(woodcuttingLevel));
  logWoodcutting("Tree Type: ".concat(state.treeTypeName, " (user selected)"));
  logWoodcutting("Dragon Axe: ".concat(hasDragonAxe ? 'YES (special attack enabled)' : 'NO (special attack disabled)'));
  logWoodcutting("Log Basket: ".concat(hasLogBasket ? 'YES (banking at 27 logs)' : 'NO (banking at 28 logs)'));
  logWoodcutting('===========================');
  state.mainState = MainStates.WOODCUTTING;
  state.isCurrentlyAnimating = false;
  state.hasInteractedWithTree = false;
  state.ticksUntilNextAction = 0;
  state.bankOpenAttempts = 0;
  state.lastSpecialAttackEnergy = 0;
  state.ticksUntilNextSpecial = 0;
  state.hasUsedSpecialThisSession = false;
  state.justUsedSpecialAttack = false;
  state.lastLoggedMainState = null;
  state.isTravelingToBank = false;
  state.hasClimbedRocks = false;
  state.hasCrossedSteppingStone = false;
  state.travelingStep = 0;
  state.idleTicks = 0;
  state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
  state.initialStateCheckDone = false;
}
function onEnd() {
  woodcuttingUI.dispose();
  logWoodcutting('Script ended');
}


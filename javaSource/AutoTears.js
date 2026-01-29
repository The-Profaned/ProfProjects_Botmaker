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

var BLUE_TEAR_WALLS = [6661, 6665];
var GREEN_TEAR_WALLS = [6662, 6666];
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
var blueWallCount = 0;
var greenWallCount = 0;
var minigameActive = true;
function getMinigameTimer() {
  var timerWidget = client.getWidget(629, 2);
  if (!timerWidget) {
    return null;
  }
  return timerWidget.getText();
}
function parseTimerSeconds() {
  var timerText = getMinigameTimer();
  if (!timerText) {
    return 0;
  }
  var timeMatch = timerText.match(/(\d+):(\d+)/);
  if (!timeMatch) {
    return 0;
  }
  var minutes = Number.parseInt(timeMatch[1], 10);
  var seconds = Number.parseInt(timeMatch[2], 10);
  return minutes * 60 + seconds;
}
function isMinigameActive() {
  var totalSeconds = parseTimerSeconds();
  return totalSeconds > 0;
}
function findBlueTearWalls() {
  return bot.objects.getTileObjectsWithIds(BLUE_TEAR_WALLS);
}
bot.objects;
function findGreenTearWalls() {
  return bot.objects.getTileObjectsWithIds(GREEN_TEAR_WALLS);
}
function wallUniqueKey(wall) {
  var loc = wall.getWorldLocation();
  return wall.getId() + '_' + loc.getX() + '_' + loc.getY() + '_' + loc.getPlane();
}
function trackWallChanges() {
  var currentTick = client.getTickCount();
  var blueTears = findBlueTearWalls();
  var greenTears = findGreenTearWalls();
  if (!blueTears || blueTears.length === 0) {
    blueCycleSeen = new Set();
    blueCycleComplete = false;
    blueRespawnOnCurrent = false;
    blueCycleOrder = [];
    pendingSwitchToFirst = false;
  }
  var currentBlueIds = new Set();
  if (blueTears && blueTears.length > 0) {
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
          bot.printLogMessage('[CYCLE] All 3 blue walls observed this cycle');
        }
        var currentWallKey = currentInteractingWall ? wallUniqueKey(currentInteractingWall) : null;
        if (currentInteractingType === 'blue' && currentWallKey !== null && currentWallKey === simpleKey) {
          if (!blueRespawnOnCurrent) {
            blueRespawnOnCurrent = true;
            bot.printLogMessage('[RESPAWN] Blue wall reappeared on current wall; hold position');
          }
        } else {
          blueRespawnOnCurrent = false;
        }
        if (!activeBlueWalls.has(uniqueId)) {
          var spawn = {
            wallId: wallId,
            location: location,
            spawnTick: currentTick,
            despawnTick: null,
            duration: null,
            type: 'blue',
            simpleKey: simpleKey
          };
          activeBlueWalls.set(uniqueId, spawn);
          bot.printLogMessage('[SPAWN] Blue wall #' + wallId + ' at (' + x + ', ' + y + ', ' + plane + ') tick ' + currentTick);
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
  if (greenTears && greenTears.length > 0) {
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
          bot.printLogMessage('[SPAWN] Green wall #' + _wallId + ' at (' + _x + ', ' + _y + ', ' + _plane + ') tick ' + currentTick);
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
        bot.printLogMessage('[CYCLE] 3rd blue despawned under player; queue switch to first blue');
      }
      wallSpawnHistory.push(spawn);
      activeBlueWalls.delete(id);
      bot.printLogMessage('[DESPAWN] Blue wall #' + spawn.wallId + ' lasted ' + spawn.duration + ' ticks');
    }
  });
  activeGreenWalls.forEach((spawn, id) => {
    if (!currentGreenIds.has(id)) {
      spawn.despawnTick = currentTick;
      spawn.duration = spawn.despawnTick - spawn.spawnTick;
      wallSpawnHistory.push(spawn);
      activeGreenWalls.delete(id);
      bot.printLogMessage('[DESPAWN] Green wall #' + spawn.wallId + ' lasted ' + spawn.duration + ' ticks');
    }
  });
}
function getAverageWallDuration(type) {
  var relevantSpawns = wallSpawnHistory.filter(spawn => {
    return spawn.duration !== null;
  });
  if (relevantSpawns.length === 0) return 0;
  var totalDuration = relevantSpawns.reduce((sum, spawn) => sum + (spawn.duration || 0), 0);
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
  var blueTears = findBlueTearWalls() || [];
  var greenTears = findGreenTearWalls() || [];
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
  var blues = findBlueTearWalls() || [];
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
  var distToFirst = getDistanceToWall(candidates[0]);
  var distToSecond = getDistanceToWall(candidates[1]);
  if (distToFirst > 3 && distToSecond <= distToFirst) {
    bot.printLogMessage('[DISTANCE] Wall 1 too far (' + distToFirst + ' tiles); choosing closer wall 2 (' + distToSecond + ' tiles)');
    return candidates[1];
  }
  return candidates[0];
}
function talkToJuna() {
  var junaList = bot.objects.getTileObjectsWithNames(['Juna']);
  if (!junaList || junaList.length === 0) {
    bot.printLogMessage('[JUNA] Could not find Juna game object');
    return;
  }
  var juna = junaList[0];
  bot.printLogMessage('[JUNA] Found Juna, interacting with story option');
  bot.objects.interactSuppliedObject(juna, 'Story');
  junaDialogCompleted = true;
  bot.printLogMessage('[JUNA] Story dialog initiated, waiting for completion');
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
      bot.printLogMessage('[TARGET] Selecting preferred blue at (' + loc.getX() + ', ' + loc.getY() + ', ' + loc.getPlane() + ')');
      return;
    }
  }
  if (adjacent.type !== currentInteractingType || adjacent.wall !== currentInteractingWall) {
    currentInteractingType = adjacent.type;
    currentInteractingWall = adjacent.wall;
    if (currentInteractingType === 'empty') {
      bot.printLogMessage('[INTERACT] No adjacent tear wall');
    } else {
      var _currentInteractingWa;
      var _loc = (_currentInteractingWa = currentInteractingWall) === null || _currentInteractingWa === void 0 ? void 0 : _currentInteractingWa.getWorldLocation();
      if (_loc) {
        bot.printLogMessage('[INTERACT] ' + currentInteractingType.toUpperCase() + ' wall at (' + _loc.getX() + ', ' + _loc.getY() + ', ' + _loc.getPlane() + ')');
      }
    }
  }
}
function onStart() {
  bot.printLogMessage('AutoTears started - Tracking Tears of Guthix walls');
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
}
function onGameTick() {
  var player = client.getLocalPlayer();
  if (!player) return;
  var currentTick = client.getTickCount();
  if (currentTick % 5 === 0) {
    minigameActive = isMinigameActive();
    if (!minigameActive) {
      var timeRemaining = parseTimerSeconds();
      bot.printLogMessage('[TIMER] Minigame ended! Time remaining: ' + timeRemaining + 's');
      return;
    }
  }
  trackWallChanges();
  updateInteractionState();
  if (!scriptInitialized) {
    if (!junaDialogCompleted) {
      talkToJuna();
      return;
    }
    var isPlayerMoving = bot.localPlayerMoving();
    if (isPlayerMoving) {
      lastPlayerMovementState = true;
      playerStoppedMovingTicks = 0;
      return;
    }
    if (lastPlayerMovementState) {
      playerStoppedMovingTicks++;
      if (playerStoppedMovingTicks >= 1) {
        scriptInitialized = true;
        bot.printLogMessage('[INIT] Player stopped moving, starting wall interactions');
        return;
      }
    }
    return;
  }
  if (currentTick % 10 === 0 && wallSpawnHistory.length > 0) {
    var avgDuration = getAverageWallDuration();
    bot.printLogMessage('[STATUS] Blue: ' + blueWallCount + ' | Green: ' + greenWallCount + ' | Avg duration: ' + avgDuration.toFixed(1) + ' ticks | History: ' + wallSpawnHistory.length);
  }
  if (minigameActive) {
    interactWithBlueWall();
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
        bot.printLogMessage('[WAIT] Player animation stopped, ready for next wall');
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
    bot.printLogMessage('[CLICK] Clicking blue wall at (' + wallLoc.getX() + ', ' + wallLoc.getY() + ')');
    lastClickedWallKey = wallKey;
    waitingForPlayerAnimation = true;
    lastPlayerAnimation = player.getAnimation();
  }
}
function onEnd() {
  bot.printLogMessage('AutoTears stopped');
}


function onStart() {
  log.printGameMessage('=== WorldPoint Instance Conversion Test ===');
  var player = client.getLocalPlayer();
  if (player) {
    var playerLoc = player.getWorldLocation();
    log.printGameMessage("Player Location: ".concat(playerLoc.getX(), ", ").concat(playerLoc.getY(), ", ").concat(playerLoc.getPlane()));
    log.printGameMessage("Player Region ID: ".concat(playerLoc.getRegionID()));
  }
  var worldView = client.getTopLevelWorldView();
  var scene = worldView.getScene();
  var instanceTemplateChunks = scene.getInstanceTemplateChunks();
  var isInstance = instanceTemplateChunks !== null && instanceTemplateChunks.length > 0;
  log.printGameMessage("Is Instance: ".concat(isInstance));
  log.printGameMessage('');
  var trueWorldCoords = [{
    x: 1978,
    y: 5699,
    plane: 1
  }, {
    x: 1978,
    y: 5703,
    plane: 1
  }];
  trueWorldCoords.forEach((coord, index) => {
    log.printGameMessage("\n--- Converting True World Point ".concat(index + 1, ": (").concat(coord.x, ", ").concat(coord.y, ", ").concat(coord.plane, ") ---"));
    var trueWorldPoint = new net.runelite.api.coords.WorldPoint(coord.x, coord.y, coord.plane);
    var instancePoints = net.runelite.api.coords.WorldPoint.toLocalInstance(worldView, trueWorldPoint);
    var instanceArray = instancePoints.toArray();
    log.printGameMessage("Found ".concat(instanceArray.length, " instance occurrence(s)"));
    if (instanceArray.length === 0) {
      log.printGameMessage('ERROR: No instance coordinates found (tile not in current instance)');
    } else {
      instanceArray.forEach((instancePoint, i) => {
        log.printGameMessage("Instance Point ".concat(i + 1, ": (").concat(instancePoint.getX(), ", ").concat(instancePoint.getY(), ", ").concat(instancePoint.getPlane(), ")"));
      });
      if (instanceArray.length === 1) {
        log.printGameMessage('✓ Use this instance coordinate for navigation');
      } else {
        log.printGameMessage('⚠ Multiple occurrences found - choose the appropriate one');
      }
    }
  });
  log.printGameMessage('\n=== Test Complete ===');
  log.printGameMessage('Summary: Use WorldPoint.toLocalInstance(worldView, trueWorldPoint)');
  log.printGameMessage('to convert static world coordinates to instance coordinates.');
}
function onEnd() {
  log.printGameMessage('Executed JS onEnd Method');
}
function onGameTick() {}
function onNpcAnimationChanged(npc) {}
function onActorDeath(actor) {}
function onHitsplatApplied(actor, hitsplat) {}
function onInteractingChanged(sourceActor, targetActor) {}
function onChatMessage(type, name, message) {}
function onNetworkMessage(sender, message) {}


import { logger } from '../../../imports/logger.js';
import { clickBlueWall, trackWallCycle } from '../../tear-utils.js';
import { state } from '../script-state.js';
import { getTickContext } from '../script-utils.js';

export const ClickBlueTears = (): void => {
	const tickContext = getTickContext();
	if (!tickContext) return;

	trackWallCycle();
	const clickedTile = clickBlueWall();
	if (clickedTile) {
		logger(
			state,
			'debug',
			'click_blue_tears',
			`Clicked tile: (${clickedTile.getX()}, ${clickedTile.getY()})`,
		);
	}
};

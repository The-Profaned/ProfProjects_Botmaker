import { logBank } from '../logging.js';
import { state, MainStates } from '../script-state.js';

export const MovingToBank = (): void => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	logBank('Opening bank...');
	bot.bank.open();
	state.mainState = MainStates.OPENING_BANK;
};

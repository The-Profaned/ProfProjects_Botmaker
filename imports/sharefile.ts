quickBanking: (
		state: State,
		initialInventory: Record<number, { itemId: number; quantity: number }>,
		progress: QuickBankingProgress,
		failResetState?: string,
	): boolean => {
		if (!progress.initialized) {
			const deposited: boolean = bankFunctions.depositItemsTimeout.all(
				state,
				failResetState,
			);
			if (!deposited) return false;

			const requiredItems: { id: number; quantity: number }[] = [];
			progress.slots = [];

			for (let slot: number = 0; slot < 28; slot++) {
				const item = initialInventory[slot];
				if (!item) continue;

				requiredItems.push({
					id: item.itemId,
					quantity: item.quantity,
				});
				progress.slots.push(slot);
			}

			if (bankFunctions.anyQuantityLowInBank(requiredItems)) {
				logger(
					state,
					'all',
					'bankFunctions.quickBanking',
					'No more required items, resupply before you start again',
				);
				bot.terminate();
				return false;
			}

			progress.index = 0;
			progress.initialized = true;
		}

		// Wait for banking dialog to close before continuing
		if (bot.bank.isBanking()) {
			logger(
				state,
				'debug',
				'bankFunctions.quickBanking',
				'Waiting for banking dialog to close',
			);
			return false;
		}

		let itemsProcessed: number = 0;
		const allowedThisTick: number = 3;

		// Bank withdraw loop
		while (
			progress.index < progress.slots.length &&
			itemsProcessed < allowedThisTick
		) {
			const slot: number = progress.slots[progress.index];
			const item = initialInventory[slot];

			progress.index++;

			if (!item) continue;

			const quantity: number = item.quantity;
			const isStandardQuantity: boolean =
				quantity === 1 || quantity === 5 || quantity === 10;

			// If quantity isn't 1/5/10, initiate withdraw and let isBanking() handle the dialog
			if (!isStandardQuantity) {
				bot.bank.withdrawQuantityWithId(item.itemId, quantity);
				return false;
			}

			bot.bank.withdrawQuantityWithId(item.itemId, quantity);

			const itemPresent: boolean =
				inventoryFunctions.itemInventoryTimeout.present(
					state,
					item.itemId,
					failResetState,
				);

			if (!itemPresent) {
				logger(
					state,
					'all',
					'bankFunctions.quickBanking',
					'No more required items, resupply before you start again',
				);
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
};
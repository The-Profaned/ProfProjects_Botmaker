/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2022, Adam <Adam@sigterm.info>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.api {
	export class HitsplatID {
		static readonly BLOCK_ME = 12;
		static readonly BLOCK_OTHER = 13;
		static readonly DAMAGE_ME = 16;
		static readonly DAMAGE_OTHER = 17;
		static readonly POISON = 65;
		static readonly DISEASE = 4;
		static readonly VENOM = 5;
		static readonly HEAL = 6;
		static readonly CYAN_UP = 11;
		static readonly CYAN_DOWN = 15;
		static readonly DAMAGE_ME_CYAN = 18;
		static readonly DAMAGE_OTHER_CYAN = 19;
		static readonly DAMAGE_ME_ORANGE = 20;
		static readonly DAMAGE_OTHER_ORANGE = 21;
		static readonly DAMAGE_ME_YELLOW = 22;
		static readonly DAMAGE_OTHER_YELLOW = 23;
		static readonly DAMAGE_ME_WHITE = 24;
		static readonly DAMAGE_OTHER_WHITE = 25;
		static readonly DAMAGE_MAX_ME = 43;
		static readonly DAMAGE_MAX_ME_CYAN = 44;
		static readonly DAMAGE_MAX_ME_ORANGE = 45;
		static readonly DAMAGE_MAX_ME_YELLOW = 46;
		static readonly DAMAGE_MAX_ME_WHITE = 47;
		static readonly DAMAGE_ME_POISE = 53;
		static readonly DAMAGE_OTHER_POISE = 54;
		static readonly DAMAGE_MAX_ME_POISE = 55;
		static readonly CORRUPTION = 0;
		static readonly PRAYER_DRAIN = 60;
		static readonly BLEED = 67;
		static readonly SANITY_DRAIN = 71;
		static readonly SANITY_RESTORE = 72;
	}
}

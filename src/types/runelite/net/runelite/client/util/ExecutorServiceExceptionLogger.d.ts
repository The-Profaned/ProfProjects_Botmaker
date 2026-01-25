/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Tomas Slusny <slusnucky@gmail.com>
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
declare namespace net.runelite.client.util {
/**
 * Wrapper for ${@link ScheduledExecutorService} that will log all uncaught exceptions as warning to console
 */
export class ExecutorServiceExceptionLogger implements ScheduledExecutorService
{
	private static monitor(command: Runnable): Runnable;
	private static monitor(command: Callable<V>): Callable<V>;
	submit(task: Callable<T>): Future<T>;
	submit(task: Runnable, result: T): Future<T>;
	submit(task: Runnable): Future<?>;
	execute(command: Runnable): void;
	// Everything below is direct proxy to provided executor service
	shutdown(): void;
	shutdownNow(): Array<Runnable>;
	isShutdown(): boolean;
	isTerminated(): boolean;
	awaitTermination(timeout: number, unit: TimeUnit): boolean;
	invokeAll(tasks: any): List<Future<T>>;
	invokeAll(tasks: any, timeout: number, unit: TimeUnit): List<Future<T>>;
	invokeAny(tasks: any): T;
	invokeAny(tasks: any, timeout: number, unit: TimeUnit): T;
	schedule(command: Runnable, delay: number, unit: TimeUnit): ScheduledFuture<?>;
	schedule(callable: Callable<V>, delay: number, unit: TimeUnit): ScheduledFuture<V>;
	scheduleAtFixedRate(command: Runnable, initialDelay: number, period: number, unit: TimeUnit): ScheduledFuture<?>;
	scheduleWithFixedDelay(command: Runnable, initialDelay: number, delay: number, unit: TimeUnit): ScheduledFuture<?>;
}
}
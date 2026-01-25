/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.gpu {
export class GpuPlugin extends Plugin implements DrawCallbacks
{
	// This is the maximum number of triangles the compute shaders support
static ComputeMode =
{
NONE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
OPENGL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
OPENCL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
}
	/**
	 * number of models in small buffer
	 */
	/**
	 * number of models in large buffer
	 */
	/**
	 * offset in the target buffer for model
	 */
	/**
	 * offset into the temporary scene vertex buffer
	 */
	/**
	 * offset into the temporary scene uv buffer
	 */
	// Uniforms
	private startUp(): void;
				// lwjgl defaults to lwjgl- + user.name, but this breaks if the username would cause an invalid path
				// to be created.
						//	GLDebugEvent[ id 0x20071
						//		type Warning: generic
						//		severity Unknown (0x826b)
						//		source GL API
						//		msg Buffer detailed info: Buffer object 11 (bound to GL_ARRAY_BUFFER_ARB, and GL_SHADER_STORAGE_BUFFER (4), usage hint is GL_STREAM_DRAW) will use VIDEO memory as the source for buffer object operations.
						//	GLDebugMessageHandler: GLDebugEvent[ id 0x20052
						//		type Warning: implementation dependent performance
						//		severity Medium: Severe performance/deprecation/other warnings
						//		source GL API
						//		msg Pixel-path performance warning: Pixel transfer is synchronized with 3D rendering.
				// force rebuild of main buffer provider to enable alpha channel
	private shutDown(): void;
			// this must shutdown after the clgl buffers are freed
			// force main buffer provider rebuild to turn off alpha channel
	provideConfig(configManager: ConfigManager): GpuPluginConfig;
	onConfigChanged(configChanged: ConfigChanged): void;
	private setupSyncMode(): void;
		// Without unlocked fps, the client manages sync on its 20ms timer
	private createTemplate(threadCount: number, facesPerThread: number): Template;
	private initProgram(): void;
	private initUniforms(): void;
	private shutdownProgram(): void;
	private initVao(): void;
		// Create compute VAO
		// Create temp VAO
		// Create UI VAO
		// Create UI buffer
			// positions     // texture coords
		// position attribute
		// texture coord attribute
		// unbind VBO
	private shutdownVao(): void;
	private initBuffers(): void;
	private initGlBuffer(glBuffer: GLBuffer): void;
	private shutdownBuffers(): void;
	private destroyGlBuffer(glBuffer: GLBuffer): void;
	private initInterfaceTexture(): void;
	private shutdownInterfaceTexture(): void;
	private initUniformBuffer(): void;
	private initFbo(width: number, height: number, aaSamples: number): void;
		// Create and bind the FBO
		// Create color render buffer
		// Reset
	private shutdownFbo(): void;
	drawScene(cameraX: number, cameraY: number, cameraZ: number, cameraPitch: number, cameraYaw: number, plane: number): void;
		// Only reset the target buffer offset right before drawing the scene. That way if there are frames
		// after this that don't involve a scene draw, like during LOADING/HOPPING/CONNECTION_LOST, we can
		// still redraw the previous frame's scene to emulate the client behavior of not painting over the
		// viewport buffer.
		// UBO.
		// We can reuse the vertex buffer since it isn't used yet.
	postDrawScene(): void;
			// Upload buffers
		// Upload buffers
		// temp buffers
		// model buffers
		// Output buffers
			// The docs for clEnqueueAcquireGLObjects say all pending GL operations must be completed before calling
			// clEnqueueAcquireGLObjects, and recommends calling glFinish() as the only portable way to do that.
			// However no issues have been observed from not calling it, and so will leave disabled for now.
			// GL43C.glFinish();
		/*
		 * Compute is split into three separate programs: 'unordered', 'small', and 'large'
		 * to save on GPU resources. Small will sort <= 512 faces, large will do <= 6144.
		 */
		// Bind UBO to compute programs
		// unordered
		// small
		// large
	drawScenePaint(scene: Scene, paint: SceneTilePaint, plane: number, tileX: number, tileY: number): void;
	drawSceneTileModel(scene: Scene, model: SceneTileModel, tileX: number, tileY: number): void;
	private prepareInterfaceTexture(canvasWidth: number, canvasHeight: number): void;
	draw(overlayColor: number): void;
		// Setup FBO and anti-aliasing
			// Re-create fbo
				// Bind default FBO to check whether anti-aliasing is forced
		// Clear scene
		// Draw 3d scene
				// lazy init textures as they may not be loaded at plugin start.
				// this will return -1 and retry if not all textures are loaded yet, too.
					// if texture upload is successful, compute and set texture animations
			// Setup anisotropic filtering
				// Pad the viewport a little because having ints for our viewport dimensions can introduce off-by-one errors.
				// Ceil the sizes because even if the size is 599.1 we want to treat it as size 600 (i.e. render to the x=599 pixel).
				// Floor the offsets because even if the offset is 4.9, we want to render to the x=4 pixel anyway.
			// Brightness happens to also be stored in the texture provider, so we use that
				// avoid textures animating during loading
			// Calculate projection matrix
			// Bind uniforms
			// We just allow the GL to do face culling. Note this requires the priority renderer
			// to have logic to disregard culled faces in the priority depth testing.
			// Enable blending for alpha
			// Draw buffers
					// Before reading the SSBOs written to from postDrawScene() we must insert a barrier
					// Wait for the command queue to finish, so that we know the compute is done
				// Draw using the output buffer of the compute
				// Only use the temporary buffers, which will contain the full scene
		// Blit FBO
			// Reset
		// Texture on UI
			// this is always fatal
				// this might be AWT shutting down on VM shutdown, ignore it
	private drawUi(overlayColor: number, canvasHeight: number, canvasWidth: number): void;
		// Use the texture bound in the first pass
		// Set the sampling function used when stretching the UI.
		// This is probably better done with sampler objects instead of texture parameters, but this is easier and likely more portable.
		// See https://www.khronos.org/opengl/wiki/Sampler_Object for details.
		// GL_NEAREST makes sampling for bicubic/xBR simpler, so it should be used whenever linear isn't
		// Texture on UI
		// Reset
	/**
	 * Convert the front framebuffer to an Image
	 *
	 * @return
	 */
	private screenshot(): Image;
	animate(texture: Texture, diff: number): void;
		// texture animation happens on gpu
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
			// Avoid drawing the last frame's buffer during LOADING after LOGIN_SCREEN
	loadScene(scene: Scene): void;
	private uploadTileHeights(scene: Scene): void;
		// bind to texture 2
	swapScene(scene: Scene): void;
	tileInFrustum(scene: Scene, pitchSin: number, pitchCos: number, yawSin: number, yawCos: number, cameraX: number, cameraY: number, cameraZ: number, plane: number, msx: number, msy: number): boolean;
			// left && right
				// top
					// we don't test the bottom so we don't have to find the height of all the models on the tile
	/**
	 * Check is a model is visible and should be drawn.
	 */
	private isVisible(model: Model, pitchSin: number, pitchCos: number, yawSin: number, yawCos: number, x: number, y: number, z: number): boolean;
	/**
	 * Draw a renderable in the scene
	 */
	draw(projection: Projection, scene: Scene, renderable: Renderable, orientation: number, x: number, y: number, z: number, hash: number): void;
			// Apply height to renderable from the model
		// Model may be in the scene buffer
			// Temporary model (animated or otherwise not a static Model on the scene)
			// Apply height to renderable from the model
	/**
	 * returns the correct buffer based on triangle count and updates model count
	 *
	 * @param triangles
	 * @return
	 */
	private bufferForTriangles(triangles: number): GpuIntBuffer;
	private getScaledValue(scale: number, value: number): number;
	private glDpiAwareViewport(x: number, y: number, width: number, height: number): void;
	private getDrawDistance(): number;
	private updateBuffer(glBuffer: GLBuffer, target: number, data: IntBuffer, usage: number, clFlags: number): void;
	private updateBuffer(glBuffer: GLBuffer, target: number, data: FloatBuffer, usage: number, clFlags: number): void;
	private updateBuffer(glBuffer: GLBuffer, target: number, size: number, usage: number, clFlags: number): void;
			// https://www.khronos.org/opengl/wiki/Buffer_Object_Streaming suggests buffer re-specification is useful
			// to avoid implicit synching. We always need to trash the whole buffer anyway so this can't hurt.
	private static nextPowerOfTwo(v: number): number;
	private recreateCLBuffer(glBuffer: GLBuffer, clFlags: number): void;
	private checkGLErrors(): void;
}
}
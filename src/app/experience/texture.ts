import { type Injector } from '@angular/core';
import { injectNgtStore } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import { assertInjector } from 'ngxtension/assert-injector';
import type { Texture } from 'three';

export function injectTexture(path: () => string, withOnLoad = true, injector?: Injector) {
	return assertInjector(injectTexture, injector, () => {
		const store = injectNgtStore();
		const getMaxAnisotropy = store.get('gl', 'capabilities', 'getMaxAnisotropy');

		const onLoad = withOnLoad
			? (texture: Texture | Texture[]) => ((texture as Texture).anisotropy = getMaxAnisotropy())
			: () => {};

		return injectNgtsTextureLoader(path, { onLoad, injector });
	});
}

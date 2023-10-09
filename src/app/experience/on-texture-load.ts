import { runInInjectionContext, type Injector } from '@angular/core';
import { injectNgtStore } from 'angular-three';
import { assertInjector } from 'ngxtension/assert-injector';
import type { Texture } from 'three';

export function injectOnTextureLoad(injector?: Injector) {
	injector = assertInjector(injectOnTextureLoad, injector);
	return runInInjectionContext(injector, () => {
		const store = injectNgtStore();
		const getMaxAnisotropy = store.get('gl', 'capabilities', 'getMaxAnisotropy');
		return (texture: Texture | Texture[]) => ((texture as Texture).anisotropy = getMaxAnisotropy());
	});
}

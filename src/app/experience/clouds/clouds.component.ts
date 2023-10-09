import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs, injectNgtStore } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import type { Mesh, Texture } from 'three';
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from '../../constants';

@Component({
	selector: 'app-clouds',
	standalone: true,
	templateUrl: './clouds.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Clouds {
	EARTH_RADIUS = EARTH_RADIUS;
	EARTH_FRAGMENTS = EARTH_FRAGMENTS;

	private store = injectNgtStore();
	private getMaxAnisotropy = this.store.get(
		'gl',
		'capabilities',
		'getMaxAnisotropy',
	);

	cloudsMap = injectNgtsTextureLoader(() => PATHS.clouds, {
		onLoad: (texture) => {
			(texture as Texture).anisotropy = this.getMaxAnisotropy();
		},
	});

	onBeforeRender(mesh: Mesh) {
		mesh.rotation.x += 0.00001;
		mesh.rotation.y += 0.00001;
	}
}

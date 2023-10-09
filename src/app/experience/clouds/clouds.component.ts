import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import type { Mesh } from 'three';
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from '../../constants';
import { injectOnTextureLoad } from '../on-texture-load';

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

	private onLoad = injectOnTextureLoad();

	cloudsMap = injectNgtsTextureLoader(() => PATHS.clouds, { onLoad: this.onLoad });

	onBeforeRender(mesh: Mesh) {
		mesh.rotation.x += 0.00001;
		mesh.rotation.y += 0.00001;
	}
}

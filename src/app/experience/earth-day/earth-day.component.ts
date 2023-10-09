import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs, injectNgtStore } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import type { Texture } from 'three';
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from '../../constants';

@Component({
	selector: 'app-earth-day',
	standalone: true,
	templateUrl: './earth-day.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EarthDay {
	Math = Math;
	EARTH_RADIUS = EARTH_RADIUS;
	EARTH_FRAGMENTS = EARTH_FRAGMENTS;

	private store = injectNgtStore();
	private getMaxAnisotropy = this.store.get(
		'gl',
		'capabilities',
		'getMaxAnisotropy',
	);
	private onTextureLoad = {
		onLoad: (texture: Texture | Texture[]) => {
			(texture as Texture).anisotropy = this.getMaxAnisotropy();
		},
	};

	day = injectNgtsTextureLoader(() => PATHS.earthMap, this.onTextureLoad);
	bump = injectNgtsTextureLoader(() => PATHS.bumpMap, this.onTextureLoad);
	specular = injectNgtsTextureLoader(
		() => PATHS.specularMap,
		this.onTextureLoad,
	);
}

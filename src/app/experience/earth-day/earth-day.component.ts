import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from '../../constants';
import { injectOnTextureLoad } from '../on-texture-load';

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

	private onLoad = injectOnTextureLoad();

	day = injectNgtsTextureLoader(() => PATHS.earthMap, { onLoad: this.onLoad });
	bump = injectNgtsTextureLoader(() => PATHS.bumpMap, { onLoad: this.onLoad });
	specular = injectNgtsTextureLoader(() => PATHS.specularMap, { onLoad: this.onLoad });
}

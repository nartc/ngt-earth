import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from '../../constants';
import { injectTexture } from '../texture';

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

	day = injectTexture(() => PATHS.earthMap);
	bump = injectTexture(() => PATHS.bumpMap);
	specular = injectTexture(() => PATHS.specularMap);
}

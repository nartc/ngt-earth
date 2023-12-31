import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, afterNextRender, type Signal } from '@angular/core';
import { extend, injectNgtStore } from 'angular-three';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import * as THREE from 'three';
import { applySunCoords, type LatLngLiteral } from '../utils';
import { Clouds } from './clouds/clouds.component';
import { EarthDay } from './earth-day/earth-day.component';
import { EarthNight } from './earth-night/earth-night.component';
import { Halo } from './halo/halo.component';
import { Lights } from './lights/lights.component';

extend(THREE);

export const [injectLightPosition, provideLightPosition] = createInjectionToken(() => new THREE.Vector3());

@Component({
	standalone: true,
	templateUrl: './experience.component.html',
	imports: [EarthDay, Lights, Clouds, Halo, EarthNight],
	providers: [provideLightPosition()],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Experience {
	@Input() sunCoordsRef!: ElementRef<LatLngLiteral>;
	@Input() time!: Signal<number>;

	private store = injectNgtStore();

	constructor() {
		afterNextRender(() => {
			this.store.get('camera').position.set(-2.3, 2, 0);
			applySunCoords(new Date(this.time()), this.sunCoordsRef);
		});
	}
}

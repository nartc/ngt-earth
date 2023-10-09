import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	ElementRef,
	Input,
	afterNextRender,
	type Signal,
} from '@angular/core';
import { extend, injectNgtStore } from 'angular-three';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import * as THREE from 'three';
import { getSunCoords, type LatLngLiteral } from '../utils';
import { Clouds } from './clouds/clouds.component';
import { EarthDay } from './earth-day/earth-day.component';
import { EarthNight } from './earth-night/earth-night.component';
import { Halo } from './halo/halo.component';
import { Lights } from './lights/lights.component';

extend(THREE);

export const [injectExperienceApi, provideExperienceApi] = createInjectionToken(
	() => ({
		lightPosition: new THREE.Vector3(),
	}),
);

@Component({
	standalone: true,
	templateUrl: './experience.component.html',
	imports: [EarthDay, Lights, Clouds, Halo, EarthNight],
	providers: [provideExperienceApi()],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Experience {
	@Input() sunCoordsRef!: ElementRef<LatLngLiteral>;
	@Input() time!: Signal<number>;

	private store = injectNgtStore();

	constructor() {
		afterNextRender(() => {
			this.store.get('camera').position.set(-2.3, 2, 0);

			const { lat, lng } = getSunCoords(new Date(this.time()));
			this.sunCoordsRef.nativeElement.lat = lat;
			this.sunCoordsRef.nativeElement.lng = lng;
		});
	}
}

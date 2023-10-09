import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, afterNextRender } from '@angular/core';
import { injectBeforeRender, injectNgtRef } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { DirectionalLight, Group, MathUtils } from 'three';
import { EARTH_RADIUS } from '../../constants';
import type { LatLngLiteral } from '../../utils';
import { injectExperienceApi } from '../experience.component';

const LIGHT_OFFSET = EARTH_RADIUS * 2;

@Component({
	selector: 'app-lights',
	standalone: true,
	templateUrl: './lights.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [NgtsOrbitControls],
})
export class Lights {
	MathUtils = MathUtils;
	EARTH_RADIUS = EARTH_RADIUS;

	@Input() sunCoordsRef!: ElementRef<LatLngLiteral>;

	lightGroupRef = injectNgtRef<Group>();
	lightRef = injectNgtRef<DirectionalLight>();

	private api = injectExperienceApi();

	constructor() {
		afterNextRender(() => {
			this.lightRef.nativeElement.position.set(
				-LIGHT_OFFSET,
				LIGHT_OFFSET * (this.sunCoordsRef.nativeElement.lat / 45),
				0,
			);

			this.lightGroupRef.nativeElement.rotation.y = MathUtils.degToRad(this.sunCoordsRef.nativeElement.lng);
		});

		injectBeforeRender(() => {
			const [light, lightGroup] = [this.lightRef.nativeElement, this.lightGroupRef.nativeElement];
			if (!light || !lightGroup) return;
			light.position.y = LIGHT_OFFSET * (this.sunCoordsRef.nativeElement.lat / 45);
			lightGroup.rotation.y = MathUtils.degToRad(this.sunCoordsRef.nativeElement.lng);
			light.getWorldPosition(this.api.lightPosition);
		});
	}
}

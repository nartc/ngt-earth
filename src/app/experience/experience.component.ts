import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { extend, type NgtBeforeRenderEvent } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
	standalone: true,
	templateUrl: './experience.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Experience {
	onBeforeRender({
		object,
		state: { delta },
	}: NgtBeforeRenderEvent<THREE.Mesh>) {
		object.rotation.x += delta * 0.75;
		object.rotation.y += delta * 0.75;
	}
}

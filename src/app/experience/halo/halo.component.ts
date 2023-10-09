import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	Input,
	computed,
	inject,
	signal,
} from '@angular/core';
import { NgtArgs } from 'angular-three';
import {
	BackSide,
	Color,
	ShaderMaterial,
	type ColorRepresentation,
} from 'three';
import { EARTH_FRAGMENTS, EARTH_RADIUS } from '../../constants';

const haloShader = {
	vertexShader: `
    varying vec3 vVertexWorldPosition;
    varying vec3 vVertexNormal;
  
    void main() {
  
        vVertexNormal = normalize(normalMatrix * normal);
        vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
        // set gl_Position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
	fragmentShader: `
    uniform vec3 glowColor;
    uniform float coeficient;
    uniform float power;

    varying vec3 vVertexNormal;
    varying vec3 vVertexWorldPosition;

    void main() {
        vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
        vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
        viewCameraToVertex = normalize(viewCameraToVertex);
        float intensity =
        pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);

        gl_FragColor = vec4(glowColor, intensity * 0.4  );
    }`,
};

@Component({
	selector: 'app-outer',
	standalone: true,
	templateUrl: './outer.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Outer {
	EARTH_RADIUS = EARTH_RADIUS;
	EARTH_FRAGMENTS = EARTH_FRAGMENTS;

	private halo = inject(Halo);

	material = computed(
		() =>
			new ShaderMaterial({
				vertexShader: haloShader.vertexShader,
				fragmentShader: haloShader.fragmentShader,
				uniforms: {
					coeficient: { value: 0 },
					power: { value: 2.7 },
					glowColor: {
						value: new Color(this.halo.color() || '#6be1ff'),
					},
				},
				side: BackSide,
				transparent: true,
				depthWrite: false,
			}),
	);
}

@Component({
	selector: 'app-inner',
	standalone: true,
	templateUrl: './inner.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Inner {
	EARTH_RADIUS = EARTH_RADIUS;
	EARTH_FRAGMENTS = EARTH_FRAGMENTS;

	private halo = inject(Halo);

	material = computed(
		() =>
			new ShaderMaterial({
				vertexShader: haloShader.vertexShader,
				fragmentShader: haloShader.fragmentShader,
				uniforms: {
					coeficient: { value: 0.8 },
					power: { value: 2 },
					glowColor: {
						value: new Color(this.halo.color() || '#7da4ff'),
					},
				},
				transparent: true,
				depthWrite: true,
			}),
	);
}

@Component({
	selector: 'app-halo',
	standalone: true,
	templateUrl: './halo.component.html',
	imports: [Outer, Inner],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Halo {
	color = signal<ColorRepresentation>('#fff');

	@Input({ alias: 'color' }) set _color(color: ColorRepresentation) {
		this.color.set(color);
	}
}

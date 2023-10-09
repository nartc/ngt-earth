import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, computed, inject, signal } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { BackSide, Color, FrontSide, type ColorRepresentation, type Side } from 'three';
import { EARTH_FRAGMENTS, EARTH_RADIUS } from '../../constants';

const haloShader = {
	vertexShader: /* language=glsl */ `
    varying vec3 vVertexWorldPosition;
    varying vec3 vVertexNormal;
  
    void main() {
  
        vVertexNormal = normalize(normalMatrix * normal);
        vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
        // set gl_Position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
	fragmentShader: /* language=glsl */ `
    uniform vec3 glowColor;
    uniform float coefficient;
    uniform float power;

    varying vec3 vVertexNormal;
    varying vec3 vVertexWorldPosition;

    void main() {
        vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
        vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
        viewCameraToVertex = normalize(viewCameraToVertex);
        float intensity = pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);
        gl_FragColor = vec4(glowColor, intensity * 0.4  );
    }`,
};

@Component({
	selector: 'app-ring',
	standalone: true,
	templateUrl: './ring.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [NgtArgs],
})
export class Ring {
	EARTH_RADIUS = EARTH_RADIUS;
	EARTH_FRAGMENTS = EARTH_FRAGMENTS;

	@Input() scale = 1;
	@Input() radiusRatio = 1;
	@Input() depthWrite = true;
	@Input() side: Side = FrontSide;

	private coefficient = signal(0);
	@Input({ alias: 'coefficient' }) set _coefficient(coefficient: number) {
		this.coefficient.set(coefficient);
	}

	private power = signal(0);
	@Input({ alias: 'power' }) set _power(power: number) {
		this.power.set(power);
	}

	private halo = inject(Halo);

	vertexShader = haloShader.vertexShader;
	fragmentShader = haloShader.fragmentShader;
	uniforms = computed(() => ({
		coefficient: { value: this.coefficient() },
		power: { value: this.power() },
		glowColor: { value: new Color(this.halo.color()) },
	}));
}

@Component({
	selector: 'app-halo',
	standalone: true,
	templateUrl: './halo.component.html',
	imports: [Ring],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Halo {
	BackSide = BackSide;

	color = signal<ColorRepresentation>('#fff');

	@Input({ alias: 'color', required: true }) set _color(color: ColorRepresentation) {
		this.color.set(color);
	}
}

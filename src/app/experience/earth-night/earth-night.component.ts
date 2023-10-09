import { CUSTOM_ELEMENTS_SCHEMA, Component, computed } from '@angular/core';
import { NgtArgs, extend } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import { MeshBasicMaterial, Vector3 } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from '../../constants';
import { injectExperienceApi } from '../experience.component';
import { injectOnTextureLoad } from '../on-texture-load';

extend({ CustomShaderMaterial });

@Component({
	selector: 'app-earth-night',
	standalone: true,
	templateUrl: './earth-night.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EarthNight {
	Math = Math;
	EARTH_RADIUS = EARTH_RADIUS;
	EARTH_FRAGMENTS = EARTH_FRAGMENTS;

	private api = injectExperienceApi();
	private onLoad = injectOnTextureLoad();

	private v = new Vector3();

	private day = injectNgtsTextureLoader(() => PATHS.earthMap);
	private night = injectNgtsTextureLoader(() => PATHS.earthNight, { onLoad: this.onLoad });

	materialArgs = computed(() => [
		{
			uniforms: {
				uDay: { value: this.day() || undefined },
				uNight: { value: this.night() || undefined },
				uLight: { value: this.v.setScalar(2) },
			},
			vertexShader: `
        uniform vec3 uLight;
        varying vec2 vUv2;
        varying float vDist;

        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        float normalize2(in float v) {
            return map(v, -1.0, 1.0, 0.0, 1.0);
        }

        void main() {
            vUv2 = uv;
            vDist = clamp(pow(normalize2(dot(normalize(uLight) * vec3(-1.5, 1., -1.) , position) * ${
				1 / (EARTH_RADIUS / 4)
			}), 0.5), 0., 1.);
        }`,
			fragmentShader: `
        uniform sampler2D uNight;
        uniform vec3 uLight;
        varying vec2 vUv2;
        varying float vDist;

        void main() {
            vec4 texNight = texture2D(uNight, vUv2);
            vec4 clear = vec4(0, 0, 0, 0);
            vec4 d = mix(texNight, clear, pow(vDist, 2.));
            csm_DiffuseColor = d;
        }`,
			baseMaterial: MeshBasicMaterial,
			transparent: true,
		},
	]);

	onBeforeRender(material: CustomShaderMaterial) {
		material.uniforms['uLight'].value = this.api.lightPosition;
	}
}

import { Component, ElementRef, computed, signal } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Controls } from './controls/controls.component';
import { Experience } from './experience/experience.component';
import { getSunCoords, type LatLngLiteral } from './utils';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NgtCanvas, Controls],
	template: `
		<div class="wrapper">
			<div class="scene">
				<div class="globe">
					<ngt-canvas
						[sceneGraph]="scene"
						[sceneGraphInputs]="{ sunCoordsRef, time }"
					/>
				</div>
			</div>
			<app-controls
				class="controls"
				style="display: block;"
				[time]="time"
				[previousOffsetRef]="offsetRef"
				[onChangeOffset]="onChangeOffset"
			/>
		</div>
	`,
})
export class AppComponent {
	scene = Experience;

	private offset = signal(0);
	time = computed(() => Date.now() + this.offset());

	onChangeOffset = (offset: number) => {
		this.offset.set(offset);
		const { lat, lng } = getSunCoords(new Date(Date.now() + offset));
		this.sunCoordsRef.nativeElement.lat = lat;
		this.sunCoordsRef.nativeElement.lng = lng;
	};
	offsetRef = new ElementRef<number>(null!);
	sunCoordsRef = new ElementRef<LatLngLiteral>({ lat: 0, lng: 0 });
}

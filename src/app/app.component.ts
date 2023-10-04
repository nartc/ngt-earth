import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './experience/experience.component';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, NgtCanvas],
	template: `
		<ngt-canvas [sceneGraph]="scene" />
	`,
	styles: [],
})
export class AppComponent {
	scene = Experience;
	title = 'ngt-earth';
}

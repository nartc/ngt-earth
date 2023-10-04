import { Component, inject } from '@angular/core';
import { ControlsSharedInputs } from '../controls-shared-inputs';

@Component({
	selector: 'app-ticker-minimal',
	standalone: true,
	templateUrl: './ticker-minimal.component.html',
})
export class TickerMinimal {
	sharedInputs = inject(ControlsSharedInputs);
}

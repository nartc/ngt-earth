import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	ViewChild,
	effect,
	type Signal,
} from '@angular/core';
import { ControlsSharedInputs } from './controls-shared-inputs';
import { TickerMinimal } from './ticker-minimal/ticker-minimal.component';

@Component({
	selector: 'app-controls',
	standalone: true,
	imports: [TickerMinimal],
	templateUrl: './controls.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: ControlsSharedInputs, useExisting: Controls }],
})
export class Controls extends ControlsSharedInputs {
	@Input({ required: true }) time!: Signal<number>;
	@ViewChild('time', { static: true }) timeDiv!: ElementRef<HTMLDivElement>;

	constructor() {
		super();
		effect(() => {
			const time = this.timeStampToTime(this.time());
			this.timeDiv.nativeElement.innerHTML = `${time.hours}:${time.minutes}`;
		});
	}

	private timeStampToTime(timestamp: number) {
		const date = new Date(timestamp);
		const hours = date.getHours();
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const amOrPm = hours >= 12 ? 'PM' : 'AM';
		return { hours, minutes, amOrPm };
	}
}

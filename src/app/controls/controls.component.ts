import {
	ChangeDetectionStrategy,
	Component,
	Input,
	Pipe,
	PipeTransform,
} from '@angular/core';
import { ControlsSharedInputs } from './controls-shared-inputs';

@Pipe({ name: 'timestamp', standalone: true })
export class TimeStampPipe implements PipeTransform {
	transform(value: number) {
		const time = this.timeStampToTime(value);
		return `${time.hours}:${time.minutes}`;
	}

	private timeStampToTime(timestamp: number) {
		const date = new Date(timestamp);
		const hours = date.getHours();
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const amOrPm = hours >= 12 ? 'PM' : 'AM';
		return { hours, minutes, amOrPm };
	}
}

@Component({
	selector: 'app-controls',
	standalone: true,
	imports: [TimeStampPipe],
	templateUrl: './controls.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: ControlsSharedInputs, useExisting: Controls }],
})
export class Controls extends ControlsSharedInputs {
	@Input() time = 0;
}

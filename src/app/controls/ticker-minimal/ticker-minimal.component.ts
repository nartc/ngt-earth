import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { injectDrag, type NgxDragState } from 'ngxtension/gestures';
import { PX_PER_DAY } from '../../constants';
import { msToPx, pxToMs } from '../../utils';
import { ControlsSharedInputs } from '../controls-shared-inputs';
import { TickerLine } from './ticker-line/ticker-line.component';

@Component({
	selector: 'app-ticker-minimal',
	standalone: true,
	templateUrl: './ticker-minimal.component.html',
	host: { class: 'ticker-controls' },
	imports: [TickerLine],
})
export class TickerMinimal {
	@ViewChild('tickerSets', { static: true })
	private tickerSets!: ElementRef<HTMLDivElement>;

	constructor() {
		const sharedInputs = inject(ControlsSharedInputs);

		injectDrag(
			({ down, movement: [mx] }: NgxDragState) => {
				const deltaMs = pxToMs(mx);
				const ms =
					deltaMs + sharedInputs.previousOffsetRef.nativeElement;
				const deltaPx = msToPx(ms);

				this.tickerSets.nativeElement.style.transform = `translateX(${
					deltaPx % PX_PER_DAY
				}px)`;
				sharedInputs.onChangeOffset(-ms);

				if (!down) {
					sharedInputs.previousOffsetRef.nativeElement += deltaMs;
				}
			},
			{ zoneless: true },
		);
	}
}

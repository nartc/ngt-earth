import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { injectDrag } from 'ngxtension/gestures';
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
			({ down, movement: [mx] }) => {
				const { previousOffsetRef, onChangeOffset } = sharedInputs;

				const deltaMs = pxToMs(mx);
				const ms = deltaMs + previousOffsetRef.nativeElement;
				const deltaPx = msToPx(ms);

				this.tickerSets.nativeElement.style.transform = `translateX(${deltaPx % PX_PER_DAY}px)`;
				onChangeOffset(-ms);

				if (!down) {
					previousOffsetRef.nativeElement += deltaMs;
				}
			},
			{ zoneless: true },
		);
	}
}

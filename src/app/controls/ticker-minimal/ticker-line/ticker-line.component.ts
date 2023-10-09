import { Component } from '@angular/core';
import { HATCHES_ALL } from '../../../constants';

@Component({
	selector: 'app-ticker-line',
	standalone: true,
	templateUrl: './ticker-line.component.html',
	host: { class: 'ticker' },
})
export class TickerLine {
	HATCHES_ALL = HATCHES_ALL;
}

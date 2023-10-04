import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HATCHES_ALL } from 'src/app/constants';

@Component({
	selector: 'app-ticker-line',
	standalone: true,
	templateUrl: './ticker-line.component.html',
	styles: [
		`
			:host {
				display: content;
			}
		`,
	],
	imports: [NgFor, NgIf],
})
export class TickerLine {
	HATCHES_ALL = HATCHES_ALL;
}

// <div className="ticker">
//   <div className="ticker-lines">
//     {HATCHES_ALL.map((h) => {
//       const hour = h - 12;
//
//       if (hour === 0) {
//         return <div className="special" key={h} />;
//       }
//
//       if (h % 6 === 0) {
//         return <div className="hour" key={h}></div>;
//       }
//
//       return <div key={h} />;
//     })}
//   </div>
// </div>

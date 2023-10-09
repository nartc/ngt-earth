import type { ElementRef } from '@angular/core';
import * as SunCalc from 'suncalc';
import { LATITUDE_PRECISION, LONGITUDE_PRECISION, MS_PER_DAY, PX_PER_DAY } from './constants';

export const pxToMs = (px: number) => {
	return (px / PX_PER_DAY) * MS_PER_DAY;
};

export const msToPx = (ms: number) => {
	return (ms / MS_PER_DAY) * PX_PER_DAY;
};

export type LatLngLiteral = {
	lat: number;
	lng: number;
};

export const applySunCoords = (date: Date, ref: ElementRef<LatLngLiteral>) => {
	let coords, lng, peak, result, lat;

	result = { lat: 0, lng: 0 };
	lng = -180;
	lat = -90;
	coords = {};
	peak = { altitude: 0, azimuth: 0 };

	while (lng < 180) {
		lat = -90;

		while (lat < 90) {
			coords = SunCalc.getPosition(date, lat, lng);
			if (coords.altitude > peak.altitude) {
				peak = coords;
				result = { lat, lng };
			}
			lat += LATITUDE_PRECISION;
		}

		lng += LONGITUDE_PRECISION;
	}

	ref.nativeElement.lat = result.lat;
	ref.nativeElement.lng = result.lng;
};

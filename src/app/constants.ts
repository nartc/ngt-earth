export const LINES_PER_SET_ALT = 144;
export const HATCHES_ALL = [...Array(LINES_PER_SET_ALT + 1).keys()];

export const SECONDS_IN_ROTATION = 86284;
export const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const PX_PER_DAY = 1400;

export const WEATHER_SERVICE = 'https://meridian-weather-service.vercel.app';

// TODO: – Use avif in supported browsers
export const PATHS = {
	earthMap: 'assets/img/earth-day.jpg',
	bumpMap: 'assets/img/bump-map.jpg',
	specularMap: 'assets/img/specular-map.jpg',
	clouds: 'assets/img/clouds.webp',
	earthNight: 'assets/img/earth-night.jpg',
};

export const BLUR_PX = 48;

export const AUTO_ROTATE_SPEED = 0.03;

export const DEFAULT_ROW_LOCATION_ITEM_WIDTH = 188;
export const DEFAULT_COL_LOCATION_ITEM_WIDTH = 220;
export const NUDGE_DUR_MS = 2000;

export const LOCATION_SEARCH_BAR_HEIGHT = 48;
export const EARTH_RADIUS = 20;
export const EARTH_FRAGMENTS = 64;
export const RETURN_TO_SYNC_MS = 600;

export const DUSK_ANGLE_DEG = 0;
export const ASPECT = 1.5712;

export const LATITUDE_PRECISION = 1;
export const LONGITUDE_PRECISION = 1;

/**
 * @typedef {Object} Difference Represents a difference between two given valid Unix time signatures
 * @property {?number} ms Total number of MS difference
 * @property {?number} days Number of days spanned
 * @property {?number} hours Number of hours spanned after higher units are subtracted
 * @property {?number} minutes Number of minutes spanned after higher units are subtracted
 * @property {?number} secs Number of seconds spanned after higher units are subtracted
 * @property {Function} toString() Returns duration formatted as `# days, # hours, # mins, # secs`
 * @property {Function} toSimplifiedString() Returns duration formatted as `#d #h #m #s`
 */

export type Difference = {
	ms?: number;
	days?: number;
	hours?: number;
	mins?: number;
	secs?: number;
	toString(): string;
	toSimplifiedString?(): string;
};
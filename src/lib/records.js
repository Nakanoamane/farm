import _ from 'lodash';

export const recordsDefault = {
	startAt: null,
	farm: 0,
	cook: 0,
	sell: 0,
	buy: 0,
	income: 0,
	expense: 0,
};

export const countUpRecords = (records, key, value) => {
	const newRecords = _.cloneDeep(records);
	if(newRecords[key] === undefined) {
		newRecords[key] = 0;
	}
	newRecords[key] += value;
	return newRecords;
};
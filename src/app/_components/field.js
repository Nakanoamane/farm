'use client';

import Style from '../../styles/modules/fields.module.scss';
import _ from 'lodash';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	fieldsState,
	itemsState,
	selectedItemState,
	logsState,
	scoreState,
	timeState,
	achievementsState } from '../../lib/state';
import { fieldsOptions, newField } from '../../lib/fields';
import { updateItems } from '../../lib/items';
import { updateAchievements, findLevelAchievement } from '../../lib/achievements';
import { newLogs } from '../../lib/logs';


export default function Field({ rowIndex, cellIndex }) {
	const [fields, setFields] = useRecoilState(fieldsState);
	const field = fields[rowIndex][cellIndex];
	const fieldOption = fieldsOptions[field.field];
	const [items, setItems] = useRecoilState(itemsState);
	const selectedItem = useRecoilValue(selectedItemState);
	const [logs, setLogs] = useRecoilState(logsState);
	const [score, setScore] = useRecoilState(scoreState);
	const time = useRecoilValue(timeState);
	const [achievements, setAchievements] = useRecoilState(achievementsState);

	const changeField = () => {
		setFields(prev => {
			let newFields = _.cloneDeep(prev);
			newFields[rowIndex][cellIndex] = newField(time, fieldOption.items[selectedItem].field);
			return newFields
		});
	}

	const changeItems = (newItems) => {
		setItems(updateItems(items, newItems));
	}

	const addLogs = (newItems) => {
		const add = newLogs(newItems, selectedItem);
		setLogs(add.concat([...logs]));
	}

	const achieve = () => {
		const achievement = findLevelAchievement(achievements, score);
		if(achievement) {
			const newAchievements = updateAchievements(achievements, achievement);
			setAchievements(newAchievements);
		}
	}

	const addScore = (newItems) => {
		let add = 0;
		Object.keys(newItems).forEach((key) => {
			const num = newItems[key];
			if(num > 0) { add += num; }
		});
		if(add > 0) { setScore(score + add); }
	}

	const getAndUseItems = () => {
		const item = fieldOption.items[selectedItem];
		let newItems = {};
		if(item.items) {
			newItems = {...item.items};
		}
		newItems[selectedItem] = -1;

		changeItems(newItems);
		addLogs(newItems);
		addScore(newItems);
		achieve();
	};

	const onCickField =  () => {
		const clickable = items[selectedItem].num !== undefined && items[selectedItem].num <= 0;
		if(clickable || !fieldOption.items || !fieldOption.items[selectedItem] ) return;

		changeField();
		getAndUseItems();
	}

	return (
		<td
			className={`${Style.cell} ${fieldOption.className}`}
			onClick={onCickField}
			></td>
	)
}
'use client';

import Style from '../../styles/modules/controllers.module.scss';

import { format } from 'date-fns';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
	itemsState,
	fieldsState,
	achievementsState,
	timeState,
	moneyState,
	scoreState,
	ingredientsState,
	recordsState,
	saveDataState,
	savedAtState
} from '../../lib/state';
import { STORAGE_KEY, load } from '../../lib/loader';
import { calcLevel } from '../../lib/score';
import { timeStr } from '../../lib/time';

export default function Saver() {
	const [items, setItems] = useRecoilState(itemsState);
	const [fields, setFields] = useRecoilState(fieldsState);
	const [achievements, setAchievements] = useRecoilState(achievementsState);
	const [time, setTime] = useRecoilState(timeState);
	const [money, setMoney] = useRecoilState(moneyState);
	const [score, setScore] = useRecoilState(scoreState);
	const [ingredients, setIngredients] = useRecoilState(ingredientsState);
	const [records, setRecords] = useRecoilState(recordsState);
	const [saveData, setSaveData] = useRecoilState(saveDataState);
	const [savedAt, setSavedAt] = useRecoilState(savedAtState);

	useEffect(() => {
		const loadData = load();
		setSaveData(loadData);
		if(loadData !== null) {
			setSavedAt(loadData.savedAt);
		}
	}, []);

	const onClickLoad = () => {
		const loadData = load();
		setItems(loadData.items);
		setFields(loadData.fields);
		setAchievements(loadData.achievements);
		setTime(loadData.time);
		setMoney(loadData.money);
		setScore(loadData.score);
		setIngredients(loadData.ingredients);
		setRecords(loadData.records);
		setSavedAt(loadData.savedAt);
	};

	const onClickSave = () => {
		const now = Date.now();
		setSavedAt(now);

		const newSaveData = {
			items, fields, achievements, time, money, score,
			ingredients, records, savedAt: now };
		const saveDataJson = JSON.stringify(newSaveData);
		setSaveData(newSaveData);
		localStorage.setItem(STORAGE_KEY, saveDataJson);
	};

	const savedAtEl = () => {
		let text = 'NO SAVE DATA';
		if(savedAt !== null) {
			text = `Saved At : ${format(new Date(savedAt), 'yyyy/MM/dd（eee） HH:mm:ss')}`;
		}
		return <p className={Style.savedAt}>{text}</p>;
	}

	const savedInfoEl = () => {
		if(saveData === null) { return null; }
		const [lv] = calcLevel(saveData.score);
		return (
			<p className={Style.savedText}>
				<span>Lv.{lv}</span>
				<span>Time : {timeStr(saveData.time)}</span>
			</p>
		);
	}

	return (
		<div className={Style.saver}>
			<button className={Style.save} onClick={onClickSave}>Save</button>
			<button className={Style.load} onClick={onClickLoad} disabled={saveData === null}>Load</button>
			<div className={Style.savedInfo}>
				{ savedAtEl() }
				{ savedInfoEl() }
			</div>
		</div>
	);
}
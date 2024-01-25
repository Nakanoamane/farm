'use client';

import Style from '../../styles/modules/shops.module.scss';

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
	saveDataState
} from '../../lib/state';
import { STORAGE_KEY, load } from '../../lib/loader';


export default function Saver() {
	const [items, setItems] = useRecoilState(itemsState);
	const [fields, setFields] = useRecoilState(fieldsState);
	const [achievements, setAchievements] = useRecoilState(achievementsState);
	const [time, setTime] = useRecoilState(timeState);
	const [money, setMoney] = useRecoilState(moneyState);
	const [score, setScore] = useRecoilState(scoreState);
	const [ingredients, setIngredients] = useRecoilState(ingredientsState);
	const [saveData, setSaveData] = useRecoilState(saveDataState);

	const newSaveData = {items, fields, achievements, time, money, score, ingredients};
	const saveDataJson = JSON.stringify(newSaveData);

	useEffect(() => {
		setSaveData(load());
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
	};

	const onClickSave = () => {
		setSaveData(newSaveData);
		localStorage.setItem(STORAGE_KEY, saveDataJson);
	};

	return (
		<div className={Style.saver}>
			<button className={Style.save} onClick={onClickSave}>Save</button>
			<button className={Style.load} onClick={onClickLoad} disabled={saveData === null}>Load</button>
		</div>
	);
}
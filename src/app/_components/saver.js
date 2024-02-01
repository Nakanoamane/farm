'use client';

import Style from '../../styles/modules/controllers.module.scss';

import { format } from 'date-fns';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
	savedAtState,
	selectedShopState,
	saveConfirmState,
	loadConfirmState
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
	const selectedShop = useRecoilValue(selectedShopState);
	const [saveConfirm, setSaveConfirm] = useRecoilState(saveConfirmState);
	const [loadConfirm, setLoadConfirm] = useRecoilState(loadConfirmState);

	useEffect(() => {
		setSaveConfirm(false);
		setLoadConfirm(false);
	}, [selectedShop]);

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

	const saveConfirmEl = () => {
		if(!saveConfirm) { return null; }
		return (
			<div className={Style.confirm}>
				<p className={Style.text}>Save?</p>
				<button className={Style.ok} onClick={onClickSave}>OK</button>
			</div>
		);
	};

	const loadConfirmEl = () => {
		if(!loadConfirm) { return null; }
		return (
			<div className={Style.confirm}>
				<p className={Style.text}>Load?</p>
				<button className={Style.ok} onClick={onClickLoad}>OK</button>
			</div>
		);
	}

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
			<div className={Style.buttonBox}>
				<button className={Style.save} onClick={() => { setSaveConfirm(!saveConfirm); setLoadConfirm(false); }}>Save</button>
				{ saveConfirmEl() }
			</div>

			<div className={Style.buttonBox}>
				<button className={Style.load} onClick={() => { setLoadConfirm(!loadConfirm); setSaveConfirm(false); }} disabled={saveData === null}>Load</button>
				{ loadConfirmEl() }
			</div>

			<div className={Style.savedInfo}>
				{ savedAtEl() }
				{ savedInfoEl() }
			</div>
		</div>
	);
}
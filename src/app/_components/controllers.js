'use client';

import Style from '../../styles/modules/controllers.module.scss';

import { useRecoilValue, useRecoilState } from 'recoil';
import {
	selectedShopState,
	timeState,
	timeMultipleState,
	isPlayingState } from '../../lib/state';
import { timeStr } from '../../lib/time';
import Saver from './saver';


export default function Controllers() {
	const selectedShop = useRecoilValue(selectedShopState);
	const time = useRecoilValue(timeState);
	const [timeMultiple, setTimeMultiple] = useRecoilState(timeMultipleState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

	if(selectedShop !== 'clock') { return null; }
	return (
		<div className={Style.clockBalloon}>
			<div className={Style.times}>
				<p className={Style.time}>{ timeStr(time) }</p>

				<button
					className={Style.pause}
					onClick={() => {setIsPlaying(false); setTimeMultiple(1);}}
					disabled={!isPlaying}
					></button>
				<button
					className={Style.play}
					onClick={() => {setIsPlaying(true); setTimeMultiple(1);}}
					disabled={isPlaying && timeMultiple === 1}
					></button>
				<button
					className={Style.double}
					onClick={() => {setIsPlaying(true); setTimeMultiple(2);}}
					disabled={timeMultiple === 2}
					></button>
			</div>

			<Saver />
		</div>
	);
}
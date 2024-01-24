'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useRecoilValue, useRecoilState } from 'recoil';
import {
	selectedShopState,
	timeState,
	timeMultipleState,
	isPlayingState } from '../../lib/state';


export default function Controllers() {
	const selectedShop = useRecoilValue(selectedShopState);
	const time = useRecoilValue(timeState);
	const [timeMultiple, setTimeMultiple] = useRecoilState(timeMultipleState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

	const displayTime = () => {
		let h = 0;
		let m = 0;
		let s = 0;
		if(time > 0) {
			h = Math.floor(time / 3600);
			m = Math.floor((time - h * 3600) / 60);
			s = time - h * 3600 - m * 60;
		}
		const h_str = String(h).padStart(2, '0');
		const m_str = String(m).padStart(2, '0');
		const s_str = String(s).padStart(2, '0');

		return `${h_str}:${m_str}:${s_str}`;
	}

	if(selectedShop !== 'clock') { return null; }
	return (
		<div className={Style.clockBalloon}>
			<div className={Style.times}>
				<p className={Style.time}>{displayTime()}</p>

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

		</div>
	);
}
'use client';

import Style from '../../styles/modules/home.module.scss';

import { useRecoilValue } from 'recoil';
import { logsState } from '../../lib/state';


export default function Logs() {
	const logs = useRecoilValue(logsState);
	const logEls = logs.map((log, index) => {
		const className = Style[`log${log.type}`];
		return (
			<li key={`log_${index}`} className={className}>{log.text}</li>
		);
	});

	return (
		<div className={Style.logBalloon}>
			<ul className={Style.logs}>{logEls}</ul>
		</div>
	);
}
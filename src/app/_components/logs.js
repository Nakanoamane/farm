'use client';

import Style from '../../styles/modules/home.module.scss';

const LogsList = ({logs}) => {
	const logEls = logs.map((log, index) => {
		const className = Style[`log${log.type}`];
		return (
			<li key={`log_${index}`} className={className}>{log.text}</li>
		);
	});

	return ( <ul className={Style.logs}>{logEls}</ul> );
}

export default function Logs({logs}) {
	return (
		<div className={Style.logBalloon}>
			<LogsList logs={logs} />
		</div>
	);
}
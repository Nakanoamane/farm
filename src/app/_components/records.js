'use client';

import Style from '../../styles/modules/achievements.module.scss';

import _ from 'lodash';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	timeState,
	moneyState,
	scoreState,
	recordsState
} from '../../lib/state';
import { timeStr } from '../../lib/time';
import { calcLevel } from '../../lib/score';


export default function Records() {
	const time = useRecoilValue(timeState);
	const money = useRecoilValue(moneyState);
	const score = useRecoilValue(scoreState);
	const [records, setRecords] = useRecoilState(recordsState);

  useEffect(() => {
    const newRecords = _.cloneDeep(records);
    newRecords.startAt = format(Date.now(), 'yyyy/MM/dd（eee） HH:mm:ss');
    setRecords(newRecords);
  }, []);

	const recordEls = Object.keys(records).map((key) => {
		return (
			<div className={Style.record} key={key}>
				<dt>{key}</dt>
				<dd>{records[key]}</dd>
			</div>
		)
	});

	const [lv] = calcLevel(score);

	return (
		<dl className={Style.records}>
			<div className={Style.record} key="time">
				<dt>time</dt><dd>{timeStr(time)}</dd>
			</div>

			<div className={Style.record} key="money">
				<dt>money</dt><dd>{money.toLocaleString()}</dd>
			</div>

			<div className={Style.record} key="score">
				<dt>score</dt><dd>{score.toLocaleString()}</dd>
			</div>

			<div className={Style.record} key="level">
				<dt>level</dt><dd>{lv}</dd>
			</div>

			{recordEls}
		</dl>
	);

}
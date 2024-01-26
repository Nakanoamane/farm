'use client';

import Style from '../../styles/modules/achievements.module.scss';

import _ from 'lodash';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { recordsState } from '../../lib/state';


export default function Records() {
	const [records, setRecords] = useRecoilState(recordsState);

  useEffect(() => {
    const newRecords = _.cloneDeep(records);
    newRecords.start_at = format(Date.now(), 'yyyy/MM/dd（eee） HH:mm:ss');
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

	return (
		<dl className={Style.records}>
			{recordEls}
		</dl>
	);

}
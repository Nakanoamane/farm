'use client';

import Style from '../../styles/modules/fields.module.scss';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  timeState,
  timeMultipleState,
  isPlayingState,
  fieldsState } from '../../lib/state';
import { updateFields } from '../../lib/fields';
import FieldsRow from './fields_row';

export default function Fields() {
  const [time, setTime] = useRecoilState(timeState);
  const timeMultiple = useRecoilValue(timeMultipleState);
  const isPlaying = useRecoilValue(isPlayingState);
  const [fields, setFields] = useRecoilState(fieldsState);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTime(time + 1);
        if( time > 0 ) {
          setFields(updateFields(time, fields));
        }
      }
    }, 1000 / timeMultiple);
    return () => clearInterval(interval);
  });

	return (
		<section className={`${Style.section} ${isPlaying ? '' : Style.pause}`}>
      <table className={Style.table}>
        <FieldsRow/>
      </table>
    </section>
	)
}

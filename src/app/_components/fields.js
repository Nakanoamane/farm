'use client';

import Style from '../../styles/modules/fields.module.scss';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  itemsState,
  timeState,
  isPlayingState,
  fieldsState,
  selectedItemState } from '../../lib/state';
import { updateFields } from '../../lib/fields';
import FieldsRow from './fields_row';

export default function Fields() {
  const [time, setTime] = useRecoilState(timeState);
  const isPlaying = useRecoilValue(isPlayingState);
  const [fields, setFields] = useRecoilState(fieldsState);
  const items = useRecoilValue(itemsState);
  const selectedItem = useRecoilValue(selectedItemState);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTime(time + 1);
        if( time > 0 ) {
          setFields(updateFields(time, fields));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

	return (
		<section className={Style.section}>
      <table className={`${Style[`${selectedItem}Table`]} ${Style[`num${items[selectedItem].num}`]}`}>
        <FieldsRow/>
      </table>
    </section>
	)
}

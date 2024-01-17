'use client';

import Style from '../../styles/modules/fields.module.scss';

import Field from './field';
import { useRecoilValue } from 'recoil';
import { fieldsState } from '../../lib/state';


export default function FieldsRow() {
  const fields = useRecoilValue(fieldsState);
  let rows = [];

  fields.forEach((row, index) => {
    let cells = [];

    row.forEach((_, i) => {
      cells[i] = <Field key={`cell-${index}-${i}`} rowIndex={index} cellIndex={i} />;
    });
    rows[index] = <tr key={`row-${index}`} className={Style.row}>{cells}</tr>;
  });

  return (<tbody>{rows}</tbody>);
}
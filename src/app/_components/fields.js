'use client';

import Style from '../../styles/modules/fields.module.scss';
import Field from './field';

const FieldsRow = (props) => {
  let rows = [];

  props.fields.forEach((row, index) => {
    let cells = [];
    row.forEach((field, i) => {
      cells[i] = <Field key={`cell-${index}-${i}`}
        rowIndex={index}
        cellIndex={i}
        field={field}
        {...props}
        />;
    });
    rows[index] = <tr key={`row-${index}`} className={Style.row}>{cells}</tr>;
  });

  return <tbody>{rows}</tbody>;
}

export default function Fields(props) {
	return (
		<section className={Style.section}>
      <table className={`${Style[`${props.selectedItem}Table`]} ${Style[`num${props.items[props.selectedItem].num}`]}`}>
        <FieldsRow {...props}/>
      </table>
    </section>
	)
}

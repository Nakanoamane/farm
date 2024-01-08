import Style from '../../styles/modules/fields.module.scss';

const FieldsRow = () => {
  let rows = [];

  for (let i = 0; i < 10; i++) {
    let nums = Array.from({length: 12}, (_, index) => index + 1);
    let cells = nums.map((num) => <td key={`cell-${num}`} className={Style.cell}></td>);
    rows.push(<tr key={`row-${i}`} className={Style.row}>{cells}</tr>);
  }
  return <tbody>{rows}</tbody>;
}

export default function Fields() {
	return (
		<section className={Style.section}>
      <table className={Style.table}>
        <FieldsRow />
      </table>
    </section>
	)
}

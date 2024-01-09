import Style from '../../styles/modules/fields.module.scss';

const FieldsRow = () => {
  let rows = [];
  const classNames = [
    Style['wheat-1'],
    Style['wheat-2'],
    Style['wheat-3'],
    Style['poultry-1'],
    Style['poultry-2'],
    Style['poultry-3'],
    Style['cow-1'],
    Style['cow-2'],
    Style['cow-3'],
    Style['grass-1'],
    Style['grass-2'],
    Style['grass-3'],
  ]

  for (let i = 0; i < 10; i++) {
    let nums = Array.from({length: 12}, (_, index) => index + 1);
    let cells = nums.map((num) => <td key={`cell-${num}`} className={`${Style.cell} ${classNames[num]}`}></td>);
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

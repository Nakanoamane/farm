import Style from '../../styles/modules/side.module.scss';

const items = [
	'hand',
	'hoe',
	'sickle',
	'wheat',
	'poultry',
	'cow',
	'flour',
	'milk',
	'egg',
	'chicken',
	'beaf',
]

const itemEls = items.map(item => {
	let id = `item-${item}`
	return (
		<li key={id}>
			<input type="radio" name="items" id={id} className={Style.radio} />
			<label htmlFor={id} className={Style[item]}></label>
		</li>
	)
})

export default function Items() {
	return (
		<div className={Style.balloon}>
			<ul className={Style.items}>
				{itemEls}
			</ul>
		</div>
	)
}
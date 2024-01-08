import Style from '../../styles/modules/side.module.scss';


export default function Side() {
	return (
		<nav className={Style.nav}>
      <button type="button" className={Style.house}></button>
      <div className={Style.items}>
        <button type="button" className={Style.hand}></button>
        <button type="button" className={Style.hoe}></button>
        <button type="button" className={Style.sickle}></button>
        <button type="button" className={Style.wheat}></button>
        <button type="button" className={Style.poultry}></button>
        <button type="button" className={Style.cow}></button>
      </div>
		</nav>
	)
  }
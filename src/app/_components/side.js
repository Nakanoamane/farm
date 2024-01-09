import Style from '../../styles/modules/side.module.scss';
import Items from './items';

export default function Side() {
	return (
		<nav className={Style.nav}>
      <button type="button" className={Style.house}></button>
      <Items />
		</nav>
	)
  }
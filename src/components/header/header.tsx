import Styles from './header.module.css'
import Logo from '../../assets/logo'

export let Header = () => {
	return (
		<header className={Styles.header}>
			<Logo />
		</header>
	)
}

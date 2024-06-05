import styles from "./Header.module.css";
import { Calendar, Logo } from "../ui/icons/icons";

function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.logoContainer}>
				<Logo />
			</div>
			<div className={styles.calendarContainer}>
				<div>
					<div>24 January, 2024</div>
					<div>15:19:29</div>
				</div>
				<div>
					<Calendar />
				</div>
			</div>
		</header>
	);
}

export default Header;

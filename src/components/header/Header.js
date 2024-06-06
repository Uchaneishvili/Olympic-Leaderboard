import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { Calendar, Logo } from "../ui/icons/icons";

function Header() {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setDateTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatDate = (date) => {
		const options = { day: "numeric", month: "long", year: "numeric" };
		return date.toLocaleDateString("en-GB", options);
	};

	const formatTime = (date) => {
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	};

	return (
		<header className={styles.container}>
			<div className={styles.logoContainer}>
				<Logo />
			</div>
			<div className={styles.calendarContainer}>
				<div className={styles.calendarInnerContainer}>
					<div className={styles.date}> {formatDate(dateTime)}</div>
					<div className={styles.time}> {formatTime(dateTime)}</div>
				</div>
				<div>
					<Calendar />
				</div>
			</div>
		</header>
	);
}

export default Header;

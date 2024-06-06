import { BiatlhlonCardLine } from "../ui/icons/icons";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";

function Card({ data, title, subTitle }) {
	const [list, setList] = useState(data);
	const [animateRowIndex, setAnimateRowIndex] = useState(null);

	useEffect(() => {
		let interval = 3000;

		const updateData = () => {
			const updatedData = list.map((player) => {
				const randomTimeMilliseconds = Math.floor(Math.random() * 270000);
				const randomMinutes = Math.floor(randomTimeMilliseconds / 60000 + 30);
				const randomSeconds = Math.floor(
					(randomTimeMilliseconds % 60000) / 1000
				);
				const randomMilliseconds = Math.floor(
					(randomTimeMilliseconds % 1000) / 10
				);

				const formattedTime = `${randomMinutes
					.toString()
					.padStart(2, "0")}:${randomSeconds
					.toString()
					.padStart(2, "0")}.${randomMilliseconds.toString().padStart(2, "0")}`;

				const updatedPlayer = {
					...player,
					time: formattedTime,
					rankChange: "", // Reset rankChange to an empty string
				};

				const randomIndex = Math.floor(Math.random() * list.length);
				return list[randomIndex] === player ? updatedPlayer : player;
			});

			const sortedData = updatedData.sort((a, b) =>
				a.time.localeCompare(b.time)
			);

			const prevList = list;

			setList(sortedData);

			sortedData.forEach((player, index) => {
				const prevIndex = prevList.findIndex((p) => p.name === player.name);
				console.log("prev", prevIndex);

				if (prevIndex > index) {
					player.rankChange = "+";
				} else if (prevIndex < index) {
					player.rankChange = "-";
				} else {
					player.rankChange = "";
				}
			});

			const changedRowIndex = sortedData.findIndex(
				(player) => player.rankChange !== ""
			);

			if (changedRowIndex !== -1) {
				setAnimateRowIndex(changedRowIndex);
				setTimeout(() => {
					setAnimateRowIndex(null);
				}, 1000); // Reset animateRowIndex after animation duration
			}
		};

		interval = setInterval(updateData, 3000);

		return () => clearInterval(interval);
	}, [list]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div>{title}</div>
			</div>
			<div className={styles.cardLineContainer}>
				<BiatlhlonCardLine />
			</div>
			<div className={styles.table}>
				<div className={styles.subtitleContainer}>
					<div className={styles.subtitleInnerContainer}>
						<div className={styles.dashedLine}></div>
						<div className={styles.subtitle}>{subTitle}</div>
						<div className={styles.dashedLine}></div>
					</div>
				</div>
				{list.map((element, index) => {
					return (
						<div
							className={`${styles.tableRow} ${
								index === animateRowIndex ? styles.animateRow : ""
							}`}
							key={index}
						>
							<div className={styles.playerInfo}>
								<div
									className={
										index === 0
											? styles.firstPlace
											: index === 1
											? styles.secondPlace
											: index === 2
											? styles.thirdPlace
											: styles.ranking
									}
								>
									<div>{index + 1}.</div>
									{element.flag}
								</div>
								{element.rankChange && (
									<div className={styles.rankChange}>{element.rankChange}</div>
								)}
								<div>({element.country})</div>
								<div>{element.name}</div>
							</div>
							<div className={styles.time}>
								<div>{element.time}</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Card;

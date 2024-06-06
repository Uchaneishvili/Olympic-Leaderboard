import { BiatlhlonCardLine } from "../ui/icons/icons";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { Reorder } from "framer-motion";

function Card({ data, title, subTitle }) {
	const [list, setList] = useState(data);
	const [updatedList, setUpdatedList] = useState([]);
	const [animation, setAnimation] = useState(true);

	useEffect(() => {
		let interval = 3000;

		const updateData = () => {
			setAnimation(true);
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
				};

				const randomIndex = Math.floor(Math.random() * list.length);
				return list[randomIndex] === player ? updatedPlayer : player;
			});

			const sortedData = updatedData.sort((a, b) =>
				a.time.localeCompare(b.time)
			);

			setUpdatedList(sortedData);

			setTimeout(() => {
				setAnimation(false);
				setList(sortedData);
			}, 1500);

			// const prevList = list;
			// sortedData.forEach((player, index) => {
			// 	const prevIndex = prevList.findIndex((p) => p.name === player.name);

			// 	// if (prevIndex > index) {
			// 	// player.rankChange = "+";
			// 	player.rankChangeAmount = prevIndex - index;

			// 	player.position = (prevIndex - index) * 40;
			// 	// } else if (prevIndex < index) {
			// 	// player.rankChange = "-";
			// 	// player.rankChangeAmount = index - prevIndex;
			// 	// } else {
			// 	// player.rankChange = "";
			// }
			// });
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
				<Reorder.Group values={list} onReorder={setList}>
					{list.map((element, index) => {
						if (updatedList.length > 0) {
							const newIndex = updatedList.findIndex(
								(p) => p.name === element.name
							);

							const newTime = updatedList.filter(
								(p) => p.name === element.name
							);

							element.rankChangeAmount = newIndex - index;
							element.time = newTime[0].time;
						}

						return (
							<Reorder.Item
								className={styles.tableRow}
								key={index}
								layout
								transition={{ duration: 0.5 }}
								animate={{
									x: 0,
									y: animation && 40 * element.rankChangeAmount,
									scale: 1,
									rotate: 0,
								}}
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

									<div>({element.country})</div>
									<div>{element.name}</div>
								</div>
								<div className={styles.time}>
									<div>{element.time}</div>
								</div>
							</Reorder.Item>
						);
					})}
				</Reorder.Group>
			</div>
		</div>
	);
}

export default Card;

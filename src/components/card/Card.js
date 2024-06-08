import { ArrowDown, ArrowUp } from "../ui/icons/icons";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { Reorder } from "framer-motion";
import moment from "moment";

function Card({ data, title, subTitle, intervalTime, cardLine }) {
	const [list, setList] = useState(data);
	const [updatedList, setUpdatedList] = useState([]);
	const [animating, setAnimating] = useState(true); // Track animation state

	useEffect(() => {
		const updateData = () => {
			setAnimating(true);
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

			const sortedData = updatedData.sort((a, b) => {
				const aTime = moment(a.time, "mm:ss.SS");
				const bTime = moment(b.time, "mm:ss.SS");

				return aTime.valueOf() - bTime.valueOf();
			});

			setUpdatedList(sortedData);
		};

		const interval = setInterval(updateData, 3000);

		return () => {
			clearInterval(interval);
		};
	}, [list, intervalTime]);

	useEffect(() => {
		const loadList = () => {
			if (updatedList.length > 0) {
				const sortedData = updatedList.sort((a, b) => {
					const aTime = moment(a.time, "mm:ss.SS");
					const bTime = moment(b.time, "mm:ss.SS");

					return aTime.valueOf() - bTime.valueOf();
				});
				setList(sortedData);
			}
		};
		const interval = setInterval(loadList, 2000);
		return () => {
			clearInterval(interval);
		};
	}, [animating, updatedList]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div>{title}</div>
			</div>
			<div className={styles.cardLineContainer}>{cardLine}</div>
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

							element.rankChangeAmount = index - newIndex;

							element.time = newTime[0].time;
						}

						return (
							<Reorder.Item
								className={styles.tableRow}
								key={index}
								layout
								transition={{ duration: 2 }}
								animate={{
									x: 0,
									y: animating ? -40 * element.rankChangeAmount : 0,
									scale: 1,
									rotate: 0,
									opacity: element.rankChangeAmount !== 0 ? 0.3 : 1,
								}}
								onAnimationComplete={() => {
									setAnimating(false);
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

									<div className={styles.country}>({element.country})</div>
									<div>{element.name}</div>
									<div>
										{element.rankChangeAmount > 0 ? (
											<ArrowUp />
										) : element.rankChangeAmount < 0 ? (
											<ArrowDown />
										) : (
											""
										)}
									</div>
								</div>
								<div className={styles.time}>
									<div>{element.time}</div>
								</div>
							</Reorder.Item>
						);
					})}
				</Reorder.Group>

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
									y: animating ? -(40 * element.rankChangeAmount) : 0,
									scale: 1,
									rotate: 0,
									opacity: element.rankChangeAmount !== 0 ? 0.3 : 1,
								}}
								// onAnimationComplete={() => {
								// 	setAnimating(false); // Set animating to false after animation
								// }}
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
									<div>
										{element.rankChangeAmount > 0 ? (
											<ArrowDown />
										) : element.rankChangeAmount < 0 ? (
											<ArrowUp />
										) : (
											""
										)}
									</div>
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

import { ArrowDown, ArrowUp } from "../ui/icons/icons";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { Reorder } from "framer-motion";
import moment from "moment";

function Card({
	boysData,
	girlsData,
	title,
	subTitle,
	intervalTime,
	cardLine,
	type,
	doubledDigit,
	average,
	format,
}) {
	const [boys, setBoys] = useState(boysData);
	const [girls, setGirls] = useState(girlsData);
	const [updatedBoys, setUpdatedBoys] = useState([]);
	const [updatedGirls, setUpdatedGirls] = useState([]);
	const [animatingBoys, setAnimatingBoys] = useState(true);
	const [animatingGirls, setAnimatingGirls] = useState(true);

	useEffect(() => {
		if (type === "time") {
			const updateData = (data, setData, setAnimating) => {
				setAnimating(true);
				const updatedData = data.map((player) => {
					const randomTimeMilliseconds = Math.floor(Math.random() * 270000);
					const randomMinutes = Math.floor(
						randomTimeMilliseconds / 60000 + average
					);
					const randomSeconds = Math.floor(
						(randomTimeMilliseconds % 60000) / 1000
					);
					const randomMilliseconds = Math.floor(
						(randomTimeMilliseconds % 1000) / 10
					);

					if (format === "mm:ss.SS") {
						const formattedTime = `${randomMinutes
							.toString()
							.padStart(1, "0")}:${randomSeconds
							.toString()
							.padStart(2, "0")}.${randomMilliseconds
							.toString()
							.padStart(2, "0")}`;

						const updatedPlayer = {
							...player,
							time: formattedTime,
						};

						const randomIndex = Math.floor(Math.random() * data.length);
						return data[randomIndex] === player ? updatedPlayer : player;
					} else if (format === "m:ss.SSS") {
						const formattedTime = `${randomMinutes
							.toString()
							.padStart(1, "0")}:${randomSeconds
							.toString()
							.padStart(2, "0")}.${randomMilliseconds
							.toString()
							.padStart(3, "0")}`;

						const updatedPlayer = {
							...player,
							time: formattedTime,
						};

						const randomIndex = Math.floor(Math.random() * data.length);
						return data[randomIndex] === player ? updatedPlayer : player;
					} else if (format === "m:ss.SS") {
						const formattedTime = `${randomMinutes
							.toString()
							.padStart(1, "0")}:${randomSeconds
							.toString()
							.padStart(2, "0")}.${randomMilliseconds
							.toString()
							.padStart(2, "0")}`;

						const updatedPlayer = {
							...player,
							time: formattedTime,
						};

						const randomIndex = Math.floor(Math.random() * data.length);
						return data[randomIndex] === player ? updatedPlayer : player;
					} else {
						return player;
					}
				});

				const sortedData = updatedData.sort((a, b) => {
					const aTime = moment(a.time, format);
					const bTime = moment(b.time, format);

					return aTime.valueOf() - bTime.valueOf();
				});

				setData(sortedData);
			};

			const interval1 = setInterval(
				() => updateData(boys, setUpdatedBoys, setAnimatingBoys),
				8512 * intervalTime
			);
			const interval2 = setInterval(
				() => updateData(girls, setUpdatedGirls, setAnimatingGirls),
				9000 * intervalTime
			);

			return () => {
				clearInterval(interval1);
				clearInterval(interval2);
			};
		} else if (type === "ranking") {
			const updateData = (data, setData, setAnimating) => {
				setAnimating(true);
				const updatedData = data.map((player) => {
					const randomId = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit ID

					const updatedPlayer = {
						...player,
						id: randomId.toString().padStart(6, "0"), // Convert to string and pad with leading zeros
					};

					const randomIndex = Math.floor(Math.random() * data.length);
					return data[randomIndex] === player ? updatedPlayer : player;
				});

				const sortedData = updatedData.sort((a, b) => b.id - a.id); // Sort by ID

				setData(sortedData);
			};

			const interval1 = setInterval(
				() => updateData(boys, setUpdatedBoys, setAnimatingBoys),
				11050 * intervalTime
			);
			const interval2 = setInterval(
				() => updateData(girls, setUpdatedGirls, setAnimatingGirls),
				13060 * intervalTime
			);

			return () => {
				clearInterval(interval1);
				clearInterval(interval2);
			};
		} else if (type === "point") {
			const updateData = (data, setData, setAnimating) => {
				setAnimating(true);
				const updatedData = data.map((player) => {
					const minValue = 124.37;
					const maxValue = 238.13;
					const randomPercentage =
						Math.random() * (maxValue - minValue) + minValue;

					const updatedPlayer = {
						...player,
						point: randomPercentage.toFixed(2),
					};

					const randomIndex = Math.floor(Math.random() * data.length);
					return data[randomIndex] === player ? updatedPlayer : player;
				});

				const sortedData = updatedData.sort(
					(a, b) => parseFloat(b.point) - parseFloat(a.point)
				);

				setData(sortedData);
			};

			const interval1 = setInterval(
				() => updateData(boys, setUpdatedBoys, setAnimatingBoys),
				9000 * intervalTime
			);
			const interval2 = setInterval(
				() => updateData(girls, setUpdatedGirls, setAnimatingGirls),
				7500 * intervalTime
			);

			return () => {
				clearInterval(interval1);
				clearInterval(interval2);
			};
		}
	}, [girls, boys, intervalTime, type, average, format]);

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
						<div className={styles.subtitle}>{subTitle[0]}</div>
						<div className={styles.dashedLine}></div>
					</div>
				</div>
				<Reorder.Group values={boys} onReorder={setBoys}>
					{boys.map((element, index) => {
						if (updatedBoys.length > 0) {
							const newIndex = updatedBoys.findIndex(
								(p) => p.name === element.name
							);

							const newTime = updatedBoys.filter(
								(p) => p.name === element.name
							);

							element.rankChangeAmount = index - newIndex;

							if (element.time) {
								element.time = newTime[0].time;
							} else if (element.point) {
								element.point = newTime[0].point;
							}
						}

						return (
							<Reorder.Item
								drag={false}
								className={styles.tableRow}
								key={index}
								layout
								transition={{ duration: 2 }}
								animate={{
									x: 0,
									y: animatingBoys ? -40 * element.rankChangeAmount : 0,
									scale: 1,
									rotate: 0,
									opacity: element.rankChangeAmount !== 0 ? 0 : 1,
								}}
								onAnimationComplete={() => {
									setAnimatingBoys(false);

									const sortedData = updatedBoys.sort((a, b) => {
										if (type === "time") {
											const aTime = moment(a.time, "mm:ss.SS");
											const bTime = moment(b.time, "mm:ss.SS");

											return aTime.valueOf() - bTime.valueOf();
										} else if (type === "ranking") {
											return b.id - a.id;
										} else if (type === "point") {
											return b.point - a.point;
										} else {
											return 0;
										}
									});
									if (sortedData.length > 0) {
										setBoys(sortedData);
									}
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
									<div
										className={
											element.rankChangeAmount > 0
												? styles.up
												: element.rankChangeAmount < 0
												? styles.down
												: ""
										}
									>
										{element.name}
									</div>
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
								<div
									className={`${styles.time} ${
										element.rankChangeAmount > 0
											? styles.up
											: element.rankChangeAmount < 0
											? styles.down
											: ""
									}`}
								>
									<div
										className={`${styles.result} ${
											element.rankChangeAmount > 0
												? styles.up
												: element.rankChangeAmount < 0
												? styles.down
												: ""
										}`}
									>
										{element.time && <div>{element.time}</div>}
										{element.point &&
											(doubledDigit ? (
												<div>{parseFloat(element.point).toFixed(2)}P</div>
											) : (
												<div>{parseFloat(element.point).toFixed(1)}P</div>
											))}
									</div>
								</div>
							</Reorder.Item>
						);
					})}
				</Reorder.Group>

				<div className={styles.subtitleContainer}>
					<div className={styles.subtitleInnerContainer}>
						<div className={styles.dashedLine}></div>
						<div className={styles.subtitle}>{subTitle[1]}</div>
						<div className={styles.dashedLine}></div>
					</div>
				</div>
				<Reorder.Group values={girls} onReorder={setGirls}>
					{girls.map((element, index) => {
						if (updatedGirls.length > 0) {
							const newIndex = updatedGirls.findIndex(
								(p) => p.name === element.name
							);

							const newTime = updatedGirls.filter(
								(p) => p.name === element.name
							);
							element.rankChangeAmount = index - newIndex;

							if (element.time) {
								element.time = newTime[0].time;
							} else if (element.point) {
								element.point = newTime[0].point;
							}
						}

						return (
							<Reorder.Item
								className={styles.tableRow}
								drag={false}
								key={index}
								layout
								transition={{ duration: 0.5 }}
								animate={{
									x: 0,
									y: animatingGirls ? -40 * element.rankChangeAmount : 0,
									scale: 1,
									rotate: 0,
									opacity: element.rankChangeAmount !== 0 ? 0 : 1,
								}}
								onAnimationComplete={() => {
									setAnimatingGirls(false);
									const sortedData = updatedGirls.sort((a, b) => {
										if (type === "time") {
											const aTime = moment(a.time, "mm:ss.SS");
											const bTime = moment(b.time, "mm:ss.SS");

											return aTime.valueOf() - bTime.valueOf();
										} else if (type === "ranking") {
											return b.id - a.id;
										} else if (type === "point") {
											return b.point - a.point;
										} else {
											return 0;
										}
									});
									if (sortedData.length > 0) {
										setGirls(sortedData);
									}
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
								<div
									className={`${styles.result} ${
										element.rankChangeAmount > 0
											? styles.up
											: element.rankChangeAmount < 0
											? styles.down
											: ""
									}`}
								>
									{element.time && <div>{element.time}</div>}
									{element.point &&
										(doubledDigit ? (
											<div>{parseFloat(element.point).toFixed(2)}P</div>
										) : (
											<div>{parseFloat(element.point).toFixed(1)}P</div>
										))}
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

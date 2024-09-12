import React, {
	useState,
	useLayoutEffect,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import styles from "./Card.module.css";
import { motion, useAnimation, Reorder } from "framer-motion";
import moment from "moment";
import { ArrowDown, ArrowUp } from "../ui/icons/icons";

const PlayerRow = React.memo(
	({ player, index, type, setAnimatingBoys, updatedBoys, setBoys }) => {
		const controls = useAnimation();

		useEffect(() => {
			if (player.rankChange !== 0) {
				controls.start({
					opacity: [1, 0.5, 1],
					y: -40 * player.rankChange,
					x: 0,
					scale: 1,
					rotate: 0,
					transition: {
						duration: 2,
						opacity: { times: [0, 0.5, 1], duration: 2 },
					},
				});
			}
		}, [player.rankChange, controls]);

		return (
			<Reorder.Item
				key={player.id}
				className={styles.row}
				value={player}
				transition={null}
				animate={controls}
				initial={{ opacity: 1 }}
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
						className={`${styles.ranking} ${index === 0 && styles.first} ${
							index === 1 && styles.second
						} ${index === 2 && styles.third}`}
					>
						<div className={styles.index}>{index + 1}.</div>
						<div className={styles.flag}>{player.flag}</div>
					</div>
					<div className={styles.country}>({player.country})</div>
					<div className={styles.name}>{player.name}</div>
					<div className={styles.name}>
						{player.rankChange > 0 && <ArrowUp />}
						{player.rankChange < 0 && <ArrowDown />}
					</div>
				</div>
				<div className={styles.result}>
					{type === "time" && player.time}
					{type === "point" && `${parseFloat(player.point).toFixed(2)}P`}
				</div>
			</Reorder.Item>
		);
	}
);

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
	const [animatingBoys, setAnimatingBoys] = useState(false);
	const [animatingGirls, setAnimatingGirls] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);

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

	const commonStyles = useMemo(
		() => ({
			padding: "0px",
			position: "absolute",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backfaceVisibility: "hidden",
		}),
		[]
	);

	return (
		<div
			className={styles.mainContainer}
			onClick={() => setIsFlipped(!isFlipped)}
		>
			<Reorder.Group
				drag={false}
				style={commonStyles}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6 }}
				values={boys}
				onReorder={setBoys}
				className={styles.container}
			>
				<div className={styles.title}>{title}</div>
				<div className={styles.tableContainer}>
					{cardLine}
					<div className={styles.innerContainer}>
						<div className={styles.table}>
							<div className={styles.subtitleContainer}>
								<div className={styles.subtitleInnerContainer}>
									<div className={styles.dashedLine}></div>
									<div className={styles.subtitle}>
										{subTitle || "10 km Individual start free (boys)"}
									</div>
									<div className={styles.dashedLine}></div>
								</div>
							</div>
							<div className={styles.list}>
								{boys.map((player, index) => {
									const updatedPlayer =
										updatedBoys.find((p) => p.name === player.name) || player;
									const newIndex = updatedBoys.findIndex(
										(p) => p.name === player.name
									);

									if (updatedBoys.length > 0) {
										const newIndex = updatedBoys.findIndex(
											(p) => p.name === player.name
										);

										const newTime = updatedBoys.filter(
											(p) => p.name === player.name
										);

										player.rankChangeAmount = index - newIndex;

										if (player.time) {
											player.time = newTime[0].time;
										} else if (player.point) {
											player.point = newTime[0].point;
										}
									}

									return (
										<PlayerRow
											player={{
												...updatedPlayer,
												rankChange: newIndex !== -1 ? index - newIndex : 0,
											}}
											index={index}
											setAnimating={setAnimatingBoys}
											animating={animatingBoys}
											updatedPlayers={updatedBoys}
											type={type}
											setPlayers={setBoys}
											setAnimatingBoys={setAnimatingBoys}
											updatedBoys={updatedBoys}
											setBoys={setBoys}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Reorder.Group>

			<motion.div
				style={commonStyles}
				initial={{ rotateY: 180 }}
				animate={{ rotateY: isFlipped ? 0 : 180 }}
				transition={{ duration: 0.6 }}
			>
				<video autoPlay loop muted playsInline className={styles.video}>
					<source src="/assets/videos/video.mp4" type="video/mp4" />
				</video>
			</motion.div>
		</div>
	);
}

export default Card;

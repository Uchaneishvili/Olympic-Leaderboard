import { BlueCardLine } from "../ui/icons/icons";
import React, {
	useState,
	useLayoutEffect,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import styles from "./HockeyCard.module.css";
import { motion, Reorder } from "framer-motion";
function HockeyCard({ boysData, girlsData, cardLine, title }) {
	const [boys, setBoys] = useState(boysData);
	const [girls, setGirls] = useState(girlsData);
	const [matchRandomIndexBoys, setMatchRandomIndexBoys] = useState();
	const [matchRandomIndexGirls, setMatchRandomIndexGirls] = useState();
	const [countryRandomIndexBoys, setCountryRandomIndexBoys] = useState();
	const [countryRandomIndexGirls, setCountryRandomIndexGirls] = useState();
	const [isFlipped, setIsFlipped] = useState(false);
	useEffect(() => {
		const updateData = (
			data,
			setData,
			setMatchRandomIndex,
			setCountryRandomIndex
		) => {
			const matchRndm = Math.floor(Math.random() * data.length);
			const countryRndm = Math.floor(Math.random() * data[matchRndm].length);

			setMatchRandomIndex(matchRndm);
			setCountryRandomIndex(countryRndm);

			const updatedList = [...data];
			const scoreList = [...updatedList[matchRndm][countryRndm].scores];
			const firstPositiveIndex = scoreList.findIndex((score) => score > 0);

			if (firstPositiveIndex !== -1) {
				const newScoreList = scoreList.map((score, index) => {
					if (index === firstPositiveIndex) {
						return score + 1;
					}
					return score;
				});

				updatedList[matchRndm][countryRndm].scores = newScoreList;
				setData(updatedList);

				setTimeout(() => {
					setMatchRandomIndex();
					setCountryRandomIndex();
				}, 3000);
			} else {
				console.log("No positive number found in the array.");
			}
		};

		const interval1 = setInterval(
			() =>
				updateData(
					boys,
					setBoys,
					setMatchRandomIndexBoys,
					setCountryRandomIndexBoys
				),
			16802
		);
		const interval2 = setInterval(
			() =>
				updateData(
					girls,
					setGirls,
					setMatchRandomIndexGirls,
					setCountryRandomIndexGirls
				),
			17300
		);

		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
		};
	}, [boys, girls]);

	const flickerAnimation = {
		flickering: {
			backgroundColor: ["#ffffff", "#8fd5a5", "#ffffff", "#8fd5a5"],
			transition: {
				duration: 1,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	};

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
			<>
				<motion.div
					className={styles.container}
					style={commonStyles}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className={styles.title}>Hockey</div>
					<div className={styles.tableContainer}>
						<BlueCardLine />
						<div className={styles.innerContainer}>
							<div className={styles.table}>
								<div className={styles.subtitleContainer}>
									<div className={styles.subtitleInnerContainer}>
										<div className={styles.dashedLine}></div>
										<div className={styles.subtitle}>BOYS</div>
										<div className={styles.dashedLine}></div>
									</div>
								</div>
								<div className={styles.list}>
									{boys.map((match, matchIndex) => {
										return (
											<div className={styles.innerHockayContainer}>
												{match.map((country, countryIndex) => {
													return (
														<motion.div
															key={`${matchIndex}-${countryIndex}`}
															className={styles.countryInfo}
															variants={flickerAnimation}
															layout
															initial={{ backgroundColor: "#ffffff" }}
															animate={
																matchIndex === matchRandomIndexBoys &&
																countryRandomIndexBoys === countryIndex
																	? "flickering"
																	: "initial"
															}
														>
															{" "}
															<div className={styles.innerCountryInfo}>
																<div>{country.flag}</div>
																<div>{country.country}</div>
															</div>
															<div className={styles.score}>
																{country.scores.map((score, index) => {
																	const firstPositiveIndex =
																		country.scores.findIndex(
																			(score) => score > 0
																		);
																	return (
																		<div
																			key={index}
																			className={
																				index === firstPositiveIndex
																					? styles.boldedScore
																					: ""
																			}
																		>
																			{score}
																		</div>
																	);
																})}
															</div>
														</motion.div>
													);
												})}
											</div>
										);
									})}
								</div>
							</div>
							<div className={styles.table_girls}>
								<div className={styles.subtitleContainer}>
									<div className={styles.subtitleInnerContainer}>
										<div className={styles.dashedLine}></div>
										<div className={styles.subtitle_girls}>GIRLS</div>
										<div className={styles.dashedLine}></div>
									</div>
								</div>
								<div className={styles.list_girl}>
									{girls.map((match, matchIndex) => {
										return (
											<div className={styles.innerHockayContainer}>
												{match.map((country, countryIndex) => {
													return (
														<motion.div
															key={`${matchIndex}-${countryIndex}`}
															className={styles.countryInfo}
															variants={flickerAnimation}
															layout
															initial={{ backgroundColor: "#ffffff" }}
															animate={
																matchIndex === matchRandomIndexGirls &&
																countryRandomIndexGirls === countryIndex
																	? "flickering"
																	: "initial"
															}
														>
															<div className={styles.innerCountryInfo}>
																<div>{country.flag}</div>
																<div>{country.country}</div>
															</div>
															<div className={styles.score}>
																{country.scores.map((score, index) => {
																	const firstPositiveIndex =
																		country.scores.findIndex(
																			(score) => score > 0
																		);
																	return (
																		<div
																			key={index}
																			className={
																				index === firstPositiveIndex
																					? styles.boldedScore
																					: ""
																			}
																		>
																			{score}
																		</div>
																	);
																})}
															</div>
														</motion.div>
													);
												})}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</motion.div>
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
			</>
		</div>
	);
}

export default HockeyCard;

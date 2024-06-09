import { BlueCardLine } from "../ui/icons/icons";
import { useEffect, useState } from "react";
import styles from "./HockeyCard.module.css";
import { motion } from "framer-motion";
function HockeyCard({ boysData, girlsData }) {
	const [boys, setBoys] = useState(boysData);
	const [girls, setGirls] = useState(girlsData);
	const [matchRandomIndexBoys, setMatchRandomIndexBoys] = useState();
	const [matchRandomIndexGirls, setMatchRandomIndexGirls] = useState();
	const [countryRandomIndexBoys, setCountryRandomIndexBoys] = useState();
	const [countryRandomIndexGirls, setCountryRandomIndexGirls] = useState();
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
			10000
		);
		const interval2 = setInterval(
			() =>
				updateData(
					girls,
					setGirls,
					setMatchRandomIndexGirls,
					setCountryRandomIndexGirls
				),
			10200
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
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div>ICE HOCKEY</div>
			</div>
			<div className={styles.cardLineContainer}>
				<BlueCardLine />
			</div>
			<div className={styles.tableContainer}>
				<div key={"boys"} className={styles.table}>
					<div className={styles.subtitleContainer}>
						<div className={styles.subtitleInnerContainer}>
							<div className={styles.dashedLine}></div>
							<div className={styles.subtitle}>BOYS</div>
							<div className={styles.dashedLine}></div>
						</div>
					</div>
					{boys.map((match, matchIndex) => {
						return (
							<>
								<div key={`match-${matchIndex}`} className={styles.tableRow}>
									{match.map((country, countryIndex) => {
										return (
											<motion.div
												key={`${matchIndex}-${countryIndex}`}
												className={styles.matchRow}
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
												<div className={styles.teamRow}>
													<div className={styles.countryInfo}>
														<div>{country.flag}</div>
														<div>{country.country}</div>
													</div>
													<div className={styles.scores}>
														{country.scores.map((score, index) => {
															const firstPositiveIndex =
																country.scores.findIndex((score) => score > 0);

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
												</div>
											</motion.div>
										);
									})}
								</div>
								{match.length !== matchIndex + 1 && (
									<div className={styles.divider}></div>
								)}
							</>
						);
					})}
				</div>
				<div key={"girls"} className={styles.table}>
					<div className={styles.subtitleContainer}>
						<div className={styles.subtitleInnerContainer}>
							<div className={styles.dashedLine}></div>
							<div className={styles.subtitle}>GIRLS</div>
							<div className={styles.dashedLine}></div>
						</div>
					</div>
					{girls.map((match, matchIndex) => {
						return (
							<>
								<div key={`match-${matchIndex}`} className={styles.tableRow}>
									{match.map((country, countryIndex) => {
										return (
											<motion.div
												key={`${matchIndex}-${countryIndex}`}
												className={styles.matchRow}
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
												<div className={styles.teamRow}>
													<div className={styles.countryInfo}>
														<div>{country.flag}</div>

														<div>{country.country}</div>
													</div>
													<div className={styles.scores}>
														{country.scores.map((score, index) => {
															const firstPositiveIndex =
																country.scores.findIndex((score) => score > 0);
															return (
																<div
																	key={index}
																	className={
																		index === firstPositiveIndex &&
																		styles.boldedScore
																	}
																>
																	{score}
																</div>
															);
														})}
													</div>
												</div>
											</motion.div>
										);
									})}
								</div>

								{match.length !== matchIndex + 1 && (
									<div className={styles.divider}></div>
								)}
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default HockeyCard;

import { BlueCardLine } from "../ui/icons/icons";
import { useEffect, useState } from "react";
import styles from "./HockeyCard.module.css";

function HockeyCard({ boysData, girlsData }) {
	const [boys, setBoys] = useState(boysData);
	const [girls, setGirls] = useState(girlsData);

	useEffect(() => {
		const updateData = (data, setData) => {
			const matchRndm = Math.floor(Math.random() * data.length);
			const countryRndm = Math.floor(Math.random() * data[matchRndm].length);

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
			} else {
				console.log("No positive number found in the array.");
			}
		};

		const interval1 = setInterval(() => updateData(boys, setBoys), 10000);
		const interval2 = setInterval(() => updateData(girls, setGirls), 10000);

		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
		};
	}, [boys, girls]);

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
											<div
												key={`${matchIndex}-${countryIndex}`}
												className={styles.matchRow}
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
											</div>
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
											<div
												key={`${matchIndex}-${countryIndex}`}
												className={styles.matchRow}
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
											</div>
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

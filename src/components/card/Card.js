import { BiatlhlonCardLine } from "../ui/icons/icons";
import styles from "./Card.module.css";

function Card({ data, title, subTitle }) {
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
				{data.map((element, index) => {
					return (
						<div className={styles.tableRow} key={index}>
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
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Card;

import { BiatlhlonCardLine, SlovakiaFlag } from "../ui/icons/icons";
import styles from "./Card.module.css";

function Card() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div>BIATLHLON</div>
			</div>
			<div className={styles.cardLineContainer}>
				<BiatlhlonCardLine />
			</div>
			<div className={styles.table}>
				<div className={styles.subtitleContainer}>
					<div className={styles.subtitleInnerContainer}>
						<div className={styles.dashedLine}></div>
						<div className={styles.subtitle}>100M R-1 GIRLS</div>
						<div className={styles.dashedLine}></div>
					</div>
				</div>

				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>
				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>

				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>

				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>

				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>

				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>

				<div className={styles.tableRow}>
					<div className={styles.playerInfo}>
						<div className={styles.ranking}>
							<div>1.</div>
							<div>
								<SlovakiaFlag />
							</div>
						</div>

						<div>(SLO)</div>
						<div>L.Repinc</div>
					</div>

					<div className={styles.time}>
						<div>31:34.07</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;

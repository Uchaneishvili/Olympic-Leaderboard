import "./App.css";
import Header from "./components/header/Header";
import Card from "./components/card/Card";
import {
	BlueCardLine,
	GreenCardLine,
	RedCardLine,
	YellowCardLine,
} from "./components/ui/icons/icons";
import HockeyCard from "./components/hockeyCard/HockeyCard";

function App() {
	const biatlhonData = [
		{
			country: "SLO",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovenia.png" />
			),
			name: "L. Repinc",
			time: "31:34.07",
			rankChangeAmount: 0,
		},
		{
			country: "POL",
			flag: <img className="flag" alt="country-flag" src="flags/Poland.png" />,
			name: "K. Badacz",
			time: "31:34.12",
			rankChangeAmount: 0,
		},
		{
			country: "SVK",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovakia.png" />
			),
			name: "J. Borgula",
			time: "31:34:20",
			rankChangeAmount: 0,
		},
		{
			country: "SWE",
			flag: <img className="flag" alt="country-flag" src="flags/Sweden.png" />,
			name: "S. Anderson",
			time: "31:34.39",
			rankChangeAmount: 0,
		},
		{
			country: "FRA",
			flag: <img className="flag" alt="country-flag" src="flags/France.png" />,
			name: "L. Thievent",
			time: "31:34.59",
			rankChangeAmount: 0,
		},
		{
			country: "ITA",
			flag: <img className="flag" alt="country-flag" src="flags/Italy.png" />,
			name: "E. Mondinelli",
			time: "31:35.05",
			rankChangeAmount: 0,
		},
		{
			country: "AUT",
			flag: <img className="flag" alt="country-flag" src="flags/Austria.png" />,
			name: "V. Olivier",
			time: "31:35.10",
			rankChangeAmount: 0,
		},
	];

	const hockeyBoysData = [
		[
			{
				country: "Slovenia",
				scores: [0, 0, 3, 2],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Slovenia.png" />
				),
			},
			{
				country: "Switzerland",
				scores: [0, 0, 1, 2],
				flag: (
					<img
						className="flag"
						alt="country-flag"
						src="flags/Switzerland.png"
					/>
				),
			},
		],

		[
			{
				country: "Finland",
				scores: [6, 1, 3, 1],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Finland.png" />
				),
			},
			{
				country: "Norway",
				scores: [7, 2, 1, 2],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Norway.png" />
				),
			},
		],
	];

	const hockeyGirlsData = [
		[
			{
				country: "SLOVAKIA",
				scores: [0, 2, 2, 2],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Slovenia.png" />
				),
			},
			{
				country: "LATVIA",
				scores: [0, 1, 2, 2],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Latvia.png" />
				),
			},
		],

		[
			{
				country: "Finland",
				scores: [0, 0, 2, 1],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Finland.png" />
				),
			},
			{
				country: "Norway",
				scores: [0, 0, 1, 1],
				flag: (
					<img className="flag" alt="country-flag" src="flags/Norway.png" />
				),
			},
		],
	];

	const cardListData = [
		{
			data: biatlhonData,
			title: "BIATLHLON",
			subTitle: "100M R-1 GIRLS",
			line: <RedCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			data: biatlhonData,
			title: "CROSS COUNTRY SKIING",
			subTitle: "10 km Individual start free (boys)",
			line: <YellowCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			data: biatlhonData,
			title: "ALPINE SKIING",
			subTitle: "Slalom (boys)",
			line: <GreenCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			data: biatlhonData,
			title: "SNOWBOARD",
			subTitle: "Big Air (Boys)",
			line: <BlueCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			data: biatlhonData,
			title: "FREESTYLE SKIING",
			subTitle: "Big Air (Boys)",
			line: <RedCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			data: biatlhonData,
			title: "FIGURE SKATING",
			subTitle: "Single Skating Free Skating (Boys)",
			line: <YellowCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			data: biatlhonData,
			title: "SHORT TRACK",
			subTitle: "Boys 1500 m",
			line: <GreenCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
	];
	return (
		<div className="container">
			<img className="backgroundImage" alt="background" src="image.png" />

			<Header />
			<div className="innerContainer">
				{cardListData.map((element, index) => {
					return (
						<Card
							key={index}
							data={element.data}
							title={element.title}
							subTitle={element.subTitle}
							line={element.line}
							intervalTime={element.interval}
							cardLine={element.line}
						/>
					);
				})}

				<HockeyCard boysData={hockeyBoysData} girlsData={hockeyGirlsData} />
			</div>
		</div>
	);
}

export default App;

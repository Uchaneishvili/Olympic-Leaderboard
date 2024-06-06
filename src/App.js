import "./App.css";
import Header from "./components/header/Header";
import Card from "./components/card/Card";
import { BiatlhlonCardLine } from "./components/ui/icons/icons";

function App() {
	const biatlhonData = [
		{
			country: "SLO",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovenia.png" />
			),
			name: "L. Repinc",
			time: "31:34.07",
		},
		{
			country: "POL",
			flag: <img className="flag" alt="country-flag" src="flags/Poland.png" />,
			name: "K. Badacz",
			time: "31:34.12",
		},
		{
			country: "SVK",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovakia.png" />
			),
			name: "J. Borgula",
			time: "31:34:20",
		},
		{
			country: "SWE",
			flag: <img className="flag" alt="country-flag" src="flags/Sweden.png" />,
			name: "S. Anderson",
			time: "31:34.39",
		},
		{
			country: "FRA",
			flag: <img className="flag" alt="country-flag" src="flags/France.png" />,
			name: "L. Thievent",
			time: "31:34.59",
		},
		{
			country: "ITA",
			flag: <img className="flag" alt="country-flag" src="flags/Italy.png" />,
			name: "E. Mondinelli",
			time: "31:35.05",
		},
		{
			country: "AUT",
			flag: <img className="flag" alt="country-flag" src="flags/Austria.png" />,
			name: "V. Olivier",
			time: "31:35.10",
		},
	];

	const cardListData = [
		{
			data: biatlhonData,
			title: "BIATLHLON",
			subTitle: "100M R-1 GIRLS",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "CROSS COUNTRY SKIING",
			subTitle: "10 km Individual start free (boys)",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "ALPINE SKIING",
			subTitle: "Slalom (boys)",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "SNOWBOARD",
			subTitle: "Big Air (Boys)",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "FREESTYLE SKIING",
			subTitle: "Big Air (Boys)",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "FIGURE SKATING",
			subTitle: "Single Skating Free Skating (Boys)",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "SHORT TRACK",
			subTitle: "Boys 1500 m",
			line: <BiatlhlonCardLine />,
		},
		{
			data: biatlhonData,
			title: "SHORT TRACK",
			subTitle: "Boys 1500 m",
			line: <BiatlhlonCardLine />,
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
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;

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
import {
	biatlhonDataGirls,
	biatlhonDataBoys,
	hockeyBoysData,
	hockeyGirlsData,
	crossCountryDataBoys,
	crossCountryDataGirls,
	alpineSkiingBoys,
	freestyleBoys,
	freestyleGirls,
	figureSkatingBoys,
	figureSkatingGirls,
	shortTrackBoy,
	shortTrackGirl,
	snowBoardGirls,
	snowBoardingBoys,
} from "./data";

function App() {
	const cardListData = [
		{
			boysData: biatlhonDataBoys,
			girlsData: biatlhonDataGirls,
			type: "time",
			title: "BIATLHLON",
			subTitle: ["100M R-1 GIRLS", "100M R-1 BOYS"],
			line: <RedCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: crossCountryDataBoys,
			girlsData: crossCountryDataGirls,
			type: "time",
			title: "CROSS COUNTRY SKIING",
			subTitle: [
				"10 KM INDIVIDUAL START FREE (BOYS)",
				"10 KM INDIVIDUAL START CLASSIC (GIRLS)",
			],
			line: <YellowCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: alpineSkiingBoys,
			girlsData: alpineSkiingBoys,
			title: "ALPINE SKIING",
			type: "time",
			subTitle: ["SLALOM (BOYS)", "SLALOM (GIRLS)"],
			line: <GreenCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: snowBoardingBoys,
			girlsData: snowBoardGirls,
			title: "SNOWBOARD",
			type: "ranking",
			subTitle: ["BIG AIR (BOYS)", "BIG AIR (GIRLS)"],
			line: <BlueCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: freestyleBoys,
			girlsData: freestyleGirls,
			title: "FREESTYLE SKIING",
			type: "point",
			subTitle: ["BIG AIR (BOYS)", "BIG AIR (GIRLS)"],
			doubledDigit: false,
			line: <RedCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: figureSkatingBoys,
			girlsData: figureSkatingGirls,
			title: "FIGURE SKATING",
			type: "point",
			doubledDigit: true,
			subTitle: [
				"SINGLE SKATING FREE SKATING (BOYS)",
				"SINGLE SKATING FREE SKATING (GIRLS)",
			],
			line: <YellowCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: shortTrackBoy,
			girlsData: shortTrackGirl,
			title: "SHORT TRACK",
			subTitle: ["BOYS 1500M", "GIRLS 1500M"],
			type: "time",
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
							boysData={element.boysData}
							girlsData={element.girlsData}
							title={element.title}
							subTitle={element.subTitle}
							line={element.line}
							type={element.type}
							intervalTime={element.interval}
							doubledDigit={element.doubledDigit || false}
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

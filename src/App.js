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
			// subTitle: ["100M R-1 GIRLS", "100M R-1 BOYS"],
			subTitle: ["100M R-1 GIRLS"],
			line: <RedCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
			average: 30,
			format: "mm:ss.SS",
		},
		{
			boysData: crossCountryDataBoys,
			girlsData: crossCountryDataGirls,
			type: "time",
			title: "CROSS COUNTRY SKIING",
			// subTitle: [
			// 	"10 KM INDIVIDUAL START FREE (BOYS)",
			// 	"10 KM INDIVIDUAL START CLASSIC (GIRLS)",
			// ],

			subTitle: ["10 KM INDIVIDUAL START FREE (BOYS)"],
			line: <YellowCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
			average: 20,
			format: "mm:ss.SS",
		},
		{
			boysData: alpineSkiingBoys,
			girlsData: alpineSkiingBoys,
			title: "ALPINE SKIING",
			type: "time",
			// subTitle: ["SLALOM (BOYS)", "SLALOM (GIRLS)"],
			subTitle: ["SLALOM (BOYS)"],
			line: <GreenCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
			average: 1,
			format: "m:ss.SS",
		},
		{
			boysData: snowBoardingBoys,
			girlsData: snowBoardGirls,
			title: "SNOWBOARD",
			type: "ranking",
			// subTitle: ["BIG AIR (BOYS)", "BIG AIR (GIRLS)"],
			subTitle: ["BIG AIR (BOYS)"],
			line: <BlueCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: freestyleBoys,
			girlsData: freestyleGirls,
			title: "FREESTYLE SKIING",
			type: "point",
			// subTitle: ["BIG AIR (BOYS)", "BIG AIR (GIRLS)"],
			subTitle: ["BIG AIR (BOYS)"],
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
			subTitle: ["SINGLE SKATING FREE SKATING (BOYS)"],
			// subTitle: [
			// 	"SINGLE SKATING FREE SKATING (BOYS)",
			// 	"SINGLE SKATING FREE SKATING (GIRLS)",
			// ],
			line: <YellowCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
		},
		{
			boysData: shortTrackBoy,
			girlsData: shortTrackGirl,
			title: "SHORT TRACK",
			subTitle: ["BOYS 1500M"],
			// subTitle: ["BOYS 1500M", "GIRLS 1500M"],
			type: "time",
			line: <GreenCardLine />,
			interval: Math.floor(Math.random() * 3 + 1),
			average: 3,
			subType: "shortTrack",
			format: "m:ss.SSS",
		},
	];
	return (
		<div>
			<img
				className="background"
				alt="background"
				src="assets/background/background.png"
			/>
			<Header />
			<div className="container">
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
							average={element.average || 0}
							format={element.format || ""}
						/>
					);
				})}

				<HockeyCard boysData={hockeyBoysData} girlsData={hockeyGirlsData} />
			</div>
		</div>
	);
}

export default App;

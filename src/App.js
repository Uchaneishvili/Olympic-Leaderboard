import "./App.css";
import Header from "./components/header/Header";
import Card from "./components/card/Card";

function App() {
	return (
		<div className="container">
			<Header />
			<div className="innerContainer">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</div>
	);
}

export default App;

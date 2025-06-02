import { useState } from "react";
import "./App.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
	const [city, setCity] = useState("");
	const [result, setResult] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const handleOnChange = (e) => {
		setCity(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		const url = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}`;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log("data: ", data);
				const temp = data.current.temp_c;
				const humidity = data.current.humidity;
				const windSpeed = data.current.wind_kph;
				const condition = data.current.condition.text;

				setResult({ temp, humidity, windSpeed, condition });
			})
			.catch((err) => {
				console.error(err);
				alert("Failed to fetch weather data");
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="weather-app">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter city name"
					value={city}
					onChange={handleOnChange}
				/>
				<button type="submit">Search</button>
			</form>
			{isLoading ? (
				<p>Loading data...</p>
			) : result ? (
				<div className="weather-cards">
					<span className="weather-card">
						<b>Temperature</b>
						<p>{result.temp}&deg;C</p>
					</span>
					<span className="weather-card">
						<b>Humidity</b>
						<p>{result.humidity}%</p>
					</span>
					<span className="weather-card">
						<b>Condition</b>
						<p>{result.condition}</p>
					</span>
					<span className="weather-card">
						<b>Wind Speed</b>
						<p>{result.windSpeed}&nbsp;kph</p>
					</span>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default App;

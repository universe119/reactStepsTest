import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Pic from "../common/Pic";

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	const api_key = "AIzaSyC0YTkwnKAxe7Th6bkOdlmS5uW4auLXs8s";
	const pid = "PLbavOBDiF2ET3lP5KfSAKyfAH-8oVGPQm";
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

	useEffect(() => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				console.log(json.items);

				setVids(json.items);
			});
	}, []);

	return (
		<Layout title={"YOUTUBE"}>
			{Vids.map((vid, idx) => {
				return (
					<article key={idx}>
						<Pic className="thumb" src={vid.snippet.thumbnails.high.url} />
						<h3>{vid.snippet.title}</h3>
						<p>{vid.snippet.description}</p>
						<span>{vid.snippet.publishedAt}</span>
					</article>
				);
			})}
		</Layout>
	);
}

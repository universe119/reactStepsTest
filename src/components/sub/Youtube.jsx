import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Pic from "../common/Pic";
import useShortenText from "../../../hooks/useShortenText";
import useCombineText from "../../../hooks/useCombineText";

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	const shortenText = useShortenText();
	const combineText = useCombineText();

	const fetchYoutube = () => {
		const api_key = import.meta.env.VITE_YOUTUBE_API;
		const pid = "PLbavOBDiF2ET3lP5KfSAKyfAH-8oVGPQm";
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				console.log(json.items);

				setVids(json.items);
			});
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={"YOUTUBE"}>
			{Vids.map((vid, idx) => {
				return (
					<article key={idx}>
						<Pic className="thumb" src={vid.snippet.thumbnails.high.url} />
						<h3>{shortenText(vid.snippet.title, 60)}</h3>
						<p>{shortenText(vid.snippet.description, 150)}</p>
						<span>{combineText(vid.snippet.publishedAt.split("T")[0], "-", ".")}</span>
						{/* 내가한거<span>{combineText(vid.snippet.publishedAt, "-", ".")}</span> */}
					</article>
				);
			})}
		</Layout>
	);
}

// 미션 - useCombineText란 이름으로 날짜값을 변경해주는 함수
// 함수명(전체문자열, 원본 구분자, 변경할 구분자)
// 함수(2012-02-10, "-", ".") --> 2012.02.10

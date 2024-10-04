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
						<h3>{shortenText(vid.snippet.title, 60)}</h3>
						<div className="txt">
							<p>{shortenText(vid.snippet.description, 150)}</p>
							<span>{combineText(vid.snippet.publishedAt.split("T")[0], "-", ".")}</span>
						</div>
						<Pic className="thumb" src={vid.snippet.thumbnails.high.url} />
						{/* 내가한거<span>{combineText(vid.snippet.publishedAt, "-", ".")}</span> */}
					</article>
				);
			})}
		</Layout>
	);
}

// 미션
// 해당 목록을 반응형 처리
// 타블릿에서는 제목, txt박스 한줄 그밑에 이미지 배치하는 형태로 구현
// 모바일에서는 모두 한줄로 구현

import { useEffect, useState } from "react";
import Layout from "../common/Layout";

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	console.log(Vids);

	const api_key = "AIzaSyC0YTkwnKAxe7Th6bkOdlmS5uW4auLXs8s";
	const pid = "PLbavOBDiF2ET3lP5KfSAKyfAH-8oVGPQm";
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

	// 아래와 같이 서버에서 가져온 데이터를 컴포넌트 안쪽에서 활용하기 위해 state담는 구문을 useEffect를 사용하지 않고 바로 활용하면 데이터를 무한 호출하는 이슈가 발생

	// 미션 - 아래 코드를 호출해서 무한데이터 호출이 발생하는 현상을 확인한 뒤 , 위와 같은 이슈가 발생하는 원인 고민 (45분까지)
	// fetch(url)
	// 	.then(data => data.json())
	// 	.then(json => {
	// 		const youtubeArr = json.items;
	// 		setVids(youtubeArr);
	// 	});

	return <Layout title={"YOUTUBE"}></Layout>;
}

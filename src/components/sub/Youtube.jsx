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

	// 기본적으로 리액트는 state값 변경을 자동으로 인지해서 자기자신 컴포넌트 함수를 재호출해서 해당 state 정보값에 기반한 새로운 JSX로 반환으로 화면의 변경점 갱신
	// 위의 관점에서 봤을때 useEffect를 활용하지 않고, 바로 서버데이터를 state에 담으면 처음 마운트시 서버에서 데이터를 가져오고 해당 데이터를 state에 담자마자 컴포넌트는 재호출됨
	//  컴포넌트가 재호출되면 다시 또 다시 서버 데이터를 가져오고 다시 state에 담음 - 이와 같이 위의 로직이 무한반복 처리됨
	// 해결방법 : 의존성배열이 비어있는 useEffect의 콜백함 수안쪽에 data fetching 및 state에 담는 로직을 호출해서
	// 컴포넌트 마운트시 처음한번만 호출되도록 강제해야함.
	// 위의 개념을 바탕으로 10분 쉰 뒤,

	// 미션 - 11시 5분까지 useEffect로 위의 이슈사항 해결
	// fetch(url)
	// 	.then(data => data.json())
	// 	.then(json => {
	// 		const youtubeArr = json.items;
	// 		setVids(youtubeArr);
	// 	});

	return <Layout title={"YOUTUBE"}></Layout>;
}

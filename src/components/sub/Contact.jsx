import { useEffect, useState } from "react";
import Layout from "../common/Layout";

export default function Contact() {
	//순서1: 서버쪽에서 받아올 데이터를 담을 빈 배열 state공간 및 함수 생성
	const [Data, setData] = useState([]);

	//순서2: 의존성배열이 비어있는 useEffect코드
	useEffect(() => {
		fetch("/data.json") // public에 넣어야지 되는 이유를 모르겠음
			.then(data => data.json())
			.then(json => {
				console.log(json);
				//순서3: 서버에서 가져온 데이터에서 배열만 뽑은 뒤 무조건 state에 옮겨담기
				setData(json.data);
			});
	}, []);

	return (
		<Layout title={"CONTACT"}>
			{Data.map((data, idx) => {
				return (
					// 순서4:반복시 무조건 idx로 키값 설정
					<article key={idx}>
						<h2>{data.name}</h2>
					</article>
				);
			})}
		</Layout>
	);
}

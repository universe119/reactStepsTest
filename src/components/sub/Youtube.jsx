import { useEffect, useState } from "react";
import Layout from "../common/Layout";

export default function Youtube() {
	const [Num, setNum] = useState(0);

	useEffect(() => {
		// 의존성배열이 비어있는 useEffect안쪽의 콜백함수는 컴포넌트 마운트시 한번만 호출됨
		// 무거운 데이터를 서버쪽에서부터 가져와야 될때
		// window객체에 이벤트 연결시
		console.log("Mounted");

		return () => {
			// clean-up함수 해당 컴포넌트 언마운트시 실행될 함수
			// window객체에서 이벤트 연결 해제할때
			console.log("UnMounted");
		};
	}, []);

	useEffect(() => {
		// 의존성배열에 등록된 Num값이 변경될때마다 useEffect안쪽의 콜백함수 호출됨.
		// 특정 state값이 변경시마다 특정 코드 로직의 기능을 실행해야 될때
		console.log("Num값 변경될때마다 호출");
	}, [Num]);

	return (
		<Layout title={"YOUTUBE"}>
			<h2>{Num}</h2>
			<button onClick={() => setNum(Num + 1)}>changeNum</button>
		</Layout>
	);
}
/*
	useEffect(생명주기 관리함수 : 생성(Mount), 변경(ReRender), 소멸(UnMount))
*/

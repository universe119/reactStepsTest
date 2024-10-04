import { useState } from "react";
import Layout from "../common/Layout";

export default function Youtube() {
	// 스니펫으로 mus로 불러옴 변수 소문자로 쓰고 탭키누르고 ctrl+space 해서 import하고 탭누르고 초기값 설정.
	const [Num, setNum] = useState(0);

	// 기능을 만드는 함수는 카멜케이스식으로 만드는게 좋은것같다.
	const minusNum = () => {
		setNum(Num - 1);
	};

	return (
		<Layout title={"YOUTUBE"}>
			<h2>{Num}</h2>
			<button onClick={minusNum}>minus</button>
			<button onClick={() => setNum(Num + 1)}>plus</button>
		</Layout>
	);
}

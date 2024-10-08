import { useLocation } from "react-router-dom";
import useSplitText from "../../hooks/useSplitText";
import { useEffect, useRef } from "react";

export default function Layout({ title, children }) {
	//커스텀훅으로 핸들러함수 안쪽에서 호출할 수 있는 실제사용가능한 함수 반환 받음
	const ref_title = useRef(null);

	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes("/youtube/");

	useEffect(() => {
		//훅 자체적으로 참조객체 요소 활성화 처리
		splitText(ref_title, 0.1, 2);
	}, []);

	return (
		<main className={isDetail ? "detail" : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<section>{children}</section>
		</main>
	);
}

/*
	motion 컴포넌트에서 자주 쓰는 스타일 속성
	x: 가로축 이동 (숫자, 퍼센트는 문자열 처리)
	y: 세로축 이동
	scale:확대
	rotate: 회전
	opacity: 투명도
*/

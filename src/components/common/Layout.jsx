import { useLocation } from "react-router-dom";
import useSplitText from "../../hooks/useSplitText";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MaskText from "./MaskText";

export default function Layout({ title, children }) {
	//커스텀훅으로 핸들러함수 안쪽에서 호출할 수 있는 실제사용가능한 함수 반환 받음
	const ref_title = useRef(null);

	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes("/youtube/");

	useEffect(() => {
		// 전달한 인수가 3개 이상일때는 객체형식으로 전달
		splitText(ref_title, { interval: 0.1, delay: 0 });
		// useEffect에 의존성 배열에 특정 값을 등록하라고 뜨는 경우
		// 해당 컴포넌트자제척으로 제어되지 않은 요소가 useEffect안쪽에서 활용되고 있을 때 등록하라는 권공 사항 출력
		// 해결방법 : 등록 처리(잘못등록하면 재귀적호출 되면서 무한 호출문제)
		// 무한호출시 해결방법:useMemo, useCallback등의 메모리제이션 훅을 이용해서 강제로 메모리에 등록 후 사용
	}, []);

	return (
		<main className={isDetail ? "detail" : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<MaskText duration={1} delay={0} color={"#000"}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ad.
			</MaskText>
			<br />

			<MaskText duration={0.6} delay={1} color={"red"} style={{ marginTop: 50, fontSize: 80, fontFamily: "raleway" }}>
				Lorem ipsum dolor sit, amet consectetur adipisicing.
			</MaskText>

			<motion.section
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
				transition={{ duration: 0.5, delay: 0.3, ease: "linear" }}>
				{children}
			</motion.section>
		</main>
	);
}

/*
slogan프레임이 활성화되면(on클래스 붙으면)
마스크박스가 왼쪽밖에서 오른쪽밖으로 1초동안 등속이속
마스크가 절반이동한 시점인 0.5초시점에 span텍스트를 보임처리
*/

/*
	motion 컴포넌트에서 자주 쓰는 스타일 속성
	x: 가로축 이동 (숫자, 퍼센트는 문자열 처리)
	y: 세로축 이동
	scale:확대
	rotate: 회전
	opacity: 투명도
*/

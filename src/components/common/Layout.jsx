import { useLocation } from "react-router-dom";
import useSplitText from "../../hooks/useSplitText";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Layout({ title, children }) {
	//커스텀훅으로 핸들러함수 안쪽에서 호출할 수 있는 실제사용가능한 함수 반환 받음
	const ref_title = useRef(null);
	const ref_slogan = useRef(null);

	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes("/youtube/");

	useEffect(() => {
		// 전달한 인수가 3개 이상일때는 객체형식으로 전달
		splitText(ref_title, { interval: 0.1, delay: 0 });
		ref_slogan.current.classList.add("on");
	}, []);

	return (
		<main className={isDetail ? "detail" : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<div className="slogan" ref={ref_slogan}>
				<span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, voluptate?</span>
				<div className="mask"></div>
			</div>

			<motion.section
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
				transition={{ duration: 1, delay: 0.5 }}>
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

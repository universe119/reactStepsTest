import { useLocation } from "react-router-dom";
import useSplitText from "../../hooks/useSplitText";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MaskText from "./MaskText";
import Mask from "./Mask";

export default function Layout({ title, children }) {
	//커스텀훅으로 핸들러함수 안쪽에서 호출할 수 있는 실제사용가능한 함수 반환 받음
	const ref_title = useRef(null);

	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes("/youtube/");

	useEffect(() => {
		// 전달한 인수가 3개 이상일때는 객체형식으로 전달
		// 마스크 순번2 - 마스크 모션이 끝날때 바로 제목 타이핑 모션
		splitText(ref_title, { interval: 0.1, delay: 0.3 });
		// useEffect에 의존성 배열에 특정 값을 등록하라고 뜨는 경우
		// 해당 컴포넌트자제척으로 제어되지 않은 요소가 useEffect안쪽에서 활용되고 있을 때 등록하라는 권공 사항 출력
		// 해결방법 : 등록 처리(잘못등록하면 재귀적호출 되면서 무한 호출문제)
		// 무한호출시 해결방법:useMemo, useCallback등의 메모리제이션 훅을 이용해서 강제로 메모리에 등록 후 사용
	}, []);

	return (
		<>
			<main className={isDetail ? "detail" : title.toLowerCase()}>
				{/* <motion.h1 ref={ref_title} exit={{ opacity: 0, transition: { delay: 0 } }}>
					{title}
				</motion.h1> */}
				<h1 ref={ref_title}>{title}</h1>

				{/* 마스크 순번3 - 텍스트 타이핑 모션 끝날 시점에 첫줄 텍스트 마스크 모션 시작 */}
				<MaskText delay={1} color={"#444"} style={{ fontSize: 20, fontFamily: "arial" }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ad.
				</MaskText>
				<br />

				{/* 마스크 순번4 - 첫줄 텍스트 마스크 모션 끝날때 둘째줄 텍스트 마스크 모션 시작 */}
				<MaskText delay={1.5} color={"#444"} style={{ marginBottom: 120 }}>
					Lorem ipsum dolor sit, amet consectetur adipisicing.
				</MaskText>

				{/* 마스크 순번5 - 두번째 줄 마스크 모션 끝날때 쯤 전체 컨텐츠 영상 위쪽으로 페이드인 시작 */}
				<motion.section
					initial={{ opacity: 0, y: 200 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
					transition={{ duration: 0.5, delay: 1.5, ease: "linear" }}>
					{children}
				</motion.section>
			</main>

			{/* 마스크 순번1 - 페이지 전환시 바로 전체화면을 가리는 마스크모션 실행 */}
			{/* 다른 요소와는 다르게 전체 페이지를 덮을 때에는 Mask요소가 브라우저를 기준으로 위치가 배치가되야 하므로 기존 absolute에서 fixed속성으로 변경 */}
			<Mask duration={0.5} delay={0} style={{ position: "fixed" }} />
		</>
	);
}

/*
미션(11시 40분까지)
- 전체 페이지 전환 마스크 모션 끝난 이후, 페이지 별 세부 모션 실행되도록 수정 (딜레이나 모션값을 수정)
*/

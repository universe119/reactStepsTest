import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MaskText from "./MaskText";
import Mask from "./Mask";
import SplitText from "./SplitText";

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes("/youtube/");
	return (
		<>
			<main className={isDetail ? "detail" : title.toLowerCase()}>
				{/* <motion.h1 ref={ref_title} exit={{ opacity: 0, transition: { delay: 0 } }}>
					{title}
				</motion.h1> 내가 잠깐 만들어봤지만 성능면에서 별로였던 코드*/}
				{/* <h1 ref={ref_title}>{title}</h1>
				 */}
				<SplitText delay={0.5}>{title}</SplitText>

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

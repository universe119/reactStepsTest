import { motion } from "framer-motion";

export default function MaskText({ children, duration = 0.5, delay = 0, color = "#000", style }) {
	//기본 스타일 객체
	// 외부 스타일 파일로 스타일 지정하면 해당 컴포넌트를 범용적으로 사용하기 번거로움
	// 이러한 문제점을 개선하기 위해 대안책 (styledComponent, tailwindCss, 스타일 객체를 직접 내부에 생성)
	const frameStyle = {
		fontSize: "1.2rem",
		fontFamily: "orbitron",
		color: color,
		display: "inline-block",
		position: "relative",
		overflow: "hidden",
		marginBottom: 10
	};
	const maskStyle = {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		backgroundColor: color
	};

	return (
		// 텍스트를 감싸주는 Wrapper
		// 해당 모션 컴포넌트의 스타일을 부모컴포넌트에 호출시 편하게 변경처리 하기 위해서 전달받은 style 객체로 기존 style 객체 덮어씀
		<div style={{ frameStyle, ...style }}>
			{/* children으로 전달된 실제텍스트를 span으로 전달된 요소 */}
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0 } }}
				transition={{ duration: 0.1, delay: duration / 2 + delay }}>
				{children}
			</motion.span>
			{/* wrapper 안쪽에 실제 텍스트를 가려줄 마스크오소 */}
			<motion.div
				style={{ ...maskStyle, ...style }}
				initial={{ x: "-101%" }}
				animate={{ x: "101%" }}
				transition={{ duration, delay }}></motion.div>
		</div>
	);
}

/*
미션
- MaskBox.jsx 라는 새로운 컴포넌트 생성
- 이미지나 그룹덩어리의 박스요소에 마스크 모션처리
*/

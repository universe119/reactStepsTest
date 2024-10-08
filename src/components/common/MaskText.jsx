import { motion } from "framer-motion";

export default function MaskText({ children, duration = 0.5, delay = 0, color = "#000", style }) {
	//기본 스타일 객체
	const frameStyle = {
		fontSize: "1.2rem",
		fontFamily: "orbitron",
		color: color,
		display: "inline-block",
		position: "relative",
		overflow: "hidden",
		marginBottom: 20
	};
	const maskStyle = {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		backgroundColor: color
	};

	return (
		<div style={frameStyle}>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0 } }}
				transition={{ duration: 0.1, delay: duration / 2 + delay }}>
				{children}
			</motion.span>

			<motion.div
				style={{ ...maskStyle, ...style }}
				initial={{ x: "-101%" }}
				animate={{ x: "100%" }}
				transition={{ duration, delay }}></motion.div>
		</div>
	);
}

/*
미션
- MaskBox.jsx 라는 새로운 컴포넌트 생성
- 이미지나 그룹덩어리의 박스요소에 마스크 모션처리
*/

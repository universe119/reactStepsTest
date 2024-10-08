import { motion } from "framer-motion";

export default function MaskText({ children, duration = 0, delay = 0, color = "#555", style }) {
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
다음의 불편한 점을 개선하기 위한 props 설정
- 컴포넌트 호출시 마스크 모션시간 제어
- 컴포넌트 호출시 마스크 모션이 시작되기까지의 지연시간 제어
- 마스크색상값도 지정 가능
- 마스크색상값 텍스트 색상값 연동
- 글자크기, 글꼴 마진 값등 자잘한 스타일을 호출시에 적용 가능
// - 글자크기, 글꼴, 마진 값등 자잘한 스타일을 호출시에 적용가능
*/

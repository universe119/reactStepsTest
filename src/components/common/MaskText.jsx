import { motion } from "framer-motion";

export default function MaskText({ children, duration = 0.5, delay = 0, color = "#000", style }) {
	// component styles
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

	// span text motion styles
	const spanMotion = {
		in: { opacity: 0 },
		on: { opacity: 1 },
		out: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.1, delay: duration / 2 + delay }
	};
	// mask motion
	const maskMotion = {
		in: { x: "-101%" },
		on: { x: "101%" },
		time: { duration, delay }
	};

	return (
		// 텍스트를 감싸주는 Wrapper
		// 해당 모션 컴포넌트의 스타일을 부모컴포넌트에 호출시 편하게 변경처리 하기 위해서 전달받은 style 객체로 기존 style 객체 덮어씀
		<div style={{ ...frameStyle, ...style }}>
			{/* children으로 전달된 실제 텍스트를 span으로 wrapping처리 */}
			<motion.span variants={spanMotion} initial="in" animate="on" exit="out" transition={spanMotion.time}>
				{children}
			</motion.span>
			{/* wrapper 안쪽에 실제 텍스트를 가려줄 마스크오소 */}
			<motion.div
				style={{ maskStyle }}
				variants={maskMotion}
				initial="in"
				animate="on"
				transition={maskMotion.time}></motion.div>
		</div>
	);
}

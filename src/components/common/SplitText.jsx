import { motion } from "framer-motion";

//아래와 같이 부수효과(Side Effect)를 발생시키지 않는 순수함수(Pure Function)형태로 제작하는 것이 권장사항
//부수효과: setTimeout, DOM, fetch등 web api에 의존함으로서 비동기등의 예상치못한 결과값을 야기시키는 효과
//순수함수: 위와 같은 부수효과를 발생시키지 않는 형태의 함수
//리액트에서 순수함수를 권장하는 이유 : 브라우저의 개입없이 리액트 자체적으로 메모리단에서 모든 데이터를 관리하기때문에 데이터추적, 성능면에서 리액의 개발원칙과 부합됨
//props (children:텍스트값, style:커스텀할 스타일객체, interval:시간차간격, delay:지연시간, duration:각 문자마다 적용할 모션시간)
export default function SplitText({ children, style, interval = 0.1, delay = 0, duration = 0.3 }) {
	//내부적으로 빈배열 생성해서 children으로 전달받은 문자열을 반복돌면서 배열에 담아줌
	const textArr = [];
	for (const letter of children) textArr.push(letter);

	//부모요소를 통해서 동적으로 반복생성될 자식요소인 span에 적용할 서식 관련 스타일만 전달
	//서식외의 스타일구문은 자식요소로 자동 상속이 안됨 (marginBottom은 span에 상속이 안 먹고 부모요소인 h2에만 적용됨)
	const titStyle = {
		display: "inline-block",
		marginBottom: 50,
		fontWeight: 100,
		fontSize: "6vmax",
		fontFamily: "raleway",
		lineHeight: 1,
		color: "#333",
		...style
	};

	// motion 컴포넌트에 적용할 옵션정보를 객체형태로 구조화한뒤 다시 비구조화할당으로 추출
	const { init, active, out } = {
		// in이라는게 for in이라는 것이 있어서 객체명이 겹칠수도 있으니 init으로 쓰심
		init: { scale: 2, opacity: 0 },
		active: { scale: 1, opacity: 1 },
		out: { opacity: 0, transition: { duration: duration, delay: 0 } }
	};

	return (
		<h2 style={titStyle}>
			{textArr.map((el, idx) => (
				<motion.span
					style={{ display: "inline-block" }}
					key={idx}
					initial={init}
					animate={active}
					exit={out}
					transition={{ duration: duration, delay: interval * idx + delay }}>
					{el}
				</motion.span>
			))}
		</h2>
	);
}

/*
	미션 (1시 30분까지 제작)
	- 기존 useSplitText라는 커스텀 훅으로 문자열 반복생성하는 문제점 파악 (리얼돔 제어, useEffect를 통해 리얼돔에 다시 클래스를 제어하는 모션 형태(비권장 방식)  )
	- 아예 span요소르 분리된 새로운 가상돔을 반환하는 형태로 컴포넌트 함수 제작 (리액트 개발 의도에 부합됨)
	- 순서1 : children으로 전달받은 문자값을 컴포넌트 내부에서 배열로 변환
	- 순서2 : 변환된 문자열 배열을 반복돌며 span가상돔 요소로 반복 생성
	- 순서3 : 반복생성될때 scss파일이 아닌 스타일 객체를 직접 연결해 재사용성 올림
	- 순서4 : props를 전달하여 지연시간, 스타일 정보등을 호출시에 정할수 있도록 개발 편의성 고도화
*/

import Layout from "../common/Layout";
import memberData from "../../data/memberData";
import Pic from "../common/Pic";
import { useRef } from "react";

/*
	참조객체에 가상돔을 담아 활용하는 패턴
	1. useRef로 빈 참조객체 개성
	2. 원하는 가상돔요소(JSX El) ref속성으로 참조객체 연결
	3. 참조객체명.current 로 해당요소를 가져와서 제어
*/
export default function Members() {
	// h2가상돔 요소 클릭
	const pEl = useRef(0);
	console.log(pEl);

	const changeColor = () => {
		console.log(pEl);

		// changeColor 함수가 호출되는 순간 가상돔 요소를 찾는 것이 아닌
		// 이전 렌더링 사이클 때 변환된 리얼돔을 직접 가져와서 스타일 변경
		// 이처럼 가상돔이 아닌 이전 렌더링 타임에 생성된 리얼돔을 직접 제어하면 안되는 이유
		// 문제점1: 리액트에서 중요한 정보로 취급하는 state와 연관이 없는 일반 html DOM요소를 제어하기 때문에 추후 데이터 추적 불가능
		// 문제점2 : 현재 렌더링 사이클에서 다루고 있는 최신 요소가 아닌 이전 렌더링때 생성된 요소를 다루기 때문에 잘못된 예전 데이터를 다루게 됨
		// 브라우저 상에서 끌어옴
		// const pEl = document.querySelector(".titBox p");
		// 참조객체의 가상돔을 제어하면 현재 렌더링 사이클의 초신 가상돔 정보를 제어가능(관련 내용은 렉시컬 스코프랑 고차함수 카페에서 보자.)
		pEl.current.style.color = "red";
	};

	return (
		<Layout title={"MEMBERS"}>
			{/* 첫번째 데이터만 뽑아서 출력 */}
			<article className="ceoBox">
				<div className="txt">
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				<Pic className="pic" src={"/" + memberData[0].pic} shadow />
			</article>

			<article className="memberListBox">
				<div className="titBox">
					<h2 onClick={changeColor}>Our Team Members</h2>
					{/* 미리 생성한 빈 참조객체에 담고 싶은 가상돔요소에 ref속성으로 연결 */}
					<p ref={pEl}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus non ipsa cum. Veritatis, dolore
						aliquam? Consectetur assumenda dolor labore.
					</p>
				</div>

				<ul>
					{memberData.map((member, idx) => {
						//첫번째 순번의 데이터가 아닐때에만 반복출력
						if (idx !== 0) {
							return (
								<li key={idx}>
									{/* 이미지 컴포넌트 호출후 src에 이미지 url값 전달, pic클래스에는 이미지의 크기정도만 지정 */}
									<Pic src={member.pic} className="pic" shadow={true} />
									<div className="txt">
										<h2>{member.name}</h2>
										<p>{member.position}</p>
									</div>
								</li>
							);
						}
					})}
				</ul>

				<div className="descBox">
					<h2>Lorem ipsum dolor sit.</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse cupiditate, vitae deleniti repellat
						explicabo sit, corrupti beatae dicta, nulla optio corporis alias. Perferendis quidem sapiente minima,
						quisquam inventore soluta.
					</p>
				</div>
			</article>
		</Layout>
	);
}
//미션
//위의 7개 배열 중에서 첫번쨰 데이터만 .ceoBox안쪽출력
//첫번째를 제외한 나머지 6개 데이터만 기존 반복문 구문 안에서 출력

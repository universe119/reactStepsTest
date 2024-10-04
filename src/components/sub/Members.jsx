import Layout from "../common/Layout";
import memberData from "../../data/memberData";
import Pic from "../common/Pic";

export default function Members() {
	return (
		<Layout title={"MEMBERS"}>
			{/* 첫번째 데이터만 뽑아서 출력 */}
			<article className="ceoBox">
				<div className="txt">
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				<div className="pic">
					<Pic className="pic" src={"/" + memberData[0].pic} shadow />
				</div>
			</article>

			<article className="memberListBox">
				<div className="titBox">
					<h2>Our Team Members</h2>
					<p>
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
									<div className="pic">
										{/* 이미지 컴포넌트 호출후 src에 이미지 url값 전달, pic클래스에는 이미지의 크기정도만 지정 */}
										<Pic src={member.pic} className="pic" shadow={true} />
									</div>
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

import Layout from "../common/Layout";
import Content from "../common/Content";
import MailForm from "../common/MailForm";

export default function Contact() {
	return (
		<Layout title={"CONTACT"}>
			<Content delay={1}>
				<MailForm />
			</Content>
		</Layout>
	);
}
/*
  1. useState를 이용해서 state에 값을 옮겨담고 state변경함수로 state값 변경처리
  2. useEffect구문의 구조를 파악하고 의존성 배열의 역할
  3. useState와 useEffect를 활용해서 서버 데이터 fetching처리후 state에 담기
  4. 다이나믹 라우터를 이용해서  /youtube/:id를 활용해서 상세페이지에 특정 id값 전달하는 방법
  5. 상태값에 있는 객체를 불러올떄 ?. 형태로 옵셔녈 체이닝을 처리하는 이유
*/

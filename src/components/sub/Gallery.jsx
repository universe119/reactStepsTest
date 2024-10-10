import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Pic from "../common/Pic";
import Modal from "../common/Modal";
import Content from "../common/Content";

export default function Gallery() {
	console.log("Rendered");

	const [Flickr, setFlickr] = useState([]);
	// console.log(Flickr);
	//모달 컴포넌트 출력여부를 결정할 state생성
	const [ModalOpen, setModalOpen] = useState(false);

	//클릭한 목록요소의 순번을 담을 상태값 생성
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		// people에 flickr.people.getPhotos메서드 연결
		const method = "flickr.people.getPhotos";
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = "201494903@N03";
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?api_key=${flickr_api}&method=${method}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
			});
	}, []);

	// 의존성 배열에 ModalOpen상태값을 연결해서 모달창이 열리고 닫힐때마다
	// body요소의 스크롤바 기능 여부를 분기처리
	// 정리 : 리액트는 HTML, JS작업방식처럼 직접적인 DOM을 제어하는 방식이 아닌 State의 변경에 따라 간접적으로 기능이 구현되는 패턴을 주로 사용
	// 위와 같이 State에 따라 UI의 기능 화면이 변경되는 로직의 패턴을 사용하면
	// 복잡한 대단위 프로젝트에서 State상태값만 관리하면 되기에 업무 채산성,효율성이 높아짐
	useEffect(() => {
		document.body.style.overflow = ModalOpen ? "hidden" : "auto";
	}, [ModalOpen]);

	return (
		<>
			<Layout title={"GALLERY"}>
				<Content delay={1.5}>
					<section className="galleryList">
						{Flickr.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										//해당 요소 클릭시마다 핸들러함수 안쪽에서 ModalOpen, Index라는 2개의 상태값이 동시에 변경이 되지만 실제 컴포넌트는 한번만 재렌더링 됨
										//리액트 18이전까지는 AutoBatching 기능이 지원안되서 같은 렌더링 사이클에서 복수개의 상태값 변경시 변경되는 상태값의 갯수만큼 재렌더링 됨

										// 리액트 18버전부터 AutoBatching 기능 지원됨
										// 특정 렌더링 사이클에서 복수개의 상태값이 변경되더라도 해당 상태값들을 Batching(그룹화) 처리해 한번만 재렌더링 처리
										setModalOpen(true);

										//각 이미지 목록 클릭시 클릭한 idx순번값을 Index상태값에 저장
										setIndex(idx);
									}}>
									<Pic
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
										className="pic"
										shadow
									/>
									<h3>{data.title}</h3>
								</article>
							);
						})}
					</section>
				</Content>
			</Layout>

			{/* ModalOpen 상태값이 true일때에만 Modal컴포넌트를 호출해서 출력 */}
			{/* 자식 컴포넌트인 모달 안쪽에서 부모인 ModalOpen상태값을 변경해야 되기 때문에 상태변경함수 자체를 전달 */}
			{ModalOpen && (
				<Modal setModalOpen={setModalOpen}>
					<Pic
						// Pic컴포넌트 src값으로 Flickr 전체배열에서 Index상태 순번의 정보값으로 _b 접미사의 큰 이미지 주소를 Pic에 전달해서 호출
						src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`}
						shadow
					/>
				</Modal>
			)}
		</>
	);
}

/*
미션 (3시 40분까지)
- 클릭이벤트가 발생하는 각각의 article요소에 모달안에 출력되야 되는 큰 이미지 url정보값을 속성값 이용해 숨김
- 아티클요소 클릭하는 순간 미리 숨겨논 이미지 url정보값을 Modal안쪽에 Pic컴포넌트 호출하면서 src 속성 전달

--> 플로우 다시 수정 
모달안에 반복 이벤트가 발생한 순번의 요소의 정보를 출력하는 패턴
1. 순서값을 저장할 상태값 생성
2. 반복 요소에 이벤트 발생시 이벤트가 발생한 요소의 순서값을 상태값에 저장
3. 모달 안쪽에서 출력해야되는 정보를 순서 상태값에 연동처리

*/

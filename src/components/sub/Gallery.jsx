import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Pic from "../common/Pic";
import Modal from "../common/Modal";

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	// console.log(Flickr);
	//모달 컴포넌트 출력여부를 결정할 state생성
	const [ModalOpen, setModalOpen] = useState(false);

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

	return (
		<>
			<Layout title={"GALLERY"}>
				<section className="galleryList">
					{Flickr.map((data, idx) => {
						return (
							<article key={idx} onClick={() => setModalOpen(true)}>
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
			</Layout>

			{/* ModalOpen 상태값이 true일때에만 Modal컴포넌트를 호출해서 출력 */}
			{/* 자식 컴포넌트인 모달 안쪽에서 부모인 ModalOpen상태값을 변경해야 되기 때문에 상태변경함수 자체를 전달 */}
			{ModalOpen && <Modal setModalOpen={setModalOpen}>FLICKR IMAGE</Modal>}
		</>
	);
}

/*
	미션 (3시 20분까지)
	- 모달창 생성시 document.body.style.overflow= 'hidden'으로 처리해서 스크롤기능 비활성화처리
	- 모달창 제거시 document.body.style.overflow='auto'로 처리해서 스크롤기능 다시 활성화
*/

import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/main/Home";
import Contact from "./components/sub/Contact";
import Gallery from "./components/sub/Gallery";
import Members from "./components/sub/Members";
import Posts from "./components/sub/Posts";
import Youtube from "./components/sub/Youtube";
import YoutubeDetail from "./components/sub/YoutubeDetail";
import { AnimatePresence } from "framer-motion";

export default function App() {
	const location = useLocation();

	return (
		<>
			<Header />
			{/* 라우터를 통한 컴포넌트 전환시 이전 컴포넌트에 모션이 동작되고 있으면 해당 모션이 끝날때까지 컴포넌트 언마운트 시점을 지연처리 */}
			<AnimatePresence mode="wait">
				{/* 라우터 이동시마다의 각 컴포넌트 고유값을 전달하기 위해서 각 컴포넌트마다의 path경로를 ket로 지정*/}
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route path="/members" element={<Members />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/youtube" element={<Youtube />} />
					<Route path="/youtube/:id" element={<YoutubeDetail />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/posts" element={<Posts />} />
					{/* <Route path="/join" element={<Join />} /> */}
				</Routes>
			</AnimatePresence>
			<Footer />
		</>
	);
}

/*
		다이나믹 라우터 (상세페이지 제작)
		- 라우터 연걸시 path경로를 /패스명/:파라미터
		- 특정 url경로 접속시 파라미터명으로 특정 값 전달
	*/

/*
		SSR방식 (HTML파일 불러오는 방식)
		Server Side Rendering
		- 각각의 서브 페이지를 index.html, sub1.html, sub2.html 형식으로 분리한 방식
		- 각 메뉴 클릭시 일일이 서버쪽에 요청해서 해당html파일을 가져오는 방식

		CSR방식 (React 작업방식)
		Client Side Rendering
		- 처음에 서버로부터 빈 index.html파일 초기에 한번 가져옴
		- 이때 컴파일완료된 리액트 컴포넌트 자바스크립트 파일도 한번에 모두 가져옴
		- 이후 부터는 메뉴를 클릭할때마다 서버쪽에 정보를 불러오는 것이 아닌
		- 클라이언트 단에서 미리 한번에 불러온 컴포넌트 요소들을 실시간으로 index.html안쪽에서 바꿔치기
	*/

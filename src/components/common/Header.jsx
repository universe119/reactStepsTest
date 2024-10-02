import { FaYoutube, FaInstagramSquare, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Header() {
	const gnbArr = ["members","gallery","youtube","contact","posts"];
	const snsArr = [FaYoutube, FaInstagramSquare, FaEnvelope];

	return (
		<header className='header'>
			<h1>
				<Link to={'/'}>ALPACO</Link>
			</h1>

			<nav>
				<ul className='gnb'>
					{gnbArr.map((data, idx)=>{
						return(
							<li key={idx}>
								<Link to={"/"+data}>{data.toUpperCase()}</Link>
							</li>
						);
					})}
				</ul>

				<ul className='sns'>
					{snsArr.map((Data, idx)=>{
						return (
							<li key={idx}>
								{/* snsArr에서 반복을 돌면서 Data파라미터로 전달되는 각각의 객체는 컴포넌트 함수 아래와 같이 JSX문으로 호출 가능 이때 컴포넌트 규칙에 따라 파라미터명도 대문자로 시작해서 호출 */}
								<Data/>
							</li>
						)
					})}
				</ul>
			</nav>
		</header>
	);
}

	// <li>
	// 	<Link to={'/members'}>MEMBERS</Link>
	// </li>
	// <li>
	// 	<Link to={'/gallery'}>GALLERY</Link>
	// </li>
	// <li>
	// 	<Link to={'/youtube'}>YOUTUBE</Link>
	// </li>
	// <li>
	// 	<Link to={'/contact'}>CONTACT</Link>
	// </li>
	// <li>
	// 	<Link to={'/posts'}>POSTS</Link>
	// </li> 

	// <li>
	// 					<FaYoutube />
	// 				</li>
	// 				<li>
	// 					<FaInstagramSquare />
	// 				</li>
	// 				<li>
	// 					<FaEnvelope />
	// 				</li>
	// 				<li></li>
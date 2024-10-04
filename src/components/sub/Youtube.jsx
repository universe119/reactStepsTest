import { useState } from "react";
import Layout from "../common/Layout";

export default function Youtube() {
	const [Colors, setColors] = useState(["red", "green", "blue"]);

	return (
		<Layout title={"YOUTUBE"}>
			{Colors.map((color, idx) => {
				return (
					// style={{ color:color }} 같은 프로퍼티명:변수명일때 color만 써도 됨.
					<li style={{ color }} key={idx}>
						{color}
					</li>
				);
			})}
		</Layout>
	);
}

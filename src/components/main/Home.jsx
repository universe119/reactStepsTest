import Content from "../common/Content";
import Layout from "../common/Layout";

export default function Home() {
	return (
		<Layout title={"HOME"}>
			<Content delay={1}>
				<p>Home Page Contents Come Here.</p>
			</Content>
		</Layout>
	);
}

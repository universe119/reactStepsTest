export default function useCombineText() {
	return (text, spc1, spc2) =>
		// {return text.split("T")[0].split(spc1).join(spc2)}; //내가한거
		text.split(spc1).join(spc2);
}

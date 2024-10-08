// 훅에서 함수를 리턴하는 이유
// 여러 컴포넌트에서 동시다발적으로 호출해야 되는데
// 특정 컴포넌트에서 호출될때 필요한 고유 정보값을 계속 유지해야됨

// 클로저 환경 필요
// 함수 안쪽에 지역변수를 만들고 그 지역변수를 활용하는 함수를 리턴하면
// 렉시컬 스코프환경이 설정됨
// 렉시컬 스코프 환경 : 안쪽의 지역변수가 계속 값이 유지되는 현상

export default function useSplitText() {
	return (ref, option) => {
		if (!ref) return console.error("첫번째 인수로는 참조객체값이 와야 됩니다.");
		//만약 2번째 인수로 옵션 객체가 전달되지 않았을떄 대신 적용할 디폴트 옵션 객체지정

		const default_option = { interval: 0, delay: 0 };

		//디폴트옵션 객체에 뒤이어 전달될 옵션 객체를 덮어쓰기해서 새롭게합쳐진 옵션 객체 생성하는 구문
		//순서1 ...default_option으로 객체를 완전 복사해서 가져옴
		//순서2 ...option으로 해당 함수 호출시 전달한 객체를 다시 완전 복사해서 가져옴
		//순서3 각각 복사된 객체를 새로운 객체 안쪽에 {복사객체1, 복사객체2} 형태로 넣어줌
		//순서4 복사객체2가 복사객체1을 덮어쓰기 해서 새로운 옵션 객체 생성
		//예시 {interval: 0, delay:0},   {delay:1} 이라는 2개의 객체를 합치면
		// {interval:0, delay:1}이라는 새로운 객체 반환됨
		const result_option = { ...default_option, ...option };
		let text = ref.current.innerText;
		// console.log(ref);

		//동적으로 생성될 태그문자열이 담길 빈 변수 생성
		let tags = "";
		let count = 0;
		//문자열을 반복돌면서 동적으로 <span>으로 감싸면서 문자열 쌓아나감
		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-duration:0.5s; transition-delay:${
				count * result_option.interval + result_option.delay //반복순번 * 모션시간 간격, 초기 지연시간
			}s'>${letter}</span>`;
			count++;
		}

		//tag문자열이 완성되면 ref의 참조요소 안쪽에 변경된 문자열 DOM구조 바꿔치기
		ref.current.innerHTML = tags;

		//매번 호출하는 부모 컴포넌트에서 on을 추가하는 구문이 번거로우므로
		//훅 자체적으로 해당 요소 자체에 on을 추가
		setTimeout(() => {
			ref.current.classList.add("on");
		}, 100);
	};
}

// 미션 위와 같이 함수를 제작시 문제점

//미션 - 리턴되는 함수의 2번째 파라미터로 interval 시간값을 추가해서, 각각의 span요소에 interval만큼의 transition-delay적용

/*
  setTimeout의 delay값을 0으로만 줘도 연결된 콜백함수는 web api실행 후
  task queue를 거쳐 callstack으로 넘어가게 됨
  따라서 해당 코드는 ref.current.innerHTML = tags; 실행된뒤 호출됨 (동기화됨)
  그럼에도 불구하고 100이라는 지연시간을 준 이유는
  동기화 시점이 innerHTML로 동적 요소를 넣는 호출 시점일 뿐
  실제 동적으로 DOM이 최종 생성된 시점 이후를 보장하진 않기 때문에
  물리적으로 실제 돔으로 변환될 약간의 시간을 확보하기 위함
*/

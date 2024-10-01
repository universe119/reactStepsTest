function App() {

  return (
    <div>
      
      <h1 className="abc"
        // className="abc"
        // : React에서는 class 대신 className을 사용하여 CSS 클래스를 지정합니다. 
        // abc라는 클래스를 지정하고 있습니다.
        style={{color: 'red'}}
        // style={{color: 'red'}}
        // : 인라인 스타일을 적용하고 있으며, 
        // JSX에서 스타일을 지정할 때는 객체로 지정합니다. 
        // 이 객체는 JavaScript의 스타일 속성을 따릅니다. 
        // 여기서는 텍스트의 색상을 빨간색으로 설정했습니다.
        >
        Hello html태그 안이래
      </h1>
    </div>
  );
}

export default App

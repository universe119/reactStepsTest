//rfce (react ) : 함수 선언문 형태로 컴포넌트 자동완성문 생성
//rafce : 함수 표현식 형태로 컴포넌트 자동완성문 생성
//함수 선언문은 호이스팅에 영향을 받지만, 함수 표현식은 호이스팅에 영향을 받지 않는다.

function BtnA() {
  return (
    <div className="btnA">BtnA</div>
  );
}
function BtnB() {
  return (
    <div className="btnB">BtnB</div>
  );
}
//하나의 jsx파일에서 복수개의 컴포넌트함수를 export 가능
export {BtnA, BtnB};
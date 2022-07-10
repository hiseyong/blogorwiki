import '../style/MainPage.css'

export function Main(props) {return(
      <div>
        <h1>
          Welcome {props.name}
        </h1>
        <h1>
          Your class is {props.class}
        </h1>
        
        <h2>웹사이트 사용법</h2>
            <hr/>
            <h4>회원가입: RESISTER에서 유저이름과 비번 입력</h4>
            <h4>로그인: 회원가입 후 LOGIN에서 입력</h4>
            <h4>글 보기: DOCUMENT,READ에서 글 제목 정확히 검색하거나 DOCUMENT의 ALL DOCUMENT에서 모든 글 링크 확인</h4>
            <h4>글 쓰기: 로그인 후 DOCUMENT 의 UPLOAD에서 제목과 내용 입력 후 버튼 누르기 현재 글 이외 기능 잘 동작하지 않음</h4>
            <hr/>
            <h2>Daily Video</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/JMZZxl2lve8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
    )
}
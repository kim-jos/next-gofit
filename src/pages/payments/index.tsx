// 개인회원: buy different prices
// 기업회원: company buys 횟수권
// 기업회원: 개인회원 but cheaper

// Firebase: different payment 상품s for each category.

export default function Home() {
  const serverAuth = () => {
    if (typeof window !== "undefined") {
      const pay_obj: any = window;
      const { AUTHNICE } = pay_obj;
      const response = AUTHNICE.requestPay({
        //NOTE :: 발급받은 클라이언트키 clientId에 따라 Server / Client 방식 분리
        clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_TEST_KEY,
        method: "card",
        //NOTE :: 상품 구매 id 값
        orderId: random(),
        // NOTE :: 가격
        amount: 1004,
        // NOTE :: 상품명
        goodsName: "나이스페이-상품",
        //NOTE :: API를 호출할 Endpoint 입력
        returnUrl: "http://localhost:3000/payments/success",
        // NOTE :: err 발생시 실행 함수
        fnError: (result: any) => {
          alert(
            "고객용메시지 : " +
              result.msg +
              "\n개발자확인용 : " +
              result.errorMsg +
              ""
          );
        },
      });
      console.log("server auth: ", response);
    }
  };
  //Test orderId 생성
  const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
  };
  return (
    <>
      <button onClick={() => serverAuth()}>serverAuth 결제하기</button>
    </>
  );
}

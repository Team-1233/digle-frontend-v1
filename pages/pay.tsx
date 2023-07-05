import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useAsync } from "react-use";
import * as S from "../styles/index";

const clientKey = "test_ck_5GePWvyJnrKEeBowDGb3gLzN97Eo";
const customoerKey = "payments";

const TossPay = () => {
  const paymentWidgetRef = useRef<any>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const [price, setPrice] = useState(100);

  useAsync(async () => {
    const paymentWidget = await loadPaymentWidget(clientKey, customoerKey);

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price }
    );

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  const handleClick = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
        await paymentWidget?.requestPayment({
            orderId: nanoid(),
            orderName: '디글 후원',
            customerName: '조우상',
            customerEmail: 'woosang3078@gmail.com',
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`
        })
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div>
      <S.PaymentWidget id="payment-widget" />
      <S.Footer>
        <S.PriceInfo>
          후원 금액 : {price}원
        </S.PriceInfo>
        <S.PurchaseBtn onClick={handleClick}>디글과 함께 후원하기</S.PurchaseBtn>
      </S.Footer>
    </div>
  );
};

export default TossPay;

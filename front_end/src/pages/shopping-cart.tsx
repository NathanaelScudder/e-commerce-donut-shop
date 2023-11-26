import ContentContainer from '@/components/content-container'
import styles from '@/styles/Cart.module.css'
import { getNextOrderID, getProduct, postOrder } from '@/utils/server_api';
import { CartItem, Order, OrderItem, OrderSubmission, Page, Product } from '@/utils/typedefs'
import CartRack from '@/components/cart-rack';
import { clearCartContents, getCartContents, setLastOrder } from '@/utils/sessionHandler';
import { useEffect, useState } from 'react';
import { NULL_PRODUCT, PAGE } from '@/utils/constants';
import SubmitOrderForm from '@/components/submit-order-form';
import { useRouter } from 'next/router';

export default function ShoppingCart() {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  const [nextOrderID, setNextOrderID] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
      const getOrderData = async () => {
          const cartData: CartItem[] = getCartContents();
          let newOrderData: OrderItem[] = [];
  
          for(let i = 0; i < cartData.length; i++)
          {
              let nextProduct: Product = NULL_PRODUCT;
  
              try {
                  nextProduct = await getProduct(cartData[i].productID);
              }
              catch (err) {
                  console.log(err);
                  i--;
                  continue;
              }
              
              newOrderData.push({
                  orderedProduct: nextProduct,
                  quantity: cartData[i].quantity
              });
          }
  
          setOrderData(newOrderData);
      }

      getOrderData();
  }, []);

  useEffect(() => {
    const fetchNextOrderID = async () => {
      const orderID: number = await getNextOrderID();
      setNextOrderID(orderID);
    }

    fetchNextOrderID();
  }, []);

  const clearCart = () => {
    clearCartContents();
    setOrderData([]);
  }

  const submitOrder = (submission: OrderSubmission) => {
    const sendOrder = async () => {
      const order: Order = {
        orderID: nextOrderID,
        orderedItems: getCartContents(),
        firstName: submission.firstName!,
        lastName: submission.lastName!,
        phoneNumber: submission.phoneNumber!,
        creditCardNumber: submission.creditCard!,
        shippingAddress: submission.shippingAddress!,
        shippingCity: submission.shippingCity!,
        shippingZipCode: submission.shippingZipCode!,
        shippingCounty: submission.shippingCounty!,
        shippingState: submission.shippingState!,
        shippingMethod: submission.shippingMethod!,
      };

      await postOrder(order);
      setLastOrder(order);
      clearCart();
      router.push(`/${PAGE.ORDER_DETAILS}`);
    };

    sendOrder();
  }

  return (
    <main>
      <ContentContainer activePage={Page.CART}>
        <div className={styles.cartHeader}>
            <h1 className='titleText'>Carted Items</h1>
        </div>
        <div className={styles.cartArea}>
          <CartRack orderData={orderData} isShowingTotal></CartRack>
          {orderData.length > 0 && (
            <>
              <button onClick={clearCart} className={styles.cartClearButton}>Clear Cart</button>
              <SubmitOrderForm onSubmit={submitOrder}></SubmitOrderForm>
            </>
          )
          }
        </div>
      </ContentContainer>
    </main>
  );
}
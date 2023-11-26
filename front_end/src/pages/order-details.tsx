import ContentContainer from '@/components/content-container'
import cartStyles from '@/styles/Cart.module.css'
import orderDetailsStyles from '@/styles/Order-Details.module.css'
import { getProduct, getTaxRate } from '@/utils/server_api';
import { CartItem, Order, OrderItem, Page, Product } from '@/utils/typedefs'
import CartRack from '@/components/cart-rack';
import { getLastOrder } from '@/utils/sessionHandler';
import { useEffect, useState } from 'react';
import { FORM_CONSTANTS, NULL_PRODUCT } from '@/utils/constants';
import DetailRow from '@/components/detail-row';

export default function OrderDetails() {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order>();
  const [taxPercentage, setTaxPercentage] = useState<number>(0);

  useEffect(() => {
      const getOrderData = async () => {
          const lastOrder = getLastOrder();
          setOrder(lastOrder);
          
          let newOrderData: OrderItem[] = [];

          const cartData: CartItem[] = lastOrder.orderedItems;
          
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
          
          setOrderData([...newOrderData]);
      }

    getOrderData();
  }, []);

  const getShippingCost = (): number => {
    switch(order?.shippingMethod)
    {
      case FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR: return parseInt(FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR_COST);
      case FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY: return parseInt(FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY_COST);
      case FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY: return parseInt(FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY_COST);
      default: return 0;
    }
  }

  const getTotalCost = (): number => {
    let total = 0;

    for(let i = 0; i < orderData.length; i++)
    {
      total += orderData[i].orderedProduct.cost * orderData[i].quantity
    }

    return total;
  }

  const getTaxAmount = (): number => {
    const getTaxPercentage = async () => {
      let tax: number = await getTaxRate(order?.shippingZipCode);
      setTaxPercentage(tax);
    }

    getTaxPercentage();

    return (getTotalCost() + getShippingCost()) * taxPercentage;
  }

  return (
    <main>
      <ContentContainer activePage={Page.NONE}>
        <div className={cartStyles.cartHeader}>
            <h1 className='titleText'>Ordered Items</h1>
        </div>
        <div className={cartStyles.cartArea}>
          <CartRack orderData={orderData} isShowingTotal></CartRack>
        </div>
        <div className={orderDetailsStyles.detailsArea}>
            <div className={orderDetailsStyles.detailsBox}>
              <DetailRow 
                leftLabel={`Name:`}
                rightLabel={`${order?.firstName} ${order?.lastName}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`Phone #:`}
                rightLabel={`${order?.phoneNumber}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`Credit Card #:`}
                rightLabel={`${order?.creditCardNumber}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`Shipping Address:`}
                rightLabel={`${order?.shippingAddress}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`City:`}
                rightLabel={`${order?.shippingCity}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`County:`}
                rightLabel={`${order?.shippingCounty}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`State:`}
                rightLabel={`${order?.shippingState}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`Zip Code:`}
                rightLabel={`${order?.shippingZipCode}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`Shipping Method:`}
                rightLabel={`${order?.shippingMethod}`}
              ></DetailRow>
              <DetailRow 
                leftLabel={`Shipping Cost:`}
                rightLabel={`$${getShippingCost().toFixed(2)}`}
              ></DetailRow>
              {taxPercentage > 0 &&
                <>
                  <DetailRow 
                    leftLabel={`Tax Percent:`}
                    rightLabel={`${(taxPercentage * 100).toFixed(2)}%`}
                  ></DetailRow>
                  <DetailRow 
                    leftLabel={`Tax Amount:`}
                    rightLabel={`$${getTaxAmount().toFixed(2)}`}
                  ></DetailRow>
                </>
              }
              <DetailRow 
                leftLabel={`Total:`}
                rightLabel={`$${(getTotalCost() + getShippingCost() + getTaxAmount()).toFixed(2)}`}
              ></DetailRow>
            </div>
        </div>
      </ContentContainer>
    </main>
  );
}
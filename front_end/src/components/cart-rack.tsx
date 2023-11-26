import { CartItem, OrderItem, Product } from '../utils/typedefs'
import styles from '@/styles/Cart.module.css'
import CartItemCard from './cart-item-card';

// Displays the provided product data as cards in rows and columns
export default function CartRack({orderData, isShowingTotal}: {orderData: OrderItem[], isShowingTotal?: boolean}) {
    const getTotalCost = (orderData: OrderItem[]): number => {
        let total = 0;

        for(let i:number = 0; i < orderData.length; i++)
        {
            total += orderData[i].orderedProduct.cost * orderData[i].quantity;
        }

        return total;
    }

    let cartItems: React.ReactNode[] = [];

    // Loop through the provided data convert it to ProductCards
    if(orderData.length > 0)
    {
        for(let i:number = 0; i < orderData.length; i++)
        {
            const nextItem = orderData[i];

            cartItems.push((
                <CartItemCard key={i} item={nextItem}></CartItemCard>
            ));
        }

        if(isShowingTotal)
        {
            cartItems.push((
                <CartItemCard key={orderData.length} total={getTotalCost(orderData)}></CartItemCard>
            ));
        }
    }

    return (
        <div>
            {cartItems.length > 0 &&
                cartItems
            }
            {(cartItems.length == 0) &&
              <div className={styles.cartItem}>
                <h2 className={styles.titleText}>No Items in Cart</h2>
              </div>
            }
        </div>
    );
}
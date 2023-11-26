import { OrderItem } from "@/utils/typedefs";
import styles from '@/styles/Cart.module.css'
import Image from 'next/image'
import { PRODUCT_IMAGE_FOLDER } from "@/utils/constants";

export default function CartItemCard({item, total}: 
    {item?: OrderItem, total?: number}) {
    
    const getTotalCost = (): number => {
        if(item)
        {
            return item.orderedProduct.cost * item.quantity;
        }

        return 0;
    }

    return (
        <div className={styles.cartItem}>
            {item &&
                <div className="row">
                    <div className="col">
                        <img 
                            src={`/${PRODUCT_IMAGE_FOLDER}/${item.orderedProduct.imagePath}`} 
                            alt="Product Image" 
                            className={styles.cartItemImg}
                            >
                        </img> 
                    </div>
                    <div className="col">
                        {item.orderedProduct.productName}
                    </div>
                    <div className="col">
                        {item.quantity}
                    </div>
                    <div className="col">
                        Cost: ${getTotalCost().toFixed(2)}
                    </div>
                </div>
            }
            {total &&
                <h3 className={styles.totalText}>
                    Total: ${total.toFixed(2)}
                </h3>
            }
        </div>
    );
}
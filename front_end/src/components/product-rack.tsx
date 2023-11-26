import { Product } from '../utils/typedefs'
import styles from '@/styles/Catalog.module.css'
import ProductCard from './product-card';

// Displays the provided product data as cards in rows and columns
export default function ProductRack({productData, isAllowingRating} : {productData: Product[], isAllowingRating?: boolean}) {
    let products: React.ReactNode[] = [];

    // Loop through the provided data convert it to ProductCards
    if(productData)
    {
        for(let i:number = 0; i < productData.length; i++)
        {
            const nextProduct = productData[i];

            products.push((
                <ProductCard key={i} product={nextProduct} isLinkedToProductPage isAllowingRating={isAllowingRating}></ProductCard>
            ));
        }
    }

    return (
        <div className={styles.cardContainer}>
            {(products) ? products : <p>No products to display</p>}
        </div>
    );
}
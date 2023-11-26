import { Product} from "@/utils/typedefs";
import catalogStyles from '@/styles/Catalog.module.css'
import pastItemStyles from '@/styles/Past-Items.module.css'
import Image from 'next/image'
import Link from "next/link";
import { PRODUCT_IMAGE_FOLDER, PRODUCT_PAGE_FOLDER } from "@/utils/constants";
import { useState } from "react";
import { rateProduct } from "@/utils/server_api";

// Presents the specified product in a card format
// If linked to a product page, will dynamically serve the associated page to the user if the image or button are clicked
export default function ProductCard({product, isLinkedToProductPage, isAllowingRating}: 
    {product: Product, isLinkedToProductPage?: boolean, isAllowingRating?: boolean}) {
    const [starArray, setStarArray] = useState<boolean[]>([
        product.rating >= 1,
        product.rating >= 2,
        product.rating >= 3,
        product.rating >= 4,
        product.rating >= 5,
    ]);

    const getImageJSX = () => {
        return (
            <>
                {(product.imagePath) ? 
                    <Image 
                        src={`/${PRODUCT_IMAGE_FOLDER}/${product.imagePath}`} 
                        alt="Product Image" 
                        width={300}
                        height={300}
                        className={catalogStyles.imagePlaceholder}
                        priority>
                    </Image> 
                    : 
                    <div className={catalogStyles.imagePlaceholder}></div>
                }
            </>
        );
    };

    const getRatingStars = (): React.ReactNode[] => {
        let ratingStars: React.ReactNode[] = [];

        for(let i:number = 1; i <= 5; i++)
        {
            ratingStars.push((
                <button key={i-1} className={pastItemStyles.ratingStarButton} onClick={() => {rateProductAction(i)}}>
                    <i className={`fa-${(starArray[i-1]) ? "solid" : "regular"} fa-star`}></i>
                </button>
            ));
        }

        return ratingStars;
    };

    const rateProductAction = async (rating: number) => {
        await rateProduct(product.productID, rating);

        let ratings = [
            rating >= 1,
            rating >= 2,
            rating >= 3,
            rating >= 4,
            rating >= 5,
        ];

        setStarArray([...ratings]);
    };
    
    return (
        <div className={catalogStyles.card}>
            {(isLinkedToProductPage) ?
                <Link href={`/${PRODUCT_PAGE_FOLDER}/${product.pagePath}`} passHref>
                    {getImageJSX()}
                </Link>
                :
                getImageJSX()
            }
            <div className={catalogStyles.productName}>
                {(product.productName) ? product.productName : <p>Product Name</p>}
            </div>
            <div className={catalogStyles.productDescription}>
                {(product.description) ? product.description : <p>Product Description</p>}
            </div>
            {(isLinkedToProductPage) &&
                <Link href={`/${PRODUCT_PAGE_FOLDER}/${product.pagePath}`} passHref>
                    <button className={catalogStyles.productButton}>Buy Now</button>
                </Link>
            }
            {isAllowingRating &&
                <div>
                    {getRatingStars()}
                </div>
            }
        </div>
    );
}
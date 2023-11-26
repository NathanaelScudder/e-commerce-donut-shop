import AddToCartForm from "@/components/add-to-cart-form";
import ContentContainer from "@/components/content-container";
import ProductCard from "@/components/product-card";
import productStyles from '@/styles/Product.module.css'
import { getProduct } from "@/utils/server_api";
import { Page, Product } from "@/utils/typedefs";
import { getProductID } from "@/utils/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextRouter, useRouter } from "next/router";

// Presents the product associated with this page, its long description, and its order form to the user
export default function ProductPage({selectedProduct}: {selectedProduct: Product}) {
    return (
        <ContentContainer activePage={Page.NONE}>
            <div className={productStyles.productArea}>
                <ProductCard product={selectedProduct}></ProductCard>
                <div className={productStyles.descriptionBox}>
                    {selectedProduct.longDescription}
                </div>
                <AddToCartForm forProduct={selectedProduct}></AddToCartForm>
            </div>
        </ContentContainer>
    );
}

// Adapted from https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
export const getStaticPaths: GetStaticPaths<{ product: string }> = async () => {
    return {
        paths: [
            {params: {product: "classic-frosted"}},
            {params: {product: "chocolate-frosted"}},
            {params: {product: "strawberry-frosted"}},
            {params: {product: "blueberry-filled"}},
            {params: {product: "cream-filled-chocolate-frosted"}},
            {params: {product: "cream-filled-cake-batter-frosted"}},
            {params: {product: "cream-filled-oreo-topped"}},
            {params: {product: "raspberry-filled"}},
            {params: {product: "mini-chocolate-frosted"}},
            {params: {product: "donut-holes"}},
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { product } = params!;
    const selectedProduct: Product = await getProduct(getProductID(product));
    
    return {
      props: {
        selectedProduct,
      },
    };
  }
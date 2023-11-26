import ContentContainer from '@/components/content-container'
import { Page, Product } from '../utils/typedefs'
import { GetStaticProps } from 'next'
import ProductRack from '@/components/product-rack'
import { getAllProducts } from '@/utils/server_api';

// Present the catalog page to the user, with all of the products displayed
export default function Catalog({ productData }: {productData: Product[]}) {
  return (
    <main>
      <ContentContainer activePage={Page.CATALOG}>
        <ProductRack productData={productData}></ProductRack>
      </ContentContainer>
    </main>
  );
}

// Statically load in the data for the products from their constants and provide it to the Catalog page as a prop
export const getStaticProps: GetStaticProps = async ({ params }) => {
  let productData: Product[] = await getAllProducts();
  
  return {
    props: {
      productData,
    },
  };
}
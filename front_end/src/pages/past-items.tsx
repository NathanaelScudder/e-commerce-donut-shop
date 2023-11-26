import ContentContainer from '@/components/content-container'
import { Page, Product } from '../utils/typedefs'
import { GetStaticProps } from 'next'
import ProductRack from '@/components/product-rack'
import { getLastFiveOrderedItems } from '@/utils/server_api';
import styles from '@/styles/Past-Items.module.css'
import { useEffect, useState } from 'react';

export default function PastItems({  }: {}) {
  const [lastFiveOrderedItems, setLastFiveOrderedItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLastFiveOrderedItems = async () => {
      let lastFive: Product[] = await getLastFiveOrderedItems();

      if(lastFive)
      {
        setLastFiveOrderedItems([...lastFive]);
      }
    }

    fetchLastFiveOrderedItems();
  }, [])

  return (
    <main>
      <ContentContainer activePage={Page.PAST_ITEMS}>
        <div className={styles.pastItemsHeader}>
            <h1 className='titleText'>
                Last 5 Ordered Items
            </h1>
        </div>
        {lastFiveOrderedItems && lastFiveOrderedItems.length > 0 &&
            <ProductRack productData={lastFiveOrderedItems} isAllowingRating></ProductRack>
        }
        {(!lastFiveOrderedItems || lastFiveOrderedItems.length == 0) &&
            <h2 className='titleText'>No previously ordered items to display</h2>
        }
      </ContentContainer>
    </main>
  );
}
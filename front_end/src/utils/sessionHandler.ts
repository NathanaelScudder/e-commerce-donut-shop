import { SESSION_CONSTANTS } from "./constants";
import { CartItem, Order } from "./typedefs";

// Adapted from https://dev.to/devlargs/nextjs-hook-for-accessing-local-or-session-storage-variables-3n0
type StorageType = 'session' | 'local';

type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string;
  setItem: (key: string, value: string, type?: StorageType) => boolean;
  removeItem: (key: string, type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = (key: string, type?: StorageType): string => {
    return isBrowser ? window[storageType(type)][key] : '';
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

// end of adapted code

export const addProductToCart = (productID: number, quantity: number | undefined) => {
    if(!quantity)
    {
        console.log(`Invalid quantity ${quantity}`);
        return;
    }

    const sessionStorage = useStorage();

    let cart = sessionStorage.getItem(SESSION_CONSTANTS.CART);

    if(cart)
    {
        let cartArray: CartItem[] = JSON.parse(cart);
        let isInCartAlready = false;

        for(let i = 0; i < cartArray.length; i++)
        {
            isInCartAlready = cartArray[i].productID == productID;

            if(isInCartAlready)
            {
                cartArray[i].quantity = quantity;
                break;
            }
        }

        if(!isInCartAlready)
        {
            cartArray.push({
                productID: productID,
                quantity: quantity
            });
        }

        cart = JSON.stringify(cartArray);
    }
    else
    {
        cart = JSON.stringify([{
            productID: productID,
            quantity: quantity,
        }]);
    }

    sessionStorage.setItem(SESSION_CONSTANTS.CART, cart);
    console.log(sessionStorage.getItem(SESSION_CONSTANTS.CART));
}

export const getCartContents = (): CartItem[] => {
    const sessionStorage = useStorage();
    let cart = sessionStorage.getItem(SESSION_CONSTANTS.CART);

    if(cart)
    {
        return JSON.parse(cart);
    }
    else
    {
        return [];
    }
}

export const clearCartContents = () => {
  const sessionStorage = useStorage();
  sessionStorage.removeItem(SESSION_CONSTANTS.CART);
}

export const setLastOrder = (order: Order) => {
  const sessionStorage = useStorage();
  sessionStorage.setItem(SESSION_CONSTANTS.LAST_ORDER, JSON.stringify(order));
}

export const getLastOrder = (): Order => {
  const sessionStorage = useStorage();
  return JSON.parse(sessionStorage.getItem(SESSION_CONSTANTS.LAST_ORDER));
}

export const clearLastOrder = () => {
  const sessionStorage = useStorage();
  sessionStorage.removeItem(SESSION_CONSTANTS.LAST_ORDER);
}
import axios from "axios";
import { EXPRESS_CONSTANTS, NULL_PRODUCT, NULL_STATE_CITY } from "./constants";
import { GetRequestNextOrderID, GetRequestProducts, GetRequestProduct, Order, Product, GetRequestTaxRate, GetRequestStateCity } from "./typedefs";

export const getAllProducts = async (): Promise<Product[]> => {
    try
    {
        const productsJSON = await axios.get<GetRequestProducts>(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_DB}${EXPRESS_CONSTANTS.END_POINT_DB_PRODUCT_ALL}`);
        
        return productsJSON.data.products;
    }
    catch(error)
    {
        console.log(error);
        return [];
    }
}

export const getProduct = async (productID: number): Promise<Product> => {
    try
    {
        const productJSON = await axios.get<GetRequestProduct>(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_DB}${EXPRESS_CONSTANTS.END_POINT_DB_PRODUCT}${productID}`);
        return productJSON.data.product;
    }
    catch(error)
    {
        console.log(error);
        return NULL_PRODUCT;
    }
}

export const postOrder = async (order: Order) => {
    try
    {
        await axios.post(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_DB}${EXPRESS_CONSTANTS.END_POINT_DB_ORDER}`, {
            orderDetails: order
        });
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getNextOrderID = async (): Promise<number> => {
    try
    {
        const productJSON = await axios.get<GetRequestNextOrderID>(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_DB}${EXPRESS_CONSTANTS.END_POINT_DB_ORDER}${EXPRESS_CONSTANTS.END_POINT_DB_ORDER_NEXT_ID}`);

        return (productJSON.data.numOrders > 0) ? productJSON.data.numOrders + 1 : 1;
    }
    catch(error)
    {
        console.log(error);
        return 1;
    }
}

export const getLastFiveOrderedItems = async (): Promise<Product[]> => {
    try
    {
        const productJSON = await axios.get<GetRequestProducts>(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_DB}${EXPRESS_CONSTANTS.END_POINT_DB_ORDER}${EXPRESS_CONSTANTS.END_POINT_DB_LAST_FIVE}`);

        return productJSON.data.products;
    }
    catch(error)
    {
        console.log(error);
        return [];
    }
}

export const rateProduct = async (productID: number, rating: number) => {
    try
    {
        await axios.post(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_DB}${EXPRESS_CONSTANTS.END_POINT_DB_PRODUCT}${EXPRESS_CONSTANTS.END_POINT_DB_PRODUCT_RATING}`, {
            productID: productID,
            rating: rating,
        });
    }
    catch(error)
    {
        console.log(error);
    }
};

export const getTaxRate = async (zipCode: string | undefined): Promise<number> => {
    if(!zipCode)
    {
        return 0;
    }
    
    try
    {
        const productJSON = await axios.get<GetRequestTaxRate>(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_LOOKUP}${EXPRESS_CONSTANTS.END_POINT_LOOKUP_TAX_RATE}${zipCode}`);

        return productJSON.data.taxRate;
    }
    catch(error)
    {
        console.log(error);
        return 0;
    }
}

export const getStateCity = async (zipCode: string | undefined): Promise<GetRequestStateCity> => {
    if(!zipCode)
    {
        return NULL_STATE_CITY;
    }
    
    try
    {
        const productJSON = await axios.get<GetRequestStateCity>(`${EXPRESS_CONSTANTS.EXPRESS_SERVER}${EXPRESS_CONSTANTS.END_POINT_LOOKUP}${EXPRESS_CONSTANTS.END_POINT_LOOKUP_STATE_CITY}${zipCode}`);

        return productJSON.data;
    }
    catch(error)
    {
        console.log(error);
        return NULL_STATE_CITY;
    }
}
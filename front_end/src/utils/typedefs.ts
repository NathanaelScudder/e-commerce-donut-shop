// The different pages that can be directly navigated to
export const enum Page {
    HOME = "home",
    CATALOG = "catalog",
    CART = "shopping-cart",
    PAST_ITEMS = "past-items",
    NONE = "none",
};

// The data that should be held by each product
export interface Product {
    productID: number,
    productName: string,
    imagePath: string,
    pagePath: string,
    description: string,
    longDescription: string,
    cost: number,
    rating: number,
}

export interface CartItem {
    productID: number,
    quantity: number,
}

export interface OrderItem {
    orderedProduct: Product,
    quantity: number,
}

export interface Order {
    orderID: number,
    orderedItems: CartItem[],
    firstName: string,
    lastName: string,
    phoneNumber: string,
    creditCardNumber: string,
    shippingAddress: string,
    shippingCity: string,
    shippingZipCode: string,
    shippingCounty: string,
    shippingState: string,
    shippingMethod: string,
}

export interface CartSubmission {
    quantity?: string
}

// The data that should be gathered for an order form submission
export interface OrderSubmission {
    firstName?: string,
    lastName?: string,
    creditCard?: string,
    phoneNumber?: string,
    shippingAddress?: string,
    shippingCity?: string,
    shippingCounty?: string,
    shippingZipCode?: string,
    shippingState?: string,
    shippingMethod?: string,
}

export interface GetRequestCart {
    cartItems: CartItem[]
}

export interface GetRequestProducts {
    products: Product[]
}

export interface GetRequestProduct {
    product: Product
}

export interface GetRequestNextOrderID {
    numOrders: number
}

export interface GetRequestTaxRate {
    taxRate: number
}

export interface GetRequestStateCity {
    city: string,
    state: string,
}
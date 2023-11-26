import { PRODUCT_SLUGS } from "./constants";

export const getProductID = (pagePath: string | string[] | undefined): number => {
    switch(pagePath)
    {
        case PRODUCT_SLUGS.CLASSIC_FROSTED: return 1;
        case PRODUCT_SLUGS.CHOCOLATE_FROSTED: return 2;
        case PRODUCT_SLUGS.STRAWBERRY_FROSTED: return 3;
        case PRODUCT_SLUGS.BLUEBERRY_FILLED: return 4;
        case PRODUCT_SLUGS.CREAM_FILLED_CHOCOLATE_FROSTED: return 5;
        case PRODUCT_SLUGS.CREAM_FILLED_CAKE_BATTER_FROSTED: return 6;
        case PRODUCT_SLUGS.CREAM_FILLED_OREO_TOPPED: return 7;
        case PRODUCT_SLUGS.RASPBERRY_FILLED: return 8;
        case PRODUCT_SLUGS.MINI_CHOCOLATE_FROSTED: return 9;
        case PRODUCT_SLUGS.DONUT_HOLES: return 10;
        default: return 0;
    }
}
import { FORM_CONSTANTS, PAGE } from '@/utils/constants';
import { CartSubmission, Product } from '@/utils/typedefs';
import { FormEvent, SyntheticEvent, useState } from 'react';
import Link from "next/link";
import { addProductToCart } from '@/utils/sessionHandler';
import { useRouter } from 'next/router';

// Contains the HTML for displaying the product order form to the user, parsing that input, validating it, and emailing it
export default function AddToCartForm({forProduct} : {forProduct: Product}) {
    const [inputs, setInputs] = useState<CartSubmission>({}); // Store the inputs from the form
    const router = useRouter();

    // When a form input field is changed, update the associated state value
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        const value: string = event.currentTarget.value;
        setInputs(values => ({...values, [name]: value}));
    };

    // When the form is submitted, open the user's email client with the inputted details, then clear the form
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if(inputs.quantity)
        {
            addProductToCart(forProduct.productID, parseInt(inputs.quantity));
            setInputs({});
            router.push(`../${PAGE.CART}`);
        }
    };

    return (
        <div className="formContainer">
            <div className="formTitle">Order Form</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={FORM_CONSTANTS.QUANTITY}>Quantity (between {FORM_CONSTANTS.QUANTITY_MINIMUM} and {FORM_CONSTANTS.QUANTITY_MAXIMUM}):</label>
                <input className="inputField"
                       type="number" 
                       id={FORM_CONSTANTS.QUANTITY}
                       name={FORM_CONSTANTS.QUANTITY} 
                       min={FORM_CONSTANTS.QUANTITY_MINIMUM} 
                       max={FORM_CONSTANTS.QUANTITY_MAXIMUM} 
                       required
                       value={inputs[FORM_CONSTANTS.QUANTITY] || ""}
                       onChange={handleChange}
                       />

                <button className="formSubmitButton" type="submit">Add to Cart</button>
            </form>
        </div>
    );
}
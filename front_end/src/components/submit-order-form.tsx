import { EXPRESS_CONSTANTS, FORM_CONSTANTS, PAGE } from '@/utils/constants';
import { GetRequestStateCity, OrderSubmission, Product } from '@/utils/typedefs';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { getStateCity } from '@/utils/server_api';

// Contains the HTML for displaying the product order form to the user, parsing that input, validating it, and emailing it
export default function SubmitOrderForm({ onSubmit }: {onSubmit: (submission: OrderSubmission) => void}) {
    const [inputs, setInputs] = useState<OrderSubmission>({}); // Store the inputs from the form
    const router = useRouter();

    // When a form input field is changed, update the associated state value
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
       const fillStateCity = async (zipCode: string) => {
              const response: GetRequestStateCity = await getStateCity(zipCode);
              
              if(response.city !== EXPRESS_CONSTANTS.NULL_STRING && response.state !== EXPRESS_CONSTANTS.NULL_STRING)
              {
                     setInputs(values => ({...values, [FORM_CONSTANTS.ADDRESS_CITY]: response.city, [FORM_CONSTANTS.ADDRESS_STATE]: response.state}));
              }
       }

        const name: string = event.currentTarget.name;
        const value: string = event.currentTarget.value;
        setInputs(values => ({...values, [name]: value}));

        if(name === FORM_CONSTANTS.ADDRESS_ZIP_CODE)
        {
              fillStateCity(value);
        }
    };

    // When the form is submitted, open the user's email client with the inputted details, then clear the form
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit(inputs);
        setInputs({});
    };

    return (
        <div className="formContainer">
            <div className="formTitle">Order Form</div>
            <form onSubmit={handleSubmit}>
            <label htmlFor={FORM_CONSTANTS.FIRST_NAME}>First Name:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.FIRST_NAME} 
                       name={FORM_CONSTANTS.FIRST_NAME} 
                       required 
                       minLength={parseInt(FORM_CONSTANTS.NAME_LENGTH_MINIMUM)} 
                       maxLength={parseInt(FORM_CONSTANTS.NAME_LENGTH_MAXIMUM)} 
                       pattern="[a-zA-Z]+"
                       value={inputs[FORM_CONSTANTS.FIRST_NAME] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.LAST_NAME}>Last Name:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.LAST_NAME} 
                       name={FORM_CONSTANTS.LAST_NAME} 
                       required 
                       minLength={parseInt(FORM_CONSTANTS.NAME_LENGTH_MINIMUM)} 
                       maxLength={parseInt(FORM_CONSTANTS.NAME_LENGTH_MAXIMUM)} 
                       pattern="[a-zA-Z]+"
                       value={inputs[FORM_CONSTANTS.LAST_NAME] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.PHONE_NUMER}>Phone Number:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.PHONE_NUMER} 
                       name={FORM_CONSTANTS.PHONE_NUMER} 
                       required
                       pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
                       value={inputs[FORM_CONSTANTS.PHONE_NUMER] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.CREDIT_CARD}>Credit Card Number (do not put special characters):</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.CREDIT_CARD} 
                       name={FORM_CONSTANTS.CREDIT_CARD} 
                       required
                       // Credit card REGEX used from https://regexpattern.com/credit-card-number/
                       pattern="(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})"
                       value={inputs[FORM_CONSTANTS.CREDIT_CARD] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.ADDRESS}>Shipping Address:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.ADDRESS}
                       name={FORM_CONSTANTS.ADDRESS}
                       required 
                       minLength={parseInt(FORM_CONSTANTS.ADDRESS_LENGTH_MINIMUM)}
                       maxLength={parseInt(FORM_CONSTANTS.ADDRESS_LENGTH_MAXIMUM)}
                       value={inputs[FORM_CONSTANTS.ADDRESS] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.ADDRESS_CITY}>City:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.ADDRESS_CITY}
                       name={FORM_CONSTANTS.ADDRESS_CITY}
                       required 
                       minLength={parseInt(FORM_CONSTANTS.ADDRESS_LENGTH_MINIMUM)}
                       maxLength={parseInt(FORM_CONSTANTS.ADDRESS_LENGTH_MAXIMUM)}
                       value={inputs[FORM_CONSTANTS.ADDRESS_CITY] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.ADDRESS_COUNTY}>County:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.ADDRESS_COUNTY}
                       name={FORM_CONSTANTS.ADDRESS_COUNTY}
                       required 
                       minLength={parseInt(FORM_CONSTANTS.ADDRESS_LENGTH_MINIMUM)}
                       maxLength={parseInt(FORM_CONSTANTS.ADDRESS_LENGTH_MAXIMUM)}
                       value={inputs[FORM_CONSTANTS.ADDRESS_COUNTY] || ""}
                       onChange={handleChange}
                       />
                
                <label htmlFor={FORM_CONSTANTS.ADDRESS_STATE}>State:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.ADDRESS_STATE}
                       name={FORM_CONSTANTS.ADDRESS_STATE}
                       required 
                       // State REGEX used from https://stackoverflow.com/questions/34536069/us-state-regular-expression-with-case-sensitive
                       pattern="^(([Aa][EeLlKkSsZzRr])|([Cc][AaOoTt])|([Dd][EeCc])|([Ff][MmLl])|([Gg][AaUu])|([Hh][Ii])|([Ii][DdLlNnAa])|([Kk][SsYy])|([Ll][Aa])|([Mm][EeHhDdAaIiNnSsOoTt])|([Nn][EeVvHhJjMmYyCcDd])|([Mm][Pp])|([Oo][HhKkRr])|([Pp][WwAaRr])|([Rr][Ii])|([Ss][CcDd])|([Tt][NnXx])|([Uu][Tt])|([Vv][TtIiAa])|([Ww][AaVvIiYy]))$"
                       value={inputs[FORM_CONSTANTS.ADDRESS_STATE] || ""}
                       onChange={handleChange}
                       />

                <label htmlFor={FORM_CONSTANTS.ADDRESS_ZIP_CODE}>Zipcode:</label>
                <input className="inputField"
                       type="text" 
                       id={FORM_CONSTANTS.ADDRESS_ZIP_CODE}
                       name={FORM_CONSTANTS.ADDRESS_ZIP_CODE}
                       required 
                       // Zipcode REGEX used from https://stackoverflow.com/questions/2577236/regex-for-zip-code
                       pattern="^\d{5}(?:[-\s]\d{4})?$"
                       value={inputs[FORM_CONSTANTS.ADDRESS_ZIP_CODE] || ""}
                       onChange={handleChange}
                       />

                <fieldset className="inputField">
                    <legend className="shippingLegend"><b>Select a shipping method:</b></legend>
                    <div>
                        <input type="radio" 
                               id={FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR} 
                               name={FORM_CONSTANTS.SHIPPING_METHOD} 
                               value={FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR}
                               required
                               checked={inputs[FORM_CONSTANTS.SHIPPING_METHOD] == FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR}
                               onChange={handleChange}
                               />
                        <label className="shippingMethodLabel" htmlFor={FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR}>6 Hour - ${FORM_CONSTANTS.SHIPPING_METHOD_SIX_HOUR_COST}</label>
                    </div>

                    <div>
                        <input type="radio" 
                               id={FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY} 
                               name={FORM_CONSTANTS.SHIPPING_METHOD} 
                               value={FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY}
                               checked={inputs[FORM_CONSTANTS.SHIPPING_METHOD] == FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY}
                               onChange={handleChange}
                               />
                        <label className="shippingMethodLabel" htmlFor={FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY}>1 Day - ${FORM_CONSTANTS.SHIPPING_METHOD_ONE_DAY_COST}</label>
                    </div>

                    <div>
                        <input type="radio" 
                               id={FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY} 
                               name={FORM_CONSTANTS.SHIPPING_METHOD} 
                               value={FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY}
                               checked={inputs[FORM_CONSTANTS.SHIPPING_METHOD] == FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY}
                               onChange={handleChange}
                               />
                        <label className="shippingMethodLabel" htmlFor={FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY}>2 Day - ${FORM_CONSTANTS.SHIPPING_METHOD_TWO_DAY_COST}</label>
                    </div>
                </fieldset>

                <button className="formSubmitButton" type="submit">Add to Cart</button>
            </form>
        </div>
    );
}
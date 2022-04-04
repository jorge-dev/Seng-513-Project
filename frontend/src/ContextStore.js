import {createContext, useReducer} from "react";

export const ContextStore = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    cart: {
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
        paymentMethod: localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')
            : '',
        items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
    }
};

const reducer = (state, action) => {
    // switch (action.type) {

    switch (action.type) {
        case "ADD_TO_CART":
            const newItem = action.payload;
            const existItem = state.cart.items.find(
                (item) => item._id === newItem._id
            );
            const items = existItem
                ? state.cart.items.map((item) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.items, newItem];
            localStorage.setItem("items", JSON.stringify(items));
            return {...state, cart: {...state.cart, items}};
        case "REMOVE_FROM_CART":
            const itemToRemove = action.payload;
            const itemsToRemove = state.cart.items.filter(
                (item) => item._id !== itemToRemove._id
            );
            localStorage.setItem("items", JSON.stringify(itemsToRemove));
            return {...state, cart: {...state.cart, items: itemsToRemove}};
        case 'EMPTY_CART':
            return {...state, cart: {...state.cart, items: []}};
        case 'SIGN_IN':
            return {...state, userInfo: action.payload};
        case 'SIGN_OUT':
            return {
                ...state,
                userInfo: null,
                cart: {
                    shippingInfo: {},
                    paymentMethod: '',
                    items: []
                }
            };
        case 'SAVE_SHIPPING_INFO':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingInfo: action.payload
                }

            }
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {...state.cart, paymentMethod: action.payload},
            };

        default:
            return state;
    }
}

export function ContextStoreProvider(props) {
    const [state, setState] = useReducer(reducer, initialState);
    const value = { state, setState };
    return <ContextStore.Provider value={value}> {props.children} </ContextStore.Provider>;

}

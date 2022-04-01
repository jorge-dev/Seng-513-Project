import { createContext, useReducer } from "react";

export const ContextStore = createContext();

const initialState = {
    cart: {
        items: [],
    }
};

const reducer = (state, action) => {
    // switch (action.type) {
    //     case "ADD_TO_CART":
    //         const newItem = action.payload;
    //         // avoid duplicates
    //         const existingItem = state.cart.items.find(itemInCart => itemInCart._id === newItem._id);
    //         const cartItems = existingItem ? state.cart.items.map(item =>
    //             item._id === existingItem._id ? newItem : item) : [...state.cart.items, newItem];
    //         return { ...state, cart: { ...state.cart, cartItems } };

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
            return { ...state, cart: { ...state.cart, items } };
        // return {
        //     ...state,
        //     cart: {
        //         ...state.cart,
        //         items: [...state.cart.items, action.payload]
        //     }
        // };
        default:
            return state;
    }
}

export function ContextStoreProvider(props) {
    const [state, setState] = useReducer(reducer, initialState);
    const value = { state, setState };
    return <ContextStore.Provider value={value}> {props.children} </ContextStore.Provider>;

}

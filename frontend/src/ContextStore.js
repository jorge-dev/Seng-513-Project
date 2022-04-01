import { createContext, useReducer } from "react";

export const ContextStore = createContext();

const initialState = {
    cart: {
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
            return { ...state, cart: { ...state.cart, items } };
        case "REMOVE_FROM_CART":
            const itemToRemove = action.payload;
            const itemsToRemove = state.cart.items.filter(
                (item) => item._id !== itemToRemove._id
            );
            localStorage.setItem("items", JSON.stringify(itemsToRemove));
            return { ...state, cart: { ...state.cart, items: itemsToRemove } };

        default:
            return state;
    }
}

export function ContextStoreProvider(props) {
    const [state, setState] = useReducer(reducer, initialState);
    const value = { state, setState };
    return <ContextStore.Provider value={value}> {props.children} </ContextStore.Provider>;

}

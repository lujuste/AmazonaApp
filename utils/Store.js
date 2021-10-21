import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    cart: {
        cartItems: Cookies.get('cartItems') ? 
        (Cookies.get('cartItems')) : [],
        shippingAddress: Cookies.get('shippingAdress') ? 
        (Cookies.get('shippingAddress')) : {},
    },
    userInfo: Cookies.get('userInfo') ?
        (Cookies.get('userInfo')) : null
};


function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
        case 'CART_ADD_ITEM' : {
            const newItem = action.payload
            const existItem = state.cart.cartItems.find((item) => item.name === newItem.name)
            const cartItems = existItem ? state.cart.cartItems.map(
                (item) => item._id === existItem._id ? newItem: item
            ) : [...state.cart.cartItems, newItem];

            Cookies.set('cartItems', JSON.stringify(cartItems))

            return {...state, cart: {...state.cart, cartItems}}
        }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id )
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return {...state, cart: {...state.cart, cartItems}}
        }

        case 'SAVE_SHIPPING_ADDRESS': 
            return {...state, cart: {...state.cart, shippingAddress: action.payload}}
        case 'USER_LOGIN': 
            return {...state, userInfo: action.payload}

        case 'USER_LOGOUT': 
            return {...state, userInfo: null, cart: {cartItems: []}}
            
        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch}
    return <Store.Provider value={value}> {props.children} </Store.Provider>
}
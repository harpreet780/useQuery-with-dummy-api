export const ADD_TO_CART = 'ADD_TO_CART';
export const ADDRESS_FORM = 'ADDRESS_FORM';
export const SUBMIT_DATA = 'SUBMIT_DATA';

export const toExpression = (type, payload) => ({
    type,
    payload
  });

export const addToCart = (cart)=> toExpression(ADD_TO_CART, cart);
export const addressForm = (address)=> toExpression(ADDRESS_FORM, address);
export const submitData = (data)=> toExpression(SUBMIT_DATA, data);
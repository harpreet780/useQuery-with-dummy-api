import { ADDRESS_FORM, ADD_TO_CART, SUBMIT_DATA } from "../actions/action";

let initialState = {
    addToCart: [],
    bill: "",
    submit_user_address: [],
    add_address: {
        name: "",
        mobile: "",
        address: "",
        pincode: "",
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const cart = [...state.addToCart]
            cart?.push(action.payload)
            let total_bill = cart?.map((item) => {
                return (parseInt(item.price) * parseInt(item.quantity));
            })
            let total = total_bill.reduce((a, b) => a + b, 0)

            return { ...state, addToCart: cart, bill: total }

        case ADDRESS_FORM:
            const getAddressOption = { ...state.add_address }
            getAddressOption[action.payload.name] = action.payload.value
            return { ...state, add_address: getAddressOption }

        case SUBMIT_DATA:
            const updatePrevarr = [...state.submit_user_address];
            const setBill = state.bill;
            let addNewKey = action.payload;
            addNewKey.id = Math.floor(Math.random() * 100);
            addNewKey.price = setBill;
            updatePrevarr.push(addNewKey);
            return { ...state, submit_user_address: updatePrevarr,addToCart:[], add_address: {
                name: "",
                mobile: "",
                address: "",
                pincode: "",
            }}


        default:
            return state;
    }
}
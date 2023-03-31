import React from 'react'
import { Input, Label } from 'reactstrap'
import { ADDRESS_FORM, SUBMIT_DATA } from './redux/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUserAdress = useSelector((state)=> state.add_address);
    const showTotalbill = useSelector((state) => state.bill);

    return (
        <div className='formWrapper'>
            <h5 className='text-center mb-3'>Please fill the below fields</h5>
            <div className="wraps">
                <Label>Username</Label>
                <Input
                    type="text"
                    name="name"
                    className="input"
                    value={getUserAdress?.name}
                    onChange={(e) => dispatch({ type: ADDRESS_FORM, payload: { value: e.target.value, name: "name" } })}
                />
            </div>
            <div className="wraps">
                <Label>Mobile no</Label>
                <Input
                    type="number"
                    name="mobile"
                    className="input"
                    value={getUserAdress?.mobile}
                    onChange={(e) => dispatch({ type: ADDRESS_FORM, payload: { value: e.target.value, name: "mobile" } })}
                />
            </div>
            <div className="wraps">
                <Label>Address</Label>
                <Input
                    type="textarea"
                    name="address"
                    className="input"
                    value={getUserAdress?.address}
                    onChange={(e) => dispatch({ type: ADDRESS_FORM, payload: { value: e.target.value, name: "address" } })}
                />
            </div>
            <div className="wraps">
                <Label>Pin code</Label>
                <Input
                    type="number"
                    name="pincode"
                    className="input"
                    value={getUserAdress?.pincode}
                    onChange={(e) => dispatch({ type: ADDRESS_FORM, payload: { value: e.target.value, name: "pincode" } })}
                />
            </div>
            <div className="wraps">
                <Label>Total Price: </Label>
               <p className='m-0 pl-4'><b>{showTotalbill}</b></p>
            </div>
            <button className='backBtn m-auto d-block' onClick={() => {
                dispatch({ type: SUBMIT_DATA, payload: getUserAdress })
                navigate("/product")
            }}>
                Place Order
            </button>
        </div>
    )
}

export default AddressForm;
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PaystackButton } from "react-paystack"
import { Button, Modal } from 'react-bootstrap'
import Reciepts from './Reciepts'
import loadimg from './load.gif'
import NavBar from './NavBar'
// import { Link } from "react-router-dom";



function Content() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [meterType, setmeterType] = useState('')
    const [disco, setDisco] = useState('')
    const [meterNumber, setmeterNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [user, setUser] = useState({})
    const [show, setShow] = useState(false)
    const [pow, setPow] = useState(false)
    const [loading, setLoading] = useState(false)
    // let history = useHistory();

    // const [showpay, setShowPay] = useState(false)
    const [refId, setRefId] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [power, setPower] = useState({})
    const vend = '15045d1d22'
    const publicKey = "pk_test_363651192d1da6d2499e9047b2ae5b2bded3b338"

    const componentProps = {

        email,

        amount: amount * 100,

        metadata: {

            name,

            phone,

        },

        publicKey,

        text: "Make Payment",

        onSuccess: () => {
            setLoading(true)
            getPower()
        },

        onClose: () => alert("Wait! Don't leave :("),
    }

    // Generate random num 0f 12 digits
    useEffect(() => {
        const nums = new Date().getTime().toString().split("")
        const newString = nums.splice(1).join('')
        let refId = parseInt(newString)
        setRefId(refId)
    }, [])

    // const meter = 45030378983
    const pub_key = 'cd904b0968cc9a2610e1e35353c53087'
    const priv_key = 'e51d66c5bf278db944f51476f1fb15c6f1b3b9521d60b5eee90e124e920618246e68ee0140764a52255b06e89c463c365eb47ef4f479700e7422a1862937e2cf'
    const crypto = require('crypto')



    // Get meter number
    const getUsers = async () => {
        const combined_string = `${vend}|${refId}|${meterNumber}|${disco}|${pub_key}`
        const hash = crypto.createHmac('sha1', priv_key)
            .update(combined_string)
            .digest('hex')
        const res = await fetch(`https://irecharge.com.ng/pwr_api_sandbox/v2/get_meter_info.php?vendor_code=${vend}&reference_id=${refId}&meter=${meterNumber}&disco=${disco}&response_format=json&hash=${hash} `)
        const users = await res.json()
        console.log(hash)
        if (users.status === '00') {
            setUser(users)
            setAccessToken(users.accessToken)
            console.log(users)
            onShow()
            setDisabled(false)

            // getPower()
            // alert('ok')
        } else {
            console.log('erro')
        }
    }

    // use history
    const history = useHistory()
    // Vend for power
    const getPower = async () => {
        setLoading(true)
        hide()
        // genenerate hash
        const combined_string = `${vend}|${refId}|${meterNumber}|${disco}|${amount}|${user.access_token}|${pub_key}`
        const hash = crypto.createHmac('sha1', priv_key)
            .update(combined_string)
            .digest('hex')
        const response = await fetch(`https://irecharge.com.ng/pwr_api_sandbox/v2/vend_power.php?vendor_code=${vend}&reference_id=${refId}&meter=${meterNumber}&access_token=${user.access_token}&disco=${disco}&phone=${phone}&email=${email}&response_format=json&hash=${hash}&amount=${amount} `)
        const power = await response.json()
        console.log(user.access_token, vend, refId, meterNumber, disco, phone, email, hash, amount)

        // history.push('/receipt')
        if (power.message === 'Successful') {
            setPower(power)
            localStorage.setItem("power", JSON.stringify(power));
            history.push('/reciepts')
            setLoading(false)
            // setPow(true)
            // window.location.reload()
        }

    }
    // fetch call for meter info
    const handleSubmit = () => {
        // setName('')
        // setPhone('')
        // setmeterNumber('')
        // setmeterType('')
        // setAmount('')
        // setDisco('')
        setDisabled(true)
        getUsers()
    }
    // toggle modal
    const onShow = () => {
        setShow(true)
        // handleSubmit()
    }

    const hide = () => {
        setShow(false)
    }

    if (loading) {
        return (
            <div className='container text-center image '>
                <img src={loadimg} alt="" className="img-fluid" />
            </div>
        )
    }
    return (
        <div className='content'>
            <NavBar />
            <form >
                <div className="form-row">
                    <div className="col-9  mx-auto mb-3">
                        <label htmlFor="validationServerUsername">Your Name</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">Enter Name</span>
                            </div>
                            <input type="text" className="form-control" id="validationServerUsername" placeholder="" aria-describedby="inputGroupPrepend3" value={name} onChange={(e) => setName(e.target.value)} />
                            <div className="invalid-feedback">

                            </div>
                        </div>
                    </div>
                    <div className="col-9  mx-auto mb-3">
                        <label htmlFor="validationServerEmail">Your Email</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend4">Enter Email</span>
                            </div>
                            <input type="email" className="form-control" id="validationServerUsername" placeholder="" aria-describedby="inputGroupPrepend3" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="invalid-feedback">

                            </div>
                        </div>
                    </div>
                    <div className="col-9 mx-auto mb-3">
                        <label htmlFor="validationServerUsername">Your Phone Number</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">Phone</span>
                            </div>
                            <input type="number" className="form-control" id="validationServerUsername" aria-describedby="inputGroupPrepend3" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-9 mx-auto mb-3">
                        <label htmlFor="validationServer05">Meter Number</label>
                        <input type="number" className="form-control " id="validationServer05" required value={meterNumber} onChange={(e) => setmeterNumber(e.target.value)} />
                    </div>
                    <div className="col-9 mx-auto mb-3">
                        <div className="form-group">
                            <label htmlFor="sel1">Meter Type:</label>
                            <select className="form-control" id="sel1" value={meterType} onChange={(e) => setmeterType(e.target.value)}>
                                <option>--Select Meter--</option>
                                <option>PREPAID</option>
                                <option>POSTPAID</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="form-row">
                    {meterType === 'PREPAID' ? (<div className="col-9 mx-auto mb-3">
                        <div className="form-group">
                            <label htmlFor="sel1">DisCo:</label>
                            <select className="form-control" id="sel1" value={disco} onChange={(e) => setDisco(e.target.value)}>
                                <option>--Select DisCo--</option>
                                <option value='AEDC'>AEDC</option>
                                <option value='Eko_prepaid'>EKO</option>
                                <option value='Ibadan_Disco_Prepaid'>IBADAN</option>
                                <option value='Kano_Electricity_Disco'>KANO</option>
                                <option value='Kaduna_Electricity_Disco'>KADUNA</option>
                                <option value='PhED_Electricity'>Porthacourt</option>
                                <option value='Enugu_Electricity_Distribution_Prepaid'>EEDC</option>
                            </select>
                        </div>
                    </div>) : meterType === 'POSTPAID' ? (<div className="col-9 mx-auto mb-3">
                        <div className="form-group">
                            <label htmlFor="sel1">DisCo:</label>
                            <select className="form-control" id="sel1" value={disco} onChange={(e) => setDisco(e.target.value)}>
                                <option>--Select DisCo--</option>
                                <option value='AEDC_Postpaid'>AEDC</option>
                                <option value='Eko_Postpaid'>EKO</option>
                                <option value='Kaduna_Electricity_Disco_Postpaid'>KADUNA</option>

                            </select>
                        </div>
                    </div>) : null}

                    <div className="col-9  mx-auto mb-3">
                        <label htmlFor="validationServerUsername">How much electricity do you want to buy</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">₦</span>
                            </div>
                            <input type="text" className="form-control" id="validationServerUsername" placeholder="" aria-describedby="inputGroupPrepend3" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <div className="invalid-feedback">

                            </div>
                        </div>
                    </div>


                </div>

                <div className="">
                    <div className="form-check form-group col-9 mx-auto">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck3" required />
                        <label className="form-check-label" htmlFor="invalidCheck3">
                            Agree to terms and conditions
                     </label>
                        <div className="invalid-feedback">

                        </div>
                    </div>
                </div>
                <div className="button form-group col-9 mx-auto mt-3 btn-block">
                    <Button disabled={disabled} onClick={handleSubmit}>{disabled ? 'Loading...' : 'Proceed'}</Button>


                    <Modal show={show} onHide={() => hide()}>

                        <Modal.Header closeButton>
                            <h2>Confirm Details</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Name: </label> {user?.customer?.name} <br></br>
                            <label>Address: </label> {user?.customer?.address}<br></br>
                            <label>Purchase Amount: </label> {amount}
                        </Modal.Body>
                        <Modal.Footer>
                            <PaystackButton className='btn btn-primary' {...componentProps} />
                            {/* <button onClick={getPower} className="btn-primary">Power</button> */}
                        </Modal.Footer>

                    </Modal>


                </div>
                <div>
                </div>
            </form>
        </div>
    )


}

export default Content

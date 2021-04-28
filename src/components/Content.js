import React, { useState } from 'react'

function Content() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [meterType, setmeterType] = useState('')
    const [disco, setDisco] = useState('')
    const [meterNumber, setmeterNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [user, setUser] = useState([])
    const vend = '15045d1d22'

    // Generate random num 0f 12 digits
    const nums = new Date().getTime().toString().split("")
    const newString = nums.splice(1).join('')
    const ref_id = parseInt(newString)
    // const meter = 45030378983
    const pub_key = 'cd904b0968cc9a2610e1e35353c53087'
    const priv_key = 'e51d66c5bf278db944f51476f1fb15c6f1b3b9521d60b5eee90e124e920618246e68ee0140764a52255b06e89c463c365eb47ef4f479700e7422a1862937e2cf'
    const crypto = require('crypto')

    const combined_string = `${vend}|${ref_id}|${meterNumber}|${disco}|${pub_key}`
    const hash = crypto.createHmac('sha1', priv_key)
        .update(combined_string)
        .digest('hex')

    // fetch call for meter info
    const handleSubmit = (e) => {
        e.preventDefault()
        setName('')
        setPhone('')
        setmeterNumber('')
        setmeterType('')
        setAmount('')
        setDisco('')
        // console.log('submitted', ref_id)
        fetch(`https://irecharge.com.ng/pwr_api_sandbox/v2/get_meter_info.php?vendor_code=${vend}&reference_id=${ref_id}&meter=${meterNumber}&disco=${disco}&response_format=json&hash=${hash} `, {
            headers: {
                'Content-Type': 'Application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))

    }
    return (
        <div className='content'>
            <form onSubmit={handleSubmit}>
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
                    <div className="col-9 mx-auto mb-3">
                        <label htmlFor="validationServerUsername">Your Phone Number</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">Phone</span>
                            </div>
                            <input type="text" className="form-control" id="validationServerUsername" aria-describedby="inputGroupPrepend3" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <div className="invalid-feedback">

                            </div>
                        </div>
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
                                <option>AEDC</option>
                                <option>Eko_prepaid</option>
                                <option>Ibadan_Disco_Prepaid</option>
                                <option>Kano_Electricity_Disco</option>
                                <option>Kaduna_Electricity_Disco</option>
                                <option>PhED_Electricity</option>
                                <option>Enugu_Electricity_Distribution_Prepaid</option>
                            </select>
                        </div>
                    </div>) : (<div className="col-9 mx-auto mb-3">
                        <div className="form-group">
                            <label htmlFor="sel1">DisCo:</label>
                            <select className="form-control" id="sel1" value={disco} onChange={(e) => setDisco(e.target.value)}>
                                <option>--Select DisCo--</option>
                                <option>AEDC_Postpaid</option>
                                <option>Eko_Postpaid</option>
                                <option>Kaduna_Electricity_Disco_Postpaid</option>

                            </select>
                        </div>
                    </div>)}
                    <div className="col-9 mx-auto mb-3">
                        <label htmlFor="validationServer05">Meter Number</label>
                        <input type="number" className="form-control " id="validationServer05" required value={meterNumber} onChange={(e) => setmeterNumber(e.target.value)} />
                        <div className="invalid-feedback">

                        </div>
                    </div>
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
                    <button className="btn btn-primary text-center mt-4" type="submit">Process Data</button>
                </div>
                <div>
                    {user.map(use => {
                        const { id, title } = use
                        return (
                            <div key={id}>
                                <h1>{title}</h1>
                            </div>
                        )
                    })}
                </div>
            </form>
        </div>
    )
}

export default Content

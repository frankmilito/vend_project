import React, { useState, useEffect } from 'react'
function Reciepts() {
    const [loading, setLoading] = useState(false)
    const removeLS = () => {
        window.print()
        localStorage.removeItem('power')
    }
    // useEffect(() => {
    //     setLoading(true)
    // })
    const detail = JSON.parse(localStorage.getItem("power"))
    return (
        <div className="container w-50 d-flex align-items-center reciept">
            {!loading ?
                <>
                    <div class="card ">
                        <div class="card-body text-center">
                            <div className="logo text-center mb-4">
                                Electrik<small>.ng</small>
                            </div>
                            <h2 className="card-title mb-3">Payment Successful</h2>
                            <label className="mb-2">Address:</label>  {detail?.address}<br />
                            <label className="mb-2">Amount:</label>  {detail?.amount}<br />
                            <label className=" mb-2">Units Purchased:</label>  {detail.units} <br />
                            <label className=" mb-2">Meter Token:</label> {detail.meter_token} <br />
                            <label className=" mb-4">Reference No:</label> {detail.ref} <br />
                            <div onClick={removeLS} className="btn w-50 mt-3 btn-primary">Print</div>
                        </div>
                    </div>
                </> : 'loading...'
            }
        </div>
    )
}

// function Reciepts() {

//     return (
//         <div>
//             hello this is the reciepts page yo
//         </div>
//     )
// }
export default Reciepts

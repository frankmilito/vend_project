import React from 'react'

function Reciepts() {
    const removeLS = () => {
        window.print()
        localStorage.removeItem('power')
        window.location.reload()
    }
    const detail = JSON.parse(localStorage.getItem("power"))
    return (
        <div className="container w-50 d-flex align-items-center reciept">
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
        </div>
    )
}

export default Reciepts

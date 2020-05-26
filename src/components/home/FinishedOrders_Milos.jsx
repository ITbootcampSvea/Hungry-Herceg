import React from 'react'
import './home.css'



const FinishedOrders = () =>{
return(

    <div className='finishedOrderWrapp'>
        <div className='finishedOrderCard'>
        <img className='certifyIcon' src='/img/certificate.png' alt='logo'/>
            <div className='finishedOrderHeader'>
                <label className='finishedOrderHeadeing'>Finished orders</label>
            </div>
            <div className='finishedOrderMainPart'>
                <h1>Danko</h1>
            </div>
            <div className='finishedOrderFooter'></div>
        </div>
    </div>
)
}



export default FinishedOrders;
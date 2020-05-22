import React from 'react';
import './home.css'


const ActivePollFiled = () =>{
    return(

        <div class="active-info">
        <div>
            <label>Pizza Ponedeljak</label>
        </div>
        <div>
            <label>Logged User</label>
        </div>
        <div>
            <label>00:10:15</label>
        </div>
        <div class="btn-icons">
            <div>
                <img src="del.png" alt="icon" title="Delete"/>
            </div>
            <div>
                <img src="end1.png" alt="icon" title="End Poll"/>
            </div>
            <div>
                <img src="vote1.png" alt="icon" title="Vote"/>
            </div>
        </div>
    </div>
    )
}


export default ActivePollFiled
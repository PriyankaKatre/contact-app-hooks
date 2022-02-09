import React from 'react';
import spinnerImage  from '../../assets/img/loading.gif';

export const Spinner= () => {
    return (
        <React.Fragment>
           <img src={spinnerImage} alt="spinnerImage" className='d-block m-auto' style={{width: '200px'}}/>
        </React.Fragment>
    )
}

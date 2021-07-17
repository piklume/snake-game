import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, ...otherProps }) => (
    <button className='custom-button-container' {...otherProps}>
        {children}
    </button>
);

export default CustomButton;
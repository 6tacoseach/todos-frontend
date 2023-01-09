import React from 'react';

import './MainHeader.css';

const MainHeader = props => {
    return <header className="main-header">
        {/* anything should be able to be rendered. Using props.children will always refer to things we pass between opening and closing tags of compnents (whereever component is used!!!). */}
        {props.children}
    </header>
}

export default MainHeader;
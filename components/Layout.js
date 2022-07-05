import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
    const {refresh} = props;
    console.log(refresh);
    return (
        <div>
            <Navbar refresh={refresh}></Navbar>
            {props.children}

        </div>
    );
};

export default Layout;
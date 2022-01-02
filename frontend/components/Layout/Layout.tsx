import React from "react";
import Header from "./Header";
import Head from "next/head";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>HaccTheHub</title>
            </Head>
            <Header />
            <Box>
                {children}
            </Box>
        </>
    );
};

export default Layout;

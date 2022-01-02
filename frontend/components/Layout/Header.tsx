import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" component="div">
                        HaccTheHub
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

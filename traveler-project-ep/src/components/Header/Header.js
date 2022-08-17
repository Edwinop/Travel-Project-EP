import React,{useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'
const Header = ({ onPlaceChanged, onLoad }) => {
    const classes = useStyles();

  return (
    <AppBar position='static'>
        <Toolbar className={classes.toolbar} style={{ backgroundImage: "url(/img/banner.png)",backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat' ,paddingTop: 150}}>
            <h1 style={{fontFamily: 'Urbanist', fontSize: 64, color: 'black', padding: 0,margin: 0}}>Traveler</h1>
            <div style={{width: '50vw', padding: 0}}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase placeholder='Search for a place' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                </div>
            </Autocomplete >
            </div>
        </Toolbar>

    </AppBar>

  )
}

export default Header
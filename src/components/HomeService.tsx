import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme)=>({
      h1: {
        color: '#00897B',
        textAlign: 'center',
        marginTop: theme.spacing(-5),
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        maxWidth: '80%',
        marginLeft: theme.spacing(12),
      },
      img: {
        width: theme.spacing(25),
        marginTop: theme.spacing(0),
    }
}));

const HomeService = () => {

  const classes = useStyles();

  return (
    <div >
      <h1 className={classes.h1}>WELCOME TO IMS DASHBOARD </h1>
      <Grid>
        <Paper elevation={3} className={classes.paper}>
            <img className={classes.img} src="https://img1.wsimg.com/isteam/ip/9b499e78-248a-4060-95a9-e842418af844/img-inventory-control.png/:/" />
            <h3>ITEM MANAGEMENT SYSTEM</h3>
            <p style={{fontStyle: 'italic'}}>Item Management System is an application which takes item details from user and manages those data in an efficient manner. This application helps organization in managing data easily and removes the work load of organization. </p>
        </Paper>
      </Grid>
    </div>
  );
}

export default HomeService;

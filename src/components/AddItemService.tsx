import { Box, Button, Grid, makeStyles, MenuItem, Paper, TextField } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";
import React, {useState} from 'react';
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container:{
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(11),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    minHeight: '45vh',
    marginTop: theme.spacing(-5),
     
},
button:{
  justifyContent: 'center',
  marginTop: theme.spacing(2),
},
 h1: {
      display: "block",
      color: '#00897B',
      textAlign: 'center',
      marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(5),
    },
}));



const AddItemService = () => {

  const classes = useStyles();

  const [item, setItem] = useState({});

  const handleSubmit = (e: any) => {
    console.log(item);
    e.preventDefault();
    postData(item);
  };

    //post data to server
    const postData = (data: {}) => {
      console.log(data);
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/addItem/`, data).then(
        (response) =>{
            //success
            console.log("success");
            console.log(response.data);
            setItem({});
            toast.success("Item Details has been loaded successfully!", {
              position: "bottom-center",
            
            });
        },
        (error)=>{
            //for error
            console.log(error);
            toast.error(error, {
              position: "bottom-center",
            });
        }
      );
    }


  const statusCheck = [{ value: 'True', label: 'True',}, { value: 'False', label: 'False',},];
  const [status, setStatus] = useState('True');
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
    setItem({...item, isActive: event.target.value});
    };

  return (
    <form onSubmit={handleSubmit}>
       <h1 className={classes.h1}>ADD ITEM DETAIL </h1>
       <Paper elevation={3} className={classes.container}>
       <Grid container spacing={2} style={{ marginBottom: "16px" }}>
       <Grid container spacing={1} style={{ marginBottom: "16px" }}>
       <Grid item xs={12} sm={6} md={6}>
        <TextField 
        fullWidth
        label="Name" 
        variant="outlined" 
        onChange={(e) => {
          setItem({...item, name: e.target.value})
        }}/>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <TextField
          fullWidth
          select
          label="IsActive"
          variant="outlined" 
          value={status}
          onChange={handleChange}
          >
          {statusCheck.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
        </Grid>
        <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6} md={6}>
        <TextField
        id="cdate"
        label="Created Date"
        variant="outlined"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setItem({...item, createdDate: e.target.value})}}
      />
       </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <TextField
            id="udate"
            label="Updated Date"
            variant="outlined"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setItem({...item, updatedDate: e.target.value})}}
          />
        </Grid>
        </Grid>
        <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item sm={12}>
        <textarea color="neutral" 
        placeholder="Write Item Description..."
        onChange={(e) => {
          setItem({...item, description: e.target.value})
        }}/>
        </Grid>
        </Grid>
    <Grid container className={classes.button} component={Box} mt={1} p={1}>
      <Button style={{ backgroundColor: "#00897B",}} startIcon={<CloudUpload />} type="submit" variant="contained" size="medium">submit</Button>
    </Grid>
    </Grid>
    </Paper> 
    <ToastContainer/>
    </form>
  );
}

export default AddItemService
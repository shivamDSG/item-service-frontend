import { Box, Button, Container, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, } from '@material-ui/core';
import React, {useState, useEffect } from 'react';
import {makeStyles} from "@material-ui/core";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { CloudUpload } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
      maxWidth: "100vw",
      marginTop: theme.spacing(-5),
  },
  head: {
    backgroundColor: "#00897B",
    color: "#FFF",
  },
  h1: {
      display: "block",
      color: '#00897B',
      textAlign: 'center',
      marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(3),
    },


    container:{
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(11),
      marginRight: theme.spacing(10),
      marginLeft: theme.spacing(10),
      minHeight: '45vh',
      marginTop: theme.spacing(10),
       
  },
  button:{
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
   formh1: {
        display: "block",
        color: '#00897B',
        textAlign: 'center',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(-10),
      },
}));


const ViewItemService = () => {

  const classes = useStyles();
  const [items, setItems] = useState<any[]>([]);

  // for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

//function to call server
const getAllItemDetails = () => {
  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getAllItem`).then(
    (response) =>{
        //success
        setItems(response.data);
        // console.log(response.data);
        toast.success("Item Details has been loaded successfully!", {
          position: "bottom-center",
        });
    },
    (error)=>{
        //for error
        console.log(error);
        toast.error("Something went wrong!", {
          position: "bottom-center",
        });
    }
  );
};

//calling loading item function
useEffect(()=>{
  getAllItemDetails();
},[]);


const onPageChange = (event: any, nextPage: any) =>{
  setPage(nextPage);
};

const onRowsPerPageChange = (event: any) => {
  setRowsPerPage(event.target.value);
};

interface Props {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}

const [currentItem, setCurrentItem] = useState<Props>(Object);

const handleUpdate = (item: Props) => {
      setCurrentItem(item);
}



const [item, setItem] = useState({});

const handleSubmit = (e: any) => {
  console.log(item);
  e.preventDefault();
  updateData(item);
};

  //update data to server
  const updateData = (data: {}) => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/updateItem/`, data).then(
      (response) =>{
          //success
          toast.success("Item Details has been updated successfully!", {
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

const handleChange = (event: any) => {
  setStatus(event.target.value);
  setItem({...item, isActive: event.target.value});
  };


  return (
    <Container className={classes.root}>
       <h1 className={classes.h1}>ITEM DETAILS</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Updated Date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {items.length > 0 ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                      <TableRow key={item.id}>
                           <TableCell>{item.id}</TableCell>
                           <TableCell>{item.name}</TableCell> 
                           <TableCell>{item.description}</TableCell> 
                           <TableCell>{item.createdDate}</TableCell>   
                           <TableCell>{item.updatedDate}</TableCell> 
                           <TableCell>
                            <input type="button" onClick={ () => handleUpdate(item) } value="update" />
                            </TableCell> 
                      </TableRow>
                  )): "No Data Available"}
                </TableBody>
            </Table>
            <TablePagination 
          rowsPerPageOptions={[5, 10, 15, 25, 50]} 
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
        </TableContainer>


       <form onSubmit={handleSubmit} key={currentItem.id}>
       <h1 className={classes.formh1}>UPDATE ITEM DETAIL </h1>
       <Paper elevation={3} className={classes.container}>
       <Grid container spacing={2} style={{ marginBottom: "16px" }}>
       <Grid container spacing={1} style={{ marginBottom: "16px" }}>
       <Grid item xs={12} sm={6} md={6}>
        <TextField 
        fullWidth
        label="Name" 
        variant="outlined" 
        defaultValue={currentItem.name}
        onChange={(e) => {
          setItem({...item, name: e.target.value})
          setItem({...item, id: currentItem.id})
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
        defaultValue={currentItem.createdDate}
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
            defaultValue={currentItem.updatedDate}
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
        defaultValue={currentItem.description}
        onChange={(e) => {
          setItem({...item, description: e.target.value})
        }}/>
        </Grid>
        </Grid>
    <Grid container className={classes.button} component={Box} mt={1} p={1}>
      <Button style={{ backgroundColor: "#00897B",}} startIcon={<CloudUpload />} type="submit" variant="contained" size="medium">update</Button>
    </Grid>
    </Grid>
    </Paper> 
    </form>
    <ToastContainer />
    </Container>
  );
}

export default ViewItemService;

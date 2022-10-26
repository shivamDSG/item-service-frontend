import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, } from '@material-ui/core';
import React, {useState, useEffect } from 'react';
import {makeStyles} from "@material-ui/core";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



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
        console.log(response.data);
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
        <ToastContainer />
    </Container>
  );
}

export default ViewItemService;

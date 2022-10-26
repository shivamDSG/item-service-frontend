import { Box, Button, Card, Container, Grid, makeStyles, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, } from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {  SearchRounded, Update } from '@material-ui/icons';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
      maxWidth: "100vw",
  },
  head: {
    backgroundColor: "#00897B",
    color: "#FFF",
  },
  button: {
    backgroundColor: "#00897B",
  },
  firstCard: {
    padding: theme.spacing(3),
    justifyContent: "space-between", 
    textAlign: "center",
    marginTop: theme.spacing(-5),
  },
  secondCard: {
    marginTop: theme.spacing(5),
  },
  thirdCard: {
    marginTop: theme.spacing(5),
  },
}));


const UpdateItemService = () => {


  const [itemId, setItemId] = useState<number>();
  const [items, setItems] = useState<any>([]);
  const handleSearch = (e: any) => {
    e.preventDefault();
    if(!itemId){
        toast.error("Please Enter the Id!",{
          position:"bottom-center"
        });
    }
    else{
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/searchItem/${itemId}`).then(
        (response) =>{
            //success
            console.log(response.data);
            setItems(response.data);
            toast.success("Data Found Successfully!", {
              position: "bottom-center",
            });
            
            if(response.data===null)
            {
            toast.error("Item does not exist!", {
              position: "bottom-center",
            });
          }
        },
        (error)=>{
            //for error
            
            if(error.response.data===null)
            {
            toast.error("Item does not exist!", {
              position: "bottom-center",
            });
          }else{
            toast.error("Something went wrong!", {
              position: "bottom-center",
            });
          }
          console.log(error);
        }
      );
    }
  }

  const handleUpdate = (e: any) => {
    <Update />
  }

  const classes = useStyles();

  return (
   <div>
      <Container maxWidth='md'>
          <Grid>
              <Card elevation={3} className={classes.firstCard}>
              <Typography variant="h6" style={{color:'#00897B', textAlign: 'center', paddingBottom:5}}>
                        SEARCH AN ITEM TO UPDATE
                  </Typography>
                  <div>
                    <TextField 
                    label="Item Id" 
                    variant="outlined" 
                    style={{color: '#00897B'}}
                    value={itemId}
                    onChange = {
                      e => setItemId(+e.target.value)
                    }
                    />
                  </div>
                  <div style={{marginTop: 10}}> 
                    <Button variant="contained" startIcon={<SearchRounded/>} onClick= {handleSearch} className={classes.button}>
                       Search
                    </Button>
                  </div>
              </Card>

              <Card className={classes.secondCard}>
              <TableContainer component={Paper}>
              <Typography variant="h6" style={{color:'#00897B', textAlign: 'center'}}>
                        ITEM DETAIL
                  </Typography>
                <Table>
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>IsActive</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody > 
                          <TableRow key={items.id}>
                              <TableCell>{items.id}</TableCell>
                              <TableCell>{items.name}</TableCell> 
                              <TableCell>{items.description}</TableCell> 
                              <TableCell>{items.isActive}</TableCell>   
                              <TableCell>{items.createdDate}</TableCell> 
                              <TableCell>{items.updatedDate}</TableCell> 
                              <TableCell> <div style={{marginTop: 10}}> 
                              {/* <Link href="/update">
                                  <input type="button" value="update"/>
                              </Link> */}
                              </div>
                              </TableCell> 
                          </TableRow>
                  
                    </TableBody>
                </Table>
              </TableContainer>
              </Card>

          </Grid>
          <ToastContainer />
      </Container>
  </div>
  );
}

export default UpdateItemService;


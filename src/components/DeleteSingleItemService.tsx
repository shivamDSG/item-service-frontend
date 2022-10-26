import { Button, Card, Container, Grid, makeStyles, TextField, Typography, } from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { SearchRounded } from '@material-ui/icons';

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
}));


const DeleteSingleItemService = () => {

  const [itemId, setItemId] = useState<number>();

  const handleDelete = (e: any) => {
    e.preventDefault();
    if(!itemId){
        toast.error("Please Enter the Id!",{
          position:"bottom-center"
        });
    }
    else{
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteSingleItem/${itemId}`).then(
        (response) =>{
            //success
            console.log(response.data);
            toast.success("Data Deleted Successfully!", {
              position: "bottom-center",
            });
            
            if(response.status===404)
            {
            toast.error("Item does not exist!", {
              position: "bottom-center",
            });
          }
        },
        (error)=>{
            //for error
            
            if(error.response.status===404)
            {
            toast.error("Item does not exist!", {
              position: "bottom-center",
            });
          }else{
            toast.error("Something went wrong!", {
              position: "bottom-center",
            });
          }
        }
      );
    }
  }

  const classes = useStyles();

  return (
   <div>
      <Container maxWidth='md'>
          <Grid>
              <Card elevation={3} className={classes.firstCard}>
              <Typography variant="h6" style={{color:'#00897B', textAlign: 'center', paddingBottom:5}}>
                        DELETE PARTICULAR ITEM DETAIL
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
                    <Button variant="contained" startIcon={<SearchRounded/>} onClick= {handleDelete} className={classes.button}>
                       Delete
                    </Button>
                  </div>
              </Card>
          </Grid>
          <ToastContainer />
      </Container>
  </div>
  );
}

export default DeleteSingleItemService;


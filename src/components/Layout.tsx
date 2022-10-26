import { ClassNames } from "@emotion/react";
import { Grid, makeStyles } from "@material-ui/core";
import { SideBar }  from "./SideBar"

interface Props {
    children?: React.ReactNode;
}


const useStyles = makeStyles((theme) => ({
    container:{
      spacing: [0, 2, 3, 5, 8],
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    }
  
  }));

export const Layout = ({children}: Props) => {

const classes = useStyles();

  return (
    <div>
    <Grid container>
        <Grid item sm={2}>
            <SideBar />
        </Grid>
        <Grid item sm={10} className={classes.container}>
        {children}
        </Grid>
    </Grid>
    </div>
  );
}



import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
import { AddShoppingCart, CancelRounded, SearchRounded, SystemUpdateAltRounded, ViewList } from "@material-ui/icons";

import Link from 'next/link';


const useStyles = makeStyles((theme) => ({

    drawerLg: {
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            display: "block",
        },
    },
    drawerSm: {
        display: "block",
        [theme.breakpoints.up('sm')]:{
            display: "none",
        },
    },

    drawerPaper: { width: 'inherit' },
    
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    div: {
        display: 'flex', 
        position: "absolute", 
    },
    list: {
        marginTop: theme.spacing(1),
        // marginLeft: theme.spacing(8),
        [theme.breakpoints.down("sm")]:{
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(7),
            marginRight: theme.spacing(-10),
            position: "fixed",
        },
    },
    img: {
        width: theme.spacing(25),
        marginTop: theme.spacing(0),
        [theme.breakpoints.down("sm")]:{
            width: theme.spacing(7),
            height: theme.spacing(4),
            marginTop: theme.spacing(0),
        },
    },
    divider: {
        width: theme.spacing(8),
    }

  }));


export const SideBar = () => {

    const classes = useStyles();

  return (
    <div className={classes.div}>
    <Drawer 
      style={{ width: '320px' }}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawerLg}
    >
         
      <List className={classes.list}>
        <img className={classes.img} src="https://www.nicepng.com/png/detail/136-1365302_inventory-the-business-management-logo-stock-management-system.png" alt="logo" />
        <Link href="/" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"HomePage"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/addItem" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
            <AddShoppingCart />
            </ListItemIcon>
            <ListItemText primary={"Add Item Details"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/viewItem" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
            <ViewList />
            </ListItemIcon>
            <ListItemText primary={"View Item Details"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/updateItem" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
            <SearchRounded />
            </ListItemIcon>
            <ListItemText primary={"Update Item"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/deleteSingle" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
            <SystemUpdateAltRounded />
            </ListItemIcon>
            <ListItemText primary={"Delete Single Item"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/deleteAll" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
            <CancelRounded />
            </ListItemIcon>
            <ListItemText primary={"Delete All"} />
          </ListItem>
        </Link>
      </List>
    </Drawer> 
    </div>
  );
}


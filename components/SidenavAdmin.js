import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { red } from '@mui/material/colors';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import styles from '../styles/Login/header.module.scss'
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import {useAppStore} from '../components/appStore'
import { useRouter } from 'next/router';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav() {

  const router = useRouter();

  const clock = () => {
    localStorage.clear();
    window.location.reload;
    window.location.href = "../Dashboard/AdminTimeInOut";
  }

  const dash = () => {
    localStorage.clear();
    window.location.reload;
    window.location.href = "../Dashboard/AdminDash";
  }
 
  const Areports = () => {
    localStorage.clear();
    window.location.reload;
    window.location.href = "../Dashboard/AdminReports";
  }

  const EditRole = () => {
    localStorage.clear();
    window.location.reload;
    window.location.href = "../Dashboard/EditRoles";
  }

  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline /> 
      <Box height= {30} />
       <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? 
            <ChevronRightIcon /> : 
            <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List >
            <ListItem disablePadding sx={{ display: 'block' }} className={styles.fade} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardCustomizeOutlinedIcon sx={{ color: '#852525' }} className={styles.fade}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} onClick={clock}/>
                <ArrowRightIcon/>
              </ListItemButton>
              <Divider />
            </ListItem>
         

            <ListItem disablePadding sx={{ display: 'block' }} className={styles.fade}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AssessmentIcon sx={{ color: '#852525' }} className={styles.fade}/>
                </ListItemIcon>
                <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} onClick={Areports} />
                <ArrowRightIcon/>
              </ListItemButton>
              <Divider />
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} className={styles.fade}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SupervisedUserCircleIcon sx={{ color: '#852525' }} className={styles.fade}/>
                </ListItemIcon>
                <ListItemText primary="Edit Role" sx={{ opacity: open ? 1 : 0 }} onClick={EditRole} />
                <ArrowRightIcon/>
              </ListItemButton>
              <Divider />
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} className={styles.fade}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GroupsOutlinedIcon sx={{ color: '#852525' }} className={styles.fade}/>
                </ListItemIcon>
                <ListItemText primary="Employees" sx={{ opacity: open ? 1 : 0 }} onClick={dash} />
                <ArrowRightIcon/>
              </ListItemButton>
              <Divider />
            </ListItem>

        </List>
      </Drawer>
    </Box>
  );
}
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { Alert } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FolderIcon from "../../../../../assets/Common/folder.png";
import LockedFolder from "../../../../../assets/Common/secure.png";
import EmpIcon from '../../../../../assets/Common/man.png'
import LockEmpIcon from '../../../../../assets/Common/lockman.png'
import OpenFolder from "../../../../../assets/Common/open-folder.png";
import {TransactionsTable} from "../../../components/AllEmpTables"
import Tab from '@mui/material/Tab';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {getAllClients} from '../../../../../apis/Clients/manage'
import { getAllClientAssignedAdmins, getAllEmployeeAssignedAdmins } from '../../../../../apis/Admins/manage';
import { getAllEmployee } from '../../../../../apis/Employees/manage';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function PickEmployee() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [isSuccess, setisSuccess] = useState(false);
    const [isError, setisError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    const [allClientData, setallClientData] = useState([]);

    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }

    const createError = () => {
      if(isError)
      return (
        <Alert severity="error">{errorMsg}</Alert>
      )
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


    useEffect(() => {
        if(isError)
        {
          setInterval(() => {
            setisError(false)
          }, 3000);
        }
        else if(isSuccess)
        {
          setInterval(() => {
            setisSuccess(false)
          }, 3000);
        }
    }, [isError, isSuccess])


    
    const successAlert = () => {
        if(isSuccess)
        return (
          <Alert severity="success">Available Employees Updated</Alert>
        )
      }

      const ClientFolder = ({name, data}) => {
          if(data.employee_status === 'Offline')
        return(
            <Link  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,
                textDecoration: 'none'

            }}>
                <img src={EmpIcon} height={50}/>
                <p style={{ 
                    color:'#000000',
                    textDecoration: 'none'
                }}>
                    {name}
                    </p>
                
            </Link>
        )
        else if(data.employee_status === 'Online'){
            return(
                <Link  style={{
                    height: 80,
                    width:120,
                    borderRadius: 8,
                    marginBottom:8,
                    marginLeft:4,
                    textDecoration: 'none'
    
                }}>
                    <img src={LockEmpIcon} height={50}/>
                    <p style={{ 
    textDecoration: 'none'
                    }}>
                        {name}
                        </p>
                    
                </Link>
            )
        }
    }
      
    const getAllClientsHere = () => {
        getAllEmployee()
        .then(res => {
            console.log("All Client-",res.data);
            if(res.data.error){
                setisError(true)
                seterrorMsg("Couldn't get the Employee Data")
            }
            else{
                console.log("All Client-",res.data.allEmp);
                setisSuccess(true)
                setallClientData(res.data.allEmp)
            }
        })
        .catch(err => {
            
        })
    }

    useEffect(() => {
        getAllClientsHere()
        getAllAssignedEmployeeHere()
        getAllClientNameList()
    }, [])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    
    const [value, setValue] = React.useState('');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [allAssignedClientAdminMe, setallAssignedClientAdminMe] = useState([]);
    const [allAssignedEmployeeAdminMe, setallAssignedEmployeeAdminMe] = useState([]);

    const [clientNameList, setclientNameList] = useState([]);

    const [clientNameSelected, setclientNameSelected] = useState('');

    const [personName, setPersonName] = React.useState([]);
  
    const handleChangeSelectName = (event) => {
      setclientNameSelected(event.target.value)
    };


    const getAllAssignedEmployeeHere = () => {
        getAllEmployeeAssignedAdmins()
      .then(res => {
          if(res.data.error){
              setisError(true)
          }
          console.log("Hoo - ",res.data.allEmployeeInfo);
          setallAssignedEmployeeAdminMe(res.data.allEmployeeInfo);
          setisSuccess(true)
      })
      .catch(err => {
          console.log(err);
      })
    }

    const getAllClientNameList = () => {
      getAllClientAssignedAdmins()
      .then(res => {
        if(res.data.error){
          setisError(true)
        }
        setclientNameList(res.data.allClientsInfo)        
      })
      .catch(err => {
        setisError(true)
      })
    }

  return (
    <div>
{createError()}
{successAlert()}

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Employees" {...a11yProps(0)} />
          <Tab label="My Employees" {...a11yProps(1)} />
          <Tab label="See Work assigned" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 300,
        },
      }}
    >
   <Grid container spacing={1} style={{marginTop:8}} item xs={6} md={8}>

   
{allClientData && allClientData.map((item, index) => {
    return(
        <Grid item>
            <Item style={{
                height:100,
                width:140,
                alignItems: 'center',
            }}>
                <ClientFolder name={item.employee_name} data={item}/>
            </Item>
        </Grid>
    )
})}
</Grid>
      <Paper>
        <Typography className="mt-4" style={{marginLeft:32}}>
          Pick Employees
        </Typography>
        <Grid container spacing={1} style={{margin:10}} item xs={6} md={8}>
        {allAssignedClientAdminMe && allAssignedClientAdminMe.map((item, index) => {
    return(
        <Grid item>
            <Item style={{
                height:100,
                width:140,
                alignItems: 'center',
            }}>
                <ClientFolder name={item.client_company_name} data={item}/>
            </Item>
        </Grid>
    )
})}
</Grid>
      </Paper>
      <TransactionsTable/>
    </Box>  
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Paper style={{height:300}}>
       
        <Grid container spacing={1} style={{margin:10,marginTop:10}} item xs={6} md={8}>
        {allAssignedEmployeeAdminMe && allAssignedEmployeeAdminMe.map((item, index) => {
    return(
        <Grid item onClick={handleOpen}>
            <Item style={{
                height:100,
                width:140,
                alignItems: 'center',
            }}>
                <ClientFolder name={item.employee_name} data={item}/>
            </Item>
        </Grid>
    )
})}
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assign Client
          </Typography>
          <TextField
          required
          id="outlined-required"
          label="Message to Employee"
          defaultValue="Short message about the client"
          style={{ 
            width:300,
            marginTop:20
          }}
        />
       <FormControl style={{width:300, marginTop:10}}>
  <InputLabel id="demo-simple-select-label">Select Client To Assign</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={clientNameSelected}
    label="Select Client"
    onChange={handleChangeSelectName}
  >
    {clientNameList && clientNameList.map((name) => {
      return <MenuItem value={name.client_name}>{name.client_name}</MenuItem>
    })
    }

  </Select>
</FormControl>
        </Box>
      </Modal>
</Grid>
      </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>


    </div>
  )
}

export default PickEmployee
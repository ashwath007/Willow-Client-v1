import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';

import { PageVisitsTable } from "../../components/Tables";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { Alert } from "@mui/material";
import FolderIcon from "../../../../../assets/Common/folder.png";
import LockedFolder from "../../../../../assets/Common/secure.png";
import OpenFolder from "../../../../../assets/Common/open-folder.png";


import Tab from '@mui/material/Tab';

import {getAllClients} from '../../../../../apis/Clients/manage'


function PickClients() {


    const [isSuccess, setisSuccess] = useState(false);
    const [isError, setisError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    const [allClientData, setallClientData] = useState([]);

    const createError = () => {
      if(isError)
      return (
        <Alert severity="error">{errorMsg}</Alert>
      )
    }
  

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
          <Alert severity="success">Available Clients Updated</Alert>
        )
      }

      const ClientFolder = ({name, data}) => {
          if(data.client_status === 'Offline')
        return(
            <Link to={`/superadmin/manage/companies/${data.client_id}`}  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,
                textDecoration: 'none'

            }}>
                <img src={FolderIcon} height={50}/>
                <p style={{ 
                    color:'#000000',
                    textDecoration: 'none'
                }}>
                    {name}
                    </p>
                
            </Link>
        )
        else if(data.client_status === 'Online'){
            return(
                <Link to={`/superadmin/manage/companies/${data.client_id}`}  style={{
                    height: 80,
                    width:120,
                    borderRadius: 8,
                    marginBottom:8,
                    marginLeft:4,
                    textDecoration: 'none'
    
                }}>
                    <img src={LockedFolder} height={50}/>
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
        getAllClients()
        .then(res => {
            if(res.data.error){
                setisError(true)
                seterrorMsg("Couldn't get the Client Data")
            }
            else{
                console.log("All Client-",res.data.allClients);
                setisSuccess(true)
                setallClientData(res.data.allClients)
            }
        })
        .catch(err => {
            
        })
    }

    useEffect(() => {
        getAllClientsHere()
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
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
    <div>
{createError()}
{successAlert()}

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="External" {...a11yProps(0)} />
          <Tab label="Internal" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
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
                <ClientFolder name={item.client_company_name} data={item}/>
            </Item>
        </Grid>
    )
})}
</Grid>
      <Paper>
        <Typography className="mt-4" style={{marginLeft:32}}>
          Pick Clients
        </Typography>
        <Paper>
      
        </Paper>
      </Paper>
    </Box>  
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>


    </div>
  )
}

export default PickClients
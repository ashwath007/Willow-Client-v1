
import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getAllClientAssignedAdmins } from "../../../../apis/Admins/manage";
import {Link} from 'react-router-dom';
import FolderIcon from "../../../../assets/Common/folder.png";
import LockedFolder from "../../../../assets/Common/secure.png";
import EmpIcon from '../../../../assets/Common/man.png'
import LockEmpIcon from '../../../../assets/Common/lockman.png'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { getAllEmployee } from "../../../../apis/Employees/manage";

const AdminDashboardOverview =  () => {

  useEffect(() => {
    
    getAllAssignedClientHere()
    getAllEmployeesHere()
  }, [])
  


  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [allAssignedClientAdminMe, setallAssignedClientAdminMe] = useState([]);

  const [allEmployeeME, setallEmployeeME] = useState([]);


    const getAllAssignedClientHere = () => {
      getAllClientAssignedAdmins()
      .then(res => {
          if(res.data.error){
              setisError(true)
          }
          console.log("Hoo - ",res.data.allClientsInfo);
          setallAssignedClientAdminMe(res.data.allClientsInfo);
          setisSuccess(true)
      })
      .catch(err => {
          console.log(err);
      })
    }


    const getAllEmployeesHere = () => {
      getAllEmployee()
      .then(res => {
          if(res.data.error){
              setisError(true)
          }
          console.log("Hoo  Emp - ",res.data.allEmp);
          setallEmployeeME(res.data.allEmp);
          setisSuccess(true)
      })
      .catch(err => {
          console.log(err);
      })
    }

    const ClientFolder = ({name, data}) => {
      if(data.client_status === 'Offline')
    return(
        <Link  style={{
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
            <Link  style={{
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

    const EmpFolder = ({name, data}) => {
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

  return (
    <>

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Work" {...a11yProps(0)} />
          <Tab label="My Clients" {...a11yProps(1)} />
          <Tab label="My Employees" {...a11yProps(2)} />
          <Tab label="Work Status" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
    <div>
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

      <Paper>
        <Typography className="mt-4" style={{marginLeft:32}}>
          Work Bucket
        </Typography>
        <Paper>

        </Paper>
      </Paper>
    </Box>        
    <div>
      <Grid container spacing={2}>
  <Grid item xs={6} md={8}>
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

      <Paper>
        <Typography className="mt-4" style={{marginLeft:32}}>
          Assign Work
        </Typography>
        <Paper>

        </Paper>
      </Paper>
    </Box>  
  </Grid>
  <Grid item xs={6} md={4}>
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

      <Paper>
        <Typography className="mt-4" style={{marginLeft:32}}>
          Work Bucket
        </Typography>
        <Paper>

        </Paper>
      </Paper>
    </Box>  
  </Grid>
  </Grid>
      </div>

      {/* <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
        </Col>
      </Row> */}

      {/* <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> */}
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Clients
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          All
        </Link>
      </Breadcrumbs>
      <Paper style={{height:300}}>
       
       <Grid container spacing={1} style={{margin:10,marginTop:50}} item xs={6} md={8}>
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
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container spacing={1} style={{margin:10,marginTop:50}} item xs={6} md={8}>
       {allEmployeeME && allEmployeeME.map((item, index) => {
   return(
       <Grid item>
         {/* {console.log(item.employee_name) } */}
           <Item style={{
               height:100,
               width:140,
               alignItems: 'center',
           }}>
               <EmpFolder name={item.employee_name} data={item}/>
           </Item>
       </Grid>
   )
})}
</Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </Box>


      
     
    </>
  );
};


export default AdminDashboardOverview;

import React, { useEffect, useState} from 'react'
import { getAClients,createSysterCompany, getAllSisterCompamyList, getAllCompamyList } from '../../../../../apis/Clients/manage';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TransactionsTable } from "../../../components/DivisionTables";
import { Col, Row, Card, Form, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Alert } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import FolderIcon from "../../../../../assets/Common/folder.png";



function RegisterCompany({match}) {

  const [aCompany, setaCompany] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dname, setdname] = useState('');
  const [dDivision, setdDivision] = useState('')
  const [plans, setplans] = useState([]);

  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');


  const [siblingsCompaniesFolders, setsiblingsCompaniesFolders] = useState([]);


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const ClientFolder = ({name, data}) => {
    return(
        <Link to={`/superadmin/manage/companies/${match.params.id}/company/${data.company_id}`}  style={{
            height: 80,
            width:120,
            borderRadius: 8,
            marginBottom:8,
            marginLeft:4

        }}>
            <img src={FolderIcon} height={50}/>
            <p style={{ 

            }}>
                {name}
                </p>
            
        </Link>
    )
}


  const getAllSiblingCompanies = () => {
      const data = {
        company_id: match.params.id
      }
      getAllCompamyList(data)
    .then(res => {  
        setsiblingsCompaniesFolders(res.data.company)
        console.log(match.params.id)
        console.log(res)
    })
    .catch(err => {
        setisError(true)
    })
  }

  const createError = () => {
    if(isError)
    return (
      <Alert severity="error">{errorMsg}</Alert>
    )
  }

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
      <Alert severity="success">Admin Created Successfully</Alert>
    )
  }


  const addDivisionToCompany = () => {
      const data = {
        id: match.params.id,
        division_name: dname,
        plans:planes,
        seperate_billing_account: true,
        client_company_name:dname,
      }
      createSysterCompany(data)
      .then((res) => {  
        if(res.data.error){
            setisError(true)
            seterrorMsg(res.error)
          }
          else{
            setisSuccess(true)

          }


      })
      .catch(err => {
          console.log(err);
      })
  }


  const getACompanyDetails = (id) => {
    getAClients(id).then(res => {
        console.log(res)
        if(res.data.error){
            console.log(res.data.error);
        }
        setaCompany(res.data.client);
    })
  }
  useEffect(() => {
      if(match.params.id)
            getACompanyDetails(match.params.id)
            getAllSiblingCompanies()
  }, [])
  
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

  const names = [
    'All',
    'GST',
    'PF',
    'ESI',
    'Factory Registration'
  ];

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

  const [planes, setplanes] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setplanes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
        <div style={{textAlign: 'center' }} className='mt-3'>
        <h2 >
            {aCompany.client_company_name}
        </h2>
        <p>
            {aCompany.client_company_size}
        </p>
        <p>
        {aCompany.client_name}
    </p>
        
        </div>
       <div>
           {successAlert()}
           {createError()}
       <Tabs className='mt-3'>
    <TabList>
      <Tab>Files & Folders</Tab>
      <Tab>Division</Tab>
    </TabList>

    <TabPanel>
            <div
            style={{
                height:300,
                width: '100%',
                backgroundColor:'#ffffff'
            }}
            >
  <>
        <Grid container spacing={1} style={{marginTop:10,margin:10}} item xs={6} md={8}>

   
        {siblingsCompaniesFolders && siblingsCompaniesFolders.map((item, index) => {
            return(
                <Grid item>
                    <Item style={{
                        height:120,
                        width:140,
                        alignItems: 'center',
                    }}>
                        <ClientFolder name={item.company_name} data={item}/>
                    </Item>
                </Grid>
            )
        })}
  </Grid>
    </>
             </div>   
        </TabPanel>
    <TabPanel>
    <Button onClick={handleOpen}>Add Division</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Division
          </Typography>
        
          <Form>
    <Form.Group className="mb-3 mt-4">
        <Form.Label>Sister company / Division Name</Form.Label>
        <Form.Control  onChange={(e) => setdname(e.target.value)} type="text" placeholder="Name of the Sister Company" />
    </Form.Group>
    <FormControl sx={{ width: 300 }} className='mb-3'>
    <Form.Label>Select Services</Form.Label>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={planes}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={planes.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    <Form.Group className="mb-3">
    <Form.Label>Select Divion Type</Form.Label>
    <Form.Select onChange={(e) => setdDivision(e.target.value)} >
      <option defaultValue>Sister Company</option>
      <option>Division Within</option>
      <option>Both</option>
    </Form.Select>
  </Form.Group>
  <Button onClick={addDivisionToCompany} variant="contained" disableElevation>
            Add Division/Sister Company
</Button>
        </Form>
        </Box>
      </Modal>
         
            <TransactionsTable company_id={match.params.id}/>
        </TabPanel>
        </Tabs>
       </div>
    </div>
  )
}

export default RegisterCompany
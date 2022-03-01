import React, { useState, useEffect} from 'react';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Button } from '@themesberg/react-bootstrap';
import { TransactionsTable } from "../../../components/ClientsTables";
import Documentation from "../../../components/Documentation";

import { Alert } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { createClient, getAllClients } from '../../../../../apis/Clients/manage';

function ClientManage() {


    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [description, setdescription] = useState('');
    const [selectregion, setselectregion] = useState('');
    const [selecttype, setselecttype] = useState('');
    const [cname, setcname] = useState('')
    
    const [isSuccess, setisSuccess] = useState(false);
    const [isError, setisError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

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
  

    const submitCreateAdmin = (e) => {
        e.preventDefault();


        const client_profile = {
          role: 3,
          client_name: name,
          client_description: description,
          client_email: email,
          password: password,
          client_company_size: selectregion,
          client_company_name: cname,
          client_company_type: selecttype
      }
      createClient(client_profile).then(res => { 
          console.log("Res ", res) 
            if(res.data.error){
              seterrorMsg(res.error)
            }
            else if(res.data.client){
              setisSuccess(true)
              setname(null)
              setpassword(null)
              setdescription(null)
              setemail(null)
              setselectregion(null)
            }
        }).catch(err => {
          console.log(err);
        })
    }   

    const successAlert = () => {
      if(isSuccess)
      return (
        <Alert severity="success">Admin Created Successfully</Alert>
      )
    }



  return (
      <>
      
      <h1 className="h2 mt-3">Client</h1>
    <Tabs className='mt-3'>
    <TabList>
      <Tab>Manage</Tab>
      <Tab>Create</Tab>
    </TabList>

    <TabPanel>
    <Container className='mt-4 mb-5'>
        <TransactionsTable />
      </Container>
    </TabPanel>
    <TabPanel>
    <article>
      {createError()}
     {successAlert()}
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <h1 className="h2">Create Client</h1>
            <p className="mb-0">
              Here you can create Client Profile, and manage the profile.
            </p>
          </Col>
        </Row>

        <Form>
  <Form.Group className="mb-3">
    <Form.Label>Client Name</Form.Label>
    <Form.Control  onChange={(e) => setname(e.target.value)} type="email" placeholder="Client name" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Email address</Form.Label>
    <Form.Control  onChange={(e) => setemail(e.target.value)} type="email" placeholder="sabari@bayaweaverconsultancyservices.com" />
  </Form.Group>
  <Form.Group className="mb-3">
<Form.Label>Client Password</Form.Label>
<Form.Control  onChange={(e) => setpassword(e.target.value)} type="email" placeholder="************" />
</Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Client Description</Form.Label>
    <Form.Control  onChange={(e) => setdescription(e.target.value)} as="textarea" rows="3" />
  </Form.Group>
  <p className="mb-2 mt-2">
              Folder will be created by the company's name, So be careful
            </p>
            <Form.Group className="mb-3">
    <Form.Label>Client Name</Form.Label>
    <Form.Control  onChange={(e) => setcname(e.target.value)} type="email" placeholder="ABC Pvt Ltd" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Select Company Size</Form.Label>
    <Form.Select onChange={(e) => setselectregion(e.target.value)} >
      <option defaultValue>Company Size</option>
      <option>10+</option>
      <option>50+</option>
      <option>100+</option>
      <option>1000+</option>
    </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Select Company Type</Form.Label>
    <Form.Select onChange={(e) => setselecttype(e.target.value)} >
      <option defaultValue>Company Size</option>
      <option>Agriculture</option>
      <option>Service</option>
      <option>Textile</option>
      <option>Food & Beverage</option>
    </Form.Select>
  </Form.Group>

  {/* <Form>
  <Form.Label>Upload Profile Picture</Form.Label>
  <Form.Control type="file" />
</Form> */}

</Form>

        

<Button onClick={submitCreateAdmin} variant="outline-success" size="lg" className="me-1 mt-5">Large Button</Button>

       

      
      </Container>
     
    </article>
    </TabPanel>
  </Tabs>
  </>


   
  )
}

export default ClientManage
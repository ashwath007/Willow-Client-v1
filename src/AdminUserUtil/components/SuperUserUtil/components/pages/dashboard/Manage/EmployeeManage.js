import React, { useState, useEffect} from 'react';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Button } from '@themesberg/react-bootstrap';
import { TransactionsTable } from "../../../components/EmployeeTable";

import Documentation from "../../../components/Documentation";
import { Alert } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { createAdmin } from '../../../../../apis/Admins/manage';
import { createEmployee } from '../../../../../apis/Employees/manage';

function EmployeeManage() {


    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [description, setdescription] = useState('');
    const [selectregion, setselectregion] = useState('');
    
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


        const emp_profile = {
          role: 1,
          name: name,
          description: description,
          email: email,
          password: password,
          selectregion: selectregion
      }
      createEmployee(emp_profile).then(res => { 
          console.log("Res ", res) 
            if(res.data.error){
              seterrorMsg(res.error)
            }
            else if(res.data.admin){
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
      <h1 className="h2 mt-3">Employee</h1>
    
    <Tabs className='mt-5'>
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
            <h1 className="h2">Create Employee</h1>
            <p className="mb-0">
              Here you can create Employee Profile, and manage the profile.
            </p>
          </Col>
        </Row>

        <Form>
  <Form.Group className="mb-3">
    <Form.Label>Employee Name</Form.Label>
    <Form.Control  onChange={(e) => setname(e.target.value)} type="email" placeholder="Sabari" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Email address</Form.Label>
    <Form.Control  onChange={(e) => setemail(e.target.value)} type="email" placeholder="sabari@bayaweaverconsultancyservices.com" />
  </Form.Group>
  <Form.Group className="mb-3">
<Form.Label>Employee Password</Form.Label>
<Form.Control  onChange={(e) => setpassword(e.target.value)} type="email" placeholder="************" />
</Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Employee Role & Description</Form.Label>
    <Form.Control  onChange={(e) => setdescription(e.target.value)} as="textarea" rows="3" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Select Region</Form.Label>
    <Form.Select onChange={(e) => setselectregion(e.target.value)} >
      <option defaultValue>Open this select menu</option>
      <option>Coimbatore</option>
      <option>Tiruppur</option>
      <option>Chennai</option>
    </Form.Select>
  </Form.Group>



</Form>

        

<Button onClick={submitCreateAdmin} variant="outline-success" size="lg" className="me-1 mt-5">Large Button</Button>

       

      
      </Container>
     
    </article>
    </TabPanel>
  </Tabs>


  </>

   
  )
}

export default EmployeeManage
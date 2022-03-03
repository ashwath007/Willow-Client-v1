
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { adminLoginSubmit, isAlreadyAutheticated, setAdminDetails } from "../../apis/auth/auth";
import { Alert } from "@mui/material";
import { Redirect } from "react-router-dom";
import { isAlreadyAutheticatedAdmin } from "../../../../apis/auth/auth";


export default () => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isLoginSuccess, setisLoginSuccess] = useState(false);
  const [isLoginError, setisLoginError] = useState(false);
  const [loginErrorMsg, setloginErrorMsg] = useState('');

  // Here Redirect to Particular Role's Home Dashboard
  const [redirectToDashboard, setredirectToDashboard] = useState(false);
  const [redirectToPath, setredirectToPath] = useState('/');


  const redirectToDashboardIfLoggedIn = () => {
    if(redirectToDashboard){
      return <Redirect to={redirectToPath}/>
    }
  }

  const checkAuthendicated = () => {
    isAlreadyAutheticated().then(res => {

      // TODO: Auto Redirect If Loggd In
        console.log(res.data);
        if(res.data.status === true){
            switch(res.data.role){
              case 0:
                setredirectToDashboard(true)
                setredirectToPath('/superadmin')
                break;
              default:
                break;
            }
        
      }
    })

    // TODO: Auto Redirect If Loggd In
    isAlreadyAutheticatedAdmin().then(res => {
        console.log(res.data);
        if(res.data.status === true){
            switch(res.data.role){
              case 1:
                setredirectToDashboard(true)
                setredirectToPath('/admin')
                break;
              default:
                break;
            }
        
      }
    })
  }


  useEffect(() => {
     checkAuthendicated() 
  }, [])
  


  const loginError = () => {
    if(isLoginError)
    return (
      <Alert severity="error">{loginErrorMsg}</Alert>
    )
  }

  const redirectToHome = () => {
    if(isLoginSuccess){
      return <Redirect to="/"/>
    }
  }

  useEffect(() => {
      if(isLoginError)
      {
        setInterval(() => {
          setisLoginError(false)
        }, 3000);
      }
  }, [isLoginError])
  

  const submitLogin = (e) => {
    e.preventDefault();
    adminLoginSubmit({email, password})
    .then(res => {
      console.log(res.data)
        if(res.data.error){
          setisLoginError(true)
          setloginErrorMsg(res.data.error)
        }
        else{
          if(res.data.role === 0 || res.data.role === 1){
            setAdminDetails(res.data, () => {
              setisLoginSuccess(true)
      
            })
          }
      
    }

      
       
    })
    .catch(err => {
      console.log(err);
    })  
  }

  return (
    <main>
      {redirectToHome()}
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {redirectToDashboardIfLoggedIn()}
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                {loginError()}
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control onChange={(e) => setemail(e.target.value)} autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control onChange={(e) => setpassword(e.target.value)} required type="password" placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick={submitLogin}>
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/SuperAdminDashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import { isAlreadyAutheticated, isAutheticated } from '../apis/auth/auth';







const HomePage = () => {

  
  
  const [userRole, setuserRole] = useState('');

  const getUserRole = () => {
    isAlreadyAutheticated().then(res => {
      console.log(res.data);
      if(res.data.status && res.data.role === 0){
        setuserRole('Super')
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getUserRole()
  }, [])
  

  const RouteWithLoader = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <Route {...rest} render={props => 
        userRole === 'Super' ?
        ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) : (
          <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
        ) } />
    );
  };
  
  const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    const localStorageIsSettingsVisible = () => {
      return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }
  
    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  
    const toggleSettings = () => {
      setShowSettings(!showSettings);
      localStorage.setItem('settingsVisible', !showSettings);
    }
  
    return (
      <Route {...rest} render={props => 
        userRole === 'Super' ?
    ( <> <Preloader show={loaded ? false : true} />  <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />
  
      <main className="content">
        <Navbar />
        <Component {...props} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </> </> ) : (
      <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }
      }}
    />
    ) } />
  
    );
  };

  
  const SuperAdminRoute = ({ component: Component, ...rest }) => {
    
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    const localStorageIsSettingsVisible = () => {
      return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }
  
    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  
    const toggleSettings = () => {
      setShowSettings(!showSettings);
      localStorage.setItem('settingsVisible', !showSettings);
    }
    console.log("Super Admin Status - ",isAutheticated())
    return(

    
    <Route {...rest} render={props => 
      
      isAutheticated() && isAutheticated().role === 0 ? (
      <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />
  
      <main className="content">
        <Navbar />

            <Component {...props}/>
    
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
      
    ): (
      <Redirect
      to='/login'
    />)}/>
  )
    }
  
  const AdminRoute = ({ component: Component, ...rest }) => {
    
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    const localStorageIsSettingsVisible = () => {
      return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }
  
    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  
    const toggleSettings = () => {
      setShowSettings(!showSettings);
      localStorage.setItem('settingsVisible', !showSettings);
    }
    return(

    
    <Route {...rest} render={props => 
      
      isAutheticated() && isAutheticated().role === 1 ? (
      <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />
  
      <main className="content">
        <Navbar />

            <Component {...props}/>
    
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
      
    ): (
      <Redirect
      to='/login'
    />)}/>
  )
    }


  return(
  <Switch>
    
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
    <Route exact path="/login" component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <Route exact path="/resetpassword" component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}

    // ** Super Admin Pages
    <SuperAdminRoute exact path='/superadmin' component={DashboardOverview} />
    <SuperAdminRoute exact path='/superadmin/upgrade'  component={Upgrade} />
    <SuperAdminRoute exact path='/superadmin/transaction' component={Transactions} />
    <SuperAdminRoute exact path='/superadmin/settings' component={Settings} />
    <SuperAdminRoute exact path='/superadmin/tables' component={BootstrapTables} />
    
    
    // ** Admin Pages
    <RouteWithSidebar exact path='/employee' component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    {/* // ** Test Pages
    <Route exact path='/' component={DashboardOverview} />
    <Route exact path={Routes.Upgrade.path} component={Upgrade} />
    <Route exact path={Routes.Transactions.path} component={Transactions} />
    <Route exact path={Routes.Settings.path} component={Settings} />
    <Route exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
 */}

    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
)};



export default HomePage;

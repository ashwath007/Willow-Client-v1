import React, {useState, useEffect,useHistory, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {getAllClients} from '../../../../../apis/Clients/manage';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Lottie from "lottie-react";
import FolderIcon from "../../../../../assets/Common/folder.svg";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

function CompaniesManage() {

    const [allClients, setallClients] = useState([]);
    const [isError, setisError] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);

    const getClientsHere = () => {
        getAllClients().then(res => {
            if(res.data.error){
                setisError(true)
            }
            else if(res.data.allClients){
                console.log("All Client data", res.data.allClients);
                setisSuccess(true)
                setallClients(res.data.allClients)
              }
        })
        .catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        getClientsHere();
    }, [])


    


    
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      const ClientFolder = ({name, data}) => {
          return(
              <Link to={`/superadmin/manage/companies/${data.client_id}`}  style={{
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


  return (

    <>
        <Grid container spacing={1} style={{marginTop:8}} item xs={6} md={8}>

   
        {allClients && allClients.map((item, index) => {
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
    </>

  )
}

export default CompaniesManage
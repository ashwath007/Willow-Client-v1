import React, {useState, useEffect,useHistory, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {getAllClients, getAllSisterCompamyAllPlans, getAllSisterCompamyList} from '../../../../../apis/Clients/manage';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Lottie from "lottie-react";
import FolderIcon from "../../../../../assets/Common/folder.png";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

function PlansManage({match}) {

    const [allClients, setallClients] = useState([]);
    const [isError, setisError] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);

    const getAllSisterCompamyListHere = () => {
        const data = {
            sisId: match.params.sister_id
        }
        getAllSisterCompamyAllPlans(data).then(res => {
            if(res.data.error){
                setisError(true)
            }
            else if(res.data.sisterPlans){
                console.log("All Plans data", res.data.sisterPlans);
                setisSuccess(true)
                setallClients(res.data.sisterPlans)
              }
        })
        .catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        getAllSisterCompamyListHere();
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
              <Link to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/sis/${data._id}`}  style={{
                  height: 80,
                  width:120,
                  borderRadius: 8,
                  marginBottom:8,
                  marginLeft:4,

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
            
        {allClients.plans && allClients.plans.map((item, index) => {
            return(
                <Grid item>
                    <Item style={{
                        height:120,
                        width:160,
                        alignItems: 'center',
                    }}>
                        <ClientFolder name={item} data={item}/>
                    </Item>
                </Grid>
            )
        })}
  </Grid>
    </>

  )
}

export default PlansManage;
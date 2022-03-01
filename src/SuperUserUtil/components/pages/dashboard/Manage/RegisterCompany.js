import React, { useEffect, useState} from 'react'
import { getAClients } from '../../../../../apis/Clients/manage';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

function RegisterCompany({match}) {

  const [aCompany, setaCompany] = useState([]);

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
  }, [])
  

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
        <div style={{
            height:150,
            width:'100%',
            backgroundColor:'#ffffff'
        }}>

        </div>
        </div>
       
    </div>
  )
}

export default RegisterCompany
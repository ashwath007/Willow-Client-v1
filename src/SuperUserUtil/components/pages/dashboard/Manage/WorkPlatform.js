import React,{useEffect,useState} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './react-contextmenu.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Col, Row, Card, Form, Container, InputGroup } from '@themesberg/react-bootstrap';
import Button from '@mui/material/Button';
import { createFolderNow, getAllFolderDetails } from '../../../../../apis/SuperAdmins/folder';
import Alert from '@mui/material/Alert';
import {Link} from 'react-router-dom';
import FolderIcon from "../../../../../assets/Common/folder.png";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
  


function WorkPlatform({match}) {


    const [item, setitem] = useState('')

    const parent_folder = match.params.sister_id;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const handleClick = (e, data) => {
        setitem(data)
        console.log(' -> ->  ',data.action)
        if(data.action === 'Folder'){
            handleOpen();
            console.log('Here Here ...');
            setfileorfolder('Folder')
        }
        else if(data.action === 'Notes'){
            setfileorfolder('Notes')

        }
        else if(data.action === 'Alert'){
            setfileorfolder('Alert')
            
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const [folderName, setfolderName] = useState('');
    const [folderPrivacy, setfolderPrivacy] = useState('');
    const [fileorfolder, setfileorfolder] = useState('');
    const [filefolder_url, setfilefolder_url] = useState('url');

    const [isError, setisError] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);

    const [allFlderMain, setallFlderMain] = useState([]);

   const getAllFolderData = () => {
        const data = {
            sisId: match.params.sister_id
        }
        getAllFolderDetails(data).then(res => {
            if(res.data.error){
                setisError(true)
            }
            else if(res.data.allFolder){
                console.log("All Folder data", res.data.allFolder);
                setallFlderMain(res.data.allFolder)
              }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
      
        getAllFolderData()
     
    }, [isSuccess])
    

    const isErrorShow = () => {
        if(isError){
            return(
            <Alert severity="error">Error Folder Creation</Alert>
            )
        }
    }

    const isSuccessShow = () => {
        if(isSuccess){
            return(
                <Alert severity="success">Folder Creation Successful</Alert>
            )
        }
    }

    useEffect(() => {
        if(isSuccess){
            setTimeout(() => {
                setisSuccess(false)
            }, 3000);
        }
        
        else if(isError){
            setTimeout(() => {
                setisError(false)
            }, 3000);
        }
       
    }, [isSuccess,isError])
    



    const createFolderHandler = (e) => {
        e.preventDefault();
        const data = {
            folderName,
            folderPrivacy,
            fileorfolder,
            filefolder_url,
            folderparent:parent_folder
        }
        createFolderNow(data).then(res => {
            if(res.error){
                setisError(true)
                handleClose()

            }
            setisSuccess(true)
            handleClose()
        })
        .catch(err => {
            console.log(err);
        })
    }


    const ClientFolder = ({name, data}) => {
        console.log("Name -> ",name);
        return(
            <Link to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/workplatforrm/sis/${match.params.sister_id}`}  style={{
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
    <div>
        {isErrorShow()}
        {isSuccessShow()}
        <h3
        style={{
            fontWeight:'700',
            marginTop:15,

        }}
        >
            Work-Place
        </h3>

        <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Folder
          </Typography>
          <Form>
    <Form.Group className="mb-3 mt-4">
        <Form.Label>Sister company / Division Name</Form.Label>
        <Form.Control  onChange={(e) => setfolderName(e.target.value)} type="text" placeholder="Name of the folder name" />
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label>Select Folder Privacy</Form.Label>
    <Form.Select onChange={(e) => setfolderPrivacy(e.target.value)} >
      <option  value="Public" defaultValue>Public</option>
      <option value="Private
      
      q2" >Private</option>
    </Form.Select>
  </Form.Group>
  <Button onClick={createFolderHandler} variant="contained" disableElevation>
            Create
</Button>
        </Form>
        </Box>
      </Modal>
        </div>


<ContextMenuTrigger id="same_unique_identifier">
        <div className="well" style={{
            width:'100%',
            height:600,
            backgroundColor:'#00003B',
            borderRadius:12,
            alignSelf:'center',
            borderWidth:5,
            border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>

<>
        <Grid container spacing={1} style={{marginTop:8,margin:10}} item xs={6} md={8}>

        {allFlderMain && allFlderMain.map((item, index) => {
            return(
                <Grid item>
                    <Item style={{
                        height:120,
                        width:160,
                        alignItems: 'center',
                    }}>
                        <ClientFolder name={item.name} data={item}/>
                    </Item>
                </Grid>
            )
        })}
  </Grid>
    </>

        </div>
      </ContextMenuTrigger>

      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{action: 'Folder'}} onClick={handleClick}>
          Create Folder
        </MenuItem>
        <MenuItem data={{action: 'Notes'}} onClick={handleClick}>
          Create Notes
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{action: 'Alert'}} onClick={handleClick}>
          Notes
        </MenuItem>
      </ContextMenu>

    </div>
  )
}

export default WorkPlatform
import React,{useEffect,useState,useCallback} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './react-contextmenu.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Col, Row, Card, Form, Container, InputGroup } from '@themesberg/react-bootstrap';
import Button from '@mui/material/Button';
import { createFileNow, createFolderNow, getAllFolderDetails } from '../../../../../apis/SuperAdmins/folder';
import Alert from '@mui/material/Alert';
import {Link} from 'react-router-dom';
import FolderIcon from "../../../../../assets/Common/folder.png";
import FolderIconExcel from "../../../../../assets/Common/xls.png";
import FolderIconPdf from "../../../../../assets/Common/pdf.png";
import FolderIconWord from "../../../../../assets/Common/word.png";
import FolderIconGDocs from "../../../../../assets/Common/google-docs.png";
import FolderIconImage from "../../../../../assets/Common/image.png";
import FolderPPT from "../../../../../assets/Common/ppt.png"
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone'
import firebase from 'firebase/app'
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@mui/material/LinearProgress';
import FileViewer from 'react-file-viewer';
import PhotoPhotoListfrom from '@mui/icons-material/List';
import {
    Menu,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import IconButton from '@mui/material/IconButton';

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
  
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

function WorkPlatform({match}) {


    const [item, setitem] = useState('')



    // ** File drop zone


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // **









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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const [folderName, setfolderName] = useState('');
    const [folderPrivacy, setfolderPrivacy] = useState('Public');
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
            <>
  
            <Link file={data.filefolder_url} type={data.fileType} to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/workplatforrm/sis/${match.params.sister_id}/inner/folder/${data._id}`}  style={{
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
            <Menu menuButton={
            <Button style={{
                marginLeft:100,
                height:10,
            }} aria-label="add an alarm">
                ⚙️
          </Button>} transition>
            <MenuItem>Work Lock</MenuItem>
            <MenuItem>Work Unlock</MenuItem>
            <MenuItem>Clear</MenuItem>
        </Menu>
                </>
        )
    }


  


    const ClientFile = ({name, data}) => {
        console.log("Name -> ",name);
        if(data.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        return(
            <Link to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/workplatforrm/sis/${match.params.sister_id}/inner/showfile/${data._id}/type/${'xlsx'}`}  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,

            }}>
                
                <img src={FolderIconExcel} height={50}/>
                <p style={{ 

                }}>
                    {name}
                    </p>
                
            </Link>
        )
        if(data.fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
        return(
            <Link  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,

            }}>
                
                <img src={FolderPPT} height={50}/>
                <p style={{ 

                }}>
                    {name}
                    </p>
                
            </Link>
        )
        else if(data.fileType === 'application/pdf')
        return(
            <Link to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/workplatforrm/sis/${match.params.sister_id}/inner/showfile/${data._id}/type/${'pdf'}`}  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,

            }}>
                
                <img src={FolderIconPdf} height={50}/>
                <p style={{ 

                }}>
                    {name}
                    </p>
                
            </Link>)
        else if(data.fileType === 'image/png')
        return(
            <Link to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/workplatforrm/sis/${match.params.sister_id}/inner/showfile/${data._id}/type/${'png'}`}  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,

            }}>
                
                <img src={FolderIconImage} height={50}/>
                <p style={{ 

                }}>
                    {name}
                    </p>
                
            </Link>
        )
        else if(data.fileType === 'application/msword' || data.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        return(
            <Link to={`/superadmin/manage/companies/${match.params.id}/company/${match.params.company_id}/workplatforrm/sis/${match.params.sister_id}/inner/showfile/${data._id}/type/${'docx'}`}  style={{
                height: 80,
                width:120,
                borderRadius: 8,
                marginBottom:8,
                marginLeft:4,

            }}>
                
                <img src={FolderIconWord} height={50}/>
                <p style={{ 

                }}>
                    {name}
                    </p>
                
            </Link>
        )
    }

    const [isProgress, setisProgress] = useState(false)
    const [progressStatus, setprogressStatus] = useState(0)
    const [fileUploadURL, setfileUploadURL] = useState('')

    const spinnerShow = () => {
        return(
            <Box sx={{ width: '100%' }} style={{
                marginTop:35,
                marginBottom:35
            }}>
            <LinearProgressWithLabel value={progressStatus} />
          </Box>
        )
    }


    const autoUploadFile = (acceptedFiles) => {
        console.log('acceptedFiles: ',acceptedFiles)
        let file = acceptedFiles[0];
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child(`product/image/${uuidv4()}/${file.name}`).put(file);
      
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>{
            var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
            setprogressStatus(progress)
            setisProgress(true)
          },(error) =>{
            throw error
          },() =>{
            // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
      
            uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                setfileUploadURL(url)
                const data = {
                    folderName:acceptedFiles[0].name,
                    filefolder_url:url,
                    folderparent:parent_folder,
                    fileType:acceptedFiles[0].type
                }
                createFileNow(data).then(res => {
                    if(res.error){
                        setisError(true)
        
                    }
                    setisSuccess(true)
                    setisProgress(false)
                })
                .catch(err => {
                    console.log(err);
                })
                
            })
      
         }
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
      <option value="Public" defaultValue>Public</option>
      <option value="Private" >Private</option>
    </Form.Select>
  </Form.Group>
  <Button onClick={createFolderHandler} variant="contained" disableElevation>
            Create
</Button>
        </Form>
        </Box>
      </Modal>
        </div>
      
            {!isProgress ?  (
   <Dropzone onDrop={acceptedFiles => autoUploadFile(acceptedFiles)} >
   {({getRootProps, getInputProps}) => (
     <section>
       <div {...getRootProps()}>
         <input {...getInputProps()} />
         <div
         style={{
             width:'100%',
             height:200,
             backgroundColor:'#DDDDDD',
             borderRadius:12,
             alignSelf:'center',
             borderWidth:5,
             marginBottom:15,
             textAlign:'center',
         }}
         >
             <p>
                 Drop the file here
             </p>
         </div>
 
       </div>
     </section>
   )}
 </Dropzone>
            ) : (
                <div
                style={{
                    alignSelf:'center',
                    justifyContent:'center'
                }} >
                {spinnerShow()}
                </div>
            )

            }

         
 

<ContextMenuTrigger id="same_unique_identifier">
        <div className="well" style={{
            width:'100%',
            height:600,
            backgroundColor:'#C1C1C1',
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
                        {item.fileorfolder === 'Folder' ? (
                        <ClientFolder name={item.name} data={item}/>

                        ) : (
                         <ClientFile name={item.name} data={item}/>
                        )
                        }
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
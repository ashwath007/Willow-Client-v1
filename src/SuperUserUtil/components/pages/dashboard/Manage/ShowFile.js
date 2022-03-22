import React, {useEffect, useState} from 'react'
import FileViewer from 'react-file-viewer';
import { getAFile } from '../../../../../apis/SuperAdmins/folder';
function ShowFile({match}) {

    const [file, setfile] = useState('');
    const [type, settype] = useState('');

    useEffect(() => {
        getAFile(match.params.fileID).then(res => {
            console.log(res);
            setfile(res.data.file.filefolder_url);
            settype('xlsx');
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    

  return (
    <div>ShowFile
        {console.log("File and Folders - ",match.params.fileID)}
        {file && type ? (
     <FileViewer
            fileType={type}
            filePath={file}
            /> 
        ) : (
            <p>
                Loading...
            </p>
        )

        }
       
    </div>
  )
}

export default ShowFile
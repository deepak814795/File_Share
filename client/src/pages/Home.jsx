import React from 'react'
import { useRef, useEffect, useState } from 'react';
import '../App.css';
import { getSignedUrl , uploadFile} from '../services/api';


 
const Home = () => {
   
  const [url,setUrl] = useState('');
  const [file, setFile]= useState('');

  const fileInputRef = useRef();

  useEffect(()=>{
    const getData = async ()=>{
        const response = await getSignedUrl();
        setUrl(response.url);
    }
    getData();
 }, [])

 useEffect(()=>{
  const getData = async ()=>{
       await uploadFile(url, file);
       setUrl(prevUrl => prevUrl.split('?')[0]);
  }
  file && getData();
}, [file, url])

  return (
    <div className='container'>
        <h1>Filebin</h1>
        <p>Convenient file sharing in three steps without registration.</p>
        <p>
            <span>1</span>
            <input 
                type="file"
                ref={fileInputRef}
                style={{display : 'none'}}
                onChange={(e)=>setFile(e.target.files[0])}
            />
            <button onClick={()=> fileInputRef.current.click()}>Select files to upload</button>&nbsp;
        
        or drag and drop files into this browser window.
        </p>
        <p><span>2</span>Wait until file upload completes.</p>
        <p><span>3</span>The files will be available at{' '}{url && (<a href={url.split('?')[0]}>{url.split('?')[0]}</a>)}&nbsp; which is a link you can share.</p>

        <p className='info'>The file uploads will cancel if you move away from this page before they complete. Uploaded files can be deleted manually at any time and will in any case be deleted automatically 6 days from now.</p>

        {file && <img src={url} alt="pics" />}
    </div>
  )
}

export default Home
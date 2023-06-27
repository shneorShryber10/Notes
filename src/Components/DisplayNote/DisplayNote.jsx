import React from "react";
import { useContext,useState } from "react";
import "./DisplayNote.css";
import { AiOutlineMenu } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { TiDeleteOutline} from "react-icons/ti";
import { IoMdReturnRight} from "react-icons/io";
import { LiaThumbtackSolid} from "react-icons/lia";
import { BsFillTrashFill} from "react-icons/bs";
import { FaUnderline } from "react-icons/fa";
import { UserContext } from "../Home/Home";
import { useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function DisplayNote({ singelCardData,toDelete,setSelectedOption}) {
  const [showMenu, setShowMenu] = useState(0);
  const today = new Date().toLocaleDateString();

  const {notes,setNotes } = useContext(UserContext);

  const [toEdit,setToEdit] =useState(false);
  const [imageToPresent,setImageToPresent] = useState()
  const [newText, setNewText] = useState("");
  const [newIsUnderline, setNewIsUnderline] = useState(false);
  const [newTextFormat, setNewTextFormat] = useState('');
  const [newFontSize, setNewFontSize] = useState(16);


  const handleButtonClick = () => {
    NotificationManager.info('Must type text to note', 'Info');
  };
  useEffect(()=>{
    setImageToPresent(singelCardData.image)
  },[])

  const handleTextChange = (event) => {
    setNewText(event.target.value);
  };  
  const handleTextFormatChange = (event) => {
    setNewTextFormat(event.target.value);
  };
  const handleTextFontSizeChange = (event) => {
    
    setNewFontSize(Number(event.target.value));
  };

  function handleUpdateNote(singelCardData){

   
    const storedData = localStorage.getItem('myNoteData');
    let dataArray = [];

    
    if (storedData) {
      try {
        dataArray = JSON.parse(storedData);
        if (!Array.isArray(dataArray)) {
          dataArray = [];
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        dataArray = [];
      }
    }
    else{
        console.log("what?");
    }
    
    if(newText=="")
    {
      handleButtonClick()
    }
    else{ 
      dataArray[singelCardData.id-1].image=imageToPresent;
      dataArray[singelCardData.id-1].textToAdd=newText;
      dataArray[singelCardData.id-1].toUnderline = newIsUnderline;
      console.log(newTextFormat);
      dataArray[singelCardData.id-1].textFormat = newTextFormat;
      dataArray[singelCardData.id-1].fontSize = newFontSize;
    }
    
    setNotes(dataArray)
  
    
    localStorage.setItem('myNoteData', JSON.stringify(dataArray));
    // localStorage.clear()
  
  
  };


const handleImageDrop = (event,id) => {

  event.preventDefault();
    
  // Get the URL of the dropped image
  const imageUrl = event.dataTransfer.getData('text/uri-list');
  
  setImageToPresent(imageUrl)




};

const handleDragOver = (event) => {
  event.preventDefault();
};

function UpdateForDeletion(id){
        
  const storedData = localStorage.getItem('myNoteData');
  let dataArray = [];
  
  if (storedData) {
    try {
      dataArray = JSON.parse(storedData);
      if (!Array.isArray(dataArray)) {
        dataArray = [];
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
      dataArray = [];
    }
  }
  else{
      console.log("what?");
  }

  const deletedObject = dataArray[id]; 
  console.log(deletedObject);

  dataArray.splice(id-1, 1);

  dataArray.forEach((obj, index) => {
    obj.id = index + 1; // Assuming 'id' starts from 1
  });

  setNotes(dataArray)

  
  localStorage.setItem('myNoteData', JSON.stringify(dataArray));
  } 

if(!toEdit)
{
  return (
    <div className="container">
      <div className="displayNote" style={{background: singelCardData.currColor}}>
        <div className="headers-note" style={{ display: "flex", width: "100%",display: "flex", 
            justifyContent:'space-evenly', width: "100%",listStyle: "none"}} >
          
          
                  <BsFillTrashFill style={{marginTop:4}} size={27} onClick={()=>[UpdateForDeletion(singelCardData.id),setSelectedOption("null")]}  />
              <BiEditAlt style={{cursor:'pointer'}} size={30} onClick={()=>setToEdit(!toEdit)}/>
                  <IoMdReturnRight style={{cursor:'pointer'}} size={30} onClick={()=>setSelectedOption("null")}/>
                  {singelCardData.currEmoji}
        </div>
            <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:15}}>
                  <text style={{ color: "#333333", fontSize: 20 }}> {today.split('.').join('/')} </text>
            </div>
        <div className="body-of-note"  >
        {imageToPresent 
         ? (
    <div className="display-note-img">
      <img src={imageToPresent} style={{ height: 50, width: 200 }} />
    </div>
  ) : null}
          <div className="display-note-text">
            <text style={{fontSize: singelCardData.fontSize , fontStyle:singelCardData.textFormat,
          color:singelCardData.currTextColor,fontWeight: singelCardData.textFormat ? "bold" : "normal",
           textDecoration : singelCardData.toUnderline  ? "underline" : "none"}}>
               {singelCardData.textToAdd}</text>
          </div>
        </div>

      </div>
    </div>
  );
}
return(
  <div className="edit-container">
    <NotificationContainer />
  <div className="edit-displayNote" style={{background: singelCardData.currColor}}>
    <div className="edit-headers-note" style={{ display: "flex", width: "100%",display: "flex", 
        justifyContent:'space-evenly', width: "100%",listStyle: "none"}} >
      
          <text style={{ color: "#333333", fontSize: 20,fontWeight: "bold" }}>
          Edit
          </text>
          <BiEditAlt style={{cursor:'pointer'}} size={30} onClick={()=>setToEdit(!toEdit)}/>
          <IoMdReturnRight style={{cursor:'pointer'}} size={30} onClick={()=>setSelectedOption("null")}/>
                  {singelCardData.currEmoji}
         
  
    </div>
    {
    !singelCardData.image ?
      <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:15}}>
          <text style={{ color: "#333333", fontSize: 20 }}> {today.split('.').join('/')} </text>
    </div>
    :
    null
    }
    <div className="edit-body-of-note"  >
    {singelCardData.image 
     ? (
<div className="edit-display-note-img"
 onDrop={(event) => handleImageDrop(event,singelCardData.id)}
 onDragOver={(event) => handleDragOver(event)}>
  <img src={singelCardData.image} style={{ height: 47, width: 200 }} />
  <text style={{ color: "#333333",border: "2px dashed #111", }}>Drag and drop an image here</text>
</div>
) : null}
      <div className="edit-display-note-text">

       
      
             <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <p style={{marginRight:5}}>Entered Text:</p>
                
                   <textarea
                   className="placeholder-text"
          onChange={handleTextChange}
            style={{ width: "200px", height: "40px", marginTop: 0,marginLeft:0, '::placeholder': {
              color: 'red',
              fontStyle: 'italic',
            },}}
            placeholder={"Enter New Text :"}
          />
            </div>
            <div  style={{width:'100%',alignItems:'center',display:'flex',justifyContent:'center'}}>
            
          <input
          style={{fontSize:17}}
          type="number"
          min={10}   // Minimum value allowed
        max={70}
          value={newFontSize}
          onChange={handleTextFontSizeChange}
        />
            <select id="textFormat" style={{fontSize:17}}  value={newTextFormat}  onChange={handleTextFormatChange} >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
        </select>
                <FaUnderline className="edit-box-underline" style={{color:!newIsUnderline ? "black" : "#888"}} color="white" size={35}  onClick={()=>setNewIsUnderline(!newIsUnderline)} />
            </div>
    
          
      </div>

      <div className="button-to-update">
            <button className="button" onClick={()=>[handleUpdateNote(singelCardData),setSelectedOption("null")]}>Update</button>
      </div>
    </div>

  </div>
</div>

)
}

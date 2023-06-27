import React from 'react'
import "./Note.css"
import { BsCalculatorFill} from "react-icons/bs";
import { AiOutlineMenu} from "react-icons/ai";
import { TiDeleteOutline} from "react-icons/ti";
import { LiaThumbtackSolid} from "react-icons/lia";
import { useContext,useState } from 'react';
import { UserContext } from "../Home/Home";


export default function Notes({singelCardData,toDelete,id,setSelectedOption}) {

  const [showMenu,setShowMenu] = useState(false);
  const {notes,setNotes } = useContext(UserContext);
  const today = new Date().toLocaleDateString();

  
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



  return (

    <div className='notes' style={{background: singelCardData.currColor}} >
      
                  <div style={{position:'absolute', zIndex:10,marginLeft:142}}>
                  {singelCardData.currEmoji}
              </div>
      {
        toDelete ? 
        <div style={{position:'absolute', zIndex:10}} onClick={()=>[UpdateForDeletion(id),setSelectedOption("null")]}  >
                  <TiDeleteOutline size={30}/>
                  </div>
          : <LiaThumbtackSolid size={30} />
          
      }
     
   
    
       <div className='note-header-list'>
      <text >{today.split('.').join('/')} </text>
      
       </div>
       <div className='body-text'>
       
       
          <text style={{fontSize: singelCardData.fontSize , fontStyle:singelCardData.textFormat,
          color:singelCardData.currTextColor,fontWeight: singelCardData.textFormat ? "bold" : "normal",
           textDecoration : singelCardData.toUnderline  ? "underline" : "none"}}>
               {singelCardData.textToAdd}</text>
       </div>   
              
       {singelCardData.image ? 
             <div className='img-note'>
              <img src={singelCardData.image} alt="" style={{ height: 50, width:100 }} />  
            </div>
              :null
            }
    
      </div>
  )
}

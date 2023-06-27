import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useState } from "react";
import { UserContext } from "../Home/Home";
import "./AddedNote.css";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUnderline } from "react-icons/fa";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';




export default function AddedNote({ singelCardData,setSelectedOption,randomNumber,setChooseColor,chooseColor,handleOtherButtonClick}) {


  const handleButtonClick = () => {
    NotificationManager.info('Must type text to note', 'Info');
  };

 
    const {notes,setNotes,colors } = useContext(UserContext);



    
  const [showMenu, setShowMenu] = useState(0);
  const [textToAdd, setTtextToAdd] = useState('');
  const [image, setImage] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [textFormat, setTextFormat] = useState('normal');
  const [toUnderline, setToUnderline] = useState(false);
  const [noteName, setNoteName] = useState(false);
  const [toBorderElement, setToBorderElement] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const[selectedTextColor,setSelectedTextColor] = useState();
  const today = new Date().toLocaleDateString();

  


  function handleAddNote(textToAdd,fontSize,textFormat,toUnderline,image,currColor,currTextColor,currEmoji){
    

    if(textToAdd =="")
    {
      
      handleButtonClick()
    }
    else{

     
        setSelectedOption("null");
      
      handleOtherButtonClick()
  
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
    
    let id = dataArray.length+1;

    const noteData = {
      id,
      textToAdd,
      fontSize,
      textFormat,
      toUnderline,
      image,
      currColor,
      currTextColor,
      currEmoji
      
    };
    
    dataArray.push(noteData);
    console.log(dataArray);

    setNotes(dataArray)
  
    
    localStorage.setItem('myNoteData', JSON.stringify(dataArray));
    
  
  }
  
  };


  


  const TextToAddChange = (event) => {
    setTtextToAdd(event.target.value);
    
  };
  const NameNote = (event) => {
    setNoteName(event.target.value);
    console.log(noteName);
    
  };

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
    
  };
  const handleTextFormatChange = (event) => {
    setTextFormat(event.target.value);
  };
  const handletUnderlineChange = () => {
    setToUnderline(!toUnderline);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
   
 
    event.preventDefault();
    
    const imageUrl = event.dataTransfer.getData('text/uri-list');
    
    setImage(imageUrl);
    console.log(imageUrl);

  };
 

  const textStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: textFormat === 'bold' ? 'bold' : 'normal',
    fontStyle: textFormat === 'italic' ? 'italic' : 'normal',
    textDecoration: toUnderline ? 'underline' : 'none',
    color: selectedTextColor ? selectedTextColor :'black'
  };

  const [selectedColor, setSelectedColor] = useState(false);

  const handleColorSelection = (color,index) => {
    setSelectedColorIndex(index);
    console.log(color);
    setSelectedColor(color);
  };
  const colorPalette = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

  const [selectedEmoticon, setSelectedEmoticon] = useState(null);

  const handleEmoticonSelect = (emoticon) => {
    setSelectedEmoticon(emoticon);
   
  };

  const emoticonOptions = [
    { label: 'Grinning Face', symbol: '😀' },
    { label: 'Smiling Face', symbol: '😊' },
    { label: 'Thumbs Up', symbol: '👍' },
    { label: 'Heart', symbol: '❤️' },
    { label: 'OK Hand', symbol: '👌' },
    { label: 'Fire', symbol: '🔥' },
    { label: 'Rolling on the Floor Laughing', symbol: '🤣' },
  ];

  return (
    <div className="container">
     
      <div className="add-body" style={{ display: "flex", height: "100%", width: "100%", justifyContent: "center", }} >

      <div className="selected-color" style={{  position: 'absolute', width: '200px', height: '200px',top:10,left:-95 }} >
      <section>
      <h3 style={{color:"white"}}>Select a Color</h3>
      <div className="color-palette" >
        {colors.map((color, index) => (
          <div
            key={index}

            style={{ height:25,width:120, backgroundColor: color.backgroundColor,cursor:'pointer',
            border: index === selectedColorIndex ? '2px solid white' : 'none'}}
            onClick={() => [handleColorSelection(color.backgroundColor,index)]}
          ></div>
        ))}
      </div>
    </section>
        </div>
        
      
      <div className="add-note"  style={{ backgroundColor: selectedColor ? selectedColor : colors[randomNumber].backgroundColor }}>
       
        <NotificationContainer />
           
            
                <div className="main-header-add">
                <text style={{ color: "#333333", fontSize: 20, fontWeight: "bold" }}>{today.split('.').join('/')} </text>
                <text className="add-text" >Add a Note </text>
                {selectedEmoticon}
                </div>
            
      
          <div  className="Dragging-image" style={{   display: "flex" ,justifyContent: "center", alignItems: "center",}} >
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #111",
                padding: "0px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                width: "90%",
                height: "20%",
                marginTop:20
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  style={{ height: 50, width:200 }}
                />
              ) : (
                <div>

                <p style={{ color: "#333333" }}>Drag and drop an image here</p>
              </div>
              )}
            </div>
          </div>
          <textarea
          value={textToAdd}
          onChange={TextToAddChange}
            style={{ ...textStyle,width: "95%", height: "26%", marginTop: 10,marginLeft:4}}
            placeholder="Write your note here..."
          />
        </div>
        <div className="Text-formatting">
          <div className="choose-font">
              <text style={{color:'white',fontSize:24,fontWeight:'bold'}}>Choose a font:</text>
          <input
          style={{fontSize:17}}
          type="number"
          min={10}   // Minimum value allowed
        max={70}
          value={fontSize}
          onChange={handleFontSizeChange}
        />
          </div>
          <div className="choose-textFormat-color">
        <label htmlFor="textFormat" style={{color:'white',marginLeft:22,fontSize:22,fontWeight:'bold'}}>Text Format: </label>
        <select id="textFormat" style={{fontSize:17}} value={textFormat} onChange={handleTextFormatChange}>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
          
        </select>
      </div>
          <div className="choose-textFormat-color">
        <label htmlFor="textFormat" style={{color:'white',marginLeft:22,fontSize:22,fontWeight:'bold'}}>Text Format: </label>
        <input type="color" onChange={(e)=>setSelectedTextColor(e.target.value)} />
      </div>

      <div style={{display:'flex',justifyContent:'space-evenly'}}>

      <div className="underline"  >
        <div className="box-underline">
                <FaUnderline color="white" size={35} onClick={handletUnderlineChange}/>
        </div>
      </div>
      <div className="imoji">
      {emoticonOptions.map((option) => (
        <span
          key={option.label}
          role="img"
          aria-label={option.label}
          onClick={() => handleEmoticonSelect(option.symbol)}
          style={{ cursor: 'pointer', marginRight: '10px', fontSize: '24px' }}
        >
            {option.symbol}
          
        </span>
      ))}
      <div>
        <text style={{color:'white'}}>Selected Emoticon:</text> {selectedEmoticon}
      </div>
    </div>
       



      </div>



      <div>
      
    </div>
        <div className="to-add-button" >
        <button  style={{
        backgroundColor: '#cccc',
        color: 'black',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        
      }}
      onClick={()=>handleAddNote(textToAdd,fontSize,textFormat,toUnderline,image,
      selectedColor || colors[randomNumber].backgroundColor,selectedTextColor,selectedEmoticon)}   >Add Note</button>
        </div>

        </div>
      </div>
    </div>
  );
}

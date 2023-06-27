import React from 'react'
import { createContext, useContext , useState,useEffect } from 'react'
import DisplayNote from '../DisplayNote/DisplayNote';
import Notes from '../Notes/Notes'
import "./Home.css"
import About from "../About/About"
import AOS from "aos";
import "aos/dist/aos.css";
import AddedNote from '../AddedNote/AddedNote';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const UserContext = createContext();

export default function Home() {

const [notes,setNotes]= useState([]);
const [displayNote,setDisplayNote] = useState(false);
const [noteNumber,setNoteNumber] = useState(0);
const [selectedOption, setSelectedOption] = useState('');
const [toDelete,setToDelete] = useState(false);
const [inputVal,setInputVal]=useState('');
const [searchByName,setSearchByName]=useState(false);
const [chooseColor,setChooseColor] = useState(false);
const [showFirstHeader,setShowFirstHeader] = useState(true);
const [showAbout,setShowAbout] = useState(false);

useEffect(()=>{


  if(  notes?.length > 0 )
  {
    setShowFirstHeader(false)
  }

},[])

useEffect(() => {
  AOS.init();
}, []);

useEffect(() => {
  const storedData = localStorage.getItem('myNoteData');
  
  setNotes(JSON.parse(storedData)); // Update the variable with the stored data
  
}, []);

const handleOtherButtonClick = () => {
  NotificationManager.success('Success message', 'Success');
  
};


const colors = [
  {
    backgroundColor: 'hsl(33.67deg 84.48% 77.25%)',
    transition: 'background-color 300ms',
  },
  {
    backgroundColor: 'hsl(211.58deg 73.08% 89.8%)',
    transition: 'background-color 300ms',
  },
  {
    backgroundColor: 'hsl(251.71deg 80.39% 90%)',
    transition: 'background-color 300ms',
  },
  {
    backgroundColor: 'hsl(339.47deg 57.58% 87.06%)',
    transition: 'background-color 300ms',
  },
  {
    backgroundColor: 'hsl(73.68deg 44.19% 74.71%)',
    transition: 'background-color 300ms',
  },
  {
    backgroundColor: 'hsl(44.25deg 80% 80.39%)',
    transition: 'background-color 300ms',
  },
];

const [randomNumber, setRandomNumber] = useState(getRandomNumber());

function getRandomNumber() {
  return Math.floor(Math.random() * 5);
}



const handleOptionChange = (option) => {
  setSelectedOption(option);
};
const AddNote = ()=> {
 
  setShowFirstHeader(false)
  setRandomNumber(getRandomNumber());
  setSearchByName(false)
  setToDelete(false)
   handleOptionChange('add')
}
const handleDeleteNote = ()=> {
  setSearchByName(false)
   handleOptionChange('Delete')
   setToDelete(true)
  }
  
  const handleNoteClick = (value) => {
    
    handleOptionChange('Choice')
  
  setDisplayNote(!displayNote)
  setNoteNumber(value)

};

function SortByColor(){
  
 
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
  
  dataArray.sort((a, b) => a.currColor.localeCompare(b.currColor))

  setNotes(dataArray)

  
  localStorage.setItem('myNoteData', JSON.stringify(dataArray));



}


 let finelSelection = notes?.filter((e) => {
  const lowerCaseTextToAdd = e.textToAdd && e.textToAdd.toLowerCase();
  const lowerCaseInputVal = inputVal.toLowerCase();
  return lowerCaseTextToAdd && lowerCaseTextToAdd.startsWith(lowerCaseInputVal);
});









  return (
    <UserContext.Provider value={{notes,setNotes,colors}}>

   
    <div className='home' style={{}}>

    <NotificationContainer />

        
          {
            showAbout ?
            <div className='all-About'>
                  <About/>
            </div>
            :null
          }

        {
            showFirstHeader && notes?.length == 0  ?

          <div class="rocket-title">
    
        <text className='text-titel'><h1>Welcome to NoteHub</h1></text>
        <text className='text-titel'><h2>Your Personal Digital Notebook</h2> </text>
        </div>

        : null
      }

    

        <div className='left-menu'>
          <div className='text-manu-header'>
          
          {
            searchByName ? 
            <div className="search" style={{display:'flex',flexDirection:'column'}}>
              <label htmlFor="" style={{color:'white',fontWeight:'300'}}>search by name: </label>
              <input type="text" onChange={(e) => [setInputVal(e.target.value),setSelectedOption("null") ]}/>
            </div>
            : <div style={{height:45}}></div>

          }
</div>


       
       
  <div className='shape' style={{ display: 'flex', marginTop: 18 }} onClick={()=> [setSelectedOption("null"),setSearchByName(false),setToDelete(false),setShowAbout(false)]}  >
    <div
      className=""
      style={{ background: 'rgb(255, 165, 0)', width: 100, height: 30,   }}
    >
      <span
      className="text"
      style={{
        position: 'absolute',
        top: 76,
        left: 50,
        transform: 'translate(-50%, -50%)',
        fontWeight:'bold',
        
      color:'black'
      }}
    >
      All Notes
    </span>

      <div
        className=""
        style={{ background: 'rgb(255, 192, 0)', width: 50, height: 30 /* ,borderTopRightRadius:50 */ }}
      ></div>
    </div>
    <div className="triangle" style={{ borderLeft: '30px solid rgb(255, 165, 0)' }}></div>
  </div>
  
  <div className='shape' style={{ display: 'flex', marginTop: 8 }} onClick={()=> [handleDeleteNote(),setShowAbout(false)]} >
  <div
    className=""
    style={{ background: 'rgb(255, 255, 128)', width: 100, height: 30 /* ,borderTopRightRadius:50 */ }}
  >
    <span
      className="text"
      style={{
        position: 'absolute',
        top: 114,
        left: 50,
        transform: 'translate(-50%, -50%)',
        fontWeight:'bold',
      color:'black'
      }}
    >
      Delete Note
    </span>
    <div className="" style={{ background: 'rgb(255, 240, 128)', width: 50, height: 30 /* ,borderTopRightRadius:50 */ }}></div>
   
  </div>
  <div className="triangle" style={{ borderLeft: '30px solid rgb(255, 255, 128)' }}></div>
</div>

   <div className='shape' style={{display:'flex' ,marginTop:8}} onClick={()=>[AddNote(),setShowAbout(false)]}>

         <div class="" style={{ background:'rgb(154,214,161)',width:100,height:30/* ,borderTopRightRadius:50 */ }}>

         <span
      className="text"
      style={{
        position: 'absolute',
        top: 152,
        left: 50,
        transform: 'translate(-50%, -50%)',
        fontWeight:'bold',
      color:'black'
      }}
    >
      Add Note
    </span>
      
         <div class="" style={{ background:'rgb(202,232,205)',width:50,height:30/* ,borderTopRightRadius:50 */ }}>
          
          </div>
        </div>
        <div className="triangle" style={{ borderLeft: '30px solid rgb(154,214,161)' }}></div>

   </div>

     
        
  <div className='shape' style={{ display: 'flex', marginTop: 8 }} onClick={()=> [setSearchByName(true),setSelectedOption("null"),setShowAbout(false)]}>
    <div className="" style={{ background: 'rgb(30, 144, 255)', width: 100, height: 30 }}>
    <span
      className="text"
      style={{
        position: 'absolute',
        top: 190,
        left: 50,
        transform: 'translate(-50%, -50%)',
        // fontSize:22,
        fontWeight:'bold',
      color:'black',
      
      
      }}
    >
      Search
    </span>
    
      <div className="" style={{ background: 'rgb(135, 206, 250)', width: 50, height: 30 }}></div>
    </div>
    <div className="triangle" style={{ borderLeft: '30px solid rgb(30, 144, 255)' }}></div>
  </div>

  <div className='shape' style={{display:'flex' ,marginTop: 8}} onClick={()=>[SortByColor(),setShowAbout(false)]} >

<div class="" style={{ background:'#772fc0',width:100,height:30/* ,borderTopRightRadius:50 */ }}>
<span
      className="text"
      style={{
        position: 'absolute',
        top: 228,
        left: 50,
        transform: 'translate(-50%, -50%)',
        fontWeight:'bold',
      color:'black'
      }}
    >
      Sort By Color
    </span>

<div class="" style={{ background:'#cab3e1',width:50,height:30 }}>
 
 </div>
</div>
<div className="triangle" style={{ borderLeft: '30px solid #772fc0' }}></div>
 </div>
  <div className='shape' style={{ display: 'flex', marginTop: 8 }} onClick={()=>[setShowAbout(true),setShowFirstHeader(false),setSelectedOption("null"),
  setSearchByName(false),setToDelete(false)]}>
    <div
      className=""
      style={{ background: '#800080', width: 100, height: 30 }}
    >
      <span
      className="text"
      style={{
        position: 'absolute',
        top: 266,
        left: 50,
        transform: 'translate(-50%, -50%)',
        fontWeight:'bold',
      color:'black'
      }}
    >
      About
    </span>
      <div className="" style={{ background: '#A040A0', width: 50, height: 30  }}></div>
    </div>
    <div className="triangle" style={{ borderLeft: '30px solid #800080' }}></div>
  </div>
  
  
       


          




        </div>
        <div className='mid-page'>
          <div className='display-note'>
          {
    (() => {
      if (selectedOption === 'add') {
        return <AddedNote singelCardData={noteNumber + 2000}
         setSelectedOption={setSelectedOption} randomNumber={randomNumber} setChooseColor={setChooseColor}
          chooseColor={setChooseColor} handleOtherButtonClick={handleOtherButtonClick} />;
      } else if (selectedOption === 'Delete') {
        return null
      } else if(selectedOption === 'Choice'  && notes?.length > 0 ) {
        return <DisplayNote singelCardData={noteNumber} toDelete={toDelete} setSelectedOption={setSelectedOption}/>;
      }else{
        return null
      }
    })()
  }
          </div>
          <div className='all-notes-display' data-aos="fade-up"  >
        
          {
            finelSelection && (!showAbout) ?

            finelSelection.map((e, i) => {
              
              return ( 
                
                <div  className='the-notes'   onClick={() => [ handleNoteClick(e)]}>
                   <div className='black-note'>
                    </div>
              <Notes singelCardData={e} toDelete={toDelete} id={e.id} key={i} setSelectedOption={setSelectedOption}  /> 
                </div> 
               
  
              )
            })
            : 
            null
            
          }
          
          </div>

          
        </div>

     </div>
     </UserContext.Provider>
  )
}
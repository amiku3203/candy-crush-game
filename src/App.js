import React, { useEffect, useState } from "react";
import BlueCandy from "./images/blue-candy.png";
import YellowCandy from "./images/yellow-candy.png";
import GreenCandy from "./images/green-candy.png";
import RedCandy from "./images/red-candy.png";
import Blank from "./images/blank.png"
import PurpleCandy from "./images/purple-candy.png"
import OrangeCandy from "./images/orange-candy.png" 
import Scoreboard from "./components/ScoreBoard"
 const width= 8;

 const candyColor= [
 BlueCandy,
 GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy

 ]



const App=()=> {

   const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareisBeingDragged, setSquareisBeingDragged] = useState(null);
  const [squareBeingreplaced, setSquareBeingreplaced] = useState(null)
  const [maxScore, setMaxScore] = useState(() => {
    // Retrieve max score from localStorage on component mount
    const storedMaxScore = localStorage.getItem('maxScore');
    return storedMaxScore ? parseInt(storedMaxScore) : 0;
  });
  const [scoreDisplay, setScoreDisplay] = useState(0)
   const checkForColoumnOfThree= ()=>{
      for(let i=0; i<=47; i++){
         const coloumnOfthree= [i, i+width ,i+width*2];
         const decidedColour= currentColorArrangement[i];

         const isBlank= currentColorArrangement[i]===Blank;

         if(coloumnOfthree.every(square =>currentColorArrangement[square]===decidedColour && !isBlank)){
            setScoreDisplay((score)=>score+4)
             coloumnOfthree.forEach(square=>currentColorArrangement[square]=Blank)
          return true;
            }
      }
   }

   const checkForColoumnOfFour= ()=>{
    for(let i=0; i<=39; i++){
       const coloumnOfFour= [i, i+width ,i+width*2, i+width*3];
       const decidedColour= currentColorArrangement[i];
       
       const isBlank= currentColorArrangement[i]===Blank;
       if( coloumnOfFour.every(square =>currentColorArrangement[square]===decidedColour && !isBlank)){
        setScoreDisplay((score)=>score+4)
        coloumnOfFour.forEach(square=>currentColorArrangement[square]=Blank)
        return true
       }
    }
 }

 
 const checkForRowOfFour= ()=>{
   for(let i=0; i<64; i++){
      const rowOfFour= [i, i+1 ,i+2,i+3];
      const decidedColour= currentColorArrangement[i];
      const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      if(notValid.includes(i)) continue
      
      const isBlank= currentColorArrangement[i]===Blank;
      if(  rowOfFour.every(square =>currentColorArrangement[square]===decidedColour && !isBlank)){
        setScoreDisplay((score)=>score+4)
            rowOfFour.forEach(square=>currentColorArrangement[square]=Blank)
      return true
         }
   }
}


  
 const checkForRowOfThree= ()=>{
   for(let i=0; i<64; i++){
      const rowOfthree= [i, i+1 ,i+2];
      const decidedColour= currentColorArrangement[i];
      const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      if(notValid.includes(i)) continue
      
      const isBlank= currentColorArrangement[i]===Blank;
      if( rowOfthree.every(square =>currentColorArrangement[square]===decidedColour && !isBlank)){
        setScoreDisplay((score)=>score+4)
           rowOfthree.forEach(square=>currentColorArrangement[square]=Blank)
       return true;
         }
   }
}



const moveIntoSquareBelow=()=>{
     for(let i=0; i<=55; i++){
      const firstRow=[0,1,2,3,4,5,6,7]
     const isFirstRow= firstRow.includes(i);
      if(isFirstRow && currentColorArrangement[i]==Blank){
      let randomNumber=  Math.floor(Math.random()*candyColor.length)

      currentColorArrangement[i]=candyColor[randomNumber]
      }
       if((currentColorArrangement[i+width])===Blank){
         currentColorArrangement[i+width]=currentColorArrangement[i]
         currentColorArrangement[i]=Blank
       }
     }
}
 
const dragStart= (e)=>{
   console.log(e.target)
    console.log('drag start');
    setSquareisBeingDragged(e.target)
}


const dragDrop= (e)=>{
   console.log('drag drop');
   setSquareBeingreplaced(e.target)
}

const dragEnd=()=>{
    console.log('drag end')
  const squareBeingReplacedId=  parseInt(squareBeingreplaced.getAttribute('data-id'));
  const squareBeingDragedId=  parseInt( squareisBeingDragged.getAttribute('data-id'));
  currentColorArrangement[squareBeingReplacedId]=squareisBeingDragged.getAttribute('src')
  currentColorArrangement[squareBeingDragedId]= squareBeingreplaced.getAttribute('src')
 console.log(squareBeingDragedId,squareBeingReplacedId);

const validMoves= [
    squareBeingDragedId-1,
    squareBeingDragedId-width,
    squareBeingDragedId+1,
    squareBeingDragedId+width
]

const validMove= validMoves.includes(squareBeingReplacedId);
  
const x1= checkForColoumnOfFour();
const x2= checkForRowOfFour();
const x3= checkForColoumnOfThree();
const x4= checkForRowOfThree();

if(squareBeingReplacedId && validMove && (x1 ||x2|| x3 || x4)){
    setSquareisBeingDragged(null);
    setSquareBeingreplaced(true);
} else {
    currentColorArrangement[squareBeingReplacedId]=squareBeingreplaced.getAttribute('src')
    currentColorArrangement[squareBeingDragedId]=  squareisBeingDragged.getAttribute('src')
    setCurrentColorArrangement([...currentColorArrangement])
    
}

}


  const createBoard= ()=>{
    const randomColorArrangeMent=[];
       for(let i=0; i<width*width; i++){
        const randomColor= candyColor[Math.floor(Math.random()*candyColor.length)]
        randomColorArrangeMent.push(randomColor);
       }
       setCurrentColorArrangement(randomColorArrangeMent)
  }

  

   useEffect(() => {
       createBoard();
   }, [width] )
   
 useEffect(()=>{
 const timer= setInterval(()=>{
  checkForColoumnOfFour();
  checkForRowOfFour();
  checkForColoumnOfThree();
  checkForRowOfThree();
  moveIntoSquareBelow();
  setCurrentColorArrangement([...currentColorArrangement])
  },100)
  return ()=>clearInterval(timer);
 },[checkForColoumnOfThree, checkForColoumnOfFour, currentColorArrangement,checkForRowOfFour,checkForRowOfThree,moveIntoSquareBelow])

  console.log(currentColorArrangement)
  return (
       <div className="app">
         <div className="game">
{
    currentColorArrangement.map((candyColor,index)=>(
        <img key={index} 
         style={{backgroundColor:candyColor}}
         src={candyColor}
        alt={candyColor}
        data-id={index}
        draggable={true}
        onDragStart={dragStart}
       onDragOver={(e ) => {
         e.preventDefault();
        }}
       onDragEnter={(e) => {
         e.preventDefault();
         
       }}
       onDragLeave={(e) => {
         e.preventDefault();
        
       }}
       onDrop={dragDrop}
       onDragEnd={ dragEnd}
        />
    ))
}
         </div>
         <Scoreboard score={ scoreDisplay} />
       </div>
  );
}

export default App;

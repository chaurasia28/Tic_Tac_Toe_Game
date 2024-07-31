let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO = true; //playerX,playerO
let cnt=0;
let clickSound = new Audio('Zero.wav');
let clickSound2 = new Audio('Cross.wav');
let congrats = new Audio('Congrats.wav');
let GameOver = new Audio('GameOver.wav');
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//Oturn-O,Xturn-X,and all button should be enable
const resetGame = ()=>{
    turnO=true;
    cnt=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const gameDraw= ()=>{
  GameOver.play();
  msg.innerText=`Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}
//Here we want for each box some event should performed so apply addeventlistener to all box.
boxes.forEach((eachBox) => {
  eachBox.addEventListener("click", () => {
    //console.log("Box was clicked");
    if (turnO === true) {
      clickSound.play();
      eachBox.innerText = "O";
      turnO = false;
    } else {
      clickSound2.play();
      eachBox.innerText = "X";
      turnO = true;
    }
    eachBox.disabled=true;//To prevent from changing x-O or O-X
    cnt++;
    let isWinner=checkWinner();
    if(cnt === 9 && !isWinner){
      gameDraw();
    }
  });
});
const disableBoxes= ()=>{
  for(let eachbox of boxes){
    eachbox.disabled=true;
  }
}
const enableBoxes= ()=>{
  for(let eachbox of boxes){
    eachbox.disabled=false;
    eachbox.innerText="";
  }
}
const showWinner = (winner)=>{
         congrats.play();
         msg.innerText=`Congratulations,Winner is ${winner}`;
         msgContainer.classList.remove("hide");
         disableBoxes();
}
const checkWinner= ()=>{
   for(let pattern of winPatterns){
         //console.log(pattern);
         //console.log(pattern[0],pattern[1],pattern[2]);
         let post1Val=boxes[pattern[0]].innerText;
         let post2Val=boxes[pattern[1]].innerText;
         let post3Val=boxes[pattern[2]].innerText;
         if(post1Val!='' && post2Val!='' && post3Val!='')
         {
             if(post1Val === post2Val && post2Val === post3Val)
             {
                   cnt++;
                  // console.log("Winner",post1Val);
                  showWinner(post1Val);
                  return true;
             }

         }
   }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);



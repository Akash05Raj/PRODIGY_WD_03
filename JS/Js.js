let music = new Audio("Sounds/1.mp3");
let turnmusic1 =  new Audio("Sounds/6.mp3");
let turnmusic2 =  new Audio("Sounds/7.mp3");
let gameover =  new Audio("Sounds/8.mp3");
let gamewinner = false;
let gamecheck = 0;

let turn = "X";
// Function to Change the turn
const changeTurn = ()=>{
    return turn === "X" ?"Y" :"X";
}

function reset(){
    let valuebaar = document.getElementsByClassName('boxtext');
    Array.from(valuebaar).forEach(m =>{
        m.innerText = "";
        m.classList.remove('span0');
        m.classList.remove('span1');
    })

    
}
const datacheck = ()=>{
    const valuecheck = document.getElementsByClassName('boxtext');
    let checkdata = 0;
    Array.from(valuecheck).forEach( s =>{
        if(s.innerText !== "")
        {
            checkdata++;
            if(checkdata == 9){
                gameover.play();
                document.querySelector('.message').innerText = 'Match Draw';
                gamecheck =1;
            }
        }
        
    });
}

let colorbox =  document.getElementsByClassName('box'); 
const designbox = ()=>{
Array.from(colorbox).forEach(e =>{
        e.style.background = "transparent";
    }) ;   
}

// function to check for a win 
const checkWin = ()=>{
    
    let boxtexts = document.getElementsByClassName('boxtext');
    let win = [
        [0,1,2,0,-10,0],
        [3,4,5,0,80,0],
        [6,7,8,0,160,0],
        [0,3,6,-100,80,90],
        [1,4,7,0,80,90],
        [2,5,8,100,80,90],
        [0,4,8,0,80,40],
        [2,4,6,0,80,140],
    ]
    win.forEach(e =>{
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== ""))
        {
            console.log('Win match');
            music.play();
            colorbox[e[0]].style.background = "red";
            colorbox[e[1]].style.background = "red";
            colorbox[e[2]].style.background = "red";
            document.querySelector('.horizontal').style.transform = `translateX(${e[3]}px) translateY(${e[4]}px) rotate(${e[5]}deg)`;
            document.querySelector('.horizontal').style.border = "2px solid #ff00ae";
            gamewinner = true;
            gamecheck =1;
        }
        else{
            datacheck();          
        }
    })
}
let match = document.getElementsByClassName('check_action');
match[0].classList.add('action_call');
let color = ()=>{
    
    if(turn == "X"){
        match[0].classList.add('action_call');
        match[1].classList.remove('action_call');
    }
    else{
        match[1].classList.add('action_call');
        match[0].classList.remove('action_call');
    }
}


// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === "" && gamecheck == 0){
            boxtext.innerText = turn;
            checkWin();
            if(!gamewinner){
                console.log('match pending');
            }
            else{
                document.querySelector('.message').innerText = 'Match wins by '+turn+ ' team';
            }
            turn = changeTurn();
            
            color();
            if(boxtext.innerText =="X"){
                boxtext.classList.add('span0');
                turnmusic1.play();
            }
            else{
                boxtext.classList.add('span1');
                turnmusic2.play();
            }
        }
        if(gamecheck == 1){
            document.getElementById('button').style.visibility = "visible";
            document.querySelector('.check').style.display = "none";
            
        }
    })
    

})
document.getElementById('button').addEventListener('click', ()=>{
    reset();
    gamecheck =0;
    gamewinner = false;
    document.getElementById('button').style.visibility = "hidden";
    document.querySelector('.check').style.display = "flex";
    document.querySelector('.message').innerText = '';
    turn = "X";
    color();
    designbox();
    document.querySelector('.horizontal').style.transform = "translateX(0)px translateY(0)px rotate(0)deg";
    document.querySelector('.horizontal').style.border = "none";
})

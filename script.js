import Paddle from './paddle.js'
// import ball from './ball.js';
import Ball from './ball.js';
const ball = new Ball(document.getElementById("ball"))
let lastTime;
let player = new Paddle(document.getElementById("player-paddle"));
let computer = new Paddle(document.getElementById("computer-paddle"));

let playerScore = document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");


let winner = document.getElementById("winner");


let again = document.getElementById("again");
let pause=document.getElementById("pause");
let b = document.getElementById("ball");

let levels= document.getElementById('levels');

let speedPaddle=0;
let ballSpeed=1;
let counter = document.getElementById("counter");
 let pauseStatus= false;

let singlePlayer=true;
let keyPress=false;

let stat = document.getElementById('stylePlay');

stat.addEventListener('click',(e)=>{
    console.log(e.target.innerText);
    if(e.target.innerText==="Single Player"){
        singlePlayer=true;
    }
    else if(e.target.innerText==="Multiplayer"){
        singlePlayer=false;
    }
    stat.style.display="none";
})


let p="Player Won!";
let c = "Computer Won!";

if(singlePlayer==false){
    p="Player 1 Won!";
    c="Player 2 Won!";
}else if(singlePlayer==true){
    p="Player Won!";
c = "Computer Won!";
}
console.log(p);
console.log(c);

start.onclick=()=>{
    stat.style.display="none";
     counterFunc();
    
  

            ball.reset();
            computer.reset();

    
    start.style.display="none";
    pause.style.display="flex";
   
    function update(time){
        computer.speed(speedPaddle);
        ball.speed(ballSpeed);


    if(parseInt(playerScore.innerText)<10&&parseInt(computerScore.innerText)<10){

        
        if(lastTime!=null){
            const delta=time-lastTime;
          
            if(pauseStatus){
               ball.pause();
               paused.style.display="flex";
                // alert("The game has been paused.");
                // pauseStatus=false;
                pause.innerText="Resume";
                levels.style.display="flex";
                again.style.display="flex";
            }else{    
                again.style.display="none";
                levels.style.display="none";
                paused.style.display="none";  
                pause.innerText="Pause";   
                

                    ball.update(delta,[player.rect(),computer.rect()]);
                    if(singlePlayer==true){

                        computer.update(delta,ball.y);
                    }
                    
                }
                 
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
            document.documentElement.style.setProperty("--hue",hue+delta*0.01);
            
            if (isLose()){
                handleLost();
                pauseStatus=true;
                paused.style.visibility="hidden";
            }
            
        }
    }

        else if(parseInt(playerScore.innerText)>=10||parseInt(computerScore.innerText)>=10){
            b.style.display="none";
            // score.style.display="none";
            levels.style.display="flex";
            ball.pause();
            if(parseInt(playerScore.innerText)===10){
                winner.style.visibility="visible";
                if(singlePlayer==false){
                    p="Player 1 Won!";
                    c="Player 2 Won!";
                    winner.innerText=p;
                } else{
                    winner.innerText=p;
                    
                }
                // playerScore.innerText='0';
                // computerScore.innerText='0';
                again.style.display="flex";
                
            }else if(parseInt(computerScore.innerText)===10){
                winner.style.visibility="visible";
                if(singlePlayer==false){
                    p="Player 1 Won!";
                    c="Player 2 Won!";
                    winner.innerText=c;
                }
                winner.innerText=c;
                // playerScore.innerText='0';
                // computerScore.innerText='0';
                again.style.display="flex";

            }
        }
        
        window.requestAnimationFrame(update);
            lastTime=time;
    // console.log(delta);

            
            
     }
      
        setTimeout(()=>{
        

                window.requestAnimationFrame(update);
            

           
        },3000)



    const isLose=()=>{
        const rect = ball.rect();

        return (rect.right>=window.innerWidth||rect.left<=0)
    }

    const handleLost=()=>{
        const rect = ball.rect()
        counterFunc();
        again.style.visibility="hidden";
        if(rect.right>=window.innerWidth){
            playerScore.innerText=parseInt(playerScore.innerText)+1;
            // console.log("Player.");
            
        }
        else if(rect.left<=0){
            computerScore.innerText= parseInt(computerScore.innerText)+1;
            // console.log("COmputer");
        }
        ball.reset();
            computer.reset();
        
     
    }
    again.addEventListener("click",()=>{
        computer.reset();
        ball.reset();
        again.style.visibility="hidden";
        b.style.display="block";
        score.style.display="flex";
        computerScore.innerText='0';
        playerScore.innerText='0';
        again.style.display="none";
        winner.style.visibility="hidden"
        counterFunc();
        
    })
    function counterFunc(){
        // ballPause();
        counter.style.display="block";
        counter.innerText="3";
        pause.style.display="none";
        
        // ball.x=50;
        // ball.y=50;
        // ball.pause();
        setTimeout(()=>{
            counter.innerText=2;
        },1000);
        setTimeout(()=>{
            counter.innerText=1;
        },2000);
        setTimeout(()=>{
            pause.style.display="flex";
            counter.style.display="none";
            // stat=true;
            pauseStatus=false;
            paused.style.visibility="hidden";
            again.style.visibility="visible";
            
            
        },3000);
    }
    
}

    document.addEventListener("mousemove",(e)=>{
        player.position=(e.y/window.innerHeight)*100;
    })
    document.addEventListener("touchmove",
    function clicked(e) {
        // var br = document.getElementById("touchme");
        // x & y are relative to the clicked element
        let y=(e.touches[0].clientY/innerHeight)*100
        if(y>0 &&y<100){

            player.position = (e.touches[0].clientY/innerHeight)*100 ;
        }
    // console.log(e.touches[0].clientY/innerHeight) ;
        
    });
   
    
        document.addEventListener("keydown",(e)=>{
            if(singlePlayer==false){

                if(computer.position<100&&computer.position>0){
                    if(e.key==="ArrowDown"){
                        
                        computer.position+=15;
                    }else if(e.key==="ArrowUp"){
                        computer.position-=15;
                    }
                }if(computer.position<=0){
                    computer.position=1;
                }else if(computer.position>=100){
                    computer.position=99;
                }
                
            }
           
        })
   
    
   
    // document.addEventListener("keyup",()=>{
    //     if(computer.position<window.innerHeight&&computer.position>0){
    //         computer.position-=10;
    //     }
    // })



  
pause.addEventListener("click",()=>{
    pauseStatus=toggle(pauseStatus);
})



function toggle(a1){
    if(a1==true){
        return false;
    }
    else{
        return true;
    }
}

levels.addEventListener('click',(e)=>{
    if(e.target.innerText=="Easy"){
        speedPaddle=0.0001;
        ballSpeed=1;
    }else if(e.target.innerText=="Hard"){
        speedPaddle=0.05;
        ballSpeed=3;
    }
    else if(e.target.innerText=="Impossible"){
        speedPaddle=0.1;
        ballSpeed=3;
    }
    ball.reset();
    computer.reset();
    computerScore.innerText='0';
    playerScore.innerText='0';
})


function ballPause(){
ball.pause();
}


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

let p="Player Won!";
let c = "Computer Won!";
let again = document.getElementById("again");
let pause=document.getElementById("pause");
let b = document.getElementById("ball");

let levels= document.getElementById('levels');

let speedPaddle=-0.0001;
let ballSpeed=1;
let counter = document.getElementById("counter");
 let pauseStatus= false;


 let stat=true;
start.onclick=()=>{
     counterFunc();
    
        if(stat=true){

            ball.reset();
            computer.reset();
        }
    
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
            }else{    
                levels.style.display="none";
                paused.style.display="none";  
                pause.innerText="Pause";   
                

                    ball.update(delta,[player.rect(),computer.rect()]);
                    
                    computer.update(delta,ball.y);
                }
                 
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
            document.documentElement.style.setProperty("--hue",hue+delta*0.01);
            
            if (isLose()){
                pauseStatus=true;
                paused.style.visibility="hidden";
                handleLost();
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
                winner.innerText=p;
                // playerScore.innerText='0';
                // computerScore.innerText='0';
                again.style.display="flex";
                
            }else if(parseInt(computerScore.innerText)===10){
                winner.style.visibility="visible";
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
        const rect = ball.rect();
       
        
    
        counterFunc();
      
        if(rect.right>=window.innerWidth){
            playerScore.innerText=parseInt(playerScore.innerText)+1;
            // console.log("Player.");
            
        }
        else if(rect.left<=0){
            computerScore.innerText= parseInt(computerScore.innerText)+1;
            // console.log("COmputer");
        }
       
     
    }
    function counterFunc(){
        // ballPause();
        counter.style.display="block";
        counter.innerText="3";
        pause.style.display="none";
        
        ball.x=50;
        ball.y=50;
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
            
        },3000);
    }
    
}

    document.addEventListener("mousemove",(e)=>{
        player.position=(e.y/window.innerHeight)*100;
    })
    document.addEventListener("touchmove",
    function clicked(e) {
      let y=(e.touches[0].clientY/innerHeight)*100
        if(y>0 &&y<100){

            player.position = (e.touches[0].clientY/innerHeight)*100 ;
        }
    });



    again.addEventListener("click",()=>{
        computer.reset();
        ball.reset();
        b.style.display="block";
        score.style.display="flex";
        computerScore.innerText='0';
        playerScore.innerText='0';
        again.style.display="none";
        winner.style.visibility="hidden"
    })
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
        speedPaddle=-0.0001;
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


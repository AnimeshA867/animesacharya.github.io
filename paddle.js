const SPEED= 0.01;

export default class Paddle {
    constructor(paddleElem,increasedSpeed){
        this.paddleElem = paddleElem;
        // this.reset();
        this.increasedSpeed= increasedSpeed;
    }
    speed(increasedSpeed){
        this.increasedSpeed= increasedSpeed;
    }
    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
    set position(value){
        this.paddleElem.style.setProperty("--position",value);
    }
    update(delta,ballHeight){
        this.position+= (SPEED+this.increasedSpeed)* delta * (ballHeight-this.position);
    }
    reset(){
        this.position=50;
    }
    rect(){
        return this.paddleElem.getBoundingClientRect();
    }
    pause(){
        this.position=50;
    }
}
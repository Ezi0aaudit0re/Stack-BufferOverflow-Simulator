// This file consits of helper fnctions
const STACK_SIZE = 25
const MAIN_LOC = 24 // first thing on stack and we are couunting form 0
const MAIN_FRAME_SIZE = 5
const FRAME_START = 15 // we hardcode the starting of the frame
const PAYLOAD = 8

// declare a global variable stack
stack = Array()


// definition of a stack frame
var stackFrame = {

    // the values that wont be used in this program would be assigned
    // 1 memory addr space in stack

    parametersLoc: FRAME_START, // parameters passed to the fnction
    returnAddrValue: MAIN_LOC, // the returb addr where we go to
    returnAddrLoc: null,
    bufferStart: null, // the start addr of our buffer
    bufferEnd: null, // end addr of our buffer
    basePointerLocation: null,  // the base pointer which will not be used

    enterData: function(input){
        var inputArr = input.split("")
        for(var i =0; i < inputArr.length; i++){
            if(isNaN(input[i])){
                stack[this.bufferStart + i] = inputArr[i]
            }
            else if(input[i] == 0){
                console.log("Here in noop")
                stack[this.bufferStart + i] = "\\x90"
            }
            else{
                stack[this.bufferStart + i] = parseInt(inputArr[i] + inputArr[i+1])
            }
        }


    },

    setValues: function(obj){

        this.bufferStart = obj["bufferStartLoc"]
        this.bufferEnd = obj["bufferEndLoc"]
        this.basePointerLocation = obj["basePointerLoc"]
        this.returnAddrLoc = obj["returnAddrLoc"]
    }

}


function fillStack(){
    if(stack.length == 0){
        // we initialize the stack and is 1k long
        // we also fill it with dummy value
        for(var i = 0; i < STACK_SIZE; i++){
            stack[i] = 0
        }
    }
    else{
        console.log("Stack is initialized")

    }
}

/**
 * This function is used to create a frame when a fuunction is called
 * @param The size of the buuffer in the function
 */
function createFrame(bufferSize){

    // set few values in stack
    stack[FRAME_START] = "PARAMETERS"

    // calculate location for few values
    var returnAddrLoc = FRAME_START -1
    var bufferEndLoc = FRAME_START - 3 // buffer starts at lower valueu and ends at higher value
    var bufferStartLoc = bufferEndLoc - bufferSize
    var basePointerLoc = FRAME_START - 2

    // set the value of base reg
    stack[basePointerLoc] = "BASE POINTER"
    stack[returnAddrLoc] = MAIN_LOC

    return {"returnAddrLoc": returnAddrLoc, "bufferStartLoc": bufferStartLoc,
            "bufferEndLoc": bufferEndLoc, "basePointerLoc": basePointerLoc}

}


/**
 * This fnction sets the values in stackFrame OBJ
 * @param loc the location of various things in stack
 */
function setValues(obj){
    stackFrame.setValues(obj)
}


function setUserInput(input){
    stackFrame.enterData(input)

}

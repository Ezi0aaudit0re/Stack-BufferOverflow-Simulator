$(function(){

    // create the stack
    var bufferSize = 0
    var locObj = null
    var message = null
    var payload = PAYLOAD

    fillStack()





    $("#attack").click(function(event) {
        hideMessage()
        /* Act on the event */
        if(bufferSize != 0){
            setUserInput($("input[name='user-input']").val())
            showStack(locObj)
        }
        else{
            message = "Please enter the BUFFER SIZE first"
            showMessageDiv(message)
            // turn input field red
            $("input[name='buffer-size']").css("border-color", "red")
            // set the field empty again
            $("input[name='user-input']").html()
        }
    });


    $("#buffer-size").on("blur",  function() {
        hideMessage()
        bufferSize = $(this).val()
        if(bufferSize > 12){
            message = "Maximum buffer Size for demonstration can be <b> 8 </b>"
            showMessageDiv(message)
            return
        }
        bufferSize = parseInt(bufferSize)
        locObj = createFrame(bufferSize)
        setValues(locObj)
        showRegisters()
        // show the summary section
        showSummary()

        // show stack
        showStack(locObj)
     });


     function showMessageDiv(message){
         $(".message").css('display', 'block')
         $("#alert-message").html(message)
     }

     function hideMessage(){
         $(".message").css('display', 'None')

     }


     function showRegisters(){
         console.log(stackFrame)

     }

     function showStack(locObj){
         stackCss(locObj)
         for(var i = 0; i<stack.length; i++){
             $(".addr"+i.toString()).html("<td>" + i + "</td>" + "<td>" + stack[i] + "</td>")
         }
         $("table").css('display', 'block')
         $(".legend").css('display', 'block')


     }

     function showSummary(){
        $("#buffer-range").html(stackFrame.bufferStart + " - " + stackFrame.bufferEnd)
        $("#return-addr-loc").html(stackFrame.returnAddrLoc)
        $("#return-addr-value").html(stackFrame.returnAddrValue)
        $("#payload-size").html(PAYLOAD)

        var bufferSize = $("#buffer-size").val()
        var inputSize = stackFrame.bufferStart + parseInt(bufferSize) + 2
        $("#input-size").html(inputSize)

        var noop = bufferSize - payload + 2 // we do + 2 because one for base reg and + 1 to reach reetuurn addr
        $("#noop").html(noop)

        $(".summary").css('display', 'block')
     }

     function stackCss(locObj){
         // set color for buffer
         for(var i = locObj["bufferStartLoc"]; i <= locObj["bufferEndLoc"]; i++){
             $(".addr" + i.toString()).css('background-color', '#ffff80')
         }


         // set color for return addr
         $(".addr" + locObj["returnAddrLoc"].toString()).css('background-color', '#ff8080')


         // set color for base pointer
         $(".addr"+ locObj["basePointerLoc"].toString()).css('background-color', '#99ebff')

         // set CSS for main
         mainFrameEnd = MAIN_LOC - MAIN_FRAME_SIZE
         // frame is in reverse
         for(var i = mainFrameEnd + 1; i <= MAIN_LOC; i++){
             $(".addr" + i.toString()).css('background-color', '#ff99ff')
         }


     }




})

function validate(){
  var name1 = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var error_message = document.getElementById("error_message");
  error_message.style.padding = "10px";
  var text;
  if(/.{2,}/.test(name1) === false) {
    text = "Please enter your name, it must be at least two alpha character in length.";
    error_message.innerHTML = text;
    return false;
  }
  if(/^(1-)?(.{3}\-)?(.{3}\-)(.{4})$/.test(phone) === false) {
  //if(isNaN(phone) || phone.length != 10){
    text = "Please enter a valid phone number. Type xxx-xxx-xxxx";
    error_message.innerHTML = text;
    return false;
  }
  if(/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/.test(email) === false) {
  //if(email.indexOf("@") == -1 || email.length < 6){
    text = "Please enter valid email address";
    error_message.innerHTML = text;
    return false;
  }
  if(message.length <= 10){
    text = "Please enter a short message.";
    error_message.innerHTML = text;
    return false;
  }
  alert("Form Submitted Successfully!");
  return true;
}

//validate comment date 
function validateCommentDate(){
 var selectElements = document.querySelectorAll("#commentMo");
 var error_message = document.getElementById("error_message");
 var fieldsetValidity = true;
 var elementCount = selectElements.length;
 var currentElement;
 try {
     for (var i =0; i < elementCount; i++) {
         currentElement = selectElements[i];
         if (currentElement.selectedIndex === -1) {
             currentElement.style.border ="1px solid red";
             fieldsetValidity =false;
             } else {
                 currentElement.style.border ="";
                 }
             }
             if (fieldsetValidity ===false) {
                 throw "Please specify a date.";
                 } else {
                     error_message.style.display ="none";
                     error_message.innerHTML ="";
                 }
             }  catch(msg) {
                 error_message.style.display = "block";
                 error_message.innerHTML = msg;
                 formValidity =false;
                }
}

function createEventListener () {
  selectElements = document.querySelectorAll("#commentMo");
  if (selectElements.addEventListener) {
    selectElements.addEventListener("click", validateCommentDate, false);
  } else if (selectElements) {
    selectElements.attachEvent("onclick", validateCommentDate);
  }
}
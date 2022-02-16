
//global variables
var totalNumber = 0;
var dateObject = new Date();
var vacationSpot = {};
var locations = [];
var objectString;
var arrayString;

// calculates places visted based upon user entry 
function calcPlaces() {
    var con = document.getElementById("countries");
    var st = document.getElementById("states");
    var cty = document.getElementById("cities");
    totalNumber = +con.value + +st.value + +cty.value;
    document.getElementById("placesTraveled").innerHTML = totalNumber;
}

// sets all form field values to defaults
function resetForm() {
    document.getElementById("countries").value =1;
    document.getElementById("states").value =1;
    document.getElementById("cities").value =1;
    calcPlaces();
    createEventListeners();
}

//declare calendar function 
//declare display calendar function
function displayCalendar(whichMonth) {
    var date;
    var dateToday = new Date();
    var dayOfWeek;
    var daysInMonth;
    var dateCells;
    var captionValue;
    var month;
    var year;
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber" , "Decemeber"];
    if (whichMonth === - 1) {
        //start at 0 selction point allow navigation using cal widget buttons
        dateObject.setMonth(dateObject.getMonth() - 1);
    } else if (whichMonth === 1 ) {
        dateObject.setMonth(dateObject.getMonth() + 1) ;
    }
    //set variable values
    month = dateObject.getMonth();
    year = dateObject.getFullYear();
    dateObject.setDate(1);
    dayOfWeek = dateObject.getDay();
    captionValue = monthArray[month] + " " + year;
    document.querySelector("#cal table caption").innerHTML = captionValue;
    //determine number of days in selected month
    if (month === 0 || month === 2 || month ===4 || month === 6 || month === 7 || month === 9 || month === 11){
        daysInMonth = 31;
    } else if (month === 1) {//FEB
        if (year % 4 === 0 ) {//leap year test
          if (year % 100 === 0) {
              //year ending in 00 not leap year unless divisble by 400
              if (year % 400 === 0) {
                  daysInMonth = 29;
              } else {
                  daysInMonth = 28;
              }
          } else {
              daysInMonth = 29 ;
          }  
        } else {
            daysInMonth = 28;
        }
    } else {// APR, JUN, SEP, NOV
        daysInMonth = 30;
    }
//clear existing table contents
    dateCells = document.getElementsByTagName("td");
    for (var i = 0; i < dateCells.length; i++) {
        dateCells[i].innerHTML = " ";
        dateCells[i].className = " ";
    }
    for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
     //add dates to day cells
     dateCells[i].innerHTML = dateObject.getDate();
     dateCells[i].className = "date";
     if (dateToday < dateObject) {
         dateCells[i].className = "futuredate";
        }
        date = dateObject.getDate() + 1;
        dateObject.setDate(date);
    }
    dateObject.setMonth(dateObject.getMonth() - 1);
    //reset month to month shown
    document.getElementById("cal").style.display = "block";
    // display calendar if it's not already visible
}

//verifies that date user picks is not in the past, adds date to pick a date field if valid
function selectDate(event) {
    if (event === undefined) {// get caller elmt in IE 8
        event = window.event;
    }
    var callerElement = event.target || event.srcElement;
    if (callerElement.innerHTML === " ") {
        //cell contains no date, so don't close the calendar
        document.getElementById("cal").style.display = "block";
        return false;
    }
    dateObject.setDate(callerElement.innerHTML);
    //checks if cell picked is empty if so calendar is open or date portion of date object diplayed
    var fullDateToday = new Date();
    var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
    var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    if (selectedDate <= dateToday) {
        document.getElementById("cal").style.display = "block";
        return false;
    }
     document.getElementById("tripDate").value = dateObject.toLocaleDateString();
     hideCalendar();
     countdown = setInterval(updateCountdown, 1000);
     document.getElementById("countdownSection").style.display = "block";
     ticket.date = dateObject.toLocaleDateString();//adds date to tickets box when selectDate function runs
     document.getElementById("selectedDate").innerHTML = ticket.date;
     document.getElementById("dateSection").style.display = "block";
}
 
 
 //Create function to hide calendar
 function hideCalendar(){
     document.getElementById("cal").style.display = "none";
 }
 function prevMo() {
     displayCalendar(-1);
 }
 function nextMo() {
     displayCalendar(1);
 }

//update countdown
function updateCountdown() {
    var dateToday = new Date();
    var dateFrom = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(),
        dateToday.getDate(), dateToday.getHours(), dateToday.getMinutes(),
        dateToday.getSeconds());
    var dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), 24, 0, 0);
    if ((dateTo - dateFrom) < 1000) { //time will be less then 0 when setInterval runs next
    clearInterval(countdown);
    document.getElementById("countdownSection").style.display = "none";
    }
    //years not functioning 
    var yearsUntil = Math.floor((dateTo - dateFrom) / 31540000000 );//seconds in a year
    document.getElementById("countdown").innerHTML = yearsUntil; 

    //months works
    var fractionalYear = Math.floor (dateTo - dateFrom) % 31540000000 ;//reminder of seconds in a year 
    var monthsUntil = Math.floor(fractionalYear/ (864000000*3));//seconds in day division 
    if (monthsUntil < 12) {
        monthsUntil = "0" + monthsUntil;
    }
    document.getElementById("countdown").innerHTML += ":" + monthsUntil;

    // days
    var fractionalMonth = Math.floor ((dateTo - dateFrom) % (864000000*3));//2592e^6 milliseconds in day 
    var daysUntil = Math.floor(fractionalMonth/ 86400000);// divided by apx days in a year
    if (daysUntil <10) {
        daysUntil = "0" + daysUntil;
    }
    document.getElementById("countdown").innerHTML += ":" + daysUntil;

   /* // hours
    var fractionalDay = (dateTo - dateFrom) % 86400000; //number of milliseconds in day
    var hoursUntil = Math.floor(fractionalDay / 3600000); // microseconds in hour 
    if (hoursUntil < 10) {
        hoursUntil = "0" + hoursUntil;
    }
    document.getElementById("countdown").innerHTML += ":" + hoursUntil;
    // minutes works
    var fractionalHour = fractionalDay % 3600000;
    var minutesUntil = Math.floor(fractionalHour / 60000);
    if (minutesUntil < 10) {
        minutesUntil = "0" + minutesUntil;
    }
    document.getElementById("countdown").innerHTML += ":" + minutesUntil;
    // seconds works
    var fractionalMinute = fractionalHour % 60000;
    var secondsUntil = Math.floor(fractionalMinute / 1000);
    if (secondsUntil < 10) {
        secondsUntil = "0" + secondsUntil;
    } 
    document.getElementById("countdown").innerHTML += ":" + secondsUntil;*/
} 

//allows user to click and have a chance to see more travel pictures
if (Math.random() , 0.5){
    text = "<a href='https://aalcottherrsdev153.s3.amazonaws.com/finalProject/WebDevFinal/index.html'> Click here for chance to see a different site I've created</a>";
} else {
    text = "<a href='https://www.pexels.com/search/travel%20destination/'>Check out the beauty of the world</a>";
}
document.getElementById("nature").innerHTML = text;

//Function created to add favorite vacation spot selections to and from Array
function registerLocation(event) {
    if(event === undefined) {
        event = window.event;
    }
    var callerElement = event.target || event.srcElement;
    var locationsName = callerElement.value;
    if (callerElement.checked) {//if box is checked add to array 
        locations.push(locationsName);
        //add checkbox value to list in vacation spot section
        var newLocations = document.createElement("li");
        newLocations.innerHTML = locationsName;
        document.getElementById("spotLocations").appendChild(newLocations);
        //make section visible 
        document.getElementById("vacationSpot").style.display ="block";
        document.getElementById("locationSection").style.display ="block";
    } else { // if box has been unchecked
        var listItems = document.querySelectorAll("#spotLocations li");
        for (var i = 0; i <listItems.length; i++) {
            if (listItems[i].innerHTML === locationsName) {
                // remove element at index 1 from array
                locations.splice(i, 1);
                listItems[i].parentNode.removeChild(listItems[i]);
                break;
            }
        }
    }
}

function convertToString() {
    arrayString = locations.toString();
    objectString = JSON.stringify(vacationSpot);
}

//create event listeners
function createEventListeners () {
    document.getElementById("countries").addEventListener("change", calcPlaces, false);
    document.getElementById("states").addEventListener("change", calcPlaces, false);   
    document.getElementById("cities").addEventListener("change", calcPlaces, false);
    var dateField = document.getElementById("tripDate");
    if (dateField.addEventListener) {
        dateField.addEventListener("click" , displayCalendar, false);
    } else if (dateField.attachEvent) {
        dateField.attachEvent("onclick", displayCalendar);
    }
    var dateCells = document.getElementsByTagName("td");
    if (dateCells[0].addEventListener) {
        for (var i = 0; i <dateCells.length; i++) {
            dateCells[i].addEventListener("click", selectDate, false);
        }
  } else if (dateCells[0].attachEvent) {
    for (var i = 0; i <dateCells.length; i++) {
        dateCells[i].attachEvent("onclick", selectDate);
    }
  }
  var closeButton = document.getElementById("close");
      if (closeButton.addEventListener) {
      closeButton.addEventListener("click", hideCalendar, false);
      } else if (closeButton.attachEvent) {
      closeButton.attachEvent("onclick", hideCalendar);
      }
  var prevLink = document.getElementById("prev");
  var nextLink = document.getElementById("next");
      if (prevLink.addEventListener) {
      prevLink.addEventListener("click" , prevMo, false);
      nextLink.addEventListener("click", nextMo, false);
      } else if (prevLink.attachEvent) {
      prevLink.attachEvent("onclick", prevMo);
      nextLink.attachEvent("onclick", nextMo)
      }
    var locations = document.getElementsByName("locations");
    if (locations[0].addEventListener) {
        for (var i = 0; i < locations.length; i++) {
          locations[i].addEventListener("change", registerLocation, false);
        }
    } else if (locations[0].attachEvent) {
        for (var i = 0; i < lodgings.length; i++) {
          locations[i].attachEvent("onchange", registerLocation);
        }
    }   
}
    if (window.addEventListener) {
        window.addEventListener("load", createEventListeners, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload" , createEventListeners); 
    }
  
//resets form when page is reloaded
document.addEventListener("load", resetForm, false);


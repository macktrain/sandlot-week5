//FUTURE ENHANCEMENT:  get the day/time x => var thisDay = moment(x); //to the milliseconds
//Get Today's Date:
var container = document.getElementById("container")

var today = moment();
document.getElementById("currentDay").textContent =(today.format('dddd MMMM Do YYYY'));


/*var i = 0;
moment.tz.zonesForCountry('US').forEach(tz,element => {
    timeZonesUS[i] = moment
    i++;
});*/

var dateStamp = (today.format('MMDDYYYY'));
var hour = (today.format('HH'));

buildCalendar(dateStamp,hour);

function buildCalendar(thisDay, x)
{
    var div = "";
    var innerDivTime = "";
    var innerDivEvent = "";
    var innerDivInput = "";
    var saveImg ="";
    var innerDivSave = "";
    var militaryTimeAdjust = 0;
    var currClass = "past";
    var ampm = "AM";
    var validTimeSlot = 0;

    for(var i=1; i < 25; i++)
    {
        if (i>=13){militaryTimeAdjust = 12;}
        if (i>=12){ampm = "PM";}
        if (i===24){ampm = "AM";}
        if (i==x){currClass = "present"; validTimeSlot= 1;}
        if (i>x){(currClass = "future");}

        //build elements of new timeslot
        //Parent Div
        div = document.createElement('div');
        div.id = ("timeslot"+ thisDay + "hr" + i);
        div.className = ("row");
        //Time Div
        innerDivTime = document.createElement('div');
        innerDivTime.id = ("time"+ thisDay + "hr" + i);
        innerDivTime.className = ("time-block");
        innerDivTime.innerHTML = ((i-militaryTimeAdjust)+ampm);
        //Entry Div
        innerDivEvent = document.createElement('div');
        innerDivEvent.id = ("entry"+ thisDay + "hr" + i);
        innerDivEvent.className = (currClass);

        //Entry Div TextArea
        innerDivInput = document.createElement('textArea');
        //This is the calendar entry that we need to save
        var calendarEntryID = ("calendarEntry"+ thisDay + "hr" + i);
        innerDivInput.id = calendarEntryID;
        innerDivInput.setAttribute("placeholder", "Enter calendar details");
        innerDivInput.type = "text";

        //Save Div
        innerDivSave = document.createElement('div');
        //Represents the save button clicked
        var saveBtnClicked = (thisDay + "hr" + i);
        innerDivSave.id = (saveBtnClicked);
        innerDivSave.className = ("saveBtn");
        saveImg = document.createElement('img');
        saveImg.id = ("saveBtn"+ thisDay + "hr" + i);
        saveImg.setAttribute("src", "./assets/images/save.ico");
        saveImg.setAttribute("height", "25px");
        saveImg.setAttribute("width", "25px");
        saveImg.setAttribute("width", "25px");
        
        //createEventListener (saveBtnClicked, calendarEntryID);
        //saveImg.addEventListener("click", saveEntry(thisDay.toString() + 'hr' + i.toString(), "document.getElementById("+ calendarEntryID +".textContent"));
        saveImg.setAttribute("onclick", "saveEntry('"+ saveBtnClicked + "', document.getElementById('"+ calendarEntryID +"').value)");
        //alert ('saveEntry('+ thisDay.toString() + i.toString() + ', document.getElementById("'+ calendarEntryID +'").textContent));

        //These 4 divs above create a single entry on the calendar
        //Put the new timeslot elements together
        $(".container").append($(div));
        div.appendChild(innerDivTime);
        div.appendChild(innerDivEvent);
        innerDivEvent.appendChild(innerDivInput);
        div.appendChild(innerDivSave);
        innerDivSave.appendChild(saveImg);
    }
}


function saveEntry(id, text)
//id => MMDDYYYYHHhrHH
{    
    alert (id + " " + text);
    localStorage.setItem (id.toString(), text.toString());
    alert (text + " is saved!");
}
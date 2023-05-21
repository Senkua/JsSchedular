// Define the work hours in a day
var workHours = [
  "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
];

function convertTo24HourFormat(timeString) {
  // Extract hours and meridiem from the time string
  var hours = parseInt(timeString);
  var meridiem = timeString.substring(timeString.length - 2);

  // Adjust hours based on meridiem (AM or PM)
  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return hours;
}

function setTextToBlock(blockItem, textareaElement) {
  var text = textareaElement.val();
  console.log(text);

  localStorage.setItem(blockItem, text);
}


$(document).ready(function() {
  // Get the current hour
  var currentHour = moment().hour();

  // Create hour blocks dynamically
  for (var i = 0; i < workHours.length; i++) {
    // Create a new scope using an Immediately Invoked Function Expression (IIFE)
    (function(index) {
      // Access the index i of workHours list to turn it into a 24H format Int
      var workHoursIn24Hour = convertTo24HourFormat(workHours[index]);
  
      // Create the hour block container
      var hourBlock = $('<div>', {
        id: 'hour-' + workHoursIn24Hour,
        class: 'row time-block-' + workHoursIn24Hour
      });
  
      // Create the hour element
      var hourElement = $('<div>', {
        class: 'col-2 col-md-1 hour text-center py-3 hour-' + index,
        text: workHours[index]
      });
  
      // Create the input element
      var inputElement = $('<textarea>', {
        id: 'inputField-' + workHoursIn24Hour,
        class: 'col-8 col-md-10 description-' + index,
        type: 'text'
      });
  
      // Create the save button
      var saveButton = $('<button>', {
        class: 'btn saveBtn col-2 col-md-1 saveBtn-' + index,
        'aria-label': 'save'
      }).append($('<i>', {
        class: 'fas fa-save',
        'aria-hidden': true
      }));
  
      // Determine if the hour block is in the past, present, or future
      if (workHoursIn24Hour < currentHour) {
        hourBlock.addClass('past');
      } else if (workHoursIn24Hour === currentHour) {
        hourBlock.addClass('present');
      } else {
        hourBlock.addClass('future');
      }
  
      // Append elements to the hour block container
      hourBlock.append(hourElement, inputElement, saveButton);
  
      // Retrieve saved text from localStorage and populate input elements
      var savedText = localStorage.getItem('inputField-' + workHoursIn24Hour);
      if (savedText) {
        inputElement.val(savedText);
      }
  
      // Add event listener to the save button
      saveButton.on('click', function() {
        var text = inputElement.val();
        localStorage.setItem('inputField-' + workHoursIn24Hour, text);
        console.log(workHoursIn24Hour);
        console.log(text);
      });
  
      // Append the hour block container to the document body
      $('.container').append(hourBlock);
    })(i);
  }
});
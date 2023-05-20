function convertTo24HourFormat(timeString) {

  // Extract hours and meridiem from the time string
  var hours = parseInt(timeString);
  var meridiem = timeString.substr(-2);

  // Adjust hours based on meridiem (AM or PM)
  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  console.log(meridiem);
  return hours;
}


$(document).ready(function() {
  // Get the current hour
  var currentHour = moment().hour();

  // Define the work hours in a day
  var workHours = [
    "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
  ];

  // Create hour blocks dynamically
  for (var i = 0; i <= workHours.length; i++) {

    // Access the index i of workHours list to turn it into a 24H format Int
    var workHoursIn24Hour = convertTo24HourFormat(workHours[i]);
    

    // Create the hour block container
    var hourBlock = $('<div>', {
      id: 'hour-' + (i + 1),
      class: 'row time-block'
    });

    // Create the hour element
    var hourElement = $('<div>', {
      class: 'col-2 col-md-1 hour text-center py-3',
      text: workHours[i]
    });

    // Create the textarea element
    var textareaElement = $('<textarea>', {
      class: 'col-8 col-md-10 description',
      rows: 3
    });

    // Create the save button
    var saveButton = $('<button>', {
      class: 'btn saveBtn col-2 col-md-1',
      'aria-label': 'save'
    }).append($('<i>', {
      class: 'fas fa-save',
      'aria-hidden': true
    }));

    // Append elements to the hour block container
    hourBlock.append(hourElement, textareaElement, saveButton);

    // Determine if the hour block is in the past, present, or future
    if (workHoursIn24Hour < currentHour) {
      hourBlock.addClass('past');
    } else if (workHoursIn24Hour === currentHour) {
      hourBlock.addClass('present');
    } else {
      hourBlock.addClass('future');
    }

    // Append the hour block container to the document body
    $('.container').append(hourBlock);
  }

  console.log(workHoursIn24Hour);

  // Retrieve saved text from localStorage and populate textarea elements
  var savedText = localStorage.getItem('hour-' + (workHoursIn24Hour + 1));
  if (savedText) {
    textareaElement.val(savedText);
  }

  // Add event listener to the save button
  saveButton.on('click', function() {
    var text = textareaElement.val();
    localStorage.setItem('hour-' + (workHoursIn24Hour + 1), text);
  });
});

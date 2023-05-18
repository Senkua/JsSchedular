// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Display the current date in the header
  var currentDate = moment().format('MMMM Do, YYYY');
  $('#currentDay').text(currentDate);

  //listener for click events on the save button. 
  $(document).ready(function() {
    // Click event listener for the save button
    $('.save-button').on('click', function() {
      // Get the id of the time-block
      var timeBlockId = $(this).closest('.time-block').attr('id');
      
      // Get the user input from the corresponding input field
      var userInput = $(this).siblings('.user-input').val();
      
      // Save the user input in local storage using the time-block id as the key
      localStorage.setItem(timeBlockId, userInput);
    });
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
<<<<<<< HEAD
=======
  
  $(document).ready(function() {
    // Get the current hour
    var currentHour = moment().hour();
    
    // Loop through each time-block
    $('.time-block').each(function() {
      // Get the id of the time-block and extract the hour part
      var timeBlockId = $(this).attr('id');
      var timeBlockHour = parseInt(timeBlockId.split('-')[1]);
      
      // Compare the time-block hour with the current hour
      if (timeBlockHour < currentHour) {
        // Past hour
        $(this).addClass('past').removeClass('present future');
      } else if (timeBlockHour === currentHour) {
        // Current hour
        $(this).addClass('present').removeClass('past future');
      } else {
        // Future hour
        $(this).addClass('future').removeClass('past present');
      }
    });
  });


>>>>>>> 5e745b056499b4e7a4b76829ed52e56f8b95c646
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  $(document).ready(function() {
    // Get the current hour
    var currentHour = moment().hour();
    
    // Loop through each time-block
    $('.time-block').each(function() {
      // Get the id of the time-block and extract the hour part
      var timeBlockId = $(this).attr('id');
      var timeBlockHour = parseInt(timeBlockId.split('-')[1]);
      
      // Compare the time-block hour with the current hour
      if (timeBlockHour < currentHour) {
        // Past hour
        $(this).addClass('past').removeClass('present future');
      } else if (timeBlockHour === currentHour) {
        // Current hour
        $(this).addClass('present').removeClass('past future');
      } else {
        // Future hour
        $(this).addClass('future').removeClass('past present');
      }
      
      // Retrieve the user input from localStorage using the time-block id as the key
      var userInput = localStorage.getItem(timeBlockId);
      
      // Set the value of the corresponding textarea with the retrieved user input
      $(this).find('.description').val(userInput);
    });
  });

});

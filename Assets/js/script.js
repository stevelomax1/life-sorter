$(function () {
  // Function to save user input in local storage
  $(".saveBtn").on("click", function() { // jquery to get saveBtn. onclick function
    var hourId = $(this).parent().attr("id"); // get the id of the parent time-block
    var userInput = $(this).siblings(".description").val(); // get user input from textarea
    localStorage.setItem(hourId, userInput); // save user input in local storage
  });


  function updateTimeBlocks() // function to update time blocks--called in the jQuery call, primary scope
  { 
    var currentHour = dayjs().hour(); // get the current hour in 24h time
    $(".time-block").each(function() // jquery to get time-block elements. for each, run function.
    {
      var blockHour = parseInt($(this).attr("id").split("-")[1]); // extract hour from id. ex format: hour-9
      if (blockHour < currentHour) { // if blockHour is less than currentHour, proceed
        $(this).removeClass("present future").addClass("past"); // change class to past
      } else if (blockHour === currentHour) { // if blockHour is absolutely equal to currentHour, proceed
        $(this).removeClass("past future").addClass("present"); // change class to present
      } else { // otherwise it's...
        $(this).removeClass("past present").addClass("future"); // change class to future
      }
    });
  }


  updateTimeBlocks(); // run updateTimeBlocks function in the jQuery call, primary scope

  // Function to retrieve user input from local storage and set textarea values
  function renderStoredInput() { // function to apply local storage to html. called in the primary scope
    $(".time-block").each(function() { // jquery to get time-blocks. for each time-block, run function.
      var hourId = $(this).attr("id"); // jquery + dot notation to get time-block id
      var storedInput = localStorage.getItem(hourId); // pull from local storage using hourId from current time-block
      if (storedInput !== null) { // if there is stored input cooresponding with hourId
        $(this).find(".description").val(storedInput); // apply locally stored value to time-block description
      }
    });
  }

  renderStoredInput(); // run renderStoredInput in the jQuery call, primary scope


  var currentDate = dayjs().format("dddd, MMMM D, YYYY");   // get current day in specified format
  $("#currentDay").text(currentDate); // apply current day to html
});
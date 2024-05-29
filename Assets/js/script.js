$(function () {
  
  $(".saveBtn").on("click", function() { 
    var hoursId = $(this).parent().attr("id"); 
    var userInput = $(this).siblings(".description").val(); 
    localStorage.setItem(hoursId, userInput); 
  });


  function updateTimeBlocks() 
  { 
    var currentHour = dayjs().hour(); 
    $(".time-block").each(function() 
    {
      var blockHour = parseInt($(this).attr("id").split("-")[1]); 
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past"); 
      } else if (blockHour === currentHour) { 
        $(this).removeClass("past future").addClass("present"); 
      } else { 
        $(this).removeClass("past present").addClass("future"); 
      }
    });
  }


  updateTimeBlocks(); 

  
  function renderStoredInput() { 
    $(".time-block").each(function() { 
      var hoursId = $(this).attr("id"); 
      var storedInput = localStorage.getItem(hoursId); 
      if (storedInput !== null) { 
        $(this).find(".description").val(storedInput); 
      }
    });
  }

  renderStoredInput(); 


  var currentDate = dayjs().format("dddd, MMMM D, YYYY");   
  $("#currentDay").text(currentDate); 
});
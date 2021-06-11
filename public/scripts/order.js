var currentTab = 0; 


$(document).ready(function() {
  $("#minus").click(function(event) {
    zoom("out");
  });

  $("#plus").click(function(event) {
    zoom("in");
  });

  $("#myRange").on('input change', function(event) {
    $('#outputText').text($(event.currentTarget).val());
  });

  function zoom(direction) {
    var slider = $("#myRange");
    var step = parseInt(slider.attr('step'), 10);
    var currentSliderValue = parseInt(slider.val(), 10);
    var newStepValue = currentSliderValue + step;
  
    if (direction === "out") {
      newStepValue = currentSliderValue - step;
    } else {
      newStepValue = currentSliderValue + step;
    }
  
    slider.val(newStepValue).change();
  };
})




document.addEventListener("DOMContentLoaded", function(){
    // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

});

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");

  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "flex";
  }
  if (n == (x.length - 1)) {
    document.getElementById("button-text").innerHTML = "Submit";
  } else {
    document.getElementById("button-text").innerHTML = "Próximo";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


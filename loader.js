// Add this script to your existing or a new JavaScript file

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hide the loader after 3 seconds
  setTimeout(function () {
    var loaderWrapper = document.getElementById("loader-wrapper");
    loaderWrapper.style.display = "none";
  }, 3000);
});

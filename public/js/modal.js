/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('myBtn');

// When the user clicks on the openBox function, open the modal
const openBox = () => {
  modal.style.display = 'block';
}
// When the user clicks on <span> (x), close the modal
function closeBox() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

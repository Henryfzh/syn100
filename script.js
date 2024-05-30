document.getElementById('ixbq').addEventListener('click', function(event) {
  // Check if the clicked target is a link within the dropdown
  if (event.target.tagName === 'A') {
      return;  // Allow the link to be followed
  }

  var dropdown = this.querySelector('.dropdown-content');
  if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
  } else {
      dropdown.style.display = 'block';
  }
});


document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all card elements
    document.querySelectorAll('.card').forEach(function(card) {
      card.addEventListener('click', function() {
        var cardDesc = this.querySelector('.card-desc');
        cardDesc.classList.toggle('visible');
      });
    });
  });


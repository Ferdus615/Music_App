document.addEventListener('DOMContentLoaded', function() {
  // Handle the Add Artists form submission
  document.getElementById('Add-artists').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    // Convert formData to a plain object
    formData.forEach((value, key) => {
      if (key === 'explicit') {
        if (!data[key]) data[key] = [];
        data[key].push(value);
      } else if (key === 'socials') {
        data[key] = value.split(',').map(url => url.trim());
      } else if (key === 'song-url') {
        if (!data[key]) data[key] = [];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Form submitted successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    });
  });

  // Handle the Newsletter form submission
  document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    // Convert formData to a plain object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Newsletter form submitted successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    });
  });

  // Function to dynamically add song URL input fields
  window.addDynamicUrlInput = function() {
    const container = document.getElementById('url-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'song-url';
    input.className = 'song-url';
    input.placeholder = 'Enter additional song/video URL';
    container.appendChild(input);
  }
});

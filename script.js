document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Form Validation for Contact and Booking Forms
  const contactForm = document.querySelector('#contact form');
  const bookingForm = document.querySelector('#booking form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const whatsappLink = `https://wa.me/+6282258706323?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');

    alert('Your message has been sent to WhatsApp!');
    contactForm.reset();
  });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = bookingForm.querySelector('input[type="date"]').value;
    const time = bookingForm.querySelector('input[type="time"]').value;
    const service = bookingForm.querySelector('select').value;

    if (!date || !time || !service) {
      alert('Please complete all fields.');
      return;
    }

    const appointmentTime = new Date(`${date}T${time}`);
    scheduleNotification(appointmentTime);

    // Create WhatsApp booking message
    const bookingMessage = `Booking Details:%0ATanggal: ${date}%0AJam: ${time}%0AStyle: ${service}`;
    const bookingLink = `https://wa.me/+6282258706323?text=${bookingMessage}`;
    window.open(bookingLink, '_blank');

    alert('Your appointment has been booked and sent to WhatsApp!');
    bookingForm.reset();
  });

  // Simple Chat Functionality
  const chatInput = document.querySelector('#chat .chat-footer input');
const chatButton = document.querySelector('#chat .chat-footer button');
const chatBody = document.querySelector('#chat .chat-body ul');

// Function to get the current time
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Function to add a message to the chat
function addMessage(author, message) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${author} (${getCurrentTime()}):</span> <p>${message}</p>`;
  chatBody.appendChild(li);
  chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to latest message
}

// Event listener for sending message
chatButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    addMessage('You', message);
    chatInput.value = '';
  }
});

// Allow sending message with Enter key
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    chatButton.click(); // Trigger the click event of the button
    event.preventDefault(); // Prevent the default behavior (like a new line)
  }
});


  // Schedule Notification for Booking
  function scheduleNotification(appointmentTime) {
    const now = new Date();
    const timeDiff = appointmentTime - now;
    
    // Set reminder to 10 minutes before the appointment
    const reminderTime = timeDiff - (10 * 60 * 1000); // 10 minutes

    if (reminderTime > 0) {
      setTimeout(() => {
        alert('Your appointment is coming up in 10 minutes!');
      }, reminderTime);
    } else {
      alert('The appointment time is already passed or too close to schedule a reminder.');
    }
  }
});

let editingIndex = null; // Variable to track the index of the review being edited

// Function to create review element
function createReviewElement(reviewerName, reviewText, reviewRating, hasBeenEdited, index) {
    const newReview = document.createElement('div');
    newReview.classList.add('review');

    // Create review header
    const reviewHeader = document.createElement('div');
    reviewHeader.classList.add('review-header');

    const userNameElement = document.createElement('span');
    userNameElement.classList.add('user-name');
    userNameElement.textContent = reviewerName;

    const starsElement = document.createElement('div');
    starsElement.classList.add('stars');
    for (let i = 0; i < reviewRating; i++) {
        starsElement.innerHTML += '<i class="fas fa-star"></i>';
    }

    reviewHeader.appendChild(userNameElement);
    reviewHeader.appendChild(starsElement);

    // Create review text paragraph
    const reviewParagraph = document.createElement('p');
    reviewParagraph.textContent = reviewText;

    // Create a button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Create edit button only if the review has not been edited yet
    if (!hasBeenEdited) {
        const editButton = document.createElement('button');
        editButton.classList.add('edit-review');
        editButton.textContent = 'Edit';
        editButton.setAttribute('data-index', index); // Set index for editing
        editButton.addEventListener('click', () => editReview(index));
        buttonContainer.appendChild(editButton); // Append edit button to the button container
    }

    // Append header, text, and button container to the new review
    newReview.appendChild(reviewHeader);
    newReview.appendChild(reviewParagraph);
    newReview.appendChild(buttonContainer);

    return newReview;
}

// Function to handle the editing of a review
function editReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewToEdit = reviews[index];

    // Populate form fields with the review data
    document.getElementById('reviewer-name').value = reviewToEdit.reviewerName;
    document.getElementById('review-text').value = reviewToEdit.reviewText;
    document.getElementById('review-rating').value = reviewToEdit.reviewRating;
    document.getElementById('selected-rating').textContent = '⭐️'.repeat(reviewToEdit.reviewRating) + '⭐️'.repeat(5 - reviewToEdit.reviewRating);

    // Change button text to "Update"
    const submitButton = document.getElementById('submit-review');
    submitButton.textContent = 'Perbarui Ulasan';

    // Set the editing index
    editingIndex = index;
}

// Function to show notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to submit or update a review
document.getElementById('submit-review').addEventListener('click', function() {
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;
    const reviewRating = document.getElementById('review-rating').value;

    if (reviewerName && reviewText && reviewRating) {
        const reviewContainer = document.querySelector('.review-container');

        if (editingIndex !== null) {
            // Update existing review
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews[editingIndex] = { 
                reviewerName, 
                reviewText, 
                reviewRating, 
                hasBeenEdited: true // Set edited flag to true
            };
            localStorage.setItem('reviews', JSON.stringify(reviews));
            editingIndex = null; // Reset editing index
            document.getElementById('submit-review').textContent = 'Kirim Ulasan'; // Reset button text
            showNotification('Ulasan berhasil diperbarui!'); // Show success notification
        } else {
            // Create a new review element
            const newReview = createReviewElement(reviewerName, reviewText, reviewRating, false, reviewContainer.children.length);
            reviewContainer.appendChild(newReview);

            // Save the review to Local Storage
            saveReviewToLocalStorage(reviewerName, reviewText, reviewRating);
            showNotification('Ulasan berhasil dikirim!'); // Show success notification
        }

        // Clear the input fields
        document.getElementById('reviewer-name').value = '';
        document.getElementById('review-text').value = '';
        document.getElementById('review-rating').value = '';
        document.getElementById('selected-rating').textContent = 'Pilih Rating';
        
        // Reload reviews to display the updated list
        loadReviewsFromLocalStorage();
    } else {
        alert('Silakan lengkapi semua kolom!');
    }
});

// Function to save review to Local Storage
function saveReviewToLocalStorage(reviewerName, reviewText, reviewRating) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ 
        reviewerName, 
        reviewText, 
        reviewRating, 
        hasBeenEdited: false // Initial value for new reviews
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Function to load reviews from Local Storage
function loadReviewsFromLocalStorage() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewContainer = document.querySelector('.review-container');
    reviewContainer.innerHTML = ''; // Clear existing reviews
    reviews.forEach((review, index) => {
        const reviewElement = createReviewElement(review.reviewerName, review.reviewText, review.reviewRating, review.hasBeenEdited, index);
        reviewContainer.appendChild(reviewElement);
    });
}

// Load reviews when the page is loaded
window.onload = loadReviewsFromLocalStorage;

// Custom Dropdown Functionality (remains the same)
const customSelect = document.querySelector('.custom-select');
const selectedRating = document.getElementById('selected-rating');
const ratingOptions = document.getElementById('rating-options');
const reviewRatingInput = document.getElementById('review-rating');

// Toggle options display
customSelect.addEventListener('click', () => {
    ratingOptions.classList.toggle('show');
});

// Set selected rating and close options
ratingOptions.addEventListener('click', (event) => {
    if (event.target.classList.contains('option')) {
        const ratingValue = event.target.getAttribute('data-value');
        selectedRating.textContent = event.target.textContent; // Show selected rating
        reviewRatingInput.value = ratingValue; // Set hidden input value
        ratingOptions.classList.remove('show'); // Hide options
    }
});

// Close options when clicking outside
document.addEventListener('click', (event) => {
    if (!customSelect.contains(event.target)) {
        ratingOptions.classList.remove('show');
    }
});

// Function to calculate total stars
function calculateTotalStars() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  let totalStars = 0;
  
  reviews.forEach(review => {
      totalStars += Number(review.reviewRating); // Add the star rating of each review
  });
  
  return totalStars; // Return the total stars
}

// Function to load reviews from Local Storage
function loadReviewsFromLocalStorage() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const reviewContainer = document.querySelector('.review-container');
  reviewContainer.innerHTML = ''; // Clear existing reviews

  let totalStars = 0; // Initialize total stars

  reviews.forEach((review, index) => {
      const reviewElement = createReviewElement(review.reviewerName, review.reviewText, review.reviewRating, review.hasBeenEdited, index);
      reviewContainer.appendChild(reviewElement);
      totalStars += Number(review.reviewRating); // Sum the stars
  });

  // Update the total stars display
  document.getElementById('total-stars').textContent = `Total Stars: ${totalStars}`;
}






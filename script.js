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

  chatButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      const li = document.createElement('li');
      li.innerHTML = `<span>You:</span> <p>${message}</p>`;
      chatBody.appendChild(li);
      chatInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to latest message
    }
  });

  // Optional: Handle "Enter" key to send message in chat
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      chatButton.click();
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

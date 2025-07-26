const socket = io();

const container = document.getElementById('bookings-container');

socket.on('new-booking', (data) => {
  const div = document.createElement('div');
  div.classList.add('booking');
  div.innerHTML = `
    <strong>Venue:</strong> ${data.venueName}<br>
    <strong>Party Size:</strong> ${data.partySize}<br>
    <strong>Time:</strong> ${data.time}
  `;
  container.prepend(div); // Add to top
});

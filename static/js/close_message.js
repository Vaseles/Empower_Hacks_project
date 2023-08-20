const messages = document.querySelectorAll('.message');
const message_closes = document.querySelectorAll('.message_close');

// Close Message When U Click on Button
for (let i=0; i<message_closes.length; i++) {
   message_closes[i].onclick = () => {
      messages[i].style.display = 'none';
   }
   setTimeout(() => {
      messages[i].style.display = 'none';
   },  4000+(i*400))
}
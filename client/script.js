import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    // updates the text content for the loading indicator
    element.textContent += '.';

    // resets the loading indicator when it reaches three dots
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

// generates a unique ID for each message
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// generates an HTML template for a chat message bubble
function chatStripe(isAi, value, uniqueId) {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
            <div class="profile">
              <img 
                src=${isAi ? bot : user} 
                alt="${isAi ? 'bot' : 'user'}" 
              />
            </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form)

  // users chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  form.reset()

  // bots chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // gets the message
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId)

  loader(messageDiv)

}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
      handleSubmit(e)
  }
})
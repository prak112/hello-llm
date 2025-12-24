const userInput = document.getElementById("inputText")
const btn = document.getElementById("inputButton")
const outputContainer = document.getElementById("outputText")

// call OpenRouter API and pass userInput
async function callBackendApi(userPrompt) {
  const baseUrl = "https://rqq6bfkjzi.execute-api.us-east-1.amazonaws.com"
  const apiResponse = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({text: userPrompt}),
  })
  const data = await apiResponse.json()
  return data
}

// stack user input with Serverless backend response
btn.addEventListener('click', async function() {
  const vegetaReply = await callBackendApi(userInput.value)
  outputContainer.value = "You: " + userInput.value + "\n" + "Vegeta: " + vegetaReply
  userInput.value = ''
})

// add Like/Dislike counter button next to result
let count = 0
const counter = document.getElementById('count')
const likeBtn = document.getElementById('likeBtn')
const dislikeBtn = document.getElementById('dislikeBtn')
const reset = document.getElementById('resetRating')

function updateRating() {
  counter.textContent = count
}
likeBtn.addEventListener('click', () => {
  count++;
  updateRating()
})
dislikeBtn.addEventListener('click', () => {
  if(count > 0){ 
    count --
  }
  updateRating()
})
reset.addEventListener('click', () => {
  count = 0
  updateRating()
})

// toggle background color
modes = ['dark-mode', 'light-mode', 'beige-mode', 'chocolate-mode']
totalModes = modes.length
const toggleColorBtn = document.getElementById('backgroundColorBtn')
toggleColorBtn.addEventListener('click', () => {  
  let randomMode = Math.round(Math.random() * totalModes-1, 0)
  let mode = randomMode <= 0 ? 'dark-mode' : modes[randomMode]
  document.body.classList.toggle(mode)
})


// toggle button to show or hide content
const toggleBtn = document.getElementById("toggleButton")
toggleBtn.addEventListener('click', function() {
  if (outputContainer.style.display == 'none'){
    outputContainer.style.display = 'block'
    toggleBtn.textContent = 'Hide Results'   // Show content 
  }
  else{
    outputContainer.style.display = 'none'  // Hide content
    toggleBtn.textContent = 'Show Results'  
  }
})
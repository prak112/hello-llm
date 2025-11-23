
const inputContent = document.getElementById("inputText")
const btn = document.getElementById("inputButton")
const outputContainer = document.getElementById("outputText")

// stack user input
btn.addEventListener('click', function() {
  // debugger   // output will be paused for manual execution
  const newDiv = document.createElement('div')
  newDiv.className = 'newText'
  newDiv.textContent = inputContent.value
  outputContainer.appendChild(newDiv)
  inputContent.value = ''
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
const inputContent = document.getElementById("inputText")
const btn = document.getElementById("inputButton")
const outputContent = document.getElementById("outputText")

// when user adds text and clicks btn
// use btn to accept and validate inputContent from user
// append inputContent to outputContent
btn.addEventListener('click', function() {
  // debugger // output paused and step-by-step execution
  outputContent.textContent = inputContent.value
  //let p = document.createElement('p')
  //p.append(inputContent.value)
  inputContent.value = ''
})


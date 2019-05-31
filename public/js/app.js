console.log('Loading Static Javascript File !!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const form = document.querySelector('form')
const inputValue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = inputValue.value
    messageOne.textContent = 'Loading Data...'
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            } else{
                // console.log(data)
                messageOne.textContent = 'Summary ' + data.summary
                messageTwo.textContent = 'Temperature ' + data.temperature
                messageThree.textContent = 'High ' + data.high
                messageFour.textContent = 'Low ' + data.low
                console.log(data)
            }
        })
    })
})
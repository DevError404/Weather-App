console.log('JavaScript file is loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                messageOne.textContent = data.location
                
                const { description, temperature, feelslike } = data.forecast;
 
                messageTwo.textContent = `${description} It is ${temperature} degrees Celcius, feels like ${feelslike} degrees Celcius.`;
                console.log(data.forecast);
            }
        })
    })
})
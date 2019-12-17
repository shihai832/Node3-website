console.log("client site js file")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const measageOne = document.querySelector('#message-1')
let measageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const location = search.value
     
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data)=>{
        //measageTwo.textContent = data.summary 
    })
})
    measageOne.textContent = location
})
console.log('%c HI', 'color: firebrick')

// listen for DOM load
// fetch images from URL
// use fetch function to call image URL
// then 😉 parse response as JSON
// then store the message array of URLS in a variable
// then loop over that array to add those images to the DOM

document.addEventListener("DOMContentLoaded", function(event){
  console.log("loaded")

  //GET MY HTML ELEMENTS!! WAHOO
  const dogImageContainer = document.querySelector("#dog-image-container")
  const dogBreeds = document.querySelector("#dog-breeds")

  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
      return (response.json())
    })
    .then(function(parsedJsonObj) {
      parsedJsonObj.message.forEach(function(url){
        dogImageContainer.innerHTML +=
        `<div>
            <img src="${url}">
        </div>`
      })
    })// end of parsedJsonObj

    // You can declare an empty array to keep the list of dogbreeds
    let allDogbreedsArray = [];
    //FETCHING THE DOG BREEDS!!
    fetch("https://dog.ceo/api/breeds/list/all")
      //you will always get a Promise when you log the function argument.

      .then(response => response.json())
      .then(function(breedList) {
        Object.keys(breedList.message).forEach(function(key){
          dogBreeds.innerHTML += `
            <li>${key}</li>
          `
          allDogbreedsArray.push(key);
      })
    }) // end of breedlist then
    let colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#000000']

    dogBreeds.addEventListener("click", function(event){
      event.target.style.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    })

    //we are using this querySelector to select the breed dropdown.
  document.querySelector('select[name="select-breed"]').onchange=filterBreeds
    function filterBreeds(event) {
      //if we select and event target value of the select dropdown.
      //lets create another request to our server to filter this data.
      fetch("https://dog.ceo/api/breeds/list/all")
        //you will always get a Promise when you log the function argument.
        .then(response => response.json())
        .then(function(breedList) {
          const listOfDogs = Object.keys(breedList.message).map(function(key) {
            return key
          })
            const filteredDogs = listOfDogs.filter(function(dog) {
              //if the first letter of the dog string equals the value of the drop down.
              // console.log(dog[0])
              return dog[0] === event.target.value
          }) // end of filter listOfDogs
          dogBreeds.innerHTML = " "
          filteredDogs.forEach(function(filteredDog){
            dogBreeds.innerHTML += `
            <li>${filteredDog}</li>
            `
          })
        })// end of second then function
        // using equals in a loop will only return the last one if we redifine
    }

})//flase? ) // end of DOMContentLoaded

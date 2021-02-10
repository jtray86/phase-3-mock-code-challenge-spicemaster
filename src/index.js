const blendDetails = document.querySelector('#spice-blend-detail')
const url =  "http://localhost:3000/spiceblends"
const ingredianceUl = document.querySelector('.ingredients-list')
const updateFrom = document.querySelector('#update-form')
const detailImage = document.querySelector('.detail-image')
let title = document.querySelector('.title')


function fetchBlend(){
    fetch(`${url}/1`)
  .then(response => response.json())
  .then(blend => showBlend(blend));
}
fetchBlend()


function showBlend(blend){
console.log(blend)
detailImage.src = blend.image
title.innerText = blend.title
updateFrom.dataset.id = blend.id


    // blendDetails.innerHTML =
    // `<img class="detail-image" src=${blend.image} alt="Insert Name Here" />
    // <h2 class="title">${blend.title}</h2>`

    blend.ingredients.forEach(ingredient => ingredientList(ingredient))
    

}

function ingredientList(ingredient){
    console.log(ingredient)
    const ingredientLi = document.createElement('li')
    ingredientLi.dataset.id = ingredient.id
    ingredientLi.innerText = ingredient.name
   

    ingredianceUl.append(ingredientLi)
}

updateFrom.addEventListener('submit', handleUpdateForm)

function handleUpdateForm(e){

    e.preventDefault()
    title = e.target.title.value
   let blendId = e.target.dataset.id

    spiceInfo ={title}
    patchSpice(spiceInfo,blendId)
}

function patchSpice(spiceInfo,id){
    
    fetch (`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            Accept: "application/json" 
        },
        body: JSON.stringify(spiceInfo)
      })
      .then(response => response.json())
      .then(item => showBlend)

}

const addIngForm = document.querySelector("#ingredient-form")

addIngForm.addEventListener('submit', addIng)

function addIng(e){
    e.preventDefault()
    name = e.target.name.value
   let ingredientId = e.target.dataset.id

   newIngredient = {ingredientId, name}
   ingredientList(newIngredient)

}
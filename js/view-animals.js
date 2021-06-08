import { fetchMyApi } from "./fetch-animals.js"
import { addInfoBox } from "./info-box.js"

const animalList = document.querySelector(".animal-list")

printAnimals()
async function printAnimals() {
    const allAnimals = (await fetchMyApi("animals?offset=0&limit=50")).result

    allAnimals.forEach(animal => {
        const li = document.createElement('li')
        li.classList.add("list-content")

        li.innerHTML = `
            <div class="list-content__text-container">
                <h2 class="list-content__name">${animal.name}</h2>
                <h2 class="list-content__type">${animal.type}</h2>                    
            </div>
            <div class="list-content__icon-container">
                <a href="/animal-details/?id=${animal._id}&edit=true" class="list-content__edit icon"><i class="fas fa-edit"></i></a>
                <div class="list-content__delete icon" data-id="${animal._id}"><i class="fas fa-trash-alt"></i></div>                    
            </div>
            <a href="/animal-details/?id=${animal._id}" class="list-content__view"><i class="fas fa-chevron-circle-right"></i></a>`

        animalList.append(li)
    })
}

document.addEventListener('click', e => {
    if (e.target.classList.contains("list-content__delete")) addInfoBox(e.target.dataset.id)
})
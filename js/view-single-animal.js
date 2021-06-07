import { fetchMyApi } from "./fetch-animals.js"
import { addInfoBox } from "./info-box.js"

const heading = document.querySelector(".animal-details__heading") 
const table = document.querySelector(".valuepair-table")
const animalID = new URLSearchParams(window.location.search).get("id")

printSingleAnimal()
async function printSingleAnimal() {
    const animal = (await fetchMyApi(`animals/${animalID}`))

    heading.innerText = animal.name

    for (let [key, value] of Object.entries(animal)) {
        if (key !== "_id" && key !== "__v" && key !== "name") {
            const row = document.createElement('tr')
            row.classList.add("valuepair-table__row")

            if (typeof value === "object") value = value.join(", ")

            row.innerHTML = `
                <th class="valuepair-table__key">${key}:</th>
                <td class="valuepair-table__value">${value}</td>`

            table.append(row)             
        }
    }
}

document.querySelector("#deleteAnimal").addEventListener('click', () => addInfoBox(animalID))
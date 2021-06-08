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
                <th class="valuepair-table__key">${key}</th>
                <td class="valuepair-table__value">${value}</td>`

            table.append(row)             
        }
    }
}

function createAnimal() {
    const tableKeys = document.querySelectorAll(".valuepair-table__key");
    const tableValues = document.querySelectorAll(".valuepair-table__value");
    let animalObject = {};

    for (let i = 0; i < tableKeys.length; i++) {
        const tableKey = tableKeys[i].innerText.toLowerCase()
        const tableValue = tableValues[i].innerText.toLowerCase()

        if (tableKey === "colors") {
            animalObject[tableKey] = tableValue.split(", ")
        } else {
            animalObject[tableKey] = tableValue
        }
    }
    importInputsToTable()
    return animalObject
}

function importInputsToTable() {
    const tableValues = document.querySelectorAll(".valuepair-table__value");
    tableValues.forEach(value => {
        const input = document.createElement('input')
        input.setAttribute("type", "text")
        console.log(value.innerText);
        input.value = value.innerText
        value.innerText = ""
        value.append(input)
    })
}

document.querySelector("#deleteAnimal").addEventListener('click', () => addInfoBox(animalID))
document.querySelector("#editAnimal").addEventListener('click', () => {
   console.log(createAnimal()); 
})

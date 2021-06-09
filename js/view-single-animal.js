import { fetchMyApi } from "./fetch-animals.js"
import { addInfoBox } from "./info-box.js"

const heading = document.querySelector(".animal-details__heading") 
const table = document.querySelector(".valuepair-table")
const animalID = new URLSearchParams(window.location.search).get("id")
const canEdit = new URLSearchParams(window.location.search).get("edit")

init()
async function init() {
    await printSingleAnimal()
    if (canEdit === "true") importInputsToTable()    
}

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

function createAnimal(headingInput) {
    const tableKeys = document.querySelectorAll(".valuepair-table__key");
    const tableValues = document.querySelectorAll(".valuepair-table input");
    let animalObject = {};

    animalObject["name"] = headingInput.value

    for (let i = 0; i < tableKeys.length; i++) {
        const tableKey = tableKeys[i].innerText.toLowerCase()
        const tableValue = tableValues[i].value.toLowerCase()

        if (tableKey === "colors") {
            animalObject[tableKey] = tableValue.split(", ")
        }
        else {
            animalObject[tableKey] = tableValue
        }
    }
    patchAnimal(animalObject)
}

function importInputsToTable() {
    let tableValues = document.querySelectorAll(".valuepair-table__value");
    const nameHeading = document.querySelector(".animal-details__heading");
    const headingInput = document.createElement('input')

    headingInput.setAttribute("type", "text")
    headingInput.value = nameHeading.innerText
    nameHeading.innerText = ""

    nameHeading.append(headingInput)

    tableValues.forEach(value => {
        const input = document.createElement('input')

        input.setAttribute("type", "text")
        input.value = value.innerText
        value.innerText = ""

        value.append(input)
    })

    tableValues = document.querySelectorAll("input");
    tableValues[0].focus()

    addBtns(headingInput)
    if (!canEdit) enableEditing()
}

function addBtns(headingInput) {
    const div = document.createElement('div')
    div.classList.add("button-container")
    div.innerHTML = `
        <button id="saveAnimal">SAVE</button>
        <button id="cancel">CANCEL</button>
    `
    document.querySelector("main").append(div)
    document.querySelector("#saveAnimal").addEventListener("click", () => createAnimal(headingInput))
    document.querySelector("#cancel").addEventListener("click", () => { disableEditing() })
}
function disableEditing() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams) {
        urlParams.delete('edit')
        window.location.search = urlParams    
    }  
}
function enableEditing() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('edit', 'true')
    window.location.search = urlParams    
}

function patchAnimal(animalObject) {
    fetch(`http://rowabo-myapi.herokuapp.com/api/v1/animals/${animalID}`, {
        "method": "PATCH",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer asdjhfak354723ghwf2bf"
        },
        "body": JSON.stringify(animalObject)
    })
    .then(ress => {
        console.log(ress);
        disableEditing()   
    })
    .catch(err => console.error(err))
}

document.querySelector("#deleteAnimal").addEventListener('click', () => addInfoBox(animalID))
document.querySelector("#editAnimal").addEventListener('click', () => {
    if (!canEdit) importInputsToTable()
})
import { fetchMyApi } from "./fetch-animals.js"

const table = document.querySelector(".valuepair-table")
const animalID = new URLSearchParams(window.location.search).get("id")

printSingleAnimal()
async function printSingleAnimal() {
    const animal = (await fetchMyApi(`animals/${animalID}`))

    for (let [key, value] of Object.entries(animal)) {
        console.log(key);
        if (key !== "_id" && key !== "__v") {
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


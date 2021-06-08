const saveBtn = document.querySelector('#saveAnimal');
const form = document.querySelector('.form-create-animal');

if (form) form.addEventListener("submit", e => {
    e.preventDefault()
    postAnimal(createAnimal())
}) 

function postAnimal(animalObject) {
    console.log(animalObject);
    fetch(`http://rowabo-myapi.herokuapp.com/api/v1/animals`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer asdjhfak354723ghwf2bf"
        },
        "body": JSON.stringify(animalObject)
    })
    .then(ress => {
        console.log(ress);
        animalSavedMessage(animalObject)    
    })
    .catch(err => console.error(err))
}

function createAnimal() {
    const tableKeys = document.querySelectorAll(".valuepair-table__key");
    const tableValues = document.querySelectorAll("input");
    let animalObject = {};

    for (let i = 0; i < tableKeys.length; i++) {
        const tableKey = tableKeys[i].innerText.toLowerCase()
        const tableValue = tableValues[i].value.toLowerCase()

        if (tableKey === "colors") {
            animalObject[tableKey] = tableValue.split(", ")
        } else {
            animalObject[tableKey] = tableValue
        }
    }
    return animalObject
}

function animalSavedMessage(animalObject) {
    document.querySelector("main").innerHTML = `
    <h1 style="text-align:center;margin-top:3rem;">Your animal, ${animalObject.name}, has been saved!</h1>
    `
}


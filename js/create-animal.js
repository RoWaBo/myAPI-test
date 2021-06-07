
const saveBtn = document.querySelector('#saveAnimal')
const tableKeys = document.querySelectorAll(".valuepair-table__key")
const tableValues = document.querySelectorAll("input")

saveBtn.addEventListener("click", () => {
    
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

    console.log(animalObject);
})


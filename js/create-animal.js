const saveBtn = document.querySelector('#saveAnimal');
const form = document.querySelector('.form-create-animal');

if (form) form.addEventListener("submit", e => {
    e.preventDefault()
    postAnimal()
})

function postAnimal() {

    fetch(`http://rowabo-myapi.herokuapp.com/api/v1/animals`, {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer asdjhfak354723ghwf2bf"
        },
        "body": new FormData(form)
    })
        .then(async ress => {
            console.log(ress);
            const result = await ress.json()
            document.querySelector("main").innerHTML = `
                <h1 style="text-align:center;margin-top:3rem;">${result.name} the ${result.type} has been saved!</h1>`
        })
        .catch(err => console.error(err))
}
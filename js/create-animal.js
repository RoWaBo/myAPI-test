
const form = document.querySelector('.form-create-animal');

if (form) form.addEventListener("submit", e => {
    e.preventDefault()
    postAnimal()
})

async function postAnimal() {
    try {
        const req = await fetch(`http://rowabo-myapi.herokuapp.com/api/v1/animals`, {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer asdjhfak354723ghwf2bf"
            },
            "body": new FormData(form)
        })

        const res = await req.json()

        document.querySelector("main").innerHTML = `
            <h1 style="text-align:center;margin-top:3rem;">${res.name} the ${res.type} has been saved!</h1>`

    } catch (err) {
        console.error(err)
    }
}
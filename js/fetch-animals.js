console.log('script loaded');

// ==== FETCH ====
export async function fetchMyApi(myApiCollection) {
    const req = await fetch(`http://rowabo-myapi.herokuapp.com/api/v1/${myApiCollection}`)
    const res = await req.json()
    return res
}

// ==== FORM ====
const form = document.querySelector("#createAnimal");

let submitAnimal = e => {
    console.log("submit animal");
    e.preventDefault()

    const myFormData = new FormData();
    myFormData.append("type", e.target.type.value)
    myFormData.append("breed", e.target.breed.value)
    myFormData.append("name", e.target.name.value)
    myFormData.append("age", e.target.age.value)
    myFormData.append("sex", e.target.sex.value)
    myFormData.append("colors", e.target.colors.value)

    console.log(myFormData);
}

if (form) form.addEventListener("submit", submitAnimal)
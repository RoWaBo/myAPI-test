
export function addInfoBox(id) {
    const body = document.querySelector('body')

    // creating overlay
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    body.prepend(overlay)

    // creating infobox
    const div = document.createElement('div')
    div.classList.add('info-popup', `info-popup`)
    div.innerHTML = `
    <p class="info-popup__message">Are you sure you want to delete?</p>
    <div class="button-container">
        <button id="btn-cancel">CANCEL</button>
        <button id="btn-delete">DELETE</button>
    </div>
    `
    body.append(div)

    // EVENTLISTENERS
    const deleteBtn = document.querySelector("#btn-delete")
    const cancelBtn = document.querySelector("#btn-cancel")

    overlay.addEventListener('click', () => {
        overlay.remove()
        div.remove()
    })
    cancelBtn.addEventListener('click', () => {
        overlay.remove()
        div.remove()
    })
    deleteBtn.addEventListener('click', async () => {
        await fetch(`http://rowabo-myapi.herokuapp.com/api/v1/animals/${id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": "Bearer asdjhfak354723ghwf2bf"
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));

        window.location.pathname = "/" 
    })
}


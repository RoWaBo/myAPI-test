
// ==== FETCH ====
export async function fetchMyApi(myApiCollection) {
    const req = await fetch(`http://rowabo-myapi.herokuapp.com/api/v1/${myApiCollection}`)
    const res = await req.json()
    return res
}
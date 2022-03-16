let allDogs = []

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(doggos => {
            allDogs = doggos
            doggos.forEach(doggo => {
                dogBar(doggo)
            })
        })
}

function dogBar(doggo) {
    const dogBar = document.getElementById('dog-bar')
    const img = document.createElement('IMG')
    img.className = 'pic'
    const span = document.createElement("span")
    let p = document.createElement("p")
    const name = `${doggo.name}`
    img.src = `${doggo.image}`
    dogBar.append(span)
    span.append(p)
    p.append(name)
}

function dogInfo(doggo) {
    console.log(doggo)
    //     span.forEach(doggo => {
    //     span.addEventListener("click", (e) => {
    //         alert("yup")
    //     })
    // })
}

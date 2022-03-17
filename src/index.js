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
    const dogInf = document.getElementById("dog-info")
    const img = document.createElement('IMG')
    img.className = 'pic'
    img.src = `${doggo.image}`
    const span = document.createElement("span")
    span.dataset.id = doggo.id
    span.innerText = `${doggo.name}`
    const btn = document.createElement("button")
    const gob = `${doggo.isGoodDog}`

    if (gob === "true") {
        btn.innerText = ("Good Dog");
    }
    else if (gob === "false") {
        btn.innerText = ("Bad Dog");
    }
    else NaN

    span.addEventListener("click", (e) => {
        dogInf.innerHTML = ""
    })
    span.addEventListener("click", (e) => {
        dogInf.append(span.innerText)
        dogInf.append()
        dogInf.append(img)
        dogInf.append(btn)

        btn.addEventListener("click", (e) => {
            if(gob === "true")
                btn.innerText = "Bad Dog"
            else if(gob === "false")
                btn.innerText = "Good Dog"

                fetch(`http://localhost:3000/pups/`+doggo.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(gob)
                })
                .then(response => response.json())
                .then(data => {
                    console.log("success", data)
                })
                .catch((error) => {
                    console.error("error", error)
                })

        })
    })
    dogBar.append(span)
}
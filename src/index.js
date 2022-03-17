let allDogs = []
let badDogs = []

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
    const dogFilter = document.querySelector("#good-dog-filter")
    const img = document.createElement('IMG')
    img.className = 'pic'
    img.src = `${doggo.image}`
    const span = document.createElement("span")
    span.dataset.id = doggo.id
    span.innerText = `${doggo.name}`
    const btn = document.createElement("button")
    let gob = `${doggo.isGoodDog}`
    

    dogFilter.addEventListener("click", (e) => {
        let currentVal = e.target.innerText.includes("OFF")
            ? off : on
        if (currentVal) {
            e.target.innerText = "Filter good dogs: ON";
            
    }
        else {
            e.target.innerText = "Filter good dogs: OFF"

        }

    })


    if (gob === "true") {
        btn.innerText = ("Good Dog");
    }
    else if (gob === "false") {
        btn.innerText = ("Bad Dog")
        badDogs = gob
        
        
    }
    else NaN

    span.addEventListener("click", (e) => {
        dogInf.innerHTML = ""
    })
    span.addEventListener("click", (e) => {
        dogInf.append(span.innerText)
        dogInf.append(img)
        dogInf.append(btn)

        btn.addEventListener("click", (e) => {
            let currentVal = e.target.innerText.includes("Good")
                ? true : false
            if (currentVal) {
                e.target.innerText = "Bad Dog"
            }
            else {
                e.target.innerText = "Good Dog"
            }

            fetch(`http://localhost:3000/pups/` + doggo.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ isGoodDog: !currentVal })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                })
                .catch((error) => {
                    console.error("error", error)
                })

        })

    })
    dogBar.append(span)
}
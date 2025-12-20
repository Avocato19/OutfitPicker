const shuffleBtn = document.getElementById("shuffleBtn")
const cards = Array.from(document.querySelectorAll(".card-container"))

let canPick = false

const fronts = cards.map(card => card.querySelector(".card-front").innerHTML)

shuffleBtn.addEventListener("click", async () => {
    canPick = false

    cards.forEach(card => card.classList.add("flipped"))
    cards.forEach(card => card.querySelector(".card-inner").style.transform = "rotateY(180deg)")

    await delay(400)

    for (let i = 0; i < 8; i++) {
        shuffleContents()
        visualShuffle()
        await delay(250)
    }

    cards.forEach(card => card.querySelector(".card-inner").style.transform = "rotateY(180deg)")

    canPick = true
})

function shuffleContents() {
    const copy = [...cards]

    for (let i = 0; i < copy.length; i++) {
        const j = Math.floor(Math.random() * copy.length)
        if (i === j) continue
        const temp = copy[i].querySelector(".card-front").innerHTML
        copy[i].querySelector(".card-front").innerHTML = copy[j].querySelector(".card-front").innerHTML
        copy[j].querySelector(".card-front").innerHTML = temp
    }
}

function visualShuffle() {
    cards.forEach(card => {
        const inner = card.querySelector(".card-inner")
        const x = (Math.random() - 0.5) * 120
        const r = (Math.random() - 0.5) * 20
        inner.style.transform = `rotateY(180deg) translateX(${x}px) rotate(${r}deg)`
    })
}

cards.forEach(card => {
    card.addEventListener("click", () => {
        if (!canPick) return

        cards.forEach(c => {
            c.classList.add("flipped")
            c.querySelector(".card-inner").style.transform = "rotateY(180deg)"
        })

        const inner = card.querySelector(".card-inner")
        card.classList.remove("flipped")
        inner.style.transform = ""

        canPick = false
    })
})

function delay(ms) {
    return new Promise(r => setTimeout(r, ms))
}

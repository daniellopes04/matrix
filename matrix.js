const ctx = document.getElementById('canvas').getContext('2d')

let canvasWidth = window.innerWidth
let canvasHeight = window.innerHeight

let charArr = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
]

let maxCharCount = 300
let fallingCharArr = []
let fontSize = 12
let maxColumns = canvasWidth / fontSize

canvas.width = canvasWidth
canvas.height = canvasHeight

let frames = 0

class FallingChar {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx) {
        this.value = charArr[Math.floor(Math.random() * (charArr.length))].toUpperCase()
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4

        ctx.fillStyle = 'rgba(0, 255, 0)'
        ctx.font = fontSize + 'px san-serif'
        ctx.fillText(this.value, this.x, this.y)
        this.y += this.speed

        if(this.y > canvasHeight) {
            this.y = Math.random() * canvasHeight/2 - 50
            this.x = Math.floor(Math.random() * maxColumns) * fontSize
            this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4
        }
    }
}

let update = () => {
    if(fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(Math.floor(Math.random() * maxColumns) * fontSize, Math.random() * canvasHeight/2 - 50)
        fallingCharArr.push(fallingChar)
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
        fallingCharArr[i].draw(ctx)
    }

    requestAnimationFrame(update)
    frames++
}

update()

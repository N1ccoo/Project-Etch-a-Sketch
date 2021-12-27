let resetButton = document.createElement('button')
let container = document.createElement('div')
let grid = document.createElement('div')
let gridSize = document.createElement('input')
let navbar = document.createElement('nav')
let warning = document.createElement('h1')

warning.setAttribute('id','warning')
navbar.setAttribute('id','navBar')
gridSize.setAttribute('id','gridSize')
container.setAttribute('id','gridContainer')
resetButton.setAttribute('id','resetButton')
grid.setAttribute('id','grid')

gridSize.setAttribute('placeholder','Input a Number')
gridSize.setAttribute('type','number')
gridSize.setAttribute('min',1)
gridSize.setAttribute('max',100)



document.body.append(navbar)
navbar.append(resetButton,gridSize,warning)
document.body.append(container)
container.append(grid)

warning.textContent = 'Using values Higher than 200 might crash the Webpage'
resetButton.textContent = 'Reset Canvas'
resetButton.addEventListener('click',resetCanvas)
gridSize.value = 5

function resetCanvas (e) {
  let gridParam = gridSize.value
    createGridPixels(gridParam)
}


function createGridPixels (num) {

    Array.from(grid.children).forEach(item => item.remove())
    
    
    let totalPixels = num * num
    grid.style.gridTemplateColumns = `repeat(${num},1fr)`
    grid.style.gridTemplateRows =   `repeat(${num},1fr)`

    for (i=1; i <= totalPixels; i++) {
        let gridPixel = document.createElement('div')
        gridPixel.setAttribute('class','gridPixel')
        gridPixel.addEventListener('mouseenter',addColor)
        grid.append(gridPixel)
    }
    
}

function addColor(e) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let randomColor = `rgba(${r},${g},${b}, 1)`
    this.style.backgroundColor = randomColor

    this.removeEventListener('mouseenter',addColor)
    this.addEventListener('mouseenter',darken)
}

function darken(e) {
    

    let rgb = this.style.backgroundColor
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    let r = rgb[0]
    let g = rgb[1]
    let b = rgb[2]

    if (r < 5 && g < 5 && b < 5) {
        this.removeEventListener('mouseenter',darken)
        this.addEventListener('mouseenter',addColor)
    }

    let newR = r * (0.8)
    let newG = g * (0.8)
    let newB = b * (0.8)
    
    let newRGB = `rgb(${newR},${newG},${newB})`
    this.style.backgroundColor = newRGB
    
}


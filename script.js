const container=document.querySelector("#container");
container.innerHTML=""
const containerSize=400


const input=document.getElementById("gridInput");
const generateBtn=document.querySelector("#generateBtn");
generateBtn.addEventListener("click", () => {
    const Gridsize=Number(input.value);
    console.log(Gridsize)
    if (!Gridsize || Gridsize<=0) {
        alert("Enter a valid grid size")
    }
    generateGrid(Gridsize)
})


let isClicked=false;
document.body.onmousedown = (e) => {
  // Only prevent default if not clicking on an input or button
  if (!["INPUT", "BUTTON"].includes(e.target.tagName)) {
    e.preventDefault();
  }
  isClicked = true;
};

document.body.onmouseup= () => {
    isClicked=false
}

let eraserSwitch=false
let eraser=document.querySelector("#eraser");
let eraserIcon=document.querySelector(".eraser-icon");
eraser.addEventListener("click", ()=> {
    eraserSwitch = !eraserSwitch;  // Toggle true/false
    if (eraserSwitch) {
        eraserIcon.classList.add("active");
        eraserIcon.classList.remove("inactive");
    } else {
        eraserIcon.classList.add("inactive");
        eraserIcon.classList.remove("active");
    }
})

     






function generateGrid(gridSize) {
    container.innerHTML=""
    
    for (let i=0; i<gridSize; i++) {
        let row=document.createElement('div');
        let squareSize=containerSize/gridSize
        for (let j=0; j<gridSize; j++) {
            row.style.display="flex";
            container.appendChild(row);

            const square=document.createElement("div")
            square.classList.add("square");
            square.style.height=`${squareSize}px`;
            square.style.width=`${squareSize}px`;
            row.appendChild(square);

            
            
            square.addEventListener("mouseover", ()=> {
                square.classList.add("hovered")
                if (isClicked) {
                    if (!eraserSwitch) {
                        let red=Math.floor(Math.random()*(255+1));
                        let green=Math.floor(Math.random()*(255+1));
                        let blue=Math.floor(Math.random()*(255+1));
                        square.style.backgroundColor=`rgb(${red},${green},${blue})`;
                    } else {
                        square.style.backgroundColor="white"
                    }
                }
            })
            square.addEventListener("mouseout", ()=> {
                square.classList.remove("hovered")
            })
            square.addEventListener("click", ()=> {
                if (!eraserSwitch) {
                    isClicked=true;
                    let red=Math.floor(Math.random()*(255+1));
                    let green=Math.floor(Math.random()*(255+1));
                    let blue=Math.floor(Math.random()*(255+1));
                    square.style.backgroundColor=`rgb(${red},${green},${blue})`;
                    isClicked=false
                }
                else {
                    square.style.backgroundColor="white"
                }
            })
            
            square.addEventListener("dblclick", ()=> {
                square.style.backgroundColor="white";
                square.classList.add("hovered")
                isClicked=false
            })

            const reset=document.querySelector("#reset");
            reset.addEventListener("click", () => {
                square.style.backgroundColor="white";
            })


            
            
        }
    }
}

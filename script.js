document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.querySelector('#result');
    let sqaures = [];
    const width = 4;
    let score = 0;

    function createBoard() {
        for(let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            sqaures.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    function generate() {
        randomNumber = math.floor(Math.random() * sqaures.length);
        if(sqaures[randomNumber].innerHTML == 0) {
            sqaures[randomNumber].innerHTML =  2;
            checkForGameOver();
        } else {
            generate();
        }
    }


    function moveRight() {
        for(let i = 0; i<16; i++) {
            let totalOne = sqaures[i].innerHTML;
            let totalTwo = sqaures[i + 1].innerHTML;
            let totalThree = sqaures[i + 2].innerHTML;
            let totalFour = sqaures[i + 3].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filterRow = row.filter(num => num);
            let missing = 4 - filterRow.length;
            let zeros = Array(missing).fill(0);
            let newRow = zeros.concat(filterRow);

            sqaures[i].innerHTML = newRow[0];
            sqaures[i + 1].innerHTML = newRow[1];
            sqaures[i + 2].innerHTML = newRow[2];
            sqaures[i + 3].innerHTML = newRow[3];
        }
    }

    function combinRow() {
        for(let i=0; i<15; i++) {
            let combinedTotal = parseInt(sqaures[i].innerHTML) + parseInt(sqaures[i+1].innerHTML);
            sqaures[i].innerHTML = combinedTotal;
            sqaures[i+1].innerHTML = 0;
            score += combinedTotal;
            scoreDisplay.innerHTMl = score;
        }
    }
    
    function control(e) {
        if(e.keyCode === 37) {
            keyLeft();
        } else if(e.keyCode === 38) {
            Keyup();
        } else if(e.keyCode === 39) {
            keyRight();
        } else if(e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight () {
        moveRight();
        combinRow();
        moveRight();
        generate();
    }

    function keyLeft () {
        moveLeft();
        combinRow();
        moveLeft();
        generate();
    }

    function Keyup() {
        moveUp();
        combinColumn();
        moveUp();
        generate();
    }

    function keyDown () {
        moveDown();
        combinColumn();
        moveDown();
        generate();
    }

    function checkForWin() {
        for(let i = 0; i< sqaures.length; i++) {
            if(sqaures[i].innerHTML === 2048) {
                resultDisplay.innerHTML = "You Won";
                document.removeEventListener('keyup', control);
                setTimeout(() => clear(), 3000);
            }
        }
    }

    function checkForGameOver () {
        let zeros = 0;
        for(let i = 0; i<sqaures.length; i++) {
            sqaures[i].style.color = 'white';
            if(sqaures[i].innerHTML == 0) {
                zeros++;
                sqaures[i].style.color = '#afa192';
            }

            if(sqaures[i].innerHTMl== 2 || sqaures[i].innerHTML == 4) {
                sqaures[i].style.color = "#afa192";
            }
         }

         if(zeros === 0) {
            resultDisplay.innerHTML = 'Game Over';
            document.removeEventListener('keyup', control);
            setTimeout(() => clear(), 3000);
         }
    }

    function clear() {
        clearInterval(myTimer)
    }

    function addColors() {
        for(let i = 0; i<sqaures.length; i++) {
            if (sqaures[i].innerHTML == 0) sqaures[i].style.backgroundColor="#afa192"
            else if (sqaures[i].innerHTML == 2) sqaures[i].style.backgroundColor="#EFEE5D8"
            else if (sqaures[i].innerHTML == 4) sqaures[i].style.backgroundColor="EFE2CF"
            else if (sqaures[i].innerHTML == 8) sqaures[i].style.backgroundColor="F5996A"
            else if (sqaures[i].innerHTML == 16) sqaures[i].style.backgroundColor="F89868"
            else if (sqaures[i].innerHTML == 32) sqaures[i].style.backgroundColor="#F77F5C"
            else if (sqaures[i].innerHTML == 64) sqaures[i].style.backgroundColor="F65E38"
            else if (sqaures[i].innerHTML == 128) sqaures[i].style.backgroundColor="EDCF72"
            else if (sqaures[i].innerHTML == 256) sqaures[i].style.backgroundColor="EDCB5C"
            else if (sqaures[i].innerHTML == 512) sqaures[i].style.backgroundColor="EDD277"
            else if (sqaures[i].innerHTML == 1024) sqaures[i].style.backgroundColor="EFCF6C"
            else if (sqaures[i].innerHTML == 2048) sqaures[i].style.backgroundColor="EACF5B"
        }
    }
    addColors();

    let myTimer = setInterval(addColors, 50);
})

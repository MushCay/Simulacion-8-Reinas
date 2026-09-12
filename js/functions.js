var contador = 0;

function cellClick(celda) {
    if (window.getComputedStyle(celda).backgroundImage == 'none') {
        if (contador <= 8) {

            celda.style = `background-image: url('img/corona.png'); 
                background-size: 40px;
                background-repeat: no-repeat;
                background-position: center;
            `;
            ++contador; document.getElementById("contador").textContent = `${contador}`;
            bloquear(celda);
            if (contador == 8) { // Cambia a == 8 si contador inicia en 0 y se incrementó previamente
                document.getElementById("ganador").style.display = "flex";
                document.getElementById("mensaje-ganador").innerHTML = "<h2>¡Felicidades!</h2><p>Has colocado las 8 reinas correctamente.</p><button class='boton-reiniciar' onclick='reiniciarJuego()'>Reiniciar</button>";
            }

        }
    } else {
        celda.style = `background-image: none;`;
        contador--; document.getElementById("contador").textContent = `${contador}`;
        reiniciarBloqueo(celda);
        celda.onclick = function () {
            cellClick(this);

        };
    }
}

/*function cambiar(r, c) {
    var celda = document.getElementById("tablero");
    var r1 = r, c1 = c, r2 = r, c2 = c;
    var r3 = r, c3 = c, r4 = r, c4 = c;

    for (let i = 0; i < 8; i++) {
        celda.rows[r].cells[i].style.backgroundColor = "red";
        celda.rows[i].cells[c].style.backgroundColor = "red";

        if (r1 < 8 && c1 < 8) celda.rows[r1++].cells[c1++].style.backgroundColor = "red";
        if (r2 < 8 && c2 >= 0) celda.rows[r2++].cells[c2--].style.backgroundColor = "red";
        if (r3 >= 0 && c3 < 8) celda.rows[r3--].cells[c3++].style.backgroundColor = "red";
        if (r4 >= 0 && c4 >= 0) celda.rows[r4--].cells[c4--].style.backgroundColor = "red";

    }
}*/

function cambiar(r, c) {
    const tablero = document.getElementById("tablero");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
                tablero.rows[i].cells[j].style.backgroundColor = "rgb(123, 44, 191, 0.3)";
            }
        }
    }
}


function reinicio() {
    var celda = document.getElementsByTagName("td");
    for (let i = 0; i < celda.length; i++) {
        celda[i].style.backgroundColor = "";


    }
}


function bloquear(celda) {
    const row = celda.parentNode.rowIndex;
    const col = celda.cellIndex;
    const tablero = document.getElementById("tablero");
    /*Bloqueamos la columna y el renglon*/

    for (let i = 0; i < 8; i++) {
        if (i != col) {
            tablero.rows[row].cells[i].onclick = null;
        }
        if (i != row) {
            tablero.rows[i].cells[col].onclick = null;
        }

    }


    for (let i = -7; i <= 7; i++) {
        //diagonal principal
        if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i != 0) {
            tablero.rows[row + i].cells[col + i].onclick = null;
        }

        //diagonal secundaria
        if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i != 0) {
            tablero.rows[row + i].cells[col - i].onclick = null;
        }

    }

}

function reiniciarBloqueo(celda) {
    const row = celda.parentNode.rowIndex;
    const col = celda.cellIndex;
    const tablero = document.getElementById("tablero");
    /*DesBloqueamos la columna y el renglon*/

    for (let i = 0; i < 8; i++) {

        tablero.rows[row].cells[i].onclick = function () { cellClick(this); };

        tablero.rows[i].cells[col].onclick = function () { cellClick(this); };


    }

    for (let i = -7; i <= 7; i++) {
        //diagonal principal
        if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i != 0) {
            tablero.rows[row + i].cells[col + i].onclick = function () { cellClick(this); };
        }

        //diagonal secundaria
        if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i != 0) {
            tablero.rows[row + i].cells[col - i].onclick = function () { cellClick(this); };
        }

    }

}

function reiniciarJuego() {
    location.reload();
}


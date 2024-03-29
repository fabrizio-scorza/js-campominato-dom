// ascoltare il click sul bottone inizia
    // associare il bottone ad una variabile per poter interagire con lui
    const startButtonElement = document.getElementById('start-btn'); //object

    // associare il wrapper ad una variabile per poter interagire con lui
    const fieldElement = document.querySelector('.wrapper'); //object
    
    startButtonElement.addEventListener('click', startGame);



//funzione che inizia il gioco
function startGame(){
    //azzerare il campo in caso fosse già stato cliccato il bottone
    fieldElement.innerHTML ='';

    // inizializzo la variabile punteggio
    let gameScore = 0; //number
    //assegnare alla variabile il risultato della funzione che definisce la dimensione in base al livello
    let gridSide = getSize (); //number

    //invocare la funzione che genera il campo
    createField(gridSide, gameScore);
}

//funzione che ritora il lato del campo in base alla difficoltà
function getSize(){
     //ascoltare il click sul select che sceglie la difficoltà e associarne il valore ad una variabile
     const difficultySelection = document.getElementById('difficulty') //object
     const difficulty = difficultySelection.value;             

     //controllare la difficoltà per stabilire il lato del quadrato
        let difficutlySide = 10 //number 

         if (difficulty === '3'){
             difficutlySide = 7; //number
         } else if (difficulty === '2'){
             difficutlySide = 9; //number
         }

         return difficutlySide;
}

// funzione che genera il campo minato
function createField(side, point){
    //inserisco side nel css per calcolare la lunghezza della riga
    fieldElement.style.setProperty('--side', side);
    
    //dichiarare una variabile con il numero totale di elementi da creare nel DOM
    const area = side**2; //number

    //richiamo la funzione che mi genera le bombe
    const bombsAreAtCells = bombCells(area) //array

    //creare gli elementi da inserire nel DOM per ogni casella
    for(let i = 0; i < area; i++){
        //creare una variabile numero da inserire all'interno della cella
        let cellNum = i + 1; //number
        // let isABomb = false; //boolean

        //creare l'oggetto da posizionare nel DOM e inserirlo in una variabile
        const cellElement = document.createElement('div'); // object
        
        //dichiarare la classe cell come classe dell'elemento appena creato
        cellElement.className = 'cell unclicked';

        // inserire all'interno del codice html il numero della casella corrispondente 
        cellElement.innerHTML = `
            <span>${cellNum}</span> 
            <img src="./css/img/rasengan500px.png" alt="">
            `;      
     
        //aggiungere l'elemento creato all'interno del campo
        fieldElement.append(cellElement);

        // scorro l'array e confronto ogni numero con l'attuale numero di cella
        // for (let j = 0; j < bombsAreAtCells.length; j++){
        //     if (cellNum === bombsAreAtCells[j]){
        //         isABomb = true; //boolean
        //     }
        // }  
        // if(isABomb === true){
        //     //inserisco la classe bomba
        //     cellElement.classList.add('bomb');
        // }

        //ascoltare il click sulla casella 
        cellElement.addEventListener('click', function(){ 
            //se la casella è una casella è non cliccata
            if(cellElement.classList.contains('unclicked')){ 
                // rimuovo la classe non cliccata                               
                cellElement.classList.remove('unclicked');
                //aggingo la classe cliccata
                cellElement.classList.add('clicked');
                //incremento il punteggio
                point++;

                //se la casella contiene una bomba
                // if(cellElement.classList.contains('bomb')){
                if(bombsAreAtCells.includes(cellNum)) {
                    // aggiungo la classe bomba
                    cellElement.classList.add('bomb');

                    // sottraggo l'ultimo click
                    point-=1;       

                    //allerto il giocatore che ha perso
                    alert(`HAI PERSO. Il tuo punteggio è di ${point}.`)
                    
                    //richiamo la funzione endgame
                    endGame(bombsAreAtCells);
                }
            }
        })
    }
}

// funzione che genera un array di 16 numeri casuali univoci da 1 al massimo delle caselle del campo
function bombCells (rangeOfCells){ 
    // inizializzo l'array 
    let cellNumbers = []; //array

    //finchè l'array non ha 16 numeri univoci
    do {
        //invoco una funzione che mi crea un numero random da un min a un max
        const cellNum =  randomNumberMinMax(1, rangeOfCells); //number

        //dichiaro una variabile di controllo per vedere se il numero è un duplicato
        let isDuplicate = false; //boolean

        for (let i = 0; i < cellNumbers.length; i++){
            //controllo se il numero generato è già presente in tutto l'array
            if (cellNum === cellNumbers[i]){
                isDuplicate = true;
            }          
        }
        // se non è presente lo aggiungo all'array
        if(isDuplicate === false){
            cellNumbers.push(cellNum); 
        }

    } while (cellNumbers.length !== 16)

    //restituisco l'array con la posizione delle bombe
    return cellNumbers;
}

//funzione che mi genera un numero random intero tra un minimo e un massimo estremi compresi
function randomNumberMinMax(min, max){
    const minCeiled = Math.ceil(min); //number
    const maxFlored = Math.floor(max); //number
    const randomNumber = Math.floor(Math.random() *(maxFlored-minCeiled + 1) + minCeiled);
    return randomNumber; //number
}

// funzione che al termine della partita scopre tutte le caselle con le bombe presenti
function endGame(bombsArray){

// associo ad una variabile la collezione di elementi con classe unclicked
const remainingUnclickedCells = document.querySelectorAll('.cell');
    for(i = 0; i < remainingUnclickedCells.length; i++){
        // per ogni elemento rimuovo la classe unclicked
        remainingUnclickedCells[i].classList.remove('unclicked');
        //controllo se era una bomba e la coloro

        if (bombsArray.includes(i+1)){
            remainingUnclickedCells[i].classList.add('bomb');
            remainingUnclickedCells[i].classList.add('clicked');
        }
    }
}
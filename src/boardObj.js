
class BoardObj{
        constructor(){
            this.height = 56;
            this.width = 56;
            this.matrix = this.createMatrix();
            this.nextPositions = new Array();
            this.getStartPosition();
            this.isEmpty = true;
    }

    createMatrix(){
        let matrix = new Array(this.width);

        for(let i=0; i<this.width; i++){
            matrix[i] = new Array (this.height);
            for(let j=0; j<this.height; j++){
                matrix[i][j] = new Cell();       
            }
        }

        return matrix;
    }

    getStartPosition(){
        this.nextPositions.push({top: "45%", left: "45%", angle: "horizontal270"});
    }

    getPossibleMoves(selectedDominoTile){

    }

    updateBoard(selectedTile, cell){
            if(selectedTile.angle === "vertical"){
                this.matrix[cell.row][cell.col-1].possibleInserts.bottom = selectedTile.values.top;
                this.matrix[cell.row][cell.col+1].possibleInserts.top = selectedTile.values.bottom;

            }
            else if(selectedTile.angle === "horizontal90"){
                
            }
            else if(selectedTile.angle === "horizontal270"){
                
            }
            else{
                this.matrix[cell.row][cell.col-1].possibleInserts.top = selectedTile.values.top;
                this.matrix[cell.row][cell.col+1].possibleInserts.bottom = selectedTile.values.bottom;
            }
            this.matrix[cell.row][cell.col].dominoTile = selectedTile;
            this.matrix[cell.row][cell.col].dominoTile = true;
            console.log(this.matrix);
     }
}

class Cell{
    constructor(){
        this.isOccupied = false;
        this.possibleInserts = {
            left:null,
            right:null,
            top:null,
            bottom:null
        }
        this.dominoTile;
    }
}

export let boardObj = new BoardObj();
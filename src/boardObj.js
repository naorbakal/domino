
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
                this.matrix[cell.row-1][cell.col].possibleInserts.top = selectedTile.values.top;
                this.matrix[cell.row+1][cell.col].possibleInserts.bottom = selectedTile.values.bottom;

            }
            else if(selectedTile.angle === "horizontal90"){
                this.matrix[cell.row][cell.col-1].possibleInserts.right = selectedTile.values.bottom;
                this.matrix[cell.row][cell.col+1].possibleInserts.left = selectedTile.values.top;

            }
            else if(selectedTile.angle === "horizontal270"){
                this.matrix[cell.row][cell.col-1].possibleInserts.right = selectedTile.values.top;
                this.matrix[cell.row][cell.col+1].possibleInserts.left = selectedTile.values.bottom;

            }
            else{
                this.matrix[cell.row-1][cell.col].possibleInserts.bottom = selectedTile.values.top;
                this.matrix[cell.row+1][cell.col].possibleInserts.top = selectedTile.values.bottom;
            }

            if(selectedTile.isDouble === true){
                if(selectedTile.angle === "vertical" || selectedTile.angle === "upsideDown"){
                    this.matrix[cell.row][cell.col-1].possibleInserts.right = selectedTile.values.top;
                    this.matrix[cell.row][cell.col+1].possibleInserts.left = selectedTile.values.bottom;
                }
                else{
                    this.matrix[cell.row-1][cell.col].possibleInserts.bottom = selectedTile.values.top;
                    this.matrix[cell.row+1][cell.col].possibleInserts.top = selectedTile.values.bottom;
                }
            }

            this.matrix[cell.row][cell.col].dominoTile = selectedTile;
            this.matrix[cell.row][cell.col].isOccupied = true;
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
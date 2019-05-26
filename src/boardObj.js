
class BoardObj{
        constructor(){
            this.height = 56;
            this.width = 56;
            this.matrix = this.createMatrix();
            this.possibleMoves = new Array();
            this.startPos = {
                angle: "horizontal270",
                top: 40,
                left:45
            }
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
    getPossibleMoves(selectedTile){
        this.possibleMoves = new Array();
        for (var i=0;i<this.height;i++){    
            for (var j=0; j<this.width; j++){
                if(this.matrix[i][j].accessible === true){
                    if(selectedTile.values.top === this.matrix[i][j].possibleInserts.top){
                        this.possibleMoves.push({angle: "vertical", col:j, row:i,position:this.calculateOnBoardPosition(i,j,"top")});                     
                    }
                    if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.bottom){
                        this.possibleMoves.push({angle: "vertical", col:j, row:i, position: this.calculateOnBoardPosition(i,j,"bottom")});      
                    }
                    if(selectedTile.values.top === this.matrix[i][j].possibleInserts.right){
                        this.possibleMoves.push({angle: "horizontal90", col:j, row:i, position: this.calculateOnBoardPosition(i,j,"right")});
                    }
                    if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.left){
                        this.possibleMoves.push({angle: "horizontal90", col:j, row:i, position: this.calculateOnBoardPosition(i,j,"left")});
                    }
                    if(selectedTile.values.top === this.matrix[i][j].possibleInserts.left){                      
                            this.possibleMoves.push({angle: "horizontal270", col:j, row:i,position: this.calculateOnBoardPosition(i,j,"left")});   
                    }
                    if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.right){
                            this.possibleMoves.push({angle: "horizontal270", col:j, row:i,position: this.calculateOnBoardPosition(i,j,"right")});   
                    }

                    if(selectedTile.values.top === this.matrix[i][j].possibleInserts.bottom){
                            this.possibleMoves.push({angle: "upsideDown", col:j, row:i, position: this.calculateOnBoardPosition(i,j,"bottom")});                       
                    }
                    if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.top){
                            this.possibleMoves.push({angle: "upsideDown", col:j, row:i, position: this.calculateOnBoardPosition(i,j,"bottom")});                       
                    }
                }
            }
        }  
    }

    calculateOnBoardPosition(row,col,direction){
        let top, left;

        if (direction === "top"){
            top = this.matrix[row-1][col].dominoTile.position.top - 6;
            left = this.matrix[row-1][col].dominoTile.position.left;
        }
        else if(direction === "bottom"){
            top = this.matrix[row+1][col].dominoTile.position.top + 6;
            left = this.matrix[row+1][col].dominoTile.position.left;
        }
        else if(direction === "right"){
            top = this.matrix[row][col+1].dominoTile.position.top;
            left = this.matrix[row][col+1].dominoTile.position.left - 12;
        }
        else{ //left
            top = this.matrix[row][col-1].dominoTile.position.top;
            left = this.matrix[row][col-1].dominoTile.position.left + 3;
        }

        return {top:top, left:left};
    }

    updateBoard(selectedTile, cell){

        if(selectedTile.angle === "vertical" || selectedTile.angle === "upsideDown"){
            if(selectedTile.angle === "vertical"){
                this.matrix[cell.row-1][cell.col].possibleInserts.bottom = selectedTile.values.top;
                this.matrix[cell.row+1][cell.col].possibleInserts.top = selectedTile.values.bottom;
            }
            else{ //upsideDown
                this.matrix[cell.row-1][cell.col].possibleInserts.bottom = selectedTile.values.bottom;
                this.matrix[cell.row+1][cell.col].possibleInserts.top = selectedTile.values.top;
            }
            this.matrix[cell.row-1][cell.col].accessible = true;
            this.matrix[cell.row+1][cell.col].accessible = true;

            if(selectedTile.isDouble === true){
                this.matrix[cell.row][cell.col-1].possibleInserts.right = selectedTile.values.top;
                this.matrix[cell.row][cell.col+1].possibleInserts.left = selectedTile.values.bottom;
                this.matrix[cell.row][cell.col-1].accessible = true;
                this.matrix[cell.row][cell.col+1].accessible = true;
            }
        }
        else{ // horizontal90/270
            if(selectedTile.angle === "horizontal90"){
                this.matrix[cell.row][cell.col-1].possibleInserts.right = selectedTile.values.bottom;
                this.matrix[cell.row][cell.col+1].possibleInserts.left = selectedTile.values.top;
            }
            else{ //270
                this.matrix[cell.row][cell.col-1].possibleInserts.right = selectedTile.values.top;
                this.matrix[cell.row][cell.col+1].possibleInserts.left = selectedTile.values.bottom;
            }
            this.matrix[cell.row][cell.col-1].accessible = true;
            this.matrix[cell.row][cell.col+1].accessible = true;

            if(selectedTile.isDouble === true){
                this.matrix[cell.row-1][cell.col].possibleInserts.bottom = selectedTile.values.top;
                this.matrix[cell.row+1][cell.col].possibleInserts.top = selectedTile.values.bottom;
                this.matrix[cell.row-1][cell.col].accessible = true;
                this.matrix[cell.row+1][cell.col].accessible = true;
            }
        }

        this.matrix[cell.row][cell.col].dominoTile = selectedTile;
        this.matrix[cell.row][cell.col].isOccupied = true;
        this.matrix[cell.row][cell.col].accessible = false;
        console.log(this.matrix);
     }

}

class Cell{
    constructor(){
        this.isOccupied = false;
        this.accessible = false;
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
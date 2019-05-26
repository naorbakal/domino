
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
        let angle;
        for (var i=0;i<this.height;i++){    
            for (var j=0; j<this.width; j++){
                if(this.matrix[i][j].accessible === true){
                    if(selectedTile.values.top === this.matrix[i][j].possibleInserts.top){
                        angle = selectedTile.isDouble === true ? "horizontal90" : "vertical";
                        this.possibleMoves.push({angle: angle, col:j, row:i,position:this.calculateOnBoardPosition(i,j,"top",selectedTile.isDouble)});                     
                    }
                    else if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.bottom){
                        angle = selectedTile.isDouble === true ? "horizontal90" : "vertical";
                        this.possibleMoves.push({angle: angle, col:j, row:i, position: this.calculateOnBoardPosition(i,j,"bottom",selectedTile.isDouble)});      
                    }
                    else if(selectedTile.values.top === this.matrix[i][j].possibleInserts.right){
                        angle = selectedTile.isDouble === true ? "vertical" : "horizontal90";
                        this.possibleMoves.push({angle: angle, col:j, row:i, position: this.calculateOnBoardPosition(i,j,"right",selectedTile.isDouble)});
                    }
                    else if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.left){
                        angle = selectedTile.isDouble === true ? "vertical" : "horizontal90";
                        this.possibleMoves.push({angle: angle, col:j, row:i, position: this.calculateOnBoardPosition(i,j,"left", selectedTile.isDouble)});
                    }
                    else if(selectedTile.values.top === this.matrix[i][j].possibleInserts.left){
                        angle = selectedTile.isDouble === true ? "vertical" : "horizontal270";                      
                            this.possibleMoves.push({angle: angle, col:j, row:i,position: this.calculateOnBoardPosition(i,j,"left", selectedTile.isDouble)});   
                    }
                    else if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.right){
                        angle = selectedTile.isDouble === true ? "vertical" : "horizontal270";
                        this.possibleMoves.push({angle: angle, col:j, row:i,position: this.calculateOnBoardPosition(i,j,"right", selectedTile.isDouble)});   
                    }

                    else if(selectedTile.values.top === this.matrix[i][j].possibleInserts.bottom){
                        angle = selectedTile.isDouble === true ? "horizontal90" : "updsideDown";
                        this.possibleMoves.push({angle: angle, col:j, row:i, position: this.calculateOnBoardPosition(i,j,"bottom",selectedTile.isDouble)});                       
                    }
                    else if(selectedTile.values.bottom === this.matrix[i][j].possibleInserts.top){
                        angle = selectedTile.isDouble === true ? "horizontal90" : "upsideDown";
                        this.possibleMoves.push({angle: angle, col:j, row:i, position: this.calculateOnBoardPosition(i,j,"top", selectedTile.isDouble)});                       
                    }
                
                }
            }
        }  
    }

    calculateOnBoardPosition(row,col,direction, isDouble){
        let top, left;

        if (direction === "top"){
            top = this.matrix[row-1][col].dominoTile.position.top + 6;
            if(isDouble === false){
                left = this.matrix[row-1][col].dominoTile.position.left;
            }
            else{
                left = this.matrix[row-1][col].dominoTile.position.left - 2;
            }
        }
        else if(direction === "bottom"){
            top = this.matrix[row+1][col].dominoTile.position.top - 6;
            if(isDouble === false){
                left = this.matrix[row+1][col].dominoTile.position.left;
            }
            else{
                left = this.matrix[row+1][col].dominoTile.position.left - 2;
            }
        }
        else if(direction === "right"){
            left = this.matrix[row][col+1].dominoTile.position.left - 13;
            if(isDouble === false){
                top = this.matrix[row][col+1].dominoTile.position.top;
            }
            else{
                top = this.matrix[row][col+1].dominoTile.position.top + 3 ;
            }
            
        }
        else{ //left
            left = this.matrix[row][col-1].dominoTile.position.left + 60;
            if(isDouble === false){
                top = this.matrix[row][col-1].dominoTile.position.top;
            }
            else{
                top = this.matrix[row][col-1].dominoTile.position.top;
            }          
        
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
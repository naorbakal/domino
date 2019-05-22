
class BoardObj{
        constructor(){
            this.height = 102;
            this.width = 102;
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
        this.nextPositions.push({top: "45%", left: "45%", angle: "horizontal"});
    }

    getNextPositions(){
        
    }
}

class Cell{
    constructor(){
        this.number;
        this.dominoTile;
    }
}

export let boardObj = new BoardObj();
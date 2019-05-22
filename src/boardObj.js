
class BoardObj{
        constructor(){
            this.height;
            this.width;
            this.matrix;
    }

    createMatrix(height,width){
        this.height = height;
        this.width = width;
        
    }

}

class cell{
    constructor(){
        this.number;
        this.dominoTile;
    }
}
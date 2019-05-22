
class DominoTileObj{
    constructor(top, bottom){ 
        this.angle="vertical",
        this.selected = false;
        this.position={
            top:null,
            left:null
        }
        this.location="deck",
        this.values={
            top:top,
            bottom:bottom
        }   
    }
}

export default DominoTileObj;
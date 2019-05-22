
class DominoTileObj{
    constructor(top, bottom){ 
        this.angle="vertical",
        this.position={
            x:null,
            y:null
        }
        this.location="deck",
        this.values={
            top:top,
            bottom:bottom
        }   
    }
}

export default DominoTileObj;
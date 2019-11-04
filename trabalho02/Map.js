function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 21,
        COLUMNS: 21,
        SIZE: 32
    }
    Object.assign(this, exemplo, modelo);
    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0, dist:999 };
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c], dist:999 };
            }
        }
    }
}

Map.prototype.desenhar = function (ctx) {
    var cor = "white";
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {
                case 0:
                    cor = "black";
                    break;
                case 1:
                    cor = "darkgrey";
                    break;
                default:
                    cor = "black";
            }
            ctx.fillStyle = cor;
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            ctx.strokeStyle = "black";
            ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            
            //desenhar distancia
            //ctx.fillStyle = "white";
            //ctx.fillText(this.cells[c][l].dist, c * this.SIZE+10, l * this.SIZE + 20   );
        }
    }
}

Map.prototype.distMarca= function(c, l, d){
    if( c<0 || c>=this.COLUMNS
        || 
        l<0 || l>=this.LINES
        
    ){
        return
    }
        if(this.cells[c][l].dist<d
        || 
        this.cells[c][l].tipo == 1){
            return
        }

  
        this.cells[c][l].dist = d;

        this.distMarca(c+1, l, d+1);
        this.distMarca(c-1, l, d+1);
        this.distMarca(c, l-1, d+1);
        this.distMarca(c, l+1, d+1);
    
}
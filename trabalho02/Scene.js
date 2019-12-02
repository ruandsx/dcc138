function Scene(params) {
    var exemplo ={
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        gameover: 0,
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    this.sprites.push(sprite);
    sprite.scene = this;
};

Scene.prototype.desenhar = function(){
    for(var i = 0; i<this.sprites.length; i++){
    //if(this.sprites[i].props.tipo!="ponto")
        this.sprites[i].desenhar(this.ctx);
    }  
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].props.tipo=="pc")
            this.sprites[i].mudarDirecao(dt);
        else
            this.sprites[i].mover(dt);
    }  
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].comportar){
            this.sprites[i].comportar();
        }
    }  
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.checaColisao = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].morto){
            this.toRemove.push(this.sprites[i]);
        }
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="npc"){
                    
                    this.sprites[i].vx = 0;
                    this.sprites[i].vy = 0;
                    this.sprites[i].x = 48;
                    this.sprites[i].y = 622;
                    this.sprites[i].vidas -= 1;

                    this.sprites[j].vx = 0;
                    this.sprites[j].vy = 0;
                    this.sprites[j].x = 336;
                    this.sprites[j].y = 300;

                    if(this.sprites[i].vidas == 0){
                        this.gameover = 1;
                    }
                }
                else 
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="ponto"){
                    this.sprites[i].pontos += 10;
                    this.toRemove.push(this.sprites[j]);
                }
            }
        }
    }  
};

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if(idx>=0){
            this.sprites.splice(idx,1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.desenharMapa = function () {
    this.map.desenhar(this.ctx);
}

Scene.prototype.passo = function(dt){
    this.limpar();
    this.desenharMapa();
    this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    this.removeSprites();
}
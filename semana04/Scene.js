class Scene {
  constructor(construtor) {
    var {w = 800, h = 600, contexto = null, sprites = [], comporta = undefined} = construtor;
    this.w = w;
    this.h = h;
    this.contexto = contexto;
    this.sprites = sprites;
    this.comporta = comporta;
  }

  adicionar(sprite){
    this.sprites.push(sprite);
  }
  desenhar(){
    for(let i=0;i<this.sprites.length;i++){
      this.sprites[i].desenhar(this.contexto);
    }
  }
  mover(dt) {
    for(let i=0;i<this.sprites.length;i++){
      this.sprites[i].mover(dt);
    }
  }
  comportar() {
    for(let i=0;i<this.sprites.length;i++){
      if(this.sprites[i].comporta){
        this.sprites[i].comporta();
      }
    }
  }
  limpar() {
    this.contexto.clearRect(0,0, this.w, this.h);
  }
  passo(dt){
    this.limpar();
    this.comportar();
    this.mover(dt);
    this.desenhar();
  }

}


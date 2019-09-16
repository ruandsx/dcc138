class Scene {
  constructor(construtor) {
    
    var {w = 800, h = 600, contexto = null, sprites = [], comporta = undefined} = construtor;
    this.w = w;
    this.h = h;
    this.contexto = contexto;
    this.sprites = sprites;
    this.comporta = comporta;
    this.tempo = 0;
  }
  
  adicionar(sprite){
    this.sprites.push(sprite);
  }
  desenhar(){
    ctx.drawImage(fundo,0,0);
    ctx.drawImage(player,this.sprites[0].x - 20,this.sprites[0].y-15);
    ctx.drawImage(chao,0,400);
    
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Pontuação : "+this.sprites[0].score,10,canvas.height-50);
    
    for(let i=0;i<this.sprites.length;i++){
      this.sprites[i].desenhar(this.contexto);
    }
  }
  mover(dt) {
      const min = 0;
      const max = 300;

      if(this.sprites[1].foraTela){
        // height = 400;
        // primeiro, numero random de 0  ate 300
        // segundo, nada ou o que sobrar
         this.sprites[1].h= Math.floor(Math.random() * (+max - +min)) + +min;;
         this.sprites[1].y= this.sprites[1].h/2;
         this.sprites[1].foraTela = 0;

         this.sprites[2].h= 400 - this.sprites[1].h - 100;
         this.sprites[2].y= this.sprites[1].h + min + this.sprites[2].h/2 + 100;
         this.sprites[2].foraTela = 0;
      }if(this.sprites[1].x <= this.sprites[0].x){
        this.sprites[0].score+= parseInt(dt *100);
      }
      if(this.sprites[3].foraTela){

        this.sprites[3].h= Math.floor(Math.random() * (+max - +min)) + +min;;
        this.sprites[3].y= this.sprites[3].h/2;
        this.sprites[3].foraTela = 0;

        this.sprites[4].h= 400 - this.sprites[3].h - 100;
        this.sprites[4].y= this.sprites[3].h + min + this.sprites[4].h/2 + 100;
        this.sprites[4].foraTela = 0;
      }if(this.sprites[3].x <= this.sprites[0].x){
        this.sprites[0].score+= parseInt(dt *100);
      }

    //colisao
    for(let i=1;i<this.sprites.length;i++){
      if( this.sprites[0].x < this.sprites[i].x + this.sprites[i].w &&
        this.sprites[0].x +  this.sprites[0].w > this.sprites[i].x &&
        this.sprites[0].y < this.sprites[i].y + this.sprites[i].h &&
        this.sprites[0].y +  this.sprites[0].h > this.sprites[i].y) {
       // this.sprites[0].perdeu=1;
      }
    }

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


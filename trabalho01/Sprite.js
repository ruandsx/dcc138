class Sprite {
  constructor(construtor) {
    var { x = 0, y = 0, w = 10, h = 10, a = 0,vx = 0, vy = -10, va = 0, cano=0, cor = "blue", comporta = undefined} = construtor;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.cor = cor;
    this.comporta = comporta;
    this.perdeu = 0;
    this.cano = cano;
    this.score = 0;
    this.foraTela = 0;
  }

  desenhar(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    if(this.cano!==0){
      ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
      ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
   }
   ctx.restore();
  }
  mover(dt) {
    if(this.cano!==0){
      this.x -= 2;
      if(this.x < -50){ // logica para o cano voltar diferente
        this.foraTela = 1;
        this.x = 300;
      }
    }else{
      if(this.y>=400 - this.h/2 || this.y<0){
        this.y = 10;
        this.perdeu = 1;
      }    
      this.y = this.y - this.vy*0.4;
  }
  }
}


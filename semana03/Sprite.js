class Sprite {
  constructor(construtor) {
    var { x = 0, y = 0, w = 30, vx = 0, vy = 0, cor = "yellow"} = construtor;
    this.x = x;
    this.y = y;
    this.w = w;
    this.vx = vx;
    this.vy = vy;
    this.imune = 0;
    this.cor = cor;
  }
  desenhar(ctx) {
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "black";
    if(this.imune > 0){
      ctx.globalAlpha = 0.5 * Math.cos(20*this.imune);
      ctx.fillStyle = "red";
    }
    ctx.fillRect(this.x, this.y, this.w, this.w);
    ctx.fillStyle = "blue";
    ctx.globalAlpha = 1;
  }
  mover(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    if(this.imune > 0){
      this.imune = this.imune - 1*dt;
    }
    if(this.atirando > 0){
      this.atirando = this.atirando - 1*dt;
    }
  }
  colidiuCom(alvo) {
    if (alvo.x + alvo.w < this.x)
      return false;
    if (alvo.x > this.x + this.w)
      return false;
    if (alvo.y + alvo.w < this.y)
      return false;
    if (alvo.y > this.y + this.w)
      return false;
    return true;
  }
  perseguir(opcoes) {
    this.vx = 0.5 * (opcoes.alvo.x - this.x);
    this.vx = 20 * Math.sign(opcoes.alvo.x - this.x);
    this.vy = 0.5 * (opcoes.alvo.y - this.y);
  }
  controlePorTeclas(opcoes) {
    if(opcoes.teclas.esquerda) { this.vx = -50}
    if(opcoes.teclas.direita) {this.vx = 50}
    if(!opcoes.teclas.esquerda && !opcoes.teclas.direita){
      this.vx = 0;
    } 
    if(opcoes.teclas.cima) { this.vy = -50}
    if(opcoes.teclas.baixo) {this.vy = 50}
    if(!opcoes.teclas.cima && !opcoes.teclas.baixo){
      this.vy = 0;
    } 
  }
  /*perseguir(alvo) {
    this.vx = 0.5 * (alvo.x - this.x);
    this.vx = 20 * Math.sign(alvo.x - this.x);
    this.vy = 0.5 * (alvo.y - this.y);
  }
  controlePorTeclas(teclas) {
    if(teclas.esquerda) { this.vx = -50}
    if(teclas.direita) {this.vx = 50}
    if(teclas.cima) { this.vy = -50}
    if(teclas.baixo) {this.vy = 50}
  }*/
}


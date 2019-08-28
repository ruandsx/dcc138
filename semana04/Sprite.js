class Sprite {
  constructor(construtor) {
    var { x = 0, y = 0, w = 10, h = 10, vx = 0, vy = 0, cor = "blue", imune = 0, atirando = 0, comporta = undefined} = construtor;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.cor = cor;
    this.imune = imune;
    this.atirando = atirando;
    this.comporta = comporta;
  }

  desenhar(ctx) {
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
  mover(dt) {
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }
}


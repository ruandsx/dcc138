class Sprite {
  constructor(construtor) {
    var { x = 0, y = 0, w = 10, h = 10, a = 0,vx = 0, vy = 0, va = 0, cor = "blue", imune = 0, atirando = 0, comporta = undefined} = construtor;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    this.vx = vx;
    this.vy = vy;
    this.va = va;
    this.cor = cor;
    this.imune = imune;
    this.atirando = atirando;
    this.comporta = comporta;
  }

  desenhar(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();
  }
  mover(dt) {
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
    this.a = this.a + this.va*dt;
  }
}


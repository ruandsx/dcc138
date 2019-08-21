class Tecla {
  constructor(construtor) {
    var { x = 0, y = 0, w = 30, h = 30, vx = 0, vy = 0, } = construtor;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.apagado = 0;
  }
  desenhar(ctx) {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  mover(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
  }
  apagar(ctx){
    ctx.clearRect(this.x, this.y, this.w, this.h);
  }
  click(){
    canvas.addEventListener('click', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      if(((x > this.x + this.w) || (x < this.x)) && ((y > this.y + this.h) || (y < this.y)))
        return;
      else
        this.apagado = 1;
        return;
    })
  }
}
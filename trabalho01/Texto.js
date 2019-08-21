class Texto {
  constructor(construtor) {
    var { txt = "", x=0, y = 0 } = construtor;
    this.txt = txt;
    this.x = x;
    this.y = y;
  }
  desenhar(ctx, fps) {
    ctx.fillStyle = "black";
    ctx.fillText(this.txt+parseInt(fps), this.x, this.y);
  }
}
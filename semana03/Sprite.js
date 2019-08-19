function Sprite(construtor) {
  var {
  x=0,
  y=0,

  w=30,

  vx=0,
  vy=0,
  } = construtor;

  this.x = x;
  this.y = y;
  this.w = w;
  this.vx = vx;
  this.vy = vy;
}

Sprite.prototype = new Sprite();
Sprite.constructor = Sprite();

Sprite.prototype.desenhar = function (ctx) {
  ctx.fillStyle = "blue";
  ctx.strokeStyle="black";
  ctx.fillRect(this.x,this.y,this.w, this.w);
}

Sprite.prototype.mover = function(dt){
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
}
Sprite.prototype.colidiuCom = function(alvo){
  if(alvo.x + alvo.w < this.x) return false;
  if(alvo.x > this.x + this.w) return false;
  if(alvo.y + alvo.w < this.y) return false;
  if(alvo.y > this.y + this.w) return false;

  return true;
}
function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        h: 10,
        w: 10,
        a: 0,
        va: 0,
        vm: 0,
        color: "yellow",
        direcao: "d",
        imune: 0,
        vidas: 3,
        pontos: 0,
        props: {},
        comportar: undefined,
        scene: undefined
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    if(this.props.tipo=="pc"){
        switch(this.direcao){
            case "d":
                break;
            case "c":
                ctx.rotate(-Math.PI/2);
                break;
            case "e":
                ctx.rotate(Math.PI);
                break;
            case "b":
                ctx.rotate(Math.PI / 2);
                break;
        }
    }

 
    if(this.props.tipo != "pc"){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    }

    if(this.props.tipo == "pc"){
        ctx.drawImage(
            pc.imagem==1?this.scene.assets.img("playerM"):pc.imagem==2?this.scene.assets.img("playerA"):this.scene.assets.img("playerF"),
            -this.w/2,
            -this.h/2,
            this.w,
            this.h 
        );
    }

    if(this.props.tipo == "npc"){
        ctx.drawImage(
            this.direcao == "d" || this.direcao == "e" ?this.scene.assets.img("redL"): this.direcao == "c"?this.scene.assets.img("redC"):this.scene.assets.img("redB"),
            -this.w/2,
            -this.h/2,
            this.w,
            this.h 
        );
    }

    ctx.restore();
};

Sprite.prototype.mover = function (dt) {
    this.moverOrtogonal(dt);
}

Sprite.prototype.moverOrtogonal = function (dt) {
    //this.a = this.a + this.va*dt;

    this.vx = this.vx + this.ax * dt - this.vx * 0.9 * dt;
    this.vy = this.vy + this.ay * dt /*+ 120 * dt*/;


    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}

Sprite.prototype.mudarDirecao = function (dt) {
    //this.vx = this.vx * dt;
    //this.vy = this.vy * dt;

    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    
}

Sprite.prototype.aplicaRestricoes = function (dt) {
    
    if(this.props.tipo=="pc"||this.props.tipo=="enemy"){
        if(this.x>630 && this.direcao=="d")this.x=0;
        if(this.x<40 && this.direcao=="e")this.x=660;
    } // modificar atravessador de parede

    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 0) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && this.scene.map.cells[this.mc - 1][this.ml].tipo != 0) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && this.scene.map.cells[this.mc][this.ml + 1].tipo != 0) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && this.scene.map.cells[this.mc][this.ml - 1].tipo != 0) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }
    this.vy = dy / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS - this.w / 2;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

}


Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}
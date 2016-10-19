var Idle = (function () {
    function Idle(pperson) {
        this.person = new Person();
        this.Idlelist = ["Idle0_png", "Idle1_png", "Idle2_png", "Idle3_png"];
        this.count = -1;
        this.i = 0;
        this.person = pperson;
    }
    var d = __define,c=Idle,p=c.prototype;
    ;
    p.onEnter = function () {
        egret.startTick(this.PlayIdle, this);
    };
    p.onExit = function () {
        egret.stopTick(this.PlayIdle, this);
        console.log("IdleExit");
    };
    p.PlayIdle = function () {
        this.count++;
        this.i++;
        if (this.count >= this.Idlelist.length)
            this.count = 0;
        //var na=(i+10000).toString()+"_png";
        //console.log("Idle");
        if (this.i == 10) {
            this.person._person.texture = RES.getRes(this.Idlelist[this.count]);
            this.i = 0;
        }
        return true;
    };
    return Idle;
}());
egret.registerClass(Idle,'Idle',["State"]);
//# sourceMappingURL=Idle.js.map
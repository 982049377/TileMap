var Walk = (function () {
    function Walk(pperson) {
        this.Walklist = ["10000_png", "10001_png", "10002_png", "10003_png", "10004_png", "10005_png", "10006_png", "10007_png"];
        this.Walkcount = -1;
        this.person = new Person();
        this.i = 0;
        this.person = pperson;
    }
    var d = __define,c=Walk,p=c.prototype;
    p.onEnter = function () {
        egret.startTick(this.PlayWalk, this);
        console.log("EnterWalk");
    };
    p.onExit = function () {
        egret.stopTick(this.PlayWalk, this);
    };
    p.PlayWalk = function () {
        this.Walkcount++;
        this.i++;
        if (this.Walkcount >= this.Walklist.length)
            this.Walkcount = 0;
        if (this.i == 10) {
            this.person._person.texture = RES.getRes(this.Walklist[this.Walkcount]);
            this.i = 0;
        }
        //  console.log("Walk");
        //  console.log(this.Walklist[this.Walkcount]);
        return true;
    };
    return Walk;
}());
egret.registerClass(Walk,'Walk',["State"]);
//# sourceMappingURL=Walk.js.map
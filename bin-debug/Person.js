var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.call(this);
        this._person = new egret.Bitmap();
        this._speed = 1.5;
        this.mapsize = 100;
        this.i = 1;
    }
    var d = __define,c=Person,p=c.prototype;
    p.SetState = function (e) {
        if (this._State != e) {
            this._State.onExit();
        }
        this._State = e;
        this._State.onEnter();
    };
    p.firstCreat = function (astar) {
        this._astar = astar;
        this._person = this.createBitmapByName("10000_png");
        this._person.x = 0;
        this._person.y = 200;
        this.setAnchor(this._person);
        this._astar.setStartNode(Math.floor(this._person.x / 100), Math.floor(this._person.y / 100));
        this.addChild(this._person);
        var idle = new Idle(this);
        var walk = new Walk(this);
        this._State = idle;
        idle.onEnter();
    };
    p.Creat = function () {
        var _this = this;
        var walk = new Walk(this);
        var idle = new Idle(this);
        this.touchEnabled = true;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.setAstar();
            _this._astar.setEndNode(Math.floor(evt.stageX / 100), Math.floor(evt.stageY / 100));
            var i = _this._astar.findPath();
            if (i == 1) {
                if (_this._State == walk) {
                    // console.log("          "+this._State);
                    egret.Tween.removeTweens(_this._person);
                    _this.Move();
                }
                else {
                    _this.SetState(walk);
                    _this.Move();
                }
                //egret.Tween.removeTweens(this._person);
                ///egret.Tween.get(this._person).to({x:evt.stageX,y:evt.stageY},200, egret.Ease.sineIn );
                // this.setAstar(); 
                i = 2;
            }
            else if (i == 0) {
                _this.SetState(idle);
                //this.setAstar();
                i = 2;
            }
            else if (i == -1) {
                _this.SetState(idle);
                //this.setAstar();
                i = 2;
            }
        }, this);
        egret.startTick(function () {
            // if(this._State==idle){
            //     this._astar.setStartNode(Math.floor(this._person.x/100),Math.floor(this._person.y/100));
            //     this._astar.empty();
            // }
            if (_this._astar._path[0] != null) {
                if (_this._person.x == _this._astar._path[0].x * _this.mapsize && _this._person.y == _this._astar._path[0].y * _this.mapsize) {
                    _this.SetState(idle);
                }
            }
            return false;
        }, this);
    };
    p.Move = function () {
        var _this = this;
        var n = this._astar._path.length;
        this.i++;
        if (this.i > n) {
            egret.Tween.get(this._person).to({ x: x1, y: y1 }, time, egret.Ease.sineIn);
            return false;
        }
        var x1 = this._astar._path[n - this.i].x * this.mapsize;
        var y1 = this._astar._path[n - this.i].y * this.mapsize;
        var dis = Math.sqrt(Math.pow((x1 - this._person.x), 2) + Math.pow((y1 - this._person.y), 2));
        var time = dis / this._speed * 10;
        egret.Tween.get(this._person).to({ x: x1, y: y1 }, time, egret.Ease.sineIn);
        //console.log("x1:"+x1+"y1:"+y1);
        // console.log("111person.x:"+this._person.x+"        person.y:"+this._person.y); 
        egret.startTick(function () {
            if (x1 == _this._person.x && y1 == _this._person.y)
                _this.Move();
            return false;
        }, this);
        return false;
    };
    p.setAstar = function () {
        egret.Tween.removeTweens(this._person);
        this._astar.setStartNode(Math.floor(this._person.x / 100), Math.floor(this._person.y / 100));
        this._astar.empty();
        this.i = 1;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.setAnchor = function (e) {
        e.$setAnchorOffsetX(e.width / 2);
        e.$setAnchorOffsetY(e.height / 2);
    };
    return Person;
}(egret.DisplayObjectContainer));
egret.registerClass(Person,'Person');
//# sourceMappingURL=Person.js.map
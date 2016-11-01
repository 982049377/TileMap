var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.call(this);
        this._person = new egret.Bitmap();
        this._speed = 1.5;
        this.mapsize = 100;
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
        var x;
        var y;
        this.touchEnabled = true;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this._astar.setEndNode(Math.floor(evt.stageX / 100), Math.floor(evt.stageY / 100));
            var i = _this._astar.findPath();
            if (i == 1) {
                if (_this._State == walk) {
                    // console.log("          "+this._State);
                    egret.Tween.removeTweens(_this._person);
                    var n = _this._astar._path.length;
                    for (var i = 1; i <= _this._astar._path.length; i++) {
                        var x1 = _this._astar._path[n - i - 1].x * _this.mapsize;
                        var y1 = _this._astar._path[n - i - 1].y * _this.mapsize;
                        var dis = Math.sqrt(Math.pow((x1 - _this._person.x), 2) + Math.pow((y1 - _this._person.y), 2));
                        var time = dis / _this._speed * 10;
                        egret.Tween.get(_this._person).to({ x: x1, y: y1 }, time, egret.Ease.sineIn);
                    }
                }
                else {
                    _this.SetState(walk);
                    var n = _this._astar._path.length;
                    for (var i = 1; i <= _this._astar._path.length; i++) {
                        var x1 = _this._astar._path[n - i].x * _this.mapsize;
                        var y1 = _this._astar._path[n - i].y * _this.mapsize;
                        var dis = Math.sqrt(Math.pow((x1 - _this._person.x), 2) + Math.pow((y1 - _this._person.y), 2));
                        var time = dis / _this._speed * 10;
                        egret.Tween.get(_this._person).to({ x: x1, y: y1 }, time, egret.Ease.sineIn);
                        console.log("x1:" + x1 + "y1:" + y1);
                    }
                }
                _this.setAstar();
                x = evt.stageX;
                y = evt.stageY;
                i = 2;
                console.log("evt.x:" + evt.stageX + "        evt.y:" + evt.stageY);
                console.log("person.x:" + _this._person.x + "        person.y:" + _this._person.y);
            }
            else if (i == 0) {
                _this.SetState(idle);
                _this.setAstar();
                i = 2;
            }
            else if (i == -1) {
                _this.SetState(idle);
                _this.setAstar();
                i = 2;
            }
        }, this);
        egret.startTick(function () {
            // if(this._State==idle){
            //     this._astar.setStartNode(Math.floor(this._person.x/100),Math.floor(this._person.y/100));
            //     this._astar.empty();
            // }
            if (_this._person.x == x && _this._person.y == y) {
                _this.SetState(idle);
            }
            return false;
        }, this);
    };
    p.setAstar = function () {
        this._astar.setStartNode(Math.floor(this._person.x / 100), Math.floor(this._person.y / 100));
        this._astar.empty();
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
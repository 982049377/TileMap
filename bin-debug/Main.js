//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    //public sssssss;
    function Main() {
        _super.call(this);
        this.prevX = 0;
        this.map_Grid = 0;
        /**帧事件' */
        this.step = 10;
        this.i = 2;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    // private _grid:Grid;
    // private _path:Array<MapNode>=new Array;
    p.createGameScene = function () {
        var _this = this;
        this._container = new egret.DisplayObjectContainer();
        this._bg = new TileMap();
        this._container.addChild(this._bg);
        this._bg.Create();
        this._player = new Person();
        this._player.x = 0;
        this._player.y = 200;
        this._player.scaleX = 0.8;
        this._player.scaleY = 0.8;
        this._container.addChild(this._player);
        this._player.firstCreat();
        //this._player.Creat();
        var idle = new Idle(this._player);
        var walk = new Walk(this._player);
        this.touchEnabled = true;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.setAstar();
            _this._bg._astar.setStartNode(Math.floor((_this._player.x) / 100), Math.floor(_this._player.y / 100));
            //this._bg._astar.setStartNode(Math.floor(this._player.x/100),Math.floor(this._player.y/100));
            //this._bg._astar.setEndNode(Math.floor(evt.stageX/100),Math.floor(evt.stageY/100));
            _this._bg._astar.setEndNode(Math.floor((evt.stageX + _this.map_Grid) / 100), Math.floor(evt.stageY / 100));
            var i = _this._bg._astar.findPath();
            if (i == 1) {
                _this._player.SetState(walk);
                //egret.Tween.removeTweens(this._player);
                _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
                _this.onEnterFrame;
                //this.Move();
                i = 2;
            }
            else if (i == 0) {
                _this._player.SetState(idle);
                _this.setAstar();
                i = 2;
            }
            else if (i == -1) {
                _this._player.SetState(idle);
                _this.setAstar();
                i = 2;
            }
        }, this);
        egret.startTick(function () {
            if (_this._bg._astar._path[0] != null) {
                if (_this._player.x == (_this._bg._astar._path[0].x) * _this._bg.MapSize + 50 && _this._player.y == _this._bg._astar._path[0].y * _this._bg.MapSize + 50) {
                    _this._player.SetState(idle);
                }
            }
            return false;
        }, this);
        this.addChild(this._container);
        /***地图 */
        this._container.touchEnabled = true;
        this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.prevX = e.stageX;
            //this.offsetx=e.stageX-this._bg.x;
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onMove, _this);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onMove, _this);
        }, this);
    };
    p.onMove = function (e) {
        //this._bg.x+=offsetx;
        //console.log("onMove");
        this.offsetx = this.prevX - e.stageX;
        if (this.offsetx > 0) {
            egret.Tween.get(this._container).to({ x: -360 }, 200);
            this.map_Grid = 360;
        }
        if (this.offsetx < 0) {
            //console.log("12345789465413213212313");
            egret.Tween.get(this._container).to({ x: 0 }, 200);
            this.map_Grid = 0;
        }
    };
    p.onEnterFrame = function (event) {
        //console.log('hi');
        var n = this._bg._astar._path.length;
        console.log(n - this.i);
        if (n - this.i < 0)
            return;
        var targetX = this._bg._astar._path[n - this.i].x * this._bg.MapSize + this._bg.MapSize / 2;
        var targetY = this._bg._astar._path[n - this.i].y * this._bg.MapSize + this._bg.MapSize / 2;
        var dx = targetX - this._player.x;
        var dy = targetY - this._player.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.step * 2) {
            this.i++;
            if (this.i > this._bg._astar._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                console.log('remove');
            }
        }
        else {
            if (targetX - this._player.x > this.step)
                this._player.x += this.step;
            if (targetY - this._player.y > this.step)
                this._player.y += this.step;
            if (this._player.x - targetX > this.step)
                this._player.x -= this.step;
            if (this._player.y - targetY > this.step)
                this._player.y -= this.step;
            if (Math.abs(this._player.x - targetX) <= this.step) {
                this._player.x = targetX;
            }
            if (Math.abs(this._player.y - targetY) <= this.step) {
                this._player.y = targetY;
            }
        }
        // console.log("targetX:"+targetX+"targetY:"+targetY);
        // console.log("person.x:"+this._player.x+"person.y:"+this._player.y); 
        // console.log("dx:"+dx+"dy:"+dy); 
    };
    // private _speed:number=1.5;
    /**Tween移动，格与格之间很卡' */
    // private Move():boolean{
    //     var n=this._bg._astar._path.length;
    //     this.i++;
    //     if(this.i>n){
    //         egret.Tween.get(this._player).to({x:x1,y:y1},time, egret.Ease.sineIn );
    //         return false;
    //     }
    //     var x1=this._bg._astar._path[n-this.i].x*this._bg.MapSize+this._bg.MapSize/2;
    //     var y1=this._bg._astar._path[n-this.i].y*this._bg.MapSize+this._bg.MapSize/2;
    //     var dis=Math.sqrt(Math.pow((x1-this._player.x),2)+Math.pow((y1-this._player.y),2));
    //     var time=dis/this._speed*10;
    //     egret.Tween.get(this._player).to({x:x1,y:y1},time, egret.Ease.sineIn );
    //     console.log("x1:"+x1+"y1:"+y1);
    //     console.log("111person.x:"+this._player.x+"person.y:"+this._player.y); 
    //     egret.startTick(():boolean=>{
    //         if(x1==this._player.x&&y1==this._player.y)
    //             this.Move();
    //         return false;
    //     },this);
    //     return false;
    //  }
    p.setAstar = function () {
        egret.Tween.removeTweens(this._player);
        this._bg._astar.setStartNode(Math.floor(this._player.x / 100), Math.floor(this._player.y / 100));
        this._bg._astar.empty();
        this.i = 1;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
/*
class ss{
   public ssss(e:Main){
       e.sssssss;
   }
}*/ 
//# sourceMappingURL=Main.js.map
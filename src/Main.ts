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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    //public sssssss;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private _player:Person;
    private _bg:TileMap;
    private _container:egret.DisplayObjectContainer;
    // private _grid:Grid;
    // private _path:Array<MapNode>=new Array;
    private createGameScene():void {
        this._container=new egret.DisplayObjectContainer();

        this._bg=new TileMap();
        this._container.addChild(this._bg);
        this._bg.Create();

        this._player=new Person();
        this._player.x=0;
        this._player.y=200;
        this._player.scaleX=0.8;
        this._player.scaleY=0.8;
        this._container.addChild(this._player);
        this._player.firstCreat();
        //this._player.Creat();
        var idle:Idle=new Idle (this._player);
        var walk:Walk=new Walk(this._player);
        this.touchEnabled = true;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
            this.setAstar(); 
            //this._bg._astar.setStartNode(Math.floor(this._player.x/100)+this.map_Grid,Math.floor(this._player.y/100));
            this._bg._astar.setStartNode(Math.floor(this._player.x/100),Math.floor(this._player.y/100));
            this._bg._astar.setEndNode(Math.floor(evt.stageX/100),Math.floor(evt.stageY/100));
            var i=this._bg._astar.findPath();
            if(i==1){
                this._player.SetState(walk)
                //egret.Tween.removeTweens(this._player);
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this.onEnterFrame;
                //this.Move();
                i=2
            }
            else
            if(i==0)
            {
                this._player.SetState(idle);
                this.setAstar();
                i=2;
            }
            else
                if(i==-1)
                {
                    this._player.SetState(idle);
                    this.setAstar();
                    i=2;
                }
        },this);
        egret.startTick(():boolean=>{
            if(this._bg._astar._path[0]!=null){
                if(this._player.x==(this._bg._astar._path[0].x)*this._bg.MapSize+50&& this._player.y==this._bg._astar._path[0].y*this._bg.MapSize+50){
                    this._player.SetState(idle);
                    //this.setAstar(); 
                }
            }
            return false;
        },this);
        this.addChild(this._container);

        /***地图 */
       
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent)=>{
        //     this.offsetx=e.stageX-this._bg.x;
        //     this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this)
        // },this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
        //      this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        // },this)
    }
    // private map_Grid=0;
    // private offsetx:number;
    // private onMove(e:egret.TouchEvent){
    //         //this._bg.x+=offsetx;
    //         //console.log("onMove");
    //         if(this.offsetx>0){
    //             egret.Tween.get(this._container).to({x:-360},200);
    //             this.map_Grid=Math.floor(360/this._bg.MapSize);
    //         }
    //         if(this.offsetx<0){
    //             egret.Tween.get(this._container).to({x:0},200)
    //             this.map_Grid=0;
    //         }
    //     }

/**帧事件' */
    private step:number=10;
    private onEnterFrame(event: egret.Event): void {
        //console.log('hi');
        var n=this._bg._astar._path.length;
        var targetX: number = this._bg._astar._path[n-this.i].x* this._bg.MapSize + this._bg.MapSize / 2;
        var targetY: number = this._bg._astar._path[n-this.i].y * this._bg.MapSize + this._bg.MapSize / 2;
        var dx: number = targetX - this._player.x;
        var dy: number = targetY - this._player.y;
        var dist: number = Math.sqrt(dx * dx + dy * dy);
        if (dist <this.step*2) {
            this.i++;
            if (this.i > this._bg._astar._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                console.log('remove');
            }
        }
        else {
            if(targetX-this._player.x>this.step)
                this._player.x += this.step;
            if(targetY-this._player.y>this.step)
                this._player.y += this.step;
            if(this._player.x-targetX>this.step)
                this._player.x -= this.step;
            if(this._player.y-targetY>this.step)
                this._player.y -= this.step;
            if(Math.abs(this._player.x-targetX)<=this.step){
                this._player.x=targetX;
            }
            if(Math.abs(this._player.y-targetY)<=this.step){
                this._player.y=targetY;
            }
            //this._player.Move(new Vector2(targetX, targetY), this.inputPos);
        }
        // console.log("targetX:"+targetX+"targetY:"+targetY);
        // console.log("person.x:"+this._player.x+"person.y:"+this._player.y); 
        // console.log("dx:"+dx+"dy:"+dy); 
    }


     private i=2;
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
     private setAstar():void{
        egret.Tween.removeTweens(this._player);
        this._bg._astar.setStartNode(Math.floor(this._player.x/100),Math.floor(this._player.y/100));
        this._bg._astar.empty();
        this.i=1;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
  
}
 /*
class ss{
    public ssss(e:Main){
        e.sssssss;
    }
}*/
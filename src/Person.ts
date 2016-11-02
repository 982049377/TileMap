class Person extends egret.DisplayObjectContainer{
      public _person:egret.Bitmap=new egret.Bitmap();
      private _State:State;
      private _speed:number=1.5;
      private _astar:Astar;
      private mapsize=100;
      public constructor() {
        super();
      }
      public SetState(e:State){
          if(this._State!=e){
              this._State.onExit();
          }
          this._State=e;
          this._State.onEnter();
        }
      public firstCreat(astar:Astar){
        this._astar=astar;
        this._person=this.createBitmapByName("10000_png")
        this._person.x=0;
        this._person.y=200;
        this.setAnchor(this._person);
        this._astar.setStartNode(Math.floor(this._person.x/100),Math.floor(this._person.y/100));
        this.addChild(this._person);
        var idle:Idle=new Idle (this);
        var walk:Walk=new Walk(this);
        this._State=idle;
        idle.onEnter();
      }
    

      public Creat(){
      
         var walk:Walk=new Walk(this);
         var idle:Idle=new Idle (this);
            this.touchEnabled = true;
            this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                this._astar.setEndNode(Math.floor(evt.stageX/100),Math.floor(evt.stageY/100));
                var i=this._astar.findPath();
                if(i==1){
                if(this._State==walk)
                {
                    // console.log("          "+this._State);
                    egret.Tween.removeTweens(this._person);
                    this.Move();
                }else{
                    this.SetState(walk);
                    this.Move();
                    }  
                    //egret.Tween.removeTweens(this._person);
                ///egret.Tween.get(this._person).to({x:evt.stageX,y:evt.stageY},200, egret.Ease.sineIn );
               // this.setAstar(); 
                i=2;
                console.log("evt.x:"+evt.stageX+"        evt.y:"+evt.stageY); 
                console.log("person.x:"+this._person.x+"        person.y:"+this._person.y); 
                }
                else
                if(i==0)
                {
                    this.SetState(idle);
                    //this.setAstar();
                    i=2;
                }
                else
                    if(i==-1)
                    {
                        this.SetState(idle);
                        //this.setAstar();
                        i=2;
                    }
            },this);
            

            egret.startTick(():boolean=>{
                // if(this._State==idle){
                //     this._astar.setStartNode(Math.floor(this._person.x/100),Math.floor(this._person.y/100));
                //     this._astar.empty();
                // }
                if(this._astar._path[0]!=null){
                    if(this._person.x==this._astar._path[0].x*this.mapsize && this._person.y==this._astar._path[0].y*this.mapsize){
                            this.SetState(idle);
                            this.setAstar(); 
                    }
                }
                return false;
            },this);

        }

        
        private i=1;
        private Move():boolean{
            var n=this._astar._path.length;
            this.i++;
            if(this.i>n){
               egret.Tween.get(this._person).to({x:x1,y:y1},time, egret.Ease.sineIn );
               return false;
            }
            var x1=this._astar._path[n-this.i].x*this.mapsize;
            var y1=this._astar._path[n-this.i].y*this.mapsize;
            var dis=Math.sqrt(Math.pow((x1-this._person.x),2)+Math.pow((y1-this._person.y),2));
            var time=dis/this._speed*10;
            egret.Tween.get(this._person).to({x:x1,y:y1},time, egret.Ease.sineIn );
            console.log("x1:"+x1+"y1:"+y1);
            console.log("111person.x:"+this._person.x+"        person.y:"+this._person.y); 
            egret.startTick(():boolean=>{
                if(x1==this._person.x&&y1==this._person.y)
                    this.Move();
                return false;
            },this);
            return false;
        }

        private setAstar():void{
            egret.Tween.removeTweens(this._person);
            this._astar.setStartNode(Math.floor(this._person.x/100),Math.floor(this._person.y/100));
            this._astar.empty();
            this.i=1;
        }


        public createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
        }
        private setAnchor(e:egret.Bitmap)
        {
            e.$setAnchorOffsetX(e.width/2);
            e.$setAnchorOffsetY(e.height/2);
        }

}
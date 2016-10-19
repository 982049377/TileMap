
class Walk implements State{
          private Walklist=["10000_png","10001_png","10002_png","10003_png","10004_png","10005_png","10006_png","10007_png"];
          private Walkcount=-1;
          private person:Person=new Person();
          private i:number=0;
          public constructor(pperson:Person) {
             this.person=pperson;
          }
          onEnter(){
                egret.startTick(this.PlayWalk,this);
                     console.log("EnterWalk");
          }

          onExit(){
      
                egret.stopTick(this.PlayWalk,this);
          }
          private PlayWalk():boolean{
                this.Walkcount++;
                this.i++;
                if(this.Walkcount>=this.Walklist.length)
                    this.Walkcount=0;
                if(this.i==10){
                    this.person._person.texture=RES.getRes(this.Walklist[this.Walkcount]);
                    this.i=0;
                }
                //  console.log("Walk");
                //  console.log(this.Walklist[this.Walkcount]);
                  return true;
          }
}
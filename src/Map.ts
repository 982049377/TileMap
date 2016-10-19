class Map extends egret.DisplayObjectContainer{

    constructor(){
        super();
    }

    private MapInfomation=[
        {x:0,y:0,WalkAble:"true",image:"road_jpg"},
        {x:0,y:1,WalkAble:"false",image:"water_jpg"},
        {x:0,y:2,WalkAble:"true",image:"road_jpg"},
        {x:0,y:3,WalkAble:"true",image:"road_jpg"},
        {x:0,y:4,WalkAble:"true",image:"road_jpg"},
        {x:0,y:5,WalkAble:"true",image:"road_jpg"},
        {x:0,y:6,WalkAble:"false",image:"water_jpg"},
        {x:0,y:7,WalkAble:"false",image:"water_jpg"},

        {x:1,y:0,WalkAble:"true",image:"road_jpg"},
        {x:1,y:1,WalkAble:"false",image:"water_jpg"},
        {x:1,y:2,WalkAble:"true",image:"road_jpg"},
        {x:1,y:3,WalkAble:"false",image:"water_jpg"},
        {x:1,y:4,WalkAble:"false",image:"water_jpg"},
        {x:1,y:5,WalkAble:"true",image:"road_jpg"},
        {x:1,y:6,WalkAble:"false",image:"water_jpg"},
        {x:1,y:7,WalkAble:"false",image:"water_jpg"},

        {x:2,y:0,WalkAble:"true",image:"road_jpg"},
        {x:2,y:1,WalkAble:"false",image:"water_jpg"},
        {x:2,y:2,WalkAble:"true",image:"road_jpg"},
        {x:2,y:3,WalkAble:"false",image:"water_jpg"},
        {x:2,y:4,WalkAble:"true",image:"road_jpg"},
        {x:2,y:5,WalkAble:"true",image:"road_jpg"},
        {x:2,y:6,WalkAble:"false",image:"water_jpg"},
        {x:2,y:7,WalkAble:"false",image:"water_jpg"},

        {x:3,y:0,WalkAble:"true",image:"road_jpg"},
        {x:3,y:1,WalkAble:"false",image:"water_jpg"},
        {x:3,y:2,WalkAble:"true",image:"road_jpg"},
        {x:3,y:3,WalkAble:"false",image:"water_jpg"},
        {x:3,y:4,WalkAble:"true",image:"road_jpg"},
        {x:3,y:5,WalkAble:"true",image:"road_jpg"},
        {x:3,y:6,WalkAble:"false",image:"water_jpg"},
        {x:3,y:7,WalkAble:"true",image:"road_jpg"},

        {x:4,y:0,WalkAble:"true",image:"road_jpg"},
        {x:4,y:1,WalkAble:"false",image:"water_jpg"},
        {x:4,y:2,WalkAble:"true",image:"road_jpg"},
        {x:4,y:3,WalkAble:"false",image:"water_jpg"},
        {x:4,y:4,WalkAble:"true",image:"road_jpg"},
        {x:4,y:5,WalkAble:"true",image:"road_jpg"},
        {x:4,y:6,WalkAble:"true",image:"road_jpg"},
        {x:4,y:7,WalkAble:"true",image:"road_jpg"},

        {x:5,y:0,WalkAble:"true",image:"road_jpg"},
        {x:5,y:1,WalkAble:"false",image:"water_jpg"},
        {x:5,y:2,WalkAble:"true",image:"road_jpg"},
        {x:5,y:3,WalkAble:"false",image:"water_jpg"},
        {x:5,y:4,WalkAble:"false",image:"water_jpg"},
        {x:5,y:5,WalkAble:"false",image:"water_jpg"},
        {x:5,y:6,WalkAble:"false",image:"water_jpg"},
        {x:5,y:7,WalkAble:"true",image:"road_jpg"},
        
        {x:6,y:0,WalkAble:"true",image:"road_jpg"},
        {x:6,y:1,WalkAble:"false",image:"water_jpg"},
        {x:6,y:2,WalkAble:"true",image:"road_jpg"},
        {x:6,y:3,WalkAble:"false",image:"water_jpg"},
        {x:6,y:4,WalkAble:"false",image:"water_jpg"},
        {x:6,y:5,WalkAble:"false",image:"water_jpg"},
        {x:6,y:6,WalkAble:"false",image:"water_jpg"},
        {x:6,y:7,WalkAble:"true",image:"road_jpg"},
        
        {x:7,y:0,WalkAble:"true",image:"road_jpg"},
        {x:7,y:1,WalkAble:"true",image:"road_jpg"},
        {x:7,y:2,WalkAble:"true",image:"road_jpg"},
        {x:7,y:3,WalkAble:"false",image:"water_jpg"},
        {x:7,y:4,WalkAble:"true",image:"road_jpg"},
        {x:7,y:5,WalkAble:"true",image:"road_jpg"},
        {x:7,y:6,WalkAble:"true",image:"road_jpg"},
        {x:7,y:7,WalkAble:"true",image:"road_jpg"},
    ];;
    public Crate(){
        this.MapInfomation
    }

}
var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap() {
        _super.call(this);
        this.MapSize = 100;
        this.MapInfomation = [
            { x: 0, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 0, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 3, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 4, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 6, WalkAble: false, image: "water_jpg" },
            { x: 0, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 8, WalkAble: true, image: "road_jpg" },
            { x: 0, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 1, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 1, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 1, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 1, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 1, y: 4, WalkAble: false, image: "water_jpg" },
            { x: 1, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 1, y: 6, WalkAble: false, image: "water_jpg" },
            { x: 1, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 1, y: 8, WalkAble: false, image: "water_jpg" },
            { x: 1, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 2, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 2, y: 4, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 6, WalkAble: false, image: "water_jpg" },
            { x: 2, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 8, WalkAble: true, image: "road_jpg" },
            { x: 2, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 3, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 3, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 3, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 3, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 3, y: 4, WalkAble: true, image: "road_jpg" },
            { x: 3, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 3, y: 6, WalkAble: false, image: "water_jpg" },
            { x: 3, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 3, y: 8, WalkAble: false, image: "water_jpg" },
            { x: 3, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 4, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 4, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 4, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 4, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 4, y: 4, WalkAble: false, image: "water_jpg" },
            { x: 4, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 4, y: 6, WalkAble: true, image: "road_jpg" },
            { x: 4, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 4, y: 8, WalkAble: false, image: "water_jpg" },
            { x: 4, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 5, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 5, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 5, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 5, y: 3, WalkAble: true, image: "road_jpg" },
            { x: 5, y: 4, WalkAble: true, image: "road_jpg" },
            { x: 5, y: 5, WalkAble: false, image: "water_jpg" },
            { x: 5, y: 6, WalkAble: false, image: "water_jpg" },
            { x: 5, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 5, y: 8, WalkAble: false, image: "water_jpg" },
            { x: 5, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 6, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 6, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 6, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 6, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 6, y: 4, WalkAble: false, image: "water_jpg" },
            { x: 6, y: 5, WalkAble: false, image: "water_jpg" },
            { x: 6, y: 6, WalkAble: false, image: "water_jpg" },
            { x: 6, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 6, y: 8, WalkAble: true, image: "road_jpg" },
            { x: 6, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 1, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 7, y: 4, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 6, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 7, WalkAble: true, image: "road_jpg" },
            { x: 7, y: 8, WalkAble: false, image: "water_jpg" },
            { x: 7, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 8, y: 0, WalkAble: false, image: "water_jpg" },
            { x: 8, y: 1, WalkAble: false, image: "water_jpg" },
            { x: 8, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 8, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 8, y: 4, WalkAble: false, image: "water_jpg" },
            { x: 8, y: 5, WalkAble: false, image: "water_jpg" },
            { x: 8, y: 6, WalkAble: true, image: "road_jpg" },
            { x: 8, y: 7, WalkAble: false, image: "water_jpg" },
            { x: 8, y: 8, WalkAble: true, image: "road_jpg" },
            { x: 8, y: 9, WalkAble: true, image: "road_jpg" },
            { x: 9, y: 0, WalkAble: true, image: "road_jpg" },
            { x: 9, y: 1, WalkAble: true, image: "road_jpg" },
            { x: 9, y: 2, WalkAble: true, image: "road_jpg" },
            { x: 9, y: 3, WalkAble: false, image: "water_jpg" },
            { x: 9, y: 4, WalkAble: false, image: "water_jpg" },
            { x: 9, y: 5, WalkAble: true, image: "road_jpg" },
            { x: 9, y: 6, WalkAble: true, image: "road_jpg" },
            { x: 9, y: 7, WalkAble: false, image: "water_jpg" },
            { x: 9, y: 8, WalkAble: false, image: "water_jpg" },
            { x: 9, y: 9, WalkAble: true, image: "road_jpg" },
        ];
        //this._grid= new Grid(10,10);
        //this._astar=new Astar(this._grid);
        //this.Create();
    }
    var d = __define,c=TileMap,p=c.prototype;
    p.Create = function () {
        var _this = this;
        this._grid = new Grid(10, 10);
        var Container = new egret.DisplayObjectContainer();
        for (var i = 0; i < this.MapInfomation.length; i++) {
            var date = this.MapInfomation[i];
            var tile = new Tile(date, this.MapSize, this._grid);
            this.addChild(tile);
        }
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var x = Math.floor(e.stageX / _this.MapSize);
            var y = Math.floor(e.stageY / _this.MapSize);
            console.log("鼠标点击点xx:" + x + "yy" + y);
        }, this);
        this._astar = new Astar(this._grid);
    };
    return TileMap;
}(egret.DisplayObjectContainer));
egret.registerClass(TileMap,'TileMap');
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(Date, mapsize, grid) {
        _super.call(this);
        this.date = Date;
        this.MapSize = mapsize;
        var Bitmap = new egret.Bitmap();
        Bitmap.texture = RES.getRes(Date.image);
        Bitmap.x = Date.x * this.MapSize;
        Bitmap.y = Date.y * this.MapSize;
        grid.setWalkAble(Date.x, Date.y, Date.WalkAble);
        this.addChild(Bitmap);
        //grid.OuttoConsole();
    }
    var d = __define,c=Tile,p=c.prototype;
    return Tile;
}(egret.DisplayObjectContainer));
egret.registerClass(Tile,'Tile');
//# sourceMappingURL=TileMap.js.map
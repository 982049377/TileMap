var Grid = (function () {
    function Grid(x, y) {
        this._Grid = new Array();
        for (var i = 0; i < x; i++) {
            var TempArray = new Array();
            for (var j = 0; j < y; j++)
                TempArray.push(new MapNode(-1, -1));
            this._Grid.push(TempArray);
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.setWalkAble = function (x, y, WalkAble) {
        this._Grid[x][y].f = 0;
        this._Grid[x][y].g = 0;
        this._Grid[x][y].h = 0;
        this._Grid[x][y].parent = null;
        this._Grid[x][y].x = x;
        this._Grid[x][y].y = y;
        this._Grid[x][y].WalkAble = WalkAble;
    };
    p.OuttoConsole = function () {
        for (var i = 0; i < this._Grid.length; i++)
            for (var j = 0; j < this._Grid[i].length; j++)
                console.log("x:" + this._Grid[i][j].x + "y:" + this._Grid[i][j].y + "WalkAble:" + this._Grid[i][j].WalkAble);
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map
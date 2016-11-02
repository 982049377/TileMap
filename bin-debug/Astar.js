var Astar = (function () {
    function Astar(grid) {
        this._path = [];
        this._openArray = [];
        this._closeArray = [];
        this._straightCost = 1.0;
        this._diagCost = 1.4;
        this._grid = grid;
    }
    var d = __define,c=Astar,p=c.prototype;
    p.setEndNode = function (xpos, ypos) {
        this._endx = xpos;
        this._endy = ypos;
    };
    p.setStartNode = function (xpos, ypos) {
        this._startx = xpos;
        this._starty = ypos;
        console.log("起点x:" + xpos + "y:" + ypos);
    };
    p.manhattan = function (node) {
        return Math.abs(node.x - this._endx) * this._straightCost + Math.abs(node.y + this._endy) * this._straightCost;
    };
    //几何估价法
    p.euclidian = function (node) {
        var dx = node.x - this._endx;
        var dy = node.y - this._endy;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    //对角线估价法
    p.diagonal = function (node) {
        var dx = Math.abs(node.x - this._endx);
        var dy = Math.abs(node.y - this._endy);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    /* public find(){
         var mm=new MapNode(this._startx,this._starty);
         // this._grid.OuttoConsole();
         // console.log(mm.x+"0.123"+mm.y);
         console.log("起点x:"+this._startx+"y:"+this._starty)
         console.log("终点x:"+this._endx+"y:"+this._endy)
         this.findPath(mm);
     }*/
    p.findPath = function () {
        var m = new MapNode(this._startx, this._starty); // 起始点加入open表  
        m.g = 0;
        m.h = this.manhattan(m);
        m.parent = null;
        this._openArray.push(m);
        //    console.log(m.x+"0.123"+m.y);       
        if (m.x == this._endx && m.y == this._endy) {
            console.log("起点==终点！\n");
            return 0;
        }
        var is_found = false;
        while (true) {
            if (this._openArray.length > 0)
                this.adjust_heap(); // 调整开放列表  
            var curr_node = this._openArray[0]; // open表的第一个点一定是f值最小的点(通过堆排序得到的)  
            this._openArray.shift();
            this._closeArray[this._closeArray.length++] = curr_node; // 当前点加入close表  
            //console.log("寻路x:"+curr_node.x+"          y:"+curr_node.y);    
            if (curr_node.x == this._endx && curr_node.y == this._endy) {
                is_found = true;
                break;
            }
            this.get_neighbors(curr_node); // 对邻居的处理  
            if (this._openArray.length == 0) {
                is_found = false;
                break;
            }
            if (this._openArray.length > 0)
                this.adjust_heap();
        }
        var top = -1;
        if (is_found) {
            curr_node.x = this._endx;
            curr_node.y = this._endy;
            while (curr_node) {
                this._path[++top] = curr_node;
                curr_node = curr_node.parent;
            }
            while (top >= 0) {
                if (top > 0) {
                    console.log("(%d,%d)-->", this._path[top].x, this._path[top--].y);
                }
                else {
                    console.log("(%d,%d)", this._path[top].x, this._path[top--].y);
                }
            }
            return 1;
        }
        else {
            console.log("没有找到路径");
            return -1;
        }
    };
    p.empty = function () {
        for (var i = 0; i < this._closeArray.length; i++)
            this._closeArray.shift();
        for (var i = 0; i < this._openArray.length; i++)
            this._openArray.shift();
        for (var i = 0; i < this._path.length; i++)
            this._openArray.shift();
    };
    p.Has_closeArray = function (M) {
        for (var i = 0; i <= this._closeArray.length; i++) {
            if (this._closeArray[i] == M)
                return true;
        }
        return false;
    };
    p.Has_openArray = function (M) {
        for (var i = 0; i <= this._openArray.length; i++) {
            if (this._openArray[i] == M)
                return true;
        }
        return false;
    };
    p.swap = function (idx1, idx2) {
        var tmp = this._openArray[idx1];
        this._openArray[idx1] = this._openArray[idx2];
        this._openArray[idx2] = tmp;
    };
    // 堆调整  
    //   
    p.adjust_heap = function () {
        var n = 0;
        for (var i = 0; i < this._openArray.length; i++) {
            if ((this._openArray[n].g + this._openArray[n].h) > (this._openArray[i].g + this._openArray[i].h)) {
                n = i;
            }
        }
        this.swap(n, 0);
    };
    // 判断邻居点是否可以进入open表  
    //   
    p.insert_to_opentable = function (x, y, curr_node, w) {
        var i;
        if (this._grid._Grid[x][y].WalkAble != false) {
            if (!this.Has_closeArray(this._grid._Grid[x][y])) {
                // if (this.Has_openArray(this._grid._Grid[x][y])) // 在open表中  
                // {
                //     // 需要判断是否是一条更优化的路径  
                //     //   
                //     if (this._grid._Grid[x][y].g > curr_node.g + w)    // 如果更优化  
                //     {
                //         this._grid._Grid[x][y].g = curr_node.g + w;
                //         this._grid._Grid[x][y].parent = curr_node;
                //         for (i = 0; i < this._openArray.length; ++i) {
                //             if (this._openArray[i].x == this._grid._Grid[x][y].x && this._openArray[i].y == this._grid._Grid[x][y].y) {
                //                 break;
                //             }
                //         }
                //         if (this._openArray.length > 0)
                //             this.adjust_heap();                   // 下面调整点  
                //     }
                // }
                // else       
                if (!this.Has_openArray(this._grid._Grid[x][y])) {
                    this._grid._Grid[x][y].g = curr_node.g + w;
                    this._grid._Grid[x][y].h = this.manhattan(this._grid._Grid[x][y]);
                    this._grid._Grid[x][y].parent = curr_node;
                    this._openArray.push(this._grid._Grid[x][y]);
                }
            }
        }
    };
    // 查找邻居  
    // 对上下左右8个邻居进行查找  
    //    
    p.get_neighbors = function (curr_node) {
        var x = curr_node.x;
        var y = curr_node.y;
        // 下面对于8个邻居进行处理！  
        //   
        if ((x + 1) >= 0 && (x + 1) < 10 && y >= 0 && y < 10) {
            this.insert_to_opentable(x + 1, y, curr_node, 10);
        }
        if ((x - 1) >= 0 && (x - 1) < 10 && y >= 0 && y < 10) {
            this.insert_to_opentable(x - 1, y, curr_node, 10);
        }
        if (x >= 0 && x < 10 && (y + 1) >= 0 && (y + 1) < 10) {
            this.insert_to_opentable(x, y + 1, curr_node, 10);
        }
        if (x >= 0 && x < 10 && (y - 1) >= 0 && (y - 1) < 10) {
            this.insert_to_opentable(x, y - 1, curr_node, 10);
        }
        if ((x + 1) >= 0 && (x + 1) < 10 && (y + 1) >= 0 && (y + 1) < 10) {
            this.insert_to_opentable(x + 1, y + 1, curr_node, 14);
        }
        if ((x + 1) >= 0 && (x + 1) < 10 && (y - 1) >= 0 && (y - 1) < 10) {
            this.insert_to_opentable(x + 1, y - 1, curr_node, 14);
        }
        if ((x - 1) >= 0 && (x - 1) < 10 && (y + 1) >= 0 && (y + 1) < 10) {
            this.insert_to_opentable(x - 1, y + 1, curr_node, 14);
        }
        if ((x - 1) >= 0 && (x - 1) < 10 && (y - 1) >= 0 && (y - 1) < 10) {
            this.insert_to_opentable(x - 1, y - 1, curr_node, 14);
        }
    };
    return Astar;
}());
egret.registerClass(Astar,'Astar');
var MapNode = (function () {
    function MapNode(x, y) {
        this.x = x;
        this.y = y;
    }
    var d = __define,c=MapNode,p=c.prototype;
    p.compare = function (n) {
        if (this.x == n.x && this.x == n.y) {
            return true;
        }
        return false;
    };
    return MapNode;
}());
egret.registerClass(MapNode,'MapNode');
//# sourceMappingURL=Astar.js.map
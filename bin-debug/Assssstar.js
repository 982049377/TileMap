/*class MapNode
{
        public x:number;
        public y:number;
        public f:number;
        public g:number;
        public h:number;
        public walkable:boolean=true;//是否可穿越（通常把障碍物节点设置为false）
        public parent:MapNode;
        public costMultiplier:number=1.0;//代价因子
 
       public constructor(x:number, y:number)
        {
            this.x=x;
            this.y=y;
        }
}

class GridTest extends egret.Sprite
    {
        private _endNode:MapNode;
        private _startNode:MapNode;
        private _straightCost:number=1.0;
        private _diagCost:number = 1.4;
 
 
        public constructor()
        {
            super();
            var g:Grid=new egret.Grid(5, 5);
            g.setStartNode(0, 3);
            g.setEndNode(4, 1);
             
            this._endNode = g.endNode;
            this._startNode = g.startNode;
             
            var c1:number = this.manhattan(this._startNode);//8
            var c2:number = this.euclidian(this._startNode);//4.47213595499958
            var c3:number = this.diagonal(this._startNode);//4.8
             
            this.trace(c1,c2,c3);
        }

        private manhattan(node:MapNode):number{
            return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
        }
 
//几何估价法
        private euclidian(node:MapNode):number{
            var dx:number=node.x - this._endNode.x;
            var dy:number=node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        }
 
//对角线估价法
        private diagonal(node:MapNode):number{
            var dx:number=Math.abs(node.x - this._endNode.x);
            var dy:number=Math.abs(node.y - this._endNode.y);
            var diag:number=Math.min(dx, dy);
            var straight:number=dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        }
}


class Game extends egret.Sprite
    {
        private _cellSize:number=20;
        private _grid:Grid;
        private _player:egret.Sprite;
        private _index:number;
        private _path:ArrayList;
 
        public constructor()
        {
            super();
            this.stage.x=0;
            this.stage.y=0;
            this.stage.scaleMode=egret.StageScaleMode.NO_SCALE;
            this.makePlayer();
            this.makeGrid();
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick,this);
        }
 
        // 生成一个player角色(简单起见，就是一个圈)
        private makePlayer():void
        {
            this._player=new egret.Sprite();
            this._player.graphics.beginFill(0xff0000);
            this._player.graphics.drawCircle(0, 0, 5);
            this._player.graphics.endFill();
            this._player.x=Math.random() * 600;
            this._player.y=Math.random() * 600;
            this.addChild(this._player);
        }
 
        // 生成网格，并随机放置一些障碍
        private makeGrid():void
        {
            this._grid=new Grid(30, 30);
            for (var i:number=0; i < 200; i++)
            {
                this._grid.setWalkable(Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), false);
            }
            this.drawGrid();
        }
 
        // 画网格线以及为障碍物填充颜色
        private drawGrid():void
        {
            this.graphics.clear();
            for (var i:number=0; i < this._grid.numCols; i++)
            {
                for (var j:number=0; j < this._grid.numRows; j++)
                {
                    var node:Node=this._grid.getNode(i, j);
                    this.graphics.lineStyle(0);
                    this.graphics.beginFill(this.getColor(node));
                    this.graphics.drawRect(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize);
                }
            }
        }
 
        //返回节点颜色
        private getColor(node:MapNode):number
        {
            if (!node.walkable)
                return 0;
            if (node == this._grid.startNode)
                return 0xcccccc;
            if (node == this._grid.endNode)
                return 0xff0000;
            return 0xffffff;
        }
 
        // 鼠标点击时随机设置终点，并以player当前位置做为起点
        private onGridClick(event:MouseEvent):void
        {
            var xpos:number=Math.floor(event.x / this._cellSize);
            var ypos:number=Math.floor(event.x / this._cellSize);
            this._grid.setEndNode(xpos, ypos);
            xpos=Math.floor(this._player.x / this._cellSize);
            ypos=Math.floor(this._player.y / this._cellSize);
            this._grid.setStartNode(xpos, ypos);
            this.drawGrid();
            this.findPath();
        }
 
        // 寻路
        private findPath():void
        {
            var astar:Astar=new Astar();
            if (astar.findPath(this._grid))
            {
                this._path=astar.path;
                this._index=0;
                addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame);
            }
        }
 
        //每帧的动画处理
        private onEnterFrame(event:Event):void
        {
            var targetX:number=this._path[this._index].x * this._cellSize + this._cellSize / 2;
            var targetY:number=this._path[this._index].y * this._cellSize + this._cellSize / 2;
             
            //把经过的点，涂上黄色
            var passedNode:MapNode=this._path[this._index];
            this.graphics.lineStyle(0);
            this.graphics.beginFill(0xffff00);
            this.graphics.drawRect(passedNode.x * this._cellSize, passedNode.y * this._cellSize, this._cellSize, this._cellSize);
             
            var dx:number=targetX - this._player.x;
            var dy:number=targetY - this._player.y;
            var dist:number=Math.sqrt(dx * dx + dy * dy);
            if (dist < 1)
            {
                this._index++;//索引加1，即取一个路径节点
                if (this._index >= this._path.length)//达到最后一个节点时，移除ENTER_FRAME监听
                {
                    removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame);
                }
            }
            else
            {
                this._player.x+=dx * .5;
                this._player.y+=dy * .5;
            }
        }
    }
   */ 
//# sourceMappingURL=Assssstar.js.map
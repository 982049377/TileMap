class Astar
{
        public _startx:number;
        public _starty:number;
        public _endx:number;
        public _endy:number;
        private _grid:Grid;
        private _path:Array<MapNode>=new Array;
        private _openArray:Array<MapNode>=new Array;
        private _closeArray:Array<MapNode>=new Array;
        private _straightCost:number=1.0;
        private _diagCost:number = 1.4;

        // public constructor(x:number, y:number,xx:number,yy:number,grid:Grid)
        // {
        //     this._startx = x;
        //     this._starty = y;
        //     this._endx = xx;
        //     this._endy = y;
        //     this._Grid = grid;
        // }
        public constructor(grid:Grid){
            this._grid=grid;
        }
        public setEndNode(xpos: number, ypos: number) {
            this._endx = xpos;
            this._endy = ypos;
        }
        public setStartNode(xpos: number, ypos: number) {
            this._startx = xpos;
            this._starty = ypos;
        }

        private manhattan(node:MapNode):number{
            return Math.abs(node.x - this._endx) * this._straightCost + Math.abs(node.y + this._endy) * this._straightCost;
        }
 
//几何估价法
        private euclidian(node:MapNode):number{
            var dx:number=node.x - this._endx;
            var dy:number=node.y - this._endy;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        }
 
//对角线估价法
        private diagonal(node:MapNode):number{
            var dx:number=Math.abs(node.x - this._endx);
            var dy:number=Math.abs(node.y - this._endy);
            var diag:number=Math.min(dx, dy);
            var straight:number=dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        }

        public find(){
            var mm:MapNode=new MapNode(this._startx,this._starty);
            this.findPath(mm);
        }
        private findPath(m:MapNode):void
        {
            this._openArray.push(m);         // 起始点加入open表  
            m.g = 0;  
            m.h = this.manhattan(m);  
            m.parent = null;  
      
            if ( m.x == this._endx && m.y == this._endy )  
            {  
                console.log("起点==终点！\n");  
            }  
      
            var is_found = 0;  
  
        while( true )  
        {  
            var curr_node:MapNode = this._openArray[0];      // open表的第一个点一定是f值最小的点(通过堆排序得到的)  
            this._openArray[0]=  this._openArray[ --this._openArray.length];  // 最后一个点放到第一个点，然后进行堆调整  
            this.adjust_heap( 0 );               // 调整堆  
            
        this._closeArray[this._closeArray.length++] = curr_node;    // 当前点加入close表  
            if ( curr_node.x == this._endx && curr_node.y == this._endy )// 终点在close中，结束  
            {  
                is_found = 1;  
                break;  
            }  
            this.get_neighbors( curr_node );           // 对邻居的处理  
            if ( this._openArray.length == 0 )             // 没有路径到达  
            {  
                is_found = 0;  
                break;  
            }  
        }  
        var top = -1; 
        if ( is_found )  
        {  
            curr_node.x = this._endx;
            curr_node.y = this._endy;  
            
            while( curr_node )  
            {  
                this._path[++top] = curr_node;  
                curr_node = curr_node.parent;  
            }  
    
            while( top >= 0 )        // 下面是输出路径看看~  
            {  
                if ( top > 0 )  
                {  
                    console.log("(%d,%d)-->", this._path[top].x, this._path[top--].y);  
                }  
                else  
                {  
                    console.log("(%d,%d)",this._path[top].x, this._path[top--].y);  
                }  
            }  
        }  
        else  
        {  
        console.log("么有找到路径");  
        }  
    }  

        
    private Has_closeArray(M:MapNode):boolean{
        for(var i=0;i<this._closeArray.length;i++){
            if(this._closeArray[i]==M)
                return true;
        }
        return false;
    }
    
    private Has_openArray(M:MapNode):boolean{
        for(var i=0;i<this._openArray.length;i++){
            if(this._openArray[i]==M)
                return true;
        }
        return false;
    }
private swap(idx1:number,idx2:number)    
{    
    var tmp:MapNode =this._openArray[idx1];  
    this._openArray[idx1] = this._openArray[idx2];  
    this._openArray[idx2] = tmp;  
}  
    // 堆调整  
//   
private adjust_heap( /*i*/nIndex:number )      
{     
    var curr = nIndex;  
    var child = curr * 2 + 1;   // 得到左孩子idx( 下标从0开始，所有做孩子是curr*2+1 )  
    var parent = ( curr - 1 ) / 2;  // 得到双亲idx  
  
    if (nIndex < 0 || nIndex >= this._openArray.length)  
    {  
        return;  
    }  
      
    // 往下调整( 要比较左右孩子和cuur parent )  
    //   
    while ( child <this._openArray.length )  
    {  
        // 小根堆是双亲值小于孩子值  
        //   
        if ( child + 1 < this._openArray.length && this._openArray.indexOf[child].g + this._openArray.indexOf[child].h  > this._openArray.indexOf[child+1].g + this._openArray.indexOf[child+1].h )  
        {  
            ++child;// 判断左右孩子大小  
        }  
          
        if (this._openArray.indexOf[curr].g + this._openArray.indexOf[curr].h <= this._openArray.indexOf[child].g + this._openArray.indexOf[child].h)  
        {  
            break;  
        }  
        else  
        {  
            this.swap( child, curr );            // 交换节点  
            curr = child;               // 再判断当前孩子节点  
            child = curr * 2 + 1;           // 再判断左孩子  
        }  
    }  
      
    if (curr != nIndex)  
    {  
        return;  
    }  
  
    // 往上调整( 只需要比较cuur child和parent )  
    //   
    while (curr != 0)  
    {  
        if (this._openArray.indexOf[curr].g + this._openArray.indexOf[curr].h >=this._openArray.indexOf[parent].g + this._openArray.indexOf[parent].h )  
        {  
            break;  
        }  
        else  
        {  
            this.swap( curr, parent );  
            curr = parent;  
            parent = (curr-1)/2;  
        }  
    }  
}    
// 判断邻居点是否可以进入open表  
//   
private insert_to_opentable( x:number,y:number, curr_node:MapNode,w:number )  
{  
    var i:number;  
  
    if ( this._grid[1][2].WalkAble != false )        // 不是障碍物  
    {  
        if ( !this.Has_closeArray(this._grid[x][y]) )   // 不在闭表中  
        {  
            if ( this.Has_openArray(this._grid[x][y]) ) // 在open表中  
            {  
                // 需要判断是否是一条更优化的路径  
                //   
                if ( this._grid[x][y].g > curr_node.g + w )    // 如果更优化  
                {  
                    this._grid[x][y].g = curr_node.g + w;  
                    this._grid[x][y].parent = curr_node;  
  
                    for ( i = 0; i < this._openArray.length; ++i )  
                    {  
                        if ( this._openArray.indexOf[i].x == this._grid[x][y].x && this._openArray.indexOf[i].y == this._grid[x][y].y )  
                        {  
                            break;  
                        }  
                    }  
  
                    this.adjust_heap( i );                   // 下面调整点  
                }  
            }  
            else                                    // 不在open中  
            {  
                this._grid[x][y].g = curr_node.g + w;  
                this._grid[x][y].h = Math.abs(this._endx - x ) + Math.abs(this._endy - y);  
                this._grid[x][y].parent = curr_node;  
                this._openArray.push(this._grid[x][y]); 
            }  
        }  
    }  
}  
    // 查找邻居  
    // 对上下左右8个邻居进行查找  
    //    
    private  get_neighbors( curr_node:MapNode)  
    {  
        var x = curr_node.x;  
        var y = curr_node.y;  
    
        // 下面对于8个邻居进行处理！  
        //   
        if ( ( x + 1 ) >= 0 && ( x + 1 ) < 10 && y >= 0 && y < 10 )  
        {  
            this.insert_to_opentable( x+1, y, curr_node, 10 );  
        }  
    
        if ( ( x - 1 ) >= 0 && ( x - 1 ) < 10 && y >= 0 && y < 10 )  
        {  
            this.insert_to_opentable( x-1, y, curr_node, 10 );  
        }  
    
        if ( x >= 0 && x < 10 && ( y + 1 ) >= 0 && ( y + 1 ) < 10 )  
        {  
            this.insert_to_opentable( x, y+1, curr_node, 10 );  
        }  
    
        if ( x >= 0 && x < 10 && ( y - 1 ) >= 0 && ( y - 1 ) < 10 )  
        {  
            this.insert_to_opentable( x, y-1, curr_node, 10 );  
        }  
    
        if ( ( x + 1 ) >= 0 && ( x + 1 ) < 10 && ( y + 1 ) >= 0 && ( y + 1 ) < 10 )  
        {  
            this.insert_to_opentable( x+1, y+1, curr_node, 14 );  
        }  
    
        if ( ( x + 1 ) >= 0 && ( x + 1 ) < 10 && ( y - 1 ) >= 0 && ( y - 1 ) < 10 )  
        {  
            this.insert_to_opentable( x+1, y-1, curr_node, 14 );  
        }  
    
        if ( ( x - 1 ) >= 0 && ( x - 1 ) < 10 && ( y + 1 ) >= 0 && ( y + 1 ) < 10 )  
        {  
            this.insert_to_opentable( x-1, y+1, curr_node, 14 );  
        }  
    
        if ( ( x - 1 ) >= 0 && ( x - 1 ) < 10 && ( y - 1 ) >= 0 && ( y - 1 ) < 10 )  
        {  
            this.insert_to_opentable( x-1, y-1, curr_node, 14 );  
        }  
    }  
    
        
}

class MapNode{
    public x:number;
    public y:number;
    public WalkAble:boolean;
    public f:number;
    public g:number;
    public h:number;
    public parent:MapNode;
    public costMultiplier:number=1.0;//代价因子

    public constructor(x:number, y:number)
    {
        this.x=x;
        this.y=y;
    }
}

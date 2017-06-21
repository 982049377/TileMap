class TaskService{
    //private _tasklist:Task[]=[];
    private _observerlist:Observer[]=[];
    private static instance;
    private static count=0;
    private _tasklist:{[index:string]:Task}={}

    constructor(){
        TaskService.count++;
        if(TaskService.count>1)
            throw 'singleton!!';
    }

    public static getIntance(){
        if(TaskService.instance == null){
            TaskService.instance =new TaskService();
        }
        return TaskService.instance;
    }

    public addTask(task:Task){
        this._tasklist[task.getid()]=task;
    }

    public addObserver(observer:Observer){
        this._observerlist.push(observer);
    }
}
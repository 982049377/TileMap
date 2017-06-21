var TaskService = (function () {
    function TaskService() {
        //private _tasklist:Task[]=[];
        this._observerlist = [];
        this._tasklist = {};
        TaskService.count++;
        if (TaskService.count > 1)
            throw 'singleton!!';
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getIntance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    p.addTask = function (task) {
        this._tasklist[task.getid()] = task;
    };
    p.addObserver = function (observer) {
        this._observerlist.push(observer);
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map
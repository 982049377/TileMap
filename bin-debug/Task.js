var Task = (function () {
    function Task(id, name) {
        this._id = id;
        this._name = name;
    }
    var d = __define,c=Task,p=c.prototype;
    p.getid = function () {
        return this._id;
    };
    p.getname = function () {
        return this._name;
    };
    p.finish = function () {
        this._status = statusType.Complete;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var statusType;
(function (statusType) {
    statusType[statusType["Unacceptable"] = 0] = "Unacceptable";
    statusType[statusType["Acceptable"] = 1] = "Acceptable";
    statusType[statusType["Working"] = 2] = "Working";
    statusType[statusType["Cancomplete"] = 3] = "Cancomplete";
    statusType[statusType["Complete"] = 4] = "Complete";
})(statusType || (statusType = {}));
//# sourceMappingURL=Task.js.map
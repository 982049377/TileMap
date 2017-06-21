class Task{
    private _id:string;
    private _name:string;
    private _dris:string;
    private _status:statusType;

    constructor(id:string,name:string){
        this._id=id;
        this._name=name;
    }

    public getid():string{
        return this._id;
    }
    public getname():string{
        return this._name;
    }
    public finish(){
        this._status=statusType.Complete;
    }
}

enum statusType{
    Unacceptable,
    Acceptable,
    Working,
    Cancomplete,
    Complete
}
interface Observer{
    onchange(task:Task);
}

class NPC  implements Observer{

    public onchange(task:Task){

    }
}

class TaskPanel  implements Observer{

    public onchange(task:Task){
        
    }
}
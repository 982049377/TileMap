/* class MachineState {
      _State:State;
      public SetState(e:State){
          if(this._State){
              this._State.onExit();
          }
          e=this._State;
          this._State.onEnter();
       }
  }
  interface State  {

      onEnter();
      
      onExit();
  }
  class Walk implements State{
      onEnter(){

      }
      onExit(){

      }
  }
  class Idle implements State{
      onEnter(){

      }
      onExit(){

      }
}
  
*/ 
//# sourceMappingURL=MachineState.js.map
//boolean[] activation_array;

class KeyEventHandler {
 
  KeyEventHandler() {
    // use the activation array for now, then find a better mechanism (multi instance, defined areas, ...)
    //activation_array = new boolean[22];
    for(int i = 0; i < activation_array.length; i ++){
      activation_array[i] = 0;
    }
  }
  void keyPressedEvent(KeyEvent ke){
    println(keyCode);
    int index = -1;
    try{
      if(keyCode >= 97 && keyCode <= 108){
        index = keyCode-86;
      }else{
        index = Integer.parseInt(""+key);
      }
    }catch(NumberFormatException e){}
      if (index < activation_array.length && index >= 0){
        if(activation_array[index] == 1){
            activation_array[index] = 0;
        }else{
            activation_array[index] = 1;
        }
      }
      
      println(activation_array);
  }
  
  //boolean[] getActivationArray(){
  //   return  activation_array;
  //}
}

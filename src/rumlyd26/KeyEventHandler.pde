//boolean[] activation_array;

class KeyEventHandler {
  boolean CONTROL_PRESSED;
  KeyEventHandler() {
    // use the activation array for now, then find a better mechanism (multi instance, defined areas, ...)
    selected_window = -1;
  }
  void keyPressedEvent(KeyEvent ke){
    println(keyCode);
    if(keyCode == CONTROL){
      CONTROL_PRESSED = !CONTROL_PRESSED;
      println("CONTROL_PRESSED:: " + CONTROL_PRESSED);
    }
    if(keyCode == 65){
      selected_window = -1;
    }
    
    
    // set activation array
    int index = -1;
    try{
      if(keyCode >= 97 && keyCode <= 108){
        index = keyCode-86;
      }else{
        index = Integer.parseInt(""+key);
      }
    }catch(NumberFormatException e){}
    
    
    println("IDX: " + index + " CONTROL_PRESSED " + CONTROL_PRESSED);
    if(!CONTROL_PRESSED && index > 0){
      //if(index>0 && index < window_array[selected_window].get_activation_array().length){

      if(selected_window < 0){
        for(int i = 0; i < window_array.length; i++){
          setActivationArray(i, index);
        }
      }else{
        setActivationArray(selected_window, index);
      }  
    //}
      
    }else{
      selected_window = index;
      println("Selected window " + selected_window);

    }
}
 
  void setActivationArray(int sel_window, int idx){
       if(window_array[sel_window].get_activation_array()[idx] == 1){
          window_array[sel_window].get_activation_array()[idx] = 0;
      }else{
          window_array[sel_window].get_activation_array()[idx] = 1;
      }    
  }
  //void keyReleasedEvent(KeyEvent ke){
  //  if(ke.getKeyCode() == CONTROL){
  //    CONTROL_PRESSED = false;
  //    println("CONTROL_PRESSED:: " + CONTROL_PRESSED);

  //  }
  //}
}

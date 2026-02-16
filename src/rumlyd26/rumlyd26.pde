float[] activation_array;
AnimationWindow window_array[];
KeyEventHandler keh;
boolean USE_VERTEX_SHADER = false;
String FRAGMENT_SHADER_FILE = "fragment_shader.glsl";
String VERTEX_SHADER_FILE = "vertex_shader.glsl";
int NUM_WINDOWS = 5;

PShader shader;

void setup() {
  size(640, 360, P3D);
  //fullScreen(P3D);
  activation_array = new float[22];
  keh = new KeyEventHandler();
  
  //shader = loadShader(FRAGMENT_SHADER_FILE, VERTEX_SHADER_FILE);
  shader = loadShader(FRAGMENT_SHADER_FILE);
  
  // create the animation windows
  window_array = new AnimationWindow[NUM_WINDOWS];
  for(int i = 0; i < NUM_WINDOWS; i++){
    window_array[i] = new AnimationWindow(this, shader); 
    window_array[i].setup();
  }
}

void keyPressed(KeyEvent ke){
  keh.keyPressedEvent(ke);
}

float[] getActivationArray(){
   return activation_array;
}

void draw() {
  background(1);
  noStroke();
  for(int i = 0; i < NUM_WINDOWS; i++){
    window_array[i].setActivationArray(activation_array);
  }
  rect(0,0,width,height);
}

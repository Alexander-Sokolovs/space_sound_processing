//float[] activation_array;
int selected_window;

AnimationWindow window_array[];
KeyEventHandler keh;
boolean USE_VERTEX_SHADER = false;
String FRAGMENT_SHADER_FILE = "fragment_shader.glsl";
String VERTEX_SHADER_FILE = "vertex_shader.glsl";
int NUM_WINDOWS = 3;

PShader shader;

void setup() {
  size(640, 360, P3D);
  //fullScreen(P3D);
  //activation_array = new float[22];
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
//void keyReleased(KeyEvent ke){
//  keh.keyReleasedEvent(ke);
//}


void draw() {
  background(1);
  noStroke();
  
  rect(0,0,width,height);
}

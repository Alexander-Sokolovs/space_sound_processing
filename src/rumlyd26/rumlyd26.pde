AnimationWindow window_array[];
boolean USE_VERTEX_SHADER = false;
String FRAGMENT_SHADER_FILE = "fragment_shader.glsl";
String VERTEX_SHADER_FILE = "vertex_shader.glsl";
int NUM_WINDOWS = 2;

PShader shader;

void setup() {
  size(640, 360, P3D);
  //fullScreen(P3D);
  
  //shader = loadShader(FRAGMENT_SHADER_FILE, VERTEX_SHADER_FILE);
  shader = loadShader(FRAGMENT_SHADER_FILE);
  // create the animation windows
window_array = new AnimationWindow[NUM_WINDOWS];
  for(int i = 0; i < NUM_WINDOWS; i++){
    window_array[i] = new AnimationWindow(shader); 
    window_array[i].setup();
  }
}

void draw() {
  background(1);
  noStroke();
  
  // pass variables to be used inside the shader code
  //for(AnimationWindow window: window_array){
  //  PShader current_shader = window.getShader();
  //  current_shader.set("u_resolution", float(width), float(height));
  //  current_shader.set("u_time", millis() / 1000.0);
  //  current_shader.set("u_mouse", float(mouseX), float(mouseY));
  //}


  rect(0,0,width,height);
}

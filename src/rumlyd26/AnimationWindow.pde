class AnimationWindow extends PApplet {
  PApplet parent;
  
  PShader shader;
  boolean use_vert_shader;
  String fragment_shader_file;
  String vertex_shader_file;
  boolean orbit;
  float[] act_arr;
  
  
  public AnimationWindow(PApplet parent_app, PShader SHADER) {
  super();
  parent = parent_app;
  shader = SHADER;
  act_arr = new float[22];
  PApplet.runSketch(new String[]{this.getClass().getName()}, this);
  }

  void settings() {
    size(400, 400, P3D);
  }
  
  void setup() {
    surface.setResizable(true);

    windowTitle("Animation window");
    shader(shader);
    
    orbit = true;

  }

  void mouseClicked(){  
    orbit = !orbit;
  }

  void draw() {
    shader.set("u_resolution", float(width), float(height));
    shader.set("u_time", millis() / 1000.0);
    shader.set("u_mouse", float(mouseX), float(mouseY));
    shader.set("u_orbit", orbit?1:0);
    shader.set("u_activation_array", act_arr);

    noStroke();

    rect(0,0,width,height);

  }
  void setActivationArray(float[] _activation_array){
    act_arr = _activation_array;
  }
  
  PShader getShader(){
    return shader;
  }
}

class AnimationWindow extends PApplet {
  PShader shader;
  boolean use_vert_shader;
  String fragment_shader_file;
  String vertex_shader_file;
  boolean orbit;

  
  public AnimationWindow(PShader SHADER) {
  super();
  shader = SHADER;
  PApplet.runSketch(new String[]{this.getClass().getName()}, this);
  }

  public void settings() {
    size(400, 400, P3D);
  }
  
  public void setup() {
    windowTitle("Child animation window");
    shader(shader);
    
    orbit = true;

  }

void mouseClicked(){  
  orbit = !orbit;
  println("HelloWorld");
}

  public void draw() {
    shader.set("u_resolution", float(width), float(height));
    shader.set("u_time", millis() / 1000.0);
    shader.set("u_mouse", float(mouseX), float(mouseY));
      shader.set("u_orbit", orbit);

    noStroke();

    rect(0,0,width,height);

  }
  public PShader getShader(){
    return shader;
  }
}

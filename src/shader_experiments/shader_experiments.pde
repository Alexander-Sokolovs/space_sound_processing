PShader shader;

void setup() {
  size(640, 640, P3D);
  noStroke();

  shader = loadShader("shader2.frag");
}

void draw() {
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);
  shader(shader);
  rect(0,0,width,height);
  //circle(width/2, height/2, 50);
  //circle(width/4, height/2, 50);

}

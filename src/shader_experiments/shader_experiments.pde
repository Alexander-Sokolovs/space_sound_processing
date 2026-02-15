//PShader shader;
//PShader shader2;
//boolean orbit;
//void setup() {
//  //fullScreen(P3D);
//  size(640, 640, P3D);
//  noStroke();
//  orbit = true;
//  shader = loadShader("shader2.frag");
//  shader2 = loadShader("vertex_shader.vert");
//  shader(shader, TRIANGLES);
//  shader(shader, POINTS);

//}

//void mouseClicked(){  
//  orbit = !orbit;
//  println("HelloWorld");
//}

//void draw() {
//  shader.set("u_resolution", float(width), float(height));
//  shader.set("u_mouse", float(mouseX), float(mouseY));
//  shader.set("u_time", millis() / 1000.0);
//  shader.set("u_orbit", orbit);
//  rect(0,0,width,height);
//}




PShader flatShader;

void setup() {
  //size(640, 360, P3D);
  fullScreen(P3D);
  flatShader = loadShader("shader2.frag", "vertex_shader.vert");
  //flatShader = loadShader("shader2.frag");
  shader(flatShader);
}

void draw() {
  flatShader.set("u_resolution", float(width), float(height));
  flatShader.set("u_time", millis() / 1000.0);
  flatShader.set("u_mouse", float(mouseX), float(mouseY));

  //background(1);
  noStroke();
  
  rect(0,0,width,height);
}

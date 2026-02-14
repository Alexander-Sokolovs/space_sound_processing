uniform vec2 u_resolution;
uniform vec2 u_mouse;
//attribute vec4 inVertex;

uniform mat4 transform;   // Combined model-view-projection matrix
attribute vec4 position;  // Vertex position
uniform float u_time;

varying vec4 vertColor;
varying vec4 transformedPosition;

mat3 rotateX(float _angle){
    return mat3(1, 		0, 		0,
    			0, cos(_angle),-sin(_angle),
                0, sin(_angle),cos(_angle));
}
mat3 rotateY(float _angle){
    return mat3(cos(_angle), 0,  sin(_angle),
    			0,			 1, 		0,
                -sin(_angle), 0,   cos(_angle));
}
mat3 rotateZ(float _angle){
    return mat3(cos(_angle),-sin(_angle), 0,
                sin(_angle),cos(_angle),  0,
                0, 			0, 			  1);
}

void main() {

  vec4 pos = vec4(position.xyz, 1.0);
  vec3 rot_pos = position.xyz;
  rot_pos = rot_pos * rotateZ(sin(u_time));

  //rot_pos = rot_pos * rotateZ(1);
  //float pos_x = pos.x;
  //float pos_y = pos.y;
  //vec2 rot_xy = vec2(pos_x, pos_y)*rotateX(1.5);

  //transformedPosition = vec4(rot_pos.x, rot_pos.y, rot_pos.z*3, 1);
  float freq = 5;
  float ampl = 50;
  //gl_Position = transform * vec4(rot_pos.x/2, rot_pos.y/2, sin(u_time*freq)*ampl+pos.z, 1.0);
  gl_Position = transform * vec4(rot_pos.x, rot_pos.y, rot_pos.z, 1.0);
  transformedPosition = position;
  //vertColor = vec4(position.x, 0.5, 0.0, 1.0);

}
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif
uniform vec2 u_resolution;
varying vec4 transformedPosition;

void main() {
    //vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 st = transformedPosition.xy;

    vec3 canvas = vec3(step(st.x, 0.5), 0.5, 0.0);

  	gl_FragColor = vec4(canvas, 1.0);
  	//gl_FragColor = vertColor;
}
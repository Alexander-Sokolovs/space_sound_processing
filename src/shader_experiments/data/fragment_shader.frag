#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec4 transformedPosition;


vec3 shadow_follow_mouse(vec2 _st) {

    //vec2 uv = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    //vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 pos_mouse = u_mouse/u_resolution;
    vec2 diff = vec2(pos_mouse.x-_st.x, 1.0-pos_mouse.y-_st.y);
    float dist = length(diff);
    vec3 point = vec3(dist, dist, dist);
    //vec3 point = vec3(dist*tan(u_time), dist*sin(u_time), dist*-1*sin(u_time));
    return point;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    //vec2 st = transformedPosition.xy;
    vec2 pos_mouse = u_mouse/u_resolution;

    vec3 canvas = vec3(step(st.x, 0.5), 0.5, 0.0);
    canvas += shadow_follow_mouse;

  	gl_FragColor = vec4(canvas, 1.0);
  	//gl_FragColor = vertColor;
}
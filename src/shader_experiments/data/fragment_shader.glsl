#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform bool u_orbit;

varying vec4 transformedPosition;

// --- HELPER FUNCTIONS ---


// --- SCENES ---
vec3 shadow_follow_mouse(vec2 _st, vec2 pos_m) {

    //vec2 uv = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    //vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 diff = vec2(pos_m.x-_st.x, 1.0-pos_m.y-_st.y);
    float dist = length(diff);
   vec3 point = vec3(length(diff)>0.1, 0.0, 0.0);

    //vec3 point = vec3(dist*tan(u_time), dist*sin(u_time), dist*-1*sin(u_time));
    return point;
}

// --- MAIN ---

void main(){
    vec3 canvas = vec3(0.0, 0.0, 0.0);
    //vec2 st = 2.0*(gl_FragCoord.xy*2.0-u_resolution.xy)/u_resolution.y;
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec2 pos_mouse = u_mouse/u_resolution;
    //vec2 pos_mouse = 2.0*(u_mouse.xy*2.0-u_resolution.xy);

	//canvas += vec3(1.0, 0.0 ,0.0);

    canvas += shadow_follow_mouse(st, pos_mouse);

  	gl_FragColor = vec4(canvas, 1.0);
}
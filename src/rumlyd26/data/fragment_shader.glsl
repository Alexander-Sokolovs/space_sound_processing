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


vec2 turbulence(vec2 pos){
    // https://mini.gmshaders.com/p/turbulence
    //Number of turbulence waves
    #define TURB_NUM 8.0
    //Turbulence wave amplitude
    #define TURB_AMP 0.7
    //Turbulence wave speed
    #define TURB_SPEED 0.6
    //Turbulence frequency
    #define TURB_FREQ 3.0
    //Turbulence frequency multiplier
    #define TURB_EXP 0.9

    //Turbulence starting scale
    float freq = TURB_FREQ;

    //Turbulence rotation matrix
    mat2 rot = mat2(0.6, -0.8, 0.8, 0.6);

    //Loop through turbulence octaves
    for(float i=0.0; i<TURB_NUM; i++)
    {
        //Scroll along the rotated y coordinate
        float phase = freq * (pos * rot).y + TURB_SPEED*u_time + i;
        //Add a perpendicular sine wave offset
        pos += TURB_AMP * rot[0] * sin(phase) / freq;

        //Rotate for the next octave
        rot *= mat2(0.6, -0.8, 0.8, 0.6);
        //Scale down for the next octave
        freq *= TURB_EXP;
    }
        return pos;
}

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
    vec2 pos_mouse =  2*(u_mouse.xy*2.0-u_resolution.xy)/u_resolution.y+0.5;
    vec2 st = 2*(gl_FragCoord.xy*2.0-u_resolution.xy)/u_resolution.y+0.5;

	if(u_orbit){
		canvas += shadow_follow_mouse(st, pos_mouse);
    }

    // turbulence: 
    st = turbulence(st);

    vec3 col_x0 = vec3(0.2, 0.0, 1.0);
    vec3 col_x1 = vec3(1.0, 0.0, 0.2);

    vec3 col = mix(col_x0, col_x1, st.y);
    //Vary brightness
    col /= dot(cos(st*3.),sin(-st.yx*3.*.618))+2.0;
    //Exponential tonemap
    col = 1.0 - exp(-col);
    canvas += col;  

    // -----------------  

  	gl_FragColor = vec4(canvas, 1.0);
}
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_orbit;
uniform float u_activation_array[22];

varying vec4 transformedPosition;

// --- HELPER FUNCTIONS ---
float random(vec2 _st, float seed) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123+seed);
}

vec3 draw_point(vec2 _st, vec2 _pos_xy, float size)
{
    vec2 diff = vec2(_pos_xy.x-_st.x, _pos_xy.y-_st.y);
    vec3 point = vec3(0.0, 0.0, 0.0);
   // float dist = sqrt(((pos_mouse.x-st.x)*(pos_mouse.x-st.x))+((pos_mouse.y-st.y)*(pos_mouse.y-st.y)));
    float dist = length(diff);
    if(dist<size/100.0){
        point = vec3(2*_st.x, 1-_st.x, 0.0);

    }

    return point;
}

// --- SCENES ---
vec3 radar_scan(vec2 _st){
    vec3 planets = vec3(0.0, 0.0, 0.0);
    for(int i = 0; i < 5; i++){
        float phase = u_time+random(_st, 0.0);
        planets += draw_point(_st, vec2(0.5+sin(phase)*i*0.5, 0.5+cos(phase)*i*0.5), 5);
    }
    return planets;
}

vec3 spiral_planets(vec2 _st, vec2 center){
    vec3 planets = vec3(0.0, 0.0, 0.0);
    float num_planets = 300;
    for(int i = 0; i < num_planets; i++){
        float phase = u_time*i*0.001;
        planets += draw_point(_st, vec2(center.x+sin(phase)*i*0.001, 1.0-center.y+cos(phase)*i*0.001), i*0.04);
    }
    return planets;
}

vec3 planets(vec2 _st, vec2 center){
    vec3 planets = vec3(0.0, 0.0, 0.0);
    float num_planets = 10;
    for(int i = 0; i < num_planets; i++){
        float phase = u_time*i*0.1;
        planets += draw_point(_st, vec2(center.x+sin(phase)*i*0.01, center.y+cos(phase)*i*0.01), i*4);
    }
    return planets;
}

vec3 orbit_motion(vec2 _st, float amplitude)
{
    vec3 tmp_canvas;
    float i = 0;
    for(int x = 0; x <  3; x++)
    {
        i = x + 0.1;
        tmp_canvas += draw_point(_st, vec2((sin(u_time*10*(0.5-i*0.25))*amplitude)+0.5, 0.5+cos(u_time*8*(0.5-i*0.15))*(amplitude-i*0.01)), 15);
    }

    for(int x = 0; x <  3; x++)
    {
        i = x + 0.1;
        tmp_canvas += draw_point(_st, vec2((sin(u_time*9*(0.5-i*0.25))*amplitude)+0.25, 0.5+cos(u_time*9*(0.5-i*0.15))*(amplitude-i*0.01)), 15);
    }

    for(int x = 0; x <  3; x++)
    {
        i = x + 0.1;
        tmp_canvas += draw_point(_st, vec2((sin(u_time*8*(0.5-i*0.25))*amplitude)+0.75, 0.5+cos(u_time*10*(0.5-i*0.15))*(amplitude-i*0.01)), 15);
    }
    return tmp_canvas;
}

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

	//canvas += shadow_follow_mouse(st, pos_mouse)*u_orbit;
	canvas += radar_scan(st)*u_activation_array[1];
	canvas += shadow_follow_mouse(st, pos_mouse)*u_activation_array[2];
	canvas += spiral_planets(st, pos_mouse)*u_activation_array[3];
	canvas += planets(st, vec2(0.5, 0.5))*u_activation_array[4];
	canvas += orbit_motion(st, sin(u_time*2))*u_activation_array[5];

	//canvas += vec3(0.0, u_activation_array[0], 0.0);

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
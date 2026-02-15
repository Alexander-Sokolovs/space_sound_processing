#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform bool u_orbit;

varying vec4 transformedPosition;

float random(vec2 _st, float seed) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123+seed);
}

float star(in vec2 st, in vec2 pos_mouse){
    
    if(st.x - 30.0 < 2.0)
    {
            return 1.0;
    }
    return 0.0;
}

vec3 draw_point(vec2 _st, vec2 _pos_xy, float size)
{
    vec2 diff = vec2(_pos_xy.x-_st.x, _pos_xy.y-_st.y);
    vec3 point = vec3(0.0, 0.0, 0.0);
   // float dist = sqrt(((pos_mouse.x-st.x)*(pos_mouse.x-st.x))+((pos_mouse.y-st.y)*(pos_mouse.y-st.y)));
    float dist = length(diff);
    if(dist<size/1000.0){
        point = vec3(2*_st.x, 1-_st.x, 0.0);

    }

    return point;
}

vec3 draw_many_points(vec2 _st, vec3 canvas, float size) {
    vec2[4] point_array = {{0.5, 0.5}, {0.1, 0.1}, {0.7, 0.7}, {0.1, 0.8}};
    for (int i = 0; i < 4; i++)
    {
       canvas += draw_point(_st, point_array[i], size);
    }
    return canvas;
}

vec3 draw_stars(vec2 _st, vec3 canvas, float size) {
    vec2[4] point_array = {{0.5, 1-random(_st, u_time)}, {0.5,1-random(_st, u_time)}, {0.5, 1-random(_st, u_time)}, {0.5, 1-random(_st, u_time)}};
    for(int i = 0; i < 4; i ++)
    {
        canvas += draw_point(_st, point_array[i], size);
    }
    return canvas;
}

vec3 draw_stars2(vec2 _st, vec3 canvas, float size, float seed) {
    if(random(_st, seed)> 0.99)
    {
        canvas += draw_point(_st, _st, size);
    }
    return canvas;
}

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

vec3 fading_circle(vec2 _st, vec2 x_y, float time_shift, float speed) {
    float dist = length(x_y);
    //vec3 point = vec3(dist*tan(u_time+time_shift)*speed*0.6, dist*sin(u_time+time_shift)*speed, dist*-1*sin(u_time+time_shift)*speed);
    vec3 point = vec3(0.0, 0.0, dist*-1*sin(u_time+time_shift)*speed);
    return point;

}

float fade(float pct, float dir){
    return smoothstep( pct-1, pct, dir);
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

vec3 noise_squares(in vec2 _st){
    float time_factor = u_time*0.03;

    _st *= 15;
    vec2 ipos = floor(_st.xy);  // get the integer coords
    vec2 fpos = fract(_st.xy);  // get the fractional coords

    vec2 a = vec2(random(ipos, sin(time_factor/2)));
    vec2 b = vec2(random(ipos + 1.0, time_factor));
    vec2 y = mix(a, b, fpos);
    return vec3(y.x, y.y, y.y/2);
}

//vec3 trace_painter()
//{
//    // save all points in a list and draw them again and again??
//    return vec3(0);
//}

vec3 unequal_circle(vec2 _st){

    float time_factor = u_time*0.02;

    vec2 center = vec2(0.5+sin(time_factor*10)*0.5, 0.5+cos(time_factor*5)*0.5);
    vec2 diff = vec2(center.x-_st.x, center.y-_st.y);
    vec3 point = vec3(0.0, 0.0, 0.0);
   // float dist = sqrt(((pos_mouse.x-st.x)*(pos_mouse.x-st.x))+((pos_mouse.y-st.y)*(pos_mouse.y-st.y)));
    float dist = length(diff);

    float c1 = sin(time_factor+0.5)*0.4+(sin(_st.y*40*cos(time_factor))*0.1*sin(time_factor));
    float c2 = cos(time_factor+0.3)*0.2+(sin(_st.x*60*cos(time_factor))*0.4*cos(time_factor));
    float c3 = sin(time_factor+0.9)*0.7+(cos(_st.y*40*cos(time_factor))*0.1*sin(time_factor));

    return vec3(dist < c1-c3, dist > c2+c1, dist < c3+c2);
}

vec3 radar_scan(vec2 _st){
    vec3 planets = vec3(0.0, 0.0, 0.0);
    for(int i = 0; i < 5; i++){
        float phase = u_time+random(_st, 0.0);
        planets += draw_point(_st, vec2(0.5+sin(phase)*i*0.1, abs(0.5+cos(phase)*i*0.1)), 20);
    }
    return planets;
}

vec3 spiral_planets(vec2 _st){
    vec3 planets = vec3(0.0, 0.0, 0.0);
    float num_planets = 300;
    for(int i = 0; i < num_planets; i++){
        float phase = u_time*i*0.001;
        planets += draw_point(_st, vec2(0.5+sin(phase)*i*0.001, abs(0.5+cos(phase)*i*0.001)), i*0.04);
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

vec3 pendulum(vec2 _st){

    //return draw_point(_st, vec2(0.5+sin(u_time)*0.1, 0.5+cos(u_time)*0.1), 20);
    return draw_point(_st, vec2(0.5+sin(u_time)*0.4, 0.3+cos(u_time*2)*-0.1), 20);
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

void main() {
    vec3 canvas = vec3(0.0, 0.0, 0.0);

    //vec2 st = 2.0*(gl_FragCoord.xy*2.0-u_resolution.xy)/u_resolution.y;
    //vec2 st = gl_FragCoord.xy/u_resolution;


    vec2 st = transformedPosition.xy/u_resolution;
    //st = vec2(st.x+0.5, st.y+0.5);

    // ----

    vec2 pos_mouse = u_mouse/u_resolution;

    st = turbulence(st);

    vec3 col_x0 = vec3(0.2, 0.0, 1.0);
    vec3 col_x1 = vec3(1.0, 0.0, 0.2);

    vec3 col = mix(col_x0, col_x1, st.y);
    //Vary brightness
    col /= dot(cos(st*3.),sin(-st.yx*3.*.618))+2.0;
    //Exponential tonemap
    col = 1.0 - exp(-col);
    //canvas += col;

    //---

    //st = gl_FragCoord.xy/u_resolution;

    //vec2 diff = vec2(0.3-st.x, 0.5-st.y);
    
   // float dist = sqrt(((pos_mouse.x-st.x)*(pos_mouse.x-st.x))+((pos_mouse.y-st.y)*(pos_mouse.y-st.y)));
    //float dist = length(diff);
    
   //vec3 point = vec3(dist>0.02, 0.0, 0.0);

    //canvas += pendulum(st);
    //canvas += unequal_circle(st);

    //canvas += planets(st, vec2(0.5, 0.5));
    //canvas += planets(st, vec2(0.3, 0.3));
    //canvas += planets(st, vec2(0.7, 0.7));
//
    //canvas += spiral_planets(st);
    //canvas += radar_scan(st);
    //canvas += orbit_motion(st, sin(u_time*2)/5);


    //canvas += unequal_circle(st);

    //canvas += draw_point(st, vec2(pos_mouse.x, 1.0-pos_mouse.y), 20);
    //canvas += draw_point(st, vec2(pos_mouse.x+0.1, 1.0-pos_mouse.y), 20);
    //canvas += shadow_follow_mouse(st);
    //canvas += shadow_follow_mouse(st, vec2(pos_mouse.x-st.x, 1.0-pos_mouse.y-st.y));
    //canvas += shadow_follow_mouse(st);

    //canvas += fading_circle(st, vec2(0.5-st.x, 1.0-0.5-st.y), 0, 1.0);
    //canvas += fading_circle(st, vec2(0.1-st.x, 1.0-0.8-st.y), 0.1, 2.0);
   //canvas += fading_circle(st, vec2(0.3-st.x, 1.0-0.4-st.y), 0.3, 1.5);
   //canvas += fading_circle(st, vec2(0.1-st.x, 1.0-0.4-st.y), 0.6, 0.3);
   //canvas += fading_circle(st, vec2(0.1-st.x, 1.0-0.4-st.y), 0.8, 0.7);

    //canvas += fading_circle(st, vec2(0.5-st.x, 1.0-0.5-st.y), 0, 0.9);
    //canvas += fading_circle(st, vec2(0.3-st.x, 1.0-0.8-st.y), 0.2, 0.5);
    //canvas += fading_circle(st, vec2(0.9-st.x, 1.0-0.7-st.y), 0.3, 1.2);
    //canvas += fading_circle(st, vec2(0.9-st.x, 1.0-0.1-st.y), 0.7, 1.6);
    //canvas += fading_circle(st, vec2(0.1-st.x, 1.0-0.2-st.y), 0.44, 0.44);
    //canvas += shadow_follow_mouse(1.0-st, vec2(0.7-st.x, 1.0-0.7-st.y));
    //canvas += draw_many_points(st, canvas, 10);
    //int tmp = (st.x>0.5);


//---
   //canvas += draw_stars2(st, canvas, 20, 0.0);
   //if(u_orbit){   //}

   //canvas += noise_squares(st);
  // bool tmp = (st.x-0.5>-0.1)&&(st.x-0.5<0.1)&&(st.y-0.1<0.1)&&(st.y-0.1>-0.1);
   //canvas += vec3(tmp, 0.0, 0.0);
//---
    //canvas += vec3(random(ipos));


    //canvas += vec3(0.0, 0.0, 0.3);
    //point += point_star;  

    //canvas += vec3(step(st.x, 0.5), 0.5, 0.0);
  

    gl_FragColor = vec4(canvas, 0.1);
}
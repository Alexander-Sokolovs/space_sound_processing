// Author: @patriciogv
// Title: CellularNoise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (vec2 _st, float seed) {
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

//vec3 shadow_follow_mouse(vec2 _st) {
//
//    //vec2 uv = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
//    //vec2 st = gl_FragCoord.xy/u_resolution;
//    vec2 pos_mouse = u_mouse/u_resolution;
//    vec2 diff = vec2(pos_mouse.x-_st.x, 1.0-pos_mouse.y-_st.y);
//    float dist = length(diff);
//    vec3 point = vec3(dist*_st.x, dist*(1-_st.x), dist*(1-_st.y));
//    //vec3 point = vec3(dist*tan(u_time), dist*sin(u_time), dist*-1*sin(u_time));
//    return point;
//}

vec3 fading_circle(vec2 _st, vec2 x_y, float time_shift, float speed) {
    float dist = length(x_y);
    vec3 point = vec3(dist*tan(u_time+time_shift)*speed, dist*sin(u_time+time_shift)*speed, dist*-1*sin(u_time+time_shift)*speed);
    return point;

}

float fade(float pct, float dir){
    return smoothstep( pct-1, pct, dir);
}
vec3 orbit_motion(vec2 _st)
{
    vec3 tmp_canvas;
    float i = 0;
    for(int x = 0; x <  3; x++)
    {
        i = x + 0.1;
        tmp_canvas += draw_point(_st, vec2((sin(u_time*10*(0.5-i*0.25))*0.1)+0.5, 0.5+cos(u_time*8*(0.5-i*0.15))*(0.1-i*0.01)), 5);
    }

    for(int x = 0; x <  3; x++)
    {
        i = x + 0.1;
        tmp_canvas += draw_point(_st, vec2((sin(u_time*9*(0.5-i*0.25))*0.1)+0.25, 0.5+cos(u_time*9*(0.5-i*0.15))*(0.1-i*0.01)), 5);
    }

    for(int x = 0; x <  3; x++)
    {
        i = x + 0.1;
        tmp_canvas += draw_point(_st, vec2((sin(u_time*8*(0.5-i*0.25))*0.1)+0.75, 0.5+cos(u_time*10*(0.5-i*0.15))*(0.1-i*0.01)), 5);
    }
    return tmp_canvas;
}

vec3 trace_painter()
{
    // save all points in a list and draw them again and again??
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;

    vec2 pos_mouse = u_mouse/u_resolution;

    //vec2 diff = vec2(0.3-st.x, 0.5-st.y);
    
   // float dist = sqrt(((pos_mouse.x-st.x)*(pos_mouse.x-st.x))+((pos_mouse.y-st.y)*(pos_mouse.y-st.y)));
    //float dist = length(diff);
    
   //vec3 point = vec3(dist>0.02, 0.0, 0.0);
    vec3 canvas = vec3(0.0, 0.0, 0.0);
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
//
    //canvas += fading_circle(st, vec2(0.5-st.x, 1.0-0.5-st.y), 0, 0.9);
    //canvas += fading_circle(st, vec2(0.3-st.x, 1.0-0.8-st.y), 0.2, 0.5);
    //canvas += fading_circle(st, vec2(0.9-st.x, 1.0-0.7-st.y), 0.3, 1.2);
    //canvas += fading_circle(st, vec2(0.9-st.x, 1.0-0.1-st.y), 0.7, 1.6);
    //canvas += fading_circle(st, vec2(0.1-st.x, 1.0-0.2-st.y), 0.44, 0.44);
    ////canvas += shadow_follow_mouse(1.0-st, vec2(0.7-st.x, 1.0-0.7-st.y));
    //canvas += draw_many_points(st, canvas, 10);

    //st *= 10;
    //vec2 ipos = floor(st);  // get the integer coords
    //vec2 fpos = fract(st);  // get the fractional coords
    //canvas += shadow_follow_mouse(fpos);

    //canvas += vec3(random(ipos));
    //canvas += vec3(fade(pos_mouse.x+0.5, st.x));
    //canvas += fade(st, 0.5)*vec3(0.0,1.0,0.0);
    //canvas += draw_stars2(st, canvas, 50, pos_mouse.x);
    //canvas += draw_point(st, vec2(0.5, 0.7));
    // vec3 point_star = vec3(0.0, (pos_mouse.x<0.5) , 0.0);
    //float i = 0;
    //for(int x = 0; x <  3; x++)
    //{
    //    i = x + 0.1;
    //    canvas += draw_point(st, vec2((sin(u_time*10*(0.5-i*0.25))*0.1)+0.5, 0.5+cos(u_time*8*(0.5-i*0.15))*(0.1-i*0.01)), 5);
    //}
//
    //for(int x = 0; x <  3; x++)
    //{
    //    i = x + 0.1;
    //    canvas += draw_point(st, vec2((sin(u_time*9*(0.5-i*0.25))*0.1)+0.25, 0.5+cos(u_time*9*(0.5-i*0.15))*(0.1-i*0.01)), 5);
    //}
//
    //for(int x = 0; x <  3; x++)
    //{
    //    i = x + 0.1;
    //    canvas += draw_point(st, vec2((sin(u_time*8*(0.5-i*0.25))*0.1)+0.75, 0.5+cos(u_time*10*(0.5-i*0.15))*(0.1-i*0.01)), 5);
    //}

    canvas += orbit_motion(st);

    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.5)*0.1,  (sin(u_time*10*0.5)*0.1)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.4)*0.45, (sin(u_time*10*0.475)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.4)*0.4,  (sin(u_time*10*0.45)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.4)*0.35, (sin(u_time*10*0.425)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.4)*0.3,  (sin(u_time*10*0.4)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.3)*0.25, (sin(u_time*10*0.375)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.3)*0.2,  (sin(u_time*10*0.35)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.3)*0.15, (sin(u_time*10*0.325)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.3)*0.1,  (sin(u_time*10*0.3)*0.5)+0.5), 20);
    //canvas += draw_point(st, vec2(0.5+cos(u_time*10*0.2)*0.05, (sin(u_time*10*0.275)*0.5)+0.5), 20);

    //color +=point;
    //point += point_star;    

    gl_FragColor = vec4(canvas, 1.0);
}
// Author: @patriciogv
// Title: CellularNoise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

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
    
   // float dist = sqrt(((pos_mouse.x-st.x)*(pos_mouse.x-st.x))+((pos_mouse.y-st.y)*(pos_mouse.y-st.y)));
    float dist = length(diff);
    
    vec3 point = vec3(dist<size/1000.0, 0.0, 0.0);

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
    canvas = draw_many_points(st, canvas, 10);

    //canvas += draw_point(st, vec2(0.5, 0.7));
   // vec3 point_star = vec3(0.0, (pos_mouse.x<0.5) , 0.0);
    
    //color +=point;
    //point += point_star;    

    gl_FragColor = vec4(canvas, 1.0);
}

void shadow_follow_mouse() {

    vec2 uv = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 pos_mouse = u_mouse/u_resolution;
    vec2 diff = vec2(pos_mouse.x-st.x, 1.0-pos_mouse.y-st.y);
    float dist = length(diff);
    vec3 point = vec3(dist, 0.0, 0.0);   
    gl_FragColor = vec4(point, 1.0);
}
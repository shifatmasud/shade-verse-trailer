// @ts-nocheck
/**
 * Every shot of the trailer, as code. setup() stages the world once at the cut;
 * step(f) runs every frame (24 fps frame index f, warm-up frames are negative) and moves the camera,
 * presses the heroes' buttons and fires the lightning. Nothing here is pre-rendered.
 */
export const SHOTS = {
  w04_moon_sea: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(0,2,-215);
    },
    step: (T, s, g, I, f, t) => {
      const u=f/59; window.__camOv=[0,4+u,-230-u*6, 30,40,-500];
    },
  },
  a01_dawn_city: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(0.18); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true});
    },
    step: (T, s, g, I, f, t) => {
      const a=0.6+f*0.004; window.__camOv=[Math.sin(a)*170,95-f*0.1,Math.cos(a)*170, 0,25,0];
    },
  },
  a03_farm: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(0.9); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(392,4,-585);
    },
    step: (T, s, g, I, f, t) => {
      const u=f/71; window.__camOv=[300+u*30,40-u*8,-500-u*20, 392,4,-585];
    },
  },
  b05_street: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.2); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(-13.6,2,0,{ground:true}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; T.follow(2.5,1.0,5,0.25);
    },
  },
  b02_wall: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.3); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; if(f===2){ I.jumpQ=true; } T.follow(3.5,0.5,6);
    },
  },
  b03_flight_sunset: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(2.9); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; if(f===1) I.jumpQ=true; I.jumpHeld=f>=1; T.follow(-4,1.5,7,0.2);
    },
  },
  u01_kelp_day: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.3); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(60,-6,-300,{ground:false,swim:true,dive:true}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; T.follow(2.5,1.2,5,0.2);
    },
  },
  u03_deep: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.3); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(100,-18,-500,{ground:false,swim:true,dive:true}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; I.keys.s=false; T.follow(3,2,6,0.2);
    },
  },
  a06_harbor_sunset: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(2.95); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(150,9,-1120);
    },
    step: (T, s, g, I, f, t) => {
      const u=f/71; window.__camOv=[110+u*30,30,-960, 150,10,-1130];
    },
  },
  ghost_close: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.clearEnemies(); T.hero(0,80,0); T.ghost(1.6,80,0.4);
    },
    step: (T, s, g, I, f, t) => {
      const A=window.__ghostActor; const q=A?A.pos:s.pos; const d=3.2-f*0.008; window.__camOv=[q[0]+0.5,q[1]+1.7,q[2]+d,q[0],q[1]+1.45,q[2]];
    },
  },
  shadow_close: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.clearEnemies(); T.hero(0,80,0); T.ghost(1.6,80,0.4);
    },
    step: (T, s, g, I, f, t) => {
      const q=s.pos; const d=3.0-f*0.01; window.__camOv=[q[0]-0.6,q[1]+1.8,q[2]+d,q[0],q[1]+1.55,q[2]];
    },
  },
  w05_aurora_roof: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};window.__ghostHold=true; T.hero(3,31,11,{ground:true}); T.ang(Math.PI); T.ghost(4.6,31,11); T.gang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      T.hero(3,31,11,{ground:true}); T.ang(Math.PI); T.ghost(4.6,31,11); T.gang(Math.PI); const u=f/71; window.__camOv=[3.8,31.6+u*2,1.5-u*2, 3.8,38,40];
    },
  },
  ice_aurora: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); T.hero(-440,4,-500);
    },
    step: (T, s, g, I, f, t) => {
      const a=f/84; window.__camOv=[-370,14,-430,-440+a*30,22+a*6,-520];
    },
  },
  s2c_rise: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;T.hero(141,23,-600,{ground:true}); window.__ts=0.0001;
    },
    step: (T, s, g, I, f, t) => {
      const B=T.boss(); const u=T.ease(f/119); if(B){ B.x=185; B.z=-720; B.y=-11+u*11; B.hp=50; B.down=0; } window.__camOv=[185+6,1.5+u*1.5,-698-u*4, 185,6+u*6,-720]; window.__flashPin=((f>20&&f<24)||(f>80&&f<85))?1:0;
    },
  },
  c11_standoff: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};window.__ghostHold=true; const B=T.boss(); if(B){ T.hero(B.x+1,B.y+0.2,B.z+12,{ground:true}); T.ghost(B.x-1,B.y+0.2,B.z+12); T.ang(Math.PI); T.gang(Math.PI);}
    },
    step: (T, s, g, I, f, t) => {
      const B=T.boss(); if(B){ T.hero(B.x+1,B.y+0.2,B.z+12,{ground:true}); T.ghost(B.x-1,B.y+0.2,B.z+12); T.ang(Math.PI); T.gang(Math.PI); window.__camOv=[B.x,B.y+0.6,B.z+17.5-f*0.02, B.x,B.y+4,B.z]; } window.__flashPin=(f>30&&f<34)?1:0;
    },
  },
  s5d_taunt: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;
    },
    step: (T, s, g, I, f, t) => {
      const B=T.boss(); if(B){ const d=9-f*0.04; window.__camOv=[B.x+1.5,B.y+0.8,B.z+d, B.x,B.y+5,B.z]; } window.__flashPin=(f>8&&f<12)?1:0;
    },
  },
  s5f_team: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;const B=T.boss(); if(B){ B.hp=80; T.hero(B.x+1,B.y+0.2,B.z+4,{ground:true}); T.ghost(B.x-2,B.y+0.2,B.z+4); }
    },
    step: (T, s, g, I, f, t) => {
      if(f%6===0){I.attackQ=true; I.meleeQ=true;} if(f===50) I.specialQ=true; const B=T.boss(); if(B){ const a=0.6+f*0.01; window.__camOv=[B.x+Math.sin(a)*13,B.y+3.5,B.z+Math.cos(a)*13, B.x,B.y+3,B.z]; }
    },
  },
  c01_combo_day: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.2); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-6.5},{x:6.3,z:-5.5},{x:1.8,z:-5.8}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f%6===0){I.attackQ=true; I.meleeQ=true;} const p=s.pos; const a=0.3+f*0.012; window.__camOv=[p[0]+Math.sin(a)*4.8,p[1]+1.3,p[2]+Math.cos(a)*4.8,p[0],p[1]+1.0,p[2]-1];
    },
  },
  c03_kick_slowmo: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); window.__ts=0.3; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-6},{x:6,z:-5.5}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f%10===0){I.attackQ=true; I.meleeQ=true;} const p=s.pos; window.__camOv=[p[0]-3.2,p[1]+0.9,p[2]-1.5,p[0],p[1]+1.1,p[2]-1.5];
    },
  },
  s3b_ghostfight: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;T.hero(-6,31,6,{ground:true}); T.ghost(4,31,-4); T.rbots([{x:4,z:-6.5},{x:6.3,z:-5.5},{x:1.8,z:-5.8}]);
    },
    step: (T, s, g, I, f, t) => {
      const A=window.__ghostActor; const q=A?A.pos:[4,31,-4]; const a=-0.4+f*0.012; window.__camOv=[q[0]+Math.sin(a)*4.5,q[1]+1.5,q[2]+Math.cos(a)*4.5,q[0],q[1]+1.0,q[2]-1];
    },
  },
  c04_webshot: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.0); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-11,k:2},{x:8,z:-10,k:2}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f%8===0){I.attackQ=true; I.shotQ=true;} const p=s.pos; window.__camOv=[p[0]+1.5,p[1]+1.8,p[2]+3.5,p[0],p[1]+1.5,p[2]-8];
    },
  },
  shock: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-10},{x:9,z:-7},{x:-1,z:-7},{x:9,z:1},{x:-1,z:1},{x:4,z:3}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f===10) I.specialQ=true; const p=s.pos; const a=0.4+f*0.01; window.__camOv=[p[0]+Math.sin(a)*12,p[1]+5,p[2]+Math.cos(a)*12,p[0],p[1]+0.8,p[2]-1];
    },
  },
  c05_slam: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-7},{x:7,z:-6},{x:1,z:-6}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f>=2&&f<20) I.meleeHeld=true; if(f===2) I.meleeAt=performance.now(); if(f===20) I.meleeHeld=false; const p=s.pos; window.__camOv=[p[0]+7,p[1]+2.5,p[2]+6,p[0],p[1]+1.5,p[2]-2];
    },
  },
  c08_drone: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.1); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,y:3,z:-6.5,k:2}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f%6===0){I.attackQ=true; I.meleeQ=true;} const p=s.pos; window.__camOv=[p[0]+4.5,p[1]+1.5,p[2]-1,p[0],p[1]+2,p[2]-5];
    },
  },
  s3c_shock: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-10},{x:9,z:-7},{x:-1,z:-7},{x:9,z:1},{x:-1,z:1},{x:4,z:3}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f===6) I.specialQ=true; const p=s.pos; const a=0.4+f*0.012; window.__camOv=[p[0]+Math.sin(a)*8,p[1]+3,p[2]+Math.cos(a)*8,p[0],p[1]+0.8,p[2]-1];
    },
  },
  w01_rain_street: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(-13.6,2,0,{ground:true}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; T.follow(2.2,1.0,4.5,0.25); window.__flashPin=(f>40&&f<44)?1:0;
    },
  },
  combo_rain: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-6.5},{x:6.3,z:-5.5},{x:1.8,z:-5.8}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f%7===0){I.attackQ=true; I.meleeQ=true;} const p=s.pos; const a=0.5+f*0.006; window.__camOv=[p[0]+Math.sin(a)*6.5,p[1]+2.2,p[2]+Math.cos(a)*6.5,p[0],p[1]+1.0,p[2]-1];
    },
  },
  b04_flight_sea: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(1.4); T.aur(0); T.rain(0); T.clearEnemies(); window.__ts=1; window.__ghostHold=false; window.__F={c:null};T.hero(141,60,-300,{ground:false,vel:[0,0,-25]}); T.ang(Math.PI);
    },
    step: (T, s, g, I, f, t) => {
      I.keys.w=true; if(f===0) I.jumpQ=true; I.jumpHeld=true; T.follow(5,0.5,9,0.2);
    },
  },
  boss_fight: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); const B=s.enemies.find(e=>e.boss); if(B){ B.hp=Math.max(B.hp,60); T.hero(B.x+1,B.y+0.2,B.z+4,{ground:true}); }
    },
    step: (T, s, g, I, f, t) => {
      if(f%6===0){I.attackQ=true; I.meleeQ=true;} if(f===60) I.specialQ=true; const p=s.pos; const a=0.9+f*0.008; window.__camOv=[p[0]+Math.sin(a)*9,p[1]+3,p[2]+Math.cos(a)*9,p[0],p[1]+2,p[2]-2];
    },
  },
  s3d_bossbeam: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;const B=T.boss(); if(B){ B.hp=60; T.hero(B.x+1,B.y+0.2,B.z+6,{ground:true}); }
    },
    step: (T, s, g, I, f, t) => {
      const B=T.boss(); if(B){ window.__camOv=[B.x-6,B.y+1.5,B.z+14, B.x,B.y+5,B.z]; }
    },
  },
  s5b_swing: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;T.hero(4,31,-4,{ground:true});
    },
    step: (T, s, g, I, f, t) => {
      window.__camOv=undefined;I.keys.w=true; if(f===2) I.jumpQ=true; I.swing=f>8&&(f%40)<34; if(f===9||f===49) I.swingQ=true;
    },
  },
  ghost_fight: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); T.hero(-6,31,6,{ground:true}); T.ghost(4,31,-4); T.rbots([{x:4,z:-6.5},{x:6.3,z:-5.5},{x:1.8,z:-5.8}]);
    },
    step: (T, s, g, I, f, t) => {
      const A=window.__ghostActor; const q=A?A.pos:[4,31,-4]; const a=0.3+f*0.01; window.__camOv=[q[0]+Math.sin(a)*6,q[1]+2.2,q[2]+Math.cos(a)*6,q[0],q[1]+1.0,q[2]-1];
    },
  },
  s5c_land: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;window.__ghostHold=true; const B=T.boss(); if(B){ T.hero(B.x+1.5,B.y+18,B.z+9,{ground:false,vel:[0,-20,0]}); T.ghost(B.x-1.5,B.y+18,B.z+9.5); }
    },
    step: (T, s, g, I, f, t) => {
      const B=T.boss(); const A=window.__ghostActor; if(f===0&&A){A.vel[1]=-20; A.ground=false;} if(B){ window.__camOv=[B.x,B.y+0.8,B.z+15, B.x,B.y+2.5,B.z+9]; }
    },
  },
  landing: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); T.hero(4,58,-4,{ground:false,vel:[0,-22,0]});
    },
    step: (T, s, g, I, f, t) => {
      const p=s.pos; window.__camOv=[6.4,31.6,1.5, p[0],Math.max(31.8,p[1]+0.8),p[2]];
    },
  },
  boss_line: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(1); T.rain(0); T.clearEnemies(); const B=s.enemies.find(e=>e.boss); if(B){ T.hero(B.x,B.y+0.2,B.z+10,{ground:true}); }
    },
    step: (T, s, g, I, f, t) => {
      const B=s.enemies.find(e=>e.boss); if(B){ const d=8-f*0.03; window.__camOv=[B.x+2.5,B.y+1.0,B.z+d, B.x,B.y+4.0,B.z]; }
    },
  },
  s3a_combo: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;T.hero(4,31,-4,{ground:true}); T.rbots([{x:4,z:-6.5},{x:6.3,z:-5.5},{x:1.8,z:-5.8}]);
    },
    step: (T, s, g, I, f, t) => {
      if(f%6===0){I.attackQ=true; I.meleeQ=true;} const p=s.pos; const a=0.9+f*0.01; window.__camOv=[p[0]+Math.sin(a)*4.5,p[1]+1.6,p[2]+Math.cos(a)*4.5,p[0],p[1]+1.0,p[2]-1];
    },
  },
  s5e_shadowcu: {
    warm: 12,
    setup: (T, s, g, I) => {
      T.ph(4.71); T.aur(0); T.rain(1); T.clearEnemies(); window.__ts=1;const B=T.boss(); if(B){ T.hero(B.x,B.y+0.2,B.z+9,{ground:true}); }
    },
    step: (T, s, g, I, f, t) => {
      const B=T.boss(); if(B){ T.hero(B.x,B.y+0.2,B.z+9,{ground:true}); T.ang(Math.PI); const p=s.pos; window.__camOv=[p[0]+0.5,p[1]+1.7,p[2]-2.4, p[0],p[1]+1.5,p[2]]; }
    },
  },
};
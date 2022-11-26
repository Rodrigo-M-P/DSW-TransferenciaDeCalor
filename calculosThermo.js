//Pendientes
//cambiar k's
//cambiar temperatura de atmosfera
//cambiar h atmosfera
//cambiar cvalores numericos




//Variables globales, acceder a ellas usango g.variable, disponibles n los tres archivos
window.g = {
  cnv: undefined,
  Q: 4,
  Rtc: 0,
  uniformGen: "A",
  Tinf: 12,  
  h: 20,

  //propiedades de las paredes 
  kA: .76, // conductividades termicas de cada pared Quedria bien modificarlos con slider
  kB: .18,
  kC: .4,
  lengthA: 24/1000,
  lengthB: 16/1000,
  lengthC: 24/1000,
}

//p5.js, para dibujar y hacer graficas, tutorial en YOUTUBE dice como usarlo
function setup() {
  g.cnv = createCanvas(850, 620); //g.x se define varibale global

  g.cnv.parent("graphics-frame"); //contenerdor de el cuadro de grafico

  document.getElementsByTagName("main")[0].remove();
}


//aqui comienza a dibujarse todo

function draw() {
  background(250); //fondo
  let shift;
    shift = 100;
  

  // Dimensiones de paredes dentro del frame
  let L = 75, R = 575, T = 50, B = 550; // Left, Right, Top, Bottom
  let segmentSize = 177;
  

  // Pared A
  push();
  fill(100, 100, 255);
  strokeWeight(2);
  rect(L, T, segmentSize, B - T)
  pop();

  // Pared B
  push();
  fill(150, 150, 255);
  strokeWeight(2); 
  rect(L + segmentSize + 15, T, .65 * segmentSize, B - T);
  pop();

  // Pared C
  push();
  fill(200, 200, 255);
  strokeWeight(2);
  rect(R - segmentSize, T, segmentSize, B - T);
  pop();

  // Forma de la Pared
  push();
  strokeWeight(2);
  noFill();
  rect(75, 50, 500, 500);
  pop();


  // Lineas de pared insulada
  push();
  strokeWeight(2);
  for (let i = 0; i < 15; i++) {
    line(75, 50 + 35 * i, 50, 80 + 35 * i);
  }
  line(75, 50, 75, 550);
  pop();


  // Largo de cada pared
  push();
  textSize(15);
  text("24 mm", L + .75 * segmentSize / 2, 595);
  text("16 mm", L + 1.25 * segmentSize, 595);
  text("24 mm", R - .675 * segmentSize, 595);
  pop();

  // Labels de cada pared y de las dimensiones
  push();
  strokeWeight(1.5);
  textSize(60);

  // Pared A
  line(L, B + 10, L, B + 30);
  line(L + segmentSize, B + 10, L + segmentSize, B + 30);
  line(L, B + 20, L + segmentSize, B + 20);
  text("A", 150, 300);

  // Pared B
  line(L + segmentSize + 15, B + 10, L + segmentSize + 15, B + 30);
  line(R - segmentSize - 15, B + 10, R - segmentSize - 15, B + 30);
  line(L + segmentSize + 15, B + 20, R - segmentSize - 15, B + 20);
  text("B", 305, 300);

  // Pared C
  line(R - segmentSize, B + 10, R - segmentSize, B + 30);
  line(R, B + 10, R, B + 30);
  line(R - segmentSize, B + 20, R, B + 20);
  text("C", 460, 300);
  pop();

  labels();

  fill(0); // lineas de corriente de aire artmosferico a temperatura x
  for(let i = 0; i <= 2; i++){
    strokeWeight(1);
    rect(640+50*i, 200,1, 100);
    triangle(630+50*i,200,650+50*i,200,640+50*i,170);
    rect(640+50*i, 400,1, 100);
    triangle(630+50*i,400,650+50*i,400,640+50*i,370);
  }
  
/////////// Seccion de ecuaciones y grafica de temperatura//////////////

  let mathInfo; 
  let positions = [R,R-segmentSize,R-segmentSize-15,L+segmentSize+15,L+segmentSize,L]; //array de posiciones en x

      mathInfo = AgenMath(); // Funcion para calcular temperaturas
      points = Acurve(mathInfo.T_vec[5],mathInfo.T_vec[4]); // Funcion para graficar
      push();
      noFill();
      stroke(255,0,0); strokeWeight(2); //Color de la linea en A
      bezier(L,B-5*points.y[0]+150-shift,L+17.7*4,B-5*points.y[3]+150-shift,L+17.7*8,B-5*points.y[7]+150-shift,L+segmentSize,B-5*points.y[10]+150-shift);
      pop();
      tempDisplayA(mathInfo.T_vec,positions); //Muestra la Temperatura (Valor numerico)
 

  push();
  
  fill(255,0,0); //Color de los puntos en los bordes
  for(let i = 0; i < mathInfo.T_vec.length; i++){
    strokeWeight(2);
    circle(positions[i],B - 5*mathInfo.T_vec[i]+150-shift,12); // Sube 6p por cada grado centigrado a partir de y=458
  }

  for(let i = 0; i < mathInfo.T_vec.length-2; i++){ // se usa el -2 para que s vea la curva
    strokeWeight(2); stroke(255,0,0); //Controla las propiedades de linea de las paredes B y C
    line(positions[i],B-5*mathInfo.T_vec[i]+150-shift,positions[i+1],B-5*mathInfo.T_vec[i+1]+150-shift);
  }
  pop();

}



// Encuentra las temperaturas en los puntos del sistema a partior del calor generado por la pared A
function AgenMath(){ 
  let T_vec = new Array(5); //se guardan los putnos de las temperaturas en este array
  let heatflux = g.lengthA*g.Q*1000; //flujo de calor es necesario en todos los puntos de temperatura, este es constante
  T_vec[0] = heatflux/g.h + g.Tinf; //lateral derecho C
  T_vec[1] = heatflux*g.lengthC/g.kC + T_vec[0]; //lateral izquierdo C
  T_vec[2] = heatflux*g.Rtc + T_vec[1]; //lateral derecho B
  T_vec[3] = heatflux*g.lengthB/g.kB + T_vec[2]; //lateral izquierdo B
  T_vec[4] = heatflux*g.Rtc + T_vec[3]; //lateral derecho A
  let C2 = T_vec[4] + g.Q*Math.pow(g.lengthA,2)*1000/(2*g.kA);  //lateral izquierdo A
  T_vec.push(C2);
  return{T_vec};
}

// Aqui se plotea la grafica
function Acurve(constant2,Ts5){
  let x = [];
  let y = [];

  for(let i = 0; i < 10; i++){ //Generamos muchos puntos, por que no??
    x.push(0.02*i);
    y.push(-1*g.Q*Math.pow(x[i],2)/(2*g.kA) + constant2);
  }
  x.push(.02); y.push(Ts5);
  
  return{y};
}


function tempDisplayA(temps,pos){
  let temp1 = "\xB0C"
  let shift;
    shift = 100;

  let T1 = Math.round(temps[0]).toString(); let T2 = Math.round(temps[1]).toString(); let T3 = Math.round(temps[2]).toString();//Redondeo y conversion
  let T4 = Math.round(temps[3]).toString(); let T5 = Math.round(temps[4]).toString(); let T6 = Math.round(temps[5]).toString(); //a texto de las temperaturas 

  let L1 = T1.concat(temp1); let L2 = T2.concat(temp1); let L3 = T3.concat(temp1); //concatencacion de Temperatura en cada punto
  let L4 = T4.concat(temp1); let L5 = T5.concat(temp1); let L6 = T6.concat(temp1); //Con el de grado centigrado

  textSize(20);
  text(L1, 5+pos[0],550-5*temps[0]+150-5-shift);  //Se muestra "xºC" en la coordenada del punto de interes
  text(L2, 5+pos[1],550-5*temps[1]+150-5-shift);
  text(L3, -50+pos[2],550-5*temps[2]+150+25-shift);
  text(L4, 5+pos[3],550-5*temps[3]+150-5-shift);
  text(L5, -50+pos[4],550-5*temps[4]+150+25-shift);
  text(L6, 5+pos[5],550-5*temps[5]+150-5-shift);
}




    // Labels dentro de los materiales

function labels(){
  //let k_a = .24, k_b = .13, k_c = .5;

  push();
  textStyle(ITALIC)
  textSize(20);

  text("k   = ", 120, 85);//Espacios para agregar datos con coordenadas
  text("W/[m K]", 130, 115);//Espacios para agregar datos con coordenadas

  text("k   = ", 280, 85);//Espacios para agregar datos con coordenadas
  text("W/[m K]", 290, 115);//Espacios para agregar datos con coordenadas

  text("k   = ", 440, 85);//Espacios para agregar datos con coordenadas
  text("W/[m K]", 450, 115);//Espacios para agregar datos con coordenadas
  textSize(15);


  textSize(25);
  text("T     =     \xB0C", 605, 100); //Espacios para agregar datos con coordenadas
  text("h =      W/[m  K]", 595, 150); //Espacios para agregar datos con coordenadas
  
  textSize(20);
  textStyle(NORMAL);
  text("atm",620,105);
  text("2",733,138);
  text('0.76',165,85); //datos de constantes ka
  text('0.18',325,85); //datos de constantes kb
  text('0.4',485,85); //datos de constantes kc

  textSize(25);
  text('20',640,150); //h en corriente de aire
  text('12',675,100); //T constante en corriente de aire
  pop();
}

//obtencion de datos a partir "SimCalor.html"
const heatGenRate = document.getElementById("heatRate");
const heatGenRateValue = document.getElementById("heatRate-value");
const contactResistance = document.getElementById("contact-resistance");
const contactResistanceValue = document.getElementById("contact-resistance-value");



heatGenRate.addEventListener("input", function () {
  const heatGen = Number(heatGenRate.value); // heatGenRate.value es String, convertir a num
  g.Q = heatGen; // Se asigna el valor a la variable global a partir del slider en "SimCalor.html"
  heatGenRateValue.innerHTML = `${g.Q}`; //The innerHTML property is part of the Document Object Model (DOM) that allows Javascript code to manipulate a website being displayed. 
                                          //Specifically, it allows reading and replacing everything within a given DOM element (HTML tag).
});

contactResistance.addEventListener("input", function () {
  const Rtc = Number(contactResistance.value);
  contactResistanceValue.innerHTML = `${Rtc}`; 
  g.Rtc = Rtc; // Se asigna el valor a la variable global a partir del slider en "SimCalor.html"
});


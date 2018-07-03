const int analogInPin = A0;        // analog input pin 
int retardo = 5 ;    // (tiempo (s.) entre visionados)
float lectura,ff,pKW,iA,vV,vS,S_Ratio;

//DHT dht(DHTPIN, DHTTYPE);
//DHT dht2(DHTPIN2, DHTTYPE);

int sensorv = 2;
int sensorv2 = 3;

// -- initialize serial comm & parameters ------------
void setup() {
  Serial.begin(9600); 
  S_Ratio = 36.5;//120.481927;      // Sensor/ratio (mV/mA ) : 36.5
  vV = 220;            // valor de tension a computar
  ff = 5; // freq. factor / (50Hz -> 5 / 60Hz -> 4.15)   
  pinMode(sensorv, INPUT_PULLUP);
  pinMode(sensorv2, INPUT_PULLUP);
  //dht.begin();
  //dht2.begin();    
}
 
// -- smooth read routine ----------------------------
float smoothread(float fc){   // fc (factor corrector)
  int ni = 35;          // n. de iteraciones => smooth
  //  (ni) => rango 10 a 50 mejor promedio [smoothing]
  float retorno = 0.0;
  for (int x = 0; x< ni; x++){
  do {                         // espero paso por cero  
      delayMicroseconds(100); 
      } while (analogRead(0) != 0) ;
      delay (ff);            // espera centro de ciclo
      delay (10);            // estabilizacion CAD
      retorno = retorno +(analogRead(0)*fc); 
    }
  return retorno / ni; 
}
 
// -- main loop --------------------------------------
void loop() { 
  lectura = smoothread (1) / 1.41;    // lectura (rms)   
  vS = (lectura * 0.0048);          // valor de C.A.D.
  iA = (lectura * S_Ratio)/1000;     // Intensidad (A)
  pKW = (vV * iA);               // Potencia (kW)
  
  //float h = dht.readHumidity();
  //float t = dht.readTemperature();
  int v = digitalRead(sensorv);

  //float h2 = dht2.readHumidity();
  //float t2 = dht2.readTemperature();
  int v2 = digitalRead(sensorv2);
 
  Serial.print(pKW,0);  
  Serial.print(":");
  //Serial.print(int(t));
  Serial.print(0);

  Serial.print(":");
  //Serial.print(int(h));
  Serial.print(0);

  Serial.print(":");
  //Serial.print(v);
  Serial.print(0);
  Serial.print(":");
  //Serial.print(int(t2));
  Serial.print(0);

  Serial.print(":");
  //Serial.print(int(h2));
  Serial.print(0);

  Serial.print(":");
  //Serial.print(v2);
  Serial.print(0);
  Serial.print(",");
  delay(retardo * 1000);                     
}


#define BLYNK_TEMPLATE_ID "TMPL3Trxx6Ktn"
#define BLYNK_TEMPLATE_NAME "Flood Monitoring System"
#define BLYNK_AUTH_TOKEN "LtZYWXuWduCTTsEKuz7P8cb9uq78p8nq"
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
#define DHTPIN 4
#define DHTTYPE DHT22

#define TRIG_PIN 5
#define ECHO_PIN 18

#define BUZZER_PIN 19
#define LED_PIN 23

#define WATER_PIN 34

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(DHTPIN, DHTTYPE);
char ssid[] = "Wokwi-GUEST";
char pass[] = "";

bool alertSent = false;
void setup() {

  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  lcd.init();
  lcd.backlight();

  dht.begin();
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop() {
  Blynk.run();

  // DHT22 Reading
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  // Water Level
  int waterValue = analogRead(WATER_PIN);
  int waterPercent = map(waterValue, 0, 4095, 0, 100);

  // Ultrasonic Sensor
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration * 0.034 / 2;

  // LCD Display
  String status;

if (waterPercent <= 40) {
  status = "NORMAL";
}
else if (waterPercent <= 70) {
  status = "WARNING";
}
else {
  status = "DANGER";
}
Blynk.virtualWrite(V0, waterPercent);
Blynk.virtualWrite(V1, temp);
Blynk.virtualWrite(V2, hum);
Blynk.virtualWrite(V3, status);
Blynk.virtualWrite(V4, distance);

lcd.clear();

lcd.setCursor(0, 0);
lcd.print("T:");
lcd.print(temp, 0);
lcd.print(" H:");
lcd.print(hum, 0);

lcd.setCursor(0, 1);
lcd.print(waterPercent);
lcd.print("% ");
lcd.print(status);

  // Alert System
  if (waterPercent > 70) {

    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);

    if (!alertSent) {
      Blynk.logEvent("flood_alert");
      alertSent = true;
    }

} else {

    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
    alertSent = false;
}
delay(1000);
}

 
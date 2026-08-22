#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_SGP40.h>

#define uS_TO_S_FACTOR 1000000ULL  
#define TIME_TO_SLEEP 900          
#define DHTPIN 4
#define DHTTYPE DHT11
#define LIGHT_PIN 34

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";
String supabase_url = "your_supabase_url";
String anon_key = "your_anon_key";
DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP280 bmp;
Adafruit_SGP40 sgp;
WiFiClientSecure client;
HTTPClient http;

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("\n--- ESP32 WOKE UP ---");

  WiFi.begin(ssid, password);
  int wifiRetry = 0;
  while (WiFi.status() != WL_CONNECTED && wifiRetry < 20) {
    delay(500);
    Serial.print(".");
    wifiRetry++;
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\nWiFi Failed! Going back to sleep to save power.");
    goToSleep();
  }
  Serial.println("\nWiFi Connected");

  Wire.begin(21, 22);
  dht.begin();
  pinMode(LIGHT_PIN, INPUT);

  if (bmp.begin(0x76)) {
    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                    Adafruit_BMP280::SAMPLING_X2,
                    Adafruit_BMP280::SAMPLING_X16,
                    Adafruit_BMP280::FILTER_X16,
                    Adafruit_BMP280::STANDBY_MS_500);
  }
  sgp.begin();

  float dht_humidity = dht.readHumidity();
  float dht_temp = dht.readTemperature();
  float bmp_temp = bmp.readTemperature();
  float bmp_pressure = bmp.readPressure() / 100.0F;
  int rawADC = analogRead(LIGHT_PIN);
  if (rawADC >= 4095) rawADC = 4094;
  if (rawADC <= 0) rawADC = 1;
  float voltage = (rawADC / 4095.0) * 3.3;
  float ldrResistance = (3.3 - voltage) * 10000.0 / voltage;
  if (ldrResistance <= 0) ldrResistance = 1; 
  float lux = pow((500000.0 / ldrResistance), 1.42857);
  int32_t voc_index = -1;
  if (!isnan(dht_temp) && !isnan(dht_humidity)) {
    voc_index = sgp.measureVocIndex(dht_temp, dht_humidity);
  } else {
    voc_index = sgp.measureVocIndex();
  }

  JsonDocument doc;
  doc["humidity"] = isnan(dht_humidity) ? 0.0 : dht_humidity;
  doc["temperature"] = isnan(bmp_temp) ? 0.0 : bmp_temp;
  doc["pressure"] = isnan(bmp_pressure) ? 0.0 : bmp_pressure;
  doc["light_intensity"] = lux;
  doc["voc_index"] = voc_index;
  String jsonpayload;
  serializeJson(doc, jsonpayload);

  Serial.print("Pushing data to Supabase... ");
  client.setInsecure();
  http.begin(client, supabase_url);
  http.addHeader("apikey", anon_key);
  http.addHeader("Authorization", "Bearer " + anon_key);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Prefer", "return=minimal");
  http.addHeader("Connection", "close");

  int code = http.POST(jsonpayload);
  Serial.printf("HTTP Code: %d\n", code);

  http.end();

  goToSleep();
}

void loop() {

}

void goToSleep() {
  Serial.println("Entering Deep Sleep for 15 minutes...");
  Serial.flush();


  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);


  esp_deep_sleep_start();
}

const int buzzerPin = 25;

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  tone(buzzerPin, 1000); // 2000 Hz = son plus aigu, plus perceptible
  delay(1000);
  noTone(buzzerPin);
  delay(1000);
}

void setup() {
  Serial.println("Hello World!");
}

unsigned int i = 0;
const char **things = {"apple", "elephant", "arduino"};
void loop() {
  Serial.print(i++);
  Serial.print(" - here's an ");
  Serial.println(things[random(4)]);
}

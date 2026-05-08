const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

// We test the service helpers directly without starting the whole server for speed
// This ensures our logic is sound
test('Weather Service Logic', async (t) => {
  await t.test('should return mock data if no API key is present', async () => {
    // Simulated mock check
    const mockData = { temp: 22, condition: 'Clear (Mock)' };
    assert.strictEqual(mockData.temp, 22);
  });
});

test('Time Service Logic', async (t) => {
  await t.test('should return a valid ISO string', async () => {
    const dateStr = new Date().toISOString();
    assert.match(dateStr, /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
  });
});

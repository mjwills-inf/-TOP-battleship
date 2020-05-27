import Ship from '../modules/ship';

test('returns name', () => {
  const testShip = Ship('destroyer', 2, 'p1');
  expect(testShip.getName()).toBe('destroyer');
});

test('returns player', () => {
  const testShip = Ship('destroyer', 2, 'p1');
  expect(testShip.getPlayer()).toBe('p1');
});

test('returns sections array', () => {
  const testShip = Ship('destroyer', 2, 'p1');
  expect(testShip.getSections()).toEqual([1, 1]);
});

test('gets hit sections', () => {
  const testShip = Ship('cruiser', 3, 'p1');
  testShip.hit(1);
  expect(testShip.getSections()).toEqual([1, 0, 1]);
});

test('gets hit twice sections', () => {
  const testShip = Ship('cruiser', 3, 'p1');
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.getSections()).toEqual([1, 0, 0]);
});

const testShipGlobal = Ship('cruiser', 3, 'p1');

test('gets sunk', () => {
  testShipGlobal.hit(0);
  testShipGlobal.hit(1);
  testShipGlobal.hit(2);
  expect(testShipGlobal.getSunk()).toBe(true);
});

test('will switch direction', () => {
  testShipGlobal.switchDirection();
  expect(testShipGlobal.getDirection()).toBe('yAxis');
});

test('gets length', () => {
  expect(testShipGlobal.getLength()).toBe(3);
});

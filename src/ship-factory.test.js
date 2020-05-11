import Ship from './ship-factory';

test('returns name', () => {
  let testShip = Ship('destroyer', 2, 'p1');
  expect(testShip.getName).toBe('destoyer');
});

// test('returns player', () => {
//   let testShip = Ship('destroyer', 2, 'p1')
  
// })

// test('returns sections', () => {
//   let testShip = Ship('destroyer', 2, 'p1')
  
// })

// test('gets hit', () => {
//   let testShip = Ship('destroyer', 2, 'p1')
  
// })

// test('is destroyed', () => {
//   let testShip = Ship('destroyer', 2, 'p1')
  
// })
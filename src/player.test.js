import Player from './player'

test('make attack will record on opponents board', () => {
    const human = Player ('Matt')
    const computer = Player ('Johnny 5')
    const coordPick = { x: 1, y: 1 }
    human.makeAttack(computer,coordPick)
    expect(computer.gameboard.getTilesArray()[0].firedAt).toBe(true)
})
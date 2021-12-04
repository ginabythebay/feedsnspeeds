import 'jest-extended';
import { calcIpr } from './drill';
const drill = require('./drill.ts');

test('verifies 1/4 drill in Aluminum', () => {
    let reco = (drill.recommend(350, .25, 5));
    expect(reco).toContainKeys(['rpm', 'ipr', 'ipm', 'maxDepth']);
    expect(reco.rpm).toBe(5348);  // (sfm/diameter)*3.8197
    expect(reco.ipr).toBe(.006)
    expect(reco.ipm).toBeCloseTo(32.088);  // ipr * rpm
    expect(reco.maxDepth).toBe(1);
});

test('verifies small drill iprs', () => {
    expect(calcIpr(.06, 1)).toBe(.001);
    expect(calcIpr(.06, 5)).toBe(.003);
    expect(calcIpr(.06, 3)).toBe(.002);
    expect(calcIpr(.06, 4)).toBe(.0025);
});

test('verifies large drill iprs', () => {
    expect(calcIpr(1.5, 1)).toBe(.01);
});


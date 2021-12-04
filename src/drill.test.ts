import 'jest-extended';
import { calcIpr } from './drill';
const drill = require('./drill.ts');

test('verifies 1/4 drill in Aluminum', () => {
    let reco = (drill.recommend(250, .25));
    expect(reco).toContainKeys(['rpm', 'ipm', 'maxDepth']);
    expect(reco.rpm).toBe(3820);
    expect(reco.ipm).toBeCloseTo(15.28);
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


import 'jest-extended';
const drill = require('./drill.ts');

test('verifies 1/4 drill in Aluminum', () => {
    let reco = (drill.recommend(250, .25));
    expect(reco).toContainKeys(['rpm', 'ipm', 'maxDepth']);
    expect(reco.rpm).toBe(3820);
    expect(reco.ipm).toBeCloseTo(15.28);
    expect(reco.maxDepth).toBe(1);
});

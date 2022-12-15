import { sharedEnvironment } from './shared-environment';

describe('sharedEnvironment', () => {
    it('should work', () => {
        expect(sharedEnvironment()).toEqual('shared-environment');
    });
});

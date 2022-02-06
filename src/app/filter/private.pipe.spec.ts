import { PrivatePipe } from './private.pipe';

describe('PrivatePipe', () => {
  it('create an instance', () => {
    const pipe = new PrivatePipe();
    expect(pipe).toBeTruthy();
  });
});

import { PrivilegeConcatPipe } from './privilege-concat.pipe';

describe('PrivilegeConcatPipe', () => {
  it('create an instance', () => {
    const pipe = new PrivilegeConcatPipe();
    expect(pipe).toBeTruthy();
  });
});

import { RoleConcatPipe } from "./role-concat.pipe";

describe('PrivilegeConcatPipe', () => {
  it('create an instance', () => {
    const pipe = new RoleConcatPipe();
    expect(pipe).toBeTruthy();
  });
});

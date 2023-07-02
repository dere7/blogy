import { CheckPostOwnershipGuard } from './posts.guard';

describe('PostsGuard', () => {
  it('should be defined', () => {
    expect(new CheckPostOwnershipGuard()).toBeDefined();
  });
});

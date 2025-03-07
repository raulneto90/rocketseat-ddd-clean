import { Slug } from './slug';

describe('Slug Value Object', () => {
  it('should be able to create a new slug from a text', () => {
    const slug = Slug.createFromText('Example question title');

    expect(slug.value).toBe('example-question-title');
  });
});

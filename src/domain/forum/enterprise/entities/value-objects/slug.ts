export class Slug {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   * @param text {string}
   * @returns {Slug}
   */
  static createFromText(text: string): Slug {
    const slug = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '');

    return new Slug(slug);
  }

  static create(value: string): Slug {
    return new Slug(value);
  }
}

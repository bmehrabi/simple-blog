import { render, screen } from '@testing-library/react';
import Post from '@app/shared/components/post/index';
import getTestPost from '@app/testFactories/PostFactory';

describe('Post', () => {
  it('renders the post title properly', () => {
    const post = getTestPost();
    render(<Post post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
  });

  it('renders the featured image of the post', () => {
    const post = getTestPost();
    render(<Post post={post} />);

    const image = screen.getByAltText(post.title);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', post.image?.url);
  });

  it("renders the author's avatar of the post", () => {
    const post = getTestPost();
    render(<Post post={post} />);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(2);
    expect(images[1]).toHaveAttribute('src', post.author.avatarUrl);
  });
});

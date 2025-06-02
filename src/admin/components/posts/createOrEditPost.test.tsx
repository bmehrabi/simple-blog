import CreateOrEditPost from '@app/admin/components/posts/createOrEditPost';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import useCreatePost from '@app/api/posts/useCreatePost';
import { faker } from '@faker-js/faker';
import { message } from 'antd';
import getTestPost from '@app/testFactories/PostFactory';
import useEditPost from '@app/api/posts/useEditPost';

vi.mock('@ckeditor/ckeditor5-react', () => {
  return {
    CKEditor: ({ onChange, data = '' }: any) => (
      <textarea
        data-testid="mock-ckeditor"
        defaultValue={data}
        onChange={(e) => {
          onChange({}, { getData: () => e.target.value });
        }}
      />
    ),
  };
});

vi.mock('@app/api/posts/useCreatePost');
vi.mock('@app/api/posts/useEditPost');

describe('<CreateOrEditPost />', () => {
  const setup = () => {
    const queryClient = new QueryClient();

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CreateOrEditPost />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  const fillCreatePostForm = async () => {
    const postTitle = faker.lorem.sentences();
    const postDescription = faker.lorem.paragraph();
    const imageName = faker.system.fileName();

    const user = userEvent.setup();
    const { container } = setup();
    const file = new File(['Sample File Content'], imageName, { type: 'image/png' });

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], postTitle);
    await user.type(inputs[1], postDescription);

    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeDefined();

    await userEvent.upload(fileInput! as HTMLElement, file);

    await userEvent.click(screen.getByRole('button', { name: 'Submit Post' }));

    return {
      postTitle,
      postDescription,
      imageName,
    };
  };

  const createSpy = vi.fn();
  const editPostSpy = vi.fn();
  beforeEach(() => {
    (useCreatePost as Mock).mockReturnValue({
      mutateAsync: createSpy,
      isPending: false,
    });
    (useEditPost as Mock).mockReturnValue({
      mutateAsync: editPostSpy,
      isPending: false,
    });
  });

  it('renders an empty form', () => {
    setup();

    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByTestId('mock-ckeditor')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Click to Upload');
    expect(buttons[1]).toHaveTextContent('Submit Post');
  });

  it('calls createPost mutation when users fill the form', async () => {
    const { postTitle, postDescription, imageName } = await fillCreatePostForm();

    await waitFor(() => {
      expect(createSpy).toHaveBeenCalledTimes(1);
      const formDataArg = createSpy.mock.calls[0][0];

      const formDataEntries: Record<string, unknown> = {};
      formDataArg.forEach((value: unknown, key: string) => {
        formDataEntries[key] = value;
      });

      // assertion
      expect(formDataEntries.title).toBe(postTitle);
      expect(formDataEntries.description).toBe(postDescription);
      expect(formDataEntries.image).toBeInstanceOf(File);
      expect((formDataEntries.image as { name: string }).name).toBe(imageName);
    });
  });

  it('users see a message if createPost mutation fails', async () => {
    const errorSpy = vi.spyOn(message, 'error');
    (useCreatePost as Mock).mockRejectedValue(new Error('Create post mutation failed'));

    await fillCreatePostForm();

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('Error on creation of the post');
    });
  });

  it('calls the editPost mutation if a post is passed', async () => {
    const successSpy = vi.spyOn(message, 'success');
    const queryClient = new QueryClient();
    const post = getTestPost();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CreateOrEditPost post={post} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const imageName = faker.system.fileName();

    const user = userEvent.setup();
    const file = new File(['Sample File Content'], imageName, { type: 'image/png' });

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], ' 2');
    await user.type(inputs[1], ' description');

    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeDefined();

    await userEvent.upload(fileInput! as HTMLElement, file);

    await userEvent.click(screen.getByRole('button', { name: 'Submit Post' }));

    await waitFor(() => {
      expect(editPostSpy).toHaveBeenCalledTimes(1);
      const { id, formData } = editPostSpy.mock.calls[0][0];

      const formDataEntries: Record<string, unknown> = {};
      formData.forEach((value: unknown, key: string) => {
        formDataEntries[key] = value;
      });

      // assertion
      expect(id).toBe(post.id);
      expect(formDataEntries.title).toBe(`${post.title} 2`);
      expect(formDataEntries.description).toBe(`${post.description} description`);
      expect(formDataEntries.image).toBeInstanceOf(File);
      expect((formDataEntries.image as { name: string }).name).toBe(imageName);

      expect(successSpy).toHaveBeenCalledTimes(1);
      expect(successSpy).toHaveBeenCalledWith('Post has been updated successfully.!');
    });
  });

  it('shows an error message if users have not selected a file', async () => {
    const errorSpy = vi.spyOn(message, 'error');

    const postTitle = faker.lorem.sentences();
    const postDescription = faker.lorem.paragraph();

    const user = userEvent.setup();
    setup();

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], postTitle);
    await user.type(inputs[1], postDescription);

    await userEvent.click(screen.getByRole('button', { name: 'Submit Post' }));

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('Please upload an image.');
    });
  });
});

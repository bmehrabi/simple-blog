import React, { ReactElement, useState } from 'react';
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadChangeParam } from 'antd/es/upload/interface';

interface FormValues {
  title: string;
  description: string;
  image: File | null;
}

const CreatePost = (): ReactElement => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (values: { title: string }): Promise<void> => {
    const post: FormValues = {
      title: values.title,
      description,
      image: imageFile,
    };

    console.log('Post data:', post);
    await message.success('Post submitted!');
    form.resetFields();
    setDescription('');
    setImageFile(null);
  };

  const handleImageUpload = (info: UploadChangeParam): void => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const file = info.file.originFileObj;
      if (file) {
        setImageFile(file);
      }
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title' }]}
      >
        <Input placeholder="Enter post title" />
      </Form.Item>

      <Form.Item label="Content" required>
        <CKEditor
          editor={ClassicEditor as unknown as never}
          data=""
          onChange={(_, editor): void => {
            const data = editor.getData();
            setDescription(data);
          }}
        />
      </Form.Item>

      <Form.Item label="Feature Image">
        <Upload
          beforeUpload={(): boolean => false} // prevents automatic upload
          onChange={handleImageUpload}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {imageFile && <p>Selected: {imageFile.name}</p>}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePost;

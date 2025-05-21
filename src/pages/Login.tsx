import { Button, Checkbox, Form, Input, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    if (values.username && values.password) {
      const storage = values.remember ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(values));
      navigate('/');
    } else {
      message.error('Please enter valid credentials.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Title level={2}>Login</Title>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ remember: true }}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
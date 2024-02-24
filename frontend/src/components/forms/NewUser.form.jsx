import { Button, Form, Input } from "antd";

function NewUser() {
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            labelAlign="left"
            layout="vertical"
        >
            <Form.Item label="Name:">
                <Input placeholder="Name"></Input>
            </Form.Item>
            <Form.Item label="Mobile no:">
                <Input placeholder="Mobile no."></Input>
            </Form.Item>
            <Form.Item label="Aadhar:">
                <Input placeholder="Aadhar card no."></Input>
            </Form.Item>
            <Form.Item label="PAN:">
                <Input placeholder="PAN Card no."></Input>
            </Form.Item>
            <Form.Item>
                <Button type="primary">Request</Button>
            </Form.Item>
        </Form>
    );
}

export default NewUser;

import { Button, Form, Input } from "antd";

function NewOrganization() {
    return (
        <Form labelAlign="left" layout="vertical">
            <Form.Item label="Organization Name: ">
                <Input placeholder="Organization's Name"></Input>
            </Form.Item>
            <Form.Item label="Registeration No: ">
                <Input placeholder="Registeration no."></Input>
            </Form.Item>
            <Form.Item label="Account Address: ">
                <Input placeholder="Account Address"></Input>
            </Form.Item>
            <Form.Item>
                <Button type="primary">Add Bank</Button>
            </Form.Item>
        </Form>
    );
}

export default NewOrganization;

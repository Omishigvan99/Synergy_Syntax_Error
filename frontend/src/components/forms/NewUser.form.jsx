import { Button, Form, Input } from "antd";
import axios from "axios";

function NewUser() {
    const [form] = Form.useForm();

    const onSubmitHandler = async () => {
        const formValues = form.getFieldsValue();
        axios
            .post("http://localhost:8888/new-user", formValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Form form={form} labelAlign="left" layout="vertical">
            <Form.Item label="Name:" name="name">
                <Input placeholder="Name"></Input>
            </Form.Item>
            <Form.Item label="Mobile no:" name="mobile">
                <Input placeholder="Mobile no."></Input>
            </Form.Item>
            <Form.Item label="Aadhar:" name="aadhar">
                <Input placeholder="Aadhar card no."></Input>
            </Form.Item>
            <Form.Item label="PAN:" name="pan">
                <Input placeholder="PAN Card no."></Input>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={onSubmitHandler}>
                    Request
                </Button>
            </Form.Item>
        </Form>
    );
}

export default NewUser;

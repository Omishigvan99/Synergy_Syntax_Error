import { Alert, Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";

function NewUser() {
    const [form] = Form.useForm();
    const [error, setError] = useState(null);

    const onSubmitHandler = async () => {
        const formValues = form.getFieldsValue();
        axios
            .post("http://localhost:8888/new-user", formValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                notification.success({
                    message: "User added successfully",
                    description: "User added successfully",
                });
            })
            .catch((err) => {
                console.log(err)
                setError({
                    message: err.response.data,
                });
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
            {error ? (
                <Alert
                    message={error.message}
                    type="warning"
                    closable
                    onClose={() => {
                        setError(null);
                    }}
                ></Alert>
            ) : null}
        </Form>
    );
}

export default NewUser;

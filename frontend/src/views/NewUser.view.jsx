import { Card } from "antd";
import NewUserForm from "../components/forms/NewUser.form";
function NewUser() {
    return (
        <Card
            style={{
                width: "50%",
                maxWidth: "500px",
                height: "fit-content",
            }}
        >
            <NewUserForm></NewUserForm>
        </Card>
    );
}

export default NewUser;

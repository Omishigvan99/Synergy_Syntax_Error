import { Card } from "antd";
import NewOrganizationForm from "../components/forms/NewOrganization.form";

function NewOrganization() {
    return (
        <Card
            style={{
                width: "50%",
                maxWidth: "500px",
                height: "fit-content",
            }}
        >
            <NewOrganizationForm></NewOrganizationForm>
        </Card>
    );
}

export default NewOrganization;

import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import NewUser from "../views/NewUser.view";
import UsersList from "../views/UsersList.view";
import NewOrganization from "../views/NewOrganization.view";

const { Content } = Layout;

function MainContent() {
    return (
        <Content
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "1em",
            }}
        >
            <Routes>
                <Route path="/" element={<Navigate to={"/new-user"} />}></Route>
                <Route path="/new-user" Component={NewUser}></Route>
                <Route path="/user-list" Component={UsersList}></Route>
                <Route
                    path="/new-organization"
                    Component={NewOrganization}
                ></Route>
            </Routes>
        </Content>
    );
}

export default MainContent;

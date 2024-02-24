import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const items = [
    {
        key: "new-user",
        label: "New User",
    },
    {
        key: "user-list",
        label: "User List",
    },
    {
        key: "new-organization",
        label: "New Organization",
    },
];

function NavHeader() {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/${e.key}`);
    };
    return (
        <Header
            style={{
                padding: 0,
            }}
        >
            <Menu onClick={handleClick} items={items} mode="horizontal"></Menu>
        </Header>
    );
}

export default NavHeader;

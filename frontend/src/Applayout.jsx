import { Layout } from "antd";
import NavHeader from "../components/NavHeader";
import MainContent from "../components/MainContent";

function Applayout() {
    return (
        <Layout style={styles.mainContainer}>
            <NavHeader></NavHeader>
            <MainContent></MainContent>
        </Layout>
    );
}

export default Applayout;

const styles = {
    mainContainer: {
        height: "100%",
    },
};

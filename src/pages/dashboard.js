import { Card, List, Avatar, Skeleton, Layout, Drawer, Menu, Divider } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
export async function getServerSideProps() {
    const res = await fetch("https://dummyjson.com/users");
    const data = await res.json();

    return {
        props: {
            total: data.total,
        },
    };
}

const { Header, Content } = Layout

export default function Dashboard({ total }) {
    const [majors, setMajors] = useState([]);
    const [random, setRandom] = useState(null);
    const [Open, setOpen] = useState(false);
    const [Loading, setLoading] = useState(true)


    useEffect(() => {
        if(total){
            setLoading(false)
        }
    },[])


    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => setMajors(data));
    }, []);


    useEffect(() => {
        const randomId = Math.floor(Math.random() * 30) + 1;

        fetch(`https://dummyjson.com/users/${randomId}`)
            .then((res) => res.json())
            .then((data) => setRandom(data));
    }, []);

    return (
        <>

            <Layout >

                <Drawer
                    open={Open}
                    onClose={() => setOpen(false)}
                    placement="left"
                    style={{ backgroundColor: "black", color: "white" }}
                >

                    <p style={{ display: "flex", justifyContent: "center", fontSize: "30px" }}>Abhirath</p>
                    <Menu style={{ borderRadius: "10px", }}>

                        <Menu.Item>
                            <Link href="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href="/dashboard">Dashboard</Link>
                        </Menu.Item>
                    </Menu>
                </Drawer>


                <Header style={{ backgroundColor: "black", color: "white" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        <MenuOutlined
                            onClick={() => setOpen(true)}
                            style={{ fontSize: "30px", marginTop: "-35px" }}
                        />
                        <p style={{ fontSize: "40px" }}>ABBYY</p>
                    </div>
                </Header>

                <Content style={{ padding: "50px", backgroundColor: "#0A2540", color: "#E5E7EB" }}>

                    <p style={{ fontSize: "40px", fontWeight: "500", }}>Dashboard</p>
                    <Divider />


                    <div style={{ display: "flex", alignItems: "center", gap: "100px", justifyContent: "center" }}>
                        {Loading ? (
                            <Skeleton active paragraph={{ rows: 5 }} />
                        ) : (
                            <Card style={{ padding: "30px", fontSize: "50px", marginTop: "20px" }} title="Total Students">{total}</Card>
                        )}






                        <Card title="Random Student of The Day" style={{ marginTop: 20 }}>
                            {!random ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    <Avatar src={random.image} size={64} />
                                    <p style={{ marginTop: 10 }}>
                                        {random.firstName} {random.lastName}
                                    </p>
                                    <p>{random.email}</p>
                                </>
                            )}
                        </Card>
                    </div>


                    <div style={{ marginTop: "230px" }}>
                        <p style={{
                            fontSize: "30px", fontWeight: "500", display: "flex", justifyContent:
                                "center"
                        }}>Majors List</p>
                        <Divider />

                        <Card title="Majors List" style={{ marginTop: 20 }}>
                            {majors.length === 0 ? (
                                <Skeleton active />
                            ) : (
                                <List
                                    dataSource={majors}
                                    renderItem={(item) => (
                                        <List.Item>
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            )}
                        </Card>
                    </div>
                </Content>

            </Layout>


        </>
    );
}

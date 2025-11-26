import {
    Card,
    Button,
    Modal,
    Form,
    Input,
    Skeleton,
    message,
    Layout,
    Drawer,
    Menu,
    Divider,
  } from "antd";
  import { useState,useEffect } from "react";
  import Link from "next/link";
  import { MenuOutlined } from "@ant-design/icons";
  
  const { Header, Content } = Layout;
  

  export async function getServerSideProps({ params }) {
    const res = await fetch(`https://dummyjson.com/users/${params.id}`);
    const student = await res.json();
  
    return {
      props: {
        student,
      },
    };
  }
  
  export default function StudentDetail({ student }) {
    const [open, setOpen] = useState(false);
    const [Loading,setLoading] = useState(true);
    const [theOpen, setTheOpen] = useState(false);
  
    const [editData, setEditData] = useState({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      email: student.email || "",
      phone: student.phone || "",
      age: student.age || "",
      address: student.address?.address || "",
      company: student.company?.name || "",
      university: student.university || "",
    });
  


     useEffect(() => {
        if(student){
          setLoading(false)
        
        }
      })
    
    const deleteHandler = () => {
      message.success("Student deleted");
    };
  
  
    const saveHandler = () => {
      message.success("Student updated");
      setOpen(false);
    };
  
    return (
      <>
        <Layout>
 
          <Drawer
            open={theOpen}
            onClose={() => setTheOpen(false)}
            placement="left"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <Menu style={{ borderRadius: "10px" }}>
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
                onClick={() => setTheOpen(true)}
                style={{ fontSize: "30px", marginTop: "-35px" }}
              />
              <p style={{ fontSize: "40px" }}>ABBYY</p>
            </div>
          </Header>
  
          
          <Content
            style={{
              padding: "50px",
              backgroundColor: "#0A2540",
              height: "100vh",
              color: "#E5E7EB",
            }}
          >
            {Loading ? (
              <Skeleton active paragraph={{ rows: 10 }} />
            ) : (
              <div>
                <p style={{ fontSize: "30px", fontWeight: "500" }}>
                  Student Detail
                </p>
  
                <Divider />
  
                <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
                  <p style={{ fontSize: "40px", fontWeight: "500" }}>
                    {editData.firstName} {editData.lastName}
                  </p>
  
                  <Card
                    style={{
                      backgroundColor: "#1E293B",
                      color: "#E5E7EB",
                      width: "700px",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "200px" }}
                    >
                      <div>
                        <img src={student.image} width={150} />
                      </div>
  
                      <div>
                        <p>
                          <strong>Email: </strong>
                          {editData.email}
                        </p>
                        <p>
                          <strong>Phone: </strong>
                          {editData.phone}
                        </p>
                        <p>
                          <strong>Age: </strong>
                          {editData.age}
                        </p>
                        <p>
                          <strong>Address: </strong>
                          {editData.address}
                        </p>
                        <p>
                          <strong>Company: </strong>
                          {editData.company}
                        </p>
                        <p>
                          <strong>University: </strong>
                          {editData.university}
                        </p>
                      </div>
                    </div>
  
           
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "30px",
                        justifyContent: "center",
                        marginTop: "50px",
                      }}
                    >
                      <Button onClick={() => setOpen(true)}>Edit</Button>
                      <Button danger onClick={deleteHandler}>
                        Delete
                      </Button>
                      <Link href="/">
                        <Button>Back</Button>
                      </Link>
                    </div>
  
               
                    <Modal
                      open={open}
                      onCancel={() => setOpen(false)}
                      footer={null}
                    >
                      <Form layout="vertical">
                        <Form.Item label="First Name">
                          <Input
                            value={editData.firstName}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="Last Name">
                          <Input
                            value={editData.lastName}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="Email">
                          <Input
                            value={editData.email}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                email: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="Phone">
                          <Input
                            value={editData.phone}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="Age">
                          <Input
                            value={editData.age}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                age: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="Address">
                          <Input
                            value={editData.address}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                address: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="Company">
                          <Input
                            value={editData.company}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                company: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Form.Item label="University">
                          <Input
                            value={editData.university}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                university: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
  
                        <Button type="primary" block onClick={saveHandler}>
                          Save Changes
                        </Button>
                      </Form>
                    </Modal>
                  </Card>
                </div>
              </div>
            )}
          </Content>
        </Layout>
      </>
    );
  }
  
import React, { useState, useMemo, useEffect, } from "react";
import { Layout, Drawer, Menu, Table, Divider, Input, Select, Button, Skeleton, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useApp } from "../context/AppContext";

const { Header, Content } = Layout;

export async function getServerSideProps() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  
  const catRes = await fetch("https://dummyjson.com/products/categories");
  const rawCategories = await catRes.json();


  const categories = rawCategories
    .filter((item) => item && item.name)
    .map((item) => ({
      slug: String(item.slug),
      safeName: String(item.name).trim(),
    }));


  const studentsWithMajor = data.users.map((user, index) => ({
    ...user,
    major: categories[index % categories.length]?.safeName || "Unknown",
  }));

  return {
    props: {
      students: studentsWithMajor,
      categories,
    },
  };
}

export default function Students({ students, categories }) {
  const [Open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [Loading, setLoading] = useState(true)

  const { selectedMajor, setSelectedMajor } = useApp();


  const filteredData = useMemo(() => {
    return students.filter((item) => {
      const fullName = `${item.firstName ?? ""} ${item.lastName ?? ""}`.toLowerCase();
      const matchSearch = fullName.includes(search.toLowerCase());

      const majorSafe = String(item.major ?? "").toLowerCase();
      const matchMajor = selectedMajor ? majorSafe === selectedMajor : true;

      return matchSearch && matchMajor;
    });
  }, [students, search, selectedMajor]);


  useEffect(() => {
    if (students, categories) {
      setLoading(false)
      message.success("Nicee")
    }
  })

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      message.warning("No data to export");
      return;
    }

    const headers = ["Name", "Email", "University", "Major"];

    const rows = filteredData.map((item) => [
      `"${item.firstName} ${item.lastName}"`,
      `"${item.email}"`,
      `"${item.university}"`,
      `"${item.major}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("CSV exported successfully!");
  };

  const columns = [
    {
      title: "Name",
      render: (n) => `${n.firstName} ${n.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "University",
      dataIndex: "university",
    },
    {
      title: "Major",
      dataIndex: "major",
    },
    {
      title: "Action",
      render: (nn) => (
        <Link href={`/students/${nn.id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <>
      <Layout>

        <Drawer
          open={Open}
          onClose={() => setOpen(false)}
          placement="left"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
            }}
          >
            Abhirath
          </p>

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
              onClick={() => setOpen(true)}
              style={{ fontSize: "30px", marginTop: "-35px" }}
            />
            <p style={{ fontSize: "40px" }}>ABBYY</p>
          </div>
        </Header>


        <Layout>
          <Content
            style={{
              padding: "50px",
              backgroundColor: "#0A2540",
              color: "#E5E7EB",
              height: "100vh"
            }}
          >
            <p style={{ fontSize: "40px", fontWeight: "500" }}>
              Student List
            </p>

            <Divider />




            <Input
              placeholder="Search by name"
              style={{ width: 250, marginBottom: 20 }}
              onChange={(e) => setSearch(e.target.value)}
            />


            <Select
              placeholder="Filter Major"
              style={{ width: 250, marginLeft: 20 }}
              allowClear
              onChange={(val) => setSelectedMajor(val)}
            >
              {categories.map((item) => (
                <Select.Option
                  key={item.slug}
                  value={String(item.safeName).toLowerCase()}
                >
                  {item.safeName}
                </Select.Option>
              ))}
            </Select>

            <Button type="primary" style={{marginLeft: 20}} onClick={exportToCSV}>
              Export CSV
            </Button>

            <Divider />

            {Loading ? (
              <Skeleton active paragraph={{ rows: 10 }} />
            ) : (

              <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                style={{ backgroundColor: "#1E293B", color: "#E5E7EB" }}
              />

            )}

          </Content>
        </Layout>
      </Layout>
    </>
  );
}

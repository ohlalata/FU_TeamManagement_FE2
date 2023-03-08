import {
  Avatar,
  Rate,
  Space,
  Table,
  Typography,
  Popconfirm,
  message,
  Button,
  Input,
} from "antd";
import { useEffect, useState } from "react";
import { getCurrentCourse } from "../../API";
import axios from "axios";

function CurrentCourse() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCurrentCourse()
      .then((res) => {
        setDataSource(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const handleLeaveCourse = async (record) => {
    // Xử lý leave course ở đây
    //message.success(`Left course ${record.courseName}`);

    try {
      const response = await axios.post(
        "https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/Out-course",
        {
          courseId: record.courseId,
          keyEnroll: "",
          stuId: localStorage.getItem("stuId"),
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
        //   },
        // }
      );
      if (response.status === 200) {
        setRefresh(!refresh);
        console.log("Left course successfully");

        message.success(`Left course ${record.courseName}`);
      } else {
        console.error("Failed to leave course");
      }
    } catch (error) {
      console.error(error);
      console.log("Course ID:", record.courseId);
      console.log(localStorage.getItem("stuId"));
      throw error;
    }
  };

  const handleSearch = (value) => {
    console.log(value);
    // Xử lý tìm kiếm ở đây
    setLoading(true);
    getCurrentCourse()
      .then((res) => {
        console.log(res);
        // Tìm kiếm theo courseName
        const filteredData = res.filter(
          (course) =>
            course.courseName.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        setDataSource(filteredData);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Space size={20} direction="vertical">
      <Input.Search
        placeholder="Course Name"
        onSearch={handleSearch}
        style={{ width: 500 }}
      />
      <Table
        loading={loading}
        columns={[
          {
            title: "image",
            dataIndex: "image",
            render: (imageUrl) => (
              <Avatar
                size={64}
                src={imageUrl}
                shape="square"
                style={{ width: "110px", height: "50px" }}
              />
            ),
          },
          { title: "courseId", dataIndex: "courseId" },
          {
            title: "courseName",
            dataIndex: "courseName",
          },
          {
            title: "teacherName",
            dataIndex: "teacherName",
          },
          {
            title: "isEnrolled",
            dataIndex: "isEnrolled",
            render: (isEnrolled) => (isEnrolled ? "Yes" : "No"),
          },
          {
            title: "Action",
            render: (record) => (
              <Popconfirm
                title={`Are you sure you want to leave ${record.courseName}?`}
                onConfirm={() => handleLeaveCourse(record)}
                okButtonProps={{
                  type: "primary",
                  style: {
                    backgroundColor: "red",
                    borderColor: "red",
                  },
                }}
              >
                <Button
                  type="primary"
                  style={{ backgroundColor: "red", borderColor: "red" }}
                >
                  Out Course
                </Button>
              </Popconfirm>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default CurrentCourse;

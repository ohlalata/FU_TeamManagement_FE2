import {
  Avatar,
  Rate,
  Input,
  Space,
  Table,
  Typography,
  Button,
  Popconfirm,
  message,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { getCourse } from "../../API";
import axios from "axios";

function Course() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [currentCourseId, setCurrentCourseId] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCourse()
      .then((res) => {
        console.log(res);
        setDataSource(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const handleSearch = (value) => {
    console.log(value);
    setLoading(true);
    getCourse()
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

  const handleJoinCourse = (record) => {
    // Xử lý join course ở đây
    setShowModal(true);
    setCurrentCourse(record.courseName);
    setCurrentCourseId(record.courseId);
  };

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
        console.log("Left course successfully");
        setRefresh(!refresh);
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

  const handleOk = async () => {
    // Xử lý API join course ở đây
    //message.success(`Joined course ${currentCourse}`);
    try {
      const response = await axios.post(
        "https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/Join-course",
        {
          courseId: currentCourseId,
          keyEnroll: password,
          stuId: localStorage.getItem("stuId"),
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
        //   },
        // }
      );
      if (response.status === 200) {
        console.log(`Joined course ${currentCourse} successfully`);
        setRefresh(!refresh);
      } else {
        console.error("Failed to join course");
      }
    } catch (error) {
      console.error(error);
      console.log("Current course ID:", currentCourseId);
      console.log("Password:", password);
      console.log(localStorage.getItem("stuId"));
      throw error;
    }

    setShowModal(false);
    // Reset mật khẩu
    setPassword("");
  };

  const handleCancel = () => {
    // Đóng popup
    setShowModal(false);
    // Reset mật khẩu
    setPassword("");
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
            render: (record) =>
              record.isEnrolled ? (
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
              ) : (
                <Popconfirm
                  title={`Are you sure you want to join ${record.courseName}?`}
                  onConfirm={() => handleJoinCourse(record)}
                  okButtonProps={{
                    type: "primary",
                    style: {
                      backgroundColor: "#4CAF50",
                      borderColor: "#4CAF50",
                    },
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#4CAF50",
                      borderColor: "#4CAF50",
                    }}
                  >
                    Join Course
                  </Button>
                </Popconfirm>
              ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title="Enter Password to Join Course"
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: password === "",
          style: {
            backgroundColor: password === "" ? "grey" : "#4CAF50",
            borderColor: password === "" ? "grey" : "#4CAF50",
          },
        }}
      >
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </Space>
  );
}
export default Course;

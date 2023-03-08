import { Avatar, Rate, Space, Table, Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import { getInfoTeam, getMember, getTeam } from "../../API";

function Team() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTeamSource, setDataTeamSource] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTeam()
      .then((res) => {
        console.log(res);
        setDataSource(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleRowClick = (record) => {
    setSelectedRow(record);
    setVisible(true);
    console.log(record.teamId);
    localStorage.setItem("teamId", record.teamId);

    setLoading(true);
    getInfoTeam(record.teamId)
      .then((res) => {
        console.log(res);
        setDataTeamSource(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    ////////////////////////////////////////
    setLoading(true);
    getMember(record.teamId)
      .then((res) => {
        console.log(res);
        setMember(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Space size={20} direction="vertical">
      <Table
        loading={loading}
        columns={[
          {
            title: "teamName",
            dataIndex: "teamName",
          },
          {
            title: "teamId",
            dataIndex: "teamId",
          },
          {
            title: "Member",
            dataIndex: "teamCount",
          },
          {
            title: "courseName",
            dataIndex: "courseName",
          },
          {
            title: "topicName ",
            dataIndex: "topicName",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      {selectedRow && (
        <Modal
          className="team-modal"
          open={visible}
          onCancel={handleClose}
          footer={null}
          width={"80vw"}
          okButtonProps={{
            type: "primary",
            style: {
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
            },
          }}
          title={"Infomation"}
        >
          <div className="team-popup">
            <div className="team-details">
              <div className="info-team">
                <div>
                  <div className="teamName">
                    <div>
                      <h2>Team</h2>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        {dataTeamSource[0]?.teamName}
                      </Typography.Title>
                    </div>
                  </div>
                  <div className="teamCount">
                    <div>
                      <h2>Member</h2>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        {dataTeamSource[0]?.teamCount}
                      </Typography.Title>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="topicName">
                    <div>
                      <h2>Topic</h2>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        {dataTeamSource[0]?.topicName}
                      </Typography.Title>
                    </div>
                  </div>
                  <div className="deadlineDate">
                    <div>
                      <h2>Deadline</h2>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        {dataTeamSource[0]?.deadlineDate}
                      </Typography.Title>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-list">
                <Space size={20} direction="vertical">
                  <Table
                    loading={loading}
                    scroll={{ y: 250 }}
                    columns={[
                      {
                        title: "MSSV",
                        dataIndex: "stuCode",
                      },
                      {
                        title: "stuName",
                        dataIndex: "stuName",
                      },
                      {
                        title: "stuEmail",
                        dataIndex: "stuEmail",
                      },
                      {
                        title: "stuPhone",
                        dataIndex: "stuPhone",
                      },
                      {
                        title: "stuGender",
                        dataIndex: "stuGender",
                      },
                    ]}
                    dataSource={member}
                    pagination={false}
                  />
                </Space>
              </div>
            </div>
            <div className="topic-requirement">
              <div className="abc">
                <h1>Requirement</h1>
              </div>
              <div className="dsc">
                <Typography.Title level={5}>
                  {dataTeamSource[0]?.requirement}
                </Typography.Title>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Space>
  );
}
export default Team;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Table,
  Layout,
  Button,
  Space,
  Select,
  message,
  Form,
  Spin,
} from "antd";
import HomePageStyles from "./home.styles";
import StatusSelect from "components/StatusSelect/statusSelect";
import tasksAction from "../../redux/tasks/actions.js";
import FormItemInput from "components/Input/formItemInput";
import texts from "utils/texts.json";
import useAuth from "utils/authChecker.js";
import authAction from "../../redux/auth/actions.js";
import CustomHeader from "components/Header/header.js";

const { Content } = Layout;
const { Option } = Select;
const { fetchTasks, addTask, deleteTask, updateTask } = tasksAction;
const { refetchAuth } = authAction;

const HomePage = () => {
  const dispatch = useDispatch();
  useAuth();

  const { loginData } = useSelector((state) => state.Auth);
  const { tasksData, fetchTasksSuccess, isAddingTask, addTaskSuccess } =
    useSelector((state) => state.Tasks);

  const [tasks, setTasks] = useState(tasksData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  // Refetch auth if no login data
  useEffect(() => {
    if (!loginData) {
      dispatch(refetchAuth());
    }
  }, [loginData, dispatch]);

  // Fetch tasks once loginData is ready
  useEffect(() => {
    if (loginData?.user?.id) {
      if (!fetchTasksSuccess && !tasksData) {
        dispatch(fetchTasks({ user_id: loginData.user.id }));
      } else if (fetchTasksSuccess && tasksData) {
        setTasks(tasksData);
      }
    }
  }, [fetchTasksSuccess, tasksData, dispatch, loginData?.user?.id]);

  // Success message for add task
  useEffect(() => {
    if (addTaskSuccess) {
      message.success("Task added successfully!");
    }
  }, [addTaskSuccess]);

  const handleStatusChange = (value, taskId) => {
    dispatch(
      updateTask({
        task_id: taskId,
        owner_id: loginData.user.id,
        status: value,
      })
    );
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one task to delete.");
      return;
    }
    dispatch(deleteTask({ ids: selectedRowKeys }));
    message.success("Selected tasks deleted successfully!");
    setSelectedRowKeys([]);
  };

  const handleAddTask = (values) => {
    const data = {
      owner_id: loginData.user.id,
      title: values.title,
      description: values.description,
      status: values.status,
    };

    dispatch(addTask(data));
    form.resetFields();
  };

  const sortedTasks = [...(tasks || [])].sort((a, b) => {
    if (a.status === "Completed" && b.status !== "Completed") return 1;
    if (a.status !== "Completed" && b.status === "Completed") return -1;
    return 0;
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 500,
      render: (text, record) =>
        record.status === "Completed" ? <s>{text}</s> : text,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) =>
        record.status === "Completed" ? <s>{text}</s> : text,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status, record) => (
        <StatusSelect
          value={status}
          onChange={(value) => handleStatusChange(value, record._id)}
        />
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  if (!loginData) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Spin
          tip="Loading user data..."
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      </Layout>
    );
  }

  return (
    <HomePageStyles>
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <CustomHeader />
        <Content style={{ padding: "0 32px" }}>
          <Card
            title="Add New Task"
            bordered={false}
            className="cardStyle"
            style={{ marginBottom: 32 }}
          >
            <Form
              form={form}
              layout="horizontal"
              onFinish={handleAddTask}
              className="addTaskForm"
            >
              <FormItemInput
                required={true}
                name="title"
                reqMessage={texts.home_label_task_title_required_message}
                placeholder={texts.home_label_tasks_title}
              />

              <FormItemInput
                required={true}
                name="description"
                reqMessage={texts.home_label_task_desc_required_message}
                placeholder={texts.home_label_tasks_desk}
              />

              <Form.Item
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Status" style={{ width: "100%" }}>
                  <Option value="Pending">Pending</Option>
                  <Option value="Ongoing">Ongoing</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="addTaskButton"
                loading={isAddingTask}
              >
                Add Task
              </Button>
            </Form>
          </Card>

          <Card title="Your Tasks" bordered={false} className="cardStyle">
            <Space style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                danger
                onClick={handleDelete}
                disabled={selectedRowKeys.length === 0}
              >
                Delete Selected
              </Button>
            </Space>

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={sortedTasks.map((task) => ({
                ...task,
                key: task._id,
              }))}
              pagination={false}
              rowClassName={() => "customRow"}
              style={{ border: "none" }}
            />
          </Card>
        </Content>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;

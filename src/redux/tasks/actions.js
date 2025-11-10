
const actions = {
  // FETCH TASKS
  FETCH_TASKS: "FETCH_TASKS",
  FETCHING_TASKS: "FETCHING_TASKS",
  FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE: "FETCH_TASKS_FAILURE",
  RESET_TASKS: "RESET_TASKS",

  ADD_TASK: "ADD_TASK",
  ADDING_TASK: "ADDING_TASK",
  ADD_TASK_SUCCESS: "ADD_TASK_SUCCESS",
  ADD_TASK_FAILURE: "ADD_TASK_FAILURE",

  DELETE_TASK: "DELETE_TASK",
  DELETING_TASK: "DELETING_TASK",
  DELETE_TASK_SUCCESS: "DELETE_TASK_SUCCESS",
  DELETE_TASK_FAILURE: "DELETE_TASK_FAILURE",

  UPDATE_TASK: "UPDATE_TASK",
  UPDATING_TASK: "UPDATING_TASK",
  UPDATE_TASK_SUCCESS: "UPDATE_TASK_SUCCESS",
  UPDATE_TASK_FAILURE: "UPDATE_TASK_FAILURE",
  
  RESET_TASK_STATE: "RESET_TASK_STATE",



  fetchTasks: (payload) => ({
    type: actions.FETCH_TASKS,
    payload,
  }),

  addTask: (payload) => ({
    type: actions.ADD_TASK,
    payload,
  }),

  deleteTask: (payload) => ({
    type: actions.DELETE_TASK,
    payload,
  }),

  updateTask: (payload) => ({
    type: actions.UPDATE_TASK,
    payload,
  }),
};

export default actions;

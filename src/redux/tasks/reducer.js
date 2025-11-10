import actions from "./actions";
import authActions from "../auth/actions";

const initialState = {
  tasksData: null,
  isFetchingTasks: false,
  fetchTasksSuccess: false,
  isAddingTask: false,
  addTaskSuccess: false,
  fetchingParams: null,
  isDeletingTask: false,
  deleteTaskSuccess: false,
  isUpdatingTask: false,
  updateTaskSuccess: false,
  tokenError: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCHING_TASKS:
      return {
        ...state,
        isFetchingTasks: true,
        fetchingParams: action.fetchingParams,
      };
    case actions.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        fetchTasksSuccess: true,
        isFetchingTasks: false,
        tasksData: action.tasksData,
      };
    case actions.FETCH_TASKS_FAILURE:
      return {
        ...state,
        fetchTasksSuccess: false,
        isFetchingTasks: false,
        tokenError: action.tokenError,
      };

    case actions.RESET_TASKS:
      return {
        ...state,
        tasksData: null,
        fetchTasksSuccess: false,
        isAddingTask: false,
        addTaskSuccess: false,
      };

    case authActions.LOG_IN_SUCCESS:
      return {
        ...state,
        tokenError: null,
      };
    case actions.ADDING_TASK:
      return {
        ...state,
        isAddingTask: true,
        addTaskSuccess: false,
      };
    case actions.ADD_TASK_SUCCESS:
      return {
        ...state,
        isAddingTask: false,
        addTaskSuccess: true,
      };
    case actions.ADD_TASK_FAILURE:
      return {
        ...state,
        isAddingTask: false,
        addTaskSuccess: false,
      };
    case actions.DELETING_TASK:
      return {
        ...state,
        isDeletingTask: true,
        deleteTaskSuccess: false,
      };
    case actions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isDeletingTask: false,
        deleteTaskSuccess: true,
      };
    case actions.DELETE_TASK_FAILURE:
      return {
        ...state,
        isDeletingTask: false,
        deleteTaskSuccess: false,
      };

    case actions.UPDATING_TASK:
      return {
        ...state,
        isUpdatingTask: true,
        updateTaskSuccess: false,
      };
    case actions.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isUpdatingTask: false,
        updateTaskSuccess: true,
      };
    case actions.UPDATE_TASK_FAILURE:
      return {
        ...state,
        isUpdatingTask: false,
        updateTaskSuccess: false,
      };

    default:
      return state;
  }
}

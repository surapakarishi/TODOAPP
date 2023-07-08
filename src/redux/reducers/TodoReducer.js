/* eslint-disable array-callback-return */
import { ADD_TODO, DEL_TODO, TICK_BOX, UPDATE_TODO } from "../Actions/Actions";
const initialState = [];

export const Todoreducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_TODO:
      return [...state, action.payload];


    case DEL_TODO:
      const filteredTodos = state.filter((todo) => todo.id !== action.payload);
      return filteredTodos;


    case UPDATE_TODO:
      let data = action.payload;
      const updatedArray = [];
      state.map((item) => {
        if (item.id === data.id) {
          item.id = data.id;
          item.todo = data.todo;
          item.completed = data.completed;
        }
        updatedArray.push(item);
      });
      return updatedArray;


    case TICK_BOX:
      let todoArray = [];
      state.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        todoArray.push(item);
      });

      return todoArray;

    default:
      return state;
  }
};

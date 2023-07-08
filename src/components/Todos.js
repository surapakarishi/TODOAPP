import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import '../App.css'
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTodo,
  delTodo,
  editSubmit,
  tickBox,
} from "../redux/Actions/Actions";

const Todos = () => {
  const [Data, setData] = useState("");
  const [updateFormVisibility, setUpdateFormVisibility] = useState(false);
  const [updateTodo, setUpdateTodo] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const todos = useSelector((state) => state.Todoreducer);
  console.log(todos);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdateValue(updateTodo.todo);
  }, [updateTodo]);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Data);
    if (Data === "") {
      alert("Input fields cannot be empty");
    } else {
      let todoObj = {
        id: uuidv4(),
        todo: Data,
        completed: false,
      };
      dispatch(addTodo(todoObj));
      setData("");
    }
  };

  const handleEdit = (todos) => {
    setUpdateFormVisibility(true);
    setUpdateTodo(todos);
  };

  const updateSubmit = (e) => {
    e.preventDefault();

    let editedObj = {
      id: updateTodo.id,
      todo: updateValue,
      completed: false,
    };
    dispatch(editSubmit(editedObj));
    setUpdateFormVisibility(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor:'#4D5656',
          display: "flex",
          justifyContent: "center",
          marginTop: 0,
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 720,
          },
        }}
      >
        <TableContainer
          sx={{ backgroundColor:'#FBFCFC',border: "3px solid black", borderRadius: 5 }}
          component={Paper}
          elevation={10}
        >
          <Typography variant="h3" mt={4} align="center">
            Todo List
          </Typography>

          <>
            {updateFormVisibility === false ? (
              <>
                <TextField
                  sx={{ marginTop: 6, marginLeft: 5, marginBottom: 3 }}
                  id="outlined-basic"
                  placeholder="Enter task..."
                  variant="filled"
                  type="text"
                  name="ADD"
                  value={Data}
                  onChange={handleChange}
                />
                <AddBoxIcon
                  sx={{ marginTop: 6, fontSize: 50 }}
                  onClick={handleSubmit}
                />
              </>
            ) : (
              <>
                <TextField
                  sx={{ marginTop: 6, marginLeft: 5, marginBottom: 3 }}
                  id="outlined-basic"
                  placeholder="update task..."
                  variant="filled"
                  type="text"
                  name="ADD"
                  value={updateValue || ""}
                  onChange={(e) => setUpdateValue(e.target.value)}
                />

                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ marginTop: 7, marginLeft: 2, color: "ActiveBorder" }}
                  onClick={updateSubmit}
                >
                  <PublishedWithChangesIcon sx={{ fontSize: 20 }} />
                  Update
                </Button>
              </>
            )}
          </>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingLeft: 5 }}>No.</TableCell>
                <TableCell sx={{ paddingLeft: 5 }}>Task</TableCell>
                <TableCell sx={{ paddingLeft: 5 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todos, index) => (
                <TableRow key={todos.id}>
                  <TableCell sx={{ paddingLeft: 5 }}>{index + 1}.</TableCell>
                  <TableCell
                    sx={[
                      {
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: 5,
                        marginTop: 1.85,
                      },
                      todos.completed === true
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" },
                    ]}
                  >
                    <Typography sx={{ paddingBottom: 2 }}>
                      {todos.todo}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingLeft: 5 }}>
                    {updateFormVisibility === false && (
                      <>
                        <CheckCircleOutlineIcon
                          onClick={() => dispatch(tickBox(todos.id))}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <EditIcon onClick={() => handleEdit(todos)} />
                        &nbsp;&nbsp;&nbsp;
                        <DeleteIcon
                          onClick={() => dispatch(delTodo(todos.id))}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Todos;

import React, { useState, useEffect, useContext } from "react";
import { myApi } from "../../api/api";
import { Typography, MenuItem } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { todoContext } from "../../contexts/context";

export default function TaskPage({ match, history }) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState("");
  const [subtasks, setSubtasks] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [urgency, setUrgency] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [updated, setUpdated] = useState("");
  const [error, setError] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [subtaskToDelete, setSubtaskToDelete] = useState("");
  const [taskToDelete, setTaskToDelete] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const { setProjectName, setProjectId } = useContext(todoContext);

  const handleChangeTaskStatus = (value) => {
    setLoading(true);
    (async () => {
      await myApi().patch(`/tasks/${match.params.id}`, { status: value });
      history.push(`/project/${task.project._id}`);
    })();
  };

  const handleDelete = () => {
    if (subtaskToDelete) {
      setLoading(true);
      (async () => {
        const data = await myApi().delete(`/subtasks/${subtaskToDelete}`);
        setDeleteOpen(false);
        setSubtaskToDelete("");
        setUpdated(data);
      })();
    } else if (taskToDelete) {
      setLoading(true);
      (async () => {
        await myApi().delete(`/tasks/${task._id}`);
        history.push(`/project/${task.project._id}`);
      })();
    }
  };

  const handleDeleteOpen = (id) => {
    setSubtaskToDelete(id);
    setDeleteOpen(true);
  };

  const handleDeleteOpenTask = () => {
    setTaskToDelete(task._id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setSubtaskToDelete("");
    setTaskToDelete("");
    setDeleteOpen(false);
  };

  const handleSubTask = () => {
    if (name === "" || urgency === "" || status === "" || description === "") {
      setError(true);
      return;
    }
    setLoading(true);
    if (id) {
      (async () => {
        const data = await myApi().patch(`/subtasks/${id}`, {
          name,
          description,
          comments,
          urgency,
          status,
        });
        setUpdated(data);
      })();
    } else {
      (async () => {
        const data = await myApi().post(`/subtasks/${match.params.id}`, {
          name,
          description,
          comments,
          urgency,
          status,
        });
        setUpdated(data);
      })();
    }
    handleClose();
  };

  const handleUpdateClickOpen = (subtask) => {
    setName(subtask.name);
    setDescription(subtask.description);
    setComments(subtask.comments);
    setUrgency(subtask.urgency);
    setStatus(subtask.status);
    setId(subtask._id);
    setOpen(true);
  };

  const handleAddClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setComments("");
    setUrgency("");
    setStatus("");
    setId("");
    setOpen(false);
    setError(false);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const taskData = await myApi().get(`/tasks/${match.params.id}`);
      setTask(taskData.data);
      setTaskStatus(taskData.data.status);
      setProjectName(taskData.data.project.name);
      setProjectId(taskData.data.project._id);
      const subtasksData = await myApi().get(
        `/subtasks/all/${match.params.id}`
      );
      setSubtasks(subtasksData.data);
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [setSubtasks, match.params.id, updated]);

  const renderSubTasks = () => {
    return subtasks.map((subtask) => (
      <TableRow
        hover
        key={subtask.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateClickOpen(subtask)}
          >
            {subtask.name}
          </span>
        </TableCell>
        <TableCell>{new Date(subtask.createdAt).toLocaleString()}</TableCell>
        <TableCell>
          <Box
            sx={{
              p: 2,
              borderRadius: "15px",
              bgcolor: `${subtask.urgency}`,
            }}
          ></Box>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="large"
            onClick={(e) => handleDeleteOpen(subtask._id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="home-page">
          <CssBaseline />
          <Container maxWidth="xl">
            <Typography gutterBottom variant="h4" align="center">
              {task.name}
            </Typography>
            <div style={{ margin: "auto", width: "fit-content" }}>
              <TextField
                style={{ margin: 20, minWidth: 120 }}
                label="Status"
                select
                variant="outlined"
                id="status"
                margin="dense"
                value={taskStatus}
                onChange={(e) => handleChangeTaskStatus(e.target.value)}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="process">Process</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </TextField>
            </div>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                gap: 3,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleAddClickOpen}
              >
                Add Task
              </Button>
              <Link to={`/project/${task.project._id}`}>
                <Button variant="contained" size="large">
                  Move To Board
                </Button>
              </Link>
              <Button
                variant="contained"
                size="large"
                onClick={handleDeleteOpenTask}
              >
                Delete Task
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Task Name</TableCell>
                    <TableCell>Task Date</TableCell>
                    <TableCell>Task Urgency</TableCell>
                    <TableCell sx={{ width: 150 }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderSubTasks()}</TableBody>
              </Table>
            </TableContainer>
            <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="dense"
                          variant="outlined"
                          label="Task Name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="dense"
                          multiline
                          rows="5"
                          variant="outlined"
                          label="Description"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          margin="dense"
                          multiline
                          rows="5"
                          variant="outlined"
                          label="Comments"
                          id="comments"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2} align="center">
                      <Grid item xs={12}>
                        <DialogTitle>Task Urgency</DialogTitle>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            p: 2,
                            m: 1,
                            borderRadius: "15px",
                            bgcolor: "red",
                            width: "80%",
                            border: urgency === "red" ? "4px solid black" : "",
                            cursor: "pointer",
                          }}
                          onClick={() => setUrgency("red")}
                        ></Box>
                        <Box
                          sx={{
                            p: 2,
                            m: 1,
                            borderRadius: "15px",
                            bgcolor: "green",
                            width: "80%",
                            border:
                              urgency === "green" ? "4px solid black" : "",
                            cursor: "pointer",
                          }}
                          onClick={() => setUrgency("green")}
                        ></Box>
                        <Box
                          sx={{
                            p: 2,
                            m: 1,
                            borderRadius: "15px",
                            bgcolor: "yellow",
                            width: "80%",
                            border:
                              urgency === "yellow" ? "4px solid black" : "",
                            cursor: "pointer",
                          }}
                          onClick={() => setUrgency("yellow")}
                        ></Box>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          style={{ margin: 20, minWidth: 120 }}
                          label="Status"
                          select
                          variant="outlined"
                          id="status"
                          margin="dense"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="finished">Finished</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          size="large"
                          color={error ? "error" : "primary"}
                          onClick={handleSubTask}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            <Dialog
              open={deleteOpen}
              onClose={handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete this task?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure that you want to delete this task?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { myApi } from "../../api/api";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { todoContext } from "../../contexts/context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

export default function ProjectPage({ match }) {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [updated, setUpdated] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { setProjectName, setProjectId } = useContext(todoContext);

  const handleAddTask = () => {
    if (name === "" || status === "") {
      setError(true);
      return;
    }
    setLoading(true);
    (async () => {
      const data = await myApi().post(`/tasks/${match.params.id}`, {
        name,
        status,
      });
      setUpdated(data);
    })();
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setStatus("");
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await myApi().get(`/tasks/all/${match.params.id}`);
      setTasks(data.data);
      if (data.data[0]) {
        setProjectName(data.data[0].project.name);
        setProjectId(match.params.id);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [match.params.id, updated]);

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task, i) => (
        <Card key={i} sx={{ m: 2 }}>
          <Link to={`/project/task/${task._id}`}>
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                align="center"
                color="black"
              >
                {task.name}
              </Typography>
            </CardContent>
          </Link>
        </Card>
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
            <div style={{ margin: "20px auto", width: "fit-content" }}>
              <Button variant="contained" size="large" onClick={handleOpen}>
                Add Task
              </Button>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "15px",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Typography
                    color="white"
                    variant="h4"
                    component="div"
                    align="center"
                  >
                    TODO
                  </Typography>
                  {renderTasks("todo")}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "15px",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Typography
                    color="white"
                    variant="h4"
                    component="div"
                    align="center"
                  >
                    PROCESS
                  </Typography>
                  {renderTasks("process")}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "15px",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Typography
                    color="white"
                    variant="h4"
                    component="div"
                    align="center"
                  >
                    DONE
                  </Typography>
                  {renderTasks("done")}
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
            <DialogContent>
              <Grid container align="center" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="process">Process</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color={error ? "error" : "primary"}
                    onClick={handleAddTask}
                  >
                    Add Task
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

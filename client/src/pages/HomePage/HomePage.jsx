import React, { useState, useEffect, useContext } from "react";
import { myApi } from "../../api/api";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { todoContext } from "../../contexts/context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import "./HomePage.css";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState("");
  const { setProjectName, setProjectId } = useContext(todoContext);

  const handleAddProject = () => {
    if (name === "" || goal === "" || description === "") {
      setError(true);
      return;
    }
    setLoading(true);
    (async () => {
      const data = await myApi().post(`/projects`, {
        name,
        description,
        goal,
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
    setDescription("");
    setGoal("");
    setOpen(false);
  };

  useEffect(() => {
    setProjectName("");
    setProjectId("");
    setLoading(true);
    (async () => {
      const data = await myApi().get("/projects/all");
      setProjects(data.data);
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [setProjects, updated]);

  const renderProjects = () => {
    return projects.map((project, i) => (
      <Grid key={i} item xs={6}>
        <Link to={`/project/${project._id}`}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" align="center">
                {project.name}
              </Typography>
              <Typography variant="h6" display="inline" component="div">
                Description:{" "}
              </Typography>
              <Typography variant="body1" display="inline" component="span">
                {project.description}
              </Typography>
              <br />
              <Typography variant="h6" display="inline" component="div">
                Goal:{" "}
              </Typography>
              <Typography variant="body1" display="inline" component="span">
                {project.goal}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
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
            <Box
              sx={{
                p: 4,
                borderRadius: "15px",
                bgcolor: "black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 25,
                }}
              >
                <Typography variant="h3" color="white">
                  Projects
                </Typography>
                <Button variant="contained" size="medium" onClick={handleOpen}>
                  Add Project
                </Button>
              </div>
              <Grid container spacing={5}>
                {renderProjects()}
              </Grid>
            </Box>
          </Container>
          <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
            <DialogContent>
              <Grid container align="center" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    multiline
                    rows="5"
                    variant="outlined"
                    label="Name"
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
                    label="Goal"
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color={error ? "error" : "primary"}
                    onClick={handleAddProject}
                  >
                    Add Project
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

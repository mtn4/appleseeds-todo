import React, { useState, useEffect, useContext } from "react";
import { myApi } from "../../api/api";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { todoContext } from "../../contexts/context";

export default function ProjectPage({ match }) {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState("");
  const { setProjectName, setProjectId } = useContext(todoContext);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await myApi().get(`/tasks/all/${match.params.id}`);
      setTasks(data.data);
      setProjectName(data.data[0].project.name);
      setProjectId(data.data[0].project._id);
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [match.params.id]);

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
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "15px",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    minHeight: "80vh",
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
                    minHeight: "80vh",
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
                    minHeight: "80vh",
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
        </div>
      )}
    </>
  );
}

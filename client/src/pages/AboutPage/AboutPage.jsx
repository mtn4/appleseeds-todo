import React from "react";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function HomePage() {
  return (
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
          <Typography gutterBottom variant="h3" color="white">
            About
          </Typography>
          <Typography gutterBottom variant="body" color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            neque, a et temporibus voluptatibus optio quae minima culpa
            laboriosam vitae. Laborum provident omnis perspiciatis explicabo
            facilis illo fugit earum inventore distinctio nemo, doloremque quos
            cupiditate soluta dolorem in itaque. Excepturi, ullam illo quod vero
            beatae rerum? Cum, nisi iste. Necessitatibus unde tempora, ullam
            delectus culpa laudantium debitis, consequatur harum aperiam optio
            asperiores, nostrum perspiciatis quod incidunt! Aspernatur esse
            consequuntur nihil perspiciatis ullam libero harum nulla in sint
            distinctio impedit ad, porro, nisi voluptates dolores blanditiis
            accusantium corporis quos deleniti sapiente aliquid recusandae
            sequi, natus rerum! Dignissimos praesentium sequi magni saepe ipsum
            a alias quos quae molestiae necessitatibus? Ullam quia corrupti
            eligendi, qui similique natus voluptates placeat dolorem! Eveniet
            asperiores voluptatem amet officia distinctio consequatur atque,
            obcaecati sint, nemo odit molestiae, hic facilis beatae ut
            consectetur minus error eos! Rem nihil beatae vitae quia ullam at
            culpa nulla accusantium hic? Et, iure reprehenderit ipsam cum
            tenetur veniam nam earum, pariatur error hic id praesentium ratione
            qui numquam tempore deserunt illum ipsa quidem, optio deleniti
            laboriosam. Voluptates consequuntur, odio quos quaerat sequi ab
            tempora quas aliquam! Placeat, nisi possimus dolorum eligendi
            voluptatibus consequuntur corrupti tempore. Sunt, veritatis soluta!
            Distinctio quam quaerat deserunt omnis, sit iure quisquam obcaecati
            aliquam ex voluptatem eveniet optio molestiae fugiat expedita
            tempore numquam magni maxime mollitia, neque laborum. Aperiam omnis
            fugit, magni dicta blanditiis in quo ratione, ipsum fuga officia
            temporibus cumque vel unde velit consequatur quibusdam,
            exercitationem a dignissimos ullam quas assumenda tempore quis
            debitis! Voluptate, nobis.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

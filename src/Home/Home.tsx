// import React from "react";
// import { Link } from "react-router-dom";
// import Overall from "../Stats2/Overall";
// import { Nature } from "@mui/icons-material";

import React from "react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;

// import {
//   Container,
//   Fade,
//   Grid,
//   Grow,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import Events from "./Events";
// import { Box } from "@mui/system";
// /**
//  * A simple, elegant and inspiration home page for the app.
//  * Allow easy access to the main features of the app.
//  * Have a simple, clean and elegant design.
//  *
//  * The elements of the home page should be:
//  *
//  * - An inspirational quote.
//  * - A link to the tasks page.
//  * - A link to the seed page.
//  * - A link to the soil page.
//  * - How are you feeling today? (A mood tracker)
//  * - A link to the statistics page.
//  * - A single most important graph of growth.
//  */
// import TopBar from "./TopBar";
// import CondensedTaskList from "../Tasks/CondensedTaskList";
// import Timer from "../Seed/Timer";
// import StyledCard from "../Common/ReusableComponents/StyledCard";
// import HabitsCondensed from "../Journal/HabitsCondensed";
// import PieCharts from "../Stats2/PieCharts";

// const Home = () => {
//   // const inspirationalQuote = {
//   //   quote: "It is not the mountain we conquer, but ourselves.",
//   //   author: "Sir Edmund Hillary",
//   // };
//   const inspirationalQuote = {
//     quote: "Not all those who wander are lost.",
//     author: "Bilbo Baggins",
//   };

//   const transitionDelays = {
//     quote: 0,
//     quoteAuthor: 1000,
//     places: 1000,
//     goals: 1000,
//     schedule: 1000,
//     overall: 1000,
//   };

//   return (
//     <>
//       <TopBar />
//       <Container sx={{ pt: 2, p: { xs: 0, md: 2 } }}>
//         <Box
//           sx={{
//             pt: 0,
//             p: 2,
//             mb: 2,
//             backgroundColor: {
//               xs: "surfaceVariant.main",
//               sm: "surfaceVariant.main",
//             },
//             color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
//           }}
//         >
//           <Grid
//             container
//             spacing={{
//               xs: 2,
//               sm: 2,
//               md: 3,
//             }}
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Grid item xs={12}>
//               <Grow in={true} {...{ timeout: 1000 }}>
//                 <StyledCard
//                   sx={{
//                     position: "relative",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     padding: "1rem",
//                   }}
//                 >
//                   <Typography variant="h6" align="center">
//                     {inspirationalQuote.quote} - {inspirationalQuote.author}
//                   </Typography>
//                 </StyledCard>
//               </Grow>
//             </Grid>

//             <Grid item xs={12} sm={6} md={4} sx={{ pb: 0, mb: 0 }}>
//               <Fade
//                 in={true}
//                 style={{
//                   transitionDelay: `${transitionDelays.goals}ms`,
//                 }}
//                 {...{ timeout: 1000 }}
//               >
//                 <div>
//                   <CondensedTaskList />
//                 </div>
//               </Fade>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4} sx={{ pb: 0, mb: 0 }}>
//               <Fade
//                 in={true}
//                 style={{
//                   transitionDelay: `${transitionDelays.goals}ms`,
//                 }}
//                 {...{ timeout: 1000 }}
//               >
//                 <div style={{ position: "relative" }}>
//                   <Timer />
//                   <IconButton
//                     sx={{ position: "absolute", top: 0, right: 0 }}
//                     component={Link}
//                     to="/Seed"
//                     color="primary"
//                   >
//                     <Nature />
//                   </IconButton>
//                 </div>
//               </Fade>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4} sx={{ pt: 0, mt: 0 }}>
//               <Fade
//                 in={true}
//                 style={{
//                   transitionDelay: `${transitionDelays.overall}ms`,
//                 }}
//                 {...{ timeout: 1000 }}
//               >
//                 <div>
//                   <HabitsCondensed />
//                 </div>
//               </Fade>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4} sx={{ pt: 0, mt: 0 }}>
//               <Fade
//                 in={true}
//                 style={{
//                   transitionDelay: `${transitionDelays.overall}ms`,
//                 }}
//                 {...{ timeout: 1000 }}
//               >
//                 <div>
//                   <PieCharts />
//                 </div>
//               </Fade>
//             </Grid>

//             <Grid item xs={12} sm={12} md={8} sx={{ pt: 0, mt: 0 }}>
//               <Fade
//                 in={true}
//                 style={{
//                   transitionDelay: `${transitionDelays.overall}ms`,
//                 }}
//                 {...{ timeout: 1000 }}
//               >
//                 <div>
//                   <Overall />
//                 </div>
//               </Fade>
//             </Grid>

//             <Grid item xs={12} md={8} sx={{ pt: 0, mt: 0 }}></Grid>
//           </Grid>
//         </Box>
//         <Fade
//           in={true}
//           style={{
//             transitionDelay: `${transitionDelays.schedule}ms`,
//           }}
//           {...{ timeout: 1000 }}
//         >
//           <div>
//             <Events />
//           </div>
//         </Fade>
//       </Container>
//     </>
//   );
// };

// export default Home;

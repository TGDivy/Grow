/* eslint-disable max-len */
import { themeFromImage } from "@material/material-color-utilities";

const image = document.createElement("img");
image.src = "https://wallpapercave.com/wp/rEZ5ohG.jpg";

themeFromImage(image).then((theme) => {
  console.log(theme);
});

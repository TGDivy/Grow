import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  UnsplashImageType,
  getUnsplashImages,
} from "../Common/Stores/Utils/Utils";

type Props = {
  setImage: (unsplashImage: UnsplashImageType) => void;
  search?: string;
};

const ImagePicker = (props: Props) => {
  const { setImage, search } = props;
  const [selected, setSelected] = React.useState(0);

  const [images, setImages] = React.useState<UnsplashImageType[]>([]);
  React.useEffect(() => {
    if (search) {
      getUnsplashImages(search).then((urls) => {
        setImages(urls);
      });
    }
  }, [search]);

  if (images.length === 0) {
    return (
      <>App has exhausted its Unsplash API quota. Please try again in 1 hour.</>
    );
  }

  return (
    <ImageList cols={3} variant="quilted" rowHeight={121}>
      <ImageListItem cols={3} rows={1}>
        <img
          src={`${images[selected].url}`}
          srcSet={`${images[selected].url}`}
          alt={`cover image for ${images[selected].url}}`}
          loading="lazy"
        />
        <ImageListItemBar
          title={"Selected Image Preview"}
          subtitle={
            // link to author's profile
            <Stack direction="row" spacing={1}>
              <Typography variant="caption">Photo by</Typography>

              <Link href={images[selected].authorUrl} target="_blank">
                <Typography variant="caption">
                  {images[selected].name}
                </Typography>
              </Link>
              <Typography variant="caption">on</Typography>
              <Link href="https://unsplash.com/" target="_blank">
                <Typography variant="caption">Unsplash</Typography>
              </Link>
            </Stack>
          }
        />
      </ImageListItem>
      {images.map((image, index) => (
        <ImageListItem
          key={image.url}
          cols={index % 3 === 1 ? 2 : 1}
          rows={index % 4 === 0 ? 2 : 1}
          onClick={() => {
            setSelected(index);
            setImage(image);
          }}
          sx={{
            border: selected === index ? "5px solid" : "none",
            borderRadius: selected === index ? "5px" : "none",
            borderColor: "success.main",
            cursor: "pointer",
          }}
        >
          <img
            src={`${image.url}`}
            srcSet={`${image.url}`}
            alt={image.url}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagePicker;

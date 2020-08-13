import React, { useState } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

function ImageResult({ images }) {
  const [imgMode, setimgMode] = useState({
    open: false,
    currentImg: "",
  });

  const handleOpen = (img) => {
    setimgMode((prev) => {
      return {
        open: !prev.open,
        currentImg: img,
      };
    });
  };

  const handleClose = () => {
    setimgMode((prev) => {
      return {
        ...prev,
        open: !prev.open,
      };
    });
  };

  let imageListContent;
  if (images) {
    imageListContent = (
      <GridList cols={3}>
        {images.map((img) => (
          <GridTile
            title={img.tags}
            key={img.id}
            subtitle={
              <span>
                By <strong>{img.user}</strong>
              </span>
            }
            actionIcon={
              <IconButton onClick={() => handleOpen(img.largeImageURL)}>
                <ZoomIn color="white" />
              </IconButton>
            }
          >
            <img src={img.largeImageURL} alt={img.user} />
          </GridTile>
        ))}
      </GridList>
    );
  } else {
    imageListContent = null;
  }

  const actions = [
    <FlatButton label="Close" primary={true} onClick={handleClose} />,
  ];
  return (
    <div>
      {imageListContent}
      <Dialog
        actions={actions}
        modal={false}
        open={imgMode.open}
        onRequestClose={handleClose}
      >
        <img src={imgMode.currentImg} alt="" style={{ width: "100%" }} />
      </Dialog>
    </div>
  );
}

export default ImageResult;

ImageResult.propTypes = {
  images: PropTypes.array.isRequired,
};

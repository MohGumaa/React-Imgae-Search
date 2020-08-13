import React, { useState, useEffect } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResult from "../image-results/ImageResult";

function SearchForm() {
  const [searchText, setsearcText] = useState("");
  const [api, setApi] = useState({
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "17810646-051bea455504f8d4825f3e392",
    images: [],
  });

  const onTextChange = (e) => {
    setsearcText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setApi((prev) => {
        return { ...prev, images: [] };
      });
    } else {
      axios
        .get(
          `${api.apiUrl}/?key=${api.apiKey}&q=${searchText}&image_type=photo&per_page=${api.amount}&safesearch=True`
        )
        .then((res) => {
          const result = res.data.hits;
          setApi((prev) => {
            return { ...prev, images: result };
          });
        })
        .catch((err) => console.log(err));
      console.log(api.amount);
    }
  }, [searchText, api.amount]);

  const onAmountChange = (e, index, value) => {
    setApi((prev) => {
      return { ...prev, amount: value };
    });
  };

  return (
    <div>
      <TextField
        name="searchText"
        value={searchText}
        onChange={onTextChange}
        floatingLabelText="Search For Images"
        fullWidth={true}
      />
      <SelectField
        name="Amount"
        floatingLabelText="Amount"
        value={api.amount}
        onChange={onAmountChange}
      >
        <MenuItem value={5} primaryText="5" />
        <MenuItem value={10} primaryText="10" />
        <MenuItem value={15} primaryText="15" />
        <MenuItem value={30} primaryText="30" />
        <MenuItem value={50} primaryText="50" />
      </SelectField>
      <br />
      {api.images.length > 0 ? (
        <ImageResult ImageResult images={api.images} />
      ) : null}
    </div>
  );
}

export default SearchForm;

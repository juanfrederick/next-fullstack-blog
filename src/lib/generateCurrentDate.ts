import React from "react";

const generateCurrentDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date();
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return newDate.toLocaleDateString("en-US", options);
};

export default generateCurrentDate;

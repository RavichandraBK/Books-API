const mong = require("mongoose");

const Book = mong.model("Book", {
  title: { type: String, required: [true, "Title of the book is required"] },
  author: { type: String, required: [true, "Author is required"] },
  ISBN: {
    type: String,
    required: [true, "ISBN is required"],
    validate: {
      validator: function (value) {
        // Regular expression to match ISBN-10 or ISBN-13 format
        const isbnRegex =
          /^(?:ISBN(?:-1[03])?:?\s*)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\s]){3})[-\s0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\s]){4})[-\s0-9]{17}$)(?:97[89][-–\s]?)?[0-9]{1,5}[-–\s]?[0-9]+[-–\s]?[0-9]+[-–\s]?[0-9X]$/;
        return isbnRegex.test(value);
      },
      message: "Please provide a valid ISBN",
    },
  },
  publicationDate: {
    type: String,
    required: [true, "Please provide published date"],
    validate: {
      validator: function (value) {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        return dateRegex.test(value);
      },
      message: "Please provide the publication date in the format dd/mm/yyyy",
    },
  },
});

module.exports = Book;

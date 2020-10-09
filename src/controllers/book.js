const { Book, Category, User } = require("../../models");

exports.index = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Category,
          as: "Category",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        { model: User, as: "User" },
      ],
    });
    res.send({
      message: "Response Success",
      data: {
        books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

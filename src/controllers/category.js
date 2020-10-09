const { Category } = require("../../models");

exports.index = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send({
      message: "Response Success",
      data: {
        categories,
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

exports.view = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: {
        id,
      },
    });
    res.send({
      message: "Response Success",
      data: {
        category,
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

exports.create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.send({
      message: "Response Success",
      data: {
        category,
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

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.update(req.body, { where: { id } });
    const category = await Category.findOne({
      where: { id },
    });
    res.send({
      message: "Response Success!! Data has been Updated",
      data: { category },
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

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `Delete Success!! Category with id ${id} has been deleted`,
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

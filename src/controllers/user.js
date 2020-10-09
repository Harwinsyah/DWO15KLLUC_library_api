const { User } = require("../../models");

const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtKey = "libraryToken2020";

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, gender, phone, address } = req.body;
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already exist",
        },
      });
    }

    const encryptPassword = await bycript.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: encryptPassword,
      gender,
      phone,
      address,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );
    console.log(token);

    res.send({
      message: "Register Success",
      data: {
        email: user.email,
        token,
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: "Your Email or Password wrong. Please try again",
        },
      });
    }

    const validPassword = await bycript.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        error: {
          message: "Your Email or Password wrong.Please try again",
        },
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    res.send({
      message: "Login Success",
      data: {
        email: user.email,
        token,
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

exports.index = async (req, res) => {
  try {
    const users = await User.findAll();

    res.send({
      message: "Response Success",
      data: { user },
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
    const user = await User.findOne({
      where: {
        id,
      },
    });

    res.send({
      message: "Response Success",
      data: {
        user,
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

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: `Delete Success!! User with id ${id} has been deleted`,
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

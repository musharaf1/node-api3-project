
module.exports = {
  logger,
  validateUserId,
  validatePost,
  validateUser
};


function logger(req, res, next) {
  console.log(`$[${new Date().toISOString()}]    ${req.method} to ${req.url} ${req.get('Origin')}`),
    next();
}

function validateUserId(req, res, next) {
  // do your magic!
  userdb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user id." });
      }
    })
    .catch(
      err => {
        console.log("Get User By Id Error:", err);
        res.status(500).json({
          message: `There was a problem retriving the user`
        });
      }
    );
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: "Missing required name field." });
    }
  } else {
    res.status(400).json({ message: "Missing user data." });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "Missing required text field." });
    }
  } else {
    res.status(400).json({ message: "Missing post data." });
  }
}

// do not forget to expose these functions to other modules

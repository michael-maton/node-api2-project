const express = require("express");
const Data = require("../db-helpers");
const router = express.Router();

// GET REQUESTS
// GET REQUESTS
// GET REQUESTS
router.get("/", (req, res) => {
  Data.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Data.findById(id)
    .then((post) => {
      console.log(post);
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  Data.findPostComments(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// DELETE REQUEST
// DELETE REQUEST
// DELETE REQUEST
router.delete("/:id", (req, res) => {
  Data.remove(req.params.id)
    .then((deletedPost) => {
      if (!deletedPost) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(deletedPost);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

module.exports = router;

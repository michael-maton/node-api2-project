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
      if (!post.length) {
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
      if (!comment) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(comment);
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

// POST REQUESTS
// POST REQUESTS
// POST REQUESTS
router.post("/", async (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    try {
      const newPost = await Data.insert(post);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    }
  }
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  Data.findById(id).then((post) => {
    console.log(post);
    if (!post.length) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      const comment = req.body;
      if (!comment.text) {
        res.status(400).json({
          errorMessage: "Please provide text for the post.",
        });
      } else {
        Data.insertComment(comment)
            .then((newComment) => {
                console.log(newComment);
                res.status(201).json(newComment);
            })
            .catch(error => {
                res.status(500).json({
                  error: "There was an error while saving the post to the database",
                });
            })
      }
    }
  });
});


// PUT REQUEST
// PUT REQUEST
// PUT REQUEST
router.put("/:id", (req, res) => {
    const { id } = req.params;
    Data.findById(id).then((post) => {
      console.log(post);
      if (!post.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        const updatedPost = req.body;
        if (!updatedPost.title || !updatedPost.contents) {
          res.status(400).json({
            errorMessage: "Please provide a title and contents for the post.",
          });
        } else {
          Data.update(id, updatedPost)
              .then((updated) => {
                  console.log(updated);
                  res.status(201).json(updatedPost);
              })
              .catch(error => {
                  res.status(500).json({
                    error: "There was an error while saving the post to the database",
                  });
              })
        }
      }
    });
  });

module.exports = router;

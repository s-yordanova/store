const {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
  verifyToken,
} = require("./verifyToken");
const Product = require("../models/Product");

const router = require("express").Router();
var Lock = require("../lock");
var lock = new Lock();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCT QUANTITY

router.put("/quantity/:id", verifyToken, async (req, res) => {
  try {
    lock.acquire();
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { quantity: -req.body.quantity },
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
    lock.release();
  } catch (err) {
    res.status(500).json(err);
    lock.release();
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCTS FROM SARCH

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    let products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        {
          categories: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }).limit(10);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL UPRODUCTS

router.get("/:parm", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

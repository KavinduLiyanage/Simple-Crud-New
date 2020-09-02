const router = require("express").Router();
let Product = require("../models/productModel");

//@route POST
//@desc Add new Product
router.route("/add").post((req, res) => {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productQnt = req.body.productQnt;
    const userId = req.body.userId;

    const newProduct = new Product({
        productName,
        productDescription,
        productQnt,
        userId,
    });

    newProduct
        .save()
        .then((newProduct) => {
            res.status(200).json({ newProduct: "product is added successfully" });
        })
        .catch((err) => {
            res.status(400).send("unable to save to database");
        });
});

//@route GET
//@desc Get all products data
router.route("/:id").get((req, res) => {
    const userId = req.params.id;
    Product.find({ userId: { $regex: userId, $options: "i" } })
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Get Specific Product Using ID
router.route("/edit/:id").get((req, res) => {
    Product.findById(req.params.id)
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE
//@desc Delete specific product using ID
router.route("/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json("Product deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Update specific Product using ID
router.route("/update/:id").post((req, res) => {
    Product.findById(req.params.id).then((products) => {
        products.productName = req.body.productName;
        products.productDescription = req.body.productDescription;
        products.productQnt = req.body.productQnt;

        products
            .save()
            .then(() => res.json("Product Updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });
});

//Export User Route
module.exports = router;
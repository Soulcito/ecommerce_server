const { request, response } = require('express');
const Product = require('../models/product');
const slugify = require('slugify');

// exports middlewares: logica de negocio

exports.create = async (req = request, res = response) => {
   try {
     console.log(req.body);
     req.body.slug = slugify(req.body.title);
     const newProduct = await new Product(req.body).save();
     res.json(newProduct);
   } catch (err) {
     res.status(400).json({
         err: err.message,
         code: err.code,
     });
   }
};

exports.productsCount = async (req, res) => {
  const total = await Product.find({ status: "Active" }).estimatedDocumentCount().exec(); 
  res.json(total);
};

exports.listAll = async (req, res) => {
  const products = await Product.find({ status: 'Active' })
                                .limit(parseInt(req.params.count))
                                .exec();
  res.json(products);
};

// soft-delete
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndUpdate({ slug: req.params.slug }, { status: 'Inactive' }, { new: true }).exec();
    res.json(deleted);
  } catch (err) {
    return res.status(400).send('Product deleted failed');
  }
};

// strong delete
exports.remove2 = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Product deleted failed');
  }  
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, status: 'Active' }).exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if( req.body.title ) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----->", err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
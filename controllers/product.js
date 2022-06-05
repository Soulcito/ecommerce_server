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
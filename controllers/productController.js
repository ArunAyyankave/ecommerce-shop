const Product = require("../models/productModel");
//const Category = require("../models/categoryModel");
//const Brand = require("../models/brandModel")

const loadProducts = async(req,res)=>{
    try {
        const productData = await Product.find({})
        res.render('products',{products:productData})
    } catch (error) {
        console.log(error.message);
    }
}

const newProductLoad = async(req, res)=>{
    try {
        res.render('new-product')
    } catch (error) {
        console.log(error.message);
    }
}

const addProduct = async(req, res)=>{
    try {

        const product = new Product({
            name:req.body.name,
            category:req.body.category,
            brand:req.body.brand,
            description:req.body.description,
            image:req.file.filename,
            price:req.body.price
        });

        const productData = await product.save();

        if (productData) {
            //res.send('product added seccessfully')
            res.redirect('/admin/products')
        } else {
            res.render('new-user',{message:'Something went wrong...'});
        }
        
    } catch (error) {
        console.log();
    }
}

const editProductLoad = async(req, res)=>{
    try {
        const id = req.query.id;
        const productData = await Product.findById({ _id:id});
        if (productData) {
            res.render('edit-product',{product:productData});
        } else {
            res.redirect('admin/products')
        }
    } catch (error) {
        console.log(message.error);
    }
}

const updateProduct = async(req, res)=>{
    try {

        const productData = await Product.findByIdAndUpdate({ _id:req.body.id},{ $set:{ name:req.body.name, category:req.body.category, brand:req.body.brand, description:req.body.description, image:req.file.filename, price:req.body.price}});

        res.redirect('/admin/products')
        
    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const id = req.query.id;
        await Product.deleteOne({ _id:id });
        res.redirect('/admin/products');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadProducts,
    newProductLoad,
    addProduct,
    editProductLoad,
    updateProduct,
    deleteProduct
}





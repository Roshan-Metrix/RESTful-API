const Product = require("../model/product.js");

const getAllProducts = async (req,res) =>{
  const { name,company,price,featured,sort,select} = req.query;
  const queryObject = {};
 
 if(company){
   queryObject.company=company;
 }
  if(name){
    queryObject.name = {$regex:name,$options : "i"};
  }
  if(price){
    queryObject.price = price;
  }
  if(featured){
    queryObject.featured=featured;
  }
  
  let apiData = Product.find(queryObject);
  
  if(sort){
  sortFix = sort.split(",").join(" ");
  apiData = apiData.sort(sortFix);
  }
  if(select){
    selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
  
  console.log(queryObject);
  
  const myData = await apiData;
  res.status(200).json(myData);
}

const getAllProductsTesting = async (req,res) =>{
  const Products = await Product.find(req.query);
  res.status(200).json({Products,nbHits:Products.length});
}

module.exports = {getAllProducts,getAllProductsTesting};
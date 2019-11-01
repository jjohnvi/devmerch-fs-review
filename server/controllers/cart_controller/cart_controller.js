const addToCart = async (req, res) => {
  const { product } = req.body;
  console.log(product);
  req.session.cart = [product, ...req.session.cart];
  console.log(req.session.cart);

  res.status(200).json(req.session.cart);
};

module.exports = {
  addToCart
};

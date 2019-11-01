const getAllProducts = async (req, res) => {
  const db = req.app.get("db");
  const results = await db.get_all_products().catch(err => console.log(err));
  res.status(200).json(results);
};

module.exports = {
  getAllProducts
};

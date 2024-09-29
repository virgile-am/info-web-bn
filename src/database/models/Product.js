 import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  images: { type: [String], required: true, validate: v => v.length > 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
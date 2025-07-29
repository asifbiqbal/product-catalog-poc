import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProductData({
      name: "",
      category: "",
      price: "",
      description: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateProduct(editingId, productData);
      } else {
        await createProduct(productData);
      }
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setProductData(product);
    setIsEditing(true);
    setEditingId(product._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {products.length === 0 && (
        <Typography>No products found.</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "20px" }}
      >
        Add Product
      </Button>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Category: {product.category}</Typography>
                <Typography>Price: ₹{product.price}</Typography>
                <Typography>Description: {product.description}</Typography>
                <div style={{ marginTop: 10 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductList;

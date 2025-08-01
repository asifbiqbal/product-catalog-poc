import React, { useState, useEffect } from "react";
import { createProduct, getAllProducts,deleteProduct, updateProduct } from "../../api/productApi";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Modal, InputLabel, Select, MenuItem,
  CardActions
} from "@mui/material";
import Header from "../Header/Header"; // Assuming you have a Header component

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    status: "", 
  });
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProduct({ name: "", category: "", price: "", description: "", status: "" }); // Reset form
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editProduct !== null){
      try{
          const productId = products[editProduct]._id;
          await updateProduct (productId,product)
          alert(`Proudct "${product.name}" updated successfully.`)
          setEditProduct(null)
          fetchProducts();
          handleClose();
      } catch {
        alert("Error update product. Check backend. ")
      }
    }
     else{
      try {
        await createProduct(product);
        alert(`Proudct "${product.name}" add successfully.`)
        fetchProducts(); // Reload after save 
        handleClose();
      } catch (err) {
        alert("Error saving product. Check backend.");
      }
    }
  };


  

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
      console.log("Products fetched:", data);
    } catch (err) {
      alert("Error loading products");
    }
  };
  const handleEdit = (index) => {
  const selectedProduct = products[index]
   setProduct(selectedProduct)
   setEditProduct(index)
   setOpen(true)
  }
  const handleDelete = async (id,name) => {
    try {
      await deleteProduct(id);
      alert(`Poduct "${name}" deleted successfully.`);
      fetchProducts(); // Reload after delete 
    }
    catch (err) {
      alert("Error deleting product");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div><Header />
    <Box p={4}
      sx={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
      <Button variant="contained" onClick={handleOpen}>
        Add Product
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            mx: "auto",
            mt: "auto",
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box sx={{ minWidth: 120 }}>
      
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select 
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="status"
          value={product.status}
          onChange={handleChange}
        >
          <MenuItem value ="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
     
           </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button type="submit" variant="contained" color="success"
              disabled={!product.name || !product.category || !product.price || !product.description || !product.status}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Box mt={4} justifyContent="center" display="flex" flexWrap="wrap" gap={2}>
        { products && products.map((prod,index) => (
          <Card key={prod._id} sx={{ width: 180 }}>
            <CardContent>
              <Typography variant="h6">{prod.name}</Typography>
              <Typography variant="body2">Category: {prod.category}</Typography>
              <Typography variant="body2">Price: ₹{prod.price}</Typography>
              <Typography variant="body2">
                Description: {prod.description}
              </Typography>
              <Typography variant="body2">Status: {prod.status}</Typography>
            </CardContent >
            <CardActions>
            <Button  size="small" variant="contained" color="primary" onClick={() =>handleEdit(index)}>Edit</Button>
            <Button  size="small" variant="contained" color="secondary" onClick={() => handleDelete(prod._id,prod.name)}>delete</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
    </div>
  );
};

export default CreateProductForm;

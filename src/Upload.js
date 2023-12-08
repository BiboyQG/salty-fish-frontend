import './Upload.css';
import React, { useState, useCallback, useRef } from 'react';
import { useContext} from "react";
import { UserContext } from "./components/context/user.context";

const Upload = () => {
    const [userId, setUserId] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImages, setProductImages] = useState([]);
    const fileInputRef = useRef(null);

    const { currentUser } = useContext(UserContext);

    const handleImageChange = (e) => {
        processFiles(Array.from(e.target.files));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const processFiles = async (files) => {
        const base64Files = await Promise.all(files.map(file => convertToBase64(file)));
        setProductImages(prevImages => [...prevImages, ...base64Files]); // Append new images to existing ones
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    }, []);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const removeImage = (indexToRemove) => {
        setProductImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            userId,
            productName,
            productPrice,
            productDescription,
            productImages
        };

        // Convert productPrice to a number if it's not already
        productData.productPrice = parseFloat(productPrice) || 0;

        try {

            if (!currentUser) {
                alert('You must be logged in to upload a product');
                return;
            } else { 
                productData.userId = currentUser.uid;
            }

            const response = await fetch(
              "https://salty-fish-api.onrender.com/submit-product",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
              }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error submitting product:', error);
            alert('Failed to submit product');
        }
    };

    return (
        <div className="upload-container">
            <h2>🎁 Sell your unused items...</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                    />
                </div>
                
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Enter price"
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Product Description:</label>
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Enter product description"
                    />
                </div>
                
                <div className="form-group">
                <label htmlFor="itemImages">Upload Images</label>
                <input
                    type="file"
                    id="itemImages"
                    name="itemImages"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />
                <div className="drop-zone" onClick={() => fileInputRef.current.click()}>
                    Drag and drop images here or click to select
                </div>
            </div>



                <div className="image-preview">
                    {productImages.map((image, index) => (
                        <div className="preview-container">
                             <img key={index} src={image} alt="Preview" style={{ width: '100px', height: '100px' }} />
                            <button type="button" onClick={() => removeImage(index)} className="delete-btn">Delete</button>
                        </div>
                    ))}
                </div>

                <button type="submit" className='btn'>Upload Item</button>
            </form>
        </div>
    );
};

export default Upload;




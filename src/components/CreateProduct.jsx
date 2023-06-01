import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import DynamicForm from './DynamicForm/DynamicForm'
import { CreateProductForm } from '../Data/FormData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ImageUploader from './ImageUploader/ImageUploader'
import { FOLDER_NAMES } from '../constants/Constants'
import { createProduct } from '../redux/slices/productSlice'
import { categoriesData } from '../Data/Data'

const CreateProduct = () => {

    const [imageUrls, setimageUrls] = useState(null);
    const { user } = useSelector((state) => state.seller);
    const { productSuccess, error, isLoading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [formSubmitted, setformSubmitted] = useState(false);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (productSuccess) {
            toast.success("Product created successfully!");
        }
    }, [dispatch, error, productSuccess, isLoading]);

    const mappedCreateProductForm = CreateProductForm.map((field) => {
        if (field.name === 'category' && field.type === 'option') {
            const options = categoriesData.map((category) => ({
                value: category.title,
                label: category.title,
            }));

            return { ...field, options };
        }
        return field;
    });

    const hanldeImageUpload = (uploadedImages) => {
        setimageUrls(uploadedImages)
    }

    /**
    * 
    * @method CreateProduct
    * @description Invokes Product create API on click of Create
    * @param {*} values 
    * @param {*} actions 
    */
    const handleSubmit = (values, actions) => {
        if (!imageUrls) {
            toast.warn("Please Upload Product Images first!");
            return;
        }

        let createProductPayload = {

            images: imageUrls,
            name: values.name,
            description: values.description,
            category: values.category,
            tags: values.tags,
            originalPrice: values.originalPrice,
            discountPrice: values.discountPrice,
            stock: values.productInStock,
            shopId: user._id
        }

        dispatch(createProduct(createProductPayload))
        actions.resetForm();
        setformSubmitted(true)
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='m-auto w-full'>
                <h1 className={`${styles.dashboardTitle} text-center pb-3`}>Upload Images</h1>
                <ImageUploader resetUploads={formSubmitted} onImagesUploaded={hanldeImageUpload} folderName={FOLDER_NAMES.Products} />
            </div>
            <div className="m-auto w-full">
                <h1 className={`${styles.dashboardTitle} text-center pb-3`}> Create Product</h1>
                <DynamicForm fields={mappedCreateProductForm} onSubmit={handleSubmit} submitBtnName='Create' />
            </div>

        </div>

    )
}

export default CreateProduct

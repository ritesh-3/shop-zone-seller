import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import DynamicForm from './DynamicForm/DynamicForm'
import { CreateEventForm, CreateProductForm } from '../Data/FormData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ImageUploader from './ImageUploader/ImageUploader'
import { FOLDER_NAMES } from '../constants/Constants'
import { categoriesData } from '../Data/Data'
import { createEvent } from '../redux/slices/eventSlice'

const CreateEvent = () => {
    const [imageUrls, setimageUrls] = useState(null);
    const { user } = useSelector((state) => state.seller);
    const { eventSuccess, error, isLoading } = useSelector((state) => state.events);
    const [formSubmitted, setformSubmitted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) { toast.error(error); }
        if (eventSuccess) { toast.success("Event created successfully!"); }
    }, [dispatch, error, eventSuccess, isLoading]);

    const mappedCreateEventForm = CreateEventForm.map((field) => {
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

        let createEventPayload = {

            images: imageUrls,
            name: values.name,
            description: values.description,
            category: values.category,
            tags: values.tags,
            originalPrice: values.originalPrice,
            discountPrice: values.discountPrice,
            stock: values.productInStock,
            shopId: user._id,
            start_Date: values.startDate,
            Finish_Date: values.endDate
        }

        dispatch(createEvent(createEventPayload))
        actions.resetForm();

    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='m-auto w-full'>
                <h1 className={`${styles.dashboardTitle} text-center pb-3`}>Upload Images</h1>
                <ImageUploader resetUploads={formSubmitted} onImagesUploaded={hanldeImageUpload} folderName={FOLDER_NAMES.Events} />
            </div>
            <div className="m-auto w-full">
                <h1 className={`${styles.dashboardTitle} text-center pb-3`}> Create Event</h1>
                <DynamicForm fields={mappedCreateEventForm} onSubmit={handleSubmit} submitBtnName='Create' />
            </div>

        </div>

    )
}

export default CreateEvent

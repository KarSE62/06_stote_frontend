import React from 'react'
import EditProductFrom from '../components/EditProductFrom'
import {useParams} from "react-router-dom";

function EditProduct() {
    const param = useParams();
    console.log(param.id)
    return (
        <>
        <main>
            <EditProductFrom id={param.id} />
        </main>
        </>
    )
}

export default EditProduct

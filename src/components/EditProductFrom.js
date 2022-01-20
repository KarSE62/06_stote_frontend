import React,{useState, useEffect} from 'react';
import {Container, Row, Button, Form, FormGroup, Label, Input, Alert} from "reactstrap";
import axios from "axios";
import swal from 'sweetalert';

function EditProductFrom({id}) {
    const initProductState = {
        name: "",
        category : "",
        price : "",
        tags : []
    };
    const [product, setProduct] = useState(initProductState);  //กำหนดค่าเริ่มต้นของ state
    const [submitted,setSubmitted] = useState(false);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/products/"+id).then((response)=>{
            setProduct(response.data);
        });
    },[id]);

    const handleInputChange = (event) =>{
        let {name, value} = event.target;
        if(name=="tags"){
            value = value.split(",")
        }
        setProduct({...product, [name]:value});   //... = Specoperater
    };
    const saveProduct = () =>{
        //เตรียมข้อมูล
        const param = {
            name:product.name ,
            category:product.category ,
            price:product.price,
            tags:product.tags,
        }
        //เรียกใช้ API
        axios.put("http://localhost:5000/api/products/"+product._id, param).then((response)=>{
            console.log(response.data);
            setProduct(...product, param);
            setSubmitted(true);
        }).catch((error)=>{
            console.log(error);
        });
    }
    
    const newProduct = () =>{
        setSubmitted(false);
    }
    return (
        <Container>
            <Row>
                <h3>Update Product Information</h3>
                </Row>
                {submitted ? (<>
                    <Alert color='success'>You Have Updated successfuly</Alert>
                    <Button className='btn btn-success' onClick={newProduct}>OK</Button>
                </>):(<> <Form>
                    <FormGroup>
                        <Label for='productName'>ProductName</Label>
                        <Input type='text' name='name' id='productName' value={product.name || ""} onChange={handleInputChange} placeholder='Ente Product Name' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='productCategory'>ProductCategory</Label>
                        <Input type='text' name='category' id='productCategory' value={product.category || ""} onChange={handleInputChange} placeholder='Ente Product Category' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='productPrice'>ProductPrice</Label>
                        <Input type='text' name='price' id='productPrice' value={product.price || ""} onChange={handleInputChange} placeholder='Ente Product Price' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='productTags'>ProductTags</Label>
                        <Input type='text' name='tags' id='productTags' value={product.tags || ""} onChange={handleInputChange} placeholder='Ente Product Tags' />
                    </FormGroup>
                    <Button className="btn btn-success" onClick={saveProduct} >Update Product</Button>
                </Form>
            
                </>)}
               
        </Container>
    )
}

export default EditProductFrom

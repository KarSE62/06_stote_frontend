import React, {useState, useEffect} from 'react';
import {Table,Container, row, Button, Row} from "reactstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import swal from 'sweetalert';




function ProductList() {
    const [products, setProduct] = useState([]);
    const  updateProduct= () =>{
        axios.get("http://localhost:5000/api/products").then((response)=>{   //เอาค่าทำได้จาก URL ไปใส่ใน setProduct
            setProduct(response.data);                                       //set data
            console.log("Update Product list!!!")
        });
    };
    useEffect(()=>{
        updateProduct();
    },[]);

    const deleteProduct = (product) =>{
        swal({
            title: "Do you want to delete product name "+product.name+" ?",
            text: "Once deleted, you will not be able to recover this Product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete("http://localhost:5000/api/products/"+product._id).then(
                    (response)=>{
                        console.log(response.data);
                        swal(" Your Product  has been deleted!", {
                            icon: "success",
                          });
                        updateProduct();
                    })  
            } else {
              swal("Your Product  is safe!");
            }
          });
    }

    return (
      <Container>
          <Row>
              <h3>Product List</h3>
          </Row>
          <Row>
              <Table>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Pricre</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product)=>{
                          return (
                              <tr key={product._id}>
                                  <td>{product.name}</td>
                                  <td>{product.category}</td>
                                  <td>{product.price}</td>
                                  <td>
                                      <Button color='info' href={"/edit/"+product._id} ><FontAwesomeIcon icon={faEdit} />Edit</Button>
                                      {" "}
                                      <Button color="danger" onClick={()=>{
                                          deleteProduct(product)
                                      }}>
                                      <FontAwesomeIcon icon={faTrashAlt} />Delete
                                      </Button>
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </Table>
          </Row>
      </Container>  
    );
}

export default ProductList

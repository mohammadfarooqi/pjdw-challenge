import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardHeader
} from 'reactstrap';

function ProductCard({ product }) {
  return (
    <Card key={product.id}>
      {product.image && <CardImg top width="100%" src={product.image} alt={product.name} />}
      <CardHeader tag="h3">{product.name}</CardHeader>
      <CardBody>
        <CardText>
          <strong>Price:</strong> {product.price ? '$' : null}{product.price}
        </CardText>
        <CardText>
          <strong>Description:</strong> {product.description}
        </CardText>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';


const EditEx = ({ setEd, curData, updateExpense }) => {


  const {handleSubmit,control,formState: { errors },} = useForm({
    defaultValues: {
      id : curData._id,
      category: curData.category,
      description: curData.description,
      amount: curData.amount,
    },
  });

  const onSubmit = (data) => {
    updateExpense(data)
    setEd(false)
  };

  return (
    <div className='blur-background'>

    
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Edit Expense</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Category Input */}
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter category"
                        isInvalid={!!errors.category}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.category?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Description Input */}
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter description"
                        isInvalid={!!errors.description}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Amount Input */}
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      required: 'Amount is required',
                      min: { value: 1, message: 'Amount must be greater than 0' },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="number"
                        placeholder="Enter amount"
                        isInvalid={!!errors.amount}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.amount?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-grid gap-2">
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                  <Button variant="outline-dark" onClick={() => setEd(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default EditEx;
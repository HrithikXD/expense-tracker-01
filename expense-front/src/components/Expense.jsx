import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {FaEdit, FaBroom} from 'react-icons/fa'

const Expense = ({expense}) => {
  return (
    <Card className='my-3 p-3 rounded'>
            
  <Card.Body>
    {/* Flex container for date and description */}
    <div className="d-flex justify-content-between align-items-start">
      {/* Date and Description */}
      <div>
        <Card.Text className="text-muted mb-0">{expense.date}</Card.Text>
        <Card.Title as="div" className="mb-2">
          <strong>{expense.description}</strong>
        </Card.Title>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="d-flex flex-column gap-2">
        <Button variant="primary" size="sm">
          <FaEdit />
        </Button>
        <Button variant="danger" size="sm">
          <FaBroom />
        </Button>
      </div>
    </div>

    {/* Amount */}
    <Card.Text as="h3" className="mt-2">
      Rs {expense.amount}
    </Card.Text>
  </Card.Body>
    </Card>
  )
}

export default Expense
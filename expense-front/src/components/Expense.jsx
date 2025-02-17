import { Button, Card } from 'react-bootstrap'
import {FaEdit, FaBroom} from 'react-icons/fa'
import EditEx from './EditEx'
import { useState } from 'react'

const Expense = ({expense, 
  delEx,
   del, setDel, ed, setEd, updateExpense
}) => {
  

  const [curid, setCurid] = useState(null)

  const onDel = (id) => {
    delEx(id)
    setDel(false)
  }

  return (
    <Card className='my-3 p-3 rounded'>
            
  <Card.Body>
    {/* Flex container for date and description */}
    <div className="d-flex justify-content-between align-items-start">
      {/* Date and Description */}
      <div>
        <Card.Text className="text-muted mb-0">{new Date(expense.createdAt).toLocaleDateString()}</Card.Text>
        <Card.Title as="div" className="mb-2">
          <strong>{expense.description}</strong>
        </Card.Title>
      </div>

      {/* Edit and Delete Buttons */}
      {!del && !ed &&(<div className="d-flex flex-column gap-2">
        <Button variant="primary" size="sm" onClick={() =>{ setEd(true)
          setCurid(expense._id)
        }}>
          <FaEdit />
        </Button>
        <Button variant="danger" size="sm" onClick={() =>{ setDel(true)
          setCurid(expense._id)
        }}>
          <FaBroom />
        </Button>
      </div>)}
      {del && expense._id === curid && (
          <div className="d-flex flex-column gap-2">
          Confirm Delete
          <Button variant="danger" size="sm" onClick={()=>onDel(expense._id)}>Yes</Button>
          <Button variant="primary" size="sm" onClick={()=> setDel(false)}>No</Button>
          </div>
        )}
        {ed && expense._id === curid && (<EditEx curData={expense} setEd={setEd} updateExpense = {updateExpense}/>)}
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
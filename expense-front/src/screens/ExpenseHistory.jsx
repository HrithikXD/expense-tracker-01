import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Expense from '../components/Expense'

const ExpenseHistory= () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      let {data} = await axios.get('/api/expenses');
      data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(data);
    }
    fetchExpenses();
  }, [])

  return (
    <>
    <h6>track your</h6>
    <h4>Expense History</h4>
    <Row>
      {expenses.map(expense => (
        <Col key={expense._id} sm={12} md={6} lg={4} xl={3}>
            <Expense expense={expense} />
        </Col>
      ))}
    </Row>
    </>
  )
}

export default ExpenseHistory
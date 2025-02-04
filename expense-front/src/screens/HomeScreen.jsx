import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Expense from '../components/Expense'

const HomeScreen = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      let {data} = await axios.get('/api/expenses');
      data = data.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
      setExpenses(data);
    }
    fetchExpenses();
  }, [])
  

  return (
    <>
    <h5>Track your</h5>
    <h2>Spendings</h2>
    <p>Current Month</p>
      {expenses.length > 0 ? (
    <Row>
      {expenses.map(expense => (
        <Col key={expense._id} sm={12} md={6} lg={4} xl={3}>
            <Expense expense={expense} />
        </Col>
      ))}
      </Row>) : (
        <h4>No expenses found</h4>
      )
    }
    </>
  )
}

export default HomeScreen
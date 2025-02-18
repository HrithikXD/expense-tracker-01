import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Expense from '../components/Expense'
import AddEx from '../components/AddEx'
import { useGetExpensesQuery, useDeleteExpenseMutation, useAddNewExpenseMutation, useUpdateExpenseMutation} from '../slices/expensesApiSlice'
import { useSelector } from 'react-redux'
import AIInput from '../components/AIInput'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
  // const [expenses, setExpenses] = useState([]);
  const [createExpense, { isLoading: loadingCreate }] = 
  useAddNewExpenseMutation()
  const [updateExpense, {isLoading:loadingUpdate}] = useUpdateExpenseMutation()
  const [deleteExpense, {isLoading:loadingDelete}] = 
  useDeleteExpenseMutation()
  const {userInfo} = useSelector((state) => state.auth)
  
  const {data : expenses, isLoading, error, refetch} = useGetExpensesQuery(undefined, {
    skip : !userInfo
  })

  // const dispatch = useDispatch();   
  const navigate = useNavigate()

  const [month, setMonth] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [totalExpense, setTotalExpense] = useState(0);
  const [del, setDel] = useState(false)
  const [ed, setEd] = useState(false)
  const [ad, setAd] = useState(false) 
  
  useEffect(() => {

    const fetchExpenses = async () => {

      const filteredexpenses = expenses?.filter(expense =>  new Date(expense.createdAt).getMonth() === new Date(month).getMonth() && new Date(expense.createdAt).getFullYear() === new Date(month).getFullYear());

      const total = filteredexpenses?.reduce((acc, item) => acc + item.amount, 0); 
      setTotalExpense(total);

    }
    if(userInfo){
      fetchExpenses();
    }
    else{
      navigate('/expense-login')
    }
  }, [month, del, ed, expenses, userInfo])


  const delEx = async (id)=>{
    console.log(id)
    try {
      await deleteExpense(id)
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }


  const createExpenseHandler = async(data)=>{
    try {
      await createExpense(data);
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const updateExpenseHandler = async(data) =>{
    console.log(data)
    try {
      await updateExpense(data)
      refetch()
    } catch (err) {
      console.log(err.error)
    }
  }


  

  return (
    <>
    {isLoading? (
      <h2>
        Loading...
      </h2>
    ) : error ? (
      <div>
        Login
      </div>
    ) : (
      <>
      <h6>track your</h6>
    <h4>Spendings</h4>
    <AIInput/>
    <Row className="align-items-center justify-content-between p-3 mt-3">
        {/* Month and Total Expense */}
        <Col xs="auto" className="text-center text-md-start">
          <h5>{new Date(month).toLocaleDateString('default' , {month:'long', year:'numeric'})}</h5>
          <p>Total Expense: ₹{totalExpense} </p>
        </Col>

        {/* Month Selector */}
        <Col xs="auto" className="text-center text-md-end">
          <p className="mb-1">Select Month</p>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)
            }
            className="w-auto d-inline-block"
          />
        </Col>
        <Col xs="auto" className="text-center text-md-end">
        {!ad && (
          <Button variant="primary" size="sm" onClick={()=>setAd(true)}>Add</Button>
        )}
        {ad && (
          <AddEx setAd = {setAd} createExpenseHandler={createExpenseHandler}/>
        )}
        </Col>
      </Row>
      {totalExpense > 0 ? (
    <Row>
      {expenses
      ?.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      const selectedDate = new Date(month);
      return (
        expenseDate.getFullYear() === selectedDate.getFullYear() &&
        expenseDate.getMonth() === selectedDate.getMonth()
      );
    })?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    ?.map(expense => (
        <Col key={expense._id} sm={12} md={6} lg={4} xl={3}>
            <Expense expense={expense} 
            delEx = {delEx} 
            del={del} setDel={setDel} ed={ed} setEd={setEd}
            updateExpense = {updateExpenseHandler}
            />
        </Col>
      ))}
      </Row>) : (
        <h4>No expenses found</h4>
      )
    }
      </>
    )  }
    </>
  )
}

export default HomeScreen
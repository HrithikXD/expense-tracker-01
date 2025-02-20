import {React, useState, useEffect} from 'react'
import { Form, Button, FormGroup} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import {toast} from 'react-toastify'


const LoginScreen = () => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isRegister, setIsRegister] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading : loadingLogin}] = useLoginMutation();
    const [register, {isLoading : loadingRegister}] = useRegisterMutation()


    const {userInfo} = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo, redirect, navigate])

    const submithandler = async (e) => {
        e.preventDefault()
        try {
            if(!isRegister){
                const res = await login({email, password}).unwrap();
                dispatch(setCredentials({...res, }))
                toast.dark('Logged In')
            }
            else{
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res, }))
                toast.dark('Registered')
            }
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }



  return (
    <FormContainer>
        <h1>
        {isRegister ? 'Register' : 'Login'}
        </h1>
          <Form onSubmit={submithandler}>
        {isRegister && (
          <FormGroup controlId='name' className='my-3'>
                 <Form.Label>Name</Form.Label>
                 <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                 ></Form.Control>
            </FormGroup>
            )}
            <FormGroup controlId='email' className='my-3'>
                 <Form.Label>Email Address</Form.Label>
                 <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                 ></Form.Control>
            </FormGroup>
            <FormGroup controlId='password' className='my-3'>
                 <Form.Label>Password</Form.Label>
                 <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                 ></Form.Control>
            </FormGroup>
            <Button type='submit' variant='dark' className='my-3' disabled = {loadingLogin || loadingRegister}>
                {!isRegister ? 'Login' : 'Register'}
            </Button>
          </Form>
          <h6 className='mt-3'>
            {isRegister? 'Existing User? Login from here' : 'New User? Register from here' }
          </h6>
          <Button variant='outline-dark' className='my-3' disabled = {loadingLogin || loadingRegister} onClick={()=>setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
          </Button>
    </FormContainer>
  )
}

export default LoginScreen
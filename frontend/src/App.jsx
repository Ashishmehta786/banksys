import { useContext, useEffect, useState } from 'react'
import Login from './components/Login';
import { Outlet } from 'react-router-dom';
import { Logincontext } from './contexts/Logincontext';
import { useNavigate } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const contextlog = useContext(Logincontext)
  useEffect(() => {
    if (contextlog.login) {
      navigate('/dashboard')
    }
    else {
      navigate('/login')
    }
  }, [])

  return (
    <div className='w-screen'>

      <Outlet />
    </div>
  )
}

export default App;

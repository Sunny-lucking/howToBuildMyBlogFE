import './App.less';
import routes from "router/route"
import { renderRoutes } from 'react-router-config'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { userLoginAction ,categoryGetAction} from "store"
import queryString from "query-string"
import { UserLogin, GetUserToken } from "service/user"
import { GetCategoryList } from "service/category"
import { useHistory} from "react-router-dom"

function App(props:any) {
  
  let dispatch = useDispatch()
  let history = useHistory();


  useEffect(() => { 

    // 第一次登陆，获取token
    getUserToken()

    // 获取系统字典
    getCategories()
  }, [])
  
  // 第二次登陆
  useEffect(() => {
    userLogin()
  }, [])


  return (
    <>
      {
        renderRoutes(routes)
      }
    </>
  );
  
  async function userLogin() {
    let token = localStorage.getItem("blogFrontToken")
    if (token) {
      const userResult:any = await UserLogin()
      dispatch(userLoginAction(userResult.data.user))
    }
  }

  // 根据code获取用户token
  async function getUserToken() {
    const { code } = queryString.parse(history.location.search);
    
    if (code) {
      let result: any = await GetUserToken({code:code as string})
      localStorage.setItem('blogFrontToken', result.data.blogFrontToken)
      await userLogin()
      history.push("/juejin/home")
    }
  }

  async function getCategories() {
    let result:any = await GetCategoryList()
    if (result.data.code === 0) {
       dispatch(categoryGetAction(result.data.categoryList))
    }
  }
}

export default App;

import './style.less';
import { renderRoutes } from 'react-router-config'
import Header from "components/Header"
import { useState } from 'react';
import GlobalComp from "components/GlobalComp"
function Juejin(props: any) {
  let [isWithViewNav] = useState(true)
  let [isShowLoginModal,setIsShowLoginModal] =  useState(false)
  return (
    <div className="juejin">
      <GlobalComp isShowLoginModal={isShowLoginModal} setShowLoginModal={setShowLoginModal}/>
      <div className="view-container container">
        <div className="main-header-box">
          <Header setShowLoginModal={setShowLoginModal}></Header>
        </div>

        <main className={["container main-container", isWithViewNav ? "with-view-nav" : null].join(' ')}>
          {
            renderRoutes(props.route.children)
          }
        </main>
      </div>
    </div>
  );

  function setShowLoginModal(vale:boolean){
    setIsShowLoginModal(vale)
  }
}

export default Juejin;

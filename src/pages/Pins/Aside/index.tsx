import "./style.less"
import Profile from "components/Profile"
import RelatedPin from "components/RelatedPin"
import { useSelector } from "react-redux"
import StateStore from "store"
function Aside() {
    let user = useSelector((state: StateStore) => state.userStore.user)
    return (
        <div className="pin__side sidebar">
           <Profile authorInfo={user}/>
           <RelatedPin
               title="精选沸点" 
           />
           
        </div>
    )
}

export default Aside;
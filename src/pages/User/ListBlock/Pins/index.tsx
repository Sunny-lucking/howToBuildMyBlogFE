import "./style.less"
import { useEffect, useState } from "react"
import { throttle } from "constants/utils"
import { GetPin } from "service/pin"
import PinList from "components/PinList"
import { Empty, Skeleton } from "antd"
interface PinProps {
    userId: string,
    match: any,
}
interface PinState {
    pinList: any,
    pageNum: number,
    pageSize: number,
}
function Pins(props: PinProps) {

    const userId = props.match.params.id
    const [pinState, setPinState] = useState<PinState>({
        pinList: [],
        pageNum: 1,
        pageSize: 2,
    })


    let getMoreLatestThrottle = throttle(getLatestArticle);
    // 进入，先第一次获取列表数据
    useEffect(() => {
        getMoreLatestThrottle()
    }, [])
    useEffect(() => {
        function getMoreListListener() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
                getMoreLatestThrottle();
            }
        }
        window.addEventListener('scroll', getMoreListListener)
        return function () {
            window.removeEventListener('scroll', getMoreListListener)
        }
    })
    return (

        <div className="like-list-box">
            <PinList
                pinList={pinState.pinList}
                onReLoadPinList={() => getMoreLatestThrottle}
            />
            {
                pinState.pinList?.length === 0 &&
                // <Empty description="没有数据呢"/>
                <div style={{ padding: '20px' }}>
                    <Empty description="没有数据呢" />
                </div>
            }
        </div>

    )
    async function getLatestArticle() {
        let result: any = await GetPin({ pageNum: pinState.pageNum, pageSize: pinState.pageSize, user_id: userId })
        if (result.data.code === 0 && result.data.pins) {
            setPinState((preState: PinState) => {
                return {
                    ...preState,
                    pageNum: preState.pageNum + 1,
                    pinList: preState.pinList.concat(result.data.pins)
                }
            })
        }

    }
}

export default Pins


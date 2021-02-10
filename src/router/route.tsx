import LoadableComponent from 'LoadableComponent';
import { Redirect } from 'react-router-dom'
export interface RouterConfig {
    path: string;
    label: string;
    exact?: boolean;
    component?: any;
    redirect?: string;
    authority?: number[];
    children?: RouterConfig[];
    render?: any
}
const routes: RouterConfig[] = [
    {
        path: '/editor',
        label: '编辑',
        component: LoadableComponent(() => import('pages/Editor')),
    },
    {
        path: '/upload',
        label: '上传',
        component: LoadableComponent(() => import('pages/Upload')),
    },
    {
        path: '/',
        label: '主页',
        exact: true,
        render: (props: any) => {
            return <Redirect to="/juejin/home" />
        },
    },
    {
        path: '/juejin',
        label: '主页',
        component: LoadableComponent(() => import('pages/Juejin')),

        children: [
            {
                path: '/juejin',
                label: '主页',
                exact: true,
                render: (props: any) => {
                    return <Redirect to="/juejin/home" />
                },
            },
            {
                path: '/juejin/pins/:type',
                label: '沸点',
                component: LoadableComponent(() => import('pages/Pins')),
            },
            {
                path: '/juejin/home',
                label: '首页',
                component: LoadableComponent(() => import('pages/Home')),
            },
            {
                path: '/juejin/event',
                label: '活动',
                component: LoadableComponent(() => import('pages/Event')),
            },
            {
                path: '/juejin/search',
                label: '首页',
                component: LoadableComponent(() => import('pages/Search')),
            },
            {
                path: '/juejin/post',
                label: '首页',
                component: LoadableComponent(() => import('pages/Detail')),
            },
            {
                path: '/juejin/books',
                label: '首页',
                component: LoadableComponent(() => import('pages/Book')),
            },
            {
                path: '/juejin/user_setting',
                label: '首页',
                component: LoadableComponent(() => import('pages/UserSetting')),
            },
            {
                path: '/juejin/user/:id',
                label: '首页',
                component: LoadableComponent(() => import('pages/User')),
                children: [
                    {
                        path: '/juejin/user/:id/posts',
                        label: '首页',
                        component: LoadableComponent(() => import('pages/User/ListBlock/Posts')),
                    },
                    {
                        path: '/juejin/user/:id/pins',
                        label: '首页',
                        component: LoadableComponent(() => import('pages/User/ListBlock/Pins')),
                    },
                    {
                        path: '/juejin/user/:id/fans',
                        label: "关注者",
                        component: LoadableComponent(() => import('pages/User/ListBlock/Fans')),
                    },
                    {
                        path: '/juejin/user/:id/followers',
                        label: "关注者",
                        component: LoadableComponent(() => import('pages/User/ListBlock/Followers')),
                    }
                ]
            },

        ]
    },
    {
        path: '/*',
        label: 'exception404',
        component: LoadableComponent(()=> import('pages/Exception'))
    },


]
export default routes
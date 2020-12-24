import {getRequest} from "@/utils/api";


export const initMenu=(router, store)=>{
    if (store.state.routes.length > 0) {
        return ;
    }
    getRequest("/system/config/menu").then(data => {
        if (data) {
            let fmRoutes = formatRoutes(data);
            router.addRoutes(fmRoutes);
            store.commit('initRoutes', fmRoutes);
            store.dispatch('connect');
        }
    })
}

//后台数据格式化
export const formatRoutes = (data) => {
    let fmRoutes = [];
    data.forEach(router => {
        //批量定义，给 router 定义多个变量值
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;

        if (children && children instanceof Array) {
            children=formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve){
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")){
                    require(['../views/emp/' + component+'.vue'], resolve);
                } else if (component.startsWith("Per")){
                    require(['../views/per/' + component+'.vue'], resolve);
                } else if (component.startsWith("Sal")){
                    require(['../views/sal/' + component+'.vue'], resolve);
                } else if (component.startsWith("Sta")){
                    require(['../views/sta/' + component+'.vue'], resolve);
                } else if (component.startsWith("Sys")){
                    require(['../views/sys/' + component+'.vue'], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}

/**
 * TODO 添加http请求的method
 * 这里写成一个json表比较合适，参考nodejs的层级路由
 */

export class APIClass {
    id: string;
    name: string;
    url: string;
    method?: string;
}

export const BACKEND = {
    // host: '172.21.213.146',
    host: 'localhost',
    port: '9999'
}

export const APIS2 = {
    auth: {
        login: {
            
        }
    },
    data: {

    },
    'model-tools': {

    },
    'data-tools': {

    },
    visualization: {

    },
    comparison: {
        solutions: {

        },
        tasks: {

        },
        scenes: {

        }
    }
}

export const APIS = [{
    "uid": "login",
    "name": "",
    "url": "/auth/login"
},{
    "uid": "logout",
    "name": "",
    "url": "/auth/logout"
},{
    "uid": "register",
    "name": "",
    "url": "/auth/register"
},{
    "uid": "find-psw",
    "name": "",
    "url": "/auth/find-psw"
},


{
    "uid": "getModelTabTree",
    "name": "",
    "url": "/model-tools"
},
{
    "uid": "insertModelTool",
    "name": "",
    "url": "/model-tools"
},
{
    "uid": "getModelTool",
    "name": "",
    "url": "/model-tools/:id"
},



{
    "uid": "getDataTabTree",
    "name": "",
    "url": "/data"
},
{
    "uid": "postData",
    "name": "",
    "url": "/data/upload"
},
{
    "uid": "downloadData",
    "name": "",
    "url": "/data/:id/download"
},
{
    "uid": "parseUDXProp",
    "name": "",
    "url": "/data/:id/property"
},
{
    "uid": "showUDX",
    "name": "",
    "url": "/data/:id/show"
},
{
    "uid": "compareUDX",
    "name": "",
    "url": "/data/compare/:left/2/:right"
}
];
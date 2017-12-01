export class APIClass {
    id: string;
    name: string;
    url: string;
    method?: string;
}

export const BACKEND = {
    host: '172.21.213.146',
    // host: 'localhost',
    port: '9999'
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
    "uid": "getModelTools",
    "name": "",
    "url": "/model-tools"
},
{
    "uid": "getModelTool",
    "name": "",
    "url": "/model-tools/:id"
},
{
    "uid": "getModelInput",
    "name": "",
    "url": "/model-tools/:id/input"
},
{
    "uid": "invokeModelTool",
    "name": "",
    "url": "/model-tools/:id/invoke"
},
{
    "uid": "getInvokeRecord",
    "name": "",
    "url": "/model-tools/records/:id"
},


{
    "uid": "getDataTools",
    "name": "",
    "url": "/data-tools"
},
{
    "uid": "getDataTool",
    "name": "",
    "url": "/data-tools/:id"
},
{
    "uid": "getDataInput",
    "name": "",
    "url": "/data-tools/:id/input"
},
{
    "uid": "invokeDataTool",
    "name": "",
    "url": "/data-tools/:id/invoke"
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
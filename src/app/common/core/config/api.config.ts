export class APIClass {
    id: string;
    name: string;
    url: string;
    method?: string;
}

export const APIS = [{
    "uid": "login",
    "name": "",
    "url": "http://127.0.0.1:9999/auth/login"
},{
    "uid": "logout",
    "name": "",
    "url": "http://127.0.0.1:9999/auth/logout"
},{
    "uid": "register",
    "name": "",
    "url": "http://127.0.0.1:9999/auth/register"
},{
    "uid": "find-psw",
    "name": "",
    "url": "http://127.0.0.1:9999/auth/find-psw"
},

{
    "uid": "getModelTools",
    "name": "",
    "url": "http://127.0.0.1:9999/model-tools"
},
{
    "uid": "getModelTool",
    "name": "",
    "url": "http://127.0.0.1:9999/model-tools/:id"
},
{
    "uid": "getModelInput",
    "name": "",
    "url": "http://127.0.0.1:9999/model-tools/:id/input"
},
{
    "uid": "invokeModelTool",
    "name": "",
    "url": "http://127.0.0.1:9999/model-tools/:id/invoke"
},
{
    "uid": "getInvokeRecord",
    "name": "",
    "url": "http://127.0.0.1:9999/model-tools/records/:id"
},


{
    "uid": "getDataTools",
    "name": "",
    "url": "http://127.0.0.1:9999/data-tools"
},
{
    "uid": "getDataTool",
    "name": "",
    "url": "http://127.0.0.1:9999/data-tools/:id"
},
{
    "uid": "getDataInput",
    "name": "",
    "url": "http://127.0.0.1:9999/data-tools/:id/input"
},
{
    "uid": "invokeDataTool",
    "name": "",
    "url": "http://127.0.0.1:9999/data-tools/:id/invoke"
},


{
    "uid": "postData",
    "name": "",
    "url": "http://127.0.0.1:9999/data/upload"
},
{
    "uid": "downloadData",
    "name": "",
    "url": "http://127.0.0.1:9999/data/:id/download"
},
{
    "uid": "parseUDX",
    "name": "",
    "url": "http://127.0.0.1:9999/data/:id/parse"
}];
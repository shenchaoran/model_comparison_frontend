// TODO 所有的视图容器依赖的服务可以抽象出一层基类，以一个map来保存ui操作的状态。

export abstract class ServiceBase {
     _obj: any;
     _selectedId: string;
}
import { IncomingMessage, ServerResponse } from 'http'

export type RouteHandler = (request: IncomingMessage, response: ServerResponse)=>void

export class RequestRouter{
    routes: Map<string, RouteHandler>
    
    constructor(_routes?: readonly [string, RouteHandler][] | undefined){
        this.routes = new Map<string, RouteHandler>(_routes)
    }

    public add(name: string, route: RouteHandler): RequestRouter{
        this.routes.set(name, route)
        return this;
    }

    public handleRequest(request: IncomingMessage, response: ServerResponse, startIndex: number = 0): void {
        if(request.url===undefined)
            throw('request url is undefined')

        let handleMethod: RouteHandler|undefined = this.routes.get(request.url)
        if(handleMethod===undefined){
            // req /files/file.txt -> route /files/*
            if(!request.url.endsWith('/')){
                let sepIndex: number=request.url.lastIndexOf('/')
                while(sepIndex>-1 || handleMethod!==undefined){
                    // searching for parent dir route
                    handleMethod=this.routes.get(request.url.slice(0, sepIndex+1) + '*')
                    sepIndex=request.url.lastIndexOf('/', sepIndex-1)
                }
            }

            if(handleMethod===undefined)
                throw(`can't find route for request "${request.url}"`)
        }

        handleMethod(request,response)
    }
}

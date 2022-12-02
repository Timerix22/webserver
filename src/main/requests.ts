import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import { RequestRouter } from './router'

const github_stats_api =require('../github-stats/api/index')

// const router = new RequestRouter()
//     .add('/', (req,res)=>send_html('/html/index.html',res))
//     .add('/html/*', send_html)
//     .add('/css/*', send_css)
//     .add('/*', send_file)
const router = new RequestRouter([
    ['/', (req,res)=>send_html('/html/index.html',res)],
    ['/html/*', send_html],
    ['/css/*', send_css],
    ['/*', send_file],
    ['/api/github-stats', (req,res)=>{ github_stats_api(req,res).then((r:any)=>console.log(r))}]
])

export async function handleRequest(request: http.IncomingMessage, response: http.ServerResponse){
    try {
        console.log(request.method + ' request for ' + request.url)
        if (request.method == 'GET')
            router.handleRequest(request, response)
        else send_404(response)
    }
    catch (ex : any){
        console.log(ex)
    }
}

export function send_404(response : http.ServerResponse){
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html')
    const filePath = path.resolve('./public/html/404.html')
    fs.createReadStream(filePath).pipe(response)
}

function requestToFilePath(request: string|http.IncomingMessage) : string{
    let filePath:string
    if(request instanceof http.IncomingMessage){
        if(request.url===undefined)
            throw('request with undefined url')
        filePath=request.url
    }
    else filePath=request
    filePath=path.resolve('./public'+filePath)
    return filePath
}

function send_file(request: string|http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
    let filePath:string=requestToFilePath(request)
    if (fs.existsSync(filePath)) {
        response.statusCode = 200
        response.setHeader('Content-Type', 'binary/octet-stream')
        response.setHeader('Content-Disposition', 'attachment filename=' + path.basename(filePath))
        fs.createReadStream(filePath).pipe(response)
    }
    else send_404(response)
}

function send_css(request: string|http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
    let filePath:string=requestToFilePath(request)
    if (fs.existsSync(filePath)) {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css')
        fs.createReadStream(filePath).pipe(response)
    }
    else send_404(response)
}

function send_html(request: string|http.IncomingMessage, response: http.ServerResponse) {
    let filePath:string=requestToFilePath(request)
    if (fs.existsSync(filePath)) {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        fs.createReadStream(filePath).pipe(response)
    }
    else send_404(response)
}

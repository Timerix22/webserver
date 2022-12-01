import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'

export function handleRequest(request: http.IncomingMessage, response: http.ServerResponse){
    console.log(request.method + ' request for ' + request.url)
    if (request.method == 'GET') handleGet(request, response)
    else send_404(response)
}

function handleGet(request: http.IncomingMessage, response: http.ServerResponse){
    let filePath
    if (request.url == '/') filePath = '/index.html'
    else filePath = request.url
    filePath = path.resolve('./public' + filePath)
    const fileExt = path.extname(filePath)

    if (fileExt == '.html') send_html(filePath, response)
    else if (fileExt == '.css') send_css(filePath, response)
    else send_file(filePath, response)
}

function send_file(filePath: string, response: http.ServerResponse<http.IncomingMessage>) {
    {
        if (fs.existsSync(filePath)) {
            response.statusCode = 200
            response.setHeader('Content-Type', 'binary/octet-stream')
            response.setHeader('Content-Disposition', 'attachment filename=' + path.basename(filePath))
            fs.createReadStream(filePath).pipe(response)
        }
        else
            send_404(response)
    }
}

function send_css(filePath: string, response: http.ServerResponse<http.IncomingMessage>) {
    {
        if (fs.existsSync(filePath)) {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/css')
            fs.createReadStream(filePath).pipe(response)
        }
        else send_404(response)
    }
}

export function send_404(response : http.ServerResponse){
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html')
    const filePath = path.resolve('./public/404.html')
    fs.createReadStream(filePath).pipe(response)
}

function send_html(filePath: string, response: http.ServerResponse) {
    {
        if (fs.existsSync(filePath)) {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            fs.createReadStream(filePath).pipe(response)
        }
        else send_404(response)
    }
}


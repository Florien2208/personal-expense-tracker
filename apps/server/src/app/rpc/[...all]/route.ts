import { createContext } from '@/lib/context'
import { appRouter } from '@/routers'
import { RPCHandler } from '@orpc/server/fetch'
import { NextRequest } from 'next/server'

const handler = new RPCHandler(appRouter)

async function handleRequest(req: NextRequest) {
  const { response } = await handler.handle(req, {
    prefix: '/rpc',
    context: await createContext(req),
  })

  return response ?? new Response('Not found', { status: 404 })
}
async function handleOptions(req: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env.CORS_ORIGIN || "http://localhost:3001",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
export const OPTIONS = handleOptions; 

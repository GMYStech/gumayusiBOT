import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
;(async () => {
 const data =  await prisma.post.create({ data: { title: 'test', content: 'ttt' } })
 
})()


export default prisma
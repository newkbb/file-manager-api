// eslint-disable-next-line
require("dotenv").config()
import express from "express"
import { graphqlHTTP } from "express-graphql"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const typeDefs = `
  type File {
    id:String!
    name:String!
    directoryID:String!
    createdAt:String!
    updatedAt:String!
    versions:[FileVersion]
  }

  type FileVersion {
    id:String!
    name:String!  
    mimeType:String!
    size:Int!
    fileID:String!      
    createdAt:String!
    updatedAt:String!  
  }

  type Directory{
    id:String!
    name:String!
    parentID:String?
    createdAt:String!
    updatedAt:String!   
    files[File]
    directories Directory[]     
  }

  type Query {
    getAllFiles: [File]!
    getAllFileVersions: [FileVersion]!
    getAllDirectories: [Directory]!
  }
`

const resolvers = {
  Query: {
    getAllFiles: () => {
      return prisma.file.findMany()
    },
    getAllFileVersions: () => {
      return prisma.fileVersion.findMany()
    },
    getAllDirectories: () => {
      return prisma.directory.findMany()
    }
  }
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})

const app = express()
const port = 3000
// app.get("/", (_, res) => res.send("Hello World"))
console.log("aaaaaaaaaaa"),
  app.use("/graphql",
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
console.log("xxxxxxxxxxxxxxxxxxxx"),
  app.listen(port, () => {
    console.log(`Application running on port ${port}.`)
  })

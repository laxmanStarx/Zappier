import {Router} from 'express'
import { authMiddleware } from '../middleware'
// import {  Request, Response } from "express";

import { SigninData, SignupData } from '../types'
import { prismaClient } from '../db'
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from '../config'

const router =  Router()

router.post("/signup", async(req:any, res:any) => {
    const body = req.body;
    const parsedData = SignupData.safeParse(body);

  if (!parsedData.success){
    return res.status(411).json({
        message : "Incorrect credential",
        errors: parsedData.error.errors
    });
  }

  // const user = await prismaClient.user.findFirst({
  //   where: {
  //       email: parsedData.data.username,
  //       password: parsedData.data.password
  //   }
  // });
  //     if (!user) {
  //       return res.status(403).json({
  //         message: "Sorry credential are incorrect"
  //       })
  //     }

  //     const token = jwt.sign({
  //       id: user.id
  //     }, JWT_PASSWORD);

  //     res.json({
  //       token: token,
  //     })

  const userExists = await  prismaClient.user.findFirst({
    where: {
        email: parsedData.data.username
    }
  })
  if (userExists){
    return res.status(403).json({
        message: "User already exist"
    })
  }

  await prismaClient.user.create({
    data: {
        email: parsedData.data.username,
        //TODO: Don't store text in plain text
        password: parsedData.data.password,
        name: parsedData.data.name
    }
  })
  return res.json({
    message: "Please verify your account by checking your email"
  })
 


 


})

router.post("/signin", async(req:any,res:any)=>{
  const body = req.body;
  const parsedData = SigninData.safeParse(body);

if (!parsedData.success){
  return res.status(411).json({
      message : "Incorrect credential",
      errors: parsedData.error.errors
  });
}
const user = await prismaClient.user.findFirst({
  where: {
      email: parsedData.data.username,
      password: parsedData.data.password
  }
});
          if(!user){
            return res.status(403).json({
              message: "sorry credential are incorrect"
            })
          }
          //sign the jwt

          const token = jwt.sign({
            id: user.id
          }, JWT_PASSWORD)

          res.json({
            token: token
          })

})
//check here

router.get("/", authMiddleware , async (req:any ,res:any)=>{
  //TODO: Fix the type
  // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
      where: {
        id
      },
      select: {
        name: true,
        email: true
      }

    })

    return res.json({
      user
    })


    //The issue you're encountering arises from the incorrect type assignment for req in the /user route. In Express, the request object req is not of type string but should be of type Request. Here's how to fix the error:

// Correct the types for req and res in the /user route handler.
// Ensure the middleware (authMiddleware) is adding the correct user data (like id) to the req object.
// Here’s an updated version of your code:



})

export const useRouter = router;




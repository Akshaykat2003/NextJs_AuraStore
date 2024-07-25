import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json()
  await dbConnect()
  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  })
  try {
    await newUser.save()
    return NextResponse.json(
      { message: 'User has been created' },
      {
        status: 201,
      }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}

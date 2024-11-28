import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import db from '@/libs/db'
export async function POST(request) {
    try {
        const data = await request.json();

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })

        const { password: _, ...user } = newUser


        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        },
            {
                status: 500,
            }

        );
    }
}
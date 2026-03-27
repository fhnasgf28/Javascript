import { NextResponse } from "next/server";

// Data pura-pura (Dummy Data)
const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
];

// GET: Untuk mengambil data
export async function GET() {
    return NextResponse.json({
        status: "success",
        data: users,
    });
}

// POST: Untuk mengirim/menambah data
export async function POST(request: Request) {
    // FIX: Gunakan await request.json() untuk membaca body JSON
    // Jangan akses request.body langsung karena itu stream
    const body = await request.json();

    console.log("Menerima data baru....:", body);

    return NextResponse.json({
        status: "success",
        message: "Data berhasil ditambahkan",
        receivedData: body,
    });
}

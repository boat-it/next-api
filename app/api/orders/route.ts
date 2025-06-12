import { db } from "@/db";
import { orderHeader } from "@/db/schema/orderHeader";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const limit = parseInt(searchParams.get('limit') || '100', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const orders = await db
            .select()
            .from(orderHeader)
            .limit(limit)
            .offset(offset);

        return Response.json(orders);
    } catch (error: any) {
        console.error('Error fetching order headers:', error);
        return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
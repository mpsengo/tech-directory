import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export const revalidate = 0;

export default async function AdminPage() {
    // Check auth server-side
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    // Fetch all data
    const { data: companies } = await supabase.from("companies").select("*").order("created_at", { ascending: false });
    const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });

    return <AdminDashboard initialCompanies={companies || []} initialProducts={products || []} />;
}

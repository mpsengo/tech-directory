import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "Contact Us | xTekMart",
    description: "Get in touch with the xTekMart team.",
};

export default function ContactPage() {
    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
            <div className="fade-in">
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
                    Contact <span className="gradient-text">Us</span>
                </h1>
                <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
                    Have a question or feedback? We'd love to hear from you.
                </p>

                <ContactForm />
            </div>
        </div>
    );
}

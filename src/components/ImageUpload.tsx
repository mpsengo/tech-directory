"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setError(null);
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("images")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from("images").getPublicUrl(filePath);

            if (data) {
                onChange(data.publicUrl);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <label className="label">{label}</label>

            {value ? (
                <div style={{ position: "relative", width: "100%", maxWidth: 300, marginBottom: 8 }}>
                    <img
                        src={value}
                        alt="Preview"
                        style={{ width: "100%", borderRadius: 8, border: "1px solid #374151" }}
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            background: "rgba(0,0,0,0.7)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        ×
                    </button>
                </div>
            ) : null}

            <div style={{ position: "relative" }}>
                <input
                    type="file"
                    id={label}
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer"
                    }}
                />
                <div
                    className="input-field"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9ca3af",
                        gap: 8,
                        cursor: "pointer",
                        background: uploading ? "rgba(55, 65, 81, 0.5)" : "rgba(31, 41, 55, 0.5)"
                    }}
                >
                    {uploading ? (
                        <span>Uploading...</span>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span>Click to Upload Image</span>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <p style={{ color: "#ef4444", fontSize: 13, marginTop: 4 }}>
                    Error: {error} (Make sure 'images' bucket exists and is public)
                </p>
            )}
        </div>
    );
}

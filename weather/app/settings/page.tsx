"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem("gemini_api_key", apiKey);
      toast.success("APIキーが正常に保存されました");
    } catch (error) {
      toast.error("APIキーの保存に失敗しました");
      console.error("Error saving API key:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">設定</h1>
      
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <label htmlFor="api-key" className="text-sm font-medium">
            Google AI Studio API キー
          </label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API キーを入力してください"
          />
        </div>
        
        <Button onClick={handleSave}>保存</Button>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}

import { InputHTMLAttributes } from "react";

export type SelectOptions = {
    value: string;
    label: string;
  };
  
  export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    variant?: "textarea" | "input" | "select" | "file" | "date";
    error?: string;
    label?: string;
    placeholder?: string;
    name: string;
    options?: SelectOptions[];
    fileUrl?: string | File;
    accept?: string;
    uploading?: boolean;
  }
  
  
  
  
"use client";
import Checkbox from "@/components/temp/form/input/Checkbox";
import Input from "@/components/temp/form/input/InputField";
import Label from "@/components/temp/form/Label";
import Button from "@/components/temp/ui/button/Button";
import { loginUser } from "@/utils/api";
import { ArrowLeft, ChevronLeft, Eye, EyeClosed } from "lucide-react";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useUser } from '@/context/userContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [typeCode, setTypeCode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email);
        setTypeCode(true);
        setIsLoading(true);
    };
    const handleOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(otp);
    }
    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
                <Link
                    href="/admin"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    {/* <ChevronLeftIcon /> */}
                    <ChevronLeft />
                    Trở lại
                </Link>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-2">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Quên mật khẩu
                        </h1>
                        <span className="text-gray-500">Gửi email đăng nhập </span>
                    </div>
                    <div>
                        <div className="relative py-3 sm:py-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                            </div>
                        </div>
                        {!typeCode ? (
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <Label>
                                            Email <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input required onChange={e => setEmail(e.target.value)} value={email} placeholder="info@gmail.com" type="email" />
                                    </div>
                                    <div>
                                        <Button className="w-full" size="sm">
                                            Xác nhận
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleOtp}>
                                <div className="flex flex-col justify-center items-center space-y-4 py-10">
                                    <span>Nhập mã OTP đã gửi tới email</span>
                                    <InputOTP
                                        maxLength={6}
                                        value={otp}
                                        onChange={(value) => setOtp(value)}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <div>
                                        <Button className="w-full" size="sm">
                                            Xác nhận
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        )

                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

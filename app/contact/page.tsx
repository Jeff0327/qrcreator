"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from "lucide-react";

// 폼 유효성 검사 스키마 - 제목, 내용, 연락처
const formSchema = z.object({
    subject: z.string().min(2, { message: '제목은 2글자 이상이어야 합니다.' }),
    message: z.string().min(10, { message: '내용은 10글자 이상이어야 합니다.' }),
    contact: z.string().min(1, { message: '연락처 또는 이메일은 필수 입력 사항입니다.' })
});

// 폼 데이터 타입
type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: '',
            message: '',
            contact: ''
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "문의가 접수되었습니다",
                    description: "빠른 시일 내에 답변 드리겠습니다.",
                });
                form.reset();
            } else {
                throw new Error(result.message || '문의 전송에 실패했습니다.');
            }
        } catch (error) {
            toast({
                title: "오류가 발생했습니다",
                description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-grow container mx-auto p-4 md:p-6">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">문의하기</CardTitle>
                    <CardDescription>
                        궁금한 점이나 의견이 있으시면 아래 양식을 작성해 주세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>제목</FormLabel>
                                        <FormControl>
                                            <Input placeholder="문의 제목을 입력해주세요" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>연락처</FormLabel>
                                        <FormControl>
                                            <Input placeholder="답변 받으실 이메일이나 연락처를 남겨주세요" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>내용</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="문의 내용을 자세히 작성해주세요."
                                                className="min-h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full bg-yellow-300 hover:bg-yellow-400" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 전송 중...
                                    </>
                                ) : (
                                    '전송하기'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}
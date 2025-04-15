// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

// 입력 데이터 검증을 위한 스키마 (제목, 내용, 연락처)
const ContactFormSchema = z.object({
    subject: z.string().min(2, { message: '제목은 2글자 이상이어야 합니다.' }),
    message: z.string().min(10, { message: '내용은 10글자 이상이어야 합니다.' }),
    contact: z.string().min(1, { message: '연락처 또는 이메일은 필수 입력 사항입니다.' })
});

// Resend API 키 초기화
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('받은 데이터:', body);

        // 입력 데이터 검증
        const result = ContactFormSchema.safeParse(body);

        if (!result.success) {
            console.log('유효성 검사 실패:', result.error.format());
            return NextResponse.json(
                { message: '입력 데이터가 유효하지 않습니다.', errors: result.error.format() },
                { status: 400 }
            );
        }

        const { subject, message, contact } = result.data;

        const recipientEmail = process.env.RECIPIENT_EMAIL;
        console.log('수신자 이메일:', recipientEmail);

        if (!recipientEmail) {
            return NextResponse.json(
                { message: '수신자 이메일이 설정되지 않았습니다.' },
                { status: 500 }
            );
        }

        // 이메일 발송 - 도메인 변경
        await resend.emails.send({
            from: 'QR Creator <info@qrmake.kr>', // 변경된 도메인
            to: recipientEmail,
            replyTo: contact.includes('@') ? contact : undefined, // 이메일 형식이면 reply_to 설정
            subject: `[QR Creator 문의] ${subject}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">QR Creator 문의</h1>
          <p><strong>제목:</strong> ${subject}</p>
          <p><strong>연락처:</strong> ${contact}</p>
          <h2 style="color: #555; font-size: 18px;">내용:</h2>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            이 이메일은 QR Creator 문의 양식을 통해 자동으로 발송되었습니다.
          </p>
        </div>
      `,
        });

        return NextResponse.json({ message: '문의가 성공적으로 전송되었습니다.' });
    } catch (error) {
        console.error('문의 전송 에러:', error);

        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

        return NextResponse.json(
            { message: '문의 전송 중 오류가 발생했습니다.', error: errorMessage },
            { status: 500 }
        );
    }
}
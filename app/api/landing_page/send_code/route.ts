    import { db } from "@/src/db/drizzle";
    import { EmailVerification } from "@/src/db/schema";
import { and, desc, eq } from "drizzle-orm";
    import { NextResponse } from "next/server";
    import nodemailer from "nodemailer";

    export async function POST(req: Request) {
        try {
            const { email } = await req.json();

            if (!email) {
                return NextResponse.json({ success: false, message: "Missing email" }, { status: 400 });
            }

            // Generate 6-digit PIN
            const pin = Math.floor(100000 + Math.random() * 900000).toString();

            // Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const latest = await db
            .select({
                emailVerification_id: EmailVerification.emailVerification_id,
                isActive: EmailVerification.isActive,
            }).from(EmailVerification)
            .where(and(
                eq(EmailVerification.email, email),
                eq(EmailVerification.isActive, true),
            ))
            .orderBy(desc(EmailVerification.emailVerification_id))
            .limit(1);

            // if (latest && latest[0].isActive) {
            //     await db
            //         .update(EmailVerification)
            //         .set({ isActive: false })
            //         .where(eq(EmailVerification.emailVerification_id,latest[0].emailVerification_id));
            // }
            if (latest.length > 0 && latest[0].isActive) {
                await db
                    .update(EmailVerification)
                    .set({ isActive: false })
                    .where(eq(EmailVerification.emailVerification_id, latest[0].emailVerification_id));
            }

            // Styled HTML Email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your Verification Code",
                html: `
                    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding: 30px;">
                        <div style="max-width: 500px; margin: auto; background: white; border-radius: 10px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                            <div style="text-align:center; margin-bottom: 20px;">
-                                <h2 style="color:#1a4d2e; margin:0; font-size:22px;">Verification Code</h2>
                            </div>

                            <p style="font-size:15px; color:#333;">
                                Hello,  
                                <br><br>
                                Your verification code is:
                            </p>

                            <div style="text-align:center; margin: 20px 0;">
                                <span style="display:inline-block; padding: 12px 25px; font-size:28px; font-weight:bold; background:#1a4d2e; color:white; border-radius:8px; letter-spacing:3px;">
                                    ${pin}
                                </span>
                            </div>

                            <p style="font-size:14px; color:#555;">
                                This code is valid for <strong>10 minutes</strong>.  
                                If you did not request this, please ignore this email.
                            </p>

                            <hr style="margin:25px 0; border:0; border-top:1px solid #e0e0e0;">

                            <p style="font-size:12px; color:#777; text-align:center;">
                                This is an automated message. Please do not reply.<br/>
                                Rizal Institute - Canlubang © 2025
                            </p>
                        </div>
                    </div>
                `,
                // attachments: [
                //     {
                //         filename: "logo.png",
                //         path: process.cwd() + "/public/logo.png",
                //         cid: "schoollogo", // same CID as used in HTML
                //     },
                // ],
            };

            await transporter.sendMail(mailOptions);

            await db.insert(EmailVerification).values({
                email,
                code: Number(pin),
                dateSent: new Date(),   // includes YYYY-MM-DD HH:mm:ss
                isActive: true,
            });


            return NextResponse.json({
                success: true,
                message: "PIN sent successfully.",
                pin,
            });
        } catch (error) {
            console.error("Error sending email:", error);
            return NextResponse.json(
                { success: false, message: "Failed to send PIN." },
                { status: 500 }
            );
        }
    }

"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, School } from "lucide-react";

export const StudentDashboard = () => {
    return (
        <div className="p-6 space-y-6 ">
            <motion.h1
                className="text-3xl font-bold text-dGreen flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <School className="w-6 h-6" />
                Welcome, Juan Dela Cruz!
            </motion.h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <Card className="bg-green-50 shadow-md border-dGreen/20 border">
                    <CardContent className="p-5 text-lg space-y-3">
                        <div>
                            <span className="font-semibold text-dGreen">Student ID:</span> 109848125652
                        </div>
                        <div>
                            <span className="font-semibold text-dGreen">Status:</span>{" "}
                            <BadgeCheck className="inline w-5 h-5 text-green-600 mr-1" />
                            Enrolled
                        </div>
                        <div>
                            <span className="font-semibold text-dGreen">Year Level:</span> Grade 9
                        </div>
                        <div>
                            <span className="font-semibold text-dGreen">School Year:</span> 2024–2025
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

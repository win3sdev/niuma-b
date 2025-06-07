import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authConfig";
import { SurveyStatus } from "@/app/types/survey";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reviewStatus = searchParams.get("status") as SurveyStatus;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const where = reviewStatus ? { reviewStatus } : {};

    const [data, total] = await Promise.all([
      prisma.surveyEntry.findMany({
        where,
        orderBy: { updatedAt: "desc" },

        select: {
          id: true,
          gender: true,
          ageRange: true,
          occupation: true,
          companyName: true,
          companySize: true,
          companyType: true,
          province: true,
          city: true,
          district: true,
          dailyWorkHours: true,
          weeklyWorkDays: true,
          overtimePay: true,
          negativeConsequence: true,
          longWorkIssues: true,
          longWorkIssuesOtherText: true,
          discriminationReasons: true,
          discriminationReasonsOther: true,
          violationsObserved: true,
          violationsObservedOther: true,
          expectedChanges: true,
          expectedChangesOther: true,
          story: true,
          safetyWord: true,
          reviewStatus: true,
          reviewer: true,
          reviewComment: true,
          updatedAt: true,
        },
      }),
      prisma.surveyEntry.count({ where }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

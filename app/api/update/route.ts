import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authConfig";
import { prisma } from "@/lib/prisma";

function normalizeArray(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val
      .split(/[，,、]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function safeParseArray(value: any): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      gender,
      ageRange,
      occupation,
      companyName,
      companySize,
      companyType,
      province,
      city,
      district,
      dailyWorkHours,
      weeklyWorkDays,
      overtimePay,
      negativeConsequence,
      longWorkIssues,
      discriminationReasons,
      violationsObserved,
      expectedChanges,
      story,
      safetyWord,
    } = body;

    const updatedSurvey = await prisma.surveyEntry.update({
      where: { id },
      data: {
        gender,
        ageRange,
        occupation,
        companyName,
        companySize,
        companyType,
        province,
        city,
        district,
        dailyWorkHours,
        weeklyWorkDays,
        overtimePay,
        negativeConsequence,
        longWorkIssues: JSON.stringify(longWorkIssues ?? []),
        discriminationReasons: JSON.stringify(discriminationReasons ?? []),
        violationsObserved: JSON.stringify(violationsObserved ?? []),
        expectedChanges: JSON.stringify(expectedChanges ?? []),
        story,
        safetyWord,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedSurvey);
  } catch (error) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

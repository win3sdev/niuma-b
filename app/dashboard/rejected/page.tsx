"use client";

import { useEffect, useState } from "react";
import { SurveyEntry } from "@/app/types/survey";
import DetailModal from "@/app/components/DetailModal";
import { toast } from "sonner";

export default function RejectedPage() {
  const [surveys, setSurveys] = useState<SurveyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyEntry | null>(
    null
  );

  const [page, setPage] = useState(1);
  const [gotoPage, setGotoPage] = useState("");
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/surveys?status=rejected&page=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("获取数据失败");
      }
      const data = await response.json();
      setSurveys(data.data);
      setTotalCount(data.total);
    } catch (error) {
      // console.error("Error fetching surveys:", error);
      setError("获取数据失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [page]);

  const handleReview = async (surveyId: string) => {
    try {
      const response = await fetch("/api/surveys", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          surveyId,
          reviewStatus: "pending",
          reviewComment: "",
        }),
      });

      if (!response.ok) {
        throw new Error("操作失败");
      }
      toast.success("审核操作成功！");

      setSurveys((prev) => {
        const updated = prev.filter((survey) => survey.id !== String(surveyId));
        if (updated.length === 0 && page > 1) {
          setPage((p) => p - 1);
        }
        return updated;
      });
    } catch (error) {
      // console.error("Error updating survey:", error);
      toast.success("审核操作失败！");
      setError("操作失败，请稍后重试");
    }
  };

  const handleViewDetail = (survey: SurveyEntry) => {
    setSelectedSurvey(survey);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">审核拒绝列表</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 table-auto">
          <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
            <tr>
              {[
                "公司名称",
                "平均每日工作时长",
                "平均每周工作天数",
                "公司规模",
                "公司性质",
                "省份",
                "城市",
                "加班报酬",
                "因拒绝加班或质疑工作而面临后果",
                "性别",
                "年龄范围",
                "职业",
                "因长时间工作出现的问题",
                "企业存在以下违规现象",
                "曝光公司得到改变",
                "评论/经历",
                "安全词",
                "审核时间",
                "审核人",
                "审核留言",
                "操作",
              ].map((title) => (
                <th
                  key={title}
                  className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {surveys.length === 0 ? (
              <tr>
                <td
                  colSpan={14}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  暂无数据
                </td>
              </tr>
            ) : (
              surveys.map((survey) => (
                <tr
                  key={survey.id}
                  className="transition-colors duration-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.companyName}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.dailyWorkHours}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.weeklyWorkDays}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.companySize}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.companyType}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.province}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.city}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.overtimePay}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.negativeConsequence}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.gender}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.occupation}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.longWorkIssues}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.discriminationReasons}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.violationsObserved}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.expectedChanges}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.story}
                  </td>

                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.safetyWord}
                  </td>

                  <td className="whitespace-nowrap px-5 py-3 max-w-[200px] truncate">
                    {new Date(survey.updatedAt).toLocaleString("zh-CN", {
                      timeZone: "Asia/Shanghai",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="whitespace-nowrap px-5 py-3 max-w-[200px] truncate">
                    {survey.reviewer}
                  </td>

                  <td className=" px-5 py-3 max-w-[200px] truncate overflow-hidden text-ellipsis">
                    {survey.reviewComment}
                  </td>

                  <td className="whitespace-nowrap px-5 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewDetail(survey)}
                        className="rounded-md bg-gray-500 px-3 py-1 text-white text-sm hover:bg-gray-600 transition-colors"
                      >
                        查看详情
                      </button>
                      <button
                        onClick={() => handleReview(survey.id)}
                        className="rounded-md bg-blue-500 px-3 py-1 text-white text-sm hover:bg-blue-600 transition-colors"
                      >
                        重新审核
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>

        <span className="text-gray-600">
          第 <strong>{page}</strong> 页 / 共 <strong>{totalPages}</strong> 页
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>

        {/* 跳转页数 */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={gotoPage}
            onChange={(e) => setGotoPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const pageNum = Number(gotoPage);
                if (pageNum >= 1 && pageNum <= totalPages) {
                  setPage(pageNum);
                  setGotoPage("");
                }
              }
            }}
            placeholder="页"
            className="w-16 rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => {
              const pageNum = Number(gotoPage);
              if (pageNum >= 1 && pageNum <= totalPages) {
                setPage(pageNum);
                setGotoPage("");
              }
            }}
            className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
          >
            跳转
          </button>
        </div>
      </div>

      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        survey={selectedSurvey}
        type="rejected"
        onReview={(survey) => handleReview(survey.id)}
      />
    </div>
  );
}

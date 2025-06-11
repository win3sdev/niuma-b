"use client";

import { useEffect, useState } from "react";
import { SurveyEntry } from "@/app/types/survey";
import DetailModal from "@/app/components/DetailModal";

export default function ApprovedPage() {
  const [surveys, setSurveys] = useState<SurveyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyEntry | null>(
    null
  );
  const [reviewComment, setReviewComment] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/surveys?status=approved&page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) throw new Error("获取数据失败");
        const result = await response.json();
        setSurveys(result.data);
        setTotal(result.total);
      } catch (err) {
        console.error("Error fetching surveys:", err);
        setError("获取数据失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [page]);

  const handleReview = (survey: SurveyEntry) => {
    setSelectedSurvey(survey);
    setShowReviewModal(true);
  };

  const handleReReview = async () => {
    if (!selectedSurvey) return;
    try {
      const response = await fetch("/api/surveys", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId: selectedSurvey.id,
          reviewStatus: "pending",
          reviewComment: reviewComment,
        }),
      });

      if (!response.ok) throw new Error("操作失败");

      setSurveys((prev) =>
        prev.filter((survey) => survey.id !== selectedSurvey.id)
      );
      setShowReviewModal(false);
      setReviewComment("");
    } catch (error) {
      console.error("Error updating survey:", error);
      setError("操作失败，请稍后重试");
    }
  };

  const handleViewDetail = (survey: SurveyEntry) => {
    setSelectedSurvey(survey);
    setShowDetailModal(true);
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">审核通过列表</h1>

      {loading ? (
        <div className="text-center text-lg">加载中...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    公司名称
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    平均每日工作时长
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    平均每周工作天数
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    公司规模
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    公司性质
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    省份
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    城市
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    加班报酬
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    因拒绝加班或质疑工作而面临后果
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    性别
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    年龄范围
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    职业
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    因长时间工作出现的问题
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    因以下原因遭遇过职场歧视
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    企业存在以下违规现象
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    曝光公司得到改变
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    评论/经历
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    安全词
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    审核时间
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    审核人
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    审核留言
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide max-w-[200px] truncate">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {surveys.map((survey) => (
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
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.companyType}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.province}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.city}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.overtimePay}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.negativeConsequence}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.gender}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.ageRange}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.occupation}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.longWorkIssues}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.discriminationReasons}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.violationsObserved}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{survey.expectedChanges}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.story}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.safetyWord}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {/* {survey.updatedAt} */}
                      {new Date(survey.updatedAt).toLocaleString("zh-CN", {
                      timeZone: "Asia/Shanghai",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.reviewer}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {survey.reviewComment}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetail(survey)}
                          className="rounded-md bg-gray-500 px-3 py-1 text-white hover:bg-gray-600 transition-colors"
                        >
                          查看详情
                        </button>
                        <button
                          onClick={() => handleReview(survey)}
                          className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition-colors"
                        >
                          重新审核
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页器 */}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>

            <span className="text-gray-600">
              第 <strong>{page}</strong> 页 / 共 <strong>{totalPages}</strong>{" "}
              页
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        </>
      )}

      {/* 重新审核模态框 */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">重新审核</h2>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                审核备注
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
                rows={4}
                placeholder="请输入审核备注（可选）"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewComment("");
                }}
                className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                取消
              </button>
              <button
                onClick={handleReReview}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                提交
              </button>
            </div>
          </div>
        </div>
      )}

      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        survey={selectedSurvey}
        type="approved"
        onReview={(survey) => handleReview(survey)}
      />
    </div>
  );
}

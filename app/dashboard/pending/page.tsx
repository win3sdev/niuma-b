"use client";

import { useEffect, useState } from "react";
import { SurveyEntry } from "@/app/types/survey";
import DetailModal from "@/app/components/DetailModal";

const PAGE_SIZE = 10;

export default function PendingPage() {
  const [surveys, setSurveys] = useState<SurveyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyEntry | null>(
    null
  );
  const [reviewComment, setReviewComment] = useState("");

  // 分页相关
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const fetchSurveys = async () => {
    try {
      
      setLoading(true);
      const response = await fetch(
        `/api/surveys?status=pending&page=${page}&pageSize=${PAGE_SIZE}`
      );
      if (!response.ok) throw new Error(`获取数据失败: ${response.status}`);
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setSurveys(data.data);
        setTotalCount(data.total ?? 0);
      } else {
        console.error("Error: Received non-array data:", data);
        setError("接收到的数据格式不正确");
      }
    } catch (err) {
      const error = err as Error;
      setError(`获取数据失败，请稍后重试: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [page]);

  const handleReview = (survey: SurveyEntry) => {
    setSelectedSurvey(survey);
    setShowReviewModal(true);
  };

  const handleApprove = async () => {
    if (!selectedSurvey) return;

    try {
      const response = await fetch("/api/surveys", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId: selectedSurvey.id,
          reviewStatus: "approved",
          reviewComment: reviewComment,
        }),
      });
      if (!response.ok) throw new Error(`操作失败: ${response.status}`);

      setSurveys((prev) =>
        prev.filter((survey) => survey.id !== selectedSurvey.id)
      );
      setShowReviewModal(false);
      setReviewComment("");
    } catch (err) {
      const error = err as Error;
      setError(`操作失败，请稍后重试: ${error.message}`);
    }
  };

  const handleReject = async () => {
    if (!selectedSurvey) return;

    try {
      const response = await fetch("/api/surveys", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId: selectedSurvey.id,
          reviewStatus: "rejected",
          reviewComment: reviewComment,
        }),
      });
      if (!response.ok) throw new Error(`操作失败: ${response.status}`);

      setSurveys((prev) =>
        prev.filter((survey) => survey.id !== selectedSurvey.id)
      );
      setShowReviewModal(false);
      setReviewComment("");
    } catch (err) {
      const error = err as Error;
      setError(`操作失败，请稍后重试: ${error.message}`);
    }
  };

  const handleViewDetail = (survey: SurveyEntry) => {
    setSelectedSurvey(survey);
    setShowDetailModal(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-lg">
        加载中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-lg text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">待审核列表</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {[
                "时间",
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
                "因长时间工作出现的问题",
                "企业存在以下违规现象",
                "曝光公司得到改变",
                "评论/经历",
                "安全词",
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
                  暂无待审核数据
                </td>
              </tr>
            ) : (
              surveys.map((survey) => (
                <tr
                  key={survey.id}
                  className="transition-colors duration-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {/* {survey?.updatedAt?.toLocaleString()} */}
                    {new Date(survey?.updatedAt).toLocaleString("zh-CN", {
                      timeZone: "Asia/Shanghai",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
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
                  <td className="px-4 py-3 max-w-[200px] truncate">{survey.city}</td>
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
                    {survey.ageRange}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {survey.longWorkIssues}
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
                  <td className="whitespace-nowrap px-5 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewDetail(survey)}
                        className="rounded-md bg-gray-500 px-3 py-1 text-white text-sm hover:bg-gray-600 transition-colors"
                      >
                        查看详情
                      </button>
                      <button
                        onClick={() => handleReview(survey)}
                        className="rounded-md bg-blue-500 px-3 py-1 text-white text-sm hover:bg-blue-600 transition-colors"
                      >
                        审核
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
      <div className="mt-6 flex items-center justify-center gap-4 text-sm">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>
        <span className="text-gray-600">
          第 <strong>{page}</strong> 页 / 共 <strong>{totalPages}</strong> 页
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>
      </div>

      {/* 审核模态框 */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl animate-fade-in">
            <h2 className="mb-4 text-xl font-bold text-gray-800">审核操作</h2>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              审核备注
            </label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring focus:ring-blue-200"
              rows={4}
              placeholder="请输入审核备注（可选）"
            />
            <div className="mt-4 flex justify-end gap-3">
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
                onClick={handleReject}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                拒绝
              </button>
              <button
                onClick={handleApprove}
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                通过
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 详情模态框 */}
      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        survey={selectedSurvey}
        type="pending"
        onReview={handleReview}
      />
    </div>
  );
}

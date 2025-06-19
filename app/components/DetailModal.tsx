import React from "react";
import {
  School,
  MapPin,
  Landmark,
  Clock,
  Calendar,
  MessageCircle,
  ShieldAlert,
  UserCheck,
  X,
  BadgeDollarSign,
  AlertTriangle,
  FileText,
  Ban,
  Lightbulb,
  Key,
  User,
  Briefcase,
  Building2,
  Users,
} from "lucide-react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: any;
  type?: "pending" | "approved" | "rejected";
  onReview?: (survey: any) => void; // 点击按钮触发的函数
}

const Info = ({
  label,
  value,
  icon: Icon,
  multiline = false,
  valueClass = "",
}: {
  label: string;
  value?: string | number;
  icon?: React.ElementType;
  multiline?: boolean;
  valueClass?: string;
}) => (
  <div className="flex items-start gap-3">
    {Icon && <Icon className="mt-1 h-5 w-5 text-gray-400" />}
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div
        className={`mt-1 break-words text-sm font-medium text-gray-800 ${valueClass}`}
      >
        {value || "--"}
      </div>
    </div>
  </div>
);

export default function DetailModal({
  isOpen,
  onClose,
  survey,
  type,
  onReview,
}: {
  isOpen: boolean;
  onClose: () => void;
  survey: any;
  type: "pending" | "approved" | "rejected";
  onReview?: (survey: any) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">详细内容</h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <Info label="性别" value={survey?.gender} icon={UserCheck} />
            <Info label="年龄范围" value={survey?.ageRange} icon={Calendar} />
            <Info label="职业" value={survey?.occupation} icon={Briefcase} />
            <Info
              label="公司名称"
              value={survey?.companyName}
              icon={Building2}
            />
            <Info label="公司规模" value={survey?.companySize} icon={Users} />
            <Info
              label="公司类型"
              value={survey?.companyType}
              icon={Landmark}
            />
            <Info label="省份" value={survey?.province} icon={MapPin} />
            <Info label="城市" value={survey?.city} icon={MapPin} />
            <Info label="区县" value={survey?.district} icon={MapPin} />
          </div>

          <div className="space-y-4">
            <Info
              label="平均每日工作时长"
              value={survey?.dailyWorkHours}
              icon={Clock}
            />
            <Info
              label="平均每周工作天数"
              value={survey?.weeklyWorkDays}
              icon={Calendar}
            />
            <Info
              label="加班报酬"
              value={survey?.overtimePay}
              icon={BadgeDollarSign}
            />
            <Info
              label="拒绝加班或质疑工作安排而面临负面后果"
              value={survey?.negativeConsequence}
              icon={AlertTriangle}
            />

            <Info
              label="因长时间工作产生的问题"
              value={
                Array.isArray(survey?.longWorkIssues)
                  ? survey.longWorkIssues.join("、")
                  : survey?.longWorkIssues
              }
              icon={FileText}
              multiline
            />

            <Info
              label="职场中受到的歧视"
              value={
                Array.isArray(survey?.discriminationReasons)
                  ? survey.discriminationReasons.join("、")
                  : survey?.discriminationReasons
              }
              icon={ShieldAlert}
              multiline
            />

            <Info
              label="企业存在以下违法违规现象"
              value={
                Array.isArray(survey?.violationsObserved)
                  ? survey.violationsObserved.join("、")
                  : survey?.violationsObserved
              }
              icon={Ban}
              multiline
            />

            <Info
              label="期望的改变"
              value={
                Array.isArray(survey?.expectedChanges)
                  ? survey.expectedChanges.join("、")
                  : survey?.expectedChanges
              }
              icon={Lightbulb}
              multiline
            />

            <Info
              label="评论/故事"
              value={survey?.story}
              icon={MessageCircle}
              multiline
            />
            <Info label="安全词" value={survey?.safetyWord} icon={Key} />
            <Info
              label="提交时间"
              value={survey?.updatedAt
                ?.replace("T", " ")
                .replace("Z", "")
                .slice(0, 22)}
              icon={Calendar}
            />

            {type !== "pending" && (
              <>
                <Info
                  label="审核状态"
                  value={
                    survey?.reviewStatus === "approved" ? "已通过" : "已拒绝"
                  }
                  icon={UserCheck}
                  valueClass={
                    survey?.reviewStatus === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                />
                <Info label="审核人" value={survey?.reviewer} icon={User} />
                <Info
                  label="审核意见"
                  value={survey?.reviewComment}
                  icon={MessageCircle}
                  multiline
                />
              </>
            )}
          </div>
        </div>

        {/* 审核按钮 */}
        {onReview && (
          <div className="mt-8 text-right">
            <button
              onClick={() => onReview(survey)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              {type === "pending" ? "审核" : "重新审核"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  X,
  UserCheck,
  Calendar,
  Briefcase,
  Building2,
  Users,
  Landmark,
  MapPin,
  Clock,
  BadgeDollarSign,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Ban,
  Lightbulb,
  MessageCircle,
  Key,
} from "lucide-react";

export function EditModal({ survey, onClose, onSave }: any) {
  const [form, setForm] = useState({ ...survey });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">编辑信息</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="公司名称"
            value={form.companyName}
            onChange={(v) => handleChange("companyName", v)}
            icon={Building2}
          />
          <Input
            label="性别"
            value={form.gender}
            onChange={(v) => handleChange("gender", v)}
            icon={UserCheck}
          />
          <Input
            label="年龄范围"
            value={form.ageRange}
            onChange={(v) => handleChange("ageRange", v)}
            icon={Calendar}
          />
          <Input
            label="职业"
            value={form.occupation}
            onChange={(v) => handleChange("occupation", v)}
            icon={Briefcase}
          />
          <Input
            label="公司规模"
            value={form.companySize}
            onChange={(v) => handleChange("companySize", v)}
            icon={Users}
          />
          <Input
            label="公司类型"
            value={form.companyType}
            onChange={(v) => handleChange("companyType", v)}
            icon={Landmark}
          />
          <Input
            label="省份"
            value={form.province}
            onChange={(v) => handleChange("province", v)}
            icon={MapPin}
          />
          <Input
            label="城市"
            value={form.city}
            onChange={(v) => handleChange("city", v)}
            icon={MapPin}
          />
          <Input
            label="区县"
            value={form.district}
            onChange={(v) => handleChange("district", v)}
            icon={MapPin}
          />
          <Input
            label="平均每日工作时长"
            value={form.dailyWorkHours}
            onChange={(v) => handleChange("dailyWorkHours", v)}
            icon={Clock}
          />
          <Input
            label="平均每周工作天数"
            value={form.weeklyWorkDays}
            onChange={(v) => handleChange("weeklyWorkDays", v)}
            icon={Calendar}
          />
          <Input
            label="加班报酬"
            value={form.overtimePay}
            onChange={(v) => handleChange("overtimePay", v)}
            icon={BadgeDollarSign}
          />
          <Input
            label="负面后果"
            value={form.negativeConsequence}
            onChange={(v) => handleChange("negativeConsequence", v)}
            icon={AlertTriangle}
          />
          <Input
            label="长时间工作问题"
            value={form.longWorkIssues}
            onChange={(v) => handleChange("longWorkIssues", v)}
            icon={FileText}
          />
          <Input
            label="歧视"
            value={form.discriminationReasons}
            onChange={(v) => handleChange("discriminationReasons", v)}
            icon={ShieldAlert}
          />
          <Input
            label="违法现象"
            value={form.violationsObserved}
            onChange={(v) => handleChange("violationsObserved", v)}
            icon={Ban}
          />
          <Input
            label="期望的改变"
            value={form.expectedChanges}
            onChange={(v) => handleChange("expectedChanges", v)}
            icon={Lightbulb}
          />
          <Input
            label="安全词"
            value={form.safetyWord}
            onChange={(v) => handleChange("safetyWord", v)}
            icon={Key}
          />
          <Textarea
            label="评论/故事"
            value={form.story}
            onChange={(v) => handleChange("story", v)}
            icon={MessageCircle}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
        {Icon && <Icon className="h-4 w-4 text-gray-400" />} {label}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-inner transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
  icon?: React.ElementType;
}) {
  return (
    <div className="col-span-1 md:col-span-2">
      <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
        {Icon && <Icon className="h-4 w-4 text-gray-400" />} {label}
      </label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-inner transition focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}

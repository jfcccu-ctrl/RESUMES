import { useRef, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";

const templates = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "minimal", name: "Minimal" },
  { id: "executive", name: "Executive" },
];

const emptyResume = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: "",
  experience: [
    {
      id: 1,
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  education: [
    {
      id: 1,
      degree: "",
      school: "",
      year: "",
    },
  ],
};

export default function ResumeMaker() {
  const [data, setData] = useState(emptyResume);
  const [template, setTemplate] = useState("modern");
  const previewRef = useRef(null);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500";

  const update = (patch) => {
    setData((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Resume Builder
        </h1>

        <p className="text-gray-500 mt-2">
          Create professional resumes instantly
        </p>
      </div>

      {/* TEMPLATE BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              template === t.id
                ? "bg-blue-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT FORM */}
        <div className="bg-white rounded-2xl shadow p-6 max-h-[85vh] overflow-y-auto">
          {/* PERSONAL INFO */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

            <input
              className={inputClass}
              placeholder="Full Name"
              value={data.fullName}
              onChange={(e) =>
                update({ fullName: e.target.value })
              }
            />

            <input
              className={inputClass}
              placeholder="Job Title"
              value={data.title}
              onChange={(e) =>
                update({ title: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputClass}
                placeholder="Email"
                value={data.email}
                onChange={(e) =>
                  update({ email: e.target.value })
                }
              />

              <input
                className={inputClass}
                placeholder="Phone"
                value={data.phone}
                onChange={(e) =>
                  update({ phone: e.target.value })
                }
              />
            </div>

            <input
              className={inputClass}
              placeholder="Location"
              value={data.location}
              onChange={(e) =>
                update({ location: e.target.value })
              }
            />

            <textarea
              rows={4}
              className={inputClass}
              placeholder="Professional Summary"
              value={data.summary}
              onChange={(e) =>
                update({ summary: e.target.value })
              }
            />

            <input
              className={inputClass}
              placeholder="Skills (HTML, CSS, React)"
              value={data.skills}
              onChange={(e) =>
                update({ skills: e.target.value })
              }
            />
          </div>

          {/* EXPERIENCE */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Experience
              </h2>

              <button
                onClick={() =>
                  update({
                    experience: [
                      ...data.experience,
                      {
                        id: Date.now(),
                        role: "",
                        company: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      },
                    ],
                  })
                }
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {data.experience.map((exp, i) => (
              <div
                key={exp.id}
                className="border rounded-xl p-4 mb-4 space-y-3"
              >
                <input
                  className={inputClass}
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => {
                    const arr = [...data.experience];
                    arr[i].role = e.target.value;
                    update({ experience: arr });
                  }}
                />

                <input
                  className={inputClass}
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const arr = [...data.experience];
                    arr[i].company = e.target.value;
                    update({ experience: arr });
                  }}
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    className={inputClass}
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => {
                      const arr = [...data.experience];
                      arr[i].startDate = e.target.value;
                      update({ experience: arr });
                    }}
                  />

                  <input
                    className={inputClass}
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => {
                      const arr = [...data.experience];
                      arr[i].endDate = e.target.value;
                      update({ experience: arr });
                    }}
                  />
                </div>

                <textarea
                  rows={3}
                  className={inputClass}
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const arr = [...data.experience];
                    arr[i].description = e.target.value;
                    update({ experience: arr });
                  }}
                />

                {data.experience.length > 1 && (
                  <button
                    onClick={() =>
                      update({
                        experience: data.experience.filter(
                          (x) => x.id !== exp.id
                        ),
                      })
                    }
                    className="flex items-center gap-2 text-red-600"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Education
              </h2>

              <button
                onClick={() =>
                  update({
                    education: [
                      ...data.education,
                      {
                        id: Date.now(),
                        degree: "",
                        school: "",
                        year: "",
                      },
                    ],
                  })
                }
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {data.education.map((edu, i) => (
              <div
                key={edu.id}
                className="border rounded-xl p-4 mb-4 space-y-3"
              >
                <input
                  className={inputClass}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const arr = [...data.education];
                    arr[i].degree = e.target.value;
                    update({ education: arr });
                  }}
                />

                <input
                  className={inputClass}
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => {
                    const arr = [...data.education];
                    arr[i].school = e.target.value;
                    update({ education: arr });
                  }}
                />

                <input
                  className={inputClass}
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const arr = [...data.education];
                    arr[i].year = e.target.value;
                    update({ education: arr });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={downloadResume}
              className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>

          <div
            ref={previewRef}
            className="bg-white shadow-2xl rounded-2xl p-8 min-h-[1000px]"
          >
            <h1 className="text-4xl font-bold text-gray-800">
              {data.fullName || "Your Name"}
            </h1>

            <p className="text-xl text-blue-600 mt-1">
              {data.title || "Job Title"}
            </p>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>{data.email}</p>
              <p>{data.phone}</p>
              <p>{data.location}</p>
            </div>

            {/* SUMMARY */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold border-b pb-2">
                Summary
              </h2>

              <p className="mt-3 text-gray-700">
                {data.summary}
              </p>
            </div>

            {/* SKILLS */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold border-b pb-2">
                Skills
              </h2>

              <p className="mt-3 text-gray-700">
                {data.skills}
              </p>
            </div>

            {/* EXPERIENCE */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold border-b pb-2">
                Experience
              </h2>

              {data.experience.map((exp) => (
                <div key={exp.id} className="mt-5">
                  <h3 className="text-lg font-bold">
                    {exp.role}
                  </h3>

                  <p className="text-blue-600">
                    {exp.company}
                  </p>

                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>

                  <p className="mt-2 text-gray-700">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold border-b pb-2">
                Education
              </h2>

              {data.education.map((edu) => (
                <div key={edu.id} className="mt-5">
                  <h3 className="text-lg font-bold">
                    {edu.degree}
                  </h3>

                  <p className="text-blue-600">
                    {edu.school}
                  </p>

                  <p className="text-sm text-gray-500">
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}